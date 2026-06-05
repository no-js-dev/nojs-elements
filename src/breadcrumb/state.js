// ─── Module-scoped Breadcrumb coordination state ─────────────────────
export const _breadcrumbState = {
  containers: new Map(), // el → { unsub: fn | null, crumbs: [] }
};

export function resetBreadcrumbState() {
  for (const [, entry] of _breadcrumbState.containers) {
    if (typeof entry.unsub === "function") entry.unsub();
  }
  _breadcrumbState.containers.clear();
}
