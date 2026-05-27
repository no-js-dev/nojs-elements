import { _tabsState } from "./state.js";
import { _injectTabsStyles } from "./styles.js";

function addDisposer(el, fn) {
  el.__disposers = el.__disposers || [];
  el.__disposers.push(fn);
}

// ─── Generate unique IDs ─────────────────────────────────────────────
let _idCounter = 0;
function _uid(prefix) {
  return `${prefix}-${++_idCounter}`;
}

// ─── Activate a tab by index ─────────────────────────────────────────
function _activateTab(container, index) {
  const state = _tabsState.containers.get(container);
  if (!state) return;

  const { tabs, panels } = state;
  if (index < 0 || index >= tabs.length) return;

  // Check if tab is disabled
  if (tabs[index].getAttribute("aria-disabled") === "true") return;

  // Deactivate all
  for (let i = 0; i < tabs.length; i++) {
    tabs[i].setAttribute("aria-selected", "false");
    tabs[i].setAttribute("tabindex", "-1");
    panels[i].setAttribute("aria-hidden", "true");
    panels[i].inert = true;
  }

  // Activate target
  tabs[index].setAttribute("aria-selected", "true");
  tabs[index].setAttribute("tabindex", "0");
  panels[index].setAttribute("aria-hidden", "false");
  panels[index].inert = false;

  state.activeIndex = index;
}

// ─── Find next enabled tab in a direction ────────────────────────────
function _findNextTab(tabs, current, direction) {
  const len = tabs.length;
  let idx = current;
  for (let i = 0; i < len; i++) {
    idx = (idx + direction + len) % len;
    if (tabs[idx].getAttribute("aria-disabled") !== "true") return idx;
  }
  return current;
}

// ─── Register tabs container directive ───────────────────────────────
export function registerTabsDirective(NoJS) {
  NoJS.directive("tabs", {
    priority: 10,
    init(el, name, expr) {
      _injectTabsStyles();

      // Collect direct child [tab] and [panel] elements
      const childTabs = [];
      const childPanels = [];
      for (const child of Array.from(el.children)) {
        if (child.hasAttribute("tab")) childTabs.push(child);
        else if (child.hasAttribute("panel")) childPanels.push(child);
      }

      if (childTabs.length === 0) {
        console.warn("[tabs] No child [tab] elements found.");
        return;
      }
      if (childTabs.length !== childPanels.length) {
        console.warn("[tabs] Mismatch: " + childTabs.length + " tabs but " + childPanels.length + " panels.");
      }

      // Position attribute
      const position = el.getAttribute("tab-position") || "top";
      el.setAttribute("data-position", position);
      el.classList.add("nojs-tabs");

      // Create tablist wrapper
      const tablist = document.createElement("div");
      tablist.setAttribute("role", "tablist");
      tablist.classList.add("nojs-tablist");

      // Wire up IDs and ARIA for each tab/panel pair
      const pairedCount = Math.min(childTabs.length, childPanels.length);
      for (let i = 0; i < pairedCount; i++) {
        const tab = childTabs[i];
        const panel = childPanels[i];

        const tabId = tab.id || _uid("nojs-tab");
        const panelId = panel.id || _uid("nojs-panel");

        tab.id = tabId;
        panel.id = panelId;

        // Tab ARIA
        tab.setAttribute("role", "tab");
        tab.setAttribute("aria-selected", "false");
        tab.setAttribute("aria-controls", panelId);
        tab.setAttribute("tabindex", "-1");
        tab.classList.add("nojs-tab");

        // Panel ARIA
        panel.setAttribute("role", "tabpanel");
        panel.setAttribute("aria-labelledby", tabId);
        panel.setAttribute("tabindex", "0");
        panel.setAttribute("aria-hidden", "true");
        panel.inert = true;
        panel.classList.add("nojs-panel");

        // Move tab into tablist
        tablist.appendChild(tab);
      }

      // Insert tablist before first panel (or at top of container)
      const firstPanel = childPanels[0];
      if (firstPanel) {
        el.insertBefore(tablist, firstPanel);
      } else {
        el.appendChild(tablist);
      }

      // Register state
      _tabsState.containers.set(el, {
        tabs: childTabs.slice(0, pairedCount),
        panels: childPanels.slice(0, pairedCount),
        activeIndex: -1,
      });

      // Evaluate disabled state for each tab
      const ctx = NoJS.findContext(el);
      for (let i = 0; i < pairedCount; i++) {
        const disabledExpr = childTabs[i].getAttribute("tab-disabled");
        if (disabledExpr) {
          const isDisabled = NoJS.evaluate(disabledExpr, ctx);
          if (isDisabled) {
            childTabs[i].setAttribute("aria-disabled", "true");
          }
        }
      }

      // Determine initial active tab
      let initialIndex = 0;
      if (expr && expr.trim() !== "") {
        const parsed = parseInt(expr, 10);
        if (!isNaN(parsed) && parsed >= 0 && parsed < pairedCount) {
          initialIndex = parsed;
        }
      }

      // If initial tab is disabled, find next enabled
      if (childTabs[initialIndex]?.getAttribute("aria-disabled") === "true") {
        initialIndex = _findNextTab(childTabs.slice(0, pairedCount), initialIndex, 1);
      }

      _activateTab(el, initialIndex);

      // ─── Keyboard navigation on tablist ────────────────────────
      const keydownHandler = (e) => {
        const state = _tabsState.containers.get(el);
        if (!state) return;

        const target = e.target;
        if (target.getAttribute("role") !== "tab") return;

        const { tabs } = state;
        const currentIdx = tabs.indexOf(target);
        if (currentIdx === -1) return;

        let nextIdx = -1;

        switch (e.key) {
          case "ArrowRight":
          case "ArrowDown":
            nextIdx = _findNextTab(tabs, currentIdx, 1);
            break;
          case "ArrowLeft":
          case "ArrowUp":
            nextIdx = _findNextTab(tabs, currentIdx, -1);
            break;
          case "Home":
            nextIdx = _findNextTab(tabs, tabs.length - 1, 1);
            break;
          case "End":
            nextIdx = _findNextTab(tabs, 0, -1);
            break;
          case "Tab":
            // Let natural tab key move focus to active panel
            return;
          default:
            return;
        }

        if (nextIdx !== -1 && nextIdx !== currentIdx) {
          e.preventDefault();
          _activateTab(el, nextIdx);
          tabs[nextIdx].focus();
        }
      };

      tablist.addEventListener("keydown", keydownHandler);

      // ─── Click handler on tabs ─────────────────────────────────
      const clickHandler = (e) => {
        const tab = e.target.closest("[role='tab']");
        if (!tab) return;

        const state = _tabsState.containers.get(el);
        if (!state) return;

        const idx = state.tabs.indexOf(tab);
        if (idx === -1) return;

        _activateTab(el, idx);
        tab.focus();
      };

      tablist.addEventListener("click", clickHandler);

      // ─── Cleanup ───────────────────────────────────────────────
      addDisposer(el, () => {
        tablist.removeEventListener("keydown", keydownHandler);
        tablist.removeEventListener("click", clickHandler);
        _tabsState.containers.delete(el);
      });
    },
  });
}
