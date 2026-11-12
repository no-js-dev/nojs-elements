// ═══════════════════════════════════════════════════════════════════════
//  Submit auto-disable — shared by the core and host backends of validate
// ═══════════════════════════════════════════════════════════════════════

// Enable or disable a validated form's submit buttons. A button with
// auto-disable="off", or whose `disabled` attribute holds a custom value,
// keeps its own state. `onlyChanges` writes `disabled` only where it
// differs (the host backend re-applies from a MutationObserver).
export function applyAutoDisable(form, enabled, onlyChanges = false) {
  const buttons = form.querySelectorAll(
    'button:not([type="button"]), input[type="submit"]'
  );
  for (const btn of buttons) {
    if (btn.getAttribute("auto-disable") === "off") continue;
    if (btn.hasAttribute("disabled") && btn.getAttribute("disabled") !== "") {
      const val = btn.getAttribute("disabled");
      if (val !== "disabled" && val !== "true" && val !== "false") continue;
    }
    if (!onlyChanges || btn.disabled !== !enabled) btn.disabled = !enabled;
    btn.__autoDisabled = true;
  }
}
