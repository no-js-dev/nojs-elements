import { registerBreadcrumbDirective } from "./breadcrumb.js";
import { resetBreadcrumbState } from "./state.js";

export function registerBreadcrumb(NoJS, options = {}) {
  registerBreadcrumbDirective(NoJS);
}

export function cleanupBreadcrumb() {
  resetBreadcrumbState();
}
