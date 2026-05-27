// ─── Module-scoped DnD coordination state ─────────────────────────────

/**
 * Shared drag-and-drop state tracking.
 * @type {{ dragging: object|null, selected: Map<string, Set>, placeholder: HTMLElement|null }}
 */
export const _dndState = {
  dragging: null,       // { item, type, effect, sourceEl, sourceCtx, sourceList, sourceIndex, listDirective }
  selected: new Map(),  // group → Set<{ item, el, ctx }>
  placeholder: null,    // current placeholder DOM element
};

/**
 * Registry of drag-list elements for cross-list communication.
 * @type {Map<HTMLElement, { listPath: string, ctx: object, el: HTMLElement }>}
 */
export const _dragListRegistry = new Map();

/**
 * Reset all DnD state (used by cleanupDnd).
 */
export function resetDndState() {
  _dndState.dragging = null;
  _dndState.selected.clear();
  if (_dndState.placeholder) {
    _dndState.placeholder.remove();
    _dndState.placeholder = null;
  }
  _dragListRegistry.clear();
}
