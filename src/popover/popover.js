import { _popoverRegistry } from "./state.js";
import { _injectPopoverStyles } from "./styles.js";

function addDisposer(el, fn) {
  el.__disposers = el.__disposers || [];
  el.__disposers.push(fn);
}

// Feature-detect a native Popover API method on an element. When unavailable,
// the directive still registers ARIA/state wiring but skips calls that would
// throw. `method` defaults to "togglePopover" (the click/toggle path).
function _supportsPopover(el, method = "togglePopover") {
  return !!el && typeof el[method] === "function";
}

// ─── Positioning helper ─────────────────────────────────────────────

const GAP = 8;

function _positionPopover(popoverEl, triggerEl, position) {
  const triggerRect = triggerEl.getBoundingClientRect();
  const popoverRect = popoverEl.getBoundingClientRect();
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  let top, left;

  switch (position) {
    case "top":
      top = triggerRect.top - popoverRect.height - GAP;
      left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2;
      break;
    case "left":
      top = triggerRect.top + (triggerRect.height - popoverRect.height) / 2;
      left = triggerRect.left - popoverRect.width - GAP;
      break;
    case "right":
      top = triggerRect.top + (triggerRect.height - popoverRect.height) / 2;
      left = triggerRect.right + GAP;
      break;
    case "bottom":
    default:
      top = triggerRect.bottom + GAP;
      left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2;
      break;
  }

  // Flip if overflowing (vertical and horizontal axes both covered)
  if (position === "bottom" && top + popoverRect.height > vh) top = triggerRect.top - popoverRect.height - GAP;
  if (position === "top" && top < 0) top = triggerRect.bottom + GAP;
  if (position === "right" && left + popoverRect.width > vw) left = triggerRect.left - popoverRect.width - GAP;
  if (position === "left" && left < 0) left = triggerRect.right + GAP;

  // Clamp to viewport
  if (left < 4) left = 4;
  if (left + popoverRect.width > vw - 4) left = vw - popoverRect.width - 4;
  if (top < 4) top = 4;
  if (top + popoverRect.height > vh - 4) top = vh - popoverRect.height - 4;

  popoverEl.style.top = `${top}px`;
  popoverEl.style.left = `${left}px`;
}

// ─── Live positioning (track scroll/resize while open) ──────────────
//
// A position:fixed popover detaches from its trigger when the page scrolls
// or the viewport resizes. We attach scroll/resize listeners on open and
// remove them on close so the popover follows its anchor. Reposition work is
// rAF-throttled and guarded by isConnected / :popover-open (Rules 2 & 4).

function _startTracking(entry, anchorEl) {
  // Tear down any prior tracking for this entry before re-attaching.
  if (entry._untrack) entry._untrack();

  let rafId = 0;
  const reposition = () => {
    rafId = 0;
    const popoverEl = entry.popoverEl;
    if (!popoverEl || !popoverEl.isConnected) {
      stop();
      return;
    }
    if (typeof popoverEl.matches === "function" && !popoverEl.matches(":popover-open")) {
      stop();
      return;
    }
    _positionPopover(popoverEl, anchorEl, entry.position);
  };

  const onChange = () => {
    if (rafId) return;
    rafId = requestAnimationFrame(reposition);
  };

  const stop = () => {
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = 0;
    }
    window.removeEventListener("scroll", onChange, true);
    window.removeEventListener("resize", onChange);
    entry._untrack = null;
  };

  window.addEventListener("scroll", onChange, true);
  window.addEventListener("resize", onChange);
  entry._untrack = stop;
  return stop;
}

function _stopTracking(entry) {
  if (entry && entry._untrack) entry._untrack();
}

// ─── popover directive ──────────────────────────────────────────────

export function registerPopoverDirective(NoJS) {

  NoJS.directive("popover", {
    priority: 20,
    init(el, name, expr) {
      _injectPopoverStyles();

      const popoverId = expr || el.getAttribute("id") || `nojs-popover-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      el.setAttribute("data-popover-id", popoverId);
      // Ensure a matching DOM id so trigger `aria-controls` resolves to a real
      // element (avoids a dangling reference). Don't clobber an existing id.
      if (!el.id) el.id = popoverId;

      // Set native popover attribute for Popover API
      el.setAttribute("popover", "auto");
      el.classList.add("nojs-popover");

      const position = el.getAttribute("popover-position") || "bottom";

      // Register in state. The popover always owns the authoritative position,
      // so re-merge it even when a trigger created the entry first (default
      // 'bottom' must never override the popover's declared position).
      if (!_popoverRegistry.has(popoverId)) {
        _popoverRegistry.set(popoverId, { popoverEl: el, triggerEls: new Set(), position, open: false, _untrack: null });
      } else {
        const entry = _popoverRegistry.get(popoverId);
        entry.popoverEl = el;
        entry.position = position;
      }

      // Sync ARIA on native toggle events
      const toggleHandler = (e) => {
        const entry = _popoverRegistry.get(popoverId);
        if (!entry) return;
        const isOpen = e.newState === "open";
        entry.open = isOpen;
        for (const t of entry.triggerEls) t.setAttribute("aria-expanded", String(isOpen));
        // Stop live-position tracking once the popover closes.
        if (!isOpen) _stopTracking(entry);
      };
      el.addEventListener("toggle", toggleHandler);

      addDisposer(el, () => {
        el.removeEventListener("toggle", toggleHandler);
        const entry = _popoverRegistry.get(popoverId);
        if (!entry) return;
        // Only clear the fields this popover element owns — keep the shared
        // entry alive while other triggers still reference it (#20).
        _stopTracking(entry);
        if (entry.popoverEl === el) {
          entry.popoverEl = null;
          entry.open = false;
        }
        // Remove the entry only once nothing references it anymore.
        if (!entry.popoverEl && entry.triggerEls.size === 0) {
          _popoverRegistry.delete(popoverId);
        }
      });
    },
  });

  NoJS.directive("popover-trigger", {
    priority: 20,
    init(el, name, expr) {
      _injectPopoverStyles();

      let popoverId = expr;

      // Proximity-based: find nearest popover in same scope. Falls back to the
      // declared `id` since `data-popover-id` may not be set yet when the
      // trigger and popover share priority 20 and the trigger runs first (#39).
      if (!popoverId) {
        const scope = el.closest("[use]") || el.parentElement;
        const nearestPopover =
          scope?.querySelector("[data-popover-id]") || scope?.querySelector("[popover]");
        if (nearestPopover) {
          popoverId = nearestPopover.getAttribute("data-popover-id") || nearestPopover.id;
        }
        if (!popoverId) {
          console.warn("[popover-trigger] attribute value (popover ID) is required.");
          return;
        }
      }

      el.setAttribute("aria-haspopup", "true");
      el.setAttribute("aria-expanded", "false");
      el.setAttribute("aria-controls", popoverId);

      if (!_popoverRegistry.has(popoverId)) {
        _popoverRegistry.set(popoverId, { popoverEl: null, triggerEls: new Set(), position: "bottom", open: false, _untrack: null });
      }
      _popoverRegistry.get(popoverId).triggerEls.add(el);

      const clickHandler = (e) => {
        const entry = _popoverRegistry.get(popoverId);
        if (!entry || !entry.popoverEl) {
          console.warn(`[popover-trigger] no popover found with id "${popoverId}".`);
          return;
        }
        if (!_supportsPopover(entry.popoverEl)) return;
        entry.popoverEl.togglePopover();
        // Position after opening, then track scroll/resize while it stays open.
        requestAnimationFrame(() => {
          if (entry.popoverEl.matches(":popover-open")) {
            _positionPopover(entry.popoverEl, el, entry.position);
            _startTracking(entry, el);
          } else {
            _stopTracking(entry);
          }
        });
      };
      el.addEventListener("click", clickHandler);

      // Close on Escape (focus trigger)
      const escHandler = (e) => {
        const entry = _popoverRegistry.get(popoverId);
        if (e.key === "Escape" && entry?.open) {
          if (_supportsPopover(entry.popoverEl, "hidePopover")) entry.popoverEl.hidePopover();
          _stopTracking(entry);
          el.focus();
        }
      };
      document.addEventListener("keydown", escHandler);

      addDisposer(el, () => {
        el.removeEventListener("click", clickHandler);
        document.removeEventListener("keydown", escHandler);
        const entry = _popoverRegistry.get(popoverId);
        if (!entry) return;
        entry.triggerEls.delete(el);
        // Remove the entry only once nothing references it anymore (#20).
        if (!entry.popoverEl && entry.triggerEls.size === 0) {
          _stopTracking(entry);
          _popoverRegistry.delete(popoverId);
        }
      });
    },
  });

  NoJS.directive("popover-dismiss", {
    priority: 20,
    init(el) {
      _injectPopoverStyles();

      const clickHandler = () => {
        const popoverEl = el.closest(".nojs-popover");
        if (!popoverEl || !_supportsPopover(popoverEl, "hidePopover")) return;
        popoverEl.hidePopover();
      };

      el.addEventListener("click", clickHandler);
      addDisposer(el, () => el.removeEventListener("click", clickHandler));
    },
  });

  // ─── Programmatic API: $popover ───────────────────────────────────
  const popoverApi = (id, anchorEl) => popoverApi.open(id, anchorEl);

  popoverApi.open = (id, anchorEl) => {
    const entry = _popoverRegistry.get(id);
    if (!entry || !entry.popoverEl || !_supportsPopover(entry.popoverEl, "showPopover")) return false;
    try { entry.popoverEl.showPopover(); } catch { return false; }
    const anchor = anchorEl || [...entry.triggerEls][0];
    if (anchor) {
      requestAnimationFrame(() => {
        _positionPopover(entry.popoverEl, anchor, entry.position);
        _startTracking(entry, anchor);
      });
    }
    return true;
  };

  popoverApi.close = (id) => {
    const entry = _popoverRegistry.get(id);
    if (!entry || !entry.popoverEl || !_supportsPopover(entry.popoverEl, "hidePopover")) return false;
    try { entry.popoverEl.hidePopover(); } catch { /* already closed */ }
    _stopTracking(entry);
    return true;
  };

  popoverApi.toggle = (id, anchorEl) => {
    const entry = _popoverRegistry.get(id);
    if (!entry || !entry.popoverEl || !_supportsPopover(entry.popoverEl)) return false;
    entry.popoverEl.togglePopover();
    const anchor = anchorEl || [...entry.triggerEls][0];
    if (anchor && entry.popoverEl.matches(":popover-open")) {
      requestAnimationFrame(() => {
        _positionPopover(entry.popoverEl, anchor, entry.position);
        _startTracking(entry, anchor);
      });
    } else {
      _stopTracking(entry);
    }
    return true;
  };

  NoJS.popover = popoverApi;
}
