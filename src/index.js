import { registerDnd, cleanupDnd } from "./dnd/index.js";
import { registerValidation, cleanupValidation } from "./validate/index.js";
import { registerTooltipModule, cleanupTooltip } from "./tooltip/index.js";
import { registerPopover, cleanupPopover } from "./popover/index.js";
import { registerModal, cleanupModal } from "./modal/index.js";
import { registerDropdown, cleanupDropdown } from "./dropdown/index.js";
import { registerToast, cleanupToast } from "./toast/index.js";
import { registerTabs, cleanupTabs } from "./tabs/index.js";
import { registerTree, cleanupTree } from "./tree/index.js";
import { registerStepperModule, cleanupStepper } from "./stepper/index.js";
import { registerSkeleton, cleanupSkeleton } from "./skeleton/index.js";
import { registerSplit, cleanupSplit } from "./split/index.js";
import { registerTable, cleanupTable } from "./table/index.js";
import { _internal } from "./_compat.js";

// Elements whose core stubs this plugin replaces with full implementations.
const SWAPPED = '[validate],[drag],[drop],[drag-list],[drag-multiple]';

// Re-bind any [validate]/[drag]/... node that core already processed (against the
// removed stub) so it re-runs against the real directive and the live root context.
//
// This covers TWO load orders:
//  1. Core IIFE auto-init runs processTree() BEFORE this plugin installs → nodes are
//     __declared with stub bindings (static $form, blocking submit handler).
//  2. Plugin installs BEFORE core init → at processTree time the real `validate`
//     binds, but the root context may not exist yet, so $form lands on an orphan
//     context. Running this AFTER core init (via the plugin `init` hook, once the
//     root context is established) re-binds it onto the real context.
function _rebindSwappedNodes(NoJS) {
  if (typeof document === 'undefined') return;
  const nodes = document.querySelectorAll(SWAPPED);
  for (const el of nodes) {
    if (!el.__declared) continue;            // not yet processed → real directive will catch it
    const disposeTree = _internal(NoJS, 'disposeTree');
    if (typeof disposeTree === 'function') {
      disposeTree(el);                       // fires stub disposers, resets __declared, clears listeners
    } else {
      if (el.__disposers) { el.__disposers.forEach(fn => fn()); el.__disposers = null; }
      el.__declared = false;
    }
    const ctx = NoJS.findContext ? NoJS.findContext(el) : null;
    if (ctx) delete ctx.$form;               // drop stub's / orphan's static $form
    NoJS.processTree(el);                     // re-bind with real directive + live context
  }
}

const NoJSElements = {
  name: "nojs-elements",

  install(NoJS, options = {}) {
    // Core extracted modules (register first — other elements may integrate)
    registerDnd(NoJS, options);
    registerValidation(NoJS, options);

    // UI elements
    registerTooltipModule(NoJS, options);
    registerPopover(NoJS, options);
    registerModal(NoJS, options);
    registerDropdown(NoJS, options);
    registerToast(NoJS, options);
    registerTabs(NoJS, options);
    registerTree(NoJS, options);
    registerStepperModule(NoJS, options);
    registerSkeleton(NoJS, options);
    registerSplit(NoJS, options);
    registerTable(NoJS, options);

    // Load order 1: core auto-init already processed these nodes with stubs.
    _rebindSwappedNodes(NoJS);
  },

  // Load order 2: runs after core init() has built the root context + processed the
  // tree, so any node bound against a not-yet-ready context is re-bound correctly.
  init(NoJS) {
    _rebindSwappedNodes(NoJS);
  },

  dispose(NoJS) {
    cleanupDnd();
    cleanupValidation();
    cleanupTooltip();
    cleanupPopover();
    cleanupModal();
    cleanupDropdown();
    cleanupToast();
    cleanupTabs();
    cleanupTree();
    cleanupStepper();
    cleanupSkeleton();
    cleanupSplit();
    cleanupTable();
  },
};

export default NoJSElements;
