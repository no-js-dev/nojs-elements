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
import { registerVirtualList, cleanupVirtualList } from "./virtual-list/index.js";
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

// Attribute names of every directive registered by this plugin. Used by the
// `init` hook to re-process DOM that core already walked before Elements was
// installed (core marks every walked element `__declared`, even when no
// directive matched, so a plain re-walk would skip them).
const ELEMENT_DIRECTIVE_ATTRS = [
  "tooltip",
  "popover", "popover-trigger", "popover-dismiss",
  "modal", "modal-open", "modal-close",
  "dropdown", "dropdown-toggle", "dropdown-menu", "dropdown-item",
  "toast", "toast-container",
  "tabs", "tab", "tab-disabled", "tab-position",
  "tree", "branch", "subtree",
  "stepper", "step",
  "skeleton",
  "split", "pane", "panel",
  "sortable", "sort", "fixed-header", "fixed-col",
  "virtual", "virtual-height", "virtual-buffer",
];

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
    registerVirtualList(NoJS, options);

    // Load order 1: core auto-init already processed these nodes with stubs.
    _rebindSwappedNodes(NoJS);
  },

  // Runs after core init() has built the root context + processed the tree.
  //
  // Two responsibilities, both required:
  //  1. Load order 2 (validate/drag/drop/...): re-bind any swapped node that was
  //     bound against a not-yet-ready context so it picks up the live root context.
  //  2. Late install: when Elements loads after core already walked the DOM, the
  //     directives registered in install() would never apply to the existing,
  //     already-walked tree. Re-clear the premature `__declared` flag on elements
  //     bearing Elements directives and re-process them. (Safety Rule #11:
  //     registers cleanly, only re-runs over its own directive attributes —
  //     never overrides core.)
  init(NoJS) {
    _rebindSwappedNodes(NoJS);

    if (typeof document === "undefined" || !document.body) return;
    const selector = ELEMENT_DIRECTIVE_ATTRS.map((a) => `[${a}]`).join(",");
    let nodes;
    try {
      nodes = document.body.querySelectorAll(selector);
    } catch {
      return;
    }
    for (const node of nodes) {
      // Only reset elements core marked declared but on which nothing ran
      // (no disposers / no context) — i.e. directives that were skipped because
      // Elements was not yet registered when core walked the tree.
      if (node.__declared && !node.__disposers && !node.__ctx) {
        node.__declared = false;
      }
    }
    try {
      NoJS.processTree(document.body);
    } catch (e) {
      NoJS.internals?.warn?.("nojs-elements init re-process error:", e.message);
    }
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
    cleanupVirtualList();
  },
};

export default NoJSElements;
