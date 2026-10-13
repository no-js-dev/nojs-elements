// ════════════════════════════════════════════════════════════════════════
//  Dual-backend seam (NoJS-Server ADR-021 §7)
//
//  One package, two backends:
//  - core:  CDN/npm NoJS core. Directive init is `init(el, name, expr)` and
//           plugins may evaluate expressions through core internals.
//  - host:  a NoJS-Server compiled site. `window.NoJS` is the integrator's
//           compat object; directive init is `init(el, host)` and plugins
//           get DOM mechanics only — expressions were compiled server-side.
//
//  The integrator marks its registrar and compat object with `hostApi`
//  (the host API version), which core never defines.
// ════════════════════════════════════════════════════════════════════════

export function isHostBackend(NoJS) {
  return !!(NoJS && typeof NoJS.hostApi === "number" && NoJS.hostApi >= 1);
}
