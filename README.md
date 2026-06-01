# NoJS Elements

![version](https://img.shields.io/badge/version-1.13.1-blue)

**UI element plugins for No.JS** -- declarative, accessible, zero JavaScript required.

---

## Installation

### NPM

```bash
npm install @erickxavier/nojs-elements
```

### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/@erickxavier/nojs-elements/dist/iife/nojs-elements.js"></script>
```

---

## Usage

### ESM

```javascript
import NoJS from '@erickxavier/no-js';
import NoJSElements from '@erickxavier/nojs-elements';

NoJS.use(NoJSElements);
```

### CDN (Script Tag)

When loaded via `<script>` tag, NoJS Elements auto-installs itself — no `NoJS.use()` call needed:

```html
<script src="https://cdn.no-js.dev/"></script>
<script src="https://cdn.no-js.dev/elements"></script>
<!-- That's it — all elements are ready to use -->
```

---

## Elements

| Element | Directives | Description |
|---------|-----------|-------------|
| [Drag & Drop](docs/md/drag-and-drop.md) | `drag`, `drop`, `drag-list`, `drag-multiple` | Declarative drag-and-drop with sortable lists and multi-select |
| Tooltip | `tooltip` | Positioned tooltips with configurable delay and placement |
| Popover | `popover`, `popover-trigger`, `popover-dismiss` | Rich content popovers with trigger and dismiss controls |
| Modal | `modal`, `modal-open`, `modal-close` | Accessible dialog modals with focus trap and backdrop |
| Dropdown | `dropdown`, `dropdown-toggle`, `dropdown-menu`, `dropdown-item` | Keyboard-navigable dropdown menus |
| Toast | `toast-container`, `toast` | Notification toasts with position, type, duration, and auto-dismiss |
| Tabs | `tabs`, `tab`, `panel`, `tab-disabled`, `tab-position` | Accessible tabbed interfaces with keyboard navigation |
| Tree | `tree`, `branch`, `subtree` | Collapsible tree views with nested branches |
| Stepper | `stepper`, `step` | Multi-step wizards and progress indicators |
| Skeleton | `skeleton` | Loading placeholder skeletons |
| Split / Pane | `split`, `pane` | Resizable split panels (horizontal or vertical) |
| Sortable Table | `sortable`, `sort`, `fixed-header`, `fixed-col` | Column sorting with fixed headers and columns |

---

## Quick Examples

### Drag & Drop

```html
<div state="{ items: ['A', 'B', 'C'] }">
  <div drag-list="items" template="item-tpl" drag-list-key="$index" drop-sort="vertical"></div>
</div>

<template id="item-tpl" var="item">
  <div drag="item"><span bind="item"></span></div>
</template>
```

### Modal

```html
<button modal-open="confirm">Open Dialog</button>

<div modal="confirm">
  <h2>Are you sure?</h2>
  <p>This action cannot be undone.</p>
  <button modal-close="confirm">Close</button>
</div>
```

### Toast

```html
<div toast-container="top-right"></div>

<button toast="File saved!" toast-type="success" toast-duration="3000">
  Save
</button>
```

### Tabs

```html
<div tabs>
  <button tab>Profile</button>
  <button tab>Settings</button>
  <div panel>Profile content here.</div>
  <div panel>Settings content here.</div>
</div>
```

---

## Peer Dependency

This plugin requires **No.JS >= 1.13.0** as a peer dependency.

---

## Documentation

Detailed documentation for each element is available in [`docs/md/`](docs/md/).

For the full directive reference with all attributes, events, CSS classes, and accessibility details, see the [NoJS-Skill directive reference](https://github.com/ErickXavier/nojs-skill/blob/main/references/directives.md#drag-and-drop).

---

## License

[MIT](LICENSE)
