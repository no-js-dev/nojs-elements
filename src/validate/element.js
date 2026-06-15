// ═══════════════════════════════════════════════════════════════════════
//  DIRECTIVE: validate  (priority 30)
//  Extracted from NoJS Core — full form + field-level validation.
//  HELPERS: _validateField, _getValidityErrors, _resolveErrorMessage
// ═══════════════════════════════════════════════════════════════════════

import { _validityMap, _rulePriority } from "./state.js";
import { _internal } from "../_compat.js";

// ── Disposer helper (Elements pattern) ───────────────────────────────
function addDisposer(el, fn) {
  el.__disposers = el.__disposers || [];
  el.__disposers.push(fn);
}

// ── Kept at module scope so helpers can reference them after init ─────
let _validators;
let _evaluate;
let _createContext;
let _findContext;
let _processTree;
let _cloneTemplate;
let _disposeChildren;
let _disposeTree;
let _warn;

// ── Reset the __declared marker so processTree re-processes a subtree ──
// Mirrors core's dom._clearDeclared (not exposed on internals). On a fresh
// clone this is a no-op; it is the safety net for the dispose-before-reprocess
// path so re-rendered wrappers get fully re-bound.
function _clearDeclared(el) {
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_ELEMENT);
  while (walker.nextNode()) walker.currentNode.__declared = false;
}

// ── Helper: get field input type ─────────────────────────────────────
function _getFieldType(field) {
  return (field.getAttribute("type") || "text").toLowerCase();
}

// ── Get all failing rules from ValidityState + NoJS validators ───────
function _getValidityErrors(field, allValues) {
  const errors = [];
  const seenRules = new Set();

  // First, check NoJS-specific validators from validate="" attribute
  // (these take priority over native ValidityState messages)
  const rules = field.getAttribute("validate");
  if (rules) {
    const ruleList = rules.split("|").map((r) => r.trim());
    for (const rule of ruleList) {
      const [name, ...args] = rule.split(":");
      const fn = _validators[name];
      if (fn) {
        const result = fn(field.value, ...args, allValues);
        if (result !== true && result) {
          errors.push({ rule: name, message: result });
          seenRules.add(name);
        }
      } else {
        // Built-in NoJS validators (backward compat + NoJS-only)
        const value = field.value;
        let msg = null;
        switch (name) {
          case "required":
            if (value == null || String(value).trim() === "") msg = "Required";
            break;
          case "email":
            if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) msg = "Invalid email";
            break;
          case "url":
            try { new URL(value); } catch { msg = "Invalid URL"; }
            break;
          case "min":
            if (Number(value) < Number(args[0])) msg = `Minimum value is ${args[0]}`;
            break;
          case "max":
            if (Number(value) > Number(args[0])) msg = `Maximum value is ${args[0]}`;
            break;
          case "custom":
            if (args[0] && _validators[args[0]]) {
              const result = _validators[args[0]](value, allValues);
              if (result !== true && result) msg = result;
            }
            break;
        }
        if (msg) {
          errors.push({ rule: name, message: msg });
          seenRules.add(name);
        }
      }
    }
  }

  // Then, check native ValidityState (skip rules already covered by NoJS validators)
  const validity = field.validity;
  if (validity && !validity.valid) {
    for (const [prop, ruleName] of _validityMap) {
      if (validity[prop]) {
        const name = ruleName || _getFieldType(field);
        if (!seenRules.has(name)) {
          errors.push({ rule: name, message: field.validationMessage });
          seenRules.add(name);
        }
      }
    }
  }

  return errors;
}

// ── Resolve error message: error-{rule} attr → error attr → default ──
function _resolveErrorMessage(field, ruleName, defaultMsg) {
  const perRule = field.getAttribute(`error-${ruleName}`);
  if (perRule) return perRule;
  const generic = field.getAttribute("error");
  if (generic && !generic.startsWith("#")) return generic;
  return defaultMsg;
}

// ── Pick the highest-priority error from a list ──────────────────────
function _pickError(errors, field) {
  if (!errors.length) return null;

  // Sort by priority
  const sorted = [...errors].sort((a, b) => {
    const ai = _rulePriority.indexOf(a.rule);
    const bi = _rulePriority.indexOf(b.rule);
    return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
  });

  const top = sorted[0];
  return {
    rule: top.rule,
    message: _resolveErrorMessage(field, top.rule, top.message),
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
  const childCtx = _createContext({ $error: errorMsg, $rule: ruleName }, ctx);
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

// ── Backward-compat: old _validateField for field-level validation ───
function _validateField(value, rules, allValues) {
  const ruleList = rules.split("|").map((r) => r.trim());
  for (const rule of ruleList) {
    const [name, ...args] = rule.split(":");
    const fn = _validators[name];
    if (fn) {
      const result = fn(value, ...args, allValues);
      if (result !== true && result) return result;
    } else {
      switch (name) {
        case "required":
          if (value == null || String(value).trim() === "") return "Required";
          break;
        case "email":
          if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Invalid email";
          break;
        case "url":
          try { new URL(value); } catch { return "Invalid URL"; }
          break;
        case "min":
          if (Number(value) < Number(args[0])) return `Minimum value is ${args[0]}`;
          break;
        case "max":
          if (Number(value) > Number(args[0])) return `Maximum value is ${args[0]}`;
          break;
        case "custom":
          if (args[0] && _validators[args[0]]) {
            const result = _validators[args[0]](value, allValues);
            if (result !== true && result) return result;
          }
          break;
      }
    }
  }
  return null;
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
  for (let a = formEl.parentElement; a; a = a.parentElement) {
    if (a.__ctx) return _findContext(formEl); // inherit ancestor ctx, don't shadow
  }
  const ctx = _createContext({}, null);
  formEl.__ctx = ctx;
  return ctx;
}

// ═══════════════════════════════════════════════════════════════════════
//  Registration
// ═══════════════════════════════════════════════════════════════════════

export function registerValidate(NoJS) {
  // Bind NoJS APIs to module-scoped references for helpers (guarded for old cores)
  _validators = _internal(NoJS, 'validators') || {};
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

  // Remove the core stub so we can register the full implementation
  const removeCore = _internal(NoJS, 'removeCoreDirective');
  if (typeof removeCore === 'function') {
    removeCore("validate");
  } else {
    _warn('[nojs-elements] core too old (<1.13.0): cannot remove "validate" stub; update NoJS core to 1.13.0+.');
  }

  NoJS.directive("validate", {
    priority: 30,
    init(el, name, rules) {
      // ═════════════════════════════════════════════════════
      //  FORM-LEVEL VALIDATION
      // ═════════════════════════════════════════════════════
      if (el.tagName === "FORM") {
        // Bind/cache a form-level context so descendants share $form.
        const ctx = _bindFormContext(el);
        // Prevent native browser validation popups
        el.setAttribute("novalidate", "");

        const errorClassAttr = el.getAttribute("error-class");
        const touchedFields = new Set();
        const dirtyFields = new Set();
        const pendingValidators = new Map();

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
            formCtx.dirty = false;
            formCtx.touched = false;
            formCtx.pending = false;
            formCtx.submitting = false;
            touchedFields.clear();
            dirtyFields.clear();
            el.reset();
            checkValidity();
          },
          endSubmit: () => {
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

        // ── Main validation check ──────────────────────────
        function checkValidity() {
          const errors = {};
          const values = {};
          const fields = {};
          let valid = true;
          let firstError = null;
          let errorCount = 0;
          let hasPending = false;

          for (const field of getFields()) {
            if (!field.name) continue;

            // Collect value
            if (field.type === "checkbox") {
              values[field.name] = field.checked;
            } else if (field.type === "radio") {
              if (field.checked) values[field.name] = field.value;
              else if (!(field.name in values)) values[field.name] = "";
            } else {
              values[field.name] = field.value;
            }
          }

          for (const field of getFields()) {
            if (!field.name) continue;

            const fieldTouched = touchedFields.has(field.name);
            const fieldDirty = dirtyFields.has(field.name);

            // Check validate-if
            if (!_shouldValidate(field, ctx)) {
              // Field excluded from validation
              fields[field.name] = {
                valid: true, dirty: fieldDirty, touched: fieldTouched,
                error: null, value: values[field.name],
              };
              continue;
            }

            // Get all errors for this field
            const fieldErrors = _getValidityErrors(field, values);
            const topError = _pickError(fieldErrors, field);

            const fieldValid = !topError;

            // Gate error DISPLAY on the field's validate-on triggers. Dirty (typing)
            // alone must not surface an error for a focusout/submit-only field — that
            // would defeat validate-on="focusout". When the only display trigger is
            // focusout/blur/submit, require touched; when "input" is a trigger, dirty
            // qualifies; with no validate-on, either interaction shows the error.
            const _triggers = _getValidationTriggers(field, el);
            const _showsOnInput = _triggers.includes("input");
            const _showsOnTouch =
              _triggers.includes("blur") ||
              _triggers.includes("focusout") ||
              _triggers.includes("submit");
            let fieldInteracted;
            if (!field.hasAttribute("validate-on") && !el.hasAttribute("validate-on")) {
              fieldInteracted = fieldTouched || fieldDirty;       // legacy / default
            } else {
              fieldInteracted =
                (_showsOnInput && fieldDirty) || (_showsOnTouch && fieldTouched);
            }

            // $form.valid reflects real state (keeps submit disabled)
            if (!fieldValid) valid = false;

            // $form.errors only shows errors for interacted fields
            if (!fieldValid && fieldInteracted) {
              errors[field.name] = topError.message;
              errorCount++;
              if (!firstError) firstError = topError.message;
            }

            // Per-field context ($field)
            fields[field.name] = {
              valid: fieldValid,
              dirty: fieldDirty,
              touched: fieldTouched,
              error: topError ? topError.message : null,
              value: values[field.name],
            };

            // ARIA: set aria-invalid for screen readers (WCAG 4.1.2)
            if (!fieldValid && fieldInteracted) {
              field.setAttribute("aria-invalid", "true");
            } else {
              field.removeAttribute("aria-invalid");
            }

            // error-class handling
            const fieldErrorClass = field.getAttribute("error-class") || errorClassAttr;
            if (fieldErrorClass) {
              const classes = fieldErrorClass.split(/\s+/);
              if (!fieldValid && fieldInteracted) {
                field.classList.add(...classes);
              } else {
                field.classList.remove(...classes);
              }
            }

            // error template references (error="#tpl" or error-{rule}="#tpl")
            if (topError && fieldInteracted) {
              const perRuleVal = field.getAttribute(`error-${topError.rule}`);
              const genericVal = field.getAttribute("error");
              const tplRef = (perRuleVal && perRuleVal.startsWith("#") ? perRuleVal : null) ||
                             (genericVal && genericVal.startsWith("#") ? genericVal : null);
              if (tplRef) {
                _renderErrorTemplate(tplRef, topError.message, topError.rule, field, ctx);
              } else {
                _clearErrorTemplate(field);
              }
            } else {
              _clearErrorTemplate(field);
            }

            // $field via as="" attribute
            const asAttr = field.getAttribute("as");
            if (asAttr) {
              ctx.$set(asAttr, fields[field.name]);
            }
          }

          // Check for pending async validators
          if (pendingValidators.size > 0) hasPending = true;

          formCtx.valid = valid;
          formCtx.errors = errors;
          formCtx.values = values;
          formCtx.fields = fields;
          formCtx.firstError = firstError;
          formCtx.errorCount = errorCount;
          formCtx.pending = hasPending;
          ctx.$set("$form", { ...formCtx });
          _notifyFormSubtree();

          // Auto-disable submit buttons
          _updateSubmitButtons(el);
        }

        // ── Auto-disable submit buttons ────────────────────
        function _updateSubmitButtons(form) {
          const isEnabled = formCtx.valid && !formCtx.pending && !formCtx.submitting;
          const buttons = form.querySelectorAll(
            'button:not([type="button"]), input[type="submit"]'
          );
          for (const btn of buttons) {
            // Skip if user has explicit disabled expression
            if (btn.hasAttribute("disabled") && btn.getAttribute("disabled") !== "") {
              const val = btn.getAttribute("disabled");
              // Only skip if it's a custom expression (not empty or "disabled")
              if (val !== "disabled" && val !== "true" && val !== "false") continue;
            }
            btn.disabled = !isEnabled;
            btn.__autoDisabled = true;
          }
        }

        // ── Event binding with validate-on support ─────────
        function bindFieldEvents(field) {
          if (!field.name) return;
          const triggers = _getValidationTriggers(field, el);

          const handler = () => {
            dirtyFields.add(field.name);
            formCtx.dirty = true;
            checkValidity();
          };

          const touchHandler = () => {
            touchedFields.add(field.name);
            formCtx.touched = true;
            checkValidity();
          };

          if (triggers.includes("input")) {
            field.addEventListener("input", handler);
            addDisposer(el, () => field.removeEventListener("input", handler));
          } else {
            // Always track dirty and re-validate on input for data accuracy
            // (validate-on only affects visual feedback like error-class/templates)
            const silentInputHandler = () => {
              dirtyFields.add(field.name);
              formCtx.dirty = true;
              checkValidity();
            };
            field.addEventListener("input", silentInputHandler);
            addDisposer(el, () => field.removeEventListener("input", silentInputHandler));
          }
          if (triggers.includes("blur") || triggers.includes("focusout")) {
            const blurFocusoutHandler = () => {
              touchHandler();
              if (triggers.includes("blur")) handler();
            };
            field.addEventListener("focusout", blurFocusoutHandler);
            addDisposer(el, () => field.removeEventListener("focusout", blurFocusoutHandler));
          } else {
            // Always track touched on focusout
            field.addEventListener("focusout", touchHandler);
            addDisposer(el, () => field.removeEventListener("focusout", touchHandler));
          }
          if (triggers.includes("submit")) {
            field.addEventListener("focusout", touchHandler);
            addDisposer(el, () => field.removeEventListener("focusout", touchHandler));
          }
        }

        // Default events if no validate-on (backward compat)
        const hasValidateOn = el.hasAttribute("validate-on");
        const hasFieldValidateOn = [...getFields()].some(f => f.hasAttribute("validate-on"));

        if (!hasValidateOn && !hasFieldValidateOn) {
          // Legacy behavior: form-level input, change, and focusout
          const inputHandler = (e) => {
            const target = e.target;
            if (target && target.name) {
              dirtyFields.add(target.name);
            }
            formCtx.dirty = true;
            checkValidity();
          };
          el.addEventListener("input", inputHandler);
          addDisposer(el, () => el.removeEventListener("input", inputHandler));
          el.addEventListener("change", inputHandler);
          addDisposer(el, () => el.removeEventListener("change", inputHandler));
          const focusoutHandler = (e) => {
            if (e.target && e.target.name) {
              touchedFields.add(e.target.name);
            }
            formCtx.touched = true;
            checkValidity();
          };
          el.addEventListener("focusout", focusoutHandler);
          addDisposer(el, () => el.removeEventListener("focusout", focusoutHandler));
        } else {
          // Per-field event binding with validate-on
          for (const field of getFields()) {
            bindFieldEvents(field);
          }
        }

        const submitHandler = (e) => {
          // Mark all fields as touched on submit
          for (const field of getFields()) {
            if (field.name) touchedFields.add(field.name);
          }
          formCtx.touched = true;
          checkValidity();

          if (!formCtx.valid || formCtx.pending) {
            e.preventDefault();
            e.stopImmediatePropagation();
            return;
          }

          // Set submitting before fetch vs native submit branch
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
      if (
        rules &&
        (el.tagName === "INPUT" ||
          el.tagName === "TEXTAREA" ||
          el.tagName === "SELECT")
      ) {
        const errorTpl = el.getAttribute("error");
        const fieldInputHandler = () => {
          const err = _validateField(el.value, rules, {});
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
  });
}
