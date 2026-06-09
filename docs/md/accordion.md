# Accordion

Adds animated expand/collapse behavior to groups of native `<details>` / `<summary>` elements. Because it builds on top of HTML disclosure widgets, the accordion works without JavaScript as a progressive enhancement -- users see a fully functional set of collapsible sections even before NoJS initializes.

## Basic Usage

Wrap one or more `<details>` elements in a container with the `accordion` attribute. Each `<details>` must have a `<summary>` child.

```html
<div accordion>
  <details>
    <summary>Section One</summary>
    <p>Content for section one.</p>
  </details>
  <details>
    <summary>Section Two</summary>
    <p>Content for section two.</p>
  </details>
  <details>
    <summary>Section Three</summary>
    <p>Content for section three.</p>
  </details>
</div>
```

By default only one section can be open at a time (single mode). Opening a section automatically closes the previously open one.

---

## Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `accordion` | `"single"` \| `"multi"` | `"single"` | Controls whether one or multiple sections can be open simultaneously |

---

## Single Mode (Default)

Only one `<details>` can be open at a time. Opening a new section closes the currently open one with an animated transition.

```html
<div accordion>
  <details open>
    <summary>FAQ 1</summary>
    <p>Answer to FAQ 1.</p>
  </details>
  <details>
    <summary>FAQ 2</summary>
    <p>Answer to FAQ 2.</p>
  </details>
</div>
```

---

## Multi Mode

Multiple sections can be open simultaneously. Each section toggles independently.

```html
<div accordion="multi">
  <details>
    <summary>Filters</summary>
    <p>Filter controls here.</p>
  </details>
  <details>
    <summary>Sort Options</summary>
    <p>Sort controls here.</p>
  </details>
  <details>
    <summary>View Settings</summary>
    <p>View settings here.</p>
  </details>
</div>
```

---

## Keyboard Navigation

Focus moves between `<summary>` elements within the accordion container:

| Key | Action |
|-----|--------|
| `ArrowDown` / `ArrowRight` | Move focus to next summary (wraps around) |
| `ArrowUp` / `ArrowLeft` | Move focus to previous summary (wraps around) |
| `Home` | Move focus to first summary |
| `End` | Move focus to last summary |
| `Enter` / `Space` | Toggle the focused section (native `<details>` behavior) |

---

## Events

| Event | Bubbles | Detail | Description |
|-------|---------|--------|-------------|
| `accordion-change` | Yes | `{ element, open, index }` | Dispatched on the accordion container when a section opens or closes |

### Event Detail

| Property | Type | Description |
|----------|------|-------------|
| `element` | `HTMLDetailsElement` | The `<details>` element that changed |
| `open` | boolean | `true` if the section opened, `false` if it closed |
| `index` | number | Zero-based index of the `<details>` among its direct siblings |

```html
<div accordion on:accordion-change="console.log($event.detail)">
  <details>
    <summary>Section A</summary>
    <p>Content A</p>
  </details>
  <details>
    <summary>Section B</summary>
    <p>Content B</p>
  </details>
</div>
```

---

## CSS Custom Properties

| Property | Default | Description |
|----------|---------|-------------|
| `--nojs-accordion-duration` | `0.3s` | Duration of the open/close transition |
| `--nojs-accordion-easing` | `ease` | Easing function for the transition |
| `--nojs-accordion-gap` | `0` | Gap between `<details>` elements |

```css
/* Customize accordion timing and spacing */
.my-accordion {
  --nojs-accordion-duration: 0.25s;
  --nojs-accordion-easing: cubic-bezier(0.4, 0, 0.2, 1);
  --nojs-accordion-gap: 8px;
}
```

---

## CSS Classes

| Class | Applied to | Description |
|-------|-----------|-------------|
| `nojs-accordion-content` | Generated wrapper div | Wraps content after `<summary>` (fallback animation only) |

### Built-in Styles

| Selector | Style |
|----------|-------|
| `[accordion]` | `display: flex; flex-direction: column; gap: var(--nojs-accordion-gap)` |
| `[accordion] > details > summary` | `cursor: pointer; list-style: none` (marker removed) |
| `[accordion] > details > summary::-webkit-details-marker` | `display: none` |
| `[accordion] > details > summary::marker` | `content: none` |

---

## Animation Strategy

The accordion uses two animation strategies depending on browser support:

1. **CSS-native animation (modern browsers):** When the browser supports `interpolate-size: allow-keywords`, the accordion animates the `::details-content` pseudo-element from `block-size: 0` to `block-size: auto` using CSS transitions. This is the most performant path.

2. **Fallback animation (older browsers):** Content after `<summary>` is wrapped in a `.nojs-accordion-content` div. The element measures `scrollHeight` and animates `height` via inline styles and `requestAnimationFrame`.

The strategy is auto-detected at initialization. No configuration is needed.

---

## Accessibility

No.JS automatically applies:

- `role="group"` on the accordion container
- Native `<details>` / `<summary>` semantics provide built-in disclosure behavior
- Keyboard navigation between summaries (arrow keys, Home, End)
- Focus management respects only direct `<summary>` children of direct `<details>` children

---

## Advanced Examples

### Nested Accordions

Accordions can be nested. Each level manages its own open/close state independently.

```html
<div accordion>
  <details>
    <summary>Category A</summary>
    <div accordion="multi">
      <details>
        <summary>Subcategory A.1</summary>
        <p>Content A.1</p>
      </details>
      <details>
        <summary>Subcategory A.2</summary>
        <p>Content A.2</p>
      </details>
    </div>
  </details>
  <details>
    <summary>Category B</summary>
    <p>Content for Category B.</p>
  </details>
</div>
```

### Dynamically Added Sections

The accordion observes its children via `MutationObserver`. Sections added dynamically after initialization are automatically set up with the correct behavior.

```html
<div state="{ sections: [{ title: 'Initial', body: 'First section' }] }">
  <button on:click="sections = sections.concat({ title: 'New', body: 'Added!' })">
    Add Section
  </button>

  <div accordion>
    <details each="s in sections">
      <summary bind="s.title"></summary>
      <p bind="s.body"></p>
    </details>
  </div>
</div>
```

### Pre-opened Section

Use the native `open` attribute to have a section open on page load:

```html
<div accordion>
  <details open>
    <summary>Open by default</summary>
    <p>This section starts open.</p>
  </details>
  <details>
    <summary>Closed by default</summary>
    <p>This section starts closed.</p>
  </details>
</div>
```

### Progressive Enhancement

Because the accordion builds on native `<details>` / `<summary>`, the content is fully accessible and functional even without JavaScript. Without NoJS:

- All sections can be toggled independently (browser default)
- No animation, but content is still accessible

With NoJS:

- Single/multi mode enforcement
- Smooth animated transitions
- Keyboard navigation between summaries
- `accordion-change` events

---

## API Reference

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `accordion` | `"single"` \| `"multi"` | `"single"` | Whether one or multiple sections can be open at a time |

| Event | Detail | Description |
|-------|--------|-------------|
| `accordion-change` | `{ element, open, index }` | Fired when a section opens or closes |

| CSS Custom Property | Default | Description |
|---------------------|---------|-------------|
| `--nojs-accordion-duration` | `0.3s` | Transition duration |
| `--nojs-accordion-easing` | `ease` | Transition easing function |
| `--nojs-accordion-gap` | `0` | Gap between sections |

---

**Next:** [Scroll Spy -->](scroll-spy.md)
