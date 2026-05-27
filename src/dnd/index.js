import { registerDrag, registerDrop, registerDragList, registerDragMultiple } from "./element.js";
import { resetDndState } from "./state.js";

export function registerDnd(NoJS, options = {}) {
  registerDrag(NoJS);
  registerDrop(NoJS);
  registerDragList(NoJS);
  registerDragMultiple(NoJS);
}

export function cleanupDnd() {
  resetDndState();
}
