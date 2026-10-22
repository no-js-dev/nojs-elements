# Modal

## `modal` -- Declare a Modal Dialog

Uses the native Popover API (`popover="manual"`) for overlay behavior, combined with focus trapping, stacking z-index, and ARIA attributes.

```html
<!-- Basic modal -->
<button modal-open="confirm-delete">Delete account</button>

<div modal="confirm-delete">
  <h2>Are you sure?</h2>
  <p>This action cannot be undone.</p>
  <button modal-close>Cancel</button>
  <button modal-close on:click="deleteAccount()">Confirm</button>
</div>

<!-- Modal with dynamic NoJS content -->
<button modal-open="edit-user">Edit Profile</button>

<div modal="edit-user" modal-class="dialog-wide">
  <h2>Edit <span bind="user.name"></span></h2>
  <form>
    <input model="user.name" />
    <input model="user.email" />
    <button modal-close on:click="save()">Save</button>
    <button modal-close>Cancel</button>
  </form>
</div>

<!-- Modal with Escape disabled -->
<div modal="critical-action" modal-escape="false">
  <h2>Processing...</h2>
  <p>Please wait while we complete the operation.</p>
  <button modal-close>Done</button>
</div>

<!-- Nested modals -->
<button modal-open="outer-modal">Open</button>

<div modal="outer-modal">
  <h2>Outer Modal</h2>
  <p>This is the first modal.</p>
  <button modal-open="inner-modal">Open Inner</button>
  <button modal-close>Close</button>
</div>

<div modal="inner-modal">
  <h2>Inner Modal</h2>
  <p>This is a nested modal. It stacks above the outer one.</p>
  <button modal-close>Close Inner</button>
</div>

<!-- Modal without backdrop -->
<div modal="no-backdrop" modal-backdrop="false">
  <h2>Transparent Overlay</h2>
  <p>No dark backdrop behind this modal.</p>
  <button modal-close>Close</button>
</div>
```

### Modal Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `modal` | string (ID) | — | Unique ID linking this modal to its triggers. When the attribute is empty (no value), a unique ID is auto-generated |
| `modal-class` | string | -- | Additional CSS class(es) applied while the modal is open |
| `modal-escape` | `"true"` \| `"false"` | `"true"` | Set to `"false"` to disable closing with Escape key and prevent backdrop click from closing |
| `modal-backdrop` | `"true"` \| `"false"` | `"true"` | Set to `"false"` to remove the dark backdrop overlay |

---

## `modal-open` -- Open a Modal

Binds a click handler that opens the target modal by ID. Pushes the modal onto the stack for nested modal support and stores the trigger reference for focus restoration.

```html
<button modal-open="my-dialog">Open Dialog</button>

<!-- Any element can be a trigger -->
<a href="#" modal-open="help-modal">Need help?</a>
```

### Modal-Open Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `modal-open` | string (ID) | — | The `modal` ID to open. Without a value, finds the nearest modal in the same scope (proximity-based) |

---

## `modal-close` -- Close a Modal

Without a value, closes the closest ancestor modal. With a value, closes the specific modal by ID (useful for closing from outside the modal).

```html
<!-- Close the parent modal -->
<button modal-close>Cancel</button>

<!-- Close a specific modal by ID (from anywhere) -->
<button modal-close="settings-modal">Close Settings</button>
```

### Modal-Close Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `modal-close` | string (ID) \| empty | -- | Without value: closes closest ancestor `[modal]`. With value: closes the modal with that ID |

---

## CSS Classes

No.JS automatically injects these styles (once, via `<style data-nojs-modal>`):

| Class | When Applied |
|-------|-------------|
| `.nojs-modal` | On all modal elements |
| `.nojs-modal::backdrop` | Native backdrop overlay (dark semi-transparent) |

### Built-in Modal Styles

```css
.nojs-modal {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  margin: 0;
  border: none;
  padding: 0;
  max-width: 100dvw;
  max-height: 100dvh;
  background: transparent;
}
.nojs-modal::backdrop {
  background: rgb(0 0 0 / 0.5);
}
.nojs-modal[data-nojs-no-backdrop]::backdrop {
  background: transparent;
}
```

Override these classes in your own stylesheet to customize the modal appearance and backdrop.

---

## Template Usage

Define a `<template>` containing a `<div modal>` and instantiate it with `use` and `var-*` attributes to create parameterized modals:

```html
<template id="confirm-tpl">
  <div modal>
    <h2 bind="title"></h2>
    <p bind="message"></p>
    <button modal-close>Cancel</button>
    <button modal-close on:click="confirmed = true">Confirm</button>
  </div>
</template>

<div state="{ confirmed: false }">
  <div use="confirm-tpl"
       var-title="'Delete account?'"
       var-message="'This action cannot be undone.'">
  </div>
  <button modal-open>Delete account</button>
  <p show="confirmed">Account deleted.</p>
</div>
```

The confirm button writes `confirmed` on the enclosing `state`, so each instance reports back through its own flag. Write `var-*` names in lowercase: HTML lowercases attribute names, so `var-confirmLabel` creates `confirmlabel`. A `var-*` value is evaluated once, when the template is instantiated; an arrow function passed as a callback cannot assign state (`() => { done = true }` does nothing).

---

## Stacking (Nested Modals)

Modals are managed with an internal stack. Each new modal opens above the previous one:

- Base z-index starts at `10000`
- Each stacked modal increments by `1` (10001, 10002, ...)
- When a modal closes, it is removed from the stack and focus returns to its trigger

---

## Accessibility

No.JS automatically adds:

- `role="dialog"` on the modal element
- `aria-modal="true"` on the modal element
- `aria-labelledby` on the modal, pointing to the first heading (`h1`-`h6`) inside
- `aria-haspopup="dialog"` on trigger buttons (`modal-open`)
- `aria-expanded="true/false"` on triggers, synced with open/close state
- `aria-controls` on triggers, pointing to the modal element's `id`
- Auto-generated `id` on the modal (`nojs-modal-{name}`) if none is set
- `data-modal-id` attribute set on the modal element for identification
- Auto-generated `id` on the first heading for `aria-labelledby` linking

### Keyboard Navigation

- **Tab** cycles forward through focusable elements inside the modal (focus trap)
- **Shift+Tab** cycles backward through focusable elements
- **Escape** closes the topmost modal (unless `modal-escape="false"`)
- On open, focus moves to the first focusable element inside the modal
- On close, focus returns to the trigger element that opened the modal

### Focus Trap

The focus trap considers these elements focusable:

- `a[href]`
- `button:not([disabled])`
- `input:not([disabled])`
- `select:not([disabled])`
- `textarea:not([disabled])`
- `[tabindex]:not([tabindex="-1"])`

Only visible elements (`offsetParent !== null`) are included in the tab cycle.

---

**Previous:** [Tooltip & Popover](tooltip.md)
