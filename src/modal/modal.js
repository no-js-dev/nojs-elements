import { _modalStack, _modalRegistry, currentZIndex } from "./state.js";
import { _injectModalStyles } from "./styles.js";

function addDisposer(el, fn) {
  el.__disposers = el.__disposers || [];
  el.__disposers.push(fn);
}

// ─── Focusable selector ─────────────────────────────────────────────
const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

// ─── Focus-trap keydown handler (stored per modal for cleanup) ──────
const _trapHandlers = new WeakMap();

function _createFocusTrap(modalEl) {
  const handler = (e) => {
    if (e.key !== "Tab") return;

    const focusable = [...modalEl.querySelectorAll(FOCUSABLE)].filter(
      (el) => el.offsetParent !== null
    );
    if (focusable.length === 0) {
      e.preventDefault();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  modalEl.addEventListener("keydown", handler);
  _trapHandlers.set(modalEl, handler);
}

function _removeFocusTrap(modalEl) {
  const handler = _trapHandlers.get(modalEl);
  if (handler) {
    modalEl.removeEventListener("keydown", handler);
    _trapHandlers.delete(modalEl);
  }
}

// ─── Esc key handler (stored per modal for cleanup) ─────────────────
const _escHandlers = new WeakMap();

// ─── Register the `modal` directive ─────────────────────────────────
export function registerModalDirective(NoJS) {
  NoJS.directive("modal", {
    priority: 10,
    init(el, name, expr) {
      _injectModalStyles();

      const id = expr || `nojs-modal-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

      // ── Configure the element as a popover ──────────────────────
      el.setAttribute("popover", "manual");
      el.classList.add("nojs-modal");
      el.id = el.id || `nojs-modal-${id}`;
      el.setAttribute("data-modal-id", id);

      // ── ARIA ────────────────────────────────────────────────────
      el.setAttribute("role", "dialog");
      el.setAttribute("aria-modal", "true");

      // Point aria-labelledby to first heading inside the modal
      const heading = el.querySelector("h1, h2, h3, h4, h5, h6");
      if (heading) {
        if (!heading.id) heading.id = `nojs-modal-heading-${id}`;
        el.setAttribute("aria-labelledby", heading.id);
      }

      // ── Backdrop attribute ──────────────────────────────────────
      const backdropAttr = el.getAttribute("modal-backdrop");
      if (backdropAttr === "false") {
        el.setAttribute("data-nojs-no-backdrop", "");
      }

      // ── Extra class ─────────────────────────────────────────────
      const extraClass = el.getAttribute("modal-class");

      // ── Backdrop click handler (close when clicking overlay area) ──
      const escapeAttr = el.getAttribute("modal-escape");
      const backdropClickHandler = (e) => {
        // Only close if clicking directly on the modal overlay, not its children
        // Skip closing if backdrop is disabled or modal is no-escape
        if (e.target === el && backdropAttr !== "false" && escapeAttr !== "false") {
          _closeModal(el, id);
        }
      };
      el.addEventListener("click", backdropClickHandler);

      // ── Register in state ───────────────────────────────────────
      _modalRegistry.set(id, el);

      // ── Toggle event: sync z-index and focus on show/hide ───────
      const toggleHandler = (e) => {
        if (e.newState === "open") {
          // Apply stacking z-index
          el.style.zIndex = String(currentZIndex());

          // Apply extra class
          if (extraClass) {
            extraClass.split(/\s+/).filter(Boolean).forEach((c) => el.classList.add(c));
          }

          // Focus first focusable element. Guard against the modal having
          // been closed/disposed before the rAF fires, which would otherwise
          // steal focus into a hidden/detached modal.
          requestAnimationFrame(() => {
            if (!el.isConnected || !_modalStack.some((m) => m.el === el)) return;
            const first = el.querySelector(FOCUSABLE);
            if (first) first.focus();
            else el.focus();
          });

          // Install focus trap
          _createFocusTrap(el);

          // Install Esc handler (if allowed)
          if (escapeAttr !== "false") {
            const escHandler = (ke) => {
              if (ke.key === "Escape") {
                ke.stopPropagation();
                _closeModal(el, id);
              }
            };
            el.addEventListener("keydown", escHandler);
            _escHandlers.set(el, escHandler);
          }
        } else if (e.newState === "closed") {
          // Remove extra class
          if (extraClass) {
            extraClass.split(/\s+/).filter(Boolean).forEach((c) => el.classList.remove(c));
          }

          // Remove focus trap and esc handler
          _removeFocusTrap(el);
          const escH = _escHandlers.get(el);
          if (escH) {
            el.removeEventListener("keydown", escH);
            _escHandlers.delete(el);
          }

          // Pop from stack and restore focus to trigger. Match by element
          // identity so duplicate/shared ids restore focus to the correct
          // trigger; fall back to id for entries pushed without an element.
          let idx = _modalStack.findIndex((m) => m.el === el);
          if (idx === -1) idx = _modalStack.findIndex((m) => m.id === id);
          if (idx !== -1) {
            const entry = _modalStack[idx];
            _modalStack.splice(idx, 1);

            // Return focus to trigger element
            if (entry.triggerEl) {
              requestAnimationFrame(() => {
                entry.triggerEl.focus();
              });
            }
          }
        }
      };

      el.addEventListener("toggle", toggleHandler);

      // ── Cleanup ─────────────────────────────────────────────────
      addDisposer(el, () => {
        el.removeEventListener("click", backdropClickHandler);
        el.removeEventListener("toggle", toggleHandler);
        _removeFocusTrap(el);
        const escH = _escHandlers.get(el);
        if (escH) {
          el.removeEventListener("keydown", escH);
          _escHandlers.delete(el);
        }
        _modalRegistry.delete(id);
        let idx = _modalStack.findIndex((m) => m.el === el);
        if (idx === -1) idx = _modalStack.findIndex((m) => m.id === id);
        if (idx !== -1) _modalStack.splice(idx, 1);
      });
    },
  });

  // ─── Programmatic API: $modal ──────────────────────────────────────
  const modalApi = (id) => modalApi.open(id);

  modalApi.open = (id) => {
    const modalEl = _modalRegistry.get(id);
    if (!modalEl) return false;
    // Show first; only record the stack entry on success so a throwing
    // showPopover() never leaves a phantom entry. Also guard against pushing
    // a duplicate when the modal is already open/stacked.
    try { modalEl.showPopover(); } catch { return false; }
    if (!_modalStack.some((m) => m.id === id)) {
      _modalStack.push({ id, el: modalEl, triggerEl: null });
    }
    return true;
  };

  modalApi.close = (id) => {
    const modalEl = _modalRegistry.get(id);
    if (!modalEl) return false;
    _closeModal(modalEl, id);
    return true;
  };

  modalApi.closeAll = () => {
    for (let i = _modalStack.length - 1; i >= 0; i--) {
      _closeModal(_modalStack[i].el, _modalStack[i].id);
    }
  };

  NoJS.modal = modalApi;
}

// ─── Shared close helper (used by modal-close and Esc) ──────────────
export function _closeModal(modalEl, id) {
  try {
    modalEl.hidePopover();
  } catch { /* already hidden */ }
}
