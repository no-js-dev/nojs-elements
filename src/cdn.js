// ════════════════════════════════════════════════════════════════════════
//  NoJS Elements — CDN Entry Point
//  For <script> tag usage: sets window.NoJSElements
// ════════════════════════════════════════════════════════════════════════

import NoJSElements from "./index.js";

if (typeof window !== "undefined") {
  window.NoJSElements = NoJSElements;

  let _installed = false;

  function tryInstall() {
    if (_installed) return true;
    if (window.NoJS && typeof window.NoJS.use === "function") {
      window.NoJS.use(NoJSElements);
      _installed = true;
      return true;
    }
    return false;
  }

  // Fast path: core already loaded (Elements after core).
  if (!tryInstall()) {
    // Slow path: core not yet present (Elements before core, or both async).
    // Poll briefly until core appears, and also retry once on DOMContentLoaded.
    let _attempts = 0;
    const MAX_ATTEMPTS = 100; // ~5s at 50ms — covers async core loads, then stops
    const _poll = setInterval(() => {
      if (tryInstall() || ++_attempts >= MAX_ATTEMPTS) {
        clearInterval(_poll);
      }
    }, 50);

    if (typeof document !== "undefined") {
      document.addEventListener(
        "DOMContentLoaded",
        () => {
          if (tryInstall()) clearInterval(_poll);
        },
        { once: true }
      );
    }
  }
}
