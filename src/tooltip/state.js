// ─── Module-scoped Tooltip coordination state ───────────────────────

// Registry of active tooltip elements { triggerEl → tooltipEl }
export const _tooltipRegistry = new Map();

// Active tooltip show timeouts { triggerEl → timeoutId }
export const _tooltipTimeouts = new Map();

export function resetTooltipState() {
  // Run each trigger element's disposers first so that event listeners,
  // scroll/resize trackers and watchers registered by the tooltip directive
  // are torn down — clearing the maps alone leaves those attached to
  // orphaned trigger elements (Safety Rule 2). Snapshot the keys before
  // iterating because disposers mutate the registry/timeout maps.
  const triggers = Array.from(_tooltipRegistry.keys());
  for (const trigger of triggers) {
    const disposers = trigger && trigger.__disposers;
    if (!disposers) continue;
    for (const dispose of disposers) {
      try {
        dispose();
      } catch (_err) {
        // Error isolation: one failing disposer must not block the rest.
      }
    }
    trigger.__disposers = [];
  }

  // Defensive cleanup for any state not removed by disposers (e.g. tooltips
  // whose trigger had no disposer registered).
  for (const timeoutId of _tooltipTimeouts.values()) {
    clearTimeout(timeoutId);
  }
  _tooltipTimeouts.clear();

  for (const tooltipEl of _tooltipRegistry.values()) {
    tooltipEl.remove();
  }
  _tooltipRegistry.clear();
}
