// ═══════════════════════════════════════════════════════════════════════
//  Module-scoped state for validate directive
// ═══════════════════════════════════════════════════════════════════════

import { VALIDITY_MAP, RULE_PRIORITY } from "./engine.js";

// ── ValidityState → rule name mapping (null: the input's type) ───────
export const _validityMap = VALIDITY_MAP;

// ── Priority order for error display ─────────────────────────────────
export const _rulePriority = RULE_PRIORITY;

export function resetValidateState() {
  // _validityMap and _rulePriority are static constants — nothing to reset.
  // This function exists for API consistency with other modules.
}
