import { registerScrollSpyDirective } from "./scroll-spy.js";
import { resetScrollSpyState } from "./state.js";

export function registerScrollSpy(NoJS, options = {}) {
  registerScrollSpyDirective(NoJS);
}

export function cleanupScrollSpy() {
  resetScrollSpyState();
}
