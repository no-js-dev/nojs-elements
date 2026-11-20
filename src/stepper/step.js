import { _injectStepperStyles } from "./styles.js";
import { defineDirective } from "../_backend.js";

// ─── Step directive ─────────────────────────────────────────────────
let _panelIdCounter = 0;

export function registerStep(NoJS) {
  NoJS.directive("step", defineDirective(NoJS, "step", {
    priority: 13,
    init(el, expr, be) {
      _injectStepperStyles();

      // ── Styling ──
      el.classList.add("nojs-step");

      // ── ARIA: tabpanel ──
      el.setAttribute("role", "tabpanel");
      if (!el.id) {
        el.id = `nojs-stepper-panel-${_panelIdCounter++}`;
      }
      el.setAttribute("tabindex", "0");

      // Stepper.js _updateView() will set the correct aria-hidden/inert
    },
  }));
}
