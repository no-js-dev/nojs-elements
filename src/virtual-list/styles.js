// ─── Inject built-in Virtual List styles (once) ─────────────────────
export function _injectVirtualListStyles() {
  if (typeof document === "undefined") return;
  if (document.querySelector("style[data-nojs-virtual-list]")) return;

  const css = `
[data-nojs-virtual] {
  overflow-y: auto;
  position: relative;
  --nojs-virtual-list-height: auto;
}
.nojs-virtual-spacer {
  display: block;
  width: 100%;
  pointer-events: none;
  visibility: hidden;
  margin: 0;
  padding: 0;
  border: none;
  flex-shrink: 0;
}
/* Table-specific spacer: spacer inside tbody must be a <tr> with a <td> */
table[data-nojs-virtual] .nojs-virtual-spacer,
[data-nojs-virtual] tr.nojs-virtual-spacer {
  display: table-row;
}
table[data-nojs-virtual] .nojs-virtual-spacer td,
[data-nojs-virtual] tr.nojs-virtual-spacer td {
  padding: 0;
  border: none;
}
/* DL spacer */
dl[data-nojs-virtual] .nojs-virtual-spacer {
  display: list-item;
  list-style: none;
}
`.trim();

  const style = document.createElement("style");
  style.setAttribute("data-nojs-virtual-list", "");
  style.textContent = css;
  document.head.appendChild(style);
}
