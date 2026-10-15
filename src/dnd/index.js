import { registerDrag, registerDrop, registerDragList, registerDragMultiple } from "./element.js";
import { resetDndState } from "./state.js";
import { isHostBackend } from "../_host.js";

// Directives of this module that run on the NoJS-Server host API.
export const DND_HOST_DIRECTIVES = ["drag", "drop"];

export function registerDnd(NoJS, options = {}) {
  registerDrag(NoJS);
  registerDrop(NoJS);
  if (isHostBackend(NoJS)) return; // drag-list / drag-multiple: not on the host API yet
  registerDragList(NoJS);
  registerDragMultiple(NoJS);
}

export function cleanupDnd() {
  resetDndState();
}
