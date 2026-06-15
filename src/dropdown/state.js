// ─── Module-scoped Dropdown coordination state ─────────────────────
export const _dropdownState = {
  openMenus: new Map(), // menuEl → { toggle, wrapper }
};

// Shared singleton for document-level listeners (outside-click + Escape).
// Instead of each dropdown instance adding its own pair of document
// listeners, we install one set when the first instance registers and
// remove them when the last one disposes.
export const _sharedListeners = {
  installed: false,
  instanceCount: 0,
  outsideClickHandler: null,
  escHandler: null,
};

export function resetDropdownState() {
  _dropdownState.openMenus.clear();
  _sharedListeners.installed = false;
  _sharedListeners.instanceCount = 0;
  _sharedListeners.outsideClickHandler = null;
  _sharedListeners.escHandler = null;
}
