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
            if (menu) {
              try { menu.hidePopover(); } catch {}
            }
            // Return focus to the toggle
            if (wrapper) {
              const toggle = wrapper.querySelector("[dropdown-toggle]");
              if (toggle) toggle.focus();
            }
            break;
          }
          case "Tab": {
            // Close menu on Tab
            if (menu) {
              try { menu.hidePopover(); } catch {}
            }
            break;
          }
        }
      };
      el.addEventListener("keydown", keydownHandler);
      addDisposer(el, () => el.removeEventListener("keydown", keydownHandler));

      // ── Close menu after click on item ──────────────────────────
      const clickHandler = () => {
        if (menu) {
          try { menu.hidePopover(); } catch {}
        }
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
