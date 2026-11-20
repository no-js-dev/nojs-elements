import { registerDrag, registerDrop, registerDragList, registerDragMultiple } from "./element.js";
import { resetDndState } from "./state.js";

// Directives of this module that run on the NoJS-Server host API.
export const DND_HOST_DIRECTIVES = ["drag", "drop", "drag-list", "drag-multiple"];

export function registerDnd(NoJS, options = {}) {
  registerDrag(NoJS);
  registerDrop(NoJS);
  registerDragList(NoJS);
  registerDragMultiple(NoJS);
}

export function cleanupDnd() {
  resetDndState();
}
