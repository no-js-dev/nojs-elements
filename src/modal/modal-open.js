import { _modalStack, _modalRegistry } from "./state.js";
import { _injectModalStyles } from "./styles.js";

function addDisposer(el, fn) {
  el.__disposers = el.__disposers || [];
  el.__disposers.push(fn);
}

// Look up a modal element by its data-modal-id without interpolating the
// (potentially attacker-influenced) id into a CSS selector string, which
// would allow selector injection / syntax errors.
function _findModalById(id) {
  const candidates = document.querySelectorAll("[data-modal-id]");
  for (const candidate of candidates) {
    if (candidate.getAttribute("data-modal-id") === id) return candidate;
  }
  return null;
}

// ─── Register the `modal-open` directive ────────────────────────────
export function registerModalOpen(NoJS) {
  NoJS.directive("modal-open", {
    priority: 10,
    init(el, name, expr) {
      _injectModalStyles();

      let targetId = expr;

      // Proximity-based: find nearest modal in same scope
      if (!targetId) {
        const scope = el.closest("[use]") || el.parentElement;
        const nearestModal = scope?.querySelector("[data-modal-id]");
        if (nearestModal) {
          targetId = nearestModal.getAttribute("data-modal-id");
        }
        if (!targetId) {
          console.warn("[modal-open] requires a target modal ID, e.g. modal-open=\"my-dialog\"");
          return;
        }
      }

      // ── Accessibility ───────────────────────────────────────────
      el.setAttribute("aria-haspopup", "dialog");
      el.setAttribute("aria-expanded", "false");

      const clickHandler = () => {
        const modalEl = _modalRegistry.get(targetId) || _findModalById(targetId);
        if (!modalEl) {
          console.warn(`[modal-open] modal "${targetId}" not found`);
          return;
        }

        // Guard: do not push a duplicate entry if this modal is already
        // on the stack (re-clicking the trigger or opening via another path).
        const alreadyStacked = _modalStack.some((m) => m.id === targetId);

        // Connect trigger to modal via aria-controls
        if (modalEl.id) {
          el.setAttribute("aria-controls", modalEl.id);
        }

        // Show the modal first; only mutate the stack/ARIA on success so a
        // throwing showPopover() never leaves a phantom stack entry.
        try {
          modalEl.showPopover();
        } catch {
          console.warn(`[modal-open] failed to open modal "${targetId}"`);
          return;
        }

        // Push to stack with trigger reference (only after a successful show
        // and only if not already tracked).
        if (!alreadyStacked) {
          _modalStack.push({
            id: targetId,
            el: modalEl,
            triggerEl: el,
          });
        }

        // Update ARIA on trigger
        el.setAttribute("aria-expanded", "true");
      };

      // Listen for toggle close to reset aria-expanded
      const _resetExpanded = () => {
        el.setAttribute("aria-expanded", "false");
      };

      // Track toggle handler for cleanup
      let _toggleHandler = null;
      let _observedModal = null;

      // Observe modal close to reset aria-expanded
      const _observeClose = () => {
        const modalEl = _modalRegistry.get(targetId);
        if (!modalEl) return;

        _observedModal = modalEl;
        _toggleHandler = (e) => {
          if (e.newState === "closed") {
            el.setAttribute("aria-expanded", "false");
          }
        };
        modalEl.addEventListener("toggle", _toggleHandler);
      };

      // Defer observation to allow modal to register first
      requestAnimationFrame(_observeClose);

      el.addEventListener("click", clickHandler);

      // ── Cleanup ─────────────────────────────────────────────────
      addDisposer(el, () => {
        el.removeEventListener("click", clickHandler);
        if (_observedModal && _toggleHandler) {
          _observedModal.removeEventListener("toggle", _toggleHandler);
        }
      });
    },
  });
}
