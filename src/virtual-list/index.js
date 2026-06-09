import { registerVirtualListDirective } from "./virtual-list.js";
import { resetVirtualListState } from "./state.js";

export function registerVirtualList(NoJS, options = {}) {
  registerVirtualListDirective(NoJS);
}

export function cleanupVirtualList() {
  resetVirtualListState();
}
