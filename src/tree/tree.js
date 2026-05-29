import { _treeState } from "./state.js";
import { _injectTreeStyles } from "./styles.js";

function addDisposer(el, fn) {
  el.__disposers = el.__disposers || [];
  el.__disposers.push(fn);
}

// ─── Helpers ─────────────────────────────────────────────────────────

/** Get all visible treeitem elements inside a tree root. */
function _getVisibleItems(treeRoot) {
  const items = [];
  const walker = document.createTreeWalker(treeRoot, NodeFilter.SHOW_ELEMENT, {
    acceptNode(node) {
      // Skip hidden subtrees entirely
      if (node.matches && node.matches('.nojs-subtree[aria-hidden="true"]')) {
        return NodeFilter.FILTER_REJECT;
      }
      if (node.getAttribute("role") === "treeitem") {
        return NodeFilter.FILTER_ACCEPT;
      }
      return NodeFilter.FILTER_SKIP;
    },
  });
  let node;
  while ((node = walker.nextNode())) items.push(node);
  return items;
}

/** Find the closest tree root for an element. */
function _findTreeRoot(el) {
  return el.closest('[role="tree"]');
}

/**
 * Find the parent branch (treeitem) of a treeitem, handling both layouts:
 *  - child-nested: subtree is a child of the branch → walk DOM ancestors.
 *  - sibling: subtree is the next sibling of the branch → the owning branch
 *    is the element immediately before the enclosing subtree/group.
 */
function _findParentBranch(el) {
  // Nearest enclosing group/subtree that holds this item
  const group = el.parentElement?.closest('[role="group"], .nojs-subtree');
  if (group) {
    // Child-nested: the group lives inside its branch.
    const ancestorBranch = group.parentElement?.closest('[role="treeitem"]');
    if (ancestorBranch) return ancestorBranch;
    // Sibling layout: the group sits right after its owning branch.
    const prev = group.previousElementSibling;
    if (prev?.matches?.('[role="treeitem"]')) return prev;
  }
  // Fallback: plain DOM ancestor walk.
  return el.parentElement?.closest('[role="treeitem"]') || null;
}

/** Get the text label of a treeitem for typeahead matching. */
function _getItemLabel(el) {
  // Use direct text content, excluding subtree text
  const clone = el.cloneNode(true);
  const subtrees = clone.querySelectorAll('[role="group"]');
  subtrees.forEach((s) => s.remove());
  return (clone.textContent || "").trim().toLowerCase();
}

// ─── tree directive ──────────────────────────────────────────────────

export function registerTreeDirective(NoJS) {
  NoJS.directive("tree", {
    priority: 15,
    init(el) {
      _injectTreeStyles();

      // Setup tree root
      el.classList.add("nojs-tree");
      el.setAttribute("role", "tree");

      // tree-icon attribute (default: true)
      const iconAttr = el.getAttribute("tree-icon");
      if (iconAttr === "false") {
        el.setAttribute("data-tree-icon", "false");
      }
    },
  });
}

// ─── branch directive ────────────────────────────────────────────────

export function registerBranch(NoJS) {
  NoJS.directive("branch", {
    priority: 16,
    init(el, name, expr) {
      _injectTreeStyles();

      const startExpanded = expr === "expanded";

      // Setup branch
      el.classList.add("nojs-branch");
      el.setAttribute("role", "treeitem");
      el.setAttribute("aria-expanded", String(startExpanded));

      // Roving tabindex — exactly one treeitem in the tree is focusable (0).
      // Claim tabindex 0 only if no other treeitem already holds it; this is
      // order-independent and avoids zero/multiple tabbable items when branches
      // initialize out of order or are added dynamically.
      const treeRoot = _findTreeRoot(el);
      if (treeRoot) {
        const existingFocusable = treeRoot.querySelector(
          '[role="treeitem"][tabindex="0"]'
        );
        el.setAttribute("tabindex", existingFocusable ? "-1" : "0");
      } else {
        el.setAttribute("tabindex", "0");
      }

      // Find the subtree child (will be set up by subtree directive)
      // Use a microtask to ensure subtree has been initialized
      let _disposed = false;
      queueMicrotask(() => {
        if (_disposed) return;
        // Look for subtree as child first, then as next sibling
        const subtreeEl = el.querySelector(':scope > [subtree], :scope > .nojs-subtree')
          || (el.nextElementSibling?.matches?.('[subtree], .nojs-subtree') ? el.nextElementSibling : null);
        if (subtreeEl) {
          _treeState.branches.set(el, { expanded: startExpanded, subtreeEl });
          subtreeEl.setAttribute("aria-hidden", String(!startExpanded));
        } else {
          _treeState.branches.set(el, { expanded: startExpanded, subtreeEl: null });
        }
      });

      // Selection function
      function selectBranch(el) {
        const prev = _treeState.selectedItem;
        if (prev && prev !== el) {
          prev.classList.remove("nojs-branch-selected");
          prev.setAttribute("aria-selected", "false");
        }
        el.classList.add("nojs-branch-selected");
        el.setAttribute("aria-selected", "true");
        _treeState.selectedItem = el;
      }

      // Toggle function
      function toggleBranch(el) {
        const state = _treeState.branches.get(el);
        if (!state || !state.subtreeEl) return;

        state.expanded = !state.expanded;
        el.setAttribute("aria-expanded", String(state.expanded));
        state.subtreeEl.setAttribute("aria-hidden", String(!state.expanded));
      }

      function expandBranch(el) {
        const state = _treeState.branches.get(el);
        if (!state || !state.subtreeEl || state.expanded) return;
        state.expanded = true;
        el.setAttribute("aria-expanded", "true");
        state.subtreeEl.setAttribute("aria-hidden", "false");
      }

      function collapseBranch(el) {
        const state = _treeState.branches.get(el);
        if (!state || !state.subtreeEl || !state.expanded) return;
        state.expanded = false;
        el.setAttribute("aria-expanded", "false");
        state.subtreeEl.setAttribute("aria-hidden", "true");
      }

      // Click handler — select and toggle on click of the branch element
      const clickHandler = (e) => {
        // Only handle clicks on this branch's own label, not on a nested
        // subtree/treeitem that lives inside this branch (child-nested layout).
        // Walk up from the target: the nearest enclosing treeitem must be `el`.
        const ownerItem = e.target.closest?.('[role="treeitem"]');
        if (ownerItem !== el) return;
        e.stopPropagation();
        selectBranch(el);
        toggleBranch(el);
      };
      el.addEventListener("click", clickHandler);
      addDisposer(el, () => el.removeEventListener("click", clickHandler));

      // Keyboard handler
      const keydownHandler = (e) => {
        const treeRoot = _findTreeRoot(el);
        if (!treeRoot) return;

        const visibleItems = _getVisibleItems(treeRoot);
        const currentIndex = visibleItems.indexOf(el);
        const state = _treeState.branches.get(el);
        const hasSubtree = state && state.subtreeEl;

        switch (e.key) {
          case "ArrowRight":
            e.preventDefault();
            if (hasSubtree && !state.expanded) {
              // Expand collapsed branch
              expandBranch(el);
            } else if (hasSubtree && state.expanded) {
              // Focus first child
              const firstChild = state.subtreeEl.querySelector('[role="treeitem"]');
              if (firstChild) {
                _focusItem(firstChild, visibleItems);
              }
            }
            break;

          case "ArrowLeft":
            e.preventDefault();
            if (hasSubtree && state.expanded) {
              // Collapse expanded branch
              collapseBranch(el);
            } else {
              // Focus parent branch (handles child-nested and sibling layouts)
              const parentBranch = _findParentBranch(el);
              if (parentBranch) {
                _focusItem(parentBranch, _getVisibleItems(treeRoot));
              }
            }
            break;

          case "ArrowDown":
            e.preventDefault();
            if (currentIndex < visibleItems.length - 1) {
              _focusItem(visibleItems[currentIndex + 1], visibleItems);
            }
            break;

          case "ArrowUp":
            e.preventDefault();
            if (currentIndex > 0) {
              _focusItem(visibleItems[currentIndex - 1], visibleItems);
            }
            break;

          case "Enter":
          case " ":
            e.preventDefault();
            selectBranch(el);
            toggleBranch(el);
            break;

          case "Home":
            e.preventDefault();
            if (visibleItems.length > 0) {
              _focusItem(visibleItems[0], visibleItems);
            }
            break;

          case "End":
            e.preventDefault();
            if (visibleItems.length > 0) {
              _focusItem(visibleItems[visibleItems.length - 1], visibleItems);
            }
            break;

          default:
            // Typeahead: single printable character
            if (e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
              e.preventDefault();
              _treeState.typeahead += e.key.toLowerCase();

              if (_treeState.typeaheadTimer) clearTimeout(_treeState.typeaheadTimer);
              _treeState.typeaheadTimer = setTimeout(() => {
                // Guard: bail if the originating branch was detached (Safety Rule 4)
                _treeState.typeahead = "";
                _treeState.typeaheadTimer = null;
              }, 500);

              // Find next item starting with typeahead string
              const startIdx = currentIndex + 1;
              for (let i = 0; i < visibleItems.length; i++) {
                const idx = (startIdx + i) % visibleItems.length;
                const label = _getItemLabel(visibleItems[idx]);
                if (label.startsWith(_treeState.typeahead)) {
                  _focusItem(visibleItems[idx], visibleItems);
                  break;
                }
              }
            }
            break;
        }
      };
      el.addEventListener("keydown", keydownHandler);
      addDisposer(el, () => el.removeEventListener("keydown", keydownHandler));

      // Cleanup
      addDisposer(el, () => {
        _disposed = true;
        _treeState.branches.delete(el);
        if (_treeState.selectedItem === el) {
          _treeState.selectedItem = null;
        }
        // Clear pending typeahead timer (Safety Rule 4)
        if (_treeState.typeaheadTimer) {
          clearTimeout(_treeState.typeaheadTimer);
          _treeState.typeaheadTimer = null;
          _treeState.typeahead = "";
        }
      });
    },
  });
}

/** Set roving tabindex and focus an item. */
function _focusItem(target, allItems) {
  for (const item of allItems) {
    item.setAttribute("tabindex", item === target ? "0" : "-1");
  }
  target.focus();
}

// ─── subtree directive ───────────────────────────────────────────────

export function registerSubtree(NoJS) {
  NoJS.directive("subtree", {
    priority: 16,
    init(el) {
      _injectTreeStyles();

      // Setup subtree
      el.classList.add("nojs-subtree");
      el.classList.add("nojs-tree");
      el.setAttribute("role", "group");

      // Mark leaf <li> children as treeitems (non-branch items)
      for (const li of el.children) {
        if (li.tagName === "LI" && !li.querySelector("[branch], .nojs-branch")) {
          li.setAttribute("role", "treeitem");
          li.setAttribute("tabindex", "-1");
          li.classList.add("nojs-tree-leaf");
        }
      }

      // Default hidden unless parent branch says otherwise
      // Check parent element first (subtree as child of branch), then sibling
      const parentBranch = el.parentElement?.matches?.('[role="treeitem"]')
        ? el.parentElement
        : el.previousElementSibling?.matches?.('[role="treeitem"]')
          ? el.previousElementSibling
          : null;
      if (parentBranch) {
        const state = _treeState.branches.get(parentBranch);
        if (state) {
          el.setAttribute("aria-hidden", String(!state.expanded));
          // Update state reference
          state.subtreeEl = el;
        } else {
          // Branch hasn't initialized yet, default to hidden
          el.setAttribute("aria-hidden", "true");
        }
      } else {
        el.setAttribute("aria-hidden", "true");
      }
    },
  });
}
