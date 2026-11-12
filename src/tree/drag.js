import { _treeState } from "./state.js";
import { _injectTreeStyles } from "./styles.js";

function addDisposer(el, fn) {
  el.__disposers = el.__disposers || [];
  el.__disposers.push(fn);
}

// ─── Helpers ─────────────────────────────────────────────────────────

/** Find the treeitem element for a given target (may be a child of the treeitem). */
function _findTreeItem(target) {
  return target.closest('[role="treeitem"]');
}

/** Find the tree root for a given element. */
function _findTreeRoot(el) {
  return el.closest('[role="tree"]');
}

/** Get the parent treeitem of a given treeitem (null if top-level). */
function _getParentItem(item) {
  const group = item.parentElement?.closest('[role="group"]');
  if (!group) return null;
  // The parent treeitem owns the group
  return group.parentElement?.closest('[role="treeitem"]') || null;
}

/** Get the sibling treeitems at the same level as the given item. */
function _getSiblings(item) {
  const parent = item.parentElement;
  if (!parent) return [];
  return [...parent.children].filter(
    (c) => c.getAttribute("role") === "treeitem"
  );
}

/** Get the index of a treeitem among its siblings. */
function _getIndexAmongSiblings(item) {
  const siblings = _getSiblings(item);
  return siblings.indexOf(item);
}

/**
 * Determine drop position relative to a treeitem:
 * "before" — insertion line above (reorder)
 * "on"     — drop onto the node (reparent)
 * "after"  — insertion line below (reorder)
 */
function _getDropPosition(targetItem, mouseY, mode) {
  const rect = targetItem.getBoundingClientRect();
  const relY = mouseY - rect.top;
  const height = rect.height;

  if (mode === "reparent") {
    return "on";
  }

  if (mode === "reorder") {
    return relY < height / 2 ? "before" : "after";
  }

  // mode === "both": top 25% = before, bottom 25% = after, middle 50% = on
  if (relY < height * 0.25) return "before";
  if (relY > height * 0.75) return "after";
  return "on";
}

/** Check if `candidate` is a descendant of `ancestor` in the tree hierarchy. */
function _isDescendant(candidate, ancestor) {
  let current = candidate.parentElement;
  while (current) {
    if (current === ancestor) return true;
    current = current.parentElement;
  }
  return false;
}

// ─── State for in-flight drag ────────────────────────────────────────

const _treeDragState = {
  dragging: null,     // { el, treeRoot }
  indicator: null,    // insertion line element
  currentTarget: null,
  currentPosition: null,
};

function _removeIndicator() {
  if (_treeDragState.indicator) {
    _treeDragState.indicator.remove();
    _treeDragState.indicator = null;
  }
}

function _clearDragOver(treeRoot) {
  if (!treeRoot) return;
  const targets = treeRoot.querySelectorAll(".nojs-tree-drag-over");
  for (const t of targets) t.classList.remove("nojs-tree-drag-over");
}

function _createIndicator() {
  const line = document.createElement("div");
  line.className = "nojs-tree-drag-indicator";
  line.setAttribute("aria-hidden", "true");
  return line;
}

function _showIndicator(targetItem, position) {
  _removeIndicator();
  const indicator = _createIndicator();
  const rect = targetItem.getBoundingClientRect();
  const treeRoot = _findTreeRoot(targetItem);
  if (!treeRoot) return;
  const treeRect = treeRoot.getBoundingClientRect();

  // Position the indicator relative to the tree root
  indicator.style.position = "absolute";
  indicator.style.left = (rect.left - treeRect.left) + "px";
  indicator.style.width = rect.width + "px";

  if (position === "before") {
    indicator.style.top = (rect.top - treeRect.top - 1) + "px";
  } else {
    // after
    indicator.style.top = (rect.bottom - treeRect.top - 1) + "px";
  }

  // Ensure tree root is positioned for absolute children
  const rootPosition = getComputedStyle(treeRoot).position;
  if (rootPosition === "static") {
    treeRoot.style.position = "relative";
  }

  treeRoot.appendChild(indicator);
  _treeDragState.indicator = indicator;
}

// ─── tree-drag-mode directive ────────────────────────────────────────

export function registerTreeDragMode(NoJS) {
  NoJS.directive("tree-drag-mode", {
    priority: 15,
    init(el, name, mode) {
      _injectTreeStyles();

      // Validate mode
      if (mode !== "reparent" && mode !== "reorder" && mode !== "both") {
        return;
      }

      // el is the tree root — make all treeitems draggable
      // Use event delegation on the tree root for efficiency

      let _enterDepth = 0;

      // ── dragstart (delegated) ─────────────────────────────────────
      const dragstartHandler = (e) => {
        const item = _findTreeItem(e.target);
        if (!item) return;
        if (!el.contains(item)) return;

        // Respect tree-drag-disabled
        if (item.hasAttribute("tree-drag-disabled")) {
          e.preventDefault();
          return;
        }

        _treeDragState.dragging = { el: item, treeRoot: el };

        if (e.dataTransfer) {
          e.dataTransfer.effectAllowed = "move";
          e.dataTransfer.setData("text/plain", "");
        }

        item.classList.add("nojs-dragging");

        item.dispatchEvent(
          new CustomEvent("tree:drag-start", {
            bubbles: true,
            detail: { node: item },
          })
        );
      };

      // ── dragover (delegated) ──────────────────────────────────────
      const dragoverHandler = (e) => {
        if (!_treeDragState.dragging) return;
        if (_treeDragState.dragging.treeRoot !== el) return;

        const targetItem = _findTreeItem(e.target);
        if (!targetItem || !el.contains(targetItem)) return;

        // Cannot drop onto self
        if (targetItem === _treeDragState.dragging.el) return;

        // Cannot drop onto a descendant of the dragged node
        if (_isDescendant(targetItem, _treeDragState.dragging.el)) return;

        e.preventDefault();
        if (e.dataTransfer) e.dataTransfer.dropEffect = "move";

        const position = _getDropPosition(targetItem, e.clientY, mode);

        // Update visual feedback
        if (_treeDragState.currentTarget !== targetItem || _treeDragState.currentPosition !== position) {
          _clearDragOver(el);
          _removeIndicator();

          _treeDragState.currentTarget = targetItem;
          _treeDragState.currentPosition = position;

          if (position === "on") {
            targetItem.classList.add("nojs-tree-drag-over");
          } else {
            _showIndicator(targetItem, position);
          }
        }
      };

      // ── dragenter (delegated) ─────────────────────────────────────
      const dragenterHandler = (e) => {
        if (!_treeDragState.dragging) return;
        if (_treeDragState.dragging.treeRoot !== el) return;
        _enterDepth++;
      };

      // ── dragleave (delegated) ─────────────────────────────────────
      const dragleaveHandler = (e) => {
        if (!_treeDragState.dragging) return;
        _enterDepth--;
        if (_enterDepth <= 0) {
          _enterDepth = 0;
          _clearDragOver(el);
          _removeIndicator();
          _treeDragState.currentTarget = null;
          _treeDragState.currentPosition = null;
        }
      };

      // ── drop (delegated) ──────────────────────────────────────────
      const dropHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        _enterDepth = 0;

        if (!_treeDragState.dragging) return;
        if (_treeDragState.dragging.treeRoot !== el) return;

        const draggedItem = _treeDragState.dragging.el;
        const targetItem = _treeDragState.currentTarget;
        const position = _treeDragState.currentPosition;

        // Cleanup visuals
        _clearDragOver(el);
        _removeIndicator();

        if (!targetItem || !position) {
          _treeDragState.dragging = null;
          _treeDragState.currentTarget = null;
          _treeDragState.currentPosition = null;
          return;
        }

        // Cannot drop onto self or descendant
        if (targetItem === draggedItem || _isDescendant(targetItem, draggedItem)) {
          _treeDragState.dragging = null;
          _treeDragState.currentTarget = null;
          _treeDragState.currentPosition = null;
          return;
        }

        if (position === "on") {
          // ── Reparent: move dragged node as child of target ────────
          // Find or create the subtree (group) of the target
          let subtree = targetItem.querySelector(':scope > [role="group"]');
          if (!subtree) {
            // Look for sibling subtree
            subtree = targetItem.nextElementSibling?.matches?.('[role="group"]')
              ? targetItem.nextElementSibling
              : null;
          }
          if (!subtree) {
            // Create a new subtree container
            subtree = document.createElement("ul");
            subtree.setAttribute("role", "group");
            subtree.setAttribute("subtree", "");
            subtree.classList.add("nojs-subtree", "nojs-tree");
            subtree.setAttribute("aria-hidden", "false");
            targetItem.appendChild(subtree);
          } else {
            // Ensure the subtree is visible
            subtree.setAttribute("aria-hidden", "false");
          }

          // Ensure target is expanded
          const targetState = _treeState.branches.get(targetItem);
          if (targetState) {
            targetState.expanded = true;
            targetState.subtreeEl = subtree;
            targetItem.setAttribute("aria-expanded", "true");
          }

          // Move the dragged item into the subtree
          subtree.appendChild(draggedItem);

          el.dispatchEvent(
            new CustomEvent("tree:reparent", {
              bubbles: true,
              detail: { node: draggedItem, newParent: targetItem },
            })
          );
        } else {
          // ── Reorder: move dragged node before/after target ────────
          const targetParent = targetItem.parentElement;
          if (!targetParent) {
            _treeDragState.dragging = null;
            _treeDragState.currentTarget = null;
            _treeDragState.currentPosition = null;
            return;
          }

          if (position === "before") {
            targetParent.insertBefore(draggedItem, targetItem);
          } else {
            // after — insert after the target (and its subtree if present)
            const nextEl = targetItem.nextElementSibling;
            // Skip over the target's subtree group if it exists as a sibling
            const subtreeAfter = nextEl?.matches?.('[role="group"]') ? nextEl.nextElementSibling : nextEl;
            if (subtreeAfter) {
              targetParent.insertBefore(draggedItem, subtreeAfter);
            } else {
              targetParent.appendChild(draggedItem);
            }
          }

          const newIndex = _getIndexAmongSiblings(draggedItem);

          el.dispatchEvent(
            new CustomEvent("tree:reorder", {
              bubbles: true,
              detail: { node: draggedItem, newIndex },
            })
          );
        }

        _treeDragState.dragging = null;
        _treeDragState.currentTarget = null;
        _treeDragState.currentPosition = null;
      };

      // ── dragend (delegated) ───────────────────────────────────────
      const dragendHandler = (e) => {
        const item = _findTreeItem(e.target);
        // The drop handler clears the drag state before dragend fires, so a
        // completed drop is recognised by the class set in dragstart.
        const node = _treeDragState.dragging?.el
          || (item?.classList.contains("nojs-dragging") ? item : null);
        if (item) {
          item.classList.remove("nojs-dragging");
        }

        _clearDragOver(el);
        _removeIndicator();
        _enterDepth = 0;

        if (node) {
          node.dispatchEvent(
            new CustomEvent("tree:drag-end", {
              bubbles: true,
              detail: { node },
            })
          );
        }

        _treeDragState.dragging = null;
        _treeDragState.currentTarget = null;
        _treeDragState.currentPosition = null;
      };

      el.addEventListener("dragstart", dragstartHandler);
      el.addEventListener("dragover", dragoverHandler);
      el.addEventListener("dragenter", dragenterHandler);
      el.addEventListener("dragleave", dragleaveHandler);
      el.addEventListener("drop", dropHandler);
      el.addEventListener("dragend", dragendHandler);

      addDisposer(el, () => {
        el.removeEventListener("dragstart", dragstartHandler);
        el.removeEventListener("dragover", dragoverHandler);
        el.removeEventListener("dragenter", dragenterHandler);
        el.removeEventListener("dragleave", dragleaveHandler);
        el.removeEventListener("drop", dropHandler);
        el.removeEventListener("dragend", dragendHandler);
        _clearDragOver(el);
        _removeIndicator();
      });

      // Make all existing treeitems draggable
      _makeTreeItemsDraggable(el);

      // Observe for dynamically added treeitems, and for items that get
      // role="treeitem" after this directive ran: with static markup the
      // branch and subtree directives (priority 16) set the role later.
      const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          if (mutation.type === "attributes") {
            if (mutation.target.getAttribute("role") === "treeitem") {
              _applyDraggable(mutation.target);
            }
            continue;
          }
          for (const node of mutation.addedNodes) {
            if (node.nodeType !== 1) continue;
            if (node.getAttribute("role") === "treeitem") {
              _applyDraggable(node);
            }
            // Also check descendants
            const items = node.querySelectorAll?.('[role="treeitem"]');
            if (items) {
              for (const item of items) _applyDraggable(item);
            }
          }
        }
      });
      observer.observe(el, { childList: true, subtree: true, attributes: true, attributeFilter: ["role"] });
      addDisposer(el, () => observer.disconnect());
    },
  });
}

/** Set draggable on a treeitem (unless tree-drag-disabled). */
function _applyDraggable(item) {
  if (item.hasAttribute("tree-drag-disabled")) {
    item.draggable = false;
    return;
  }
  item.draggable = true;
}

/** Make all treeitems inside a tree root draggable. */
function _makeTreeItemsDraggable(treeRoot) {
  const items = treeRoot.querySelectorAll('[role="treeitem"]');
  for (const item of items) _applyDraggable(item);
}
