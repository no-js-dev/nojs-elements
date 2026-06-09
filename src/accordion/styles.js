// ─── Inject built-in Accordion styles (once) ────────────────────────
export function _injectAccordionStyles() {
  if (typeof document === "undefined") return;
  if (document.querySelector("style[data-nojs-accordion]")) return;

  const css = `
[accordion] {
  display: flex;
  flex-direction: column;
  gap: var(--nojs-accordion-gap, 0);
}

/* ─── CSS-native animation (modern browsers) ─────────────────── */
@supports (interpolate-size: allow-keywords) {
  [accordion] {
    interpolate-size: allow-keywords;
  }
  [accordion] > details > ::details-content {
    transition:
      block-size var(--nojs-accordion-duration, 0.3s) var(--nojs-accordion-easing, ease),
      content-visibility var(--nojs-accordion-duration, 0.3s) var(--nojs-accordion-easing, ease) allow-discrete;
    block-size: 0;
    overflow: clip;
  }
  [accordion] > details[open] > ::details-content {
    block-size: auto;
  }
}

/* ─── Fallback animation (older browsers) ────────────────────── */
@supports not (interpolate-size: allow-keywords) {
  [accordion] > details .nojs-accordion-content {
    overflow: hidden;
    transition: height var(--nojs-accordion-duration, 0.3s) var(--nojs-accordion-easing, ease);
  }
}

/* ─── Summary reset ──────────────────────────────────────────── */
[accordion] > details > summary {
  cursor: pointer;
  list-style: none;
}
[accordion] > details > summary::-webkit-details-marker {
  display: none;
}
[accordion] > details > summary::marker {
  content: none;
}
`.trim();

  const style = document.createElement("style");
  style.setAttribute("data-nojs-accordion", "");
  style.textContent = css;
  document.head.appendChild(style);
}
