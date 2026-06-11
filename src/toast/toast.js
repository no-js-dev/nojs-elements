import {
  _toastContainers,
  _toastTimers,
  nextToastId,
} from "./state.js";
import { _injectToastStyles } from "./styles.js";

function addDisposer(el, fn) {
  el.__disposers = el.__disposers || [];
  el.__disposers.push(fn);
}

// ─── Helpers ─────────────────────────────────────────────────────────

const VALID_POSITIONS = new Set([
  "top-right",
  "top-left",
  "bottom-right",
  "bottom-left",
  "top-center",
  "bottom-center",
]);

/**
 * Resolve the container element to insert toasts into.
 * Falls back to a default "top-right" container created on <body>.
 */
function _resolveContainer() {
  // Prefer the first registered container
  if (_toastContainers.size > 0) {
    return _toastContainers.values().next().value;
  }
  // Auto-create a default container if none declared
  return _getOrCreateContainer("top-right");
}

function _getOrCreateContainer(position) {
  if (_toastContainers.has(position)) {
    return _toastContainers.get(position);
  }

  const container = document.createElement("div");
  container.classList.add("nojs-toast-container");
  container.setAttribute("data-position", position);
  container.setAttribute("role", "log");
  container.setAttribute("aria-live", "polite");
  container.setAttribute("aria-relevant", "additions");
  document.body.appendChild(container);

  _toastContainers.set(position, container);
  return container;
}

/**
 * Returns true when new toasts should be prepended (top positions).
 */
function _isTopPosition(position) {
  return position.startsWith("top");
}

/**
 * Create and show a single toast element inside the given container.
 */
function _createToast(container, msg, type, duration, dismiss) {
  const id = nextToastId();
  const position = container.getAttribute("data-position") || "top-right";

  const toast = document.createElement("div");
  toast.classList.add("nojs-toast");
  toast.setAttribute("data-toast-id", id);
  toast.setAttribute("data-type", type);

  // ARIA — error toasts are assertive
  if (type === "error") {
    toast.setAttribute("aria-live", "assertive");
  }

  // Build content
  const content = document.createElement("span");
  content.textContent = msg;
  toast.appendChild(content);

  // Dismiss button
  if (dismiss) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.classList.add("nojs-toast-dismiss");
    btn.setAttribute("aria-label", "Dismiss");
    btn.textContent = "\u00d7";
    btn.addEventListener("click", () => _removeToast(toast));
    toast.appendChild(btn);
  }

  // Insert into container (top positions prepend, bottom positions append)
  if (_isTopPosition(position) && container.firstChild) {
    container.insertBefore(toast, container.firstChild);
  } else {
    container.appendChild(toast);
  }

  // Auto-dismiss (duration 0 means permanent)
  if (duration > 0) {
    const timerId = setTimeout(() => {
      _toastTimers.delete(timerId);
      // Guard: skip detached toasts (Safety Rule 4)
      if (!toast.isConnected) return;
      _removeToast(toast);
    }, duration);
    _toastTimers.add(timerId);
    toast._toastTimerId = timerId;
  }

  return toast;
}

/**
 * Remove a toast element from the DOM and clean up its timer.
 */
function _removeToast(toast) {
  if (!toast || !toast.isConnected) return;

  // Cancel any pending timer
  if (toast._toastTimerId != null) {
    clearTimeout(toast._toastTimerId);
    _toastTimers.delete(toast._toastTimerId);
  }

  toast.remove();
}

// ─── Directive Registration ──────────────────────────────────────────

export function registerToastDirectives(NoJS) {
  _injectToastStyles();

  // ── toast-container directive ────────────────────────────────────
  NoJS.directive("toast-container", {
    priority: 10,
    init(el, name, expr) {
      const position =
        expr && VALID_POSITIONS.has(expr) ? expr : "top-right";

      el.classList.add("nojs-toast-container");
      el.setAttribute("data-position", position);
      el.setAttribute("role", "log");
      el.setAttribute("aria-live", "polite");
      el.setAttribute("aria-relevant", "additions");

      _toastContainers.set(position, el);

      addDisposer(el, () => {
        if (_toastContainers.get(position) === el) {
          _toastContainers.delete(position);
        }
      });
    },
  });

  // ── toast (declarative) directive ────────────────────────────────
  NoJS.directive("toast", {
    priority: 10,
    init(el, name, expr) {
      if (!expr) return;

      const type = el.getAttribute("toast-type") || "info";
      // duration=0 means "persistent, no auto-dismiss" (Safety Rule 5: never `|| default` where 0 is valid)
      const parsedDuration = parseInt(el.getAttribute("toast-duration"), 10);
      const duration = Number.isNaN(parsedDuration) ? 3000 : parsedDuration;
      const dismiss = el.getAttribute("toast-dismiss") !== "false";
      const isInteractive = el.tagName === "BUTTON" || el.tagName === "A" || el.hasAttribute("on:click");

      // Interactive elements: show toast on click
      if (isInteractive) {
        const clickHandler = () => {
          const container = _resolveContainer();
          _createToast(container, expr, type, duration, dismiss);
        };
        el.addEventListener("click", clickHandler);
        addDisposer(el, () => el.removeEventListener("click", clickHandler));
        return;
      }

      // Non-interactive elements: watch expression reactively
      const ctx = NoJS.findContext(el);
      if (!ctx || typeof ctx.$watch !== "function") {
        console.warn("[toast] reactive toast requires a parent [state] or [use] context — element will be inert");
        return;
      }
      let prevValue = undefined;

      function check() {
        const value = NoJS.evaluate(expr, ctx);
        if (value && value !== prevValue) {
          const msg = typeof value === "string" ? value : String(value);
          const container = _resolveContainer();
          _createToast(container, msg, type, duration, dismiss);
          prevValue = value;
        } else {
          prevValue = value;
        }
      }

      const unwatch = ctx.$watch(check);
      addDisposer(el, unwatch);
    },
  });

  // ── $toast global function ───────────────────────────────────────
  const toastFn = (msg, type = "info", duration = 3000) => {
    if (typeof document === "undefined") return;
    const dismiss = true;
    const container = _resolveContainer();
    return _createToast(container, String(msg), type, duration, dismiss);
  };

  toastFn.dismiss = (id) => {
    // Escape arbitrary ids so quotes/brackets can't throw a DOMException
    const escaped =
      typeof CSS !== "undefined" && CSS.escape
        ? CSS.escape(String(id))
        : String(id).replace(/["\\\]]/g, "\\$&");
    const toast = document.querySelector(`[data-toast-id="${escaped}"]`);
    if (toast) _removeToast(toast);
  };

  toastFn.dismissAll = () => {
    document.querySelectorAll(".nojs-toast").forEach((t) => _removeToast(t));
  };

  NoJS.toast = toastFn;
  NoJS.global("toast", toastFn);
}
