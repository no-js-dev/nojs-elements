import { _injectSkeletonStyles } from "./styles.js";

function addDisposer(el, fn) {
  el.__disposers = el.__disposers || [];
  el.__disposers.push(fn);
}

// ─── Skeleton directive ─────────────────────────────────────────────
export function registerSkeletonDirective(NoJS) {
  NoJS.directive("skeleton", {
    priority: 10,
    init(el, name, expr) {
      _injectSkeletonStyles();
      const ctx = NoJS.findContext(el);

      // Read companion attributes
      const type = el.getAttribute("skeleton-type") || "text";
      const linesAttr = el.getAttribute("skeleton-lines");
      const sizeAttr = el.getAttribute("skeleton-size");

      // Generated placeholder lines (kept for cleanup)
      let _lineDivs = [];

      function _applyLines(count) {
        _removeLines();
        for (let i = 0; i < count; i++) {
          const div = document.createElement("div");
          div.className = "nojs-skeleton-line";
          el.appendChild(div);
          _lineDivs.push(div);
        }
      }

      function _removeLines() {
        for (const div of _lineDivs) {
          if (div.parentNode === el) el.removeChild(div);
        }
        _lineDivs = [];
      }

      function activate() {
        el.classList.add("nojs-skeleton");

        // Type-specific class
        if (type === "circle") {
          el.classList.add("nojs-skeleton-circle");
        }

        // Apply size for circle/rect
        if (sizeAttr && (type === "circle" || type === "rect")) {
          const px = sizeAttr + (String(sizeAttr).match(/\d$/) ? "px" : "");
          el.style.width = px;
          el.style.height = px;
        }

        // Generate text line placeholders
        if (linesAttr) {
          const count = parseInt(linesAttr, 10);
          if (count > 0) _applyLines(count);
        }

        // ARIA
        el.setAttribute("aria-busy", "true");
      }

      function deactivate() {
        // Fade out transition
        el.classList.add("nojs-skeleton-fade");
        el.classList.remove("nojs-skeleton");
        el.classList.remove("nojs-skeleton-circle");

        // Clean up generated lines
        _removeLines();

        // Remove inline size if we set it
        if (sizeAttr && (type === "circle" || type === "rect")) {
          el.style.width = "";
          el.style.height = "";
        }

        // ARIA
        el.removeAttribute("aria-busy");

        // Remove fade class after transition completes (with fallback timer)
        let _fadeDone = false;
        const onEnd = () => {
          if (_fadeDone) return;
          _fadeDone = true;
          el.classList.remove("nojs-skeleton-fade");
          el.removeEventListener("transitionend", onEnd);
        };
        el.addEventListener("transitionend", onEnd);
        // Fallback: if transitionend never fires (no transitions, headless), clean up
        setTimeout(onEnd, 500);
      }

      // Initial evaluation
      let _active = false;

      function update() {
        const loading = !!NoJS.evaluate(expr, ctx);

        if (loading && !_active) {
          _active = true;
          activate();
        } else if (!loading && _active) {
          _active = false;
          deactivate();
        }
      }

      // Reactive watch
      update();
      const unwatch = ctx.$watch(update);
      addDisposer(el, unwatch);

      // Cleanup on dispose
      addDisposer(el, () => {
        if (_active) {
          el.classList.remove("nojs-skeleton", "nojs-skeleton-circle", "nojs-skeleton-fade");
          el.removeAttribute("aria-busy");
          _removeLines();
          if (sizeAttr && (type === "circle" || type === "rect")) {
            el.style.width = "";
            el.style.height = "";
          }
        }
      });
    },
  });
}
