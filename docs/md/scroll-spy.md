# Scroll Spy

Highlights navigation links based on which section of the page is currently visible in the viewport. As the user scrolls, the spy element pointing to the topmost visible section receives an `.active` class and `aria-current="true"`. Only one spy element is active at a time within a group.

## Basic Usage

### With Anchor Links

For `<a>` elements, the target section is read from the `href` attribute. No additional attribute is needed beyond the hash link itself.

```html
<nav>
  <a href="#introduction">Introduction</a>
  <a href="#features">Features</a>
  <a href="#installation">Installation</a>
  <a href="#api">API</a>
</nav>

<section id="introduction">...</section>
<section id="features">...</section>
<section id="installation">...</section>
<section id="api">...</section>
```

NoJS automatically registers spy behavior on `<a>` elements with hash hrefs. The `spy` directive is applied implicitly.

### With Buttons or Other Elements

For non-anchor elements, use the `spy` attribute to specify the target section ID:

```html
<nav>
  <button spy="#introduction">Introduction</button>
  <button spy="#features">Features</button>
  <button spy="#installation">Installation</button>
</nav>

<section id="introduction">...</section>
<section id="features">...</section>
<section id="installation">...</section>
```

The `#` prefix is optional:

```html
<button spy="features">Features</button>
<!-- equivalent to -->
<button spy="#features">Features</button>
```

---

## Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `spy` | string | -- | Target section ID (with or without `#` prefix). For `<a>` elements, the `href` attribute is used instead. |
| `spy-offset` | number | `0` | Pixel offset from the top of the viewport. Use to compensate for fixed headers. |
| `spy-threshold` | number (0--1) | `0.1` | Fraction of the target section that must be visible to trigger activation. |

---

## Offset for Fixed Headers

When the page has a fixed header or sticky navigation, use `spy-offset` to shift the detection zone downward. The value is in pixels.

```html
<!-- Compensate for an 80px fixed header -->
<nav style="position: fixed; top: 0; height: 80px;">
  <a href="#section1" spy-offset="80">Section 1</a>
  <a href="#section2" spy-offset="80">Section 2</a>
  <a href="#section3" spy-offset="80">Section 3</a>
</nav>
```

The offset is applied as a negative `rootMargin` on the `IntersectionObserver`, effectively pushing the top detection boundary down by the specified number of pixels.

**Note:** The offset and threshold are per-group. The values from the first spy element in the group are used for all elements in that group.

---

## Threshold

The `spy-threshold` attribute controls how much of a section must be visible before it triggers activation. Values range from `0` (any pixel visible) to `1` (entire section visible).

```html
<!-- Require at least 30% of the section to be visible -->
<a href="#features" spy-threshold="0.3">Features</a>
```

---

## Grouping

Spy elements that share the same nearest scrollable ancestor (or the document root) are grouped together. Within a group, only one spy element is `.active` at a time -- the one whose target section is closest to the top of the viewport.

This means multiple independent scroll containers can each have their own independent spy group.

---

## CSS Classes

| Class | When applied |
|-------|-------------|
| `.active` | On the spy element whose target section is the topmost visible section |

### Built-in Styles

| Selector | Style |
|----------|-------|
| `[spy].active` | `font-weight: 600` |
| `a[href^="#"].active` | `font-weight: 600` |

These minimal built-in styles provide basic visual feedback. Override them to match your design:

```css
/* Custom active style */
nav a.active {
  color: var(--primary);
  border-left: 3px solid var(--primary);
  padding-left: 12px;
  font-weight: 700;
}
```

---

## Accessibility

- The active spy element receives `aria-current="true"`.
- When a spy element is deactivated, `aria-current` is removed entirely (not set to `"false"`).
- No roles are injected on the spy elements or target sections -- the existing semantic structure is preserved.

---

## Dynamic Targets

If a target section is added to the DOM after the spy element is initialized, a `MutationObserver` watches for it and begins observing it automatically once it appears.

```html
<nav>
  <a href="#lazy-section">Lazy Section</a>
</nav>

<!-- This section is added later via dynamic rendering -->
<div state="{ showSection: false }">
  <button on:click="showSection = true">Load Section</button>
  <section id="lazy-section" show="showSection">
    <p>This section was loaded dynamically.</p>
  </section>
</div>
```

---

## Advanced Examples

### Sidebar Navigation with Offset

```html
<div style="display: flex;">
  <nav style="position: sticky; top: 60px; align-self: flex-start; width: 200px;">
    <a href="#overview" spy-offset="60">Overview</a>
    <a href="#setup" spy-offset="60">Setup</a>
    <a href="#configuration" spy-offset="60">Configuration</a>
    <a href="#advanced" spy-offset="60">Advanced</a>
    <a href="#troubleshooting" spy-offset="60">Troubleshooting</a>
  </nav>

  <main>
    <section id="overview"><h2>Overview</h2><p>...</p></section>
    <section id="setup"><h2>Setup</h2><p>...</p></section>
    <section id="configuration"><h2>Configuration</h2><p>...</p></section>
    <section id="advanced"><h2>Advanced</h2><p>...</p></section>
    <section id="troubleshooting"><h2>Troubleshooting</h2><p>...</p></section>
  </main>
</div>
```

### Mixed Link and Button Spies

```html
<nav>
  <a href="#intro">Introduction</a>
  <button spy="details">Details</button>
  <a href="#contact">Contact</a>
</nav>

<section id="intro">...</section>
<section id="details">...</section>
<section id="contact">...</section>
```

### Scroll Spy with NoJS Tabs

Combine scroll spy with in-page sections for a docs-style layout where the navigation tracks scroll position rather than tab clicks:

```html
<nav>
  <a href="#props" spy-offset="64" spy-threshold="0.2">Props</a>
  <a href="#events" spy-offset="64" spy-threshold="0.2">Events</a>
  <a href="#css" spy-offset="64" spy-threshold="0.2">CSS</a>
  <a href="#examples" spy-offset="64" spy-threshold="0.2">Examples</a>
</nav>

<article>
  <section id="props"><h2>Props</h2><!-- ... --></section>
  <section id="events"><h2>Events</h2><!-- ... --></section>
  <section id="css"><h2>CSS</h2><!-- ... --></section>
  <section id="examples"><h2>Examples</h2><!-- ... --></section>
</article>
```

---

## API Reference

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `spy` | string | -- | Target section ID. For `<a>` elements, read from `href` instead. |
| `spy-offset` | number | `0` | Pixel offset from viewport top (compensate for fixed headers) |
| `spy-threshold` | number (0--1) | `0.1` | Fraction of target section required to be visible |

| Class | Description |
|-------|-------------|
| `.active` | Applied to the spy element whose target is the topmost visible section |

| ARIA Attribute | Description |
|----------------|-------------|
| `aria-current="true"` | Set on the active spy element; removed when deactivated |

---

**Next:** [Breadcrumb -->](breadcrumb.md)
