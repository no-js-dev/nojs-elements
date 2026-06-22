# Migration Guide: DnD and Validation from Core to Elements

Starting with version 1.13.0, the **Drag and Drop** (`drag`, `drop`, `drag-list`, `drag-multiple`) and **Validation** (`validate`) directives have moved from NoJS Core to NoJS Elements. This guide covers what changed, what stayed the same, and how to migrate.

## What Moved

| Directive | Priority | Source | Destination |
|-----------|----------|--------|-------------|
| `drag` | 15 | `@no-js-dev/nojs` | `@no-js-dev/nojs-elements` |
| `drop` | 15 | `@no-js-dev/nojs` | `@no-js-dev/nojs-elements` |
| `drag-list` | 10 | `@no-js-dev/nojs` | `@no-js-dev/nojs-elements` |
| `drag-multiple` | 16 | `@no-js-dev/nojs` | `@no-js-dev/nojs-elements` |
| `validate` | 30 | `@no-js-dev/nojs` | `@no-js-dev/nojs-elements` |

## What Stays in Core

These related features remain in NoJS Core and require no changes:

- `NoJS.validator(name, fn)` — custom validator registration API
- `error-boundary` — directive for error handling
- All other directives (state, bind, model, get, post, if, each, on:*, route, etc.)

NoJS Core >= 1.13.0 includes **stub directives** for `drag`, `drop`, `drag-list`, `drag-multiple`, and `validate`. If you use these directives without loading NoJS Elements, you will see a console warning:

```
[NoJS] "drag" requires @no-js-dev/nojs-elements. Install and call NoJS.use(NoJSElements).
```

The stubs ensure your app does not throw errors — the directives are silently skipped with a warning.

## Version Requirements

| Package | Minimum Version |
|---------|----------------|
| `@no-js-dev/nojs` | `>= 1.13.0` |
| `@no-js-dev/nojs-elements` | `>= 1.13.0` |

Both packages must be at version 1.13.0 or later. Earlier versions of NoJS Elements do not include the DnD and Validation modules, and earlier versions of Core do not have the stub mechanism.

---

## CDN Users

### Before (Core only)

```html
<script src="https://cdn.no-js.dev/"></script>

<form validate>
  <input name="email" validate="required|email" />
  <button type="submit">Send</button>
</form>

<div drag="item" drag-type="task">Drag me</div>
<div drop="tasks.push($drag)" drop-accept="task">Drop here</div>
```

### After (Core + Elements)

```html
<script src="https://cdn.no-js.dev/"></script>
<script src="https://cdn-elements.no-js.dev/"></script>

<form validate>
  <input name="email" validate="required|email" />
  <button type="submit">Send</button>
</form>

<div drag="item" drag-type="task">Drag me</div>
<div drop="tasks.push($drag)" drop-accept="task">Drop here</div>
```

The CDN build of NoJS Elements auto-installs when it detects `window.NoJS`. No JavaScript code changes are needed — just add the second `<script>` tag.

**Order matters:** the Core script must load before the Elements script.

---

## HTML Templates — No Changes Required

Your HTML templates are 100% backward compatible. Every directive attribute, implicit variable, CSS class, and event works exactly as before:

| Feature | Status |
|---------|--------|
| `drag`, `drag-type`, `drag-effect`, `drag-handle`, `drag-image`, `drag-disabled`, `drag-class`, `drag-ghost-class`, `drag-group` | Unchanged |
| `drop`, `drop-accept`, `drop-effect`, `drop-class`, `drop-reject-class`, `drop-disabled`, `drop-max`, `drop-sort`, `drop-placeholder`, `drop-placeholder-class` | Unchanged |
| `drag-list`, `drag-list-key`, `drag-list-item`, `drag-list-copy`, `drag-list-remove` | Unchanged |
| `drag-multiple`, `drag-multiple-class` | Unchanged |
| `$drag`, `$dragType`, `$dragEffect`, `$dropIndex`, `$source`, `$target` | Unchanged |
| `<form validate>`, `$form`, `validate-on`, `validate-if`, `error`, `error-{rule}`, `error-class`, `as` | Unchanged |
| `NoJS.validator(name, fn)` | Unchanged (stays in Core) |
| CSS classes (`.nojs-dragging`, `.nojs-drag-over`, `.nojs-drop-placeholder`, `.nojs-selected`, etc.) | Unchanged |

---

## Integration with Elements Components

Moving DnD and Validation into Elements enables deeper integration with the UI component library:

### Table Row Reorder

Tables can now be reordered via drag and drop using the `table-reorder` directive. See [Table > Row Reorder](table.md#row-reorder-dnd).

### Tree Drag and Drop

Trees support drag-to-reparent and drag-to-reorder via `tree-drag-mode`. See [Tree > Drag and Drop](tree.md#drag--drop).

### Stepper Validation Gate

Steppers in linear mode can block forward navigation on invalid forms using `stepper-validate`. See [Stepper > Validation Gate](stepper.md#validation-gate).

---

## FAQ

### Do I need to change my HTML?

No. All directive attributes, implicit variables, events, and CSS classes are identical.

### What happens if I forget to load Elements?

NoJS Core >= 1.13.0 includes stub directives for `drag`, `drop`, `drag-list`, `drag-multiple`, and `validate`. Your app will not break — the directives will be silently skipped and a console warning will appear telling you to install NoJS Elements.

### Can I use the DnD directives without the rest of Elements?

No. NoJS Elements is a single plugin that registers all directives. You cannot cherry-pick individual modules. However, unused directives have zero overhead — they only activate when matching HTML attributes are found.

### Do I need to update my custom validators?

No. `NoJS.validator()` remains in Core. Custom validators registered via `NoJS.validator('name', fn)` continue to work exactly as before with the Elements validation module.

### What if I'm using an older version of Core?

If Core is below 1.13.0, the DnD and Validation directives are still bundled in Core. NoJS Elements 1.13.0+ will detect this and skip registration to avoid conflicts. However, the recommended setup is to update both packages together.

### Does the order of script tags matter?

Yes. NoJS Core must load before NoJS Elements. The Elements plugin calls `NoJS.use()` which requires the Core API to be available. For CDN usage, place the Core script tag first.
