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
];

const NoJSElements = {
  name: "nojs-elements",

  install(NoJS, options = {}) {
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
  },

  // Called by core after init() when the plugin is installed late (e.g. Elements
  // loaded after core had already walked the DOM). Without this, directives
  // registered in install() would never apply to the existing, already-walked
  // tree. Re-clears the premature `__declared` flag on elements bearing Elements
  // directives and re-processes them. (Safety Rule #11: registers cleanly, only
  // re-runs over its own directive attributes — never overrides core.)
  init(NoJS) {
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
