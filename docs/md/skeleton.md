# Skeleton

## `skeleton` — Loading Placeholder

Displays a shimmer animation over any element while a reactive expression is truthy. When the expression becomes falsy, the skeleton fades out and reveals the real content underneath.

```html
<!-- Basic text skeleton (active while `loading` is truthy) -->
<h2 skeleton="loading">Article Title</h2>
<p skeleton="loading">This paragraph appears after loading completes.</p>

<!-- Circle avatar placeholder -->
<div skeleton="loading" skeleton-type="circle" skeleton-size="64"></div>

<!-- Multi-line text placeholder -->
<div skeleton="loading" skeleton-lines="3"></div>

<!-- Rectangular card placeholder -->
<div skeleton="loading" skeleton-type="rect" skeleton-size="200"></div>
```

### Skeleton Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `skeleton` | expression | *required* | Reactive expression — shows the skeleton placeholder while truthy |
| `skeleton-type` | `"text"` \| `"circle"` \| `"rect"` | `"text"` | Shape of the placeholder. `text` renders full-width rounded bars, `circle` renders a circular placeholder, `rect` renders a rectangular placeholder |
| `skeleton-lines` | number | — | Number of simulated text lines to generate. Each line is a shimmer bar; the last line is 60% width for a natural look |
| `skeleton-size` | number \| string | — | Explicit dimension (width and height) for `circle` or `rect` types. Appends `px` if the value is a bare number |

---

## Reactive Loading Skeleton

The skeleton directive is fully reactive. It watches the expression via `$watch` and toggles automatically:

```html
<div state="{ loading: true, user: null }">
  <!-- Skeleton activates immediately, disappears when `loading` turns false -->
  <div skeleton="loading" skeleton-lines="2" style="width: 300px; min-height: 48px;">
    <h3 bind="user.name"></h3>
    <p bind="user.email"></p>
  </div>

  <!-- call stores the response as `user`; then runs after it arrives -->
  <button call="/api/user" as="user" on:click="loading = true" then="loading = false">
    Load User
  </button>
</div>
```

When `loading` is `true`:
- Real children become invisible (`opacity: 0`, `pointer-events: none`)
- A shimmer animation plays over the element via `::after`
- The element's original dimensions are maintained

When `loading` becomes `false`:
- The `.nojs-skeleton` class is removed
- A `.nojs-skeleton-fade` transition class fades the skeleton out
- Real content is revealed

---

## Text Skeleton

The default type. Useful for paragraphs, headings, and any text content.

```html
<!-- Single element — shimmer covers the full element area -->
<p skeleton="loading" style="min-height: 1.2em; width: 200px;">
  Real text content here
</p>

<!-- Multi-line placeholder (generates line divs inside the element) -->
<div skeleton="loading" skeleton-lines="4" style="width: 400px;"></div>
```

Each generated line (`.nojs-skeleton-line`) is `0.8em` tall with `0.6em` bottom margin. The last line is `60%` width to create a realistic paragraph shape.

---

## Circle Avatar Skeleton

```html
<div state="{ loadingAvatar: true }">
  <!-- 64px circular placeholder -->
  <div skeleton="loadingAvatar" skeleton-type="circle" skeleton-size="64"
       style="border-radius: 50%;">
    <img src="" bind:src="avatarUrl" alt="Avatar" />
  </div>
</div>
```

The `circle` type adds `.nojs-skeleton-circle`, which forces a circular `border-radius: 50%` on the `::after` overlay. The `skeleton-size` attribute sets both `width` and `height`.

---

## Card Skeleton

Combine multiple skeleton elements for card layouts:

```html
<div state="{ loading: true, post: null }">
  <div class="card" style="padding: 16px; max-width: 400px;">
    <!-- Avatar -->
    <div skeleton="loading" skeleton-type="circle" skeleton-size="48"
         style="border-radius: 50%; margin-bottom: 12px;">
      <img bind:src="post.authorAvatar" alt="" />
    </div>

    <!-- Title -->
    <h3 skeleton="loading" style="min-height: 1.5em;">
      <span bind="post.title"></span>
    </h3>

    <!-- Body text -->
    <div skeleton="loading" skeleton-lines="3" style="min-height: 72px;">
      <p bind="post.body"></p>
    </div>
  </div>
</div>
```

---

## CSS Classes

No.JS Elements automatically injects these classes via `<style data-nojs-skeleton>`:

| Class | When applied |
|-------|-------------|
| `.nojs-skeleton` | On the element while the skeleton is active |
| `.nojs-skeleton > *` | Children become invisible (`opacity: 0`, `pointer-events: none`) |
| `.nojs-skeleton::after` | Shimmer animation overlay (linear-gradient sweep) |
| `.nojs-skeleton-circle` | Applied with `skeleton-type="circle"` — forces `border-radius: 50%` on the overlay |
| `.nojs-skeleton-fade` | Transition class added during deactivation (`opacity 0.3s ease`) |
| `.nojs-skeleton-line` | Generated text line placeholders (`0.8em` height, `0.6em` margin) |
| `.nojs-skeleton-line:last-child` | Last line is `60%` width for a natural paragraph look |

### Shimmer Animation

The shimmer uses `@keyframes nojs-shimmer` — a `linear-gradient` that sweeps from right to left over `1.5s` with `ease-in-out` timing, repeating infinitely. The gradient uses `color-mix(in srgb, currentColor %, transparent)` for automatic dark mode compatibility: the shimmer adapts to the element's inherited `color` without extra configuration.

---

## Accessibility

No.JS Elements automatically adds:

- `aria-busy="true"` on the element while the skeleton is active
- `aria-busy` is removed when the skeleton deactivates
- Children are hidden from interaction via `pointer-events: none` while loading

---

**Previous:** [Stepper](stepper.md)
