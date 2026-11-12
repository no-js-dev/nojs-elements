# Drag and Drop

> The DnD module is included in NoJS Elements. When using the CDN, it is auto-installed — no separate registration is needed. For ESM usage, call `NoJS.use(NoJSElements)` once.

## `drag` — Make an Element Draggable

```html
<!-- Basic draggable -->
<div drag="item">Drag me</div>

<!-- With type (for filtering drop zones) -->
<div drag="task" drag-type="task">Task card</div>

<!-- With handle (only the grip icon starts a drag) -->
<div drag="item" drag-handle=".grip">
  <span class="grip">&#x2801;&#x2801;</span>
  <span bind="item.name"></span>
</div>

<!-- Disabled state (reactive) -->
<div drag="item" drag-disabled="isLocked">Locked item</div>
```

### Drag Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `drag` | expression | *required* | The value being dragged |
| `drag-type` | string | `"default"` | Named type — only matching `drop-accept` zones respond |
| `drag-effect` | `"copy"` \| `"move"` \| `"link"` | `"move"` | Maps to `dataTransfer.effectAllowed` |
| `drag-handle` | CSS selector | — | Restricts the grab area to a child element |
| `drag-image` | CSS selector \| `"none"` | — | Custom drag ghost element |
| `drag-image-offset` | `"x,y"` | `"0,0"` | Pixel offset for custom drag image |
| `drag-disabled` | expression | `false` | When truthy, disables dragging |
| `drag-class` | string | `"nojs-dragging"` | Class added while dragging |
| `drag-ghost-class` | string | — | Class added to the drag image element |
| `drag-group` | string | — | Group name for multi-select |

---

## `drop` — Define a Drop Zone

```html
<!-- Basic drop zone -->
<div drop="items = [...items, $drag]"
     drop-accept="task">
  Drop tasks here
</div>

<!-- With sortable index -->
<div drop="items.splice($dropIndex, 0, $drag)"
     drop-accept="task"
     drop-sort="vertical"
     drop-placeholder="auto">
</div>

<!-- Max capacity -->
<div drop="slots = [...slots, $drag]"
     drop-accept="*"
     drop-max="3">
  Max 3 items
</div>
```

### Drop Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `drop` | statement | *required* | Expression executed on drop |
| `drop-accept` | string (comma-separated) | `"default"` | Accepted `drag-type`(s). Use `"*"` for any |
| `drop-effect` | `"copy"` \| `"move"` \| `"link"` | `"move"` | Maps to `dataTransfer.dropEffect` |
| `drop-class` | string | `"nojs-drag-over"` | Class added when valid item hovers |
| `drop-reject-class` | string | `"nojs-drop-reject"` | Class added when item is rejected (wrong type or max exceeded) |
| `drop-disabled` | expression | `false` | When truthy, disables dropping |
| `drop-max` | expression (number) | `Infinity` | Max items the zone accepts |
| `drop-sort` | `"vertical"` \| `"horizontal"` \| `"grid"` | — | Enables sortable reorder by position |
| `drop-placeholder` | template ID \| `"auto"` | — | Shows a placeholder at insertion point |
| `drop-placeholder-class` | string | `"nojs-drop-placeholder"` | Class for the placeholder |
| `drop-settle-class` | string | `"nojs-drop-settle"` | Custom CSS class for the settle animation |
| `drop-empty-class` | string | `"nojs-drag-list-empty"` | Custom CSS class for empty state on drop zone |

---

## Element-Level Events (`drag`/`drop`)

The `drag` and `drop` directives dispatch CustomEvents on their host elements at each stage of the drag-and-drop lifecycle. Listen with `on:<event>`.

| Event | Bubbles | `$event.detail` | Description |
|-------|---------|-----------------|-------------|
| `nojs:dnd-start` | yes | `{ item, index, el }` | Fired on the `[drag]` element when a drag begins |
| `nojs:dnd-end` | yes | `{ item, index, dropped }` | Fired on the `[drag]` element when the drag ends. `dropped` is `true` if the item was successfully dropped |
| `nojs:dnd-enter` | no | `{ item, type }` | Fired on the `[drop]` zone when a valid draggable enters it |
| `nojs:dnd-leave` | no | `{ item }` | Fired on the `[drop]` zone when the draggable leaves |
| `nojs:dnd-over` | no | `{ item, index }` | Fired on a sortable `[drop]` zone as the item moves over it. `index` is the current insertion position |
| `nojs:dnd-drop` | no | `{ item, index, source, target, effect }` | Fired on the `[drop]` zone after the drop expression executes. `source`/`target` contain `{ list, index, el }` |

```html
<!-- React to drag lifecycle -->
<div drag="task"
     on:nojs:dnd-start="console.log('Started dragging', $event.detail.item)"
     on:nojs:dnd-end="console.log('Dropped?', $event.detail.dropped)">
  Drag me
</div>

<div drop="items = [...items, $drag]"
     drop-accept="default"
     on:nojs:dnd-enter="console.log('Item entered zone')"
     on:nojs:dnd-leave="console.log('Item left zone')"
     on:nojs:dnd-drop="console.log('Dropped!', $event.detail.item)">
  Drop here
</div>
```

---

## `drag-list` — Sortable List

High-level shorthand for sortable lists bound to arrays. Combines `each` + `drag` + `drop` in one element.

```html
<!-- Basic sortable list -->
<div drag-list="tasks"
     template="task-tpl"
     drag-list-key="id"
     drop-sort="vertical">
</div>

<!-- Two-list transfer (Kanban) -->
<div state="{ todo: [...], done: [] }">
  <div drag-list="todo"
       template="task-tpl"
       drag-list-key="id"
       drag-type="task"
       drop-accept="task"
       drop-sort="vertical"
       drag-list-remove
       on:nojs:dnd-reorder="console.log('reordered')">
  </div>

  <div drag-list="done"
       template="task-tpl"
       drag-list-key="id"
       drag-type="task"
       drop-accept="task"
       drop-sort="vertical"
       drag-list-remove
       on:nojs:dnd-receive="console.log('received', $event.detail.item)">
  </div>
</div>

<template id="task-tpl">
  <div class="card">
    <span bind="item.title"></span>
  </div>
</template>
```

### Drag-List Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `drag-list` | path | *required* | Path to array in state |
| `template` | template ID | — | Template for each item (same as `each`) |
| `drag-list-key` | property name | — | Unique key per item for stable identity |
| `drag-list-item` | variable name | `"item"` | Loop variable name in template |
| `drop-sort` | `"vertical"` \| `"horizontal"` \| `"grid"` | `"vertical"` | Layout direction |
| `drop-accept` | string | *self* | Types accepted (defaults to same list only) |
| `drag-list-copy` | boolean attr | — | Copy items instead of moving |
| `drag-list-remove` | boolean attr | — | Remove items when dragged out |
| `drag-disabled` | expression | `false` | Disables dragging from this list |
| `drop-disabled` | expression | `false` | Disables dropping into this list |
| `drop-max` | expression (number) | `Infinity` | Max items allowed |
| `drop-settle-class` | string | `"nojs-drop-settle"` | Custom CSS class for the settle animation |
| `drop-empty-class` | string | `"nojs-drag-list-empty"` | Custom CSS class for empty state on drag-list |
| `drop-placeholder` | template ID \| `"auto"` | — | Shows a placeholder where the item will be dropped |

### Drag-List Events

| Event | `$event.detail` | Description |
|-------|-----------------|-------------|
| `on:nojs:dnd-reorder` | `{ list, item, from, to }` | Item reordered within same list |
| `on:nojs:dnd-receive` | `{ list, item, from, fromList }` | Item received from another list |
| `on:nojs:dnd-remove` | `{ list, item, index }` | Item removed (dragged out) |

> Before v1.15.0 these events were named `drag-start`, `drag-end`, `drag-enter`, `drag-leave`, `drag-over`, `drop`, `reorder`, `receive` and `remove`. The old names are no longer dispatched: replace `on:drag-start` with `on:nojs:dnd-start`, `on:reorder` with `on:nojs:dnd-reorder`, and so on. A listener on `on:drop` still runs, because the browser fires its native `drop` event, but that event has no `$event.detail`.

---

## `drag-multiple` — Multi-Select

Enables click-to-select before dragging multiple items as a group.

```html
<div each="card in cards"
     drag="card"
     drag-type="card"
     drag-group="kanban"
     drag-multiple>
  <span bind="card.title"></span>
</div>
```

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `drag-multiple` | boolean attr | — | Enables click-to-select |
| `drag-multiple-class` | string | `"nojs-selected"` | Class added to selected items |
| `drag-group` | string | *required* | Group name — all selected items move together |

- **Click** selects a single item (replaces previous selection)
- **Ctrl/Cmd+Click** adds to selection
- **Escape** clears the selection
- When dragging a selected item, `$drag` becomes an **array** of all selected items

---

## Implicit Variables

Available inside `drop` expressions:

| Variable | Type | Description |
|----------|------|-------------|
| `$drag` | any | The dragged value. Array if multi-select |
| `$dragType` | string | The `drag-type` of the item |
| `$dragEffect` | string | The `drag-effect` |
| `$dropIndex` | number | Insertion index within the drop zone |
| `$source` | object \| null | `{ list, index, el }` — source info |
| `$target` | object \| null | `{ list, index, el }` — target info |

---

## CSS Classes

No.JS automatically injects these classes:

| Class | When applied |
|-------|-------------|
| `.nojs-dragging` | On the source element while dragging |
| `.nojs-drag-over` | On the drop zone while a valid item hovers |
| `.nojs-drop-reject` | On the drop zone when the item is rejected (wrong type or max exceeded) |
| `.nojs-drop-placeholder` | On the insertion placeholder |
| `.nojs-selected` | On multi-selected items |
| `.nojs-drop-settle` | Brief settle animation on drop |
| `.nojs-drag-list-empty` | On a `drag-list` when it has no items |

---

## Accessibility

No.JS automatically adds:

- `draggable="true"` on drag sources
- `aria-grabbed="true/false"` reflecting drag state
- `aria-dropeffect` on drop zones
- `role="listbox"` on `drag-list` containers
- `role="option"` on `drag-list` items
- `tabindex="0"` for keyboard access
- **Space** to grab, **Escape** to cancel, **Arrow keys** to navigate, **Enter** to drop

---

**Next:** [Stepper →](stepper.md)
