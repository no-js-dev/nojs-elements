import { registerDropdownDirective, uninstallSharedListeners } from "./dropdown.js";
import { registerDropdownItem } from "./item.js";
import { resetDropdownState } from "./state.js";

export function registerDropdown(NoJS, options = {}) {
  registerDropdownDirective(NoJS);
  registerDropdownItem(NoJS);
}

export function cleanupDropdown() {
  uninstallSharedListeners();
  resetDropdownState();
}
