import { _dndState, _dragListRegistry } from "./state.js";
import { _injectDndStyles } from "./styles.js";
import { _internal, _markBound } from "../_compat.js";
import { hostMarker, isHostBackend } from "../_host.js";

// Guarded helper: remove a core directive stub, warn on old cores that lack the API.
function _removeCoreStub(NoJS, name) {
  const removeCore = _internal(NoJS, 'removeCoreDirective');
  if (typeof removeCore === 'function') {
    removeCore(name);
  } else {
    (_internal(NoJS, 'warn') || console.warn)(
      `[nojs-elements] core too old (<1.13.0): cannot remove "${name}" stub; update NoJS core to 1.13.0+.`
    );
  }
}

function addDisposer(el, fn) {
  el.__disposers = el.__disposers || [];
  el.__disposers.push(fn);
}

// ─── Helper: count visible children, recursing through display:contents wrappers
function _countVisibleChildren(el) {
  let count = 0;
  for (const child of el.children) {
    if (child.classList.contains("nojs-drop-placeholder")) continue;
    const style = child.style || {};
    if (style.display === "contents") {
      count += _countVisibleChildren(child);
    } else {
      count++;
    }
  }
  return count;
}

// ─── Helper: calculate drop index from mouse position ─────────────────
function _calcDropIndex(el, mouseX, mouseY, sortDir) {
  const children = [...el.children].filter(
    (c) => !c.classList.contains("nojs-drop-placeholder")
  );
  if (children.length === 0) return 0;

  for (let i = 0; i < children.length; i++) {
    // Use first visible child for display:contents wrappers
    const measured = children[i].style && children[i].style.display === "contents"
      ? (children[i].firstElementChild || children[i])
      : children[i];
    const rect = measured.getBoundingClientRect();
    if (sortDir === "horizontal") {
      const midX = rect.left + rect.width / 2;
      if (mouseX < midX) return i;
    } else if (sortDir === "grid") {
      const midX = rect.left + rect.width / 2;
      const midY = rect.top + rect.height / 2;
      if (mouseY < midY && mouseX < midX) return i;
      if (mouseY < rect.top + rect.height && mouseX < midX) return i;
    } else {
      // vertical (default)
      const midY = rect.top + rect.height / 2;
      if (mouseY < midY) return i;
    }
  }
  return children.length;
}

// ─── Helper: manage placeholder ───────────────────────────────────────
function _insertPlaceholder(el, index, placeholderAttr, placeholderClass) {
  _removePlaceholder();

  let ph;
  if (placeholderAttr === "auto") {
    ph = document.createElement("div");
    ph.className = placeholderClass || "nojs-drop-placeholder";
    // Size placeholder to match the dragged item
    if (_dndState.dragging && _dndState.dragging.sourceEl) {
      const srcEl = _dndState.dragging.sourceEl.firstElementChild || _dndState.dragging.sourceEl;
      const rect = srcEl.getBoundingClientRect();
      if (rect.height > 0) ph.style.height = rect.height + "px";
      if (rect.width > 0) ph.style.width = rect.width + "px";
    }
  } else {
    // Template ID
    const tpl = document.getElementById(
      placeholderAttr.startsWith("#") ? placeholderAttr.slice(1) : placeholderAttr
    );
    if (tpl && tpl.content) {
      ph = document.createElement("div");
      ph.style.display = "contents";
      ph.className = placeholderClass || "nojs-drop-placeholder";
      ph.appendChild(tpl.content.cloneNode(true));
    } else {
      ph = document.createElement("div");
      ph.className = placeholderClass || "nojs-drop-placeholder";
    }
  }

  ph.classList.add("nojs-drop-placeholder");
  const children = [...el.children].filter(
    (c) => !c.classList.contains("nojs-drop-placeholder")
  );

  if (index >= children.length) {
    el.appendChild(ph);
  } else {
    el.insertBefore(ph, children[index]);
  }
  _dndState.placeholder = ph;
}

function _removePlaceholder() {
  if (_dndState.placeholder) {
    _dndState.placeholder.remove();
    _dndState.placeholder = null;
  }
}

// ─── Helper: check if type is accepted ────────────────────────────────
function _isTypeAccepted(dragType, acceptAttr) {
  if (!acceptAttr || acceptAttr === "*") return true;
  const accepted = acceptAttr.split(",").map((s) => s.trim());
  return accepted.includes(dragType);
}

// ─── Helper: build stacked-cards ghost for multi-drag ─────────────────
function _buildStackGhost(sourceEl, count) {
  const ghost = document.createElement("div");
  ghost.style.cssText = "position:fixed;top:-9999px;left:-9999px;pointer-events:none;z-index:99999;";

  const measured = sourceEl.style && sourceEl.style.display === "contents"
    ? (sourceEl.firstElementChild || sourceEl) : sourceEl;
  const rect = measured.getBoundingClientRect();
  const w = rect.width;
  const h = rect.height;
  const cs = getComputedStyle(measured);
  const maxStack = Math.min(count, 3);

  // Stack layers (back to front)
  for (let i = maxStack - 1; i >= 0; i--) {
    const layer = document.createElement("div");
    const offset = i * 4;
    layer.style.cssText =
      "position:absolute;" +
      "top:" + offset + "px;left:" + offset + "px;" +
      "width:" + w + "px;height:" + h + "px;" +
      "border-radius:" + cs.borderRadius + ";" +
      "box-shadow:0 1px 4px rgba(0,0,0,0.12);" +
      "overflow:hidden;box-sizing:border-box;";

    if (i === 0) {
      // Top card: clone content (cloneNode avoids re-parsing HTML which
      // would execute inline event handlers like onerror on <img> tags).
      // Use while-loop to drain the clone — childNodes is a live NodeList
      // so for-of would skip every other child as appendChild mutates it.
      const clone = measured.cloneNode(true);
      while (clone.firstChild) {
        layer.appendChild(clone.firstChild);
      }
      layer.style.background = cs.backgroundColor || "#fff";
      layer.style.border = cs.border;
      layer.style.padding = cs.padding;
      layer.style.fontSize = cs.fontSize;
      layer.style.color = cs.color;
      layer.style.fontFamily = cs.fontFamily;
    } else {
      // Back cards: solid fill
      layer.style.background = cs.backgroundColor || "#fff";
      layer.style.border = cs.border || "1px solid #ddd";
    }
    ghost.appendChild(layer);
  }

  // Count badge
  const badge = document.createElement("div");
  badge.textContent = count;
  badge.style.cssText =
    "position:absolute;top:-6px;right:-6px;" +
    "min-width:22px;height:22px;padding:0 5px;" +
    "background:#3b82f6;color:#fff;border-radius:11px;" +
    "display:flex;align-items:center;justify-content:center;" +
    "font-size:11px;font-weight:700;border:2px solid #fff;" +
    "box-shadow:0 1px 3px rgba(0,0,0,0.2);";
  ghost.appendChild(badge);

  // Container size
  ghost.style.width = (w + (maxStack - 1) * 4) + "px";
  ghost.style.height = (h + (maxStack - 1) * 4) + "px";

  return ghost;
}

// ── Shared aria-live region singleton for DnD announcements (WCAG 4.1.3) ──
let _liveRegion = null;

function _getOrCreateLiveRegion() {
  if (_liveRegion && _liveRegion.isConnected) return _liveRegion;
  if (typeof document === "undefined" || !document.body) return null;
  _liveRegion = document.createElement("div");
  _liveRegion.setAttribute("aria-live", "assertive");
  _liveRegion.setAttribute("aria-atomic", "true");
  _liveRegion.setAttribute("role", "status");
  _liveRegion.className = "nojs-dnd-live-region";
  _liveRegion.style.cssText =
    "position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;padding:0;margin:-1px;";
  document.body.appendChild(_liveRegion);
  return _liveRegion;
}

// What a screen reader announces for an item: its aria-label, else its
// visible text (hidden switch cases and the like left out) with the
// markup's whitespace collapsed, so source indentation never decides
// where the 50-character cut falls.
function _itemLabel(el) {
  if (!el) return "Item";
  const aria = el.getAttribute("aria-label");
  if (aria) return aria;
  const text = typeof el.innerText === "string" ? el.innerText : el.textContent;
  return (text || "").replace(/\s+/g, " ").trim().slice(0, 50) || "Item";
}

function _announce(message) {
  const region = _getOrCreateLiveRegion();
  if (!region) return;
  // Clear then set: forces screen readers to re-announce even if text is identical
  region.textContent = "";
  if (typeof requestAnimationFrame !== "undefined") {
    requestAnimationFrame(() => { region.textContent = message; });
  } else {
    region.textContent = message;
  }
}

// ═══════════════════════════════════════════════════════════════════════
//  DRAG DIRECTIVE
// ═══════════════════════════════════════════════════════════════════════

export function registerDrag(NoJS) {
  if (isHostBackend(NoJS)) {
    NoJS.directive("drag", {
      priority: 15,
      init(el, host) {
        _injectDndStyles();
        _initDrag(el, _hostDragBackend(el, host));
      },
    });
    return;
  }

  _removeCoreStub(NoJS, "drag");

  NoJS.directive("drag", {
    priority: 15,
    init(el, name, expr) {
      _injectDndStyles();
      _initDrag(el, _coreDragBackend(NoJS, el, expr));
    },
  });
}

// Core backend: the drag value and drag-disabled are expressions evaluated
// in the element's reactive context.
// Expressions are captured once at init: re-reading the attribute at event
// time would evaluate whatever a later DOM mutation wrote into it.
function _coreDragBackend(NoJS, el, expr) {
  const ctx = NoJS.findContext(el);
  _markBound(el, ctx);
  const disabledExpr = el.getAttribute("drag-disabled");
  return {
    ctx,
    value: () => NoJS.evaluate(expr, ctx),
    disabled: () => (disabledExpr ? NoJS.evaluate(disabledExpr, ctx) : false),
    watchDisabled: (fn) => addDisposer(el, ctx.$watch(fn)),
    onDispose: (fn) => addDisposer(el, fn),
  };
}

// Host backend (compiled sites): the server evaluated both expressions.
// `drag` holds a sealed value reference that is echoed back, never read;
// `drag-disabled` holds the delivered boolean.
function _hostDragBackend(el, host) {
  return {
    ctx: null,
    value: () => el.getAttribute("drag"),
    disabled: () => host.value(el, "drag-disabled"),
    // Core's watcher runs on every change of the element's context (any
    // state write after init applies the disabled state); the host watcher
    // runs only when the delivered value changes, so apply it now.
    watchDisabled: (fn) => {
      fn();
      return host.watch(el, "drag-disabled", fn);
    },
    onDispose: (fn) => host.onDispose(el, fn),
  };
}

function _initDrag(el, backend) {
  const type = el.getAttribute("drag-type") || "default";
  const effect = el.getAttribute("drag-effect") || "move";
  const handleSel = el.getAttribute("drag-handle");
  const imageSel = el.getAttribute("drag-image");
  const imageOffsetAttr = el.getAttribute("drag-image-offset") || "0,0";
  const disabledExpr = el.getAttribute("drag-disabled");
  const dragClass = el.getAttribute("drag-class") || "nojs-dragging";
  const ghostClass = el.getAttribute("drag-ghost-class");

  // Set draggable
  el.draggable = true;

  // Accessibility (WCAG 4.1.2 — aria-grabbed is deprecated, use aria-roledescription)
  el.setAttribute("aria-roledescription", "draggable item");
  if (!el.getAttribute("role")) el.setAttribute("role", "button");
  if (!el.getAttribute("tabindex")) el.setAttribute("tabindex", "0");

  // Handle restriction: prevent drag from non-handle areas
  let _handleAllowed = true;
  if (handleSel) {
    const mousedownHandler = (e) => {
      _handleAllowed = !!e.target.closest(handleSel);
    };
    el.addEventListener("mousedown", mousedownHandler);
    backend.onDispose(() => el.removeEventListener("mousedown", mousedownHandler));
  }

  // Drag start
  const dragstartHandler = (e) => {
    // Handle check
    if (handleSel && !_handleAllowed) {
      e.preventDefault();
      return;
    }

    // Disabled check
    if (disabledExpr && backend.disabled()) {
      e.preventDefault();
      return;
    }

    const item = backend.value();

    // Check for multi-select
    const group = el.getAttribute("drag-group");
    let dragItem = item;
    if (group && _dndState.selected.has(group)) {
      const selectedSet = _dndState.selected.get(group);
      if (selectedSet.size > 0) {
        // If this element is selected, drag all selected items
        const hasThis = [...selectedSet].some((s) => s.el === el);
        if (hasThis) {
          dragItem = [...selectedSet].map((s) => s.item);
        }
      }
    }

    // Store dragging state
    _dndState.dragging = {
      item: dragItem,
      type,
      effect,
      sourceEl: el,
      sourceCtx: backend.ctx,
      sourceList: null,
      sourceIndex: null,
      listDirective: null,
    };

    // Set dataTransfer
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = effect;
      e.dataTransfer.setData("text/plain", "");

      // Multi-select: stacked cards drag image
      if (Array.isArray(dragItem) && dragItem.length > 1 && e.dataTransfer.setDragImage) {
        const ghost = _buildStackGhost(el, dragItem.length);
        document.body.appendChild(ghost);
        const rect = el.getBoundingClientRect();
        e.dataTransfer.setDragImage(ghost, rect.width / 2, rect.height / 2);
        requestAnimationFrame(() => ghost.remove());
      } else if (imageSel && e.dataTransfer.setDragImage) {
        // Custom drag image
        if (imageSel === "none") {
          const empty = document.createElement("div");
          empty.style.cssText = "width:1px;height:1px;opacity:0;position:fixed;top:-999px";
          document.body.appendChild(empty);
          const [ox, oy] = imageOffsetAttr.split(",").map(Number);
          e.dataTransfer.setDragImage(empty, ox || 0, oy || 0);
          requestAnimationFrame(() => empty.remove());
        } else {
          const imgEl = el.querySelector(imageSel);
          if (imgEl) {
            const [ox, oy] = imageOffsetAttr.split(",").map(Number);
            if (ghostClass) imgEl.classList.add(ghostClass);
            e.dataTransfer.setDragImage(imgEl, ox || 0, oy || 0);
          }
        }
      }
    }

    // Apply drag class to dragged element (and all selected items if multi-select)
    dragClass.split(/\s+/).filter(Boolean).forEach((c) => el.classList.add(c));
    if (Array.isArray(dragItem) && group && _dndState.selected.has(group)) {
      for (const s of _dndState.selected.get(group)) {
        if (s.el !== el) dragClass.split(/\s+/).filter(Boolean).forEach((c) => s.el.classList.add(c));
      }
    }

    // Screen reader announcement (WCAG 4.1.3)
    const dragLabel = _itemLabel(el);
    _announce(`Grabbed ${dragLabel}. Use arrow keys to move.`);

    // Dispatch custom event
    el.dispatchEvent(
      new CustomEvent("nojs:dnd-start", {
        bubbles: true,
        detail: { item: dragItem, index: _dndState.dragging.sourceIndex, el },
      })
    );
  };

  // Drag end
  const dragendHandler = () => {
    // Remove drag class from this element and all selected items
    dragClass.split(/\s+/).filter(Boolean).forEach((c) => el.classList.remove(c));
    const group = el.getAttribute("drag-group");
    if (group && _dndState.selected.has(group)) {
      for (const s of _dndState.selected.get(group)) {
        dragClass.split(/\s+/).filter(Boolean).forEach((c) => s.el.classList.remove(c));
      }
    }

    // Ghost class cleanup
    if (ghostClass && imageSel && imageSel !== "none") {
      const imgEl = el.querySelector(imageSel);
      if (imgEl) imgEl.classList.remove(ghostClass);
    }

    // Dispatch custom event
    el.dispatchEvent(
      new CustomEvent("nojs:dnd-end", {
        bubbles: true,
        detail: {
          item: _dndState.dragging?.item,
          index: _dndState.dragging?.sourceIndex,
          dropped: _dndState.dragging === null,
        },
      })
    );

    // Clear dragging state
    _dndState.dragging = null;
    _removePlaceholder();
  };

  el.addEventListener("dragstart", dragstartHandler);
  el.addEventListener("dragend", dragendHandler);
  backend.onDispose(() => {
    el.removeEventListener("dragstart", dragstartHandler);
    el.removeEventListener("dragend", dragendHandler);
  });

  // Reactive disabled toggle
  if (disabledExpr) {
    function updateDisabled() {
      const disabled = !!backend.disabled();
      el.draggable = !disabled;
      if (disabled) el.removeAttribute("aria-roledescription");
      else el.setAttribute("aria-roledescription", "draggable item");
    }
    backend.watchDisabled(updateDisabled);
  }

  // Keyboard DnD support
  const keydownHandler = (e) => {
    // Clear stale state from elements removed from DOM
    if (_dndState.dragging && !_dndState.dragging.sourceEl.isConnected) {
      _dndState.dragging = null;
    }
    if (e.key === " " && !_dndState.dragging) {
      e.preventDefault();
      const item = backend.value();
      _dndState.dragging = {
        item,
        type,
        effect,
        sourceEl: el,
        sourceCtx: backend.ctx,
        sourceList: null,
        sourceIndex: null,
        listDirective: null,
      };
      dragClass.split(/\s+/).filter(Boolean).forEach((c) => el.classList.add(c));
      const kbLabel = _itemLabel(el);
      _announce(`Grabbed ${kbLabel}. Use arrow keys to move.`);
      el.dispatchEvent(
        new CustomEvent("nojs:dnd-start", {
          bubbles: true,
          detail: { item, index: null, el },
        })
      );
    } else if (e.key === "Escape" && _dndState.dragging && _dndState.dragging.sourceEl === el) {
      e.preventDefault();
      dragClass.split(/\s+/).filter(Boolean).forEach((c) => el.classList.remove(c));
      _announce("Drag cancelled.");
      _dndState.dragging = null;
      _removePlaceholder();
    }
  };
  el.addEventListener("keydown", keydownHandler);
  backend.onDispose(() => el.removeEventListener("keydown", keydownHandler));
}

// ═══════════════════════════════════════════════════════════════════════
//  DROP DIRECTIVE
// ═══════════════════════════════════════════════════════════════════════

export function registerDrop(NoJS) {
  if (isHostBackend(NoJS)) {
    NoJS.directive("drop", {
      priority: 15,
      init(el, host) {
        _injectDndStyles();
        _initDrop(el, _hostDropBackend(el, host));
        _watchHostDropDisabled(el, host);
      },
    });
    return;
  }

  _removeCoreStub(NoJS, "drop");

  NoJS.directive("drop", {
    priority: 15,
    init(el, name, expr) {
      _injectDndStyles();
      _initDrop(el, _coreDropBackend(NoJS, el, expr));
    },
  });
}

// Core backend: the drop statement runs in the element's context with the
// implicit variables; drop-disabled / drop-max are expressions.
function _coreDropBackend(NoJS, el, expr) {
  const ctx = NoJS.findContext(el);
  _markBound(el, ctx);
  const disabledExpr = el.getAttribute("drop-disabled");
  const maxExpr = el.getAttribute("drop-max");
  return {
    disabled: () => (disabledExpr ? NoJS.evaluate(disabledExpr, ctx) : false),
    max: () => (maxExpr ? NoJS.evaluate(maxExpr, ctx) : undefined),
    run(extraVars) {
      const execStatement = _internal(NoJS, 'execStatement');
      if (typeof execStatement === 'function') {
        execStatement(expr, ctx, extraVars);
      } else {
        (_internal(NoJS, 'warn') || console.warn)(
          '[nojs-elements] core too old (<1.13.0): internals.execStatement unavailable; drop expression skipped.'
        );
      }
    },
    onDispose: (fn) => addDisposer(el, fn),
  };
}

// Host backend (compiled sites): the drop statement was compiled to a server
// action; `drop` holds its binding key. Mechanics report the implicit
// variables as the action payload: serializable members only — DOM elements
// never leave the browser and the server binds `list` itself.
function _hostDropBackend(el, host) {
  return {
    disabled: () => host.value(el, "drop-disabled"),
    max: () => host.value(el, "drop-max"),
    run(extraVars) {
      host.exec(el.getAttribute("drop"), {
        $drag: extraVars.$drag,
        $dragType: extraVars.$dragType,
        $dragEffect: extraVars.$dragEffect,
        $dropIndex: extraVars.$dropIndex,
        $source: { index: extraVars.$source.index },
        $target: { index: extraVars.$target.index },
      });
    },
    onDispose: (fn) => host.onDispose(el, fn),
  };
}

// A server morph (action or push) can disable the zone mid-drag: drop the
// visual drag-over state and the placeholder; the next dragover recomputes.
function _watchHostDropDisabled(el, host) {
  if (!el.hasAttribute("drop-disabled")) return;
  host.watch(el, "drop-disabled", () => {
    if (!host.value(el, "drop-disabled")) return;
    const dropClass = el.getAttribute("drop-class") || "nojs-drag-over";
    const rejectClass = el.getAttribute("drop-reject-class") || "nojs-drop-reject";
    dropClass.split(/\s+/).filter(Boolean).forEach((c) => el.classList.remove(c));
    rejectClass.split(/\s+/).filter(Boolean).forEach((c) => el.classList.remove(c));
    if (_dndState.placeholder && el.contains(_dndState.placeholder)) _removePlaceholder();
  });
}

function _initDrop(el, backend) {
  const acceptAttr = el.getAttribute("drop-accept") || "default";
  const dropEffect = el.getAttribute("drop-effect") || "move";
  const dropClass = el.getAttribute("drop-class") || "nojs-drag-over";
  const rejectClass = el.getAttribute("drop-reject-class") || "nojs-drop-reject";
  const disabledExpr = el.getAttribute("drop-disabled");
  const maxExpr = el.getAttribute("drop-max");
  const sortDir = el.getAttribute("drop-sort");
  const placeholderAttr = el.getAttribute("drop-placeholder");
  const placeholderClass = el.getAttribute("drop-placeholder-class");

  // Accessibility
  el.setAttribute("aria-dropeffect", dropEffect);

  // Track dragenter/dragleave depth for nested elements
  let _enterDepth = 0;

  const dragoverHandler = (e) => {
    if (!_dndState.dragging) return;

    // Disabled check
    if (disabledExpr && backend.disabled()) return;

    const typeOk = _isTypeAccepted(_dndState.dragging.type, acceptAttr);
    let maxOk = true;
    if (maxExpr) {
      const max = backend.max();
      const childCount = _countVisibleChildren(el);
      if (typeof max === "number" && childCount >= max) maxOk = false;
    }

    if (!typeOk || !maxOk) {
      rejectClass.split(/\s+/).filter(Boolean).forEach((c) => el.classList.add(c));
      dropClass.split(/\s+/).filter(Boolean).forEach((c) => el.classList.remove(c));
      _removePlaceholder();
      return;
    }

    rejectClass.split(/\s+/).filter(Boolean).forEach((c) => el.classList.remove(c));

    e.preventDefault();
    if (e.dataTransfer) e.dataTransfer.dropEffect = dropEffect;

    // Sortable: calculate index and show placeholder
    if (sortDir) {
      const idx = _calcDropIndex(el, e.clientX, e.clientY, sortDir);
      if (placeholderAttr) {
        _insertPlaceholder(el, idx, placeholderAttr, placeholderClass);
      }
      // Dispatch throttled drag-over event
      el.dispatchEvent(
        new CustomEvent("nojs:dnd-over", {
          bubbles: false,
          detail: { item: _dndState.dragging.item, index: idx },
        })
      );
    }
  };

  // WebKit only drops on an element whose dragenter or dragover was
  // cancelled, and a release on the first pointer position inside the zone
  // fires no dragover at all: an accepting zone cancels every dragenter.
  const dragenterHandler = (e) => {
    if (!_dndState.dragging) return;
    if (disabledExpr && backend.disabled()) return;

    const typeOk = _isTypeAccepted(_dndState.dragging.type, acceptAttr);
    let maxOk = true;
    if (maxExpr) {
      const max = backend.max();
      const childCount = _countVisibleChildren(el);
      if (typeof max === "number" && childCount >= max) maxOk = false;
    }

    if (typeOk && maxOk) {
      e.preventDefault();
      if (e.dataTransfer) e.dataTransfer.dropEffect = dropEffect;
    }

    _enterDepth++;
    if (_enterDepth === 1) {
      if (typeOk && maxOk) {
        dropClass.split(/\s+/).filter(Boolean).forEach((c) => el.classList.add(c));
        el.dispatchEvent(
          new CustomEvent("nojs:dnd-enter", {
            bubbles: false,
            detail: { item: _dndState.dragging.item, type: _dndState.dragging.type },
          })
        );
      } else {
        rejectClass.split(/\s+/).filter(Boolean).forEach((c) => el.classList.add(c));
      }
    }
  };

  const dragleaveHandler = (e) => {
    if (!_dndState.dragging) return;

    _enterDepth--;
    if (_enterDepth <= 0) {
      _enterDepth = 0;
      dropClass.split(/\s+/).filter(Boolean).forEach((c) => el.classList.remove(c));
      rejectClass.split(/\s+/).filter(Boolean).forEach((c) => el.classList.remove(c));
      _removePlaceholder();

      el.dispatchEvent(
        new CustomEvent("nojs:dnd-leave", {
          bubbles: false,
          detail: { item: _dndState.dragging.item },
        })
      );
    }
  };

  const dropHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    _enterDepth = 0;

    if (!_dndState.dragging) return;
    if (disabledExpr && backend.disabled()) return;
    if (!_isTypeAccepted(_dndState.dragging.type, acceptAttr)) return;

    // Max capacity check
    if (maxExpr) {
      const max = backend.max();
      const childCount = _countVisibleChildren(el);
      if (typeof max === "number" && childCount >= max) return;
    }

    const dragItem = _dndState.dragging.item;
    const dragType = _dndState.dragging.type;
    const dragEffect = _dndState.dragging.effect;

    // Calculate drop index
    let dropIndex = 0;
    if (sortDir) {
      dropIndex = _calcDropIndex(el, e.clientX, e.clientY, sortDir);
    }

    // Remove visual feedback
    dropClass.split(/\s+/).filter(Boolean).forEach((c) => el.classList.remove(c));
    rejectClass.split(/\s+/).filter(Boolean).forEach((c) => el.classList.remove(c));
    _removePlaceholder();

    // Execute drop expression with implicit variables
    const extraVars = {
      $drag: dragItem,
      $dragType: dragType,
      $dragEffect: dragEffect,
      $dropIndex: dropIndex,
      $source: {
        list: _dndState.dragging.sourceList,
        index: _dndState.dragging.sourceIndex,
        el: _dndState.dragging.sourceEl,
      },
      $target: { list: null, index: dropIndex, el },
      $el: el,
    };

    backend.run(extraVars);

    // Clear dragging state BEFORE dispatch to prevent re-entry
    _dndState.dragging = null;

    // Dispatch custom event after expression runs
    el.dispatchEvent(
      new CustomEvent("nojs:dnd-drop", {
        bubbles: false,
        detail: {
          item: dragItem,
          index: dropIndex,
          source: extraVars.$source,
          target: extraVars.$target,
          effect: dragEffect,
        },
      })
    );
  };

  // Keyboard: Enter/Space to drop when item is grabbed
  const keydownHandler = (e) => {
    if (!_dndState.dragging) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      dropHandler(e);
    }
  };

  el.addEventListener("dragover", dragoverHandler);
  el.addEventListener("dragenter", dragenterHandler);
  el.addEventListener("dragleave", dragleaveHandler);
  el.addEventListener("drop", dropHandler);
  el.addEventListener("keydown", keydownHandler);
  backend.onDispose(() => {
    el.removeEventListener("dragover", dragoverHandler);
    el.removeEventListener("dragenter", dragenterHandler);
    el.removeEventListener("dragleave", dragleaveHandler);
    el.removeEventListener("drop", dropHandler);
    el.removeEventListener("keydown", keydownHandler);
  });
}

// ═══════════════════════════════════════════════════════════════════════
//  DRAG-LIST DIRECTIVE (Sortable List Shorthand)
// ═══════════════════════════════════════════════════════════════════════

export function registerDragList(NoJS) {
  if (isHostBackend(NoJS)) {
    NoJS.directive("drag-list", {
      priority: 10,
      // Rows are server-rendered: a morph keeps the decorated rows while the
      // server markup is unchanged and re-initializes on new rows.
      subtree: true,
      init(el, host) {
        _injectDndStyles();
        _initDragList(el, el.getAttribute("drag-list"), _hostDragListBackend(el, host));
      },
    });
    return;
  }

  _removeCoreStub(NoJS, "drag-list");

  NoJS.directive("drag-list", {
    priority: 10,
    init(el, name, listPath) {
      _injectDndStyles();
      _initDragList(el, listPath, _coreDragListBackend(NoJS, el, listPath));
    },
  });
}

// Core backend: the list lives in the element's reactive context; the
// directive renders its rows and writes the edited arrays back.
function _coreDragListBackend(NoJS, el, listPath) {
  const ctx = NoJS.findContext(el);
  _markBound(el, ctx);
  const disabledDragExpr = el.getAttribute("drag-disabled");
  const disabledDropExpr = el.getAttribute("drop-disabled");
  const maxExpr = el.getAttribute("drop-max");
  const list = () => NoJS.resolve(listPath, ctx);
  return {
    ctx,
    dragDisabled: () => !!(disabledDragExpr && NoJS.evaluate(disabledDragExpr, ctx)),
    dropDisabled: () => !!(disabledDropExpr && NoJS.evaluate(disabledDropExpr, ctx)),
    full() {
      if (!maxExpr) return false;
      const max = NoJS.evaluate(maxExpr, ctx);
      const l = list();
      return typeof max === "number" && Array.isArray(l) && l.length >= max;
    },
    canEdit: () => Array.isArray(list()),
    move(from, to) {
      const next = [...list()];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      ctx.$set(listPath, next);
      return next;
    },
    insert(index, item, copy) {
      const next = [...list()];
      next.splice(index, 0, copy ? (typeof item === "object" ? { ...item } : item) : item);
      ctx.$set(listPath, next);
      return next;
    },
    removeAt(index) {
      const l = list();
      if (!Array.isArray(l)) return undefined;
      const next = l.filter((_, idx) => idx !== index);
      ctx.$set(listPath, next);
      return next;
    },
    current: list,
    settle: (index, apply) => requestAnimationFrame(() => apply(index)),
    render: (setupRow, toggleEmpty) => _renderCoreRows(NoJS, el, ctx, listPath, setupRow, toggleEmpty),
    onDispose: (fn) => addDisposer(el, fn),
  };
}

// Core rendering: one display:contents wrapper per item, its row context
// holding the item and the loop variables.
function _renderCoreRows(NoJS, el, ctx, listPath, setupRow, toggleEmpty) {
  const tplId = el.getAttribute("template");
  const itemName = el.getAttribute("drag-list-item") || "item";
  let _prevList = null;

  function renderItems() {
    const list = NoJS.resolve(listPath, ctx);
    if (!Array.isArray(list)) return;

    // Same reference & items already rendered — propagate to children
    // without rebuilding the DOM (preserves focus, input state, etc.)
    if (list === _prevList && list.length > 0 && el.children.length > 0) {
      for (const child of el.children) {
        if (child.__ctx && child.__ctx.$notify) child.__ctx.$notify();
      }
      return;
    }
    _prevList = list;

    const tpl = tplId ? document.getElementById(tplId) : null;
    if (!tpl) return;

    const disposeChildren = _internal(NoJS, 'disposeChildren');
    if (typeof disposeChildren === 'function') disposeChildren(el);
    el.innerHTML = "";
    const count = list.length;

    list.forEach((item, i) => {
      const childData = {
        [itemName]: item,
        $index: i,
        $count: count,
        $first: i === 0,
        $last: i === count - 1,
        $even: i % 2 === 0,
        $odd: i % 2 !== 0,
      };
      const childCtx = NoJS.createContext(childData, ctx);

      const clone = tpl.content.cloneNode(true);
      const wrapper = document.createElement("div");
      wrapper.style.display = "contents";
      wrapper.__ctx = childCtx;
      // role="option" goes on the rendered, focusable item (dragEl) below —
      // the display:contents wrapper is not a perceivable a11y node.

      // Append clone first so we can access the visible child
      wrapper.appendChild(clone);
      el.appendChild(wrapper);

      // Register cleanup on wrapper so disposers run when disposeChildren(el) is called
      wrapper.__disposers = wrapper.__disposers || [];
      setupRow(wrapper, i, item, list, childCtx, (fn) => wrapper.__disposers.push(fn));

      NoJS.processTree(wrapper);
    });

    toggleEmpty(list.length === 0);
  }

  const unwatchList = ctx.$watch(renderItems);
  addDisposer(el, unwatchList);
  renderItems();
}

// Host backend (compiled sites): the server rendered the rows (one wrapper
// per item, the item sealed in data-nj-list-item) and compiled the edits to
// actions whose keys sit in data-nj-list-move / -insert / -remove. The
// mechanics report indices; the server edits the list and re-renders it.
function _hostDragListBackend(el, host) {
  // The markers under the names the host serves them (renamed on a site whose authors write them).
  const ITEM = hostMarker(host, "data-nj-list-item");
  const exec = (attr, payload) => {
    const key = el.getAttribute(hostMarker(host, attr));
    if (key) host.exec(key, payload);
  };
  const rows = () => [...el.children].filter((c) => c.hasAttribute(ITEM));
  return {
    ctx: null,
    dragDisabled: () => !!host.value(el, "drag-disabled"),
    dropDisabled: () => !!host.value(el, "drop-disabled"),
    full() {
      const max = host.value(el, "drop-max");
      return typeof max === "number" && rows().length >= max;
    },
    canEdit: () => el.hasAttribute(hostMarker(host, "data-nj-list-move")),
    move(from, to) {
      exec("data-nj-list-move", { $from: from, $to: to });
      return null;
    },
    // A copy is a fresh value server-side: the sealed reference unseals to a new object.
    insert(index, item) {
      exec("data-nj-list-insert", { $index: index, $item: item });
      return null;
    },
    removeAt(index) {
      exec("data-nj-list-remove", { $index: index });
      return null;
    },
    current: () => null,
    // The edited rows arrive with the server's re-render, which
    // re-initializes the list: the settle waits for them. A later envelope
    // can re-initialize the list again (a move to another list sends two
    // actions), so the class is re-applied until the animation ends, as
    // core keeps it, or until the row count changes, when core would have
    // rebuilt its rows.
    settle(index) {
      el.__nojsDragListSettle = { index, count: null };
    },
    render(setupRow, toggleEmpty, settleRow) {
      // The loop's comment markers are not part of core's rows.
      for (const node of [...el.childNodes]) if (node.nodeType === 8) node.remove();
      const all = rows();
      all.forEach((wrapper, i) => {
        const item = wrapper.getAttribute(ITEM);
        setupRow(wrapper, i, item, null, null, (fn) => host.onDispose(wrapper, fn));
      });
      toggleEmpty(all.length === 0);
      const settle = el.__nojsDragListSettle;
      if (settle && (settle.count === null || settle.count === all.length)) {
        settle.count = all.length;
        const animEl = settleRow(settle.index);
        animEl?.addEventListener("animationend", () => {
          if (el.__nojsDragListSettle === settle) delete el.__nojsDragListSettle;
        }, { once: true });
      } else {
        delete el.__nojsDragListSettle;
      }
    },
    onDispose: (fn) => host.onDispose(el, fn),
  };
}

function _initDragList(el, listPath, b) {
  const ctx = b.ctx;
  const keyProp = el.getAttribute("drag-list-key");
  const sortDir = el.getAttribute("drop-sort") || "vertical";
  const type = el.getAttribute("drag-type") || ("__draglist_" + listPath);
  const acceptAttr = el.getAttribute("drop-accept") || type;
  const copyMode = el.hasAttribute("drag-list-copy");
  const removeMode = el.hasAttribute("drag-list-remove");
  const placeholderAttr = el.getAttribute("drop-placeholder");
  const placeholderClass = el.getAttribute("drop-placeholder-class");
  const dragClass = el.getAttribute("drag-class") || "nojs-dragging";
  const dropClass = el.getAttribute("drop-class") || "nojs-drag-over";
  const rejectClass = el.getAttribute("drop-reject-class") || "nojs-drop-reject";
  const settleClass = el.getAttribute("drop-settle-class") || "nojs-drop-settle";
  const emptyClass = el.getAttribute("drop-empty-class") || "nojs-drag-list-empty";

  // Accessibility
  el.setAttribute("role", "listbox");
  el.setAttribute("aria-dropeffect", copyMode ? "copy" : "move");

  // Register for cross-list communication
  const listInfo = { listPath, ctx, el };
  _dragListRegistry.set(el, listInfo);
  b.onDispose(() => _dragListRegistry.delete(el));

  let _enterDepth = 0;

  // ─── Rows ──────────────────────────────────────────────────────────
  const toggleEmpty = (isEmpty) => {
    // Toggle empty class so the container remains a viable drop target
    emptyClass.split(/\s+/).filter(Boolean).forEach((c) => el.classList.toggle(c, isEmpty));
  };

  function setupRow(wrapper, i, item, list, childCtx, disposeRow) {
    // The drag source is the first visible child
    // (display:contents wrapper has no box, so draggable must be on a rendered element)
    const dragEl = wrapper.firstElementChild || wrapper;
    dragEl.draggable = true;
    dragEl.setAttribute("role", "option");
    dragEl.setAttribute("aria-roledescription", "draggable item");
    if (!dragEl.getAttribute("tabindex")) dragEl.setAttribute("tabindex", "0");

    // Per-item drag handlers (on wrapper so events from dragEl bubble up to them)
    const itemDragstart = (e) => {
      if (b.dragDisabled()) {
        e.preventDefault();
        return;
      }
      _dndState.dragging = {
        item,
        type,
        effect: copyMode ? "copy" : "move",
        sourceEl: wrapper,
        sourceCtx: childCtx,
        sourceList: list,
        sourceIndex: i,
        listDirective: { el, listPath, ctx, keyProp, copyMode, removeMode, backend: b },
      };
      if (e.dataTransfer) {
        e.dataTransfer.effectAllowed = copyMode ? "copy" : "move";
        e.dataTransfer.setData("text/plain", "");
      }
      dragClass.split(/\s+/).filter(Boolean).forEach((c) => dragEl.classList.add(c));
      const dlItemLabel = _itemLabel(dragEl);
      _announce(`Grabbed ${dlItemLabel}. Use arrow keys to reorder.`);

      el.dispatchEvent(
        new CustomEvent("nojs:dnd-start", {
          bubbles: true,
          detail: { item, index: i, el: dragEl },
        })
      );
    };

    const itemDragend = () => {
      dragClass.split(/\s+/).filter(Boolean).forEach((c) => dragEl.classList.remove(c));

      // If drag-list-remove and item was NOT dropped in a target, no action
      // If dragging state is still set, it wasn't dropped
      if (_dndState.dragging && _dndState.dragging.sourceEl === wrapper) {
        _dndState.dragging = null;
      }
      _removePlaceholder();
    };

    wrapper.addEventListener("dragstart", itemDragstart);
    wrapper.addEventListener("dragend", itemDragend);

    // Keyboard DnD on items
    const itemKeydown = (e) => {
      if (e.key === " " && !_dndState.dragging) {
        e.preventDefault();
        // Stop the grab keypress from bubbling to the list container's
        // Enter/Space drop handler, which would otherwise immediately drop
        // the item we just grabbed (grab + drop in one keystroke).
        e.stopPropagation();
        _dndState.dragging = {
          item,
          type,
          effect: copyMode ? "copy" : "move",
          sourceEl: wrapper,
          sourceCtx: childCtx,
          sourceList: list,
          sourceIndex: i,
          listDirective: { el, listPath, ctx, keyProp, copyMode, removeMode, backend: b },
        };
        dragClass.split(/\s+/).filter(Boolean).forEach((c) => dragEl.classList.add(c));
        const kbDlItemLabel = _itemLabel(dragEl);
        _announce(`Grabbed ${kbDlItemLabel}. Use arrow keys to reorder.`);
      } else if (e.key === "Escape" && _dndState.dragging) {
        e.preventDefault();
        e.stopPropagation();
        // Reset the grabbed item's visual state. Resolve by the live DOM
        // (nojs-dragging class within this list) so a re-render that swapped
        // the wrapper between grab and cancel can't strand the dragging flag.
        const grabbedEl =
          el.querySelector(`.${dragClass.split(/\s+/)[0]}`) || dragEl;
        dragClass.split(/\s+/).filter(Boolean).forEach((c) => grabbedEl.classList.remove(c));
        _announce("Reorder cancelled.");
        _dndState.dragging = null;
        _removePlaceholder();
      } else if ((e.key === "ArrowDown" || e.key === "ArrowRight") && _dndState.dragging && _dndState.dragging.sourceEl === wrapper) {
        e.preventDefault();
        // Navigate to next item via wrapper siblings
        const nextWrapper = wrapper.nextElementSibling;
        if (nextWrapper) {
          const nextEl = nextWrapper.firstElementChild || nextWrapper;
          nextEl.focus();
          const siblings = [...el.children].filter(c => !c.classList.contains("nojs-drop-placeholder"));
          const pos = siblings.indexOf(nextWrapper) + 1;
          _announce(`Moved to position ${pos} of ${siblings.length}.`);
        }
      } else if ((e.key === "ArrowUp" || e.key === "ArrowLeft") && _dndState.dragging && _dndState.dragging.sourceEl === wrapper) {
        e.preventDefault();
        const prevWrapper = wrapper.previousElementSibling;
        if (prevWrapper) {
          const prevEl = prevWrapper.firstElementChild || prevWrapper;
          prevEl.focus();
          const siblings = [...el.children].filter(c => !c.classList.contains("nojs-drop-placeholder"));
          const pos = siblings.indexOf(prevWrapper) + 1;
          _announce(`Moved to position ${pos} of ${siblings.length}.`);
        }
      }
    };
    wrapper.addEventListener("keydown", itemKeydown);

    disposeRow(() => wrapper.removeEventListener("dragstart", itemDragstart));
    disposeRow(() => wrapper.removeEventListener("dragend", itemDragend));
    disposeRow(() => wrapper.removeEventListener("keydown", itemKeydown));
  }

  function settleRow(index) {
    const targetChild = [...el.children][index];
    if (targetChild) {
      const animEl = targetChild.firstElementChild || targetChild;
      settleClass.split(/\s+/).filter(Boolean).forEach((c) => animEl.classList.add(c));
      animEl.addEventListener("animationend", () => {
        settleClass.split(/\s+/).filter(Boolean).forEach((c) => animEl.classList.remove(c));
      }, { once: true });
      return animEl;
    }
    return null;
  }

  // ─── Drop zone handlers on the list container ─────────────────────
  const dragoverHandler = (e) => {
    if (!_dndState.dragging) return;
    if (b.dropDisabled()) return;

    const typeOk = _isTypeAccepted(_dndState.dragging.type, acceptAttr);
    const maxOk = !b.full();

    if (!typeOk || !maxOk) {
      rejectClass.split(/\s+/).filter(Boolean).forEach((c) => el.classList.add(c));
      dropClass.split(/\s+/).filter(Boolean).forEach((c) => el.classList.remove(c));
      _removePlaceholder();
      return;
    }

    rejectClass.split(/\s+/).filter(Boolean).forEach((c) => el.classList.remove(c));

    e.preventDefault();
    if (e.dataTransfer) e.dataTransfer.dropEffect = copyMode ? "copy" : "move";

    const idx = _calcDropIndex(el, e.clientX, e.clientY, sortDir);
    if (placeholderAttr) {
      _insertPlaceholder(el, idx, placeholderAttr, placeholderClass);
    }
  };

  // An accepting list cancels every dragenter, as the drop zone does.
  const dragenterHandler = (e) => {
    if (!_dndState.dragging) return;
    if (b.dropDisabled()) return;

    const typeOk = _isTypeAccepted(_dndState.dragging.type, acceptAttr);
    const maxOk = !b.full();

    if (typeOk && maxOk) {
      e.preventDefault();
      if (e.dataTransfer) e.dataTransfer.dropEffect = copyMode ? "copy" : "move";
    }

    _enterDepth++;
    if (_enterDepth === 1) {
      if (typeOk && maxOk) {
        dropClass.split(/\s+/).filter(Boolean).forEach((c) => el.classList.add(c));
        el.dispatchEvent(
          new CustomEvent("nojs:dnd-enter", {
            bubbles: false,
            detail: { item: _dndState.dragging.item, type: _dndState.dragging.type },
          })
        );
      } else {
        rejectClass.split(/\s+/).filter(Boolean).forEach((c) => el.classList.add(c));
      }
    }
  };

  const dragleaveHandler = () => {
    if (!_dndState.dragging) return;
    _enterDepth--;
    if (_enterDepth <= 0) {
      _enterDepth = 0;
      dropClass.split(/\s+/).filter(Boolean).forEach((c) => el.classList.remove(c));
      rejectClass.split(/\s+/).filter(Boolean).forEach((c) => el.classList.remove(c));
      _removePlaceholder();
      el.dispatchEvent(
        new CustomEvent("nojs:dnd-leave", {
          bubbles: false,
          detail: { item: _dndState.dragging?.item },
        })
      );
    }
  };

  const dropHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    _enterDepth = 0;

    if (!_dndState.dragging) return;
    if (b.dropDisabled()) return;
    if (!_isTypeAccepted(_dndState.dragging.type, acceptAttr)) return;

    // Max check
    if (b.full()) return;

    const dragItem = _dndState.dragging.item;
    const sourceInfo = _dndState.dragging.listDirective;
    const sourceIndex = _dndState.dragging.sourceIndex;

    const dropIndex = _calcDropIndex(el, e.clientX, e.clientY, sortDir);

    // Remove visual feedback
    dropClass.split(/\s+/).filter(Boolean).forEach((c) => el.classList.remove(c));
    rejectClass.split(/\s+/).filter(Boolean).forEach((c) => el.classList.remove(c));
    _removePlaceholder();

    if (!b.canEdit()) return;

    // Self-drop check: same list, same position
    const isSameList = sourceInfo && sourceInfo.el === el;
    if (isSameList && sourceIndex === dropIndex) {
      _dndState.dragging = null;
      return;
    }
    // Same list, but adjacent position (effectively same position)
    if (isSameList && sourceIndex + 1 === dropIndex) {
      _dndState.dragging = null;
      return;
    }

    // Perform the list mutation
    if (isSameList) {
      // Same-list reorder
      const insertAt = sourceIndex < dropIndex ? dropIndex - 1 : dropIndex;
      const newTargetList = b.move(sourceIndex, insertAt);

      el.dispatchEvent(
        new CustomEvent("nojs:dnd-reorder", {
          bubbles: true,
          detail: { list: newTargetList, item: dragItem, from: sourceIndex, to: insertAt },
        })
      );
    } else {
      // Cross-list transfer
      const newTargetList = b.insert(dropIndex, dragItem, copyMode);

      // Remove from source if move mode
      if (sourceInfo && !sourceInfo.copyMode && (removeMode || sourceInfo.removeMode) && sourceIndex != null) {
        const newSourceList = sourceInfo.backend.removeAt(sourceIndex);
        if (newSourceList !== undefined) {
          sourceInfo.el.dispatchEvent(
            new CustomEvent("nojs:dnd-remove", {
              bubbles: true,
              detail: { list: newSourceList, item: dragItem, index: sourceIndex },
            })
          );
        }
      }

      el.dispatchEvent(
        new CustomEvent("nojs:dnd-receive", {
          bubbles: true,
          detail: {
            list: newTargetList,
            item: dragItem,
            from: sourceIndex,
            fromList: sourceInfo ? sourceInfo.backend.current() : null,
          },
        })
      );
    }

    // Announce drop for screen readers (WCAG 4.1.3)
    const dlDropLabel = _itemLabel(_dndState.dragging?.sourceEl?.firstElementChild);
    const finalPos = isSameList ? (sourceIndex < dropIndex ? dropIndex : dropIndex + 1) : dropIndex + 1;
    _announce(`Dropped ${dlDropLabel} at position ${finalPos}.`);

    // Settle animation (apply to visible child, not display:contents wrapper)
    b.settle(isSameList ? (sourceIndex < dropIndex ? dropIndex - 1 : dropIndex) : dropIndex, settleRow);

    // Clear dragging state
    _dndState.dragging = null;
  };

  // Keyboard: Enter/Space to drop
  const keydownHandler = (e) => {
    if (!_dndState.dragging) return;
    if (!_isTypeAccepted(_dndState.dragging.type, acceptAttr)) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      // Simulate drop at the focused element's position
      const focused = el.querySelector(":focus");
      if (focused) {
        const measured = focused.style?.display === "contents"
          ? (focused.firstElementChild || focused) : focused;
        const rect = measured.getBoundingClientRect();
        const fakeEvent = {
          preventDefault() {},
          stopPropagation() {},
          clientX: rect.left + rect.width / 2,
          clientY: rect.top + rect.height + 1,
          dataTransfer: null,
        };
        dropHandler(fakeEvent);
      }
    }
  };

  el.addEventListener("dragover", dragoverHandler);
  el.addEventListener("dragenter", dragenterHandler);
  el.addEventListener("dragleave", dragleaveHandler);
  el.addEventListener("drop", dropHandler);
  el.addEventListener("keydown", keydownHandler);
  b.onDispose(() => {
    el.removeEventListener("dragover", dragoverHandler);
    el.removeEventListener("dragenter", dragenterHandler);
    el.removeEventListener("dragleave", dragleaveHandler);
    el.removeEventListener("drop", dropHandler);
    el.removeEventListener("keydown", keydownHandler);
  });

  // ─── Rows (core: reactive rendering; host: server-rendered) ────────
  b.render(setupRow, toggleEmpty, settleRow);
}


// ═══════════════════════════════════════════════════════════════════════
//  DRAG-MULTIPLE DIRECTIVE
// ═══════════════════════════════════════════════════════════════════════

export function registerDragMultiple(NoJS) {
  if (isHostBackend(NoJS)) {
    // Compiled sites: `drag` holds the item's sealed reference; a drag of a
    // selection sends the references, each unsealed by the server.
    NoJS.directive("drag-multiple", {
      priority: 16,
      init(el, host) {
        _initDragMultiple(el, {
          ctx: null,
          item: () => el.getAttribute("drag"),
          warn: (msg) => host.warn(msg),
          onDispose: (fn) => host.onDispose(el, fn),
        });
      },
    });
    return;
  }

  _removeCoreStub(NoJS, "drag-multiple");

  NoJS.directive("drag-multiple", {
    priority: 16,
    init(el, name) {
      const ctx = NoJS.findContext(el);
      _markBound(el, ctx);
      _initDragMultiple(el, {
        ctx,
        item: () => {
          const dragExpr = el.getAttribute("drag");
          return dragExpr ? NoJS.evaluate(dragExpr, ctx) : null;
        },
        warn: (msg) => (_internal(NoJS, 'warn') || console.warn)(msg),
        onDispose: (fn) => addDisposer(el, fn),
      });
    },
  });
}

function _initDragMultiple(el, b) {
  const ctx = b.ctx;
  const group = el.getAttribute("drag-group");
  const selectClass = el.getAttribute("drag-multiple-class") || "nojs-selected";

  if (!group) {
    b.warn("drag-multiple requires drag-group attribute");
    return;
  }

  // Initialize group set if needed
  if (!_dndState.selected.has(group)) {
    _dndState.selected.set(group, new Set());
  }
  const selectedSet = _dndState.selected.get(group);

  const clickHandler = (e) => {
    const item = b.item();
    const entry = { item, el, ctx };

    if (e.ctrlKey || e.metaKey) {
      // Additive selection
      const existing = [...selectedSet].find((s) => s.el === el);
      if (existing) {
        selectedSet.delete(existing);
        selectClass.split(/\s+/).filter(Boolean).forEach((c) => el.classList.remove(c));
      } else {
        selectedSet.add(entry);
        selectClass.split(/\s+/).filter(Boolean).forEach((c) => el.classList.add(c));
      }
    } else {
      // Replace selection
      for (const s of selectedSet) {
        selectClass.split(/\s+/).filter(Boolean).forEach((c) => s.el.classList.remove(c));
      }
      selectedSet.clear();
      selectedSet.add(entry);
      selectClass.split(/\s+/).filter(Boolean).forEach((c) => el.classList.add(c));
    }
  };

  el.addEventListener("click", clickHandler);
  b.onDispose(() => {
    el.removeEventListener("click", clickHandler);
    // Remove this element from the selection set
    const existing = [...selectedSet].find((s) => s.el === el);
    if (existing) selectedSet.delete(existing);
  });

  // Escape clears selection for this group
  const escHandler = (e) => {
    if (e.key === "Escape") {
      for (const s of selectedSet) {
        selectClass.split(/\s+/).filter(Boolean).forEach((c) => s.el.classList.remove(c));
      }
      selectedSet.clear();
    }
  };
  window.addEventListener("keydown", escHandler);
  b.onDispose(() => window.removeEventListener("keydown", escHandler));
}
