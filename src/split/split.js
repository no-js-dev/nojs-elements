import { _splitRegistry, _paneRegistry, _resizeState } from "./state.js";
import { _injectSplitStyles } from "./styles.js";

function addDisposer(el, fn) {
  el.__disposers = el.__disposers || [];
  el.__disposers.push(fn);
}

// ─── Helpers ────────────────────────────────────────────────────────

function _getSizeProperty(direction) {
  return direction === "horizontal" ? "width" : "height";
}

function _getClientAxis(direction) {
  return direction === "horizontal" ? "clientX" : "clientY";
}

function _getOffsetSize(el, direction) {
  return direction === "horizontal" ? el.offsetWidth : el.offsetHeight;
}

function _getContainerSize(splitEl, direction) {
  const gutters = _splitRegistry.get(splitEl)?.gutters || [];
  const totalGutter = gutters.reduce(
    (sum, g) => sum + _getOffsetSize(g, direction),
    0
  );
  return _getOffsetSize(splitEl, direction) - totalGutter;
}

function _clampSize(px, paneEl) {
  const info = _paneRegistry.get(paneEl);
  if (!info) return px;
  if (info.min != null && px < info.min) return info.min;
  if (info.max != null && px > info.max) return info.max;
  return px;
}

function _updateAriaValues(gutterEl, prevPane, nextPane, direction) {
  const prevSize = _getOffsetSize(prevPane, direction);
  const nextSize = _getOffsetSize(nextPane, direction);
  const prevInfo = _paneRegistry.get(prevPane);
  const nextInfo = _paneRegistry.get(nextPane);
  gutterEl.setAttribute("aria-valuenow", Math.round(prevSize));
  gutterEl.setAttribute("aria-valuemin", prevInfo?.min || 0);
  gutterEl.setAttribute(
    "aria-valuemax",
    Math.round(prevSize + nextSize - (nextInfo?.min || 0))
  );
}

function _persistSizes(splitEl) {
  const persistKey = splitEl.getAttribute("split-persist");
  if (!persistKey) return;
  const info = _splitRegistry.get(splitEl);
  if (!info) return;
  const sizes = info.panes.map((p) => p.style.flexBasis || "");
  try {
    localStorage.setItem(
      `nojs-split:${persistKey}`,
      JSON.stringify(sizes)
    );
  } catch (_) {
    /* quota exceeded — silently ignore */
  }
}

function _restoreSizes(splitEl) {
  const persistKey = splitEl.getAttribute("split-persist");
  if (!persistKey) return false;
  try {
    const raw = localStorage.getItem(`nojs-split:${persistKey}`);
    if (!raw) return false;
    const sizes = JSON.parse(raw);
    const info = _splitRegistry.get(splitEl);
    if (!info || sizes.length !== info.panes.length) return false;
    sizes.forEach((s, i) => {
      if (s) {
        info.panes[i].style.flexBasis = s;
        info.panes[i].style.flexGrow = "0";
      }
    });
    return true;
  } catch (_) {
    return false;
  }
}

// ─── Gutter creation ────────────────────────────────────────────────

function _createGutter(splitEl, direction, prevPane, nextPane, gutterSize) {
  const gutter = document.createElement("div");
  gutter.className = "nojs-gutter";
  gutter.setAttribute("role", "separator");
  gutter.setAttribute("tabindex", "0");
  gutter.setAttribute(
    "aria-orientation",
    direction === "horizontal" ? "vertical" : "horizontal"
  );
  gutter.setAttribute("aria-label", "Resize");
  if (gutterSize !== 6) {
    gutter.style.setProperty("--nojs-gutter-size", `${gutterSize}px`);
  }

  // ── Pointer drag ──────────────────────────────────────────────
  const onPointerDown = (e) => {
    if (e.button !== 0) return;
    e.preventDefault();

    const containerSize = _getContainerSize(splitEl, direction);
    _resizeState.active = true;
    _resizeState.splitEl = splitEl;
    _resizeState.gutterEl = gutter;
    _resizeState.prevPane = prevPane;
    _resizeState.nextPane = nextPane;
    _resizeState.direction = direction;
    _resizeState.startPos = e[_getClientAxis(direction)];
    _resizeState.startPrevSize = _getOffsetSize(prevPane, direction);
    _resizeState.startNextSize = _getOffsetSize(nextPane, direction);
    _resizeState.containerSize = containerSize;

    document.body.style.cursor =
      direction === "horizontal" ? "col-resize" : "row-resize";
    document.body.style.userSelect = "none";

    gutter.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!_resizeState.active || _resizeState.gutterEl !== gutter) return;

    const delta =
      e[_getClientAxis(_resizeState.direction)] - _resizeState.startPos;

    let newPrev = _clampSize(
      _resizeState.startPrevSize + delta,
      _resizeState.prevPane
    );
    let newNext = _clampSize(
      _resizeState.startNextSize - delta,
      _resizeState.nextPane
    );

    // Re-balance if clamping changed the total
    const total = _resizeState.startPrevSize + _resizeState.startNextSize;
    if (newPrev + newNext !== total) {
      if (newPrev !== _resizeState.startPrevSize + delta) {
        newNext = total - newPrev;
      } else {
        newPrev = total - newNext;
      }
    }

    _resizeState.prevPane.style.flexBasis = `${newPrev}px`;
    _resizeState.prevPane.style.flexGrow = "0";
    _resizeState.nextPane.style.flexBasis = `${newNext}px`;
    _resizeState.nextPane.style.flexGrow = "0";

    _updateAriaValues(
      gutter,
      _resizeState.prevPane,
      _resizeState.nextPane,
      _resizeState.direction
    );
  };

  const onPointerUp = () => {
    if (!_resizeState.active || _resizeState.gutterEl !== gutter) return;
    _resizeState.active = false;
    document.body.style.cursor = "";
    document.body.style.userSelect = "";

    _persistSizes(splitEl);

    splitEl.dispatchEvent(
      new CustomEvent("split-resize", {
        bubbles: true,
        detail: { prevPane, nextPane },
      })
    );
  };

  gutter.addEventListener("pointerdown", onPointerDown);
  gutter.addEventListener("pointermove", onPointerMove);
  gutter.addEventListener("pointerup", onPointerUp);
  gutter.addEventListener("pointercancel", onPointerUp);

  // ── Keyboard ──────────────────────────────────────────────────
  const STEP = 10;

  const onKeyDown = (e) => {
    const isHoriz = direction === "horizontal";
    let delta = 0;

    if ((isHoriz && e.key === "ArrowRight") || (!isHoriz && e.key === "ArrowDown")) {
      delta = STEP;
    } else if ((isHoriz && e.key === "ArrowLeft") || (!isHoriz && e.key === "ArrowUp")) {
      delta = -STEP;
    } else if (e.key === "Home") {
      const prevInfo = _paneRegistry.get(prevPane);
      delta = (prevInfo?.min || 0) - _getOffsetSize(prevPane, direction);
    } else if (e.key === "End") {
      const nextInfo = _paneRegistry.get(nextPane);
      const total = _getOffsetSize(prevPane, direction) + _getOffsetSize(nextPane, direction);
      const maxPrev = total - (nextInfo?.min || 0);
      delta = maxPrev - _getOffsetSize(prevPane, direction);
    } else {
      return;
    }

    e.preventDefault();

    const curPrev = _getOffsetSize(prevPane, direction);
    const curNext = _getOffsetSize(nextPane, direction);
    const total = curPrev + curNext;

    let newPrev = _clampSize(curPrev + delta, prevPane);
    let newNext = _clampSize(total - newPrev, nextPane);
    newPrev = total - newNext; // re-balance after clamp

    prevPane.style.flexBasis = `${newPrev}px`;
    prevPane.style.flexGrow = "0";
    nextPane.style.flexBasis = `${newNext}px`;
    nextPane.style.flexGrow = "0";

    _updateAriaValues(gutter, prevPane, nextPane, direction);
    _persistSizes(splitEl);
  };

  gutter.addEventListener("keydown", onKeyDown);

  // ── Double-click to collapse ──────────────────────────────────
  const onDblClick = () => {
    // Collapse the prev pane if collapsible, otherwise try next
    const prevInfo = _paneRegistry.get(prevPane);
    const nextInfo = _paneRegistry.get(nextPane);
    const target = prevInfo?.collapsible
      ? prevPane
      : nextInfo?.collapsible
        ? nextPane
        : null;
    if (!target) return;
    const info = _paneRegistry.get(target);
    if (!info) return;

    const other = target === prevPane ? nextPane : prevPane;
    const total =
      _getOffsetSize(prevPane, direction) +
      _getOffsetSize(nextPane, direction);

    if (info.collapsed) {
      // Expand
      info.collapsed = false;
      target.removeAttribute("data-collapsed");
      const restoreSize = info.preCollapseSize || `${Math.round(total / 2)}px`;
      target.style.flexBasis = restoreSize;
      target.style.flexGrow = "0";
      other.style.flexBasis = `${total - parseFloat(restoreSize)}px`;
      other.style.flexGrow = "0";
    } else {
      // Collapse
      info.preCollapseSize = target.style.flexBasis || `${_getOffsetSize(target, direction)}px`;
      info.collapsed = true;
      target.setAttribute("data-collapsed", "true");
      target.style.flexBasis = "0px";
      target.style.flexGrow = "0";
      other.style.flexBasis = `${total}px`;
      other.style.flexGrow = "0";
    }

    _updateAriaValues(gutter, prevPane, nextPane, direction);
    _persistSizes(splitEl);

    splitEl.dispatchEvent(
      new CustomEvent("split-collapse", {
        bubbles: true,
        detail: { pane: target, collapsed: info.collapsed },
      })
    );
  };

  gutter.addEventListener("dblclick", onDblClick);

  // Return cleanup fn
  const cleanup = () => {
    gutter.removeEventListener("pointerdown", onPointerDown);
    gutter.removeEventListener("pointermove", onPointerMove);
    gutter.removeEventListener("pointerup", onPointerUp);
    gutter.removeEventListener("pointercancel", onPointerUp);
    gutter.removeEventListener("keydown", onKeyDown);
    gutter.removeEventListener("dblclick", onDblClick);
  };

  return { gutter, cleanup };
}

// ─── Directive ──────────────────────────────────────────────────────

export function registerSplitDirective(NoJS) {
  NoJS.directive("split", {
    priority: 14,
    init(el, name, expr) {
      _injectSplitStyles();

      const direction = (expr || "horizontal").trim() === "vertical"
        ? "vertical"
        : "horizontal";
      const gutterSize = parseInt(el.getAttribute("split-gutter"), 10) || 6;

      el.classList.add("nojs-split");
      el.setAttribute("data-direction", direction);

      // Collect [pane] children
      const panes = Array.from(el.children).filter((c) =>
        c.hasAttribute("pane")
      );

      if (panes.length < 2) {
        console.warn(
          `[split] Container requires at least 2 [pane] children, found ${panes.length}.`
        );
        return;
      }

      // Register pane metadata
      panes.forEach((p) => {
        const existing = _paneRegistry.get(p);
        if (!existing) {
          _paneRegistry.set(p, {
            size: p.getAttribute("pane") || null,
            min: parseInt(p.getAttribute("pane-min"), 10) || 0,
            max: parseInt(p.getAttribute("pane-max"), 10) || Infinity,
            collapsible: p.getAttribute("pane-collapsible") === "true",
            collapsed: false,
            preCollapseSize: null,
          });
        }
      });

      // Insert gutters between each pair of panes
      const gutters = [];
      const cleanups = [];

      for (let i = 0; i < panes.length - 1; i++) {
        const { gutter, cleanup } = _createGutter(
          el,
          direction,
          panes[i],
          panes[i + 1],
          gutterSize
        );
        // Insert gutter after panes[i]
        panes[i].after(gutter);
        gutters.push(gutter);
        cleanups.push(cleanup);
      }

      // Register split container
      _splitRegistry.set(el, { direction, gutterSize, panes, gutters });

      // Apply initial sizes (from persistence or attribute)
      const restored = _restoreSizes(el);
      if (!restored) {
        panes.forEach((p) => {
          const info = _paneRegistry.get(p);
          const sizeVal = info?.size;
          if (sizeVal) {
            p.style.flexBasis = sizeVal;
            p.style.flexGrow = "0";
          } else {
            p.style.flexGrow = "1";
            p.style.flexBasis = "0";
          }
        });
      }

      // Set initial ARIA on gutters
      // Defer to next frame so layout is computed
      requestAnimationFrame(() => {
        gutters.forEach((g, i) => {
          _updateAriaValues(g, panes[i], panes[i + 1], direction);
        });
      });

      // Cleanup
      addDisposer(el, () => {
        cleanups.forEach((fn) => fn());
        gutters.forEach((g) => g.remove());
        _splitRegistry.delete(el);
        panes.forEach((p) => _paneRegistry.delete(p));
        el.classList.remove("nojs-split");
        el.removeAttribute("data-direction");
      });
    },
  });
}
