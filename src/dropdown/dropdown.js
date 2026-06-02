import { _dropdownState } from "./state.js";
import { _injectDropdownStyles } from "./styles.js";

// Monotonic counter for guaranteed-unique menu ids (Date.now()+random can
// collide when several dropdowns init within the same tick).
let _menuIdCounter = 0;

function addDisposer(el, fn) {
  el.__disposers = el.__disposers || [];
  el.__disposers.push(fn);
}

// ─── Position the menu using fixed viewport coordinates ─────────────
function _positionMenu(menu, toggle, wrapper) {
  const pos = wrapper.getAttribute("dropdown-position") || "bottom";
  const align = wrapper.getAttribute("dropdown-align") || "start";

  // Reset position for measurement
  menu.style.top = "";
  menu.style.left = "";

  const toggleRect = toggle.getBoundingClientRect();
  const menuRect = menu.getBoundingClientRect();
  const vh = window.innerHeight;
  const vw = window.innerWidth;

  let top, left;

  // Primary axis (viewport-absolute coordinates)
  switch (pos) {
    case "top":
      top = toggleRect.top - menuRect.height;
      left = toggleRect.left;
      break;
    case "left":
      top = toggleRect.top;
      left = toggleRect.left - menuRect.width;
      break;
    case "right":
      top = toggleRect.top;
      left = toggleRect.right;
      break;
    default: // bottom
      top = toggleRect.bottom;
      left = toggleRect.left;
  }

  // Alignment
  if (pos === "bottom" || pos === "top") {
    if (align === "end") left = toggleRect.right - menuRect.width;
  } else {
    if (align === "end") top = toggleRect.bottom - menuRect.height;
  }

  // Flip if overflows viewport
  if (pos === "bottom" && top + menuRect.height > vh && toggleRect.top - menuRect.height > 0) {
    top = toggleRect.top - menuRect.height;
  } else if (pos === "top" && top < 0 && toggleRect.bottom + menuRect.height <= vh) {
    top = toggleRect.bottom;
  }

  // Clamp horizontal to keep within viewport
  if (left < 4) left = 4;
  if (left + menuRect.width > vw - 4) left = vw - menuRect.width - 4;

  menu.style.top = `${top}px`;
  menu.style.left = `${left}px`;
}

// ─── Get navigable items from a menu ────────────────────────────────
function _getItems(menu) {
  return [...menu.querySelectorAll("[dropdown-item]")].filter(
    (item) => !item.hasAttribute("disabled") && item.getAttribute("aria-disabled") !== "true"
  );
}

function _focusFirstItem(menu) {
  const items = _getItems(menu);
  if (items.length) items[0].focus();
}

function _focusLastItem(menu) {
  const items = _getItems(menu);
  if (items.length) items[items.length - 1].focus();
}

// ─── Register dropdown directives ───────────────────────────────────
export function registerDropdownDirective(NoJS) {

  NoJS.directive("dropdown", {
    priority: 15,
    init(el) {
      _injectDropdownStyles();
    },
  });

  NoJS.directive("dropdown-toggle", {
    priority: 15,
    init(el) {
      _injectDropdownStyles();

      const wrapper = el.closest("[dropdown]");
      if (!wrapper) return;

      const menu = wrapper.querySelector("[dropdown-menu]");
      if (!menu) return;

      // ARIA
      el.setAttribute("aria-haspopup", "menu");
      el.setAttribute("aria-expanded", "false");
      menu.classList.add("nojs-dropdown-menu");
      menu.setAttribute("role", "menu");
      menu.setAttribute("popover", "auto");
      if (!menu.id) menu.id = `nojs-dd-menu-${Date.now()}-${_menuIdCounter++}`;
      el.setAttribute("aria-controls", menu.id);

      // Whether this menu is currently shown via the Popover API top-layer.
      // Tracked so close() takes the symmetric path open() took, keeping the
      // DOM popover state in sync with the component state (prevents
      // InvalidStateError on re-open).
      let _popoverShown = false;
      const _hasPopoverApi =
        typeof menu.showPopover === "function" && typeof menu.hidePopover === "function";

      function open() {
        menu.setAttribute("data-open", "");
        if (_hasPopoverApi && !_popoverShown) {
          try {
            menu.showPopover();
            _popoverShown = true;
          } catch {
            // Popover API rejected (e.g. not connected); fall back to CSS only.
            _popoverShown = false;
          }
        }
        el.setAttribute("aria-expanded", "true");
        _positionMenu(menu, el, wrapper);
        _dropdownState.openMenus.set(menu, { toggle: el, wrapper });
      }

      function close() {
        // Symmetric with open(): only hide the popover if we actually showed it.
        // Clear the flag first so the synchronous "toggle" event fired by
        // hidePopover() doesn't re-enter this path.
        if (_hasPopoverApi && _popoverShown) {
          _popoverShown = false;
          try {
            menu.hidePopover();
          } catch {
            // ignore — already hidden / disconnected
          }
        }
        menu.removeAttribute("data-open");
        el.setAttribute("aria-expanded", "false");
        _dropdownState.openMenus.delete(menu);
      }

      function isOpen() {
        return el.getAttribute("aria-expanded") === "true";
      }

      // Sync with Popover API toggle events
      const toggleEvtHandler = (evt) => {
        if (evt.newState === "closed" && isOpen()) close();
      };
      menu.addEventListener("toggle", toggleEvtHandler);

      // Toggle on click
      const clickHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (isOpen()) close(); else open();
      };
      el.addEventListener("click", clickHandler);

      // Close on outside click
      const outsideClick = (e) => {
        if (isOpen() && !wrapper.contains(e.target)) close();
      };
      document.addEventListener("click", outsideClick, true);

      // Close on Escape
      const escHandler = (e) => {
        if (e.key === "Escape" && isOpen()) {
          close();
          el.focus();
        }
      };
      document.addEventListener("keydown", escHandler);

      // Keyboard on toggle
      const keydownHandler = (e) => {
        switch (e.key) {
          case "Enter":
          case " ":
            e.preventDefault();
            open();
            _focusFirstItem(menu);
            break;
          case "ArrowDown":
            e.preventDefault();
            open();
            _focusFirstItem(menu);
            break;
          case "ArrowUp":
            e.preventDefault();
            open();
            _focusLastItem(menu);
            break;
        }
      };
      el.addEventListener("keydown", keydownHandler);

      // Menu-level keyboard handler for initial arrow navigation (WebKit compat)
      const menuKeydownHandler = (e) => {
        if (!isOpen()) return;
        const items = _getItems(menu);
        // Only handle if no menu item is currently focused
        const activeItem = items.find(item => item === document.activeElement);
        if (activeItem) return; // Item-level handlers manage navigation once an item is focused

        switch (e.key) {
          case "ArrowDown":
            e.preventDefault();
            _focusFirstItem(menu);
            break;
          case "ArrowUp":
            e.preventDefault();
            _focusLastItem(menu);
            break;
        }
      };
      menu.addEventListener("keydown", menuKeydownHandler);

      // Reposition on scroll/resize
      const repositionHandler = () => {
        if (isOpen()) _positionMenu(menu, el, wrapper);
      };
      window.addEventListener("scroll", repositionHandler, true);
      window.addEventListener("resize", repositionHandler);

      addDisposer(el, () => {
        el.removeEventListener("click", clickHandler);
        el.removeEventListener("keydown", keydownHandler);
        menu.removeEventListener("keydown", menuKeydownHandler);
        menu.removeEventListener("toggle", toggleEvtHandler);
        document.removeEventListener("click", outsideClick, true);
        document.removeEventListener("keydown", escHandler);
        window.removeEventListener("scroll", repositionHandler, true);
        window.removeEventListener("resize", repositionHandler);
        _dropdownState.openMenus.delete(menu);
      });
    },
  });

  NoJS.directive("dropdown-menu", {
    priority: 15,
    init(el) {
      _injectDropdownStyles();
      if (!el.hasAttribute("role")) el.setAttribute("role", "menu");
    },
  });

  // ─── Programmatic API: $dropdown ──────────────────────────────────
  const dropdownApi = (menuId) => dropdownApi.open(menuId);

  dropdownApi.open = (menuId) => {
    const menu = document.getElementById(menuId);
    if (!menu) return false;
    const wrapper = menu.closest("[dropdown]");
    const toggle = wrapper?.querySelector("[dropdown-toggle]");
    if (!toggle || toggle.getAttribute("aria-expanded") === "true") return false;
    toggle.click();
    return true;
  };

  dropdownApi.close = (menuId) => {
    const menu = document.getElementById(menuId);
    if (!menu) return false;
    const wrapper = menu.closest("[dropdown]");
    const toggle = wrapper?.querySelector("[dropdown-toggle]");
    if (!toggle || toggle.getAttribute("aria-expanded") !== "true") return false;
    toggle.click();
    return true;
  };

  NoJS.dropdown = dropdownApi;
}
