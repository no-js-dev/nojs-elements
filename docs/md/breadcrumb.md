# Breadcrumb

Generates an accessible breadcrumb trail from either manually declared child elements or automatic route tracking via the NoJS router. The element builds a semantic `<ol>` with `<li>` items, marks the last crumb as the current page, and separates items with a CSS pseudo-element.

## Basic Usage

### Manual Mode

Provide child `<a>` or `<button>` elements inside the container. The element reads them, hides the originals, and generates a structured `<ol>` breadcrumb.

```html
<nav breadcrumb>
  <a href="/">Home</a>
  <a href="/products">Products</a>
  <a href="/products/widgets">Widgets</a>
</nav>
```

### Auto-Track Mode

When the container has no child elements and `NoJS.router` is available, the breadcrumb automatically generates crumbs from the current route path.

```html
<!-- Generates crumbs from the current URL path -->
<nav breadcrumb></nav>
```

For a path like `/settings/account/security`, this produces:

| Crumb | Href |
|-------|------|
| Home | `/` |
| Settings | `/settings` |
| Account | `/settings/account` |
| Security | `/settings/account/security` |

The last crumb is rendered as non-clickable text with `aria-current="page"`.

---

## Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `breadcrumb` | string (on container) | -- | Declares the element as a breadcrumb container. The value is ignored for the container; use on child elements to set a custom label (see Label Priority). |

---

## Label Priority

When reading crumb labels from child elements, the following priority order applies:

1. **`breadcrumb` attribute value** -- highest priority
2. **`title` attribute value** -- second priority
3. **Text content** -- fallback

```html
<nav breadcrumb>
  <a href="/" breadcrumb="Home Page">Home</a>
  <a href="/docs" title="Documentation">Docs</a>
  <a href="/docs/api">API Reference</a>
</nav>
```

| Element | Label used | Source |
|---------|-----------|--------|
| First `<a>` | "Home Page" | `breadcrumb` attribute |
| Second `<a>` | "Documentation" | `title` attribute |
| Third `<a>` | "API Reference" | text content |

---

## Auto-Track Mode

Auto-track mode activates when both conditions are met:

1. The container has no child elements (empty or whitespace-only)
2. `NoJS.router` exists

The element subscribes to route changes via `NoJS.router.on(fn)` and rebuilds the breadcrumb on every navigation. Path segments are converted to labels by replacing hyphens and underscores with spaces and capitalizing the first letter.

```html
<div state="{}">
  <nav breadcrumb></nav>
  <!-- With route /user-settings/billing-info, renders: -->
  <!-- Home / User settings / Billing info -->
</div>
```

When the route is `/` (root), a single "Home" crumb is rendered.

---

## Manual Mode

Manual mode activates when the container has child elements. The original children are hidden (`display: none`) and used as a data source to build the `<ol>` structure.

```html
<nav breadcrumb>
  <a href="/">Home</a>
  <a href="/shop" breadcrumb="Our Shop">Products</a>
  <button breadcrumb="Current Item">Detail Page</button>
</nav>
```

The `href` attribute on each child determines the link target. If no `href` is present, `#` is used as the default.

---

## CSS Custom Properties

| Property | Default | Description |
|----------|---------|-------------|
| `--nojs-breadcrumb-separator` | `" / "` | Content of the separator between crumbs (CSS `content` value) |
| `--nojs-breadcrumb-gap` | `0.5em` | Spacing between crumbs and separators |
| `--nojs-breadcrumb-active-color` | `inherit` | Text color of the current (last) crumb |

```css
/* Arrow separators with custom spacing */
.my-breadcrumb {
  --nojs-breadcrumb-separator: " > ";
  --nojs-breadcrumb-gap: 0.75em;
  --nojs-breadcrumb-active-color: #1E293B;
}

/* Unicode chevron separator */
.chevron-breadcrumb {
  --nojs-breadcrumb-separator: "\203A";
}
```

---

## CSS Classes

| Class | Applied to | Description |
|-------|-----------|-------------|
| `nojs-breadcrumb` | Generated `<ol>` element | The breadcrumb list container |

### Built-in Styles

| Selector | Style |
|----------|-------|
| `.nojs-breadcrumb` | `display: flex; align-items: center; flex-wrap: wrap; list-style: none; margin: 0; padding: 0; font-size: 0.875rem` |
| `.nojs-breadcrumb li` | `display: flex; align-items: center; gap: var(--nojs-breadcrumb-gap)` |
| `.nojs-breadcrumb li + li::before` | Separator via `content: var(--nojs-breadcrumb-separator); color: #94A3B8` |
| `.nojs-breadcrumb a` | `color: #0EA5E9; text-decoration: none; transition: color 0.15s` |
| `.nojs-breadcrumb a:hover` | `color: #0284C7; text-decoration: underline` |
| `.nojs-breadcrumb [aria-current="page"]` | `color: var(--nojs-breadcrumb-active-color); font-weight: 500; pointer-events: none` |

---

## Accessibility

No.JS automatically applies:

- `aria-label="Breadcrumb"` on the container when it is a `<nav>` element (if not already set)
- Semantic `<ol>` / `<li>` structure for the breadcrumb trail
- `aria-current="page"` on the last crumb (rendered as a `<span>`, not a link)
- All non-last crumbs are rendered as `<a>` elements for keyboard navigation

---

## Advanced Examples

### Breadcrumb with Custom Separator

```html
<style>
  .arrow-crumbs {
    --nojs-breadcrumb-separator: "\2192";
    --nojs-breadcrumb-gap: 1em;
  }
</style>

<nav breadcrumb class="arrow-crumbs">
  <a href="/">Home</a>
  <a href="/category">Category</a>
  <a href="/category/item">Current Item</a>
</nav>
```

### Auto-Track with Router

```html
<!-- The NoJS router must be configured for auto-track to work -->
<div state="{}">
  <header>
    <nav breadcrumb></nav>
  </header>

  <main route="/">
    <p>Home page</p>
  </main>
  <main route="/products">
    <p>Products page</p>
  </main>
  <main route="/products/:id">
    <p>Product detail page</p>
  </main>
</div>
```

### Styled Breadcrumb

```html
<style>
  .custom-crumbs {
    --nojs-breadcrumb-separator: "|";
    --nojs-breadcrumb-gap: 1em;
    --nojs-breadcrumb-active-color: #334155;
  }
  .custom-crumbs .nojs-breadcrumb a {
    color: #64748B;
    text-transform: uppercase;
    font-size: 0.75rem;
    letter-spacing: 0.05em;
  }
  .custom-crumbs .nojs-breadcrumb a:hover {
    color: #0EA5E9;
  }
</style>

<nav breadcrumb class="custom-crumbs">
  <a href="/">Home</a>
  <a href="/dashboard">Dashboard</a>
  <a href="/dashboard/analytics">Analytics</a>
</nav>
```

---

## API Reference

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `breadcrumb` | string (on container) | -- | Declares the breadcrumb container. On child elements, sets a custom label. |

| CSS Custom Property | Default | Description |
|---------------------|---------|-------------|
| `--nojs-breadcrumb-separator` | `" / "` | Separator content between crumbs |
| `--nojs-breadcrumb-gap` | `0.5em` | Spacing between crumbs and separators |
| `--nojs-breadcrumb-active-color` | `inherit` | Color of the current (last) crumb |

| ARIA Attribute | Applied to | Description |
|----------------|-----------|-------------|
| `aria-label="Breadcrumb"` | Container `<nav>` | Accessible name for the breadcrumb navigation |
| `aria-current="page"` | Last crumb `<span>` | Marks the current page in the trail |

---
