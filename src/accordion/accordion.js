import { _accordionState } from "./state.js";
import { _injectAccordionStyles } from "./styles.js";

function addDisposer(el, fn) {
  el.__disposers = el.__disposers || [];
  el.__disposers.push(fn);
}

// ─── Feature detection ──────────────────────────────────────────────
let _supportsDetailsContent = null;
function supportsNativeAnimation() {
  if (_supportsDetailsContent !== null) return _supportsDetailsContent;
  _supportsDetailsContent =
    typeof CSS !== "undefined" &&
    typeof CSS.supports === "function" &&
    CSS.supports("interpolate-size", "allow-keywords");
  return _supportsDetailsContent;
}

// ─── Fallback animation helpers ─────────────────────────────────────
// Used when the browser does not support `interpolate-size: allow-keywords`.
// We wrap the content after <summary> in a `.nojs-accordion-content` div,
// measure scrollHeight, and animate height via inline styles + rAF.

function _wrapContent(details) {
  const summary = details.querySelector(":scope > summary");
  if (!summary) return null;

  // Avoid double-wrapping
  let wrapper = details.querySelector(":scope > .nojs-accordion-content");
  if (wrapper) return wrapper;

  wrapper = document.createElement("div");
  wrapper.classList.add("nojs-accordion-content");

  // Move every sibling after <summary> into the wrapper
  const children = Array.from(details.children);
  let afterSummary = false;
  for (const child of children) {
    if (child === summary) {
      afterSummary = true;
      continue;
    }
    if (afterSummary) {
      wrapper.appendChild(child);
    }
  }
  details.appendChild(wrapper);
  return wrapper;
}

function _animateOpen(details, wrapper) {
  if (!wrapper) return;
  const height = wrapper.scrollHeight;
  wrapper.style.height = "0px";
  details.open = true;
  requestAnimationFrame(() => {
    wrapper.style.height = height + "px";
    const onEnd = () => {
      wrapper.style.height = "";
      wrapper.removeEventListener("transitionend", onEnd);
    };
    wrapper.addEventListener("transitionend", onEnd);
  });
}

function _animateClose(details, wrapper) {
  if (!wrapper) {
    details.open = false;
    return;
  }
  const height = wrapper.scrollHeight;
  wrapper.style.height = height + "px";
  requestAnimationFrame(() => {
    wrapper.style.height = "0px";
    const onEnd = () => {
      details.open = false;
      wrapper.style.height = "";
      wrapper.removeEventListener("transitionend", onEnd);
    };
    wrapper.addEventListener("transitionend", onEnd);
  });
}

// ─── Close a <details> with animation ───────────────────────────────
function _closeDetails(details, useFallback) {
  if (!details.open) return;
  if (useFallback) {
    const wrapper = details.querySelector(":scope > .nojs-accordion-content");
    _animateClose(details, wrapper);
  } else {
    // CSS animation handles the transition via ::details-content
    details.open = false;
  }
}

// ─── Dispatch accordion-change event ────────────────────────────────
function _dispatchChange(container, details, open, index) {
  const event = new CustomEvent("accordion-change", {
    bubbles: true,
    detail: { element: details, open, index },
  });
  container.dispatchEvent(event);
}

// ─── Collect direct <details> children ──────────────────────────────
function _getDirectDetails(container) {
  const result = [];
  for (const child of container.children) {
    if (child.tagName === "DETAILS") result.push(child);
  }
  return result;
}

// ─── Register accordion directive ───────────────────────────────────
export function registerAccordionDirective(NoJS) {
  NoJS.directive("accordion", {
    priority: 10,
    init(el, name, expr) {
      _injectAccordionStyles();

      const mode = (expr || "").trim().toLowerCase() === "multi" ? "multi" : "single";
      const useFallback = !supportsNativeAnimation();

      // Set ARIA role on the container
      el.setAttribute("role", "group");

      // Collect direct <details> children
      const detailsList = _getDirectDetails(el);
      if (detailsList.length === 0) return;

      // Setup fallback wrappers if needed
      if (useFallback) {
        for (const details of detailsList) {
          _wrapContent(details);
        }
      }

      // Track per-details listeners for cleanup
      const listeners = [];

      // ─── MutationObserver for dynamically added <details> ─────
      const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          for (const node of mutation.addedNodes) {
            if (node.nodeType !== 1 || node.tagName !== "DETAILS") continue;
            if (node.parentElement !== el) continue;
            _setupDetails(node);
          }
        }
      });
      observer.observe(el, { childList: true });

      // ─── Setup a single <details> element ─────────────────────
      const _setupDetails = (details) => {
        if (useFallback) {
          _wrapContent(details);
        }

        const toggleHandler = (e) => {
          const currentDetails = _getDirectDetails(el);
          const idx = currentDetails.indexOf(details);

          if (details.open) {
            // In single mode, close all siblings
            if (mode === "single") {
              for (const sibling of currentDetails) {
                if (sibling !== details && sibling.open) {
                  _closeDetails(sibling, useFallback);
                }
              }
            }
            _dispatchChange(el, details, true, idx);
          } else {
            _dispatchChange(el, details, false, idx);
          }
        };

        // For fallback mode, intercept click on <summary> to animate
        let clickHandler = null;
        if (useFallback) {
          const summary = details.querySelector(":scope > summary");
          if (summary) {
            clickHandler = (e) => {
              e.preventDefault();
              const wrapper = details.querySelector(":scope > .nojs-accordion-content");
              if (details.open) {
                _animateClose(details, wrapper);
                _dispatchChange(el, details, false, _getDirectDetails(el).indexOf(details));
                // In single mode, nothing extra to do when closing
              } else {
                // In single mode, close siblings first
                if (mode === "single") {
                  const currentDetails = _getDirectDetails(el);
                  for (const sibling of currentDetails) {
                    if (sibling !== details && sibling.open) {
                      _closeDetails(sibling, true);
                    }
                  }
                }
                _animateOpen(details, wrapper);
                _dispatchChange(el, details, true, _getDirectDetails(el).indexOf(details));
              }
            };
            summary.addEventListener("click", clickHandler);
          }
        }

        details.addEventListener("toggle", toggleHandler);
        listeners.push({ details, toggleHandler, clickHandler });
      };

      // Setup each existing <details>
      for (const details of detailsList) {
        _setupDetails(details);
      }

      // ─── Keyboard navigation between summaries ────────────────
      const keydownHandler = (e) => {
        const target = e.target;
        if (target.tagName !== "SUMMARY") return;
        // Only handle summaries that are direct children of direct <details>
        const parentDetails = target.parentElement;
        if (!parentDetails || parentDetails.parentElement !== el) return;

        const currentDetails = _getDirectDetails(el);
        const summaries = currentDetails.map((d) => d.querySelector(":scope > summary")).filter(Boolean);
        const currentIdx = summaries.indexOf(target);
        if (currentIdx === -1) return;

        let nextIdx = -1;

        switch (e.key) {
          case "ArrowDown":
          case "ArrowRight":
            nextIdx = (currentIdx + 1) % summaries.length;
            break;
          case "ArrowUp":
          case "ArrowLeft":
            nextIdx = (currentIdx - 1 + summaries.length) % summaries.length;
            break;
          case "Home":
            nextIdx = 0;
            break;
          case "End":
            nextIdx = summaries.length - 1;
            break;
          default:
            return;
        }

        if (nextIdx !== -1 && nextIdx !== currentIdx) {
          e.preventDefault();
          summaries[nextIdx].focus();
        }
      };

      el.addEventListener("keydown", keydownHandler);

      // ─── Store state ──────────────────────────────────────────
      _accordionState.containers.set(el, {
        mode,
        listeners,
        observer,
      });

      // ─── Cleanup ──────────────────────────────────────────────
      addDisposer(el, () => {
        el.removeEventListener("keydown", keydownHandler);
        observer.disconnect();
        for (const entry of listeners) {
          entry.details.removeEventListener("toggle", entry.toggleHandler);
          if (entry.clickHandler) {
            const summary = entry.details.querySelector(":scope > summary");
            if (summary) summary.removeEventListener("click", entry.clickHandler);
          }
        }
        listeners.length = 0;
        _accordionState.containers.delete(el);
      });
    },
  });
}
