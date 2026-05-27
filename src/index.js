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
