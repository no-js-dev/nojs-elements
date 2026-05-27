import { _stepperRegistry } from "./state.js";
import { _injectStepperStyles } from "./styles.js";

function addDisposer(el, fn) {
  el.__disposers = el.__disposers || [];
  el.__disposers.push(fn);
}

// ─── Stepper container directive ────────────────────────────────────
export function registerStepper(NoJS) {
  NoJS.directive("stepper", {
    priority: 14,
    init(el, name, expr) {
      _injectStepperStyles();
      const ctx = NoJS.findContext(el);

      // ── Collect [step] children ──
      const steps = Array.from(el.querySelectorAll("[step]"));
      if (!steps.length) {
        console.warn("[stepper] No [step] children found.");
        return;
      }

      // ── Read attributes ──
      const initialStep = expr ? parseInt(expr, 10) || 0 : 0;
      const mode = el.getAttribute("stepper-mode") || "linear";
      const showIndicator = el.getAttribute("stepper-indicator") !== "false";
      const showNav = el.getAttribute("stepper-nav") !== "false";
      const ariaLabel = el.getAttribute("aria-label") || "Stepper";

      let current = Math.max(0, Math.min(initialStep, steps.length - 1));

      // ── ARIA on container ──
      el.setAttribute("role", "group");
      el.setAttribute("aria-label", ariaLabel);
      el.classList.add("nojs-stepper");

      // ── Build indicator ──
      let indicatorEl = null;
      let indicatorItems = [];
      if (showIndicator) {
        indicatorEl = document.createElement("div");
        indicatorEl.className = "nojs-stepper-indicator";
        indicatorEl.setAttribute("role", "tablist");
        indicatorEl.setAttribute("aria-label", "Progress");

        steps.forEach((stepEl, i) => {
          if (i > 0) {
            const sep = document.createElement("div");
            sep.className = "nojs-stepper-separator";
            sep.setAttribute("aria-hidden", "true");
            indicatorEl.appendChild(sep);
          }

          const item = document.createElement("button");
          item.type = "button";
          item.className = "nojs-stepper-indicator-item";
          item.setAttribute("role", "tab");
          item.setAttribute("aria-selected", i === current ? "true" : "false");

          const label = stepEl.getAttribute("step-label") || `Step ${i + 1}`;
          const labelSpan = document.createElement("span");
          labelSpan.textContent = label;
          item.appendChild(labelSpan);
          item.setAttribute("aria-label", label);

          // Tab id for tabpanel association
          const tabId = `nojs-stepper-tab-${_tabIdCounter++}`;
          item.id = tabId;

          if (mode === "free") {
            item.setAttribute("data-clickable", "");
            item.addEventListener("click", () => goTo(i));
          } else {
            item.setAttribute("tabindex", "-1");
          }

          indicatorEl.appendChild(item);
          indicatorItems.push(item);
        });

        // Keyboard navigation on indicator
        indicatorEl.addEventListener("keydown", (e) => {
          if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) return;
          e.preventDefault();

          let target = current;
          if (e.key === "ArrowRight") target = Math.min(current + 1, steps.length - 1);
          else if (e.key === "ArrowLeft") target = Math.max(current - 1, 0);
          else if (e.key === "Home") target = 0;
          else if (e.key === "End") target = steps.length - 1;

          if (mode === "free") {
            goTo(target);
          }
          indicatorItems[target]?.focus();
        });

        el.insertBefore(indicatorEl, el.firstChild);
      }

      // ── Build navigation buttons ──
      let navEl = null;
      let prevBtn = null;
      let nextBtn = null;
      if (showNav) {
        navEl = document.createElement("div");
        navEl.className = "nojs-stepper-nav";
        navEl.setAttribute("aria-hidden", "true");

        prevBtn = document.createElement("button");
        prevBtn.type = "button";
        prevBtn.className = "nojs-stepper-prev";
        prevBtn.textContent = "Previous";
        prevBtn.addEventListener("click", () => prev());

        nextBtn = document.createElement("button");
        nextBtn.type = "button";
        nextBtn.className = "nojs-stepper-next";
        nextBtn.textContent = "Next";
        nextBtn.addEventListener("click", () => next());

        navEl.appendChild(prevBtn);
        navEl.appendChild(nextBtn);
        el.appendChild(navEl);
      }

      // ── Validation ──
      function _validateStep(index) {
        const stepEl = steps[index];
        if (!stepEl) return true;

        // Check required inputs within the step
        const inputs = stepEl.querySelectorAll("[required]");
        for (const input of inputs) {
          if (typeof input.checkValidity === "function" && !input.checkValidity()) {
            input.reportValidity();
            return false;
          }
        }

        // Check step-validate expression
        const validateExpr = stepEl.getAttribute("step-validate");
        if (validateExpr) {
          try {
            const result = NoJS.evaluate(validateExpr, ctx);
            if (!result) return false;
          } catch (err) {
            console.warn(`[stepper] step-validate error: ${err.message}`);
            return false;
          }
        }

        return true;
      }

      // ── Step visibility ──
      function _updateView() {
        steps.forEach((stepEl, i) => {
          const isActive = i === current;
          stepEl.setAttribute("aria-hidden", isActive ? "false" : "true");
          if (isActive) {
            stepEl.removeAttribute("inert");
            stepEl.setAttribute("aria-current", "step");
          } else {
            stepEl.setAttribute("inert", "");
            stepEl.removeAttribute("aria-current");
          }
        });

        // Update indicator
        if (indicatorItems.length) {
          indicatorItems.forEach((item, i) => {
            item.setAttribute("aria-selected", i === current ? "true" : "false");
            // Mark completed steps
            if (i < current) item.setAttribute("data-completed", "");
            else item.removeAttribute("data-completed");
            // Roving tabindex
            item.setAttribute("tabindex", i === current ? "0" : "-1");
            // Associate tab ↔ panel
            const stepEl = steps[i];
            if (stepEl.id) {
              item.setAttribute("aria-controls", stepEl.id);
              stepEl.setAttribute("aria-labelledby", item.id);
            }
          });
        }

        // Update nav buttons
        if (prevBtn) prevBtn.disabled = current === 0;
        if (nextBtn) {
          nextBtn.textContent = current === steps.length - 1 ? "Finish" : "Next";
        }

        // Dispatch step-change event
        el.dispatchEvent(
          new CustomEvent("step-change", {
            bubbles: true,
            detail: { current, total: steps.length },
          })
        );
      }

      // ── Navigation API ──
      function next() {
        if (current >= steps.length - 1) return false;
        if (mode === "linear" && !_validateStep(current)) return false;
        current++;
        _updateView();
        _syncContext();
        return true;
      }

      function prev() {
        if (current <= 0) return false;
        current--;
        _updateView();
        _syncContext();
        return true;
      }

      function goTo(index) {
        if (index < 0 || index >= steps.length) return false;
        if (index === current) return false;

        // In linear mode, can only go back or validate forward
        if (mode === "linear" && index > current) {
          // Must validate all steps between current and target
          for (let i = current; i < index; i++) {
            if (!_validateStep(i)) return false;
          }
        }

        current = index;
        _updateView();
        _syncContext();
        return true;
      }

      // ── $stepper context API ──
      const stepperAPI = {
        get current() { return current; },
        get total() { return steps.length; },
        next,
        prev,
        goTo,
        get isFirst() { return current === 0; },
        get isLast() { return current === steps.length - 1; },
      };

      function _syncContext() {
        ctx.$stepper = stepperAPI;
      }
      _syncContext();

      // ── Register in state ──
      _stepperRegistry.set(el, {
        current,
        steps,
        mode,
        indicatorEl,
        navEl,
      });

      // ── Initial render ──
      _updateView();

      // ── Cleanup ──
      addDisposer(el, () => {
        _stepperRegistry.delete(el);
        if (indicatorEl && indicatorEl.parentNode) indicatorEl.remove();
        if (navEl && navEl.parentNode) navEl.remove();
        delete ctx.$stepper;
      });
    },
  });
}

// ── Unique ID counter ──
let _tabIdCounter = 0;
