// ═══════════════════════════════════════════════════════════════════════
//  Module-scoped state for validate directive
// ═══════════════════════════════════════════════════════════════════════

// ── ValidityState → rule name mapping ────────────────────────────────
export const _validityMap = [
  ["valueMissing", "required"],
  ["typeMismatch", null],       // resolved to input type at runtime
  ["tooShort", "minlength"],
  ["tooLong", "maxlength"],
  ["patternMismatch", "pattern"],
  ["rangeUnderflow", "min"],
  ["rangeOverflow", "max"],
  ["stepMismatch", "step"],
];

// ── Priority order for error display ─────────────────────────────────
export const _rulePriority = [
  "required", "email", "url", "number", "date", "time",
  "datetime-local", "month", "week", "tel",
  "minlength", "maxlength", "pattern", "min", "max", "step",
];

export function resetValidateState() {
  // _validityMap and _rulePriority are static constants — nothing to reset.
  // This function exists for API consistency with other modules and to
  // allow future mutable state (e.g. pending async validators) to be
  // cleaned up here.
}
