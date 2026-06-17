# NoJS Elements -- Technical Specification

> **Version:** 1.0.0 | **Date:** 2026-04-02 | **Status:** Approved
> **Package:** `@no-js-dev/nojs-elements` (currently v1.11.0)
> **Scope:** 10 new UI element modules added to the existing plugin

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Architecture Overview](#2-architecture-overview)
3. [Shared Infrastructure](#3-shared-infrastructure)
4. [Implementation Phases](#4-implementation-phases)
5. [Phase 1 -- Foundation (Popover-based)](#5-phase-1----foundation-popover-based)
6. [Phase 2 -- Layout Components](#6-phase-2----layout-components)
7. [Phase 3 -- Data & Navigation](#7-phase-3----data--navigation)
8. [Phase 4 -- Advanced Composition](#8-phase-4----advanced-composition)
9. [Plugin Entry Point Changes](#9-plugin-entry-point-changes)
10. [Test Strategy](#10-test-strategy)
11. [Bundle Size Impact](#11-bundle-size-impact)
12. [Risks & Mitigations](#12-risks--mitigations)

---

## 1. Executive Summary

This spec defines the implementation plan for 10 UI element modules in the `nojs-elements` plugin. Each module follows the established DnD pattern: self-contained directory with barrel export, shared state, injected styles, and one or more NoJS directive registrations. All modules are zero-dependency, rely on native browser APIs (Popover API, CSS Sticky, Flexbox), and provide full ARIA accessibility with keyboard navigation.

---

## 2. Architecture Overview

### 2.1 Module Structure (Canonical)

Every element module follows the DnD reference architecture:

```
src/<element>/
  index.js          # barrel: register<Element>(NoJS, options?) + cleanup<Element>()
  state.js           # module-scoped shared state (plain objects, Maps, Sets)
  styles.js          # _inject<Element>Styles() -- once-only CSS injection
  <directive>.js     # register<Directive>(NoJS) -- one file per directive
  helpers.js         # (optional) shared pure functions
```

### 2.2 NoJS Plugin API Surface

All modules use only these documented APIs:

| API | Purpose |
|-----|---------|
| `NoJS.directive(name, { priority, init(el, name, expr) })` | Register a custom attribute directive |
| `NoJS.findContext(el)` | Walk DOM upward to find nearest reactive context |
| `NoJS.evaluate(expr, ctx)` | Evaluate an expression string against a context |
| `NoJS._execStatement(expr, ctx, vars)` | Execute a statement expression with injected local variables |
| `NoJS._onDispose(fn)` | Register a cleanup callback for the current directive lifecycle |
| `NoJS._warn(msg)` | Log a warning to the console with NoJS prefix |
| `NoJS.global(name, value)` | Register a global function/value accessible from any expression |

### 2.3 CSS Conventions

- **Class prefix:** `.nojs-*` (e.g., `.nojs-tooltip`, `.nojs-modal-backdrop`)
- **Style tag:** `<style data-nojs-<module>>` injected into `<head>` once
- **Scope:** Only positioning, display, layout, z-index, transitions. No colors, fonts, or decorative styles
- **Customization:** Developers override via their own CSS targeting the `.nojs-*` classes
- **CSS Custom Properties:** Each module exposes `--nojs-<module>-*` variables for key values (gap, z-index, timing) so developers can tune without overriding rules

### 2.4 Directive Priority Ranges

| Range | Category | Elements |
|-------|----------|----------|
| 10-14 | Container directives | `tabs`, `tree`, `stepper`, `split`, `sortable`, `modal`, `dropdown` |
| 15-19 | Item/child directives | `tab`, `panel`, `branch`, `subtree`, `step`, `pane`, `sort`, `dropdown-item` |
| 20-24 | Overlay/popup directives | `tooltip`, `popover`, `popover-trigger`, `toast`, `toast-container` |
| 25-29 | Utility directives | `skeleton`, `modal-open`, `modal-close`, `fixed-header`, `fixed-col` |

---

## 3. Shared Infrastructure

### 3.1 Popover Utility Layer

Elements 1-4 (Tooltip, Modal, Dropdown, Toast) all use the native Popover API. A shared utility module avoids duplication.

**File:** `src/_shared/popover.js`

```js
/**
 * Ensures Popover API is available; logs warning if not.
 * @returns {boolean}
 */
export function hasPopoverSupport() { ... }

/**
 * Positions a popover element relative to an anchor.
 * Uses CSS anchor positioning where supported, falls back to
 * getBoundingClientRect() + manual top/left.
 *
 * @param {HTMLElement} popoverEl - The popover to position
 * @param {HTMLElement} anchorEl  - The anchor element
 * @param {string} placement      - "top" | "bottom" | "left" | "right"
 * @param {number} offset          - Gap in pixels (default 8)
 */
export function positionPopover(popoverEl, anchorEl, placement, offset) { ... }

/**
 * Flips placement if popover would overflow viewport.
 * @returns {string} Adjusted placement
 */
export function autoFlip(popoverEl, anchorEl, placement) { ... }
```

### 3.2 Focus Trap Utility

Used by Modal and potentially Dropdown.

**File:** `src/_shared/focus-trap.js`

```js
/**
 * Traps Tab focus within a container element.
 * Returns a release function.
 *
 * @param {HTMLElement} container
 * @param {Object} options
 * @param {HTMLElement} [options.initialFocus] - Element to focus on trap activation
 * @param {boolean} [options.escapeDeactivates] - Whether Esc releases the trap
 * @param {Function} [options.onEscape] - Callback when Esc is pressed
 * @returns {Function} release - Call to deactivate the trap
 */
export function trapFocus(container, options) { ... }

/**
 * Returns all focusable elements within a container.
 * @param {HTMLElement} container
 * @returns {HTMLElement[]}
 */
export function getFocusableElements(container) { ... }
```

### 3.3 Keyboard Navigation Utility

Shared roving tabindex / arrow-key navigation used by Dropdown, Tabs, Tree.

**File:** `src/_shared/keyboard-nav.js`

```js
/**
 * Attaches arrow-key navigation to a list of items.
 *
 * @param {HTMLElement} container - The container listening for keydown
 * @param {Object} options
 * @param {Function} options.getItems   - Returns current NodeList/Array of navigable items
 * @param {string}   options.axis       - "horizontal" | "vertical" | "both"
 * @param {boolean}  [options.loop]     - Wrap around at edges (default true)
 * @param {boolean}  [options.homeEnd]  - Support Home/End keys (default true)
 * @param {Function} [options.onSelect] - Called when Enter/Space is pressed on an item
 * @returns {Function} cleanup
 */
export function attachArrowNav(container, options) { ... }
```

### 3.4 Directory Layout

```
src/
  _shared/
    popover.js          # Popover positioning + support detection
    focus-trap.js       # Focus trap for modal contexts
    keyboard-nav.js     # Arrow-key roving tabindex
  tooltip/              # Phase 1
  modal/                # Phase 1
  dropdown/             # Phase 1
  toast/                # Phase 1
  tabs/                 # Phase 2
  skeleton/             # Phase 2
  split/                # Phase 2
  tree/                 # Phase 3
  stepper/              # Phase 3
  table/                # Phase 3
  dnd/                  # (existing)
  index.js              # Plugin entry point
```

---

## 4. Implementation Phases

Phases are ordered by complexity, dependency relationships, and the foundation each phase provides for the next.

| Phase | Elements | Rationale | Est. Effort |
|-------|----------|-----------|-------------|
| **1 -- Foundation** | Tooltip, Modal, Dropdown, Toast | Build shared Popover infrastructure; most commonly needed elements | ~5 days |
| **2 -- Layout** | Tabs, Skeleton, Split | Independent layout primitives; no Popover dependency | ~3 days |
| **3 -- Data & Nav** | Tree, Stepper, Sortable Table | Complex state management; Tree/Stepper need keyboard nav infrastructure from Phase 1-2 | ~4 days |

**Total estimated effort:** ~12 days

---

## 5. Phase 1 -- Foundation (Popover-based)

### 5.1 Tooltip / Popover

#### Architecture

The Tooltip module handles two distinct behaviors under one roof:
- **Tooltip** (`tooltip` attribute): Lightweight text hint, shown on hover/focus, auto-positioned
- **Popover** (`popover` + `popover-trigger` attributes): Rich content panel, shown on click, uses native Popover API with light dismiss

#### Files

```
src/tooltip/
  index.js        # registerTooltip(NoJS) -- barrel
  state.js        # Active tooltip registry, debounce timers
  styles.js       # _injectTooltipStyles() -- positioning, z-index, arrow
  tooltip.js      # registerTooltipDirective(NoJS)
  popover.js      # registerPopoverDirective(NoJS) + registerPopoverTrigger(NoJS)
```

#### Directives

| Directive | Priority | Target | Expression |
|-----------|----------|--------|------------|
| `tooltip` | 20 | Any element | Static text string |
| `popover` | 12 | Container div | Unique popover ID string |
| `popover-trigger` | 20 | Button/link | Matching popover ID string |

#### Auxiliary Attributes

| Attribute | On | Default | Description |
|-----------|----|---------|-------------|
| `tooltip-position` | `[tooltip]` | `"top"` | Placement: `top`, `bottom`, `left`, `right` |
| `tooltip-delay` | `[tooltip]` | `200` | Show delay in ms |
| `popover-position` | `[popover]` | `"bottom"` | Placement relative to trigger |
| `popover-offset` | `[popover]` | `8` | Gap in px from anchor |

#### CSS (injected via `<style data-nojs-tooltip>`)

```css
.nojs-tooltip {
  position: fixed;
  z-index: var(--nojs-tooltip-z, 9999);
  pointer-events: none;
  max-width: var(--nojs-tooltip-max-width, 250px);
  padding: 6px 10px;
  opacity: 0;
  transition: opacity var(--nojs-tooltip-transition, 0.15s) ease;
}
.nojs-tooltip[aria-hidden="false"] {
  opacity: 1;
}
.nojs-tooltip-arrow {
  position: absolute;
  width: 8px;
  height: 8px;
  transform: rotate(45deg);
}
.nojs-popover {
  position: fixed;
  z-index: var(--nojs-popover-z, 9990);
}
```

#### ARIA

- Tooltip: `role="tooltip"`, linked via `aria-describedby` on the trigger element
- Popover: `aria-expanded` on trigger, `aria-controls` pointing to popover ID, `aria-haspopup="true"` on trigger

#### Keyboard

- Tooltip: Shows on `focusin`, hides on `focusout` and `Escape`
- Popover: `Enter`/`Space` on trigger toggles popover, `Escape` closes

#### Init Logic (tooltip.js)

```
init(el, name, expr):
  1. _injectTooltipStyles()
  2. Read tooltip text from expr (static string)
  3. Read tooltip-position, tooltip-delay attributes
  4. Create floating <div class="nojs-tooltip" role="tooltip"> in DOM (lazily, on first hover)
  5. el.setAttribute("aria-describedby", tooltipEl.id)
  6. Attach mouseenter/focusin -> position + show (debounced by delay)
  7. Attach mouseleave/focusout/Escape -> hide
  8. NoJS._onDispose(() => remove tooltip element + listeners)
```

#### Init Logic (popover.js)

```
init(el, name, expr):   // [popover] directive
  1. _injectTooltipStyles()
  2. id = expr (the popover unique name)
  3. el.setAttribute("popover", "auto")  // native Popover API
  4. el.classList.add("nojs-popover")
  5. Register in state registry: popoverRegistry.set(id, el)
  6. NoJS._onDispose(() => popoverRegistry.delete(id))

init(el, name, expr):   // [popover-trigger] directive
  1. id = expr
  2. el.setAttribute("aria-haspopup", "true")
  3. el.setAttribute("aria-expanded", "false")
  4. On click: find popoverRegistry.get(id), position it, call .showPopover()
  5. el.setAttribute("aria-expanded", "true")
  6. Listen for "toggle" event on popover to update aria-expanded
  7. NoJS._onDispose(() => remove listeners)
```

#### Acceptance Criteria

- [ ] Tooltip shows on hover after configurable delay, hides on mouseleave
- [ ] Tooltip shows on focus, hides on blur and Escape
- [ ] Tooltip auto-flips when near viewport edge
- [ ] Popover opens on trigger click, closes on outside click (light dismiss)
- [ ] Popover supports NoJS directives inside (bind, model, each, etc.)
- [ ] Popover closes on Escape
- [ ] aria-describedby links tooltip to trigger
- [ ] aria-expanded updates on popover toggle
- [ ] Style injection is idempotent (only one `<style data-nojs-tooltip>`)
- [ ] All listeners cleaned up via NoJS._onDispose
- [ ] No layout shift when tooltip/popover appears

---

### 5.2 Modal

#### Architecture

Full-screen overlay dialogs with focus trapping, nested modal stack support, and backdrop via native Popover API `::backdrop`. Uses `popover="manual"` to disable light dismiss (we control closing).

#### Files

```
src/modal/
  index.js          # registerModal(NoJS) -- barrel
  state.js          # Modal stack (array), previous focus tracking
  styles.js         # _injectModalStyles() -- centering, backdrop, z-index
  modal.js          # registerModalDirective(NoJS)
  modal-open.js     # registerModalOpenDirective(NoJS)
  modal-close.js    # registerModalCloseDirective(NoJS)
```

#### Directives

| Directive | Priority | Target | Expression |
|-----------|----------|--------|------------|
| `modal` | 10 | Container div | Unique modal ID string |
| `modal-open` | 25 | Button/link | Matching modal ID string |
| `modal-close` | 25 | Button (inside modal) | (none) or modal ID |

#### Auxiliary Attributes

| Attribute | On | Default | Description |
|-----------|----|---------|-------------|
| `modal-class` | `[modal]` | `""` | Extra CSS class on the modal wrapper |
| `modal-closable` | `[modal]` | `"true"` | If `"false"`, Escape does not close |
| `modal-backdrop` | `[modal]` | `"true"` | If `"false"`, no backdrop click-to-close |

#### State (state.js)

```js
export const _modalState = {
  stack: [],           // Array of { id, el, previousFocus, releaseTrap }
  registry: new Map(), // id -> modal element
};

export function resetModalState() {
  _modalState.stack = [];
  _modalState.registry.clear();
}
```

#### CSS (injected via `<style data-nojs-modal>`)

```css
.nojs-modal {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: var(--nojs-modal-z, 10000);
  padding: var(--nojs-modal-padding, 1rem);
}
.nojs-modal::backdrop {
  background: var(--nojs-modal-backdrop, rgba(0, 0, 0, 0.5));
}
```

#### ARIA

- Modal element: `role="dialog"`, `aria-modal="true"`, `aria-labelledby` (auto-linked to first `<h1>`-`<h6>` child)
- Trigger: `aria-haspopup="dialog"`
- Inert: All content outside the top modal receives `inert` attribute

#### Keyboard

- `Escape`: Closes topmost modal (if `modal-closable !== "false"`)
- `Tab`/`Shift+Tab`: Trapped within modal (via focus-trap utility)
- On close: Focus returns to the trigger element that opened the modal

#### Init Logic (modal.js)

```
init(el, name, expr):
  1. _injectModalStyles()
  2. id = expr
  3. el.setAttribute("popover", "manual")
  4. el.classList.add("nojs-modal")
  5. el.setAttribute("role", "dialog")
  6. el.setAttribute("aria-modal", "true")
  7. Auto-detect heading child -> aria-labelledby
  8. _modalState.registry.set(id, el)
  9. NoJS._onDispose(() => registry cleanup + close if open)
```

#### Init Logic (modal-open.js)

```
init(el, name, expr):
  1. id = expr
  2. el.setAttribute("aria-haspopup", "dialog")
  3. On click:
     a. modalEl = _modalState.registry.get(id)
     b. previousFocus = document.activeElement
     c. modalEl.showPopover()
     d. releaseTrap = trapFocus(modalEl, { escapeDeactivates: closable, onEscape: close })
     e. _modalState.stack.push({ id, el: modalEl, previousFocus, releaseTrap })
     f. Set inert on siblings
  4. NoJS._onDispose(() => cleanup)
```

#### Init Logic (modal-close.js)

```
init(el, name, expr):
  1. On click:
     a. Find closest [modal] ancestor (or use expr to target specific modal)
     b. Pop from stack
     c. releaseTrap()
     d. modalEl.hidePopover()
     e. Remove inert from siblings
     f. previousFocus.focus()
  2. NoJS._onDispose(() => cleanup)
```

#### Acceptance Criteria

- [ ] Modal opens centered with backdrop
- [ ] Focus trapped within modal (Tab cycles through focusable elements)
- [ ] Escape closes topmost modal (respects `modal-closable`)
- [ ] Nested modals stack correctly (each gets higher z-index)
- [ ] Focus returns to trigger on close
- [ ] `inert` applied to background content when modal is open
- [ ] NoJS directives work inside modal (bind, model, if, each)
- [ ] modal-close inside modal works without specifying ID
- [ ] modal-close with ID can close a specific modal from anywhere
- [ ] All listeners and focus trap released on dispose

---

### 5.3 Dropdown

#### Architecture

Dropdown menus using native Popover API (`popover="auto"` for light dismiss). Wrapper pattern: `[dropdown]` contains a `[dropdown-toggle]` and a `[dropdown-menu]` with `[dropdown-item]` children. Full keyboard navigation with typeahead search.

#### Files

```
src/dropdown/
  index.js          # registerDropdown(NoJS) -- barrel
  state.js          # Open dropdown registry, active item index per dropdown
  styles.js         # _injectDropdownStyles() -- menu positioning
  dropdown.js       # registerDropdownDirective(NoJS)
  item.js           # registerDropdownItemDirective(NoJS)
```

#### Directives

| Directive | Priority | Target | Expression |
|-----------|----------|--------|------------|
| `dropdown` | 10 | Wrapper div | (none) |
| `dropdown-toggle` | 15 | Button inside wrapper | (none) |
| `dropdown-menu` | 15 | ul/div inside wrapper | (none) |
| `dropdown-item` | 15 | li/div inside menu | (none) |

#### Auxiliary Attributes

| Attribute | On | Default | Description |
|-----------|----|---------|-------------|
| `dropdown-position` | `[dropdown]` | `"bottom-start"` | Placement of menu relative to toggle |
| `dropdown-align` | `[dropdown]` | `"start"` | `start`, `end`, `center` |

#### CSS (injected via `<style data-nojs-dropdown>`)

```css
.nojs-dropdown-menu {
  position: fixed;
  z-index: var(--nojs-dropdown-z, 9980);
  min-width: var(--nojs-dropdown-min-width, 160px);
  overflow-y: auto;
  max-height: var(--nojs-dropdown-max-height, 300px);
}
.nojs-dropdown-item[aria-disabled="true"] {
  pointer-events: none;
  opacity: 0.5;
}
.nojs-dropdown-item:focus {
  outline: 2px solid currentColor;
  outline-offset: -2px;
}
```

#### ARIA

- Toggle: `role="button"`, `aria-haspopup="true"`, `aria-expanded="false|true"`, `aria-controls="<menu-id>"`
- Menu: `role="menu"`, unique `id`
- Items: `role="menuitem"`, `tabindex="-1"` (roving focus via arrow keys)
- Disabled items: `aria-disabled="true"`

#### Keyboard

- `Enter`/`Space` on toggle: Opens menu, focuses first item
- `ArrowDown`/`ArrowUp`: Navigate items (skips `disabled`)
- `Enter` on item: Activates item, closes menu
- `Escape`: Closes menu, returns focus to toggle
- `Home`/`End`: First/last item
- **Typeahead:** Typing characters focuses the first matching item (by textContent)

#### Init Logic (dropdown.js)

```
init(el, name, expr):    // [dropdown] container
  1. _injectDropdownStyles()
  2. toggleEl = el.querySelector("[dropdown-toggle]")
  3. menuEl = el.querySelector("[dropdown-menu]")
  4. Generate unique ID for menuEl
  5. menuEl.setAttribute("popover", "auto")
  6. menuEl.setAttribute("role", "menu")
  7. menuEl.classList.add("nojs-dropdown-menu")
  8. toggleEl.setAttribute("aria-haspopup", "true")
  9. toggleEl.setAttribute("aria-expanded", "false")
  10. toggleEl.setAttribute("aria-controls", menuEl.id)
  11. Attach click handler on toggle -> position menu, togglePopover()
  12. Listen "toggle" event on menu -> update aria-expanded
  13. Attach keydown on menu -> arrow nav, typeahead, Escape
  14. NoJS._onDispose(() => cleanup all)
```

#### Init Logic (item.js)

```
init(el, name, expr):    // [dropdown-item]
  1. el.setAttribute("role", "menuitem")
  2. el.setAttribute("tabindex", "-1")
  3. If el.hasAttribute("disabled"): el.setAttribute("aria-disabled", "true")
  4. NoJS._onDispose(() => cleanup)
```

#### Acceptance Criteria

- [ ] Menu opens below toggle on click, closes on outside click
- [ ] Arrow keys navigate items, skipping disabled ones
- [ ] Enter activates item and closes menu
- [ ] Escape closes menu and returns focus to toggle
- [ ] Typeahead search focuses matching item
- [ ] Home/End jump to first/last item
- [ ] Dynamic items (via `each`) work correctly
- [ ] Menu auto-flips when near viewport edge
- [ ] All ARIA attributes correctly applied and updated
- [ ] Multiple dropdowns on page work independently

---

### 5.4 Toast

#### Architecture

Notification toasts with auto-dismiss, stacking, and a global `$toast()` API. Container regions are fixed-position areas on the viewport. Each toast is a popover with `popover="manual"` for explicit control.

#### Files

```
src/toast/
  index.js          # registerToast(NoJS) -- barrel, registers $toast global
  state.js          # Toast queue per container, active timer refs
  styles.js         # _injectToastStyles() -- container positioning, stacking
  toast.js          # registerToastDirective(NoJS) + registerToastContainerDirective(NoJS)
```

#### Directives

| Directive | Priority | Target | Expression |
|-----------|----------|--------|------------|
| `toast-container` | 20 | Div | Position string: `"top-right"`, `"top-left"`, `"bottom-right"`, `"bottom-left"`, `"top-center"`, `"bottom-center"` |
| `toast` | 20 | Div | Expression (shows toast when truthy) |

#### Auxiliary Attributes

| Attribute | On | Default | Description |
|-----------|----|---------|-------------|
| `toast-type` | `[toast]` | `"info"` | Type class: `info`, `success`, `warning`, `error` |
| `toast-duration` | `[toast]` | `3000` | Auto-dismiss duration in ms (0 = persistent) |
| `toast-max` | `[toast-container]` | `5` | Max visible toasts (older ones removed) |

#### Global API

The plugin registers `$toast` via `NoJS.global()` during install:

```js
NoJS.global("$toast", (message, type = "info", duration = 3000) => {
  // Find first toast-container (or create default top-right)
  // Create <div popover="manual" class="nojs-toast nojs-toast--{type}">
  // Insert into container, call .showPopover()
  // Schedule hidePopover() + removal after duration
  // Returns a dismiss function
});
```

**Signature:** `$toast(message: string, type?: string, duration?: number): () => void`

#### State (state.js)

```js
export const _toastState = {
  containers: new Map(),   // position -> containerElement
  toasts: new Map(),       // containerId -> [{ el, timer, id }]
  counter: 0,              // unique ID counter
};

export function resetToastState() {
  // Clear all timers and references
  for (const [, list] of _toastState.toasts) {
    list.forEach(t => clearTimeout(t.timer));
  }
  _toastState.containers.clear();
  _toastState.toasts.clear();
  _toastState.counter = 0;
}
```

#### CSS (injected via `<style data-nojs-toast>`)

```css
.nojs-toast-container {
  position: fixed;
  z-index: var(--nojs-toast-z, 11000);
  display: flex;
  flex-direction: column;
  gap: var(--nojs-toast-gap, 8px);
  pointer-events: none;
  max-height: 100vh;
  overflow: hidden;
  padding: var(--nojs-toast-container-padding, 1rem);
}
.nojs-toast-container--top-right    { top: 0; right: 0; align-items: flex-end; }
.nojs-toast-container--top-left     { top: 0; left: 0; align-items: flex-start; }
.nojs-toast-container--top-center   { top: 0; left: 50%; transform: translateX(-50%); align-items: center; }
.nojs-toast-container--bottom-right { bottom: 0; right: 0; align-items: flex-end; flex-direction: column-reverse; }
.nojs-toast-container--bottom-left  { bottom: 0; left: 0; align-items: flex-start; flex-direction: column-reverse; }
.nojs-toast-container--bottom-center { bottom: 0; left: 50%; transform: translateX(-50%); align-items: center; flex-direction: column-reverse; }
.nojs-toast {
  pointer-events: auto;
  min-width: var(--nojs-toast-min-width, 250px);
  max-width: var(--nojs-toast-max-width, 400px);
  padding: var(--nojs-toast-padding, 12px 16px);
}
@keyframes nojs-toast-in {
  from { opacity: 0; transform: translateY(-10px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes nojs-toast-out {
  from { opacity: 1; transform: translateY(0); }
  to   { opacity: 0; transform: translateY(-10px); }
}
.nojs-toast-enter { animation: nojs-toast-in 0.2s ease-out; }
.nojs-toast-exit  { animation: nojs-toast-out 0.2s ease-in; }
```

#### ARIA

- Container: `role="status"`, `aria-live="polite"`, `aria-atomic="false"`
- Each toast: `role="alert"` for error/warning types, `role="status"` for info/success

#### Keyboard

- Toasts are not focusable by default (they are non-interactive notifications)
- If a toast contains interactive content (buttons), those are focusable
- Persistent toasts (duration=0) should include a visible close button

#### Acceptance Criteria

- [ ] `$toast("message")` creates and shows a toast in the default container
- [ ] Toast auto-dismisses after specified duration
- [ ] Multiple toasts stack vertically with gap
- [ ] Max toast limit enforced (oldest removed when exceeded)
- [ ] Toast with duration=0 persists until manually dismissed
- [ ] Declarative `[toast]` fires when expression becomes truthy
- [ ] Enter/exit animations play
- [ ] `role="alert"` on error/warning, `role="status"` on info/success
- [ ] `aria-live="polite"` on container
- [ ] Default container auto-created at top-right if no `[toast-container]` exists
- [ ] All timers cleared on dispose

---

## 6. Phase 2 -- Layout Components

### 6.1 Tabs / Tab / Panel

#### Architecture

Tab interface following WAI-ARIA Tabs pattern. The `[tabs]` container collects `[tab]` and `[panel]` children (paired by index), generates a tablist wrapper, and manages activation state. Uses roving tabindex for keyboard navigation.

#### Files

```
src/tabs/
  index.js          # registerTabs(NoJS) -- barrel
  state.js          # Active tab index per tabs container (WeakMap)
  styles.js         # _injectTabsStyles() -- minimal tablist layout
  tabs.js           # registerTabsDirective(NoJS)
  tab.js            # registerTabDirective(NoJS) + registerPanelDirective(NoJS)
```

#### Directives

| Directive | Priority | Target | Expression |
|-----------|----------|--------|------------|
| `tabs` | 10 | Wrapper div | (optional) Initial active tab index (0-based) |
| `tab` | 15 | Button/element | (optional) Tab label override |
| `panel` | 15 | Div | (none) |

#### Auxiliary Attributes

| Attribute | On | Default | Description |
|-----------|----|---------|-------------|
| `tabs-orientation` | `[tabs]` | `"horizontal"` | `"horizontal"` or `"vertical"` |
| `tabs-activation` | `[tabs]` | `"auto"` | `"auto"` (activate on arrow) or `"manual"` (activate on Enter/Space) |

#### CSS (injected via `<style data-nojs-tabs>`)

```css
.nojs-tablist {
  display: flex;
  gap: var(--nojs-tabs-gap, 0);
}
.nojs-tablist[aria-orientation="vertical"] {
  flex-direction: column;
}
.nojs-tab {
  cursor: pointer;
  user-select: none;
}
.nojs-panel {
  display: none;
}
.nojs-panel--active {
  display: block;
}
```

#### ARIA

- Tablist wrapper: `role="tablist"`, `aria-orientation`
- Each tab: `role="tab"`, `aria-selected="true|false"`, `aria-controls="<panel-id>"`, `tabindex="0|-1"` (roving)
- Each panel: `role="tabpanel"`, `aria-labelledby="<tab-id>"`, `tabindex="0"` (when active), `inert` (when inactive)

#### Keyboard

- `ArrowLeft`/`ArrowRight` (horizontal) or `ArrowUp`/`ArrowDown` (vertical): Navigate tabs
- `Home`/`End`: First/last tab
- `Tab`: Move focus from tablist to active panel content
- `auto` mode: Arrow key immediately activates the tab
- `manual` mode: Arrow key moves focus only; `Enter`/`Space` activates

#### Init Logic (tabs.js)

```
init(el, name, expr):
  1. _injectTabsStyles()
  2. Collect all [tab] and [panel] direct children (paired by order)
  3. Generate unique IDs for tabs and panels
  4. Create <div role="tablist" class="nojs-tablist"> wrapper
  5. Move all [tab] elements into the tablist wrapper
  6. Set ARIA attributes on each tab/panel pair
  7. Activate initial tab (from expr or default 0)
  8. Attach keydown handler for arrow nav (via keyboard-nav utility)
  9. Attach click handlers on tabs
  10. Expose $tabs in local context: { active, select(index), count }
  11. NoJS._onDispose(() => cleanup handlers + restore DOM)
```

#### Acceptance Criteria

- [ ] First tab active by default (or specified index)
- [ ] Clicking tab shows corresponding panel, hides others
- [ ] Arrow keys navigate between tabs (roving tabindex)
- [ ] Home/End jump to first/last tab
- [ ] Tab key moves from tablist to active panel
- [ ] Vertical orientation supports Up/Down instead of Left/Right
- [ ] `inert` applied to inactive panels
- [ ] Dynamic tabs (via `each`) re-index correctly
- [ ] All ARIA roles and relationships correctly applied
- [ ] Manual activation mode requires Enter/Space to activate

---

### 6.2 Skeleton

#### Architecture

The simplest module: a single directive that toggles a shimmer loading placeholder over any element. Expression-reactive -- shows skeleton while expression is truthy, reveals real content when falsy.

#### Files

```
src/skeleton/
  index.js          # registerSkeleton(NoJS) -- barrel
  styles.js         # _injectSkeletonStyles() -- shimmer animation
  skeleton.js       # registerSkeletonDirective(NoJS)
```

**Note:** No `state.js` needed -- skeleton state is per-element (no cross-element coordination).

#### Directives

| Directive | Priority | Target | Expression |
|-----------|----------|--------|------------|
| `skeleton` | 25 | Any element | Boolean expression (truthy = show skeleton) |

#### Auxiliary Attributes

| Attribute | On | Default | Description |
|-----------|----|---------|-------------|
| `skeleton-type` | `[skeleton]` | `"text"` | `"text"`, `"circle"`, `"rect"` |
| `skeleton-lines` | `[skeleton]` | `1` | Number of text lines to simulate |
| `skeleton-size` | `[skeleton]` | `""` | Width/height for circle/rect (e.g., `"64"` for 64px) |
| `skeleton-width` | `[skeleton]` | `"100%"` | Width override |
| `skeleton-height` | `[skeleton]` | `""` | Height override |

#### CSS (injected via `<style data-nojs-skeleton>`)

```css
.nojs-skeleton {
  position: relative;
  overflow: hidden;
}
.nojs-skeleton > * {
  opacity: 0;
  pointer-events: none;
}
.nojs-skeleton::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: var(--nojs-skeleton-bg, #e0e0e0);
}
@keyframes nojs-shimmer {
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
.nojs-skeleton::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(
    90deg,
    transparent,
    var(--nojs-skeleton-shimmer, rgba(255, 255, 255, 0.4)),
    transparent
  );
  animation: nojs-shimmer var(--nojs-skeleton-duration, 1.5s) infinite;
}
.nojs-skeleton--circle {
  border-radius: 50%;
}
.nojs-skeleton-line {
  height: var(--nojs-skeleton-line-height, 1em);
  margin-bottom: var(--nojs-skeleton-line-gap, 0.5em);
  border-radius: var(--nojs-skeleton-line-radius, 4px);
}
```

#### ARIA

- `aria-busy="true"` while skeleton is showing
- `aria-hidden="true"` on the skeleton overlay (screen readers should skip shimmer)

#### Keyboard

- No keyboard interaction (decorative loading state)

#### Init Logic (skeleton.js)

```
init(el, name, expr):
  1. _injectSkeletonStyles()
  2. ctx = NoJS.findContext(el)
  3. Read skeleton-type, skeleton-lines, skeleton-size attributes
  4. Watch expression:
     if truthy:
       a. el.classList.add("nojs-skeleton", "nojs-skeleton--" + type)
       b. el.setAttribute("aria-busy", "true")
       c. If skeleton-lines > 1 and type === "text":
          Create N .nojs-skeleton-line divs inside el
       d. If type === "circle": set width/height from skeleton-size
     if falsy:
       a. el.classList.remove all skeleton classes
       b. el.removeAttribute("aria-busy")
       c. Remove generated line divs
       d. Fade-in transition (0.2s)
  5. NoJS._onDispose(() => cleanup classes, generated elements)
```

#### Acceptance Criteria

- [ ] Skeleton shows shimmer animation while expression is truthy
- [ ] Real content hidden but maintains dimensions
- [ ] Content revealed with fade when expression becomes falsy
- [ ] `skeleton-lines` generates multiple text line placeholders
- [ ] `skeleton-type="circle"` renders round skeleton
- [ ] `aria-busy="true"` while loading
- [ ] Works on any element type (div, h1, p, img, etc.)
- [ ] Multiple skeletons on page perform smoothly (CSS animation, not JS)
- [ ] Style injection idempotent

---

### 6.3 Split / Pane

#### Architecture

Resizable panel layout using CSS Flexbox. The `[split]` container holds `[pane]` children; gutters are inserted between each pair. Drag on gutter adjusts `flex-basis` of adjacent panes. Supports nesting, min/max constraints, and optional `localStorage` persistence.

#### Files

```
src/split/
  index.js          # registerSplit(NoJS) -- barrel
  state.js          # Pane sizes, active resize state, persistence
  styles.js         # _injectSplitStyles() -- flex layout, gutter
  split.js          # registerSplitDirective(NoJS)
  pane.js           # registerPaneDirective(NoJS)
```

#### Directives

| Directive | Priority | Target | Expression |
|-----------|----------|--------|------------|
| `split` | 10 | Container div | `"horizontal"` (default) or `"vertical"` |
| `pane` | 15 | Child div | Initial size (e.g., `"30%"`, `"250px"`, or empty for flex:1) |

#### Auxiliary Attributes

| Attribute | On | Default | Description |
|-----------|----|---------|-------------|
| `pane-min` | `[pane]` | `0` | Minimum size in px |
| `pane-max` | `[pane]` | `Infinity` | Maximum size in px |
| `pane-collapsible` | `[pane]` | `"false"` | If `"true"`, double-click gutter collapses this pane |
| `split-persist` | `[split]` | `""` | localStorage key for persisting sizes |
| `split-gutter-size` | `[split]` | `8` | Gutter width/height in px |

#### CSS (injected via `<style data-nojs-split>`)

```css
.nojs-split {
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.nojs-split--vertical {
  flex-direction: column;
}
.nojs-pane {
  overflow: auto;
  min-width: 0;
  min-height: 0;
}
.nojs-gutter {
  flex-shrink: 0;
  background: var(--nojs-gutter-bg, transparent);
  position: relative;
  z-index: 1;
  user-select: none;
}
.nojs-gutter--horizontal {
  width: var(--nojs-gutter-size, 8px);
  cursor: col-resize;
}
.nojs-gutter--vertical {
  height: var(--nojs-gutter-size, 8px);
  cursor: row-resize;
}
.nojs-gutter:hover,
.nojs-gutter:focus-visible {
  background: var(--nojs-gutter-hover-bg, rgba(0, 0, 0, 0.1));
}
.nojs-pane--collapsed {
  flex-basis: 0 !important;
  overflow: hidden;
}
```

#### ARIA

- Gutter: `role="separator"`, `aria-orientation="horizontal|vertical"`, `aria-valuenow` (current pane size %), `aria-valuemin`, `aria-valuemax`, `tabindex="0"`

#### Keyboard

- Focus gutter + `ArrowLeft`/`ArrowRight` (horizontal) or `ArrowUp`/`ArrowDown` (vertical): Resize by 10px increments
- `Home`: Collapse to minimum
- `End`: Expand to maximum
- `Enter` on collapsible gutter: Toggle collapse

#### Init Logic (split.js)

```
init(el, name, expr):
  1. _injectSplitStyles()
  2. direction = expr || "horizontal"
  3. el.classList.add("nojs-split", direction === "vertical" ? "nojs-split--vertical" : "")
  4. Collect [pane] children
  5. For each pair of adjacent panes, create gutter div:
     a. gutter.classList.add("nojs-gutter", "nojs-gutter--" + direction)
     b. Set ARIA attributes
     c. Insert gutter between panes
  6. Parse initial sizes from pane expressions
  7. If split-persist and localStorage has saved sizes, restore them
  8. Apply flex-basis to each pane
  9. Attach mousedown/touchstart on gutters -> start resize
  10. On pointermove: calculate new sizes, enforce min/max, apply flex-basis
  11. On pointerup: end resize, optionally persist to localStorage
  12. Attach keydown on gutters for keyboard resize
  13. NoJS._onDispose(() => cleanup listeners, remove gutters)
```

#### Acceptance Criteria

- [ ] Panes render side-by-side (horizontal) or stacked (vertical)
- [ ] Dragging gutter resizes adjacent panes
- [ ] Min/max constraints enforced during drag
- [ ] Keyboard arrow keys resize in 10px increments
- [ ] Double-click gutter collapses pane (if `pane-collapsible`)
- [ ] Nested splits work correctly
- [ ] Sizes persist to localStorage when `split-persist` is set
- [ ] Gutter has proper cursor and hover state
- [ ] ARIA separator role with correct value attributes
- [ ] Works with percentage and pixel initial sizes
- [ ] No layout jump on initial render

---

## 7. Phase 3 -- Data & Navigation

### 7.1 Tree / Branch / Subtree

#### Architecture

Hierarchical tree view following WAI-ARIA TreeView pattern. Supports expand/collapse, nested trees, keyboard navigation, and dynamic data via NoJS `each` directive.

#### Files

```
src/tree/
  index.js          # registerTree(NoJS) -- barrel
  state.js          # Expanded branches map (WeakMap<element, boolean>)
  styles.js         # _injectTreeStyles() -- indentation, expand icons
  tree.js           # registerTreeDirective(NoJS) + registerBranchDirective(NoJS) + registerSubtreeDirective(NoJS)
```

#### Directives

| Directive | Priority | Target | Expression |
|-----------|----------|--------|------------|
| `tree` | 10 | `<ul>` root | (none) |
| `branch` | 15 | `<li>` items that contain subtrees | (optional) `"expanded"` for initial open state |
| `subtree` | 15 | `<ul>` nested inside a branch | (none) |

#### Auxiliary Attributes

| Attribute | On | Default | Description |
|-----------|----|---------|-------------|
| `tree-multiselect` | `[tree]` | `"false"` | Enable multi-selection with Ctrl/Shift |
| `branch-icon` | `[branch]` | `""` | Custom expand/collapse icon (CSS class) |

#### CSS (injected via `<style data-nojs-tree>`)

```css
.nojs-tree {
  list-style: none;
  padding-left: 0;
}
.nojs-subtree {
  list-style: none;
  padding-left: var(--nojs-tree-indent, 1.5rem);
  overflow: hidden;
}
.nojs-subtree[aria-hidden="true"] {
  display: none;
}
.nojs-branch-toggle {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  border: none;
  background: none;
  padding: 0;
}
.nojs-branch-toggle::before {
  content: "";
  display: inline-block;
  width: 0;
  height: 0;
  border-left: 5px solid currentColor;
  border-top: 4px solid transparent;
  border-bottom: 4px solid transparent;
  margin-right: 4px;
  transition: transform var(--nojs-tree-transition, 0.15s) ease;
}
.nojs-branch-toggle[aria-expanded="true"]::before {
  transform: rotate(90deg);
}
```

#### ARIA

- Tree root: `role="tree"`
- Branch `<li>`: `role="treeitem"`, `aria-expanded="true|false"` (if has subtree)
- Subtree `<ul>`: `role="group"`, `aria-hidden="true|false"`
- Leaf `<li>` (no subtree): `role="treeitem"`
- Selected items: `aria-selected="true"`
- Roving tabindex: Only one item has `tabindex="0"` at a time

#### Keyboard

- `ArrowRight` on collapsed branch: Expand
- `ArrowRight` on expanded branch: Focus first child
- `ArrowLeft` on child: Focus parent branch
- `ArrowLeft` on expanded branch: Collapse
- `ArrowUp`/`ArrowDown`: Move between visible items
- `Home`/`End`: First/last visible item
- `Enter`/`Space`: Toggle expand/collapse (on branch) or select (on leaf)
- `*` (asterisk): Expand all siblings at current level

#### Init Logic

```
init(el, name, expr):    // [tree]
  1. _injectTreeStyles()
  2. el.setAttribute("role", "tree")
  3. el.classList.add("nojs-tree")
  4. Set tabindex="0" on first treeitem
  5. Attach keydown handler for full tree keyboard navigation
  6. NoJS._onDispose(() => cleanup)

init(el, name, expr):    // [branch]
  1. el.setAttribute("role", "treeitem")
  2. subtreeEl = el.querySelector("[subtree]")
  3. If subtreeEl exists:
     a. Create toggle button wrapping the branch text content
     b. Set aria-expanded based on expr ("expanded" or default "false")
     c. Attach click on toggle -> toggle subtree visibility
  4. NoJS._onDispose(() => cleanup)

init(el, name, expr):    // [subtree]
  1. el.setAttribute("role", "group")
  2. el.classList.add("nojs-subtree")
  3. Sync hidden state with parent branch's aria-expanded
  4. NoJS._onDispose(() => cleanup)
```

#### Acceptance Criteria

- [ ] Branches expand/collapse on click
- [ ] Arrow keys navigate full tree (expand, collapse, parent, child)
- [ ] Home/End jump to first/last visible item
- [ ] Asterisk expands all siblings
- [ ] Dynamic trees (via `each`) work with nested data
- [ ] Multi-select with Ctrl+Click/Shift+Click (if enabled)
- [ ] Roving tabindex -- only one item focusable at a time
- [ ] All ARIA roles and states correctly applied
- [ ] Indentation via CSS (not inline styles)
- [ ] Expand/collapse animation via CSS transition

---

### 7.2 Stepper / Step

#### Architecture

Multi-step wizard with progress indicator, step validation, and navigation controls. Supports linear (must validate before advancing) and free (any step clickable) modes. Integrates with NoJS form validation.

#### Files

```
src/stepper/
  index.js          # registerStepper(NoJS) -- barrel
  state.js          # Current step, validation state per step, step metadata
  styles.js         # _injectStepperStyles() -- progress indicator, step layout
  stepper.js        # registerStepperDirective(NoJS)
  step.js           # registerStepDirective(NoJS)
```

#### Directives

| Directive | Priority | Target | Expression |
|-----------|----------|--------|------------|
| `stepper` | 10 | Wrapper div | (none) |
| `step` | 15 | Child div | (none) |

#### Auxiliary Attributes

| Attribute | On | Default | Description |
|-----------|----|---------|-------------|
| `stepper-mode` | `[stepper]` | `"linear"` | `"linear"` or `"free"` |
| `step-label` | `[step]` | Auto-detected from first heading or `"Step N"` | Display label for progress indicator |
| `step-icon` | `[step]` | `""` | Custom icon for progress indicator |
| `step-optional` | `[step]` | `"false"` | If `"true"`, step can be skipped in linear mode |
| `stepper-on-complete` | `[stepper]` | `""` | Expression executed when last step completed |

#### CSS (injected via `<style data-nojs-stepper>`)

```css
.nojs-stepper-progress {
  display: flex;
  align-items: center;
  gap: var(--nojs-stepper-gap, 0);
  counter-reset: step;
}
.nojs-stepper-indicator {
  display: flex;
  align-items: center;
  flex: 1;
}
.nojs-stepper-dot {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--nojs-stepper-dot-size, 2rem);
  height: var(--nojs-stepper-dot-size, 2rem);
  border-radius: 50%;
  flex-shrink: 0;
  counter-increment: step;
}
.nojs-stepper-dot::before {
  content: counter(step);
}
.nojs-stepper-connector {
  flex: 1;
  height: 2px;
  min-width: var(--nojs-stepper-connector-min, 2rem);
}
.nojs-stepper-label {
  margin-top: 4px;
  text-align: center;
}
.nojs-step {
  display: none;
}
.nojs-step--active {
  display: block;
}
.nojs-stepper-nav {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: var(--nojs-stepper-nav-margin, 1rem);
}
```

#### ARIA

- Stepper: `role="group"`, `aria-label="Progress"`
- Progress indicators: `role="tablist"` (each indicator is `role="tab"`)
- Steps: `role="tabpanel"`, `aria-labelledby` linked to indicator
- Current step indicator: `aria-current="step"`
- Completed steps: `aria-disabled="false"` in free mode

#### Keyboard

- Progress indicators: Arrow keys navigate (like tabs), Enter/Space activates (in free mode)
- Tab navigates into step content
- Nav buttons (Prev/Next) are standard focusable buttons

#### Local Context API

The stepper exposes `$stepper` in the local context of all children:

```js
$stepper = {
  current: 0,                 // 0-based index of active step
  total: 3,                   // total number of steps
  isFirst: true,              // current === 0
  isLast: false,              // current === total - 1
  completed: [true, false, false], // per-step completion status
  next(),                     // advance to next step (validates in linear mode)
  prev(),                     // go to previous step
  goTo(index),                // jump to step (validates in linear mode)
}
```

#### Validation Integration

In linear mode, before advancing:
1. Find all `required` inputs, `[validate]` elements in current step
2. Trigger HTML5 `checkValidity()` on each
3. If any invalid, show validation messages, prevent advance
4. Mark step as completed only after successful validation

#### Init Logic (stepper.js)

```
init(el, name, expr):
  1. _injectStepperStyles()
  2. steps = el.querySelectorAll("[step]")
  3. mode = el.getAttribute("stepper-mode") || "linear"
  4. Generate progress indicator bar:
     For each step: create dot + label + connector
  5. Insert progress bar before first step
  6. Generate nav buttons (Prev / Next / Complete) after last step
  7. Activate step 0
  8. Create $stepper proxy and inject into context
  9. Attach click handlers on indicators (free mode) and nav buttons
  10. Attach validation logic on Next button
  11. NoJS._onDispose(() => cleanup handlers, remove generated UI)
```

#### Acceptance Criteria

- [ ] Only active step is visible
- [ ] Progress indicator shows current step, completed steps, upcoming steps
- [ ] Next button validates current step in linear mode before advancing
- [ ] Previous button always works (no validation needed)
- [ ] Free mode allows clicking any step in progress bar
- [ ] Optional steps can be skipped in linear mode
- [ ] `$stepper` context API works in expressions (e.g., `bind="$stepper.current + 1"`)
- [ ] `stepper-on-complete` fires when last step is validated
- [ ] Step labels auto-detected from headings
- [ ] Dynamic steps (via `if`/`each`) handled gracefully
- [ ] ARIA roles correctly applied (tablist for indicators, tabpanel for steps)
- [ ] Keyboard navigation on progress indicators

---

### 7.3 Sortable Table

#### Architecture

Column-sorting for HTML tables. The `[sortable]` directive on `<table>` enables sort behavior. Each `[sort]` on a `<th>` declares the data key. Sorting modifies the data array in the NoJS context (the `each` binding re-renders automatically). Supports fixed headers and fixed columns via CSS sticky positioning.

#### Files

```
src/table/
  index.js          # registerTable(NoJS) -- barrel
  state.js          # Sort state per table (column, direction), comparators
  styles.js         # _injectTableStyles() -- sort indicators, sticky positioning
  table.js          # registerSortableDirective(NoJS) + registerSortDirective(NoJS) + registerFixedDirective(NoJS)
```

#### Directives

| Directive | Priority | Target | Expression |
|-----------|----------|--------|------------|
| `sortable` | 10 | `<table>` | (none) |
| `sort` | 15 | `<th>` inside sortable table | Data key string (e.g., `"name"`, `"age"`) |
| `fixed-header` | 25 | `<thead>` | (none) |
| `fixed-col` | 25 | `<th>` or `<td>` | (none) |

#### Auxiliary Attributes

| Attribute | On | Default | Description |
|-----------|----|---------|-------------|
| `sort-type` | `[sort]` | `"auto"` | `"string"`, `"number"`, `"date"`, `"auto"` (detect from first value) |
| `sort-default` | `[sort]` | `""` | `"asc"` or `"desc"` -- initial sort on page load |
| `sort-compare` | `[sort]` | `""` | Expression returning a custom comparator function |

#### CSS (injected via `<style data-nojs-table>`)

```css
.nojs-sortable th[sort] {
  cursor: pointer;
  user-select: none;
  position: relative;
  padding-right: 1.5em;
}
.nojs-sortable th[sort]::after {
  content: "";
  position: absolute;
  right: 0.5em;
  top: 50%;
  transform: translateY(-50%);
  border: 4px solid transparent;
  opacity: 0.3;
}
.nojs-sort-asc::after {
  border-bottom-color: currentColor;
  opacity: 1;
}
.nojs-sort-desc::after {
  border-top-color: currentColor;
  opacity: 1;
}
.nojs-fixed-header thead {
  position: sticky;
  top: 0;
  z-index: var(--nojs-table-header-z, 2);
}
.nojs-fixed-col {
  position: sticky;
  left: 0;
  z-index: var(--nojs-table-col-z, 1);
}
```

#### ARIA

- Sortable `<th>`: `aria-sort="ascending|descending|none"`, `role="columnheader"`
- Table: inherits native `<table>` semantics (no extra roles needed)
- Sort buttons: The `<th>` itself acts as button -- `tabindex="0"` added

#### Keyboard

- `Enter`/`Space` on sortable `<th>`: Toggle sort direction (asc -> desc -> none)
- `Tab`: Navigate between sortable headers

#### Sort Algorithm

```
1. On click/activate of th[sort="key"]:
   a. Determine new direction: none -> asc -> desc -> none
   b. Find the `each` directive on tbody > tr (e.g., each="user in users")
   c. Extract array path ("users") and context
   d. If direction is "none": restore original array order
   e. Else:
      - Get type from sort-type or auto-detect
      - Sort array in-place using appropriate comparator
      - If sort-compare expression exists, use custom comparator
   f. Update sort indicator classes on all th[sort] siblings
   g. Update aria-sort attribute
   h. The NoJS reactivity system re-renders the rows automatically
```

**Important:** The original array order must be preserved (snapshot on first sort) so that removing sort restores the original order.

#### Init Logic

```
init(el, name, expr):    // [sortable] on <table>
  1. _injectTableStyles()
  2. el.classList.add("nojs-sortable")
  3. Store reference to table for child directives
  4. NoJS._onDispose(() => cleanup)

init(el, name, expr):    // [sort] on <th>
  1. key = expr
  2. el.setAttribute("tabindex", "0")
  3. el.setAttribute("aria-sort", "none")
  4. type = el.getAttribute("sort-type") || "auto"
  5. Attach click + keydown(Enter/Space) handler:
     -> sortTable(tableEl, key, nextDirection, type)
  6. If sort-default: trigger initial sort
  7. NoJS._onDispose(() => cleanup)

init(el, name, expr):    // [fixed-header] on <thead>
  1. Closest table.classList.add("nojs-fixed-header")

init(el, name, expr):    // [fixed-col] on <th>/<td>
  1. el.classList.add("nojs-fixed-col")
```

#### Acceptance Criteria

- [ ] Clicking sortable header sorts table data (asc -> desc -> none cycle)
- [ ] Sort indicator (triangle) shows current direction
- [ ] Multiple columns sortable, only one active at a time
- [ ] Auto-detects data type (string, number, date) for correct comparison
- [ ] Custom comparator via expression works
- [ ] Removing sort restores original order
- [ ] Fixed header stays visible during vertical scroll
- [ ] Fixed columns stay visible during horizontal scroll
- [ ] Works with dynamic data (each directive re-renders)
- [ ] aria-sort attribute correctly updated
- [ ] Keyboard activation (Enter/Space on header)
- [ ] No DOM reordering -- only data array mutation

---

## 8. Plugin Entry Point Changes

The existing `src/index.js` must be updated to register all new modules:

```js
import { registerDnd, cleanupDnd } from "./dnd/index.js";
import { registerTooltip, cleanupTooltip } from "./tooltip/index.js";
import { registerModal, cleanupModal } from "./modal/index.js";
import { registerDropdown, cleanupDropdown } from "./dropdown/index.js";
import { registerToast, cleanupToast } from "./toast/index.js";
import { registerTabs, cleanupTabs } from "./tabs/index.js";
import { registerSkeleton, cleanupSkeleton } from "./skeleton/index.js";
import { registerSplit, cleanupSplit } from "./split/index.js";
import { registerTree, cleanupTree } from "./tree/index.js";
import { registerStepper, cleanupStepper } from "./stepper/index.js";
import { registerTable, cleanupTable } from "./table/index.js";

const NoJSElements = {
  name: "nojs-elements",

  install(NoJS, options = {}) {
    registerDnd(NoJS, options);
    registerTooltip(NoJS, options);
    registerModal(NoJS, options);
    registerDropdown(NoJS, options);
    registerToast(NoJS, options);
    registerTabs(NoJS, options);
    registerSkeleton(NoJS, options);
    registerSplit(NoJS, options);
    registerTree(NoJS, options);
    registerStepper(NoJS, options);
    registerTable(NoJS, options);
  },

  dispose(NoJS) {
    cleanupDnd();
    cleanupTooltip();
    cleanupModal();
    cleanupDropdown();
    cleanupToast();
    cleanupTabs();
    cleanupSkeleton();
    cleanupSplit();
    cleanupTree();
    cleanupStepper();
    cleanupTable();
  },
};

export default NoJSElements;
```

**Selective Registration Option:** Consider supporting `options.modules` to allow users to register only specific modules:

```js
install(NoJS, options = {}) {
  const modules = options.modules; // e.g., ["dnd", "modal", "toast"]
  if (!modules || modules.includes("dnd")) registerDnd(NoJS, options);
  if (!modules || modules.includes("tooltip")) registerTooltip(NoJS, options);
  // ...
}
```

---

## 9. Test Strategy

### 9.1 Testing Framework

- **Runner:** Jest with `jest-environment-jsdom` (already configured in project)
- **DOM Assertions:** `@testing-library/jest-dom` (already a devDependency)

### 9.2 Test Structure

Each module gets its own test file following the existing DnD test pattern:

```
__tests__/
  _shared/
    popover.test.js
    focus-trap.test.js
    keyboard-nav.test.js
  tooltip.test.js
  modal.test.js
  dropdown.test.js
  toast.test.js
  tabs.test.js
  skeleton.test.js
  split.test.js
  tree.test.js
  stepper.test.js
  table.test.js
```

### 9.3 Test Categories Per Module

Each module test file must cover:

1. **Initialization**
   - Directive registers correctly
   - Style injected once (idempotent)
   - ARIA attributes set on init
   - State initialized

2. **Core Behavior**
   - Primary interaction (click, hover, focus) triggers expected behavior
   - State transitions (open/close, active/inactive, expand/collapse)
   - Expression reactivity (value changes update UI)

3. **Keyboard Navigation**
   - All documented key combinations work
   - Focus management correct (which element has focus after each action)
   - Roving tabindex updates correctly

4. **ARIA Compliance**
   - All required roles present
   - All required states/properties update on interaction
   - `aria-hidden`/`inert` applied to inactive content

5. **Edge Cases**
   - Multiple instances on same page
   - Dynamic content (elements added/removed via NoJS directives)
   - Rapid interactions (debouncing, race conditions)
   - Missing optional attributes (fallback to defaults)

6. **Cleanup**
   - `NoJS._onDispose` removes all listeners
   - Generated DOM elements removed
   - State reset after cleanup
   - No memory leaks (WeakMap/WeakSet for element references)

### 9.4 Popover API Mocking

Since jsdom does not implement the Popover API, tests must mock:

```js
// In test setup
HTMLElement.prototype.showPopover = jest.fn(function () {
  this.toggleAttribute("popover-open", true);
  this.dispatchEvent(new Event("toggle"));
});
HTMLElement.prototype.hidePopover = jest.fn(function () {
  this.removeAttribute("popover-open");
  this.dispatchEvent(new Event("toggle"));
});
HTMLElement.prototype.togglePopover = jest.fn(function () {
  if (this.hasAttribute("popover-open")) this.hidePopover();
  else this.showPopover();
});
```

### 9.5 NoJS Mock

Tests need a lightweight NoJS mock:

```js
const mockNoJS = {
  directive: jest.fn(),
  findContext: jest.fn(() => ({})),
  evaluate: jest.fn((expr, ctx) => eval(expr)),
  _execStatement: jest.fn(),
  _onDispose: jest.fn(),
  _warn: jest.fn(),
  global: jest.fn(),
};
```

---

## 10. Bundle Size Impact

### 10.1 Current Baseline

- DnD module (current total): ~8 KB minified (~3 KB gzip)

### 10.2 Estimated Per-Module Sizes (minified)

| Module | JS Est. | CSS Est. | Total Est. |
|--------|---------|----------|------------|
| `_shared/` utilities | ~1.5 KB | -- | ~1.5 KB |
| Tooltip/Popover | ~2.0 KB | ~0.3 KB | ~2.3 KB |
| Modal | ~2.5 KB | ~0.3 KB | ~2.8 KB |
| Dropdown | ~2.0 KB | ~0.2 KB | ~2.2 KB |
| Toast | ~2.0 KB | ~0.5 KB | ~2.5 KB |
| Tabs | ~1.5 KB | ~0.2 KB | ~1.7 KB |
| Skeleton | ~0.8 KB | ~0.4 KB | ~1.2 KB |
| Split | ~2.0 KB | ~0.3 KB | ~2.3 KB |
| Tree | ~2.0 KB | ~0.3 KB | ~2.3 KB |
| Stepper | ~2.5 KB | ~0.4 KB | ~2.9 KB |
| Sortable Table | ~2.0 KB | ~0.3 KB | ~2.3 KB |
| **Total new** | **~20.8 KB** | **~3.2 KB** | **~24.0 KB** |
| **Total (incl DnD)** | **~28.8 KB** | **~3.5 KB** | **~32.3 KB** |

### 10.3 Gzipped Estimate

~32 KB minified -> estimated ~10-12 KB gzipped (CSS-in-JS strings compress well).

### 10.4 Mitigation

- Tree-shakeable if users import individual modules directly
- Consider offering separate entry points per module: `@no-js-dev/nojs-elements/tooltip`
- All CSS is injected lazily (only when directive is used on page)

---

## 11. Risks & Mitigations

| # | Risk | Impact | Probability | Mitigation |
|---|------|--------|-------------|------------|
| 1 | **Popover API browser support** | Tooltip, Modal, Dropdown, Toast break in older browsers | Medium | Feature-detect with `hasPopoverSupport()`. Provide polyfill guidance in docs. Fallback: use `display:none`/`display:block` toggle + manual light dismiss for non-supporting browsers. |
| 2 | **CSS Anchor Positioning not widely supported** | Tooltip/Popover positioning requires fallback | High | Primary: `getBoundingClientRect()` + manual positioning. Progressive enhancement: use CSS Anchor Positioning when available. |
| 3 | **Bundle size growth** | ~24 KB new code may concern users | Low | Lazy CSS injection (only used modules inject styles). Document tree-shaking. Consider offering per-module imports. |
| 4 | **Popover API conflicts with NoJS `popover` attribute** | NoJS already processes attributes -- native `popover` may conflict | Medium | The `[popover]` directive in this plugin takes over the attribute before the browser sees it. Test thoroughly that setting `popover="auto"` after init works. |
| 5 | **Sortable Table + `each` coupling** | Sort directive must find and mutate the array bound via `each` on `<tbody>` | Medium | Use `NoJS.findContext()` + parse the `each` expression to extract array path. Warn if no `each` found on tbody. |
| 6 | **Focus trap in modals with dynamic content** | NoJS directives inside modal may add/remove focusable elements after trap is set | Medium | Focus trap recalculates focusable elements on each Tab press (not cached). |
| 7 | **Stepper validation integration** | Relies on HTML5 `checkValidity()` and potentially NoJS custom `[validate]` | Low | First pass: HTML5 only. Second pass: integrate with NoJS validation system if present. |
| 8 | **jsdom limitations in tests** | No Popover API, no CSS layout, no IntersectionObserver | High | Mock Popover API in test setup. Test CSS injection by checking style element presence (not computed styles). Test sticky behavior separately in E2E tests. |
| 9 | **Priority conflicts with existing directives** | New directives may conflict with NoJS built-in directive priorities | Low | Document priority ranges clearly. Use 10-29 range (NoJS built-ins use 1-9). Verify no overlap with DnD (currently priority 15). |
| 10 | **Memory leaks from style injection** | Style tags injected but never removed | Very Low | Style tags are singletons (checked before insertion). On plugin `dispose()`, remove all `<style data-nojs-*>` tags. |

---

## Appendix A -- Directive Priority Map (Complete)

```
Priority   Directive            Module
───────────────────────────────────────
10         tabs                 Tabs
10         tree                 Tree
10         stepper              Stepper
10         split                Split
10         sortable             Table
10         modal                Modal
10         dropdown             Dropdown
12         popover              Tooltip
15         drag                 DnD (existing)
15         drop                 DnD (existing)
15         drag-list            DnD (existing)
15         tab                  Tabs
15         panel                Tabs
15         branch               Tree
15         subtree              Tree
15         step                 Stepper
15         pane                 Split
15         sort                 Table
15         dropdown-toggle      Dropdown
15         dropdown-menu        Dropdown
15         dropdown-item        Dropdown
20         tooltip              Tooltip
20         popover-trigger      Tooltip
20         toast-container      Toast
20         toast                Toast
25         skeleton             Skeleton
25         modal-open           Modal
25         modal-close          Modal
25         fixed-header         Table
25         fixed-col            Table
```

---

## Appendix B -- CSS Custom Properties Reference

All custom properties follow the pattern `--nojs-<module>-<property>`.

### Tooltip/Popover
```
--nojs-tooltip-z: 9999
--nojs-tooltip-max-width: 250px
--nojs-tooltip-transition: 0.15s
--nojs-popover-z: 9990
```

### Modal
```
--nojs-modal-z: 10000
--nojs-modal-padding: 1rem
--nojs-modal-backdrop: rgba(0, 0, 0, 0.5)
```

### Dropdown
```
--nojs-dropdown-z: 9980
--nojs-dropdown-min-width: 160px
--nojs-dropdown-max-height: 300px
```

### Toast
```
--nojs-toast-z: 11000
--nojs-toast-gap: 8px
--nojs-toast-container-padding: 1rem
--nojs-toast-min-width: 250px
--nojs-toast-max-width: 400px
--nojs-toast-padding: 12px 16px
```

### Tabs
```
--nojs-tabs-gap: 0
```

### Skeleton
```
--nojs-skeleton-bg: #e0e0e0
--nojs-skeleton-shimmer: rgba(255, 255, 255, 0.4)
--nojs-skeleton-duration: 1.5s
--nojs-skeleton-line-height: 1em
--nojs-skeleton-line-gap: 0.5em
--nojs-skeleton-line-radius: 4px
```

### Split
```
--nojs-gutter-size: 8px
--nojs-gutter-bg: transparent
--nojs-gutter-hover-bg: rgba(0, 0, 0, 0.1)
```

### Tree
```
--nojs-tree-indent: 1.5rem
--nojs-tree-transition: 0.15s
```

### Stepper
```
--nojs-stepper-gap: 0
--nojs-stepper-dot-size: 2rem
--nojs-stepper-connector-min: 2rem
--nojs-stepper-nav-margin: 1rem
```

### Table
```
--nojs-table-header-z: 2
--nojs-table-col-z: 1
```
