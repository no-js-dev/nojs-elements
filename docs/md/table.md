# Sortable Table

## `sortable` -- Enable Table Sorting

Add to a `<table>` to enable column sorting. Works with the `each` directive in `<tbody>` -- sorting mutates the data array in context, and `each` automatically re-renders the rows.

```html
<div state="{ users: [
  { name: 'Alice', age: 30, email: 'alice@example.com' },
  { name: 'Bob', age: 25, email: 'bob@example.com' },
  { name: 'Carol', age: 35, email: 'carol@example.com' }
] }">
  <table sortable>
    <thead>
      <tr>
        <th sort="name">Name</th>
        <th sort="age" sort-type="number">Age</th>
        <th sort="email">Email</th>
        <th>Actions</th> <!-- no sort = not sortable -->
      </tr>
    </thead>
    <tbody>
      <tr each="user in users">
        <td bind="user.name"></td>
        <td bind="user.age"></td>
        <td bind="user.email"></td>
        <td><button on:click="alert(user.name)">View</button></td>
      </tr>
    </tbody>
  </table>
</div>
```

### Sortable Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `sortable` | boolean attr | -- | Enables sort coordination on the table. Adds `.nojs-sortable` class |

---

## `sort` -- Sortable Column

Place on a `<th>` inside a `sortable` table. The attribute value is the property key used for sorting.

```html
<!-- String sort (default) -->
<th sort="name">Name</th>

<!-- Numeric sort -->
<th sort="age" sort-type="number">Age</th>

<!-- Date sort -->
<th sort="createdAt" sort-type="date">Created</th>

<!-- Default sort direction on load -->
<th sort="name" sort-default="asc">Name</th>
<th sort="score" sort-type="number" sort-default="desc">Score</th>
```

### Sort Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `sort` | string | *required* | Property key to sort by (e.g., `"name"`, `"age"`) |
| `sort-type` | `"string"` \| `"number"` \| `"date"` | `"string"` | Comparator type. `string` uses `localeCompare`, `number` uses numeric comparison, `date` parses with `new Date()` |
| `sort-default` | `"asc"` \| `"desc"` | -- | Initial sort direction applied on page load |

### Sort Cycling

Clicking a column header cycles through three states:

1. **Ascending** -- `data-sort-dir="asc"`, displays &#9650;
2. **Descending** -- `data-sort-dir="desc"`, displays &#9660;
3. **None** -- removes `data-sort-dir`, restores original array order

Clicking a different column resets the previous column and starts at ascending.

### Typed Sorting

| `sort-type` | Behavior |
|-------------|----------|
| `"string"` | `String(a).localeCompare(String(b))` -- locale-aware alphabetical |
| `"number"` | `Number(a) - Number(b)` -- numeric comparison |
| `"date"` | `new Date(a).getTime() - new Date(b).getTime()` -- chronological |

`null` and `undefined` values sort before all other values.

---

## `fixed-header` -- Sticky Table Header

Place on `<thead>` to make it stick to the top of its scroll container.

```html
<div style="height: 400px; overflow: auto">
  <table sortable>
    <thead fixed-header>
      <tr>
        <th sort="name">Name</th>
        <th sort="age" sort-type="number">Age</th>
      </tr>
    </thead>
    <tbody>
      <tr each="user in users">
        <td bind="user.name"></td>
        <td bind="user.age"></td>
      </tr>
    </tbody>
  </table>
</div>
```

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `fixed-header` | boolean attr | -- | Applies `position: sticky; top: 0` to the `<thead>` |

---

## `fixed-col` -- Sticky Column

Place on `<th>` and/or `<td>` elements to pin a column to the left edge during horizontal scrolling.

```html
<div style="width: 600px; overflow: auto">
  <table sortable>
    <thead fixed-header>
      <tr>
        <th sort="name" fixed-col>Name</th>
        <th sort="age" sort-type="number">Age</th>
        <th sort="email">Email</th>
        <th sort="department">Department</th>
      </tr>
    </thead>
    <tbody>
      <tr each="user in users">
        <td fixed-col bind="user.name"></td>
        <td bind="user.age"></td>
        <td bind="user.email"></td>
        <td bind="user.department"></td>
      </tr>
    </tbody>
  </table>
</div>
```

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `fixed-col` | boolean attr | -- | Applies `position: sticky; left: 0` to the element |

When `fixed-header` and `fixed-col` intersect (top-left cell), z-index stacking is handled automatically (`z-index: 3`) so the cell stays above both the scrolling header and column.

---

## CSS Classes

No.JS automatically injects these classes:

| Class | When applied |
|-------|-------------|
| `.nojs-sortable` | On the `<table>` with `sortable` |
| `.nojs-fixed-header` | On the `<thead>` with `fixed-header` |
| `.nojs-fixed-col` | On each `<th>`/`<td>` with `fixed-col` |

### Data Attributes on `<th>`

| Attribute | Values | Description |
|-----------|--------|-------------|
| `data-sortable` | (presence) | Marks a `<th>` as sortable (set automatically by `sort`) |
| `data-sort-dir` | `"asc"` \| `"desc"` | Current sort direction on the active column. Removed when unsorted |

### Sort Indicator Styles

Sort indicators are rendered via CSS `::after` pseudo-elements:

| State | `::after` content | Opacity |
|-------|-------------------|---------|
| Unsorted | &#8693; (up-down arrows) | 0.3 |
| Ascending | &#9650; (up triangle) | 1 |
| Descending | &#9660; (down triangle) | 1 |

### Z-Index Stacking

| Element | `z-index` |
|---------|-----------|
| `.nojs-fixed-col` | 1 |
| `.nojs-fixed-header` | 2 |
| `.nojs-fixed-header .nojs-fixed-col` | 3 |

---

## Accessibility

No.JS automatically adds:

- `aria-sort="none"` on each `<th>` with `sort` (initial state)
- `aria-sort="ascending"` when sorted ascending
- `aria-sort="descending"` when sorted descending
- `data-sortable` attribute for styling hooks
- `cursor: pointer` and `user-select: none` on sortable headers

Sorting is triggered by clicking column headers. Only one column can be sorted at a time -- clicking a new column resets all others to `aria-sort="none"`.

### How Sorting Works

The `sort` directive does **not** reorder DOM nodes. Instead, it mutates the data array in the NoJS context. The `each` directive detects the change and re-renders the `<tbody>` rows automatically. When sort is reset to "none", the original array order (captured before the first sort) is restored.

---

## Row Reorder (DnD)

> Requires NoJS Elements with the DnD module. See the [migration guide](migration-from-core.md) if upgrading from Core-only DnD.

Add `table-reorder` to a `<table>` to enable drag-and-drop row reordering. Works with `each`-bound tables — reordering mutates the backing data array in context, and `each` automatically re-renders the rows.

```html
<div state="{ users: [
  { id: 1, name: 'Alice', role: 'Admin' },
  { id: 2, name: 'Bob', role: 'Editor' },
  { id: 3, name: 'Carol', role: 'Viewer' }
] }">
  <table sortable table-reorder>
    <thead>
      <tr>
        <th sort="name">Name</th>
        <th sort="role">Role</th>
      </tr>
    </thead>
    <tbody>
      <tr each="user in users">
        <td bind="user.name"></td>
        <td bind="user.role"></td>
      </tr>
    </tbody>
  </table>
</div>
```

### Reorder Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `table-reorder` | boolean attr | *required* | Enables drag-and-drop row reordering on the table |
| `table-reorder-handle` | CSS selector | — | Restricts the drag handle to a child element within each row (e.g., `".grip"`) |
| `table-reorder-drag-class` | string | `"nojs-row-dragging"` | CSS class applied to the row being dragged |
| `table-reorder-over-class` | string | `"nojs-row-drag-over"` | CSS class applied to rows during hover |

### Handle Example

```html
<table sortable table-reorder table-reorder-handle=".grip">
  <thead>
    <tr>
      <th></th>
      <th sort="name">Name</th>
      <th sort="role">Role</th>
    </tr>
  </thead>
  <tbody>
    <tr each="user in users">
      <td><span class="grip" style="cursor: grab">&#x2630;</span></td>
      <td bind="user.name"></td>
      <td bind="user.role"></td>
    </tr>
  </tbody>
</table>
```

### Events

| Event | `$event.detail` | Description |
|-------|-----------------|-------------|
| `table:reorder` | `{ from, to, item }` | Dispatched on the `<table>` after a row is reordered. `from` and `to` are array indices, `item` is the moved data object |

```html
<table sortable table-reorder
       on:table:reorder="console.log('Moved from', $event.detail.from, 'to', $event.detail.to)">
  ...
</table>
```

### Interaction with Column Sort

When a table has both `sortable` and `table-reorder`:

- Reordering updates the backing array and invalidates the sort's original-order cache
- If a column sort is active, dragging reorders the visually sorted rows and the new order persists in the data array
- Resetting sort (clicking the sorted column a third time) restores the new reordered array, not the pre-drag order

### CSS Classes

| Class | When applied |
|-------|-------------|
| `.nojs-row-dragging` | On the `<tr>` being dragged |
| `.nojs-reorder-insert-before` | On a `<tr>` showing an insertion line above |
| `.nojs-reorder-insert-after` | On a `<tr>` showing an insertion line below |

### Accessibility

- `draggable="true"` is set on each `<tr>` in the tbody
- `aria-grabbed="true/false"` reflects the drag state on each row

---

**Previous:** [Split / Pane &larr;](split.md)
