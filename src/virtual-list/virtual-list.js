import { _virtualListRegistry } from "./state.js";
import { _injectVirtualListStyles } from "./styles.js";

function addDisposer(el, fn) {
  el.__disposers = el.__disposers || [];
  el.__disposers.push(fn);
}

// ─── Helpers ────────────────────────────────────────────────────────

/**
 * Find the `each`/`foreach`/`for` binding expression on an element or its
 * direct children. Returns { eachEl, iteratorVar, arrayPath } or null.
 */
function _findEachBinding(container) {
  // Check container itself
  for (const attr of ["each", "foreach", "for"]) {
    if (container.hasAttribute(attr)) {
      const parsed = _parseEachExpr(container.getAttribute(attr));
      if (parsed) return { eachEl: container, ...parsed };
    }
  }
  // Check direct children
  for (const child of container.children) {
    for (const attr of ["each", "foreach", "for"]) {
      if (child.hasAttribute(attr)) {
        const parsed = _parseEachExpr(child.getAttribute(attr));
        if (parsed) return { eachEl: child, ...parsed };
      }
    }
  }
  return null;
}

/**
 * Parse "item in arrayName" or "item of arrayName".
 */
function _parseEachExpr(expr) {
  if (!expr) return null;
  const match = expr.match(/^\s*(\w+)\s+(?:in|of)\s+(.+)\s*$/);
  if (!match) return null;
  return { iteratorVar: match[1], arrayPath: match[2].trim() };
}

/**
 * Resolve a dotted path on a context object.
 */
function _resolvePath(obj, path) {
  const parts = path.split(".");
  let current = obj;
  for (const part of parts) {
    if (current == null) return undefined;
    current = current[part];
  }
  return current;
}

/**
 * Determine the appropriate spacer tag for a given container.
 * Table containers need <tr> spacers, lists need <li>, etc.
 */
function _createSpacer(container) {
  const tag = container.tagName.toLowerCase();
  let spacer;

  if (tag === "tbody" || tag === "table" || tag === "thead" || tag === "tfoot") {
    // Table needs <tr> with a single <td> that spans all columns
    spacer = document.createElement("tr");
    spacer.classList.add("nojs-virtual-spacer");
    const td = document.createElement("td");
    // Count columns from first real row or header
    const table = tag === "table" ? container : container.closest("table");
    const firstRow = table
      ? table.querySelector("tr:not(.nojs-virtual-spacer)")
      : null;
    const colCount = firstRow ? firstRow.children.length : 1;
    td.setAttribute("colspan", String(colCount));
    td.style.padding = "0";
    td.style.border = "none";
    spacer.appendChild(td);
  } else if (tag === "ul" || tag === "ol") {
    spacer = document.createElement("li");
    spacer.classList.add("nojs-virtual-spacer");
    spacer.style.listStyle = "none";
  } else if (tag === "dl") {
    spacer = document.createElement("div");
    spacer.classList.add("nojs-virtual-spacer");
  } else {
    spacer = document.createElement("div");
    spacer.classList.add("nojs-virtual-spacer");
  }

  spacer.setAttribute("aria-hidden", "true");
  spacer.style.height = "0px";
  return spacer;
}

/**
 * Set spacer height. For table spacers, set height on the inner <td>.
 */
function _setSpacerHeight(spacer, height) {
  if (spacer.tagName.toLowerCase() === "tr") {
    const td = spacer.querySelector("td");
    if (td) {
      td.style.height = height + "px";
    }
    spacer.style.height = height + "px";
  } else {
    spacer.style.height = height + "px";
  }
}

/**
 * Calculate the total height of all items for fixed-height mode.
 */
function _totalHeightFixed(totalItems, itemHeight) {
  return totalItems * itemHeight;
}

/**
 * Build prefix sums array for O(1) total height and O(log N) index lookups.
 * prefixSums[0] = 0, prefixSums[i] = prefixSums[i-1] + height(i-1).
 */
function _buildPrefixSums(state) {
  const n = state.totalItems;
  const sums = new Array(n + 1);
  const defaultH = state.estimatedHeight || 50;
  sums[0] = 0;
  for (let i = 1; i <= n; i++) {
    sums[i] = sums[i - 1] + (state.heights[i - 1] || defaultH);
  }
  state.prefixSums = sums;
}

/**
 * Binary search on prefixSums: find the largest index where
 * prefixSums[index] <= target.
 */
function _binarySearch(prefixSums, target) {
  let lo = 0;
  let hi = prefixSums.length - 2; // max valid item index
  while (lo <= hi) {
    const mid = (lo + hi) >>> 1;
    if (prefixSums[mid] <= target) {
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }
  return Math.max(0, hi);
}

/**
 * Calculate the total height of all items for auto-height mode.
 * Uses prefixSums for O(1) lookup when available.
 */
function _totalHeightAuto(state) {
  if (state.prefixSums && state.prefixSums.length === state.totalItems + 1) {
    return state.prefixSums[state.totalItems];
  }
  // Fallback: linear scan (prefixSums not built yet)
  let total = 0;
  const defaultH = state.estimatedHeight || 50;
  for (let i = 0; i < state.totalItems; i++) {
    total += state.heights[i] || defaultH;
  }
  return total;
}

/**
 * Calculate the cumulative offset (top position) for a given index.
 */
function _offsetAtIndex(state, index) {
  if (state.itemHeight !== "auto") {
    return index * state.itemHeight;
  }
  if (state.prefixSums && index < state.prefixSums.length) {
    return state.prefixSums[index];
  }
  // Fallback: linear scan
  let offset = 0;
  const defaultH = state.estimatedHeight || 50;
  for (let i = 0; i < index; i++) {
    offset += state.heights[i] || defaultH;
  }
  return offset;
}

/**
 * Find the first visible index for a given scrollTop in auto-height mode.
 * Uses binary search on prefixSums for O(log N) lookup.
 */
function _findStartIndexAuto(state, scrollTop) {
  if (state.prefixSums && state.prefixSums.length === state.totalItems + 1) {
    return _binarySearch(state.prefixSums, scrollTop);
  }
  // Fallback: linear scan
  let offset = 0;
  const defaultH = state.estimatedHeight || 50;
  for (let i = 0; i < state.totalItems; i++) {
    const h = state.heights[i] || defaultH;
    if (offset + h > scrollTop) return i;
    offset += h;
  }
  return Math.max(0, state.totalItems - 1);
}

/**
 * Find the last visible index for a given scrollTop + viewport height.
 * Uses binary search on prefixSums for O(log N) lookup.
 */
function _findEndIndexAuto(state, scrollTop, viewportHeight) {
  if (state.prefixSums && state.prefixSums.length === state.totalItems + 1) {
    return _binarySearch(state.prefixSums, scrollTop + viewportHeight);
  }
  // Fallback: linear scan
  const bottomEdge = scrollTop + viewportHeight;
  let offset = 0;
  const defaultH = state.estimatedHeight || 50;
  for (let i = 0; i < state.totalItems; i++) {
    offset += state.heights[i] || defaultH;
    if (offset >= bottomEdge) return i;
  }
  return state.totalItems - 1;
}

// ─── Core rendering logic ───────────────────────────────────────────

/**
 * Compute the visible range given the current scroll position.
 */
function _computeRange(state, scrollTop, viewportHeight) {
  if (state.totalItems === 0) {
    return { start: 0, end: -1 };
  }

  let start, end;

  if (state.itemHeight !== "auto") {
    start = Math.floor(scrollTop / state.itemHeight);
    end = Math.ceil((scrollTop + viewportHeight) / state.itemHeight) - 1;
  } else {
    start = _findStartIndexAuto(state, scrollTop);
    end = _findEndIndexAuto(state, scrollTop, viewportHeight);
  }

  // Apply buffer (overscan)
  start = Math.max(0, start - state.buffer);
  end = Math.min(state.totalItems - 1, end + state.buffer);

  return { start, end };
}

/**
 * Render the visible items into the container.
 * This is the hot path — must be efficient (<16ms frame time).
 */
function _render(state, NoJS) {
  if (state.disposed) return;

  const container = state.container;
  const scrollTarget = container;
  const scrollTop = scrollTarget.scrollTop;
  const viewportHeight = scrollTarget.clientHeight;

  const { start, end } = _computeRange(state, scrollTop, viewportHeight);

  // Bail if range hasn't changed
  if (start === state.startIndex && end === state.endIndex && !state.dirty) {
    return;
  }

  state.startIndex = start;
  state.endIndex = end;
  state.dirty = false;

  // Calculate spacer heights
  const topSpacerH = _offsetAtIndex(state, start);
  const totalH =
    state.itemHeight !== "auto"
      ? _totalHeightFixed(state.totalItems, state.itemHeight)
      : _totalHeightAuto(state);
  const bottomOffset = end >= 0 ? _offsetAtIndex(state, end + 1) : 0;
  const bottomSpacerH = Math.max(0, totalH - bottomOffset);

  // Update spacers
  _setSpacerHeight(state.spacerTop, topSpacerH);
  _setSpacerHeight(state.spacerBottom, bottomSpacerH);

  // Determine which indices need rendering
  const newIndices = new Set();
  for (let i = start; i <= end; i++) {
    newIndices.add(i);
  }

  // Remove nodes no longer visible
  for (const [idx, node] of state.renderedNodes) {
    if (!newIndices.has(idx)) {
      node.remove();
      state.renderedNodes.delete(idx);
    }
  }

  // Collect new nodes for batch insertion
  const itemsToInsert = [];

  for (let i = start; i <= end; i++) {
    if (state.renderedNodes.has(i)) continue;

    const item = state.dataArray[i];
    if (item === undefined) continue;

    // Clone the template
    const clone = state.template.cloneNode(true);

    // Create a child context for this item
    const childCtx = {};
    childCtx[state.iteratorVar] = item;
    childCtx.$index = i;
    childCtx.$count = state.totalItems;
    childCtx.$first = i === 0;
    childCtx.$last = i === state.totalItems - 1;
    childCtx.$even = i % 2 === 0;
    childCtx.$odd = i % 2 !== 0;

    // Store context on the node so NoJS.processTree can pick it up
    clone.__ctx = Object.create(
      NoJS.findContext ? NoJS.findContext(container) || {} : {},
      Object.getOwnPropertyDescriptors(childCtx)
    );

    // Mark for processTree
    clone.__declared = false;

    itemsToInsert.push({ index: i, node: clone });
    state.renderedNodes.set(i, clone);
  }

  // Insert nodes in correct order relative to existing nodes
  // and the bottom spacer
  if (itemsToInsert.length > 0) {
    // Sort by index for correct DOM order
    itemsToInsert.sort((a, b) => a.index - b.index);

    for (const { index, node } of itemsToInsert) {
      // Find the correct insertion point: before the first rendered node
      // whose index is greater than this one, or before the bottom spacer.
      let refNode = null;
      for (const [idx, existingNode] of state.renderedNodes) {
        if (idx > index && existingNode.parentNode === container) {
          if (!refNode || idx < _getNodeIndex(refNode, state)) {
            refNode = existingNode;
          }
        }
      }
      if (!refNode) {
        refNode = state.spacerBottom;
      }
      container.insertBefore(node, refNode);

      // Process the node through NoJS so bindings resolve
      try {
        if (NoJS.processTree) {
          NoJS.processTree(node);
        }
      } catch (_err) {
        // Error isolation: one failing node must not block rendering
      }
    }
  }

  // Auto-height: measure rendered nodes and update heights array
  if (state.itemHeight === "auto") {
    let changed = false;
    for (const [idx, node] of state.renderedNodes) {
      const measured = node.offsetHeight || node.getBoundingClientRect().height;
      if (measured > 0 && state.heights[idx] !== measured) {
        state.heights[idx] = measured;
        changed = true;
      }
    }
    // If measurements changed, rebuild prefix sums and update spacers
    if (changed) {
      _buildPrefixSums(state);
      const newTotalH = _totalHeightAuto(state);
      const newTopH = _offsetAtIndex(state, start);
      const newBottomOffset = end >= 0 ? _offsetAtIndex(state, end + 1) : 0;
      const newBottomH = Math.max(0, newTotalH - newBottomOffset);
      _setSpacerHeight(state.spacerTop, newTopH);
      _setSpacerHeight(state.spacerBottom, newBottomH);
    }
  }
}

/**
 * Helper to get the virtual index of a rendered node.
 */
function _getNodeIndex(node, state) {
  for (const [idx, n] of state.renderedNodes) {
    if (n === node) return idx;
  }
  return Infinity;
}

/**
 * Refresh the virtual list when data changes.
 * Preserves scroll position where possible.
 */
function _refresh(state, newArray, NoJS) {
  if (state.disposed) return;

  const prevScroll = state.container.scrollTop;
  state.dataArray = newArray || [];
  state.totalItems = state.dataArray.length;
  state.dirty = true;

  // Trim heights array for auto mode if data shrunk
  if (state.itemHeight === "auto" && state.heights.length > state.totalItems) {
    state.heights.length = state.totalItems;
  }

  // Rebuild prefix sums for auto-height mode
  if (state.itemHeight === "auto") {
    _buildPrefixSums(state);
  }

  // Remove all rendered nodes and re-render
  for (const [_idx, node] of state.renderedNodes) {
    // Dispose NoJS bindings before removing
    if (node.__disposers) {
      for (const dispose of node.__disposers) {
        try { dispose(); } catch (_e) { /* isolation */ }
      }
      node.__disposers = null;
    }
    node.remove();
  }
  state.renderedNodes.clear();

  // Restore scroll position
  state.container.scrollTop = prevScroll;

  _render(state, NoJS);
}

// ─── Directive registration ─────────────────────────────────────────

export function registerVirtualListDirective(NoJS) {
  NoJS.directive("virtual", {
    priority: 10,
    init(el, name, _expr) {
      _injectVirtualListStyles();

      // Mark the container
      el.setAttribute("data-nojs-virtual", "");

      // ── Parse config attributes ─────────────────────────────────
      const heightAttr = el.getAttribute("virtual-height") || "50";
      const bufferAttr = el.getAttribute("virtual-buffer") || "5";

      const itemHeight = heightAttr === "auto" ? "auto" : parseInt(heightAttr, 10);
      const buffer = parseInt(bufferAttr, 10) || 5;

      if (itemHeight !== "auto" && (isNaN(itemHeight) || itemHeight <= 0)) {
        console.warn("[virtual] virtual-height must be a positive number or 'auto'.");
        return;
      }

      // ── Find the each/foreach binding ───────────────────────────
      const binding = _findEachBinding(el);

      // ── Capture the template ────────────────────────────────────
      // The template is the first non-spacer child element that has or
      // is inside the each binding. We need to capture it before the
      // each directive runs and clones it.
      let templateEl = null;
      if (binding) {
        // If the each is on the container itself, take the first child
        if (binding.eachEl === el) {
          for (const child of el.children) {
            if (!child.classList.contains("nojs-virtual-spacer")) {
              templateEl = child;
              break;
            }
          }
        } else {
          templateEl = binding.eachEl;
        }
      } else {
        // No each binding — take first child as template
        for (const child of el.children) {
          if (!child.classList.contains("nojs-virtual-spacer")) {
            templateEl = child;
            break;
          }
        }
      }

      if (!templateEl) {
        console.warn("[virtual] No child template found.");
        return;
      }

      // Clone the template before the each directive processes it
      const template = templateEl.cloneNode(true);
      // Remove the each/foreach/for attribute from the template clone
      // so processTree doesn't try to loop again
      template.removeAttribute("each");
      template.removeAttribute("foreach");
      template.removeAttribute("for");
      // Clear any declared state from the clone
      template.__declared = false;
      template.__disposers = null;
      template.__ctx = null;

      // ── Prevent the default each directive from running ─────────
      // Remove the each/foreach/for attribute from the original element
      // and its children so NoJS core doesn't process the loop
      if (binding) {
        binding.eachEl.removeAttribute("each");
        binding.eachEl.removeAttribute("foreach");
        binding.eachEl.removeAttribute("for");
      }

      // Clear existing children (the template elements)
      while (el.firstChild) {
        el.removeChild(el.firstChild);
      }

      // ── Create spacers ──────────────────────────────────────────
      const spacerTop = _createSpacer(el);
      const spacerBottom = _createSpacer(el);
      el.appendChild(spacerTop);
      el.appendChild(spacerBottom);

      // ── Initialize state ────────────────────────────────────────
      const state = {
        container: el,
        itemHeight,
        buffer,
        totalItems: 0,
        heights: [],
        prefixSums: [0],
        estimatedHeight: itemHeight === "auto" ? 50 : itemHeight,
        startIndex: -1,
        endIndex: -1,
        scrollTop: 0,
        template,
        spacerTop,
        spacerBottom,
        resizeObserver: null,
        scrollHandler: null,
        renderedNodes: new Map(),
        iteratorVar: binding ? binding.iteratorVar : "item",
        arrayPath: binding ? binding.arrayPath : null,
        dataArray: [],
        dirty: true,
        disposed: false,
      };

      _virtualListRegistry.set(el, state);

      // ── Scroll handler ──────────────────────────────────────────
      let rafId = null;
      const scrollHandler = () => {
        if (rafId) return;
        rafId = requestAnimationFrame(() => {
          rafId = null;
          _render(state, NoJS);
        });
      };
      state.scrollHandler = scrollHandler;
      el.addEventListener("scroll", scrollHandler, { passive: true });

      // ── ResizeObserver ──────────────────────────────────────────
      if (typeof ResizeObserver !== "undefined") {
        const ro = new ResizeObserver(() => {
          state.dirty = true;
          _render(state, NoJS);
        });
        ro.observe(el);
        state.resizeObserver = ro;
      }

      // ── Data binding ────────────────────────────────────────────
      // Poll the reactive context for data changes. NoJS contexts are
      // Proxy-backed, so we watch by comparing array length and identity.
      let prevArray = null;
      let prevLength = -1;
      let pollId = null;

      const pollData = () => {
        if (state.disposed) return;

        if (state.arrayPath) {
          const ctx = NoJS.findContext ? NoJS.findContext(el) : null;
          if (ctx) {
            const arr = _resolvePath(ctx, state.arrayPath);
            if (Array.isArray(arr)) {
              // Check if data has changed (identity or length)
              if (arr !== prevArray || arr.length !== prevLength) {
                prevArray = arr;
                prevLength = arr.length;
                _refresh(state, arr, NoJS);
              }
            }
          }
        }

        pollId = setTimeout(pollData, 100);
      };

      // Start polling after a short delay to allow context to initialize
      pollId = setTimeout(pollData, 100);

      // ── Cleanup ─────────────────────────────────────────────────
      addDisposer(el, () => {
        state.disposed = true;

        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }

        if (pollId) {
          clearTimeout(pollId);
          pollId = null;
        }

        el.removeEventListener("scroll", scrollHandler);

        if (state.resizeObserver) {
          state.resizeObserver.disconnect();
          state.resizeObserver = null;
        }

        // Dispose all rendered nodes
        for (const [_idx, node] of state.renderedNodes) {
          if (node.__disposers) {
            for (const dispose of node.__disposers) {
              try { dispose(); } catch (_e) { /* isolation */ }
            }
            node.__disposers = null;
          }
          node.remove();
        }
        state.renderedNodes.clear();

        // Remove spacers
        if (state.spacerTop && state.spacerTop.parentNode) {
          state.spacerTop.remove();
        }
        if (state.spacerBottom && state.spacerBottom.parentNode) {
          state.spacerBottom.remove();
        }

        _virtualListRegistry.delete(el);
      });
    },
  });
}
