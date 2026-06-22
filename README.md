# NoJS Elements

[![CI](https://github.com/no-js-dev/nojs-elements/actions/workflows/ci.yml/badge.svg)](https://github.com/no-js-dev/nojs-elements/actions/workflows/ci.yml)
![version](https://img.shields.io/github/v/tag/no-js-dev/nojs-elements?label=version)
[![jsDelivr hits](https://data.jsdelivr.com/v1/package/gh/no-js-dev/nojs-elements/badge)](https://www.jsdelivr.com/package/gh/no-js-dev/nojs-elements)

**UI element plugins for No.JS** — declarative, accessible, zero JavaScript required.

---

## Installation

Add both script tags to your HTML — NoJS Core first, then Elements:

```html
<script src="https://cdn.no-js.dev/"></script>
<script src="https://cdn-elements.no-js.dev/"></script>
<!-- That's it — all elements are ready to use -->
```

NoJS Elements auto-installs itself when loaded via `<script>` tag — no `NoJS.use()` call needed.

---

## Elements

| Element | Directives | Description |
|---------|-----------|-------------|
| [Drag & Drop](docs/md/drag-and-drop.md) | `drag`, `drop`, `drag-list`, `drag-multiple` | Declarative drag-and-drop with sortable lists and multi-select |
| [Form Validation](docs/md/validation.md) | `validate`, `validate-on`, `validate-if`, `error-*`, `$form` | Declarative form validation with per-rule errors, async support, and `$form` context |
| [Tooltip](docs/md/tooltip.md) | `tooltip` | Positioned tooltips with configurable delay and placement |
| [Popover](docs/md/popover.md) | `popover`, `popover-trigger`, `popover-dismiss` | Rich content popovers with trigger and dismiss controls |
| [Modal](docs/md/modal.md) | `modal`, `modal-open`, `modal-close` | Accessible dialog modals with focus trap and backdrop |
| [Dropdown](docs/md/dropdown.md) | `dropdown`, `dropdown-toggle`, `dropdown-menu`, `dropdown-item` | Keyboard-navigable dropdown menus |
| [Toast](docs/md/toast.md) | `toast-container`, `toast` | Notification toasts with position, type, duration, and auto-dismiss |
| [Tabs](docs/md/tabs.md) | `tabs`, `tab`, `panel`, `tab-disabled`, `tab-position` | Accessible tabbed interfaces with keyboard navigation |
| [Tree](docs/md/tree.md) | `tree`, `branch`, `subtree`, `tree-drag-mode` | Collapsible tree views with nested branches and drag-and-drop |
| [Stepper](docs/md/stepper.md) | `stepper`, `step`, `stepper-validate` | Multi-step wizards with validation gate and progress indicators |
| [Skeleton](docs/md/skeleton.md) | `skeleton` | Loading placeholder skeletons |
| [Split / Pane](docs/md/split.md) | `split`, `pane` | Resizable split panels (horizontal or vertical) |
| [Sortable Table](docs/md/table.md) | `sortable`, `sort`, `fixed-header`, `fixed-col`, `table-reorder` | Column sorting with fixed headers, columns, and row reorder |
| [Accordion](docs/md/accordion.md) | `accordion` | Animated expand/collapse on native `<details>` elements |
| [Breadcrumb](docs/md/breadcrumb.md) | `breadcrumb` | Accessible breadcrumb trail with manual or auto-track mode |
| [Scroll Spy](docs/md/scroll-spy.md) | `spy`, `spy-offset`, `spy-threshold` | Highlights navigation links based on visible sections |
| [Virtual List](docs/md/virtual-list.md) | `virtual-height`, `virtual-buffer` | Efficient rendering of large datasets with DOM virtualization |

> `drag`, `drop`, `drag-list`, `drag-multiple`, and `validate` were migrated out of No.JS core in **v1.13.0**. Core retains deprecation stubs — install this plugin for full functionality.

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

For the full directive reference with all attributes, events, CSS classes, and accessibility details, see the [NoJS-Skill element references](https://github.com/no-js-dev/nojs-skill/blob/main/nojs/references/elements/).

---

## Ecosystem

| Tool | Description |
|------|-------------|
| [No.JS](https://github.com/no-js-dev/nojs) | Core HTML-first reactive framework (peer dependency) |
| **NoJS Elements** | This package — UI element plugins |
| [NoJS-LSP](https://github.com/no-js-dev/nojs-lsp) | VS Code extension — autocomplete, hover docs, diagnostics |
| [NoJS-Skill](https://github.com/no-js-dev/nojs-skill) | Claude Code skill — guided No.JS project generation |

---

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

```bash
npm install            # install dependencies
npm run build          # esbuild → dist/{iife,esm,cjs}/nojs-elements.js
npm test               # Jest unit tests
cd e2e && npx playwright test   # E2E tests (Playwright)
```

- [Changelog](CHANGELOG.md)

## License

[MIT](LICENSE)

---

<p align="center">
  <strong>NoJS Elements</strong> — UI element plugins for No.JS<br>
  <code>MIT License</code>
</p>
