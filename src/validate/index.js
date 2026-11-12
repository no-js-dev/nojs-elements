import { registerValidate } from "./element.js";
import { registerValidateHost } from "./host.js";
import { resetValidateState } from "./state.js";
import { isHostBackend } from "../_host.js";

export function registerValidation(NoJS, options = {}) {
  if (isHostBackend(NoJS)) {
    registerValidateHost(NoJS);
    return;
  }
  registerValidate(NoJS);
}

export function cleanupValidation() {
  resetValidateState();
}
