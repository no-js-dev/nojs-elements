import { _injectTableStyles } from "./styles.js";

function addDisposer(el, fn) {
  el.__disposers = el.__disposers || [];
  el.__disposers.push(fn);
}

// ─── Helpers ────────────────────────────────────────────────────────

/**
 * Find the `each` binding in the table's tbody to identify the array path.
 * Mirrors the helper in table.js for consistency.
 */
function _findEachBinding(table) {
  const tbody = table.querySelector("tbody");
  if (!tbody) return null;

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

  const match = expr.match(/^\s*(\w+)\s+(?:in|of)\s+(.+)\s*$/);
  if (!match) return null;

  return { iteratorVar: match[1], arrayPath: match[2].trim(), eachEl };
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
 * Calculate the drop index from a mouse Y position within the tbody.
 */
function _calcRowDropIndex(tbody, mouseY) {
  const rows = [...tbody.querySelectorAll(":scope > tr")];
  for (let i = 0; i < rows.length; i++) {
    const rect = rows[i].getBoundingClientRect();
    const midY = rect.top + rect.height / 2;
    if (mouseY < midY) return i;
  }
  return rows.length;
}

// ═══════════════════════════════════════════════════════════════════════
//  TABLE-REORDER DIRECTIVE
// ═══════════════════════════════════════════════════════════════════════

export function registerTableReorder(NoJS) {
  NoJS.directive("table-reorder", {
    priority: 15,
    init(el) {
      _injectTableStyles();

      // The directive must be on a <table> that also has `sortable` (table-sortable)
      if (el.tagName !== "TABLE") return;

      const tbody = el.querySelector("tbody");
      if (!tbody) return;

      const ctx = NoJS.findContext(el);
      const handleSel = el.getAttribute("table-reorder-handle");
      const dragClass = el.getAttribute("table-reorder-drag-class") || "nojs-row-dragging";
      const overClass = el.getAttribute("table-reorder-over-class") || "nojs-row-drag-over";

      // Module-scoped state for this table's reorder operation
      let _dragSourceIndex = null;
      let _dragSourceRow = null;
      let _indicatorRow = null;

      // ─── Setup rows ──────────────────────────────────────────────────
      function setupRows() {
        const rows = tbody.querySelectorAll(":scope > tr");

        for (let i = 0; i < rows.length; i++) {
          const row = rows[i];

          // Skip rows already set up (idempotent)
          if (row._nojsReorderSetup) continue;
          row._nojsReorderSetup = true;

          row.draggable = true;
          row.setAttribute("aria-grabbed", "false");

          // Handle restriction
          let _handleAllowed = true;
          if (handleSel) {
            const mousedownHandler = (e) => {
              _handleAllowed = !!e.target.closest(handleSel);
            };
            row.addEventListener("mousedown", mousedownHandler);
            addDisposer(row, () => row.removeEventListener("mousedown", mousedownHandler));
          }

          // ── dragstart ─────────────────────────────────────────────
          const dragstartHandler = (e) => {
            if (handleSel && !_handleAllowed) {
              e.preventDefault();
              return;
            }

            const currentRows = [...tbody.querySelectorAll(":scope > tr")];
            _dragSourceIndex = currentRows.indexOf(row);
            _dragSourceRow = row;

            if (e.dataTransfer) {
              e.dataTransfer.effectAllowed = "move";
              e.dataTransfer.setData("text/plain", "");
            }

            dragClass.split(/\s+/).filter(Boolean).forEach((c) => row.classList.add(c));
            row.setAttribute("aria-grabbed", "true");
          };

          // ── dragover ──────────────────────────────────────────────
          const dragoverHandler = (e) => {
            if (_dragSourceRow == null) return;
            e.preventDefault();
            if (e.dataTransfer) e.dataTransfer.dropEffect = "move";

            // Show insertion indicator
            const rect = row.getBoundingClientRect();
            const midY = rect.top + rect.height / 2;
            const currentRows = [...tbody.querySelectorAll(":scope > tr")];
            const hoverIndex = currentRows.indexOf(row);

            // Remove previous indicator
            _clearIndicator();

            if (hoverIndex !== _dragSourceIndex) {
              if (e.clientY < midY) {
                row.classList.add("nojs-reorder-insert-before");
              } else {
                row.classList.add("nojs-reorder-insert-after");
              }
              _indicatorRow = row;
            }
          };

          // ── dragleave ─────────────────────────────────────────────
          const dragleaveHandler = () => {
            row.classList.remove("nojs-reorder-insert-before");
            row.classList.remove("nojs-reorder-insert-after");
            if (_indicatorRow === row) _indicatorRow = null;
          };

          // ── drop ──────────────────────────────────────────────────
          const dropHandler = (e) => {
            e.preventDefault();
            e.stopPropagation();

            if (_dragSourceRow == null || _dragSourceIndex == null) return;

            const currentRows = [...tbody.querySelectorAll(":scope > tr")];
            const rect = row.getBoundingClientRect();
            const midY = rect.top + rect.height / 2;
            let dropIndex = currentRows.indexOf(row);
            if (e.clientY >= midY) dropIndex++;

            // Adjust: if dropping after the source, account for the source being removed
            const fromIndex = _dragSourceIndex;
            if (fromIndex === dropIndex || fromIndex + 1 === dropIndex) {
              // No-op: same position
              _cleanup();
              return;
            }

            const toIndex = fromIndex < dropIndex ? dropIndex - 1 : dropIndex;

            // Reorder the backing data array (reactive path)
            const binding = _findEachBinding(el);
            if (binding && ctx) {
              const array = _resolvePath(ctx, binding.arrayPath);
              if (Array.isArray(array)) {
                const newArray = [...array];
                const [moved] = newArray.splice(fromIndex, 1);
                newArray.splice(toIndex, 0, moved);
                _setPath(ctx, binding.arrayPath, newArray);

                // Invalidate original order cache used by sort (if any)
                if (el._nojsOriginalOrder) {
                  el._nojsOriginalOrder = [...newArray];
                }

                // Dispatch table:reorder event
                el.dispatchEvent(
                  new CustomEvent("table:reorder", {
                    bubbles: true,
                    detail: { from: fromIndex, to: toIndex, item: moved },
                  })
                );
              }
            } else {
              // Fallback: DOM-only reorder for static tables
              const sourceRow = _dragSourceRow;
              const targetRow = currentRows[toIndex];
              if (sourceRow && targetRow) {
                if (fromIndex < toIndex) {
                  tbody.insertBefore(sourceRow, targetRow.nextSibling);
                } else {
                  tbody.insertBefore(sourceRow, targetRow);
                }

                el.dispatchEvent(
                  new CustomEvent("table:reorder", {
                    bubbles: true,
                    detail: { from: fromIndex, to: toIndex, item: null },
                  })
                );
              }
            }

            _cleanup();
          };

          // ── dragend ───────────────────────────────────────────────
          const dragendHandler = () => {
            _cleanup();
          };

          row.addEventListener("dragstart", dragstartHandler);
          row.addEventListener("dragover", dragoverHandler);
          row.addEventListener("dragleave", dragleaveHandler);
          row.addEventListener("drop", dropHandler);
          row.addEventListener("dragend", dragendHandler);

          addDisposer(row, () => {
            row.removeEventListener("dragstart", dragstartHandler);
            row.removeEventListener("dragover", dragoverHandler);
            row.removeEventListener("dragleave", dragleaveHandler);
            row.removeEventListener("drop", dropHandler);
            row.removeEventListener("dragend", dragendHandler);
            row._nojsReorderSetup = false;
          });
        }
      }

      function _clearIndicator() {
        if (_indicatorRow) {
          _indicatorRow.classList.remove("nojs-reorder-insert-before");
          _indicatorRow.classList.remove("nojs-reorder-insert-after");
          _indicatorRow = null;
        }
      }

      function _cleanup() {
        if (_dragSourceRow) {
          dragClass.split(/\s+/).filter(Boolean).forEach((c) => _dragSourceRow.classList.remove(c));
          _dragSourceRow.setAttribute("aria-grabbed", "false");
        }
        _clearIndicator();
        _dragSourceIndex = null;
        _dragSourceRow = null;

        // Clear any stale indicators from all rows
        const rows = tbody.querySelectorAll(":scope > tr");
        for (const r of rows) {
          r.classList.remove("nojs-reorder-insert-before");
          r.classList.remove("nojs-reorder-insert-after");
          overClass.split(/\s+/).filter(Boolean).forEach((c) => r.classList.remove(c));
        }
      }

      // Also handle drops on the tbody itself (for dropping at the end)
      const tbodyDragoverHandler = (e) => {
        if (_dragSourceRow == null) return;
        e.preventDefault();
        if (e.dataTransfer) e.dataTransfer.dropEffect = "move";
      };

      const tbodyDropHandler = (e) => {
        if (_dragSourceRow == null) return;
        // Only handle if the direct target is tbody (not a row)
        if (e.target !== tbody) return;

        e.preventDefault();
        e.stopPropagation();

        const fromIndex = _dragSourceIndex;
        const currentRows = [...tbody.querySelectorAll(":scope > tr")];
        const toIndex = currentRows.length - 1;

        if (fromIndex === toIndex) {
          _cleanup();
          return;
        }

        const binding = _findEachBinding(el);
        if (binding && ctx) {
          const array = _resolvePath(ctx, binding.arrayPath);
          if (Array.isArray(array)) {
            const newArray = [...array];
            const [moved] = newArray.splice(fromIndex, 1);
            newArray.push(moved);
            _setPath(ctx, binding.arrayPath, newArray);

            if (el._nojsOriginalOrder) {
              el._nojsOriginalOrder = [...newArray];
            }

            el.dispatchEvent(
              new CustomEvent("table:reorder", {
                bubbles: true,
                detail: { from: fromIndex, to: newArray.length - 1, item: moved },
              })
            );
          }
        }

        _cleanup();
      };

      tbody.addEventListener("dragover", tbodyDragoverHandler);
      tbody.addEventListener("drop", tbodyDropHandler);

      // Observe tbody for new rows (reactive re-renders add new <tr> elements)
      const observer = new MutationObserver(() => {
        setupRows();
      });
      observer.observe(tbody, { childList: true });

      // Initial setup
      setupRows();

      // Cleanup
      addDisposer(el, () => {
        observer.disconnect();
        tbody.removeEventListener("dragover", tbodyDragoverHandler);
        tbody.removeEventListener("drop", tbodyDropHandler);
        _cleanup();
      });
    },
  });
}
