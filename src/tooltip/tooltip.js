import { _tooltipRegistry, _tooltipTimeouts } from "./state.js";
import { _injectTooltipStyles } from "./styles.js";

function addDisposer(el, fn) {
  el.__disposers = el.__disposers || [];
  el.__disposers.push(fn);
}

// ─── Positioning helpers ────────────────────────────────────────────

const GAP = 8; // px between trigger and tooltip

function _positionTooltip(tooltipEl, triggerEl, position) {
  const triggerRect = triggerEl.getBoundingClientRect();
  const tooltipRect = tooltipEl.getBoundingClientRect();
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  let top, left;

  switch (position) {
    case "bottom":
      top = triggerRect.bottom + GAP;
      left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
      break;
    case "left":
      top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
      left = triggerRect.left - tooltipRect.width - GAP;
      break;
    case "right":
      top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
      left = triggerRect.right + GAP;
      break;
    case "top":
    default:
      top = triggerRect.top - tooltipRect.height - GAP;
      left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
      break;
  }

  // Clamp to viewport
  if (left < 4) left = 4;
  if (left + tooltipRect.width > vw - 4) left = vw - tooltipRect.width - 4;
  if (top < 4) top = 4;
  if (top + tooltipRect.height > vh - 4) top = vh - tooltipRect.height - 4;

  tooltipEl.style.top = `${top}px`;
  tooltipEl.style.left = `${left}px`;
}

// ─── Unique ID counter ──────────────────────────────────────────────

let _tooltipIdCounter = 0;

// ─── Show / Hide helpers ────────────────────────────────────────────

function _showTooltip(el, tooltipEl, position) {
  document.body.appendChild(tooltipEl);
  // Position once visible so we can measure
  _positionTooltip(tooltipEl, el, position);
  tooltipEl.setAttribute("aria-hidden", "false");
}

function _hideTooltip(el, tooltipEl) {
  tooltipEl.setAttribute("aria-hidden", "true");
  tooltipEl.remove();
}

// ─── Directive ──────────────────────────────────────────────────────

export function registerTooltip(NoJS) {
  NoJS.directive("tooltip", {
    priority: 20,
    init(el, name, expr) {
      _injectTooltipStyles();

      const text = expr;
      if (!text) {
        NoJS._warn("[tooltip] attribute value (tooltip text) is required.");
        return;
      }

      const position = el.getAttribute("tooltip-position") || "top";
      const delay = parseInt(el.getAttribute("tooltip-delay"), 10) || 300;
      const disabledExpr = el.getAttribute("tooltip-disabled");
      const ctx = disabledExpr ? NoJS.findContext(el) : null;

      // Create tooltip element
      const tooltipId = `nojs-tooltip-${++_tooltipIdCounter}`;
      const tooltipEl = document.createElement("div");
      tooltipEl.className = "nojs-tooltip";
      tooltipEl.setAttribute("role", "tooltip");
      tooltipEl.setAttribute("id", tooltipId);
      tooltipEl.setAttribute("aria-hidden", "true");
      tooltipEl.textContent = text;

      // ARIA on trigger
      el.setAttribute("aria-describedby", tooltipId);

      // Store in registry
      _tooltipRegistry.set(el, tooltipEl);

      // ── Show on mouseenter / focusin ──

      const scheduleShow = () => {
        // Skip if disabled
        if (disabledExpr && ctx && NoJS.evaluate(disabledExpr, ctx)) return;

        // Clear any pending hide/show
        if (_tooltipTimeouts.has(el)) {
          clearTimeout(_tooltipTimeouts.get(el));
        }
        const tid = setTimeout(() => {
          _tooltipTimeouts.delete(el);
          // Re-check disabled at show time (reactive)
          if (disabledExpr && ctx && NoJS.evaluate(disabledExpr, ctx)) return;
          _showTooltip(el, tooltipEl, position);
        }, delay);
        _tooltipTimeouts.set(el, tid);
      };

      const scheduleHide = () => {
        if (_tooltipTimeouts.has(el)) {
          clearTimeout(_tooltipTimeouts.get(el));
          _tooltipTimeouts.delete(el);
        }
        _hideTooltip(el, tooltipEl);
      };

      const mouseenterHandler = () => scheduleShow();
      const mouseleaveHandler = () => scheduleHide();
      const focusinHandler = () => scheduleShow();
      const focusoutHandler = () => scheduleHide();

      // Dismiss on Escape
      const keydownHandler = (e) => {
        if (e.key === "Escape" && tooltipEl.getAttribute("aria-hidden") === "false") {
          scheduleHide();
        }
      };

      el.addEventListener("mouseenter", mouseenterHandler);
      el.addEventListener("mouseleave", mouseleaveHandler);
      el.addEventListener("focusin", focusinHandler);
      el.addEventListener("focusout", focusoutHandler);
      el.addEventListener("keydown", keydownHandler);

      addDisposer(el, () => {
        el.removeEventListener("mouseenter", mouseenterHandler);
        el.removeEventListener("mouseleave", mouseleaveHandler);
        el.removeEventListener("focusin", focusinHandler);
        el.removeEventListener("focusout", focusoutHandler);
        el.removeEventListener("keydown", keydownHandler);

        // Cleanup timeout
        if (_tooltipTimeouts.has(el)) {
          clearTimeout(_tooltipTimeouts.get(el));
          _tooltipTimeouts.delete(el);
        }

        // Remove tooltip from DOM
        tooltipEl.remove();
        _tooltipRegistry.delete(el);
      });
    },
  });
}
