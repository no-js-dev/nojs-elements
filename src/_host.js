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

/**
 * The served name of a NoJS-Server build marker (`data-nj-validate`, `data-nj-list-item`, ...).
 * A compiled site whose authors write one of those names serves the build's own under another
 * prefix (binding JSON `m`) and keeps the author's as written; the host resolves the build's name.
 * A host without `marker` (an older integrator) serves the names as written.
 *
 * @param {object|null|undefined} host - the host API passed to `init(el, host)`
 * @param {string} name - the marker's build name
 * @returns {string}
 */
export function hostMarker(host, name) {
  const served = host && typeof host.marker === "function" ? host.marker(name) : null;
  return typeof served === "string" && served !== "" ? served : name;
}
