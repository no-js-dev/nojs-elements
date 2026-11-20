# Tooltip & Popover

## `tooltip` -- Show a Tooltip on Hover/Focus

```html
<!-- Basic tooltip -->
<button tooltip="Save your changes">Save</button>

<!-- Positioned below -->
<button tooltip="More options" tooltip-position="bottom">Menu</button>

<!-- Custom delay (500ms) -->
<button tooltip="Delete this item" tooltip-delay="500">Delete</button>

<!-- Tooltip on an icon -->
<span tooltip="Notifications" tooltip-position="right">&#x1F514;</span>
```

### Tooltip Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `tooltip` | string | *required* | The text content displayed in the tooltip |
| `tooltip-position` | `"top"` \| `"bottom"` \| `"left"` \| `"right"` | `"top"` | Placement relative to the trigger element |
| `tooltip-delay` | number (ms) | `300` | Delay in milliseconds before the tooltip appears |
| `tooltip-disabled` | expression | — | Reactive boolean expression. When truthy, prevents tooltip from showing |

---

## CSS Classes

| Class | When Applied |
|-------|-------------|
| `.nojs-tooltip` | On the generated tooltip element (injected via `<style data-nojs-tooltip>`) |

Override in your own stylesheet to customize appearance (background, color, padding, border-radius, etc.).

---

## Accessibility

- `role="tooltip"` on the tooltip element
- `aria-hidden="true/false"` reflecting visibility state
- `aria-describedby` on the trigger, pointing to the tooltip `id`
- **Escape** dismisses a visible tooltip when the trigger has focus
- Tooltips show on `focusin` and hide on `focusout`, making them keyboard-accessible

---

## Positioning

Tooltips are positioned using viewport-aware calculations:

1. Placed relative to the trigger based on the `tooltip-position` attribute
2. An 8px gap separates the tooltip from the trigger
3. The position is clamped to keep a 4px margin from viewport edges

---

**Next:** [Popover -->](popover.md)

---

## Server-Rendered Hosts

This element also runs on hosts that implement the NoJS plugin host API (`NoJS.hostApi >= 1`), where expressions are evaluated on the server and the browser receives rendered HTML. With the CDN core nothing on this page changes. Markup and behavior are the same; `tooltip-disabled` is evaluated on the server, and a change hides a visible tooltip.
