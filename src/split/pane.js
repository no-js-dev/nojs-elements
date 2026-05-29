import { _paneRegistry } from "./state.js";
import { _injectSplitStyles } from "./styles.js";

function addDisposer(el, fn) {
  el.__disposers = el.__disposers || [];
  el.__disposers.push(fn);
}

// ─── Pane directive ─────────────────────────────────────────────────

export function registerPane(NoJS) {
  NoJS.directive("pane", {
    priority: 15,
    init(el, name, expr) {
      _injectSplitStyles();

      el.classList.add("nojs-pane");

      // Register pane metadata (may already exist if split processed first)
      if (!_paneRegistry.has(el)) {
        _paneRegistry.set(el, {
          size: expr || null,
          min: parseInt(el.getAttribute("pane-min"), 10) || 0,
          max: parseInt(el.getAttribute("pane-max"), 10) || Infinity,
          collapsible: el.getAttribute("pane-collapsible") === "true",
          collapsed: false,
          preCollapseSize: null,
        });
      }

      // Apply min/max constraints as CSS
      const info = _paneRegistry.get(el);
      const sizeProp = el.closest("[data-direction='vertical']")
        ? "height"
        : "width";

      if (info.min) {
        el.style[`min${sizeProp === "width" ? "Width" : "Height"}`] = `${info.min}px`;
      }
      if (info.max && info.max !== Infinity) {
        el.style[`max${sizeProp === "width" ? "Width" : "Height"}`] = `${info.max}px`;
      }

      // Cleanup
      addDisposer(el, () => {
        el.classList.remove("nojs-pane");
        _paneRegistry.delete(el);
        // removeProperty requires kebab-case names; camelCase is silently ignored
        el.style.removeProperty("min-width");
        el.style.removeProperty("min-height");
        el.style.removeProperty("max-width");
        el.style.removeProperty("max-height");
        el.style.removeProperty("flex-basis");
        el.style.removeProperty("flex-grow");
      });
    },
  });
}
