import { _stepperRegistry } from "./state.js";
import { _injectStepperStyles } from "./styles.js";
import {
  checkStepValidationGate,
  touchAllFields,
  dispatchValidationBlocked,
} from "./validation.js";

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
            const onItemClick = () => goTo(i);
            item.addEventListener("click", onItemClick);
            addDisposer(el, () =>
              item.removeEventListener("click", onItemClick)
            );
          } else {
            item.setAttribute("tabindex", "-1");
          }

          indicatorEl.appendChild(item);
          indicatorItems.push(item);
        });

        // Keyboard navigation on indicator
        const onIndicatorKeydown = (e) => {
          if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) return;
          e.preventDefault();

          let target = current;
          if (e.key === "ArrowRight") target = Math.min(current + 1, steps.length - 1);
          else if (e.key === "ArrowLeft") target = Math.max(current - 1, 0);
          else if (e.key === "Home") target = 0;
          else if (e.key === "End") target = steps.length - 1;

          if (mode === "free") {
            // In free mode, navigate to the target and follow focus to it.
            goTo(target);
            indicatorItems[target]?.focus();
          } else {
            // In linear mode the indicator is not directly navigable, so keep
            // focus on the current item (which holds roving tabindex 0)
            // instead of moving it to an item with tabindex -1.
            indicatorItems[current]?.focus();
          }
        };
        indicatorEl.addEventListener("keydown", onIndicatorKeydown);
        addDisposer(el, () =>
          indicatorEl.removeEventListener("keydown", onIndicatorKeydown)
        );

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
        const onPrevClick = () => prev();
        prevBtn.addEventListener("click", onPrevClick);
        addDisposer(el, () =>
          prevBtn.removeEventListener("click", onPrevClick)
        );

        nextBtn = document.createElement("button");
        nextBtn.type = "button";
        nextBtn.className = "nojs-stepper-next";
        nextBtn.textContent = "Next";
        const onNextClick = () => next();
        nextBtn.addEventListener("click", onNextClick);
        addDisposer(el, () =>
          nextBtn.removeEventListener("click", onNextClick)
        );

        navEl.appendChild(prevBtn);
        navEl.appendChild(nextBtn);
        el.appendChild(navEl);
      }

      // ── Validation ──
      function _validateStep(index) {
        const stepEl = steps[index];
        if (!stepEl) return true;

        // 1. Check stepper-validate gate (NoJS Validation module integration)
        if (!checkStepValidationGate(stepEl, NoJS.findContext)) {
          const form = stepEl.querySelector("form[validate]");
          if (form) {
            // Touch all fields so error messages become visible
            touchAllFields(form);
            // Mark the indicator as invalid
            if (indicatorItems[index]) {
              indicatorItems[index].classList.add("nojs-step-invalid");
            }
            // Dispatch blocked event on the stepper container
            dispatchValidationBlocked(el, stepEl, form);
          }
          return false;
        }

        // Clear invalid indicator when gate passes
        if (indicatorItems[index]) {
          indicatorItems[index].classList.remove("nojs-step-invalid");
        }

        // 2. Check required inputs within the step (native HTML validation)
        const inputs = stepEl.querySelectorAll("[required]");
        for (const input of inputs) {
          if (typeof input.checkValidity === "function" && !input.checkValidity()) {
            input.reportValidity();
            return false;
          }
        }

        // 3. Check step-validate expression
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
      function _updateView(isInitial) {
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

        // Dispatch step-change event. The initial render fires a
        // non-bubbling event so direct listeners still observe the starting
        // step, but ancestors do not receive a spurious change event before
        // any user interaction.
        el.dispatchEvent(
          new CustomEvent("step-change", {
            bubbles: !isInitial,
            detail: { current, total: steps.length },
          })
        );
      }

      // ── Navigation API ──
      function next() {
        // On the last step, "Next" relabels to "Finish": validate the final
        // step (in linear mode) and emit a completion event instead of
        // silently no-op'ing.
        if (current >= steps.length - 1) {
          if (mode === "linear" && !_validateStep(current)) return false;
          el.dispatchEvent(
            new CustomEvent("step-complete", {
              bubbles: true,
              detail: { current, total: steps.length },
            })
          );
          return false;
        }
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

        // In linear mode, can only go back or validate forward. Validate one
        // step at a time, revealing each step before validating so
        // reportValidity() can surface UI on the (otherwise hidden/inert)
        // intermediate step. If a step fails, navigation stops on that step
        // rather than silently aborting.
        if (mode === "linear" && index > current) {
          for (let i = current; i < index; i++) {
            current = i;
            _updateView();
            if (!_validateStep(i)) {
              _syncContext();
              return false;
            }
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
      // `current` is exposed as a getter so the registry always reflects the
      // live step index rather than a one-time snapshot taken at init.
      _stepperRegistry.set(el, {
        get current() {
          return current;
        },
        steps,
        mode,
        indicatorEl,
        navEl,
      });

      // ── Initial render ──
      _updateView(true);

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
