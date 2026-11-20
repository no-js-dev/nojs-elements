# Dropdown

## `dropdown` — Container

Wraps a toggle, menu, and items into a single dropdown unit. Uses the native Popover API for light-dismiss (clicking outside closes the menu automatically).

```html
<!-- Basic dropdown -->
<div dropdown>
  <button dropdown-toggle>Options</button>
  <ul dropdown-menu>
    <li dropdown-item>Edit</li>
    <li dropdown-item>Duplicate</li>
    <li dropdown-item>Delete</li>
  </ul>
</div>

<!-- Positioned to the right, aligned to end -->
<div dropdown dropdown-position="right" dropdown-align="end">
  <button dropdown-toggle>More</button>
  <ul dropdown-menu>
    <li dropdown-item>Settings</li>
    <li dropdown-item>Logout</li>
  </ul>
</div>
```

### Container Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `dropdown` | boolean attr | *required* | Marks the wrapper element |
| `dropdown-position` | `"bottom"` \| `"top"` \| `"left"` \| `"right"` | `"bottom"` | Primary axis for menu placement |
| `dropdown-align` | `"start"` \| `"end"` | `"start"` | Cross-axis alignment of the menu relative to the toggle |

The menu is positioned with `position: fixed` and automatically flips to the opposite side when it would overflow the viewport.

> **Note:** Because dropdown menus use `position: fixed` with viewport-absolute coordinates, they escape parent `overflow: hidden` containers. This means dropdowns inside scrollable or clipped elements will still display correctly.

---

## `dropdown-toggle` — Trigger Button

The element that opens/closes the dropdown menu on click. Must be inside a `[dropdown]` container.

```html
<div dropdown>
  <button dropdown-toggle>Click me</button>
  <ul dropdown-menu>
    <li dropdown-item>Option A</li>
    <li dropdown-item>Option B</li>
  </ul>
</div>
```

The toggle automatically receives:

- `aria-haspopup="menu"`
- `aria-expanded="true"` / `"false"` (updated on open/close)
- `aria-controls` linked to the menu's `id`

---

## `dropdown-menu` — Popover Menu

The menu panel that appears when the toggle is activated. Uses `popover="auto"` for native light-dismiss behavior.

```html
<div dropdown>
  <button dropdown-toggle>Actions</button>
  <ul dropdown-menu>
    <li dropdown-item>Cut</li>
    <li dropdown-item>Copy</li>
    <li dropdown-item>Paste</li>
  </ul>
</div>
```

The menu automatically receives:

- `popover="auto"` (native Popover API)
- `role="menu"`
- A unique `id` (auto-generated if not provided)
- Class `.nojs-dropdown-menu`

---

## `dropdown-item` — Menu Item

An actionable item inside the dropdown menu. Supports keyboard navigation, disabled state, and automatic ARIA attributes.

```html
<!-- With disabled items -->
<div dropdown>
  <button dropdown-toggle>File</button>
  <ul dropdown-menu>
    <li dropdown-item>New</li>
    <li dropdown-item>Open</li>
    <li dropdown-item disabled>Save (read-only)</li>
    <li dropdown-item>Export</li>
  </ul>
</div>

<!-- With links -->
<div dropdown>
  <button dropdown-toggle>Navigate</button>
  <ul dropdown-menu>
    <a dropdown-item href="/dashboard">Dashboard</a>
    <a dropdown-item href="/settings">Settings</a>
    <a dropdown-item href="/help">Help</a>
  </ul>
</div>
```

### Item Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `dropdown-item` | boolean attr | *required* | Marks the element as a menu item |
| `disabled` | boolean attr | — | Disables the item (skipped during keyboard navigation) |

Each item automatically receives:

- `role="menuitem"`
- `tabindex="-1"`
- Class `.nojs-dropdown-item`
- `aria-disabled="true"` when `disabled` is present

---

## Keyboard Navigation

| Key | On toggle | On item |
|-----|-----------|---------|
| **Enter** / **Space** | Opens menu, focuses first item | Activates item (click) |
| **Arrow Down** | Opens menu, focuses first item | Moves focus to next item (wraps to first) |
| **Arrow Up** | Opens menu, focuses last item | Moves focus to previous item (wraps to last) |
| **Home** | — | Moves focus to first item |
| **End** | — | Moves focus to last item |
| **Escape** | — | Closes menu, returns focus to toggle |
| **Tab** | — | Closes menu, returns focus to toggle |

Disabled items are skipped during arrow-key navigation.

---

## CSS Classes

No.JS automatically injects these classes:

| Class | When applied |
|-------|-------------|
| `.nojs-dropdown-menu` | On the menu element (`[dropdown-menu]`) |
| `.nojs-dropdown-item` | On each item element (`[dropdown-item]`) |
| `.nojs-dropdown-item[aria-disabled="true"]` | On disabled items — `pointer-events: none; opacity: 0.5` |
| `.nojs-dropdown-item:focus-visible` | On the currently focused item (for keyboard navigation styling) |

The menu uses `position: fixed` with `z-index: 9999` and `min-width: max-content`. It repositions on scroll and resize while open.

---

## Accessibility

No.JS automatically adds:

- `aria-haspopup="menu"` on the toggle
- `aria-expanded="true/false"` on the toggle (reflects open state)
- `aria-controls` linking the toggle to the menu
- `role="menu"` on the menu
- `role="menuitem"` on each item
- `tabindex="-1"` on items (roving focus via keyboard)
- `aria-disabled="true"` on disabled items
- Focus is trapped within the menu while open — **Escape** or **Tab** returns focus to the toggle

---

**Next:** [Toast Notifications →](toast.md)

---

## Server-Rendered Hosts

This element also runs on hosts that implement the NoJS plugin host API (`NoJS.hostApi >= 1`), where expressions are evaluated on the server and the browser receives rendered HTML. With the CDN core nothing on this page changes. Markup and behavior are the same. `NoJS.dropdown` is available to page scripts.

A menu without an `id` gets `nojs-dd-menu-<n>`, the lowest number no element of the page uses yet, so the same markup gets the same ids on both hosts. The menu carries the native `popover` attribute, but the [popover](popover.md) directive never initializes on it: the dropdown owns it.
