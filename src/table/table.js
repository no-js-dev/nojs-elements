import { _tableState } from "./state.js";
import { _injectTableStyles } from "./styles.js";

function addDisposer(el, fn) {
  el.__disposers = el.__disposers || [];
  el.__disposers.push(fn);
}

// ─── Helpers ────────────────────────────────────────────────────────

/**
 * Find the `each` binding in the table's tbody to identify the array path.
 * Looks for `each="item in arrayName"` and returns { arrayPath, iteratorVar }.
 */
function _findEachBinding(table, NoJS) {
  const tbody = table.querySelector("tbody");
  if (!tbody) return null;

  // Check tbody itself and its children for [each] or [foreach]
  let eachEl = null;
  if (tbody.hasAttribute("each") || tbody.hasAttribute("foreach")) {
    eachEl = tbody;
  } else {
    eachEl =
      tbody.querySelector("[each]") ||
      tbody.querySelector("[foreach]");
  }

  if (!eachEl) return null;

  const expr = eachEl.getAttribute("each") || eachEl.getAttribute("foreach");
  if (!expr) return null;

  // Parse "item in arrayName" or "item of arrayName"
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
 * Set a value at a dotted path on a context object.
 */
function _setPath(obj, path, value) {
  const parts = path.split(".");
  let current = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    if (current[parts[i]] == null) return;
    current = current[parts[i]];
  }
  current[parts[parts.length - 1]] = value;
}

/**
 * Compare two numeric values, sinking NaN (invalid/non-numeric) to the end so
 * the comparator stays a total order (never returns NaN — Safety Rule 5/6).
 */
function _compareNumeric(a, b) {
  const aNaN = Number.isNaN(a);
  const bNaN = Number.isNaN(b);
  if (aNaN && bNaN) return 0;
  if (aNaN) return 1; // invalid sinks after valid
  if (bNaN) return -1;
  // Avoid (a - b) producing NaN for ±Infinity edge cases.
  return a < b ? -1 : a > b ? 1 : 0;
}

/**
 * Compare two values based on sort-type.
 * Always returns a finite number so the sort comparator defines a total order;
 * nullish and invalid (NaN/Invalid Date) values sink consistently to one end.
 */
function _compare(a, b, sortType) {
  if (a == null && b == null) return 0;
  if (a == null) return -1;
  if (b == null) return 1;

  switch (sortType) {
    case "number":
      return _compareNumeric(Number(a), Number(b));
    case "date":
      return _compareNumeric(new Date(a).getTime(), new Date(b).getTime());
    case "string":
    default:
      return String(a).localeCompare(String(b));
  }
}

/**
 * Clear sort indicators from all th[data-sortable] in a table.
 */
function _clearSortIndicators(table) {
  const ths = table.querySelectorAll("th[data-sortable]");
  for (const th of ths) {
    th.removeAttribute("data-sort-dir");
    th.setAttribute("aria-sort", "none");
  }
}

// ─── sortable ───────────────────────────────────────────────────────

export function registerSortable(NoJS) {
  NoJS.directive("sortable", {
    priority: 10,
    init(el) {
      _injectTableStyles();
      el.classList.add("nojs-sortable");
    },
  });
}

// ─── sort ───────────────────────────────────────────────────────────

export function registerSort(NoJS) {
  NoJS.directive("sort", {
    priority: 11,
    init(el, name, expr) {
      _injectTableStyles();

      const sortKey = expr;
      if (!sortKey) return;

      const sortType = el.getAttribute("sort-type") || "string";
      const sortDefault = el.getAttribute("sort-default"); // 'asc' | 'desc' | null

      // Mark th as sortable
      el.setAttribute("data-sortable", "");
      el.setAttribute("aria-sort", "none");

      // Find parent table
      const table = el.closest("table");
      if (!table) return;

      // Initialize table state if needed
      if (!_tableState.sorts.has(table)) {
        _tableState.sorts.set(table, { column: null, direction: null });
      }

      // Apply sort-default on init. If several columns declare sort-default,
      // only the first one wins — applying a later one would silently override
      // and discard the earlier column's default. #52
      if (sortDefault === "asc" || sortDefault === "desc") {
        const state = _tableState.sorts.get(table);
        if (!state.column) {
          _applySortFromTh(el, table, sortKey, sortType, sortDefault, NoJS);
        }
      }

      // Click handler — cycle: asc -> desc -> none
      const clickHandler = () => {
        const state = _tableState.sorts.get(table);
        let nextDir;

        if (state.column !== sortKey) {
          // Different column — start with asc
          nextDir = "asc";
        } else if (state.direction === "asc") {
          nextDir = "desc";
        } else if (state.direction === "desc") {
          nextDir = null;
        } else {
          nextDir = "asc";
        }

        _applySortFromTh(el, table, sortKey, sortType, nextDir, NoJS);
      };

      el.addEventListener("click", clickHandler);
      addDisposer(el, () => {
        el.removeEventListener("click", clickHandler);
        // Prune the per-table sort state (and captured original-order snapshots)
        // once the table is detached, otherwise _tableState.sorts keeps every
        // disposed <table> — and its full-dataset arrays — alive for the page
        // lifetime (e.g. across SPA route swaps). #23
        if (table && !table.isConnected) {
          _tableState.sorts.delete(table);
          delete table._nojsOriginalOrder;
          delete table._nojsOriginalRows;
        }
      });
    },
  });
}

/**
 * Apply sort to the data array and update visual indicators.
 */
function _applySortFromTh(th, table, sortKey, sortType, direction, NoJS) {
  const state = _tableState.sorts.get(table);

  // Clear all indicators first
  _clearSortIndicators(table);

  if (direction) {
    // Set indicator on active th
    th.setAttribute("data-sort-dir", direction);
    th.setAttribute("aria-sort", direction === "asc" ? "ascending" : "descending");
    state.column = sortKey;
    state.direction = direction;
  } else {
    state.column = null;
    state.direction = null;
  }

  // Try reactive array sorting first (each/foreach binding)
  const binding = _findEachBinding(table, NoJS);

  if (binding) {
    const ctx = NoJS.findContext(table);
    const array = ctx ? _resolvePath(ctx, binding.arrayPath) : null;

    if (Array.isArray(array)) {
      if (!direction) {
        const original = table._nojsOriginalOrder;
        if (original) {
          const currentSet = new Set(array);
          const restored = original.filter(item => currentSet.has(item));
          for (const item of array) {
            if (!original.includes(item)) restored.push(item);
          }
          _setPath(ctx, binding.arrayPath, restored);
        }
        return;
      }

      if (!table._nojsOriginalOrder) {
        table._nojsOriginalOrder = [...array];
      }

      const sorted = [...array].sort((a, b) => {
        const valA = a != null ? a[sortKey] : null;
        const valB = b != null ? b[sortKey] : null;
        const cmp = _compare(valA, valB, sortType);
        return direction === "desc" ? -cmp : cmp;
      });

      _setPath(ctx, binding.arrayPath, sorted);
      return;
    }
  }

  // Fallback: DOM-based sorting for static table rows
  _sortStaticRows(table, th, sortKey, sortType, direction);
}

/**
 * Sort static table rows by reading cell text content.
 */
function _sortStaticRows(table, th, sortKey, sortType, direction) {
  const tbody = table.querySelector("tbody");
  if (!tbody) return;

  // Find column index from the th position
  const headerRow = th.closest("tr");
  const ths = [...headerRow.children];
  const colIndex = ths.indexOf(th);
  if (colIndex < 0) return;

  const rows = [...tbody.querySelectorAll(":scope > tr")];

  // Save original order on first sort
  if (!table._nojsOriginalRows) {
    table._nojsOriginalRows = [...rows];
  }

  if (!direction) {
    // Restore original order
    const frag = document.createDocumentFragment();
    for (const row of table._nojsOriginalRows) frag.appendChild(row);
    tbody.appendChild(frag);
    return;
  }

  // Parse a static cell for numeric sorting, preserving 0/negatives/decimals
  // and letting genuinely non-numeric cells stay NaN so _compare sinks them
  // (instead of collapsing everything invalid — or valid 0 — to 0). #7
  const parseNumericCell = (text) => {
    const cleaned = text.replace(/[^0-9.\-]/g, "");
    return cleaned === "" || cleaned === "-" ? NaN : parseFloat(cleaned);
  };

  rows.sort((a, b) => {
    const cellA = a.children[colIndex]?.textContent?.trim() || "";
    const cellB = b.children[colIndex]?.textContent?.trim() || "";
    const cmp = _compare(
      sortType === "number" ? parseNumericCell(cellA) : cellA,
      sortType === "number" ? parseNumericCell(cellB) : cellB,
      sortType
    );
    return direction === "desc" ? -cmp : cmp;
  });

  const frag = document.createDocumentFragment();
  for (const row of rows) frag.appendChild(row);
  tbody.appendChild(frag);
}

// ─── fixed-header ───────────────────────────────────────────────────

export function registerFixedHeader(NoJS) {
  NoJS.directive("fixed-header", {
    priority: 10,
    init(el) {
      _injectTableStyles();
      el.classList.add("nojs-fixed-header");
    },
  });
}

// ─── fixed-col ──────────────────────────────────────────────────────

export function registerFixedCol(NoJS) {
  NoJS.directive("fixed-col", {
    priority: 10,
    init(el) {
      _injectTableStyles();
      el.classList.add("nojs-fixed-col");
    },
  });
}
