// ═══════════════════════════════════════════════════════════════════════
//  DIRECTIVE: validate — host backend (NoJS-Server compiled sites)
//
//  Validation runs on the server (NoJS-Server ADR-028). This backend runs
//  no validator and evaluates nothing: it reports facts (values, the event
//  that fired, native ValidityState flags + validationMessage) through the
//  form's validate action, and owns two pieces of DOM state read from the
//  server-rendered `data-nj-form-state` marker: `novalidate` and the submit
//  auto-disable. aria-invalid, error classes, $form readers and error
//  templates are server-rendered; writing them here would be reverted by
//  the next morph.
//
//  Wire markers (rendered by the compiler / server render):
//    data-nj-validate       binding key of the validate action
//    data-nj-form-state     {"valid", "submitting", "pending", "reset"}
//    data-nj-validate-init  present: send one `init` facts dispatch at boot
// ═══════════════════════════════════════════════════════════════════════

import { VALIDITY_FLAGS } from "./engine.js";
import { applyAutoDisable } from "./buttons.js";

export const FACTS_DEBOUNCE_MS = 300;

const KEY_ATTR = "data-nj-validate";
const STATE_ATTR = "data-nj-form-state";
const INIT_ATTR = "data-nj-validate-init";
// Set on the form while a facts dispatch is in flight. The server HTML
// never carries it, so the morph of the next envelope removes it: that
// removal is the "envelope applied" signal the host API does not give.
export const PENDING_ATTR = "data-nj-validate-pending";

const CONTROLS = "input, textarea, select";

// Named controls whose values the server validates (file inputs: native only).
function reportedControls(form) {
  return [...form.querySelectorAll(CONTROLS)].filter(
    (c) => c.name && (c.type || "").toLowerCase() !== "file"
  );
}

// values: checkbox → checked, radio → checked value or "", else value.
// native: failing ValidityState members + message, first control per name.
export function collectFacts(form) {
  const values = {};
  const native = {};
  for (const c of reportedControls(form)) {
    if (c.type === "checkbox") {
      values[c.name] = c.checked;
    } else if (c.type === "radio") {
      if (c.checked) values[c.name] = c.value;
      else if (!(c.name in values)) values[c.name] = "";
    } else {
      values[c.name] = c.value;
    }
    const validity = c.validity;
    if (validity && !validity.valid && !(c.name in native)) {
      const flags = VALIDITY_FLAGS.filter((flag) => validity[flag]);
      if (flags.length) native[c.name] = { flags, message: c.validationMessage };
    }
  }
  return { values, native };
}

function readState(form, host) {
  const state = host.value(form, STATE_ATTR);
  return state && typeof state === "object" ? state : null;
}

function initForm(el, host) {
  const key = el.getAttribute(KEY_ATTR);
  if (!key) {
    host.warn(
      "form[validate] has no validate action: the site was built without a validation engine; the server refuses its submits."
    );
    return;
  }

  // Plugin-owned: kept by the morph, absent without JavaScript.
  el.setAttribute("novalidate", "");

  const view = el.ownerDocument.defaultView;
  const controls = [...el.querySelectorAll(CONTROLS)];
  const perField = el.hasAttribute("validate-on") || controls.some((c) => c.hasAttribute("validate-on"));
  const fieldNames = () => new Set(reportedControls(el).map((c) => c.name));

  let timer = null;         // debounced input/change dispatch
  let queued = null;        // { trigger, field } waiting for the timer
  let inflight = false;     // dispatched, envelope not applied yet
  let disposed = false;
  let lastReset = readState(el, host)?.reset ?? 0;

  // ── Auto-disable ────────────────────────────────────
  // While a facts dispatch is waiting or in flight the buttons stay
  // clickable: a submit intent is never lost, the server re-validates it.
  function applyButtons() {
    if (timer !== null || inflight) {
      applyAutoDisable(el, true, true);
      return;
    }
    const state = readState(el, host);
    if (!state) return;
    applyAutoDisable(el, !!state.valid && !state.pending && !state.submitting, true);
  }

  function onState() {
    const state = readState(el, host);
    if (state && typeof state.reset === "number" && state.reset > lastReset) {
      lastReset = state.reset;
      el.reset();
    }
    applyButtons();
  }

  // ── Facts dispatch ──────────────────────────────────
  function send(trigger, field) {
    const { values, native } = collectFacts(el);
    const payload = { trigger };
    if (field && fieldNames().has(field)) payload.field = field;
    payload.values = values;
    if (Object.keys(native).length) payload.native = native;
    inflight = true;
    el.setAttribute(PENDING_ATTR, "");
    host.exec(key, payload);
  }

  function flush() {
    if (timer === null) return;
    view.clearTimeout(timer);
    timer = null;
    const q = queued;
    queued = null;
    send(q.trigger, q.field);
  }

  // input/change: debounced per form. An event on another field first
  // sends the waiting one, so every field's interaction reaches the server.
  function debounced(trigger, field) {
    if (timer !== null && queued.field !== field) flush();
    if (timer !== null) view.clearTimeout(timer);
    queued = { trigger, field };
    timer = view.setTimeout(() => {
      timer = null;
      const q = queued;
      queued = null;
      send(q.trigger, q.field);
    }, FACTS_DEBOUNCE_MS);
    applyButtons();
  }

  function immediate(trigger, field) {
    flush();
    send(trigger, field);
    applyButtons();
  }

  // ── Listeners: the ones the core directive binds ────
  function listen(target, type, fn, capture = false) {
    target.addEventListener(type, fn, capture);
    host.onDispose(el, () => target.removeEventListener(type, fn, capture));
  }

  if (!perField) {
    listen(el, "input", (e) => debounced("input", e.target && e.target.name));
    listen(el, "change", (e) => debounced("change", e.target && e.target.name));
    listen(el, "focusout", (e) => immediate("focusout", e.target && e.target.name));
  } else {
    for (const field of controls) {
      if (!field.name) continue;
      listen(field, "input", () => debounced("input", field.name));
      listen(field, "focusout", () => immediate("focusout", field.name));
    }
  }

  // A submit of this form sends its waiting facts first. The window capture
  // phase runs before the integrator's delegated (document capture) submit
  // listener, so the facts are queued ahead of the submit action.
  listen(view, "submit", (e) => {
    if (e.target === el) flush();
  }, true);

  // ── Envelope tracking ───────────────────────────────
  // The morph removes PENDING_ATTR (in flight → applied) and strips the
  // `disabled` the server never renders from the buttons; re-apply both.
  const observer = new view.MutationObserver((records) => {
    if (disposed) return;
    if (inflight && !el.hasAttribute(PENDING_ATTR)) inflight = false;
    if (records.some((r) => r.attributeName === STATE_ATTR)) onState();
    else applyButtons();
  });
  observer.observe(el, { attributes: true, subtree: true, attributeFilter: [PENDING_ATTR, STATE_ATTR, "disabled"] });
  host.watch(el, STATE_ATTR, onState);
  host.onDispose(el, () => {
    disposed = true;
    observer.disconnect();
    if (timer !== null) view.clearTimeout(timer);
    timer = null;
  });

  applyButtons();

  // Native messages replace the server's fallback ones. Sent after init so
  // PENDING_ATTR is not recorded as an attribute this plugin owns.
  if (el.hasAttribute(INIT_ATTR)) {
    queueMicrotask(() => {
      if (!disposed) immediate("init");
    });
  }
}

// Standalone field (outside any form[validate]): its own validate action.
function initField(el, host) {
  const key = el.getAttribute(KEY_ATTR);
  if (!key) return;
  const view = el.ownerDocument.defaultView;
  let timer = null;
  const onInput = () => {
    if (timer !== null) view.clearTimeout(timer);
    timer = view.setTimeout(() => {
      timer = null;
      host.exec(key, { trigger: "input", value: el.value });
    }, FACTS_DEBOUNCE_MS);
  };
  el.addEventListener("input", onInput);
  host.onDispose(el, () => {
    el.removeEventListener("input", onInput);
    if (timer !== null) view.clearTimeout(timer);
  });
}

export function registerValidateHost(NoJS) {
  NoJS.directive("validate", {
    priority: 30,
    init(el, host) {
      if (el.tagName === "FORM") {
        initForm(el, host);
        return;
      }
      if (el.closest("form[validate]")) return; // the form reports for it
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "SELECT") {
        initField(el, host);
      }
    },
  });
}
