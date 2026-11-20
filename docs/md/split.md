# Split / Pane

## `split` -- Resizable Split Container

```html
<!-- Horizontal split (default) -->
<div split style="height: 400px">
  <div pane="30%">Left panel</div>
  <div pane>Right panel (fills remaining space)</div>
</div>

<!-- Vertical split -->
<div split="vertical" style="height: 600px">
  <div pane="200px">Top panel</div>
  <div pane>Bottom panel</div>
</div>

<!-- Custom gutter size -->
<div split split-gutter="12" style="height: 400px">
  <div pane>Left</div>
  <div pane>Right</div>
</div>

<!-- Persisted layout (restored from localStorage on reload) -->
<div split split-persist="editor-layout" style="height: 100vh">
  <div pane="250px" pane-min="150">Sidebar</div>
  <div pane>Editor</div>
  <div pane="300px">Preview</div>
</div>
```

### Split Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `split` | `"horizontal"` \| `"vertical"` | `"horizontal"` | Split direction. Horizontal places panes side by side; vertical stacks them |
| `split-gutter` | number (px) | `6` | Gutter width (horizontal) or height (vertical) in pixels |
| `split-persist` | string | -- | localStorage key for saving/restoring pane sizes. Stored under `nojs-split:<key>` |

---

## `pane` -- Define a Pane

Each direct child with the `pane` attribute becomes a resizable pane inside a `split` container.

```html
<!-- Fixed initial size -->
<div pane="250px">Fixed 250px</div>

<!-- Percentage initial size -->
<div pane="30%">30% of container</div>

<!-- Flexible (fills remaining space) -->
<div pane>Flexible</div>

<!-- With min/max constraints -->
<div pane="300px" pane-min="150" pane-max="600">
  Constrained between 150px and 600px
</div>

<!-- Collapsible pane (double-click gutter to collapse/expand) -->
<div pane="250px" pane-min="100" pane-collapsible="true">
  Sidebar (double-click gutter to collapse)
</div>
```

### Pane Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `pane` | string (CSS size) | -- | Initial size (`"250px"`, `"30%"`). Omit for flexible fill |
| `pane-min` | number (px) | `0` | Minimum pane size in pixels. Enforced during drag and keyboard resize. When not set, the default of 0 allows panes to be fully collapsed. The gutter always remains visible regardless of pane size |
| `pane-max` | number (px) | `Infinity` | Maximum pane size in pixels |
| `pane-collapsible` | `"true"` | -- | Enables collapse/expand via double-click on the adjacent gutter |

---

## Persisted Layout

When `split-persist` is set, pane sizes are automatically saved to `localStorage` after every resize (drag, keyboard, or collapse). On page load, saved sizes are restored before the initial render.

```html
<div split split-persist="my-app-layout" style="height: 100vh">
  <div pane="200px" pane-min="100" pane-collapsible="true">
    Navigation
  </div>
  <div pane>
    Main content
  </div>
  <div pane="300px" pane-min="200">
    Inspector
  </div>
</div>
```

Sizes are stored under the key `nojs-split:<value>` (e.g., `nojs-split:my-app-layout`). If the number of panes changes between sessions, the stored layout is discarded and attribute defaults are used instead.

---

## Nested Splits

A `[pane]` can contain another `[split]` for complex layouts:

```html
<div split style="height: 100vh">
  <div pane="250px" pane-min="150" pane-collapsible="true">
    Sidebar
  </div>
  <div pane>
    <!-- Vertical split inside a pane -->
    <div split="vertical" style="height: 100%">
      <div pane>Editor</div>
      <div pane="200px" pane-min="100">Terminal</div>
    </div>
  </div>
</div>
```

---

## Events

| Event | `$event.detail` | Description |
|-------|-----------------|-------------|
| `on:split-resize` | `{ prevPane, nextPane }` | Fired after a drag resize ends |
| `on:split-collapse` | `{ pane, collapsed }` | Fired when a pane is collapsed or expanded via double-click |

---

## CSS Classes

No.JS automatically injects these classes:

| Class | When applied |
|-------|-------------|
| `.nojs-split` | On the split container |
| `.nojs-pane` | On each pane element |
| `.nojs-gutter` | On each gutter (separator) element |
| `.nojs-pane[data-collapsed="true"]` | On a collapsed pane |

### CSS Custom Properties

| Property | Default | Description |
|----------|---------|-------------|
| `--nojs-gutter-size` | `6px` | Gutter width/height. Overridden per-element when `split-gutter` is set |

### Default Gutter Styles

The gutter uses `color-mix()` for theme-adaptive coloring:

- **Default:** `color-mix(in srgb, currentColor 10%, transparent)`
- **Hover / Active:** `color-mix(in srgb, currentColor 20%, transparent)`
- **Focus-visible:** `2px solid highlight` outline
- **Horizontal gutter:** `cursor: col-resize`
- **Vertical gutter:** `cursor: row-resize`

---

## Accessibility

No.JS automatically adds:

- `role="separator"` on each gutter element
- `aria-orientation` set to `"vertical"` (for horizontal splits) or `"horizontal"` (for vertical splits), following the WAI-ARIA spec for separator orientation relative to the dividing axis
- `aria-valuenow` reflecting the current size (in px) of the preceding pane
- `aria-valuemin` and `aria-valuemax` based on pane min/max constraints
- `aria-label="Resize"` on each gutter
- `tabindex="0"` for keyboard focus

### Keyboard Navigation

Focus a gutter element, then:

| Key | Action |
|-----|--------|
| `ArrowRight` (horizontal) / `ArrowDown` (vertical) | Expand preceding pane by 10px |
| `ArrowLeft` (horizontal) / `ArrowUp` (vertical) | Shrink preceding pane by 10px |
| `Home` | Collapse preceding pane to its minimum size |
| `End` | Expand preceding pane to its maximum (limited by next pane's minimum) |

All keyboard resizes respect `pane-min` / `pane-max` constraints and trigger persistence when `split-persist` is set.

---

**Next:** [Sortable Table -->](table.md)

---

## Server-Rendered Hosts

This element also runs on hosts that implement the NoJS plugin host API (`NoJS.hostApi >= 1`), where expressions are evaluated on the server and the browser receives rendered HTML. With the CDN core nothing on this page changes. Markup and behavior are the same. A server re-render of the panes' content re-initializes the split, so pane sizes reset unless `split-persist` stores them.
