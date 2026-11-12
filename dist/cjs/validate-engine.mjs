/**
 * NoJS Elements v1.23.0 — Element plugins for No.JS
 * Drag-and-drop, and more.
 * @author exs.dev
 * @homepage https://elements.no-js.dev/
 * @license MIT
 * @repository https://github.com/no-js-dev/nojs-elements
 */
// ═══════════════════════════════════════════════════════════════════════
//  VALIDATION ENGINE — pure semantics of the `validate` directive
//
//  One implementation for both backends (NoJS-Server ADR-028 §3):
//  - core:   validate/element.js gathers facts from the page and calls it;
//  - server: NoJS-Server bundles this module into dist/server/runtime.js
//            (contract member `validation`) and calls it at render time.
//
//  DOM-free, synchronous and deterministic: no browser or host globals,
//  no timers, no I/O and no mutable module state. Everything it needs
//  arrives as arguments: the form specification (attribute values), the
//  per-control facts (values, native validity, validate-if results), the
//  interaction state (touched / dirty / submitting) and the validator
//  table. It never mutates its inputs.
//
//  Shapes (all plain data, JSON-serializable except validator functions):
//
//  FormSpec {
//    validateOn:    string | null    form `validate-on`, raw (null = absent)
//    validateEmpty: string | null    form `validate-empty`, raw
//    errorClass:    string | null    form `error-class`, raw
//    perField?:     boolean          listener mode, see bindingMode()
//    fields:        FieldSpec[]      named controls, in markup order
//  }
//  FieldSpec {
//    name:          string           control name (unnamed controls are omitted)
//    type:          string           lowercased `type` attribute, else "text"
//    kind?:         "checkbox" | "radio" | null   control kind (defaults from type)
//    rules:         string | null    `validate` attribute, raw
//    error:         string | null    `error` attribute, raw ("#id" selects a template)
//    messages:      { [rule]: string }  every `error-<rule>` attribute, raw,
//                                    keyed by the lowercased rule name
//    validateOn:    string | null    field `validate-on`, raw
//    validateEmpty: string | null    field `validate-empty`, raw
//    errorClass:    string | null    field `error-class`, raw
//    as:            string | null    `as` alias name
//    native?:       NativeConstraints  static constraint attributes, for emulateNative()
//  }
//  FieldFacts {
//    value:         string           the control's value (`value` property)
//    checked?:      boolean          checkbox / radio state
//    native?:       { flags: string[], message: string } | null
//                                    failing ValidityState members + validationMessage
//    validateIf?:   boolean | () => boolean   validate-if result (absent = true)
//  }
//  Interaction {
//    touched: string[]; dirty: string[];       field names, insertion order
//    formTouched: boolean; formDirty: boolean; $form.touched / $form.dirty
//    submitting: boolean;
//  }
// ═══════════════════════════════════════════════════════════════════════

export const ENGINE_API = 1;

// ── ValidityState member → rule name (null: the field's type) ────────
export const VALIDITY_MAP = Object.freeze([
  Object.freeze(["valueMissing", "required"]),
  Object.freeze(["typeMismatch", null]),
  Object.freeze(["tooShort", "minlength"]),
  Object.freeze(["tooLong", "maxlength"]),
  Object.freeze(["patternMismatch", "pattern"]),
  Object.freeze(["rangeUnderflow", "min"]),
  Object.freeze(["rangeOverflow", "max"]),
  Object.freeze(["stepMismatch", "step"]),
]);

export const VALIDITY_FLAGS = Object.freeze(VALIDITY_MAP.map(([flag]) => flag));

// ── Priority order of the shown error ────────────────────────────────
export const RULE_PRIORITY = Object.freeze([
  "required", "email", "url", "number", "date", "time",
  "datetime-local", "month", "week", "tel",
  "minlength", "maxlength", "pattern", "min", "max", "step",
]);

// ── Built-in rule messages ───────────────────────────────────────────
export const DEFAULT_MESSAGES = Object.freeze({
  required: "Required",
  email: "Invalid email",
  url: "Invalid URL",
  min: (arg) => `Minimum value is ${arg}`,
  max: (arg) => `Maximum value is ${arg}`,
});

// ── Native constraint messages used when the browser reported none ───
// (first server render, no-JS posts). English, as Chromium words them.
export const FALLBACK_NATIVE_MESSAGES = Object.freeze({
  valueMissing: "Please fill out this field.",
  typeMismatch: {
    email: "Please enter an email address.",
    url: "Please enter a URL.",
    number: "Please enter a number.",
  },
  tooShort: (min, len) =>
    `Please lengthen this text to ${min} characters or more (you are currently using ${len} characters).`,
  tooLong: (max, len) =>
    `Please shorten this text to ${max} characters or less (you are currently using ${len} characters).`,
  patternMismatch: "Please match the requested format.",
  rangeUnderflow: (min) => `Value must be greater than or equal to ${min}.`,
  rangeOverflow: (max) => `Value must be less than or equal to ${max}.`,
  stepMismatch: "Please enter a valid value.",
});

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMPTY_SKIPPED_RULES = new Set(["url", "min", "max"]);
const DEFAULT_TRIGGERS = Object.freeze(["input", "focusout"]);

// ═══════════════════════════════════════════════════════════════════════
//  Small helpers
// ═══════════════════════════════════════════════════════════════════════

export function isEmptyValue(value) {
  return value == null || String(value).trim() === "";
}

function isThenable(value) {
  return value != null && (typeof value === "object" || typeof value === "function") &&
    typeof value.then === "function";
}

function fieldKind(field) {
  if (field.kind !== undefined) return field.kind;
  return field.type === "checkbox" || field.type === "radio" ? field.type : null;
}

// validate-empty: the field's attribute wins when present, even empty.
export function skipsEmpty(form, field) {
  const mode = field.validateEmpty != null ? field.validateEmpty : form && form.validateEmpty;
  return mode === "skip";
}

// validate-on triggers of a field: its own attribute, else the form's,
// else input + focusout. An empty attribute counts as absent here.
export function triggersFor(form, field) {
  if (field.validateOn) return field.validateOn.split(/\s+/);
  if (form && form.validateOn) return form.validateOn.split(/\s+/);
  return DEFAULT_TRIGGERS.slice();
}

// Listener mode: "field" when the form or any of its controls declares
// validate-on (present, even empty), else the legacy form-level mode.
export function bindingMode(form) {
  if (typeof form.perField === "boolean") return form.perField ? "field" : "form";
  if (form.validateOn != null) return "field";
  return form.fields.some((f) => f.validateOn != null) ? "field" : "form";
}

function parseRules(rules) {
  return rules.split("|").map((r) => r.trim()).map((rule) => {
    const [name, ...args] = rule.split(":");
    return { name, args };
  });
}

// The validator table, or a function returning it (read once per call so a
// caller can hand out a live registry).
function tableOf(validators) {
  return (typeof validators === "function" ? validators() : validators) || {};
}

function callValidator(fn, args, onAsync) {
  const result = fn(...args);
  if (onAsync && isThenable(result)) onAsync();
  return result;
}

// ═══════════════════════════════════════════════════════════════════════
//  Rules
// ═══════════════════════════════════════════════════════════════════════

// A failing built-in rule's default message, or null.
function builtInRule(name, args, value, validators, onAsync, allValues) {
  switch (name) {
    case "required":
      return isEmptyValue(value) ? DEFAULT_MESSAGES.required : null;
    case "email":
      return value && !EMAIL_RE.test(value) ? DEFAULT_MESSAGES.email : null;
    case "url":
      try { new URL(value); } catch { return DEFAULT_MESSAGES.url; }
      return null;
    case "min":
      return Number(value) < Number(args[0]) ? DEFAULT_MESSAGES.min(args[0]) : null;
    case "max":
      return Number(value) > Number(args[0]) ? DEFAULT_MESSAGES.max(args[0]) : null;
    case "custom":
      if (args[0] && validators[args[0]]) {
        const result = callValidator(validators[args[0]], [value, allValues], onAsync);
        if (result !== true && result) return result;
      }
      return null;
    default:
      return null;
  }
}

/**
 * Every failing rule of one control: `validate` rules first (custom
 * validators shadow built-in names), then the native ValidityState flags
 * not already covered by a rule of the same name.
 * @returns {Array<{rule: string, message: unknown}>}
 */
export function ruleErrors(form, field, facts, allValues, validators = {}, onAsync) {
  const table = tableOf(validators);
  const errors = [];
  const seen = new Set();
  const value = facts.value;
  const skipEmpty = isEmptyValue(value) && skipsEmpty(form, field);

  if (field.rules) {
    for (const { name, args } of parseRules(field.rules)) {
      const asyncHook = onAsync ? () => onAsync(name) : undefined;
      const fn = table[name];
      if (!fn && skipEmpty && EMPTY_SKIPPED_RULES.has(name)) continue;
      const result = fn
        ? callValidator(fn, [value, ...args, allValues], asyncHook)
        : builtInRule(name, args, value, table, asyncHook, allValues);
      const message = result !== true && result ? result : null;
      if (message) {
        errors.push({ rule: name, message });
        seen.add(name);
      }
    }
  }

  const native = facts.native;
  if (native && native.flags && native.flags.length) {
    for (const [flag, ruleName] of VALIDITY_MAP) {
      if (!native.flags.includes(flag)) continue;
      const name = ruleName || field.type;
      if (!seen.has(name)) {
        errors.push({ rule: name, message: native.message });
        seen.add(name);
      }
    }
  }
  return errors;
}

// error-<rule> > error (unless it selects a template) > default message.
export function resolveMessage(field, rule, defaultMessage) {
  const perRule = field.messages ? field.messages[String(rule).toLowerCase()] : null;
  if (perRule) return perRule;
  const generic = field.error;
  if (generic && !generic.startsWith("#")) return generic;
  return defaultMessage;
}

// The template selector a shown error renders, or null.
export function templateFor(field, rule) {
  const perRule = field.messages ? field.messages[String(rule).toLowerCase()] : null;
  if (perRule && perRule.startsWith("#")) return perRule;
  const generic = field.error;
  if (generic && generic.startsWith("#")) return generic;
  return null;
}

function rank(rule) {
  const i = RULE_PRIORITY.indexOf(rule);
  return i === -1 ? 999 : i;
}

// The highest-priority error with its resolved message (stable on ties).
export function pickError(errors, field) {
  if (!errors.length) return null;
  const top = [...errors].sort((a, b) => rank(a.rule) - rank(b.rule))[0];
  return { rule: top.rule, message: resolveMessage(field, top.rule, top.message) };
}

/**
 * Standalone-field validation (an `input[validate]` outside a validated
 * form): the first failing rule's message in rule order, else null. No
 * priority sort and no native flags, as the field directive does.
 */
export function validateValue(value, rules, allValues, skipEmptyValues = false, validators = {}, onAsync) {
  const skipEmpty = skipEmptyValues && isEmptyValue(value);
  const table = tableOf(validators);
  for (const { name, args } of parseRules(rules)) {
    const asyncHook = onAsync ? () => onAsync(name) : undefined;
    const fn = table[name];
    if (fn) {
      const result = callValidator(fn, [value, ...args, allValues], asyncHook);
      if (result !== true && result) return result;
    } else {
      if (skipEmpty && EMPTY_SKIPPED_RULES.has(name)) continue;
      const message = builtInRule(name, args, value, table, asyncHook, allValues);
      if (message) return message;
    }
  }
  return null;
}

// ═══════════════════════════════════════════════════════════════════════
//  Interaction state
// ═══════════════════════════════════════════════════════════════════════

export function emptyInteraction() {
  return { touched: [], dirty: [], formTouched: false, formDirty: false, submitting: false };
}

function normalize(interaction) {
  const i = interaction || {};
  const touched = Array.isArray(i.touched) ? i.touched : [];
  const dirty = Array.isArray(i.dirty) ? i.dirty : [];
  return {
    touched,
    dirty,
    formTouched: typeof i.formTouched === "boolean" ? i.formTouched : touched.length > 0,
    formDirty: typeof i.formDirty === "boolean" ? i.formDirty : dirty.length > 0,
    submitting: !!i.submitting,
  };
}

function withName(list, name) {
  return name && !list.includes(name) ? [...list, name] : list;
}

function touch(state, name) {
  return { ...state, touched: withName(state.touched, name), formTouched: true };
}

function dirty(state, name) {
  return { ...state, dirty: withName(state.dirty, name), formDirty: true };
}

/**
 * The interaction state after one event. Mirrors the listeners the
 * directive binds:
 *  - legacy form mode: `input` / `change` mark the target dirty, `focusout`
 *    marks it touched;
 *  - per-field mode (a validate-on anywhere): `input` marks the field dirty;
 *    `focusout` marks it touched, and dirty too when `blur` is a trigger;
 *    `change` has no listener;
 *  - `submit` touches every field; `submitting` / `endSubmit` / `reset`
 *    follow $form's submit lifecycle.
 *
 * @param {object} spec        FormSpec
 * @param {object} interaction Interaction (missing members default)
 * @param {{trigger: string, field?: string, triggers?: string[]}} event
 *        `field` is the event target's name; `triggers` overrides the
 *        field's validate-on triggers (the core backend passes the ones its
 *        listener captured).
 * @returns {object} a new Interaction
 */
export function applyEvent(spec, interaction, event) {
  const state = normalize(interaction);
  const { trigger, field } = event;

  switch (trigger) {
    case "submit":
      return spec.fields.reduce((s, f) => touch(s, f.name), { ...state, formTouched: true });
    case "submitting":
      return { ...state, submitting: true };
    case "endSubmit":
      return { ...state, submitting: false };
    case "reset":
      return emptyInteraction();
    case "init":
      return state;
  }

  if (bindingMode(spec) === "form") {
    if (trigger === "input" || trigger === "change") return dirty(state, field);
    if (trigger === "focusout") return touch(state, field);
    return state;
  }

  const fieldSpec = spec.fields.find((f) => f.name === field);
  if (!field || (!fieldSpec && !event.triggers)) return state;
  const triggers = event.triggers || triggersFor(spec, fieldSpec);
  if (trigger === "input") return dirty(state, field);
  if (trigger === "focusout") {
    if (triggers.includes("blur") || triggers.includes("focusout")) {
      const touched = touch(state, field);
      return triggers.includes("blur") ? dirty(touched, field) : touched;
    }
    return touch(state, field);
  }
  return state;
}

// ═══════════════════════════════════════════════════════════════════════
//  Form evaluation
// ═══════════════════════════════════════════════════════════════════════

// $form.values: checkbox → checked, radio → the checked value or "",
// every other control → its value. Later controls of a name win.
export function collectValues(spec, facts) {
  const values = {};
  spec.fields.forEach((field, i) => {
    const f = factsAt(facts, i, field);
    const kind = fieldKind(field);
    if (kind === "checkbox") {
      values[field.name] = !!f.checked;
    } else if (kind === "radio") {
      if (f.checked) values[field.name] = f.value;
      else if (!(field.name in values)) values[field.name] = "";
    } else {
      values[field.name] = f.value;
    }
  });
  return values;
}

function factsAt(facts, i, field) {
  const f = Array.isArray(facts) ? facts[i] : facts && facts[field.name];
  return f || { value: "" };
}

function validateIfResult(f) {
  if (typeof f.validateIf === "function") return !!f.validateIf();
  return f.validateIf === undefined ? true : !!f.validateIf;
}

// Whether a field's error is shown, given its validate-on triggers.
export function isShown(spec, field, touched, dirtied) {
  if (field.validateOn == null && spec.validateOn == null) return touched || dirtied;
  const triggers = triggersFor(spec, field);
  const onInput = triggers.includes("input");
  const onTouch = triggers.includes("blur") || triggers.includes("focusout") || triggers.includes("submit");
  return (onInput && dirtied) || (onTouch && touched);
}

/**
 * Compute $form, the per-control display and the `as` aliases.
 *
 * @param {object} spec        FormSpec
 * @param {Array|object} facts FieldFacts per control (array, parallel to
 *                             spec.fields) or per name
 * @param {object} interaction Interaction
 * @param {object} validators  name → validator, core signature
 *                             `(value, ...args, allValues) => true | string | falsy`
 * @param {object} [hooks]
 * @param {(index: number, display: object) => void} [hooks.onField]
 *        called after each control, before the next one's validate-if
 * @returns {{
 *   form: {valid, dirty, touched, submitting, pending, errors, values,
 *          firstError, errorCount, fields},
 *   display: Array<{name, excluded, invalid, shown, error, errorClass,
 *                   template, as, entry}>,
 *   aliases: object,
 *   warnings: Array<{code: string, field: string, rule: string}>
 * }}
 *   `display[i].shown` drives aria-invalid and the error classes,
 *   `template` is the selector of the error template to render (shown
 *   errors only), `entry` is the $form.fields object for the control.
 */
export function evaluateForm(spec, facts, interaction, validators = {}, hooks = {}) {
  const state = normalize(interaction);
  const touchedSet = new Set(state.touched);
  const dirtySet = new Set(state.dirty);
  const values = collectValues(spec, facts);
  const errors = {};
  const fields = {};
  const display = [];
  const aliases = {};
  const warnings = [];
  const acc = { valid: true, firstError: null, errorCount: 0 };

  spec.fields.forEach((field, i) => {
    const f = factsAt(facts, i, field);
    const fieldTouched = touchedSet.has(field.name);
    const fieldDirty = dirtySet.has(field.name);
    const errorClass = field.errorClass || spec.errorClass || null;
    const item = {};

    if (!validateIfResult(f)) {
      const entry = {
        valid: true, dirty: fieldDirty, touched: fieldTouched,
        error: null, value: values[field.name],
      };
      fields[field.name] = entry;
      Object.assign(item, {
        name: field.name, excluded: true, invalid: false, shown: false,
        error: null, errorClass, template: null, as: field.as || null, entry,
      });
    } else {
      const onAsync = (rule) => warnings.push({ code: "VALIDATE_ASYNC_UNSUPPORTED", field: field.name, rule });
      const top = pickError(ruleErrors(spec, field, f, values, validators, onAsync), field);
      const fieldValid = !top;
      const shown = isShown(spec, field, fieldTouched, fieldDirty);

      if (!fieldValid) acc.valid = false;
      if (!fieldValid && shown) {
        errors[field.name] = top.message;
        acc.errorCount++;
        if (!acc.firstError) acc.firstError = top.message;
      }

      const entry = {
        valid: fieldValid, dirty: fieldDirty, touched: fieldTouched,
        error: top ? top.message : null, value: values[field.name],
      };
      fields[field.name] = entry;
      Object.assign(item, {
        name: field.name, excluded: false, invalid: !fieldValid, shown: !fieldValid && shown,
        error: top, errorClass,
        template: top && shown ? templateFor(field, top.rule) : null,
        as: field.as || null, entry,
      });
    }

    if (item.as) aliases[item.as] = item.entry;
    display.push(item);
    if (hooks.onField) hooks.onField(i, item);
  });

  return {
    form: {
      valid: acc.valid,
      dirty: state.formDirty,
      touched: state.formTouched,
      submitting: state.submitting,
      pending: false,
      errors,
      values,
      firstError: acc.firstError,
      errorCount: acc.errorCount,
      fields,
    },
    display,
    aliases,
    warnings,
  };
}

/** Whether a submit may proceed: valid and nothing pending. */
export function canSubmit(form) {
  return !!form.valid && !form.pending;
}

/** Submit buttons are enabled when valid, nothing pending, not submitting. */
export function submitEnabled(form) {
  return !!form.valid && !form.pending && !form.submitting;
}

// ═══════════════════════════════════════════════════════════════════════
//  Native constraint emulation (server side: acceptance never trusts the
//  browser's report)
// ═══════════════════════════════════════════════════════════════════════

// NativeConstraints { required?, minlength?, maxlength?, pattern?, min?,
// max?, step?, multiple? } hold the static attribute values (strings;
// `required` / `multiple` true when present).

function decimals(n) {
  const s = String(n);
  const dot = s.indexOf(".");
  return dot === -1 ? 0 : s.length - dot - 1;
}

function stepMismatch(num, step, base) {
  if (step == null || String(step).toLowerCase() === "any") return false;
  const s = Number(step);
  if (!(s > 0)) return false;
  const b = base != null && base !== "" && !Number.isNaN(Number(base)) ? Number(base) : 0;
  const scale = 10 ** Math.max(decimals(s), decimals(b), decimals(num));
  const diff = Math.round((num - b) * scale);
  return diff % Math.round(s * scale) !== 0;
}

function isUrl(value) {
  try { new URL(value); return true; } catch { return false; }
}

function patternMatches(pattern, value) {
  try {
    return new RegExp(`^(?:${pattern})$`, "v").test(value);
  } catch {
    try {
      return new RegExp(`^(?:${pattern})$`, "u").test(value);
    } catch {
      return true; // an invalid pattern constrains nothing, as in browsers
    }
  }
}

/**
 * The ValidityState a browser would compute for a control from its static
 * constraint attributes, with fallback messages. Covers required,
 * minlength / maxlength (user-edited values), pattern, min / max / step on
 * number inputs, and type email / url / number.
 *
 * @param {object} field  FieldSpec (uses type, kind, native)
 * @param {{value: string, checked?: boolean}} facts
 * @returns {{flags: string[], message: string} | null} null when valid
 */
export function emulateNative(field, facts) {
  const c = field.native || {};
  const kind = fieldKind(field);
  const value = facts.value == null ? "" : String(facts.value);
  const flags = [];
  const messages = [];
  const fail = (flag, msg) => {
    flags.push(flag);
    messages.push(msg);
  };
  const report = () => (flags.length ? { flags, message: messages[0] } : null);

  if (c.required) {
    const missing = kind === "checkbox" || kind === "radio" ? !facts.checked : value === "";
    if (missing) fail("valueMissing", FALLBACK_NATIVE_MESSAGES.valueMissing);
  }
  if (value === "" || kind === "checkbox" || kind === "radio") {
    return report();
  }

  const type = field.type;
  if (type === "email") {
    const parts = value.split(",").map((p) => p.trim());
    const ok = (c.multiple ? parts : [value]).every((p) => /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/.test(p));
    if (!ok) fail("typeMismatch", FALLBACK_NATIVE_MESSAGES.typeMismatch.email);
  } else if (type === "url") {
    if (!isUrl(value)) fail("typeMismatch", FALLBACK_NATIVE_MESSAGES.typeMismatch.url);
  }

  const len = [...value].length;
  if (c.minlength != null && c.minlength !== "" && len < Number(c.minlength)) {
    fail("tooShort", FALLBACK_NATIVE_MESSAGES.tooShort(c.minlength, len));
  }
  if (c.maxlength != null && c.maxlength !== "" && len > Number(c.maxlength)) {
    fail("tooLong", FALLBACK_NATIVE_MESSAGES.tooLong(c.maxlength, len));
  }
  if (c.pattern != null && type !== "number" && !patternMatches(c.pattern, value)) {
    fail("patternMismatch", FALLBACK_NATIVE_MESSAGES.patternMismatch);
  }

  if (type === "number") {
    const num = Number(value);
    if (value.trim() === "" || Number.isNaN(num)) {
      fail("typeMismatch", FALLBACK_NATIVE_MESSAGES.typeMismatch.number);
    } else {
      if (c.min != null && c.min !== "" && num < Number(c.min)) {
        fail("rangeUnderflow", FALLBACK_NATIVE_MESSAGES.rangeUnderflow(c.min));
      }
      if (c.max != null && c.max !== "" && num > Number(c.max)) {
        fail("rangeOverflow", FALLBACK_NATIVE_MESSAGES.rangeOverflow(c.max));
      }
      if (stepMismatch(num, c.step, c.min)) fail("stepMismatch", FALLBACK_NATIVE_MESSAGES.stepMismatch);
    }
  }

  return report();
}
