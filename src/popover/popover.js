import { _popoverRegistry } from "./state.js";
import { _injectPopoverStyles } from "./styles.js";

function addDisposer(el, fn) {
  el.__disposers = el.__disposers || [];
  el.__disposers.push(fn);
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

  // Flip if overflowing
  if (position === "bottom" && top + popoverRect.height > vh) top = triggerRect.top - popoverRect.height - GAP;
  if (position === "top" && top < 0) top = triggerRect.bottom + GAP;

  // Clamp to viewport
  if (left < 4) left = 4;
  if (left + popoverRect.width > vw - 4) left = vw - popoverRect.width - 4;
  if (top < 4) top = 4;
  if (top + popoverRect.height > vh - 4) top = vh - popoverRect.height - 4;

  popoverEl.style.top = `${top}px`;
  popoverEl.style.left = `${left}px`;
}

// ─── popover directive ──────────────────────────────────────────────

export function registerPopoverDirective(NoJS) {

  NoJS.directive("popover", {
    priority: 20,
    init(el, name, expr) {
      _injectPopoverStyles();

      const popoverId = expr || el.getAttribute("id") || `nojs-popover-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      el.setAttribute("data-popover-id", popoverId);

      // Set native popover attribute for Popover API
      el.setAttribute("popover", "auto");
      el.classList.add("nojs-popover");

      const position = el.getAttribute("popover-position") || "bottom";

      // Register in state
      if (!_popoverRegistry.has(popoverId)) {
        _popoverRegistry.set(popoverId, { popoverEl: el, triggerEls: new Set(), position, open: false });
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
      };
      el.addEventListener("toggle", toggleHandler);

      addDisposer(el, () => {
        el.removeEventListener("toggle", toggleHandler);
        _popoverRegistry.delete(popoverId);
      });
    },
  });

  NoJS.directive("popover-trigger", {
    priority: 20,
    init(el, name, expr) {
      _injectPopoverStyles();

      let popoverId = expr;

      // Proximity-based: find nearest popover in same scope
      if (!popoverId) {
        const scope = el.closest("[use]") || el.parentElement;
        const nearestPopover = scope?.querySelector("[data-popover-id]");
        if (nearestPopover) {
          popoverId = nearestPopover.getAttribute("data-popover-id");
        }
        if (!popoverId) {
          NoJS._warn("[popover-trigger] attribute value (popover ID) is required.");
          return;
        }
      }

      el.setAttribute("aria-haspopup", "true");
      el.setAttribute("aria-expanded", "false");
      el.setAttribute("aria-controls", popoverId);

      if (!_popoverRegistry.has(popoverId)) {
        _popoverRegistry.set(popoverId, { popoverEl: null, triggerEls: new Set(), position: "bottom", open: false });
      }
      _popoverRegistry.get(popoverId).triggerEls.add(el);

      const clickHandler = (e) => {
        const entry = _popoverRegistry.get(popoverId);
        if (!entry || !entry.popoverEl) {
          NoJS._warn(`[popover-trigger] no popover found with id "${popoverId}".`);
          return;
        }
        entry.popoverEl.togglePopover();
        // Position after opening
        requestAnimationFrame(() => {
          if (entry.popoverEl.matches(":popover-open")) {
            _positionPopover(entry.popoverEl, el, entry.position);
          }
        });
      };
      el.addEventListener("click", clickHandler);

      // Close on Escape (focus trigger)
      const escHandler = (e) => {
        const entry = _popoverRegistry.get(popoverId);
        if (e.key === "Escape" && entry?.open) {
          entry.popoverEl.hidePopover();
          el.focus();
        }
      };
      document.addEventListener("keydown", escHandler);

      addDisposer(el, () => {
        el.removeEventListener("click", clickHandler);
        document.removeEventListener("keydown", escHandler);
        const entry = _popoverRegistry.get(popoverId);
        if (entry) entry.triggerEls.delete(el);
      });
    },
  });

  NoJS.directive("popover-dismiss", {
    priority: 20,
    init(el) {
      _injectPopoverStyles();

      const clickHandler = () => {
        const popoverEl = el.closest(".nojs-popover");
        if (!popoverEl) return;
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
    if (!entry || !entry.popoverEl) return false;
    try { entry.popoverEl.showPopover(); } catch { return false; }
    const anchor = anchorEl || [...entry.triggerEls][0];
    if (anchor) {
      requestAnimationFrame(() => _positionPopover(entry.popoverEl, anchor, entry.position));
    }
    return true;
  };

  popoverApi.close = (id) => {
    const entry = _popoverRegistry.get(id);
    if (!entry || !entry.popoverEl) return false;
    try { entry.popoverEl.hidePopover(); } catch { /* already closed */ }
    return true;
  };

  popoverApi.toggle = (id, anchorEl) => {
    const entry = _popoverRegistry.get(id);
    if (!entry || !entry.popoverEl) return false;
    entry.popoverEl.togglePopover();
    const anchor = anchorEl || [...entry.triggerEls][0];
    if (anchor && entry.popoverEl.matches(":popover-open")) {
      requestAnimationFrame(() => _positionPopover(entry.popoverEl, anchor, entry.position));
    }
    return true;
  };

  NoJS.popover = popoverApi;
}
