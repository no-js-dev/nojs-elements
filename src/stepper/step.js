import { _injectStepperStyles } from "./styles.js";
import { defineDirective } from "../_backend.js";

// ─── Step directive ─────────────────────────────────────────────────
let _panelIdCounter = 0;

// The stepper links each indicator tab to its panel when it first renders,
// before (core) or after (server-rendered hosts) the [step] directive runs,
// so it asks for the panel id itself.
export function ensureStepId(el) {
  if (!el.id) el.id = `nojs-stepper-panel-${_panelIdCounter++}`;
  return el.id;
}

export function registerStep(NoJS) {
  NoJS.directive("step", defineDirective(NoJS, "step", {
    priority: 13,
    init(el, expr, be) {
      _injectStepperStyles();

      // ── Styling ──
      el.classList.add("nojs-step");

      // ── ARIA: tabpanel ──
      el.setAttribute("role", "tabpanel");
      ensureStepId(el);
      el.setAttribute("tabindex", "0");

      // Stepper.js _updateView() will set the correct aria-hidden/inert
    },
  }));
}
