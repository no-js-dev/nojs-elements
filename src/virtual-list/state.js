// ─── Module-scoped Virtual List coordination state ──────────────────

/**
 * Registry of active virtual-list containers.
 * Key: container element
 * Value: {
 *   itemHeight: number | "auto",
 *   buffer: number,
 *   totalItems: number,
 *   heights: number[],            // per-item heights (auto mode)
 *   startIndex: number,
 *   endIndex: number,
 *   scrollTop: number,
 *   template: Node | null,        // cloned original child template
 *   spacerTop: HTMLElement | null,
 *   spacerBottom: HTMLElement | null,
 *   resizeObserver: ResizeObserver | null,
 *   scrollHandler: Function | null,
 *   renderedNodes: Map,           // index → DOM node
 *   disposed: boolean,
 * }
 * @type {Map<HTMLElement, Object>}
 */
export const _virtualListRegistry = new Map();

export function resetVirtualListState() {
  // Run each container's disposers first for proper cleanup.
  const containers = Array.from(_virtualListRegistry.keys());
  for (const container of containers) {
    const state = _virtualListRegistry.get(container);
    if (!state) continue;

    // Remove resize observer
    if (state.resizeObserver) {
      try {
        state.resizeObserver.disconnect();
      } catch (_err) {
        // Error isolation
      }
      state.resizeObserver = null;
    }

    // Remove scroll listener from the container element
    if (state.scrollHandler) {
      try {
        container.removeEventListener("scroll", state.scrollHandler);
      } catch (_err) {
        // Error isolation
      }
      state.scrollHandler = null;
    }

    // Remove spacers
    if (state.spacerTop && state.spacerTop.parentNode) {
      state.spacerTop.remove();
    }
    if (state.spacerBottom && state.spacerBottom.parentNode) {
      state.spacerBottom.remove();
    }

    // Dispose rendered node bindings
    if (state.renderedNodes) {
      for (const [_idx, node] of state.renderedNodes) {
        if (node.__disposers) {
          for (const dispose of node.__disposers) {
            try { dispose(); } catch (_e) { /* isolation */ }
          }
          node.__disposers = null;
        }
        if (node.parentNode) node.remove();
      }
      state.renderedNodes.clear();
    }

    state.disposed = true;
  }

  _virtualListRegistry.clear();
}
