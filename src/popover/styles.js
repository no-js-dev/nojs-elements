// ─── Inject built-in Popover styles (once) ──────────────────────────
export function _injectPopoverStyles() {
  if (typeof document === "undefined") return;
  if (document.querySelector("style[data-nojs-popover]")) return;

  const css = `
.nojs-popover {
  position: fixed;
  z-index: 9998;
  margin: 0;
  border: 1px solid #E2E8F0;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.06);
  max-width: 20rem;
}
.nojs-popover:popover-open {
  display: block;
}
`.trim();

  const style = document.createElement("style");
  style.setAttribute("data-nojs-popover", "");
  style.textContent = css;
  document.head.appendChild(style);
}
