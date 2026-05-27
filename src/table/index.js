import { registerSortable, registerSort, registerFixedHeader, registerFixedCol } from "./table.js";
import { registerTableReorder } from "./reorder.js";
import { resetTableState } from "./state.js";

export function registerTable(NoJS, options = {}) {
  registerSortable(NoJS);
  registerSort(NoJS);
  registerFixedHeader(NoJS);
  registerFixedCol(NoJS);
  registerTableReorder(NoJS);
}

export function cleanupTable() {
  resetTableState();
}
