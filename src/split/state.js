// ─── Module-scoped Split/Pane coordination state ────────────────────

/** Map<Element, { direction, gutterSize, persistKey, panes: Element[], gutters: Element[] }> */
export const _splitRegistry = new Map();

/** Map<Element, { size: string|null, min: number, max: number, collapsible: boolean, collapsed: boolean, preCollapseSize: string|null }> */
export const _paneRegistry = new Map();

/** Active resize session (only one at a time) */
export const _resizeState = {
  active: false,
  splitEl: null,
  gutterEl: null,
  prevPane: null,
  nextPane: null,
  direction: null,
  startPos: 0,
  startPrevSize: 0,
  startNextSize: 0,
  containerSize: 0,
  sign: 1,
};

export function resetSplitState() {
  _splitRegistry.clear();
  _paneRegistry.clear();
  _resizeState.active = false;
  _resizeState.splitEl = null;
  _resizeState.gutterEl = null;
  _resizeState.prevPane = null;
  _resizeState.nextPane = null;
  _resizeState.direction = null;
  _resizeState.startPos = 0;
  _resizeState.startPrevSize = 0;
  _resizeState.startNextSize = 0;
  _resizeState.containerSize = 0;
  _resizeState.sign = 1;
}
