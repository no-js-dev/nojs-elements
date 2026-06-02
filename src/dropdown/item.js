import { _dropdownState } from "./state.js";
import { _injectDropdownStyles } from "./styles.js";

function addDisposer(el, fn) {
  el.__disposers = el.__disposers || [];
  el.__disposers.push(fn);
}

// ─── Get navigable (non-disabled) items from the parent menu ────────
function _getItems(menu) {
  return [...menu.querySelectorAll("[dropdown-item]")].filter(
    (item) => !item.hasAttribute("disabled") && item.getAttribute("aria-disabled") !== "true"
  );
}

// ─── Close the parent menu from an item ─────────────────────────────
// Hides the Popover-API top layer when available (the toggle directive's
// "toggle" listener then resets aria/data-open), and ALSO resets the
// component state directly so closing is robust even if the toggle event
// never reaches the toggle (detached menu node, toggle not initialised) — #37.
// Popover calls are feature-detected to stay symmetric on browsers without
// the Popover API — #16.
function _closeMenu(menu, wrapper) {
  if (!menu) return;
  if (typeof menu.hidePopover === "function") {
    try {
      menu.hidePopover();
    } catch {
      // ignore — already hidden / disconnected
    }
  }
  menu.removeAttribute("data-open");
  const toggle = wrapper && wrapper.querySelector("[dropdown-toggle]");
  if (toggle) toggle.setAttribute("aria-expanded", "false");
  if (_dropdownState.openMenus.has(menu)) _dropdownState.openMenus.delete(menu);
}

// ─── Register dropdown-item directive ───────────────────────────────
export function registerDropdownItem(NoJS) {
  NoJS.directive("dropdown-item", {
    priority: 15,
    init(el) {
      _injectDropdownStyles();

      const menu = el.closest("[dropdown-menu]");
      const wrapper = el.closest("[dropdown]");

      // ARIA
      el.setAttribute("role", "menuitem");
      el.setAttribute("tabindex", "-1");
      el.classList.add("nojs-dropdown-item");

      // Mark disabled items
      if (el.hasAttribute("disabled")) {
        el.setAttribute("aria-disabled", "true");
      }

      // ── Keyboard navigation ─────────────────────────────────────
      const keydownHandler = (e) => {
        if (!menu) return;
        const items = _getItems(menu);
        const idx = items.indexOf(el);

        switch (e.key) {
          case "ArrowDown": {
            e.preventDefault();
            const next = idx + 1 < items.length ? items[idx + 1] : items[0];
            next.focus();
            break;
          }
          case "ArrowUp": {
            e.preventDefault();
            const prev = idx - 1 >= 0 ? items[idx - 1] : items[items.length - 1];
            prev.focus();
            break;
          }
          case "Home": {
            e.preventDefault();
            if (items.length) items[0].focus();
            break;
          }
          case "End": {
            e.preventDefault();
            if (items.length) items[items.length - 1].focus();
            break;
          }
          case "Enter": {
            e.preventDefault();
            el.click();
            break;
          }
          case "Escape": {
            e.preventDefault();
            _closeMenu(menu, wrapper);
            // Return focus to the toggle
            if (wrapper) {
              const toggle = wrapper.querySelector("[dropdown-toggle]");
              if (toggle) toggle.focus();
            }
            break;
          }
          case "Tab": {
            // Close menu on Tab
            _closeMenu(menu, wrapper);
            break;
          }
        }
      };
      el.addEventListener("keydown", keydownHandler);
      addDisposer(el, () => el.removeEventListener("keydown", keydownHandler));

      // ── Close menu after click on item ──────────────────────────
      const clickHandler = () => {
        _closeMenu(menu, wrapper);
        // Return focus to the toggle
        if (wrapper) {
          const toggle = wrapper.querySelector("[dropdown-toggle]");
          if (toggle) toggle.focus();
        }
      };
      el.addEventListener("click", clickHandler);
      addDisposer(el, () => el.removeEventListener("click", clickHandler));
    },
  });
}
