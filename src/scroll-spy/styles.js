// ─── Inject built-in Scroll Spy styles (once) ──────────────────────
export function _injectScrollSpyStyles() {
  if (typeof document === "undefined") return;
  if (document.querySelector("style[data-nojs-scroll-spy]")) return;

  const css = `
[spy].active,
a[href^="#"].active {
  font-weight: 600;
}
`.trim();

  const style = document.createElement("style");
  style.setAttribute("data-nojs-scroll-spy", "");
  style.textContent = css;
  document.head.appendChild(style);
}
