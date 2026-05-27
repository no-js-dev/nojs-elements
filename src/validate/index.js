import { registerValidate } from "./element.js";
import { resetValidateState } from "./state.js";

export function registerValidation(NoJS, options = {}) {
  registerValidate(NoJS);
}

export function cleanupValidation() {
  resetValidateState();
}
