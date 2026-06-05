// ─── Module-scoped Scroll Spy coordination state ────────────────────

// All spy groups: Map<root element → { observer, spyEntries, activeEl }>
// Each spyEntry: { el, targetId }
export const _spyGroups = new Map();

// Flat registry for quick lookup: Map<spy element → group root element>
export const _spyElements = new Map();

export function resetScrollSpyState() {
  // Disconnect all observers and run element disposers.
  for (const [_root, group] of _spyGroups) {
    if (group.observer) {
      try {
        group.observer.disconnect();
      } catch (_err) {
        // Error isolation: one failing disconnect must not block the rest.
      }
    }
    for (const entry of group.spyEntries) {
      const disposers = entry.el && entry.el.__disposers;
      if (!disposers) continue;
      for (const dispose of disposers) {
        try {
          dispose();
        } catch (_err) {
          // Error isolation.
        }
      }
      entry.el.__disposers = [];
    }
  }
  _spyGroups.clear();
  _spyElements.clear();
}
