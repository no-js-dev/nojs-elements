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

// Debug-gated warning: prefer the framework's _warn convention when the
// plugin host exposes it, otherwise fall back to console.warn.
function _tooltipWarn(NoJS, message) {
  if (NoJS && typeof NoJS._warn === "function") NoJS._warn(message);
  else console.warn(message);
}

// ─── Directive ──────────────────────────────────────────────────────

export function registerTooltip(NoJS) {
  NoJS.directive("tooltip", {
    priority: 20,
    init(el, name, expr) {
      _injectTooltipStyles();

      const text = expr;
      if (!text) {
        _tooltipWarn(NoJS, "[tooltip] attribute value (tooltip text) is required.");
        return;
      }

      const position = el.getAttribute("tooltip-position") || "top";
      // Respect an explicit tooltip-delay="0" — only fall back to the default
      // when the attribute is absent or not a number (falsy-zero bug).
      const parsedDelay = parseInt(el.getAttribute("tooltip-delay"), 10);
      const delay = Number.isNaN(parsedDelay) ? 300 : parsedDelay;
      const disabledExpr = el.getAttribute("tooltip-disabled");
      const ctx = disabledExpr ? NoJS.findContext(el) : null;

      const _isDisabled = () => {
        if (!disabledExpr || !ctx) return false;
        try {
          return !!NoJS.evaluate(disabledExpr, ctx);
        } catch (_err) {
          return false;
        }
      };

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

      // Track whether the tooltip is currently visible so reactive state
      // changes and scroll/resize events only act while it is shown.
      let visible = false;
      let rafId = 0;

      // Reposition on scroll/resize while visible. position:fixed tooltips are
      // otherwise positioned once and drift out of sync with the trigger.
      const reposition = () => {
        if (!visible || !el.isConnected) return;
        // Coalesce bursts of scroll/resize events into a single rAF tick.
        if (rafId) return;
        rafId = requestAnimationFrame(() => {
          rafId = 0;
          if (!visible || !el.isConnected) return;
          _positionTooltip(tooltipEl, el, position);
        });
      };

      const startTracking = () => {
        window.addEventListener("scroll", reposition, true);
        window.addEventListener("resize", reposition);
      };

      const stopTracking = () => {
        window.removeEventListener("scroll", reposition, true);
        window.removeEventListener("resize", reposition);
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = 0;
        }
      };

      const show = () => {
        if (visible) return;
        _showTooltip(el, tooltipEl, position);
        visible = true;
        startTracking();
      };

      const hide = () => {
        if (!visible) {
          // Ensure detached even if scheduled show never completed.
          _hideTooltip(el, tooltipEl);
          return;
        }
        stopTracking();
        _hideTooltip(el, tooltipEl);
        visible = false;
      };

      // ── Show on mouseenter / focusin ──

      const scheduleShow = () => {
        // Skip if disabled
        if (_isDisabled()) return;

        // Clear any pending hide/show
        if (_tooltipTimeouts.has(el)) {
          clearTimeout(_tooltipTimeouts.get(el));
        }
        const tid = setTimeout(() => {
          _tooltipTimeouts.delete(el);
          // Re-check disabled at show time (reactive)
          if (_isDisabled()) return;
          if (!el.isConnected) return;
          show();
        }, delay);
        _tooltipTimeouts.set(el, tid);
      };

      const scheduleHide = () => {
        if (_tooltipTimeouts.has(el)) {
          clearTimeout(_tooltipTimeouts.get(el));
          _tooltipTimeouts.delete(el);
        }
        hide();
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

      // Reactive tooltip-disabled: if the bound state flips to disabled while
      // the tooltip is visible, hide it immediately (tooltip-disabled is
      // documented as reactive, not just evaluated at show time).
      let unwatch = null;
      if (disabledExpr && ctx && typeof ctx.$watch === "function") {
        const watcher = () => {
          if (visible && _isDisabled()) hide();
        };
        unwatch = ctx.$watch(watcher);
      }

      addDisposer(el, () => {
        el.removeEventListener("mouseenter", mouseenterHandler);
        el.removeEventListener("mouseleave", mouseleaveHandler);
        el.removeEventListener("focusin", focusinHandler);
        el.removeEventListener("focusout", focusoutHandler);
        el.removeEventListener("keydown", keydownHandler);

        // Cleanup reactive watcher
        if (unwatch) {
          unwatch();
          unwatch = null;
        }

        // Cleanup scroll/resize tracking and any pending rAF
        stopTracking();

        // Cleanup timeout
        if (_tooltipTimeouts.has(el)) {
          clearTimeout(_tooltipTimeouts.get(el));
          _tooltipTimeouts.delete(el);
        }

        // Remove tooltip from DOM
        visible = false;
        tooltipEl.remove();
        _tooltipRegistry.delete(el);
      });
    },
  });
}
