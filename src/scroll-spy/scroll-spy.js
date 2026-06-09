import { _spyGroups, _spyElements } from "./state.js";
import { _injectScrollSpyStyles } from "./styles.js";

function addDisposer(el, fn) {
  el.__disposers = el.__disposers || [];
  el.__disposers.push(fn);
}

// ─── Resolve the target section ID from a spy element ───────────────
function _resolveTargetId(el) {
  // <a href="#sectionId"> — read from href
  if (el.tagName === "A") {
    const href = el.getAttribute("href") || "";
    if (href.startsWith("#") && href.length > 1) return href.slice(1);
  }
  // <button spy="#sectionId"> or any element with spy="..."
  const spyVal = el.getAttribute("spy") || "";
  if (spyVal.startsWith("#") && spyVal.length > 1) return spyVal.slice(1);
  if (spyVal.length > 0) return spyVal;
  return null;
}

// ─── Parse config attributes ────────────────────────────────────────
function _parseOffset(el) {
  const raw = el.getAttribute("spy-offset");
  if (raw === null || raw === "") return 0;
  const n = parseInt(raw, 10);
  return Number.isNaN(n) ? 0 : n;
}

function _parseThreshold(el) {
  const raw = el.getAttribute("spy-threshold");
  if (raw === null || raw === "") return 0.1;
  const n = parseFloat(raw);
  return Number.isNaN(n) || n < 0 || n > 1 ? 0.1 : n;
}

// ─── Determine group root ───────────────────────────────────────────
// Spy elements that share the same nearest scrollable ancestor (or
// document) are grouped together so only one is .active at a time.
// For simplicity we use the document root as the default group root.
function _findGroupRoot() {
  return document.documentElement;
}

// ─── Activate / deactivate helpers ──────────────────────────────────
function _activate(el) {
  el.classList.add("active");
  el.setAttribute("aria-current", "true");
}

function _deactivate(el) {
  el.classList.remove("active");
  el.removeAttribute("aria-current");
}

// ─── Rebuild observer for a group ───────────────────────────────────
// Called when a new spy element joins a group. Disconnects any existing
// observer and creates a fresh one observing all targets in the group.
function _rebuildObserver(groupRoot) {
  const group = _spyGroups.get(groupRoot);
  if (!group) return;

  // Disconnect previous observer
  if (group.observer) {
    group.observer.disconnect();
    group.observer = null;
  }

  // Collect all target elements + shared config from the first spy
  // (offset and threshold are per-group: the first spy's config wins).
  const offset = group.offset;
  const threshold = group.threshold;

  // Track which targets are currently intersecting
  const visibleTargets = new Set();

  const rootMargin = `-${offset}px 0px 0px 0px`;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          visibleTargets.add(entry.target.id);
        } else {
          visibleTargets.delete(entry.target.id);
        }
      }

      // Find topmost visible section — the one closest to viewport top.
      let topmostId = null;
      let topmostTop = Infinity;
      for (const id of visibleTargets) {
        const section = document.getElementById(id);
        if (!section) continue;
        const rect = section.getBoundingClientRect();
        if (rect.top < topmostTop) {
          topmostTop = rect.top;
          topmostId = id;
        }
      }

      // Deactivate all spy elements in this group, then activate the
      // one matching the topmost visible section.
      for (const entry of group.spyEntries) {
        _deactivate(entry.el);
      }

      if (topmostId) {
        for (const entry of group.spyEntries) {
          if (entry.targetId === topmostId) {
            _activate(entry.el);
            group.activeEl = entry.el;
            break;
          }
        }
      } else {
        group.activeEl = null;
      }
    },
    { rootMargin, threshold },
  );

  // Observe all target sections
  const observedIds = new Set();
  for (const entry of group.spyEntries) {
    if (observedIds.has(entry.targetId)) continue;
    const target = document.getElementById(entry.targetId);
    if (target) {
      observer.observe(target);
      observedIds.add(entry.targetId);
    }
  }

  group.observer = observer;
}

// ─── Debug-gated warning ────────────────────────────────────────────
function _spyWarn(NoJS, message) {
  if (NoJS && typeof NoJS._warn === "function") NoJS._warn(message);
  else console.warn(message);
}

// ─── Register spy directive ─────────────────────────────────────────
export function registerScrollSpyDirective(NoJS) {
  NoJS.directive("spy", {
    priority: 20,
    init(el, name, expr) {
      _injectScrollSpyStyles();

      const targetId = _resolveTargetId(el);
      if (!targetId) {
        // <a> elements without a hash href and no spy attr are silently
        // skipped — the directive matched the attr but no target was
        // resolvable. Non-<a> elements get a warning.
        if (el.tagName !== "A") {
          _spyWarn(NoJS, '[spy] could not resolve target ID. Use spy="#targetId" or href="#targetId" on <a>.');
        }
        return;
      }

      const offset = _parseOffset(el);
      const threshold = _parseThreshold(el);
      const groupRoot = _findGroupRoot();

      // Ensure the group exists
      if (!_spyGroups.has(groupRoot)) {
        _spyGroups.set(groupRoot, {
          observer: null,
          spyEntries: [],
          activeEl: null,
          offset,
          threshold,
        });
      }

      const group = _spyGroups.get(groupRoot);
      const spyEntry = { el, targetId };
      group.spyEntries.push(spyEntry);
      _spyElements.set(el, groupRoot);

      // Rebuild the observer so it picks up the new target
      _rebuildObserver(groupRoot);

      // Shared MutationObserver: one per group, created when the first
      // spy element joins. Watches for dynamically added sections so
      // the IntersectionObserver can pick up new targets.
      if (!group.mutObserver && typeof MutationObserver !== "undefined") {
        group.mutObserver = new MutationObserver(() => {
          _rebuildObserver(groupRoot);
        });
        group.mutObserver.observe(document.body, { childList: true, subtree: true });
      }

      // ─── Cleanup ───────────────────────────────────────────────
      addDisposer(el, () => {
        // Remove this spy entry from the group
        const idx = group.spyEntries.indexOf(spyEntry);
        if (idx !== -1) group.spyEntries.splice(idx, 1);
        _spyElements.delete(el);

        // Deactivate if this was the active element
        _deactivate(el);

        // If group is now empty, tear down observers and remove group
        if (group.spyEntries.length === 0) {
          if (group.observer) {
            group.observer.disconnect();
            group.observer = null;
          }
          if (group.mutObserver) {
            group.mutObserver.disconnect();
            group.mutObserver = null;
          }
          _spyGroups.delete(groupRoot);
        } else {
          // Rebuild observer without the removed target
          _rebuildObserver(groupRoot);
        }
      });
    },
  });
}
