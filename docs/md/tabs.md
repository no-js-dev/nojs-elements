# Tabs

## `tabs` — Tab Container

```html
<!-- Basic tabs (first tab active by default) -->
<div tabs>
  <button tab>Profile</button>
  <button tab>Settings</button>
  <button tab>Billing</button>

  <div panel>Profile content...</div>
  <div panel>Settings content...</div>
  <div panel>Billing content...</div>
</div>

<!-- Activate a specific tab (0-based index) -->
<div tabs="2">
  <button tab>Tab A</button>
  <button tab>Tab B</button>
  <button tab>Tab C</button>

  <div panel>Panel A</div>
  <div panel>Panel B</div>
  <div panel>Panel C (active)</div>
</div>
```

### Tabs Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `tabs` | number (0-based index) | `0` | Initial active tab index |
| `tab-position` | `"top"` \| `"bottom"` \| `"left"` \| `"right"` | `"top"` | Placement of the tab list relative to panels |

---

## `tab` — Tab Button

Marks a direct child of `[tabs]` as a tab trigger. Each `[tab]` is paired with a `[panel]` by order.

```html
<div tabs>
  <button tab>Enabled</button>
  <button tab tab-disabled="true">Disabled</button>
  <button tab>Also enabled</button>

  <div panel>First panel</div>
  <div panel>Second panel (unreachable)</div>
  <div panel>Third panel</div>
</div>
```

### Tab Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `tab` | boolean attr | *required* | Marks the element as a tab trigger |
| `tab-disabled` | expression | `false` | When truthy, the tab cannot be activated |

---

## `panel` — Tab Panel

Marks a direct child of `[tabs]` as a panel. Panels are paired with tabs by order: the first `[tab]` controls the first `[panel]`, the second controls the second, and so on.

```html
<div tabs>
  <button tab>Overview</button>
  <button tab>Details</button>

  <div panel>
    <h2>Overview</h2>
    <p bind="summary"></p>
  </div>
  <div panel>
    <h2>Details</h2>
    <ul>
      <li each="item in items" bind="item.name"></li>
    </ul>
  </div>
</div>
```

### Panel Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `panel` | boolean attr | *required* | Marks the element as a tab panel |

---

## Tab Positions

Use `tab-position` to control where the tab list appears relative to the panels.

```html
<!-- Tabs on top (default) -->
<div tabs tab-position="top">
  <button tab>One</button>
  <button tab>Two</button>
  <div panel>Panel One</div>
  <div panel>Panel Two</div>
</div>

<!-- Tabs on the bottom -->
<div tabs tab-position="bottom">
  <button tab>One</button>
  <button tab>Two</button>
  <div panel>Panel One</div>
  <div panel>Panel Two</div>
</div>

<!-- Tabs on the left (vertical) -->
<div tabs tab-position="left">
  <button tab>One</button>
  <button tab>Two</button>
  <div panel>Panel One</div>
  <div panel>Panel Two</div>
</div>

<!-- Tabs on the right (vertical) -->
<div tabs tab-position="right">
  <button tab>One</button>
  <button tab>Two</button>
  <div panel>Panel One</div>
  <div panel>Panel Two</div>
</div>
```

---

## Disabled Tabs

Disabled tabs are skipped by keyboard navigation and cannot be activated by click.

```html
<div state="{ locked: true }">
  <div tabs>
    <button tab>Open</button>
    <button tab tab-disabled="locked">Locked</button>
    <button tab>Also open</button>

    <div panel>Accessible panel</div>
    <div panel>This panel cannot be reached</div>
    <div panel>Also accessible</div>
  </div>
</div>
```

If the initial tab (index `0` or the value of `tabs`) is disabled, the next enabled tab is activated automatically.

---

## Keyboard Navigation

| Key | Action |
|-----|--------|
| `ArrowRight` / `ArrowDown` | Move to next enabled tab (wraps around) |
| `ArrowLeft` / `ArrowUp` | Move to previous enabled tab (wraps around) |
| `Home` | Move to first enabled tab |
| `End` | Move to last enabled tab |
| `Tab` | Move focus from the tab list into the active panel |

---

## CSS Classes

No.JS automatically injects these classes:

| Class | When applied |
|-------|-------------|
| `.nojs-tabs` | On the `[tabs]` container |
| `.nojs-tablist` | On the generated `role="tablist"` wrapper |
| `.nojs-tab` | On each `[tab]` element |
| `.nojs-panel` | On each `[panel]` element |

The container also receives a `data-position` attribute matching the `tab-position` value, which you can use for custom styling:

```css
/* Custom vertical tab styling */
.nojs-tabs[data-position="left"] .nojs-tablist {
  border-right: 2px solid #ccc;
}
```

### Built-in Style Behavior

| Selector | Style |
|----------|-------|
| `.nojs-tab[aria-disabled="true"]` | `pointer-events: none; opacity: 0.5` |
| `.nojs-panel[aria-hidden="true"]` | `display: none` |
| `.nojs-tabs[data-position="left"]`, `[data-position="right"]` | Horizontal layout (`flex-direction: row`) |
| `.nojs-tabs[data-position="bottom"]` | Reversed column layout |
| `.nojs-tabs[data-position="left/right"] .nojs-tablist` | Vertical tab list (`flex-direction: column`) |

---

## Accessibility

No.JS automatically adds:

- `role="tablist"` on the generated tab list wrapper
- `role="tab"` on each tab, with `aria-selected` and `aria-controls` pointing to its panel
- `role="tabpanel"` on each panel, with `aria-labelledby` pointing to its tab
- `tabindex="0"` on the active tab, `tabindex="-1"` on inactive tabs (roving tabindex)
- `tabindex="0"` on each panel for keyboard access
- `aria-hidden="true"` and `inert` on inactive panels (prevents focus and screen reader access)
- `aria-disabled="true"` on disabled tabs

---

**Next:** [Tree →](tree.md)

---

## Server-Rendered Hosts

This element also runs on hosts that implement the NoJS plugin host API (`NoJS.hostApi >= 1`), where expressions are evaluated on the server and the browser receives rendered HTML. With the CDN core nothing on this page changes. Markup and behavior are the same; `tab-disabled` is evaluated on the server. A server re-render of the tabs keeps the selected tab and the generated ids.
