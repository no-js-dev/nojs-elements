// ─── Module-scoped Accordion coordination state ─────────────────────
export const _accordionState = {
  containers: new Map(), // el → { mode, details[], listeners }
};

export function resetAccordionState() {
  _accordionState.containers.clear();
}
