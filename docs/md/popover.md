# Popover

## `popover` -- Declare Popover Content

```html
<!-- Popover with trigger and dismiss -->
<button popover-trigger="user-menu">Account</button>

<div popover="user-menu">
  <nav>
    <a href="/profile">Profile</a>
    <a href="/settings">Settings</a>
    <button popover-dismiss>Close</button>
  </nav>
</div>

<!-- Popover positioned to the right -->
<button popover-trigger="help-tip">?</button>

<div popover="help-tip" popover-position="right">
  <p>Click here for more information about this feature.</p>
  <button popover-dismiss>Got it</button>
</div>
```

### Popover Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `popover` | string (ID) | auto | Unique ID linking this element to its trigger(s). Auto-generated if omitted |
| `popover-position` | `"top"` \| `"bottom"` \| `"left"` \| `"right"` | `"bottom"` | Placement relative to the trigger element |

---

## `popover-trigger` -- Open a Popover

Binds a click handler that toggles the target popover open/closed. When no ID is provided, it finds the nearest popover in the same scope automatically (proximity-based).

```html
<!-- Explicit ID -->
<button popover-trigger="my-popover">Toggle</button>

<!-- Proximity-based (finds nearest popover sibling) -->
<button popover-trigger>Toggle</button>
```

### Popover-Trigger Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `popover-trigger` | string (ID) | auto | The `popover` ID to toggle. Finds nearest popover if omitted |

---

## `popover-dismiss` -- Close a Popover from Inside

Place inside a `[popover]` element. On click, it closes the closest ancestor popover.

```html
<div popover="info-panel">
  <p>Some content here.</p>
  <button popover-dismiss>Dismiss</button>
</div>
```

---

## CSS Classes

| Class | When Applied |
|-------|-------------|
| `.nojs-popover` | On popover elements (injected via `<style data-nojs-popover>`) |

Override in your own stylesheet to customize appearance.

---

## Accessibility

- `aria-haspopup="true"` on popover triggers
- `aria-expanded="true/false"` on triggers, synced with open/close state
- `aria-controls` on triggers, pointing to the popover ID
- Uses the native Popover API (`popover="auto"`), which provides **light dismiss** -- clicking outside closes it automatically

---

## Positioning

Popovers are positioned using viewport-aware calculations:

1. Placed relative to the trigger based on the `popover-position` attribute
2. An 8px gap separates the popover from the trigger
3. Flip logic: if the popover overflows the viewport, it flips to the opposite side
4. The position is clamped to keep a 4px margin from viewport edges

---

**Next:** [Modal -->](modal.md)

---

## Server-Rendered Hosts

This element also runs on hosts that implement the NoJS plugin host API (`NoJS.hostApi >= 1`), where expressions are evaluated on the server and the browser receives rendered HTML. With the CDN core nothing on this page changes. Markup and behavior are the same. `NoJS.popover` is available to page scripts.
