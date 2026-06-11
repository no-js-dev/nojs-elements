# Toast Notifications

## `toast-container` — Position Container

Defines where toast notifications appear on screen. Multiple containers can coexist at different positions. If no container is declared, a default `top-right` container is auto-created on `<body>`.

```html
<!-- Top-right (default) -->
<div toast-container="top-right"></div>

<!-- Bottom-center -->
<div toast-container="bottom-center"></div>

<!-- Multiple containers for different positions -->
<div toast-container="top-right"></div>
<div toast-container="bottom-left"></div>
```

### Container Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `toast-container` | `"top-right"` \| `"top-left"` \| `"bottom-right"` \| `"bottom-left"` \| `"top-center"` \| `"bottom-center"` | `"top-right"` | Screen position for the toast stack |

Each container automatically receives:

- Class `.nojs-toast-container`
- `data-position` attribute matching the position value
- `role="log"`
- `aria-live="polite"`
- `aria-relevant="additions"`

Toasts in **top** positions are prepended (newest on top). Toasts in **bottom** positions are appended (newest on bottom).

---

## `toast` — Declarative Directive

Watches an expression and shows a toast notification whenever the value changes to a truthy value. The expression's string value becomes the toast message.

```html
<!-- Show a toast when `message` changes -->
<div state="{ message: '' }">
  <input model="message" placeholder="Type a message">
  <button on:click="message = 'Hello!'" toast="message"
          toast-type="success"
          toast-duration="5000">
    Show Toast
  </button>
</div>

<!-- Error toast that stays until dismissed -->
<div toast="errorMsg"
     toast-type="error"
     toast-duration="0"
     toast-dismiss="true">
</div>
```

### Declarative Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `toast` | expression | *required* | Watched expression — toast is shown when value changes to truthy |
| `toast-type` | `"info"` \| `"success"` \| `"warning"` \| `"error"` | `"info"` | Visual type of the toast (set as `data-type` on the element) |
| `toast-duration` | number (ms) | `3000` | Auto-dismiss delay. Use `0` for permanent toasts |
| `toast-dismiss` | `"true"` \| `"false"` | `"true"` | Whether to show a dismiss button (`x`) |

---

## `$toast()` — Global Function

Creates a toast notification programmatically from any expression context (e.g., `click`, `submit`, `on:*` handlers).

```html
<!-- Basic usage -->
<button on:click="$toast('Item saved!')">Save</button>

<!-- With type -->
<button on:click="$toast('Deleted', 'error')">Delete</button>

<!-- Custom duration (10 seconds) -->
<button on:click="$toast('Processing...', 'warning', 10000)">Process</button>

<!-- Permanent toast (duration 0) -->
<button on:click="$toast('Connection lost', 'error', 0)">
  Simulate Error
</button>
```

### Signature

```
$toast(message, type?, duration?) → HTMLElement
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `message` | string | *required* | The text content of the toast |
| `type` | `"info"` \| `"success"` \| `"warning"` \| `"error"` | `"info"` | Visual type (set as `data-type` attribute) |
| `duration` | number (ms) | `3000` | Auto-dismiss delay. Use `0` for permanent toasts |

The function always shows a dismiss button. It uses the first registered `toast-container`, or auto-creates a `top-right` container if none exists. Returns the created toast DOM element.

---

## Toast Positions

All six supported positions and their screen placement:

```html
<div toast-container="top-left"></div>     <!-- Fixed top-left corner -->
<div toast-container="top-center"></div>   <!-- Fixed top-center -->
<div toast-container="top-right"></div>    <!-- Fixed top-right corner (default) -->
<div toast-container="bottom-left"></div>  <!-- Fixed bottom-left corner -->
<div toast-container="bottom-center"></div><!-- Fixed bottom-center -->
<div toast-container="bottom-right"></div> <!-- Fixed bottom-right corner -->
```

---

## Auto-Dismiss

Toasts auto-dismiss after their `duration` expires (default: 3000 ms). Setting `duration` to `0` creates a permanent toast that must be dismissed manually via the dismiss button.

```html
<!-- Quick toast (2 seconds) -->
<button on:click="$toast('Quick!', 'info', 2000)">Flash</button>

<!-- Permanent toast -->
<button on:click="$toast('Stay visible', 'warning', 0)">Sticky</button>
```

---

## CSS Classes

No.JS automatically injects these classes:

| Class / Selector | When applied |
|------------------|-------------|
| `.nojs-toast-container` | On each toast container element |
| `.nojs-toast-container[data-position="top-right"]` | Positions the container at the top-right corner |
| `.nojs-toast-container[data-position="top-left"]` | Positions the container at the top-left corner |
| `.nojs-toast-container[data-position="bottom-right"]` | Positions the container at the bottom-right corner |
| `.nojs-toast-container[data-position="bottom-left"]` | Positions the container at the bottom-left corner |
| `.nojs-toast-container[data-position="top-center"]` | Positions the container at the top-center |
| `.nojs-toast-container[data-position="bottom-center"]` | Positions the container at the bottom-center |
| `.nojs-toast` | On each individual toast element |
| `.nojs-toast[data-type="info"]` | Style hook for info toasts |
| `.nojs-toast[data-type="success"]` | Style hook for success toasts |
| `.nojs-toast[data-type="warning"]` | Style hook for warning toasts |
| `.nojs-toast[data-type="error"]` | Style hook for error toasts |
| `.nojs-toast-dismiss` | On the dismiss (`x`) button inside a toast |

The container uses `position: fixed`, `z-index: 10001`, and `max-width: min(24rem, calc(100vw - 2rem))`. Each toast uses `popover="manual"` for stacking.

---

## Accessibility

No.JS automatically adds:

- `role="log"` on toast containers
- `aria-live="polite"` on toast containers (new toasts are announced)
- `aria-relevant="additions"` on toast containers
- `aria-live="assertive"` on error toasts (announced immediately by screen readers)
- `aria-label="Dismiss"` on the dismiss button

---

**Previous:** [Dropdown →](dropdown.md)
