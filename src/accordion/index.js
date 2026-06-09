import { registerAccordionDirective } from "./accordion.js";
import { resetAccordionState } from "./state.js";

export function registerAccordion(NoJS, options = {}) {
  registerAccordionDirective(NoJS);
}

export function cleanupAccordion() {
  resetAccordionState();
}
