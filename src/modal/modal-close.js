import { _modalRegistry } from "./state.js";
import { _closeModal } from "./modal.js";
import { _injectModalStyles } from "./styles.js";
import { defineDirective } from "../_backend.js";

// ─── Register the `modal-close` directive ───────────────────────────
export function registerModalClose(NoJS) {
  NoJS.directive("modal-close", defineDirective(NoJS, "modal-close", {
    priority: 10,
    init(el, expr, be) {
      _injectModalStyles();

      const clickHandler = () => {
        let modalEl;
        let modalId;

        if (expr) {
          // Close a specific modal by ID
          modalId = expr;
          modalEl = _modalRegistry.get(modalId);
          if (!modalEl) {
            console.warn(`[modal-close] modal "${modalId}" not found`);
            return;
          }
        } else {
          // Close the closest ancestor modal
          modalEl = el.closest("[modal]");
          if (!modalEl) {
            console.warn("[modal-close] no parent modal found");
            return;
          }
          modalId = modalEl.getAttribute("modal");
        }

        _closeModal(modalEl, modalId);
      };

      el.addEventListener("click", clickHandler);

      // ── Cleanup ─────────────────────────────────────────────────
      be.dispose(() => {
        el.removeEventListener("click", clickHandler);
      });
    },
  }));
}
