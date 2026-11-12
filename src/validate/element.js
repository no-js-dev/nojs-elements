// ═══════════════════════════════════════════════════════════════════════
//  DIRECTIVE: validate  (priority 30)
//  Extracted from NoJS Core — full form + field-level validation.
//  Semantics live in ./engine.js; this module reads the DOM and applies
//  the engine's results to it.
// ═══════════════════════════════════════════════════════════════════════

import {
  VALIDITY_FLAGS,
  applyEvent,
  canSubmit,
  emptyInteraction,
  evaluateForm,
  submitEnabled,
  validateValue,
} from "./engine.js";
import { applyAutoDisable } from "./buttons.js";
import { _internal, _markBound, _ownsContext } from "../_compat.js";

// focusout listener triggers that only mark a field touched.
const TOUCH_ONLY = Object.freeze(["focusout"]);

// ── Disposer helper (Elements pattern) ───────────────────────────────
function addDisposer(el, fn) {
  el.__disposers = el.__disposers || [];
  el.__disposers.push(fn);
}

// ── Kept at module scope so helpers can reference them after init ─────
let _NoJS;
let _evaluate;
let _createContext;
let _findContext;
let _processTree;
let _cloneTemplate;
let _disposeChildren;
let _disposeTree;
let _warn;
let _execStatement;
let _validateInit = null;

// ── Reset the __declared marker so processTree re-processes a subtree ──
// Mirrors core's dom._clearDeclared (not exposed on internals). On a fresh
// clone this is a no-op; it is the safety net for the dispose-before-reprocess
// path so re-rendered wrappers get fully re-bound.
function _clearDeclared(el) {
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_ELEMENT);
  while (walker.nextNode()) walker.currentNode.__declared = false;
}

// ── Validator registry, read when a field validates ──────────────────
// Core hands out a copy of its registry on every `internals` access, so a
// copy kept from install misses validators registered after the Elements
// script. Reading it per validation picks them up.
function _getValidators() {
  return _internal(_NoJS, "validators") || {};
}

// ── validate-empty="skip" (field, else its form) ─────────────────────
function _skipsEmpty(field) {
  const mode = field.hasAttribute("validate-empty")
    ? field.getAttribute("validate-empty")
    : field.closest("form[validate]")?.getAttribute("validate-empty");
  return mode === "skip";
}

// ═══════════════════════════════════════════════════════════════════════
//  Facts for the engine (engine.js owns the semantics; this backend only
//  reads attributes, values and the native ValidityState from the DOM)
// ═══════════════════════════════════════════════════════════════════════

// Every `error-<rule>` attribute, keyed by the (lowercase) rule name.
function _errorMessages(field) {
  const messages = {};
  for (const { name, value } of field.attributes) {
    if (name.startsWith("error-")) messages[name.slice(6)] = value;
  }
  return messages;
}

function _fieldSpec(field) {
  return {
    name: field.name,
    type: (field.getAttribute("type") || "text").toLowerCase(),
    kind: field.type === "checkbox" || field.type === "radio" ? field.type : null,
    rules: field.getAttribute("validate"),
    error: field.getAttribute("error"),
    messages: _errorMessages(field),
    validateOn: field.getAttribute("validate-on"),
    validateEmpty: field.getAttribute("validate-empty"),
    errorClass: field.getAttribute("error-class"),
    as: field.getAttribute("as"),
  };
}

// Form specification over the named controls, in DOM order.
// `errorClass` and `perField` are the values the form captured at init.
function _formSpec(form, controls, errorClass, perField) {
  return {
    validateOn: form.getAttribute("validate-on"),
    validateEmpty: form.getAttribute("validate-empty"),
    errorClass,
    perField,
    fields: controls.map(_fieldSpec),
  };
}

// Failing native ValidityState members and the browser's message.
function _nativeFacts(field) {
  const validity = field.validity;
  if (!validity || validity.valid) return null;
  return { flags: VALIDITY_FLAGS.filter((flag) => validity[flag]), message: field.validationMessage };
}

// Read lazily, when the engine asks, as the directive always read them.
function _fieldFacts(field, ctx) {
  return {
    get value() { return field.value; },
    get checked() { return field.checked; },
    get native() { return _nativeFacts(field); },
    validateIf: () => _shouldValidate(field, ctx),
  };
}

// ── Find the rendered error wrapper for a field ──────────────────────
// Prefer the closest <form> scope (so two forms with same-anchor patterns
// can't cross-match), but fall back to the whole document: error templates
// are often declared OUTSIDE the form (the wrapper is inserted after the
// <template>, which may live in an enclosing section), so a form-only search
// would never find — and never clear — them. The __errorTemplateFor identity
// check keeps the document-wide fallback unambiguous.
function _findErrorTemplateWrapper(anchorEl) {
  const form = anchorEl.closest("form");
  if (form) {
    for (const el of form.querySelectorAll('div[style="display: contents;"]')) {
      if (el.__errorTemplateFor === anchorEl) return el;
    }
  }
  for (const el of document.querySelectorAll('div[style="display: contents;"]')) {
    if (el.__errorTemplateFor === anchorEl) return el;
  }
  return null;
}

// ── Render template reference for error ──────────────────────────────
function _renderErrorTemplate(selector, errorMsg, ruleName, anchorEl, ctx) {
  const existing = _findErrorTemplateWrapper(anchorEl);
  if (existing) {
    // Compare via the error wrapper's OWN context (not a fresh child ctx that
    // may shadow $error). If unchanged, bail out — this kills the double-render
    // / double-animation when an unrelated field re-validates.
    const sameError =
      existing.__ctx?.$error === errorMsg &&
      existing.__ctx?.$rule === ruleName;
    if (sameError) return;
    _disposeTree(existing);
    existing.remove();
  }

  const tpl = document.querySelector(selector);
  if (!tpl) return;

  const clone = tpl.content.cloneNode(true);
  const wrapper = document.createElement("div");
  wrapper.style.display = "contents";
  wrapper.setAttribute("aria-live", "polite");
  wrapper.__errorTemplateFor = anchorEl;
  // `err` keeps v1.21.1 templates that read the standalone field's
  // `err.message` working inside a form.
  const childCtx = _createContext(
    { $error: errorMsg, $rule: ruleName, err: { message: errorMsg } },
    ctx
  );
  wrapper.__ctx = childCtx;
  wrapper.appendChild(clone);

  // Insert after the template element (in-place rendering)
  tpl.parentNode.insertBefore(wrapper, tpl.nextSibling);
  _clearDeclared(wrapper);
  _processTree(wrapper);
}

function _clearErrorTemplate(anchorEl) {
  const existing = _findErrorTemplateWrapper(anchorEl);
  if (existing) {
    _disposeTree(existing);
    existing.remove();
  }
}

// ── Check if field should be validated (validate-if) ─────────────────
function _shouldValidate(field, ctx) {
  const expr = field.getAttribute("validate-if");
  if (!expr) return true;
  try {
    return !!_evaluate(expr, ctx);
  } catch {
    return true;
  }
}

// ── Get validate-on triggers ─────────────────────────────────────────
function _getValidationTriggers(field, form) {
  const fieldAttr = field.getAttribute("validate-on");
  if (fieldAttr) return fieldAttr.split(/\s+/);
  const formAttr = form ? form.getAttribute("validate-on") : null;
  if (formAttr) return formAttr.split(/\s+/);
  return ["input", "focusout"];
}

// ── Event core's `model` syncs on, or null without `model` ──────────
function _getModelEvent(field) {
  if (!field.hasAttribute("model")) return null;
  return field.tagName === "SELECT" || field.type === "checkbox" || field.type === "radio"
    ? "change"
    : "input";
}

// ── Sync a select/checkbox/radio `model` before validating on input ──
// Core's `model` syncs these on "change", which fires after "input".
// checkValidity() notifies the context synchronously, so an unsynced
// `model` would re-render its stale value over the user's pick. Write the
// value the way core's `model` does on "change"; the later "change" then
// writes the same value again.
function _syncChoiceModel(field, fn) {
  return () => {
    const expr = field.getAttribute("model");
    // An `if`-gated `model` is inactive: leave its state alone, as core does.
    const gated = field.__gatedDirs && field.__gatedDirs.some((d) => d.name === "model");
    if (expr && !gated && _execStatement && (field.type !== "radio" || field.checked)) {
      const val = field.type === "checkbox" ? field.checked : field.value;
      _execStatement(`${expr} = __val`, _findContext(field), { __val: val });
    }
    fn();
  };
}

// ── Bind a form-level context so descendants share $form ─────────────
// Create/cache a context ON the form element so nested [bind="$form.*"]
// nodes inherit it. When an ancestor already owns a context (e.g. a
// surrounding `<div state>`), REUSE it instead of shadowing: creating a
// fresh child ctx on the form would re-root state writes from sibling
// directives like `on:submit="submitted = true"` onto the form, so the
// ancestor's `show="submitted"` would never see the change. Only mint a
// new context when the form has no contextful ancestor — that fixes the
// orphan-context case where `$form` would otherwise be invisible to nested
// `[bind="$form.*"]` nodes.
function _bindFormContext(formEl) {
  if (formEl.__ctx) return formEl.__ctx;
  let parent = null;
  for (let a = formEl.parentElement; a; a = a.parentElement) {
    if (!a.__ctx) continue;
    if (!_ownsContext(a)) return _findContext(formEl); // inherit ancestor ctx, don't shadow
    // A container's own context (a stepper without `state`): inherit it,
    // but keep a $form of its own, as each such form had before.
    parent = a.__ctx;
    break;
  }
  const ctx = _createContext({}, parent);
  formEl.__ctx = ctx;
  return ctx;
}

// ═══════════════════════════════════════════════════════════════════════
//  Re-bind a node core bound against its validate stub
// ═══════════════════════════════════════════════════════════════════════

// The one disposer core's stub registers: `() => form.removeEventListener(
// "submit", handler)`. Matches the source and the minified build.
const STUB_SUBMIT_DISPOSER =
  /^\(\)\s*=>\s*[\w$]+\.removeEventListener\(\s*(["'])submit\1\s*,\s*[\w$]+\s*\)$/;

// The stub's $form.fields returns one frozen default for any key.
function _isStubForm($form) {
  const fields = $form && $form.fields;
  if (!fields) return false;
  const probe = fields["__nojsStubProbe"];
  return !!probe && Object.isFrozen(probe);
}

// Elements loaded after core processed the page: core bound this node against
// its stub. When the node's subtree shares the context the stub wrote to (a
// `state` on the node or above it), drop the stub's submit listener and run
// the real directive on this node only. Its subtree stays bound, so an `if` or
// `each` inside keeps its content and `state` keeps its values. Returns false
// when the caller must re-process the subtree instead.
export function rebindFromStub(el) {
  if (!_validateInit || el.__nojsElBoundCtx !== undefined) return false;
  let owner = el;
  while (owner && !owner.__ctx) owner = owner.parentElement;
  if (!owner || (owner !== el && _ownsContext(owner))) return false;

  if (el.tagName === "FORM" || el.closest("form")) {
    const disposers = el.__disposers || [];
    let i = disposers.length - 1;
    while (i >= 0 && !STUB_SUBMIT_DISPOSER.test(Function.prototype.toString.call(disposers[i]).trim())) i--;
    if (i < 0) return false;
    disposers.splice(i, 1)[0]();
  }

  if (el.tagName !== "FORM" && !el.closest("form[validate]")) {
    const ctx = _findContext(el);
    if (_isStubForm(ctx.$form)) delete ctx.$form;
  }

  try {
    _validateInit(el, "validate", el.getAttribute("validate"));
  } catch (e) {
    _warn(`directive "validate" init error on <${el.tagName.toLowerCase()}>:`, e);
  }
  return true;
}

// ═══════════════════════════════════════════════════════════════════════
//  Registration
// ═══════════════════════════════════════════════════════════════════════

export function registerValidate(NoJS) {
  // Bind NoJS APIs to module-scoped references for helpers (guarded for old cores)
  _NoJS = NoJS;
  _evaluate = NoJS.evaluate;
  _createContext = NoJS.createContext;
  _findContext = NoJS.findContext;
  _processTree = NoJS.processTree;
  _cloneTemplate = _internal(NoJS, 'cloneTemplate') || (() => null);
  _disposeChildren = _internal(NoJS, 'disposeChildren') || (() => {});
  // disposeTree exposed on core 1.13.0 internals; guard older cores by falling
  // back to disposing children (still removes from DOM at the call site).
  _disposeTree = _internal(NoJS, 'disposeTree') || _disposeChildren;
  _warn = _internal(NoJS, 'warn') || console.warn;
  _execStatement = _internal(NoJS, 'execStatement');

  // Remove the core stub so we can register the full implementation
  const removeCore = _internal(NoJS, 'removeCoreDirective');
  if (typeof removeCore === 'function') {
    removeCore("validate");
  } else {
    _warn('[nojs-elements] core too old (<1.13.0): cannot remove "validate" stub; update NoJS core to 1.13.0+.');
  }

  const validateDirective = {
    priority: 30,
    init(el, name, rules) {
      // ═════════════════════════════════════════════════════
      //  FORM-LEVEL VALIDATION
      // ═════════════════════════════════════════════════════
      if (el.tagName === "FORM") {
        // Bind/cache a form-level context so descendants share $form.
        const ctx = _bindFormContext(el);
        _markBound(el, ctx);
        // Prevent native browser validation popups
        el.setAttribute("novalidate", "");

        const errorClassAttr = el.getAttribute("error-class");
        // Listener mode, fixed at init: per-field when the form or any of
        // its controls declares validate-on, else legacy form-level.
        const hasValidateOn = el.hasAttribute("validate-on");
        const hasFieldValidateOn = [...getFields()].some(f => f.hasAttribute("validate-on"));
        const perField = hasValidateOn || hasFieldValidateOn;
        // Interaction facts (touched / dirty / submitting); engine-owned shape.
        let interaction = emptyInteraction();

        const formCtx = {
          valid: false,
          dirty: false,
          touched: false,
          submitting: false,
          pending: false,
          errors: {},
          values: {},
          firstError: null,
          errorCount: 0,
          fields: {},
          reset: () => {
            interaction = applyEvent(spec(), interaction, { trigger: "reset" });
            formCtx.dirty = false;
            formCtx.touched = false;
            formCtx.pending = false;
            formCtx.submitting = false;
            el.reset();
            checkValidity();
          },
          endSubmit: () => {
            interaction = applyEvent(spec(), interaction, { trigger: "endSubmit" });
            formCtx.submitting = false;
            checkValidity();
          },
        };
        ctx.$set("$form", formCtx);

        // Notify the form context plus every descendant element context inside the
        // form. Descendant contexts (e.g. a nested `<div state>`) inherit `$form`
        // from the form context but keep their own listener set, so a `$set("$form")`
        // on the form context alone won't re-render `[bind="$form.*"]` nodes living in
        // those child scopes. Re-notifying the subtree keeps them reactive.
        function _notifyFormSubtree() {
          if (ctx && typeof ctx.$notify === "function") ctx.$notify();
          const walker = document.createTreeWalker(el, NodeFilter.SHOW_ELEMENT);
          while (walker.nextNode()) {
            const node = walker.currentNode;
            const nctx = node.__ctx;
            if (nctx && nctx !== ctx && typeof nctx.$notify === "function") {
              nctx.$notify();
            }
          }
        }

        // ── Collect all form fields ────────────────────────
        function getFields() {
          return el.querySelectorAll("input, textarea, select");
        }

        function namedFields() {
          return [...getFields()].filter((field) => field.name);
        }

        function spec(controls = namedFields()) {
          return _formSpec(el, controls, errorClassAttr, perField);
        }

        // Record one event in the interaction state.
        function record(trigger, name, triggers) {
          interaction = applyEvent(spec(), interaction, { trigger, field: name, triggers });
        }

        // ── Main validation check ──────────────────────────
        // The engine computes $form; this backend applies the per-field
        // display (aria-invalid, error classes, error templates, `as`) as
        // each field is computed, so a later field's validate-if sees the
        // aliases of the fields before it.
        function checkValidity() {
          const controls = namedFields();
          const { form } = evaluateForm(
            spec(controls),
            controls.map((field) => _fieldFacts(field, ctx)),
            interaction,
            _getValidators,
            { onField: (i, item) => applyFieldDisplay(controls[i], item) }
          );

          formCtx.valid = form.valid;
          formCtx.dirty = form.dirty;
          formCtx.touched = form.touched;
          formCtx.submitting = form.submitting;
          formCtx.errors = form.errors;
          formCtx.values = form.values;
          formCtx.fields = form.fields;
          formCtx.firstError = form.firstError;
          formCtx.errorCount = form.errorCount;
          formCtx.pending = form.pending;
          ctx.$set("$form", { ...formCtx });
          _notifyFormSubtree();

          // Auto-disable submit buttons
          _updateSubmitButtons(el);
        }

        function applyFieldDisplay(field, item) {
          // ARIA: set aria-invalid for screen readers (WCAG 4.1.2)
          if (item.shown) {
            field.setAttribute("aria-invalid", "true");
          } else {
            field.removeAttribute("aria-invalid");
          }

          // error-class handling (a field excluded by validate-if drops it)
          if (item.errorClass) {
            const classes = item.errorClass.split(/\s+/);
            if (item.shown) {
              field.classList.add(...classes);
            } else {
              field.classList.remove(...classes);
            }
          }

          // error template references (error="#tpl" or error-{rule}="#tpl")
          if (item.template) {
            _renderErrorTemplate(item.template, item.error.message, item.error.rule, field, ctx);
          } else {
            _clearErrorTemplate(field);
          }

          // $field via as="" attribute
          if (item.as) {
            ctx.$set(item.as, item.entry);
          }
        }

        // ── Auto-disable submit buttons ────────────────────
        function _updateSubmitButtons(form) {
          applyAutoDisable(form, submitEnabled(formCtx));
        }

        // ── Event binding with validate-on support ─────────
        // Value listeners of `model` fields, re-appended after the subtree is
        // processed (see below).
        const modelListeners = [];
        function listenField(field, type, fn) {
          field.addEventListener(type, fn);
          addDisposer(el, () => field.removeEventListener(type, fn));
        }

        function bindFieldEvents(field) {
          if (!field.name) return;
          const triggers = _getValidationTriggers(field, el);
          // Value listeners run on "input", as in v1.21.1. A text `model`
          // field syncs on "input" too, so its listener moves after `model`'s.
          // A select/checkbox/radio `model` syncs later, on "change": its
          // listener keeps its place and syncs the model before validating.
          const modelEvent = _getModelEvent(field);
          const listenValue = (fn) => {
            if (modelEvent === "change") {
              listenField(field, "input", _syncChoiceModel(field, fn));
              return;
            }
            listenField(field, "input", fn);
            if (modelEvent) modelListeners.push([field, "input", fn]);
          };

          // Every input re-validates; validate-on only gates the display
          // (error classes, templates), which the engine applies.
          listenValue(() => {
            record("input", field.name, triggers);
            checkValidity();
          });
          // focusout touches the field; with `blur` it then counts as an
          // input too (two checks, in that order).
          const touchHandler = () => {
            record("focusout", field.name, TOUCH_ONLY);
            checkValidity();
          };
          if (triggers.includes("blur")) {
            listenField(field, "focusout", () => {
              touchHandler();
              record("input", field.name, triggers);
              checkValidity();
            });
          } else {
            listenField(field, "focusout", touchHandler);
          }
          if (triggers.includes("submit")) {
            listenField(field, "focusout", touchHandler);
          }
        }

        if (!perField) {
          // Legacy behavior: form-level input, change, and focusout
          const inputHandler = (e) => {
            record(e.type === "change" ? "change" : "input", e.target && e.target.name);
            checkValidity();
          };
          // A select/checkbox/radio `model` syncs on "change", after this
          // "input": sync it first so the re-render keeps the user's pick.
          const choiceInputHandler = (e) => {
            if (e.target && _getModelEvent(e.target) === "change") {
              _syncChoiceModel(e.target, () => inputHandler(e))();
            } else {
              inputHandler(e);
            }
          };
          el.addEventListener("input", choiceInputHandler);
          addDisposer(el, () => el.removeEventListener("input", choiceInputHandler));
          el.addEventListener("change", inputHandler);
          addDisposer(el, () => el.removeEventListener("change", inputHandler));
          const focusoutHandler = (e) => {
            record("focusout", e.target && e.target.name);
            checkValidity();
          };
          el.addEventListener("focusout", focusoutHandler);
          addDisposer(el, () => el.removeEventListener("focusout", focusoutHandler));
        } else {
          // Per-field event binding with validate-on
          for (const field of getFields()) {
            bindFieldEvents(field);
          }
          // Field listeners are bound while the form initialises, before the
          // field's own `model` attaches its listener. checkValidity()
          // notifies the context synchronously, so running first made `model`
          // re-render its stale value and wipe what the user typed.
          // Once the subtree is processed, move the value listeners of text
          // `model` fields after `model`'s. Other fields keep their order.
          if (modelListeners.length) {
            let disposed = false;
            addDisposer(el, () => { disposed = true; });
            queueMicrotask(() => {
              if (disposed) return;
              for (const [field, type, fn] of modelListeners) {
                field.removeEventListener(type, fn);
                field.addEventListener(type, fn);
              }
              modelListeners.length = 0;
            });
          }
        }

        const submitHandler = (e) => {
          // Mark all fields as touched on submit
          record("submit");
          checkValidity();

          if (!canSubmit(formCtx)) {
            e.preventDefault();
            e.stopImmediatePropagation();
            return;
          }

          // Set submitting before fetch vs native submit branch
          record("submitting");
          formCtx.submitting = true;
          _updateSubmitButtons(el);
          ctx.$set("$form", { ...formCtx });
          _notifyFormSubtree();
        };
        // Capture phase: run before post=/put=/etc. handlers so validation
        // can block invalid submits and set $form.submitting first.
        el.addEventListener("submit", submitHandler, true);
        addDisposer(el, () => el.removeEventListener("submit", submitHandler, true));
        el.__nojsResetSubmitting = () => {
          record("endSubmit");
          formCtx.submitting = false;
          checkValidity();
        };
        addDisposer(el, () => {
          delete el.__nojsResetSubmitting;
        });

        // Initial check
        requestAnimationFrame(checkValidity);
        return;
      }

      // ═════════════════════════════════════════════════════
      //  FIELD-LEVEL VALIDATION (standalone, outside form)
      // ═════════════════════════════════════════════════════
      const ctx = _findContext(el);
      _markBound(el, ctx);
      if (
        rules &&
        (el.tagName === "INPUT" ||
          el.tagName === "TEXTAREA" ||
          el.tagName === "SELECT")
      ) {
        // Inside <form validate> the form path renders the error template
        // (once, honouring validate-on). This handler keeps only its
        // v1.21.1 aria-invalid update there.
        const inForm = !!el.closest("form[validate]");
        const errorTpl = inForm ? null : el.getAttribute("error");
        const fieldInputHandler = () => {
          // A field its form excludes with validate-if shows no error.
          if (inForm && !_shouldValidate(el, _findContext(el))) {
            el.removeAttribute("aria-invalid");
            return;
          }
          const err = validateValue(el.value, rules, {}, _skipsEmpty(el), _getValidators);
          // ARIA: aria-invalid for screen readers (WCAG 4.1.2)
          if (err) {
            el.setAttribute("aria-invalid", "true");
          } else {
            el.removeAttribute("aria-invalid");
          }
          if (err && errorTpl) {
            let errorEl = el.nextElementSibling?.__validationError
              ? el.nextElementSibling
              : null;
            if (!errorEl) {
              errorEl = document.createElement("div");
              errorEl.__validationError = true;
              errorEl.style.display = "contents";
              el.parentNode.insertBefore(errorEl, el.nextSibling);
            }
            const clone = _cloneTemplate(errorTpl);
            if (clone) {
              const childCtx = _createContext({ err: { message: err } }, ctx);
              _disposeChildren(errorEl);
              errorEl.innerHTML = "";
              errorEl.__ctx = childCtx;
              errorEl.appendChild(clone);
              _processTree(errorEl);
            }
          } else {
            const errorEl = el.nextElementSibling?.__validationError
              ? el.nextElementSibling
              : null;
            if (errorEl) {
              _disposeChildren(errorEl);
              errorEl.innerHTML = "";
            }
          }
        };
        el.addEventListener("input", fieldInputHandler);
        addDisposer(el, () => el.removeEventListener("input", fieldInputHandler));
      }
    },
  };
  _validateInit = validateDirective.init;
  NoJS.directive("validate", validateDirective);
}
