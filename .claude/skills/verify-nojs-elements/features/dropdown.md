# Dropdown

A visitor opens a menu from a toggle button, moves through its items with the arrow keys, and dismisses it with Escape or a click outside; the toggle announces its state through `aria-expanded`, and disabled items are not actionable.

## Sub-features

- `dropdown-toggle` opens and closes the menu and syncs `aria-expanded`.
- `dropdown-keyboard` moves focus through `role="menuitem"` items with ArrowDown and ArrowUp.
- `dropdown-escape` closes on Escape.
- `dropdown-outside` closes on a click outside (popover light dismiss).
- `dropdown-disabled` keeps a `disabled` item disabled.
- `dropdown-position` places the menu with `dropdown-position` / `dropdown-align` (not in the journey yet).

## How to get to it (user POV)

- Open `/docs/examples/dropdown/` and use `Options` (basic), `Actions` (with a disabled item), `Top End` (positioned) or the link menu.

## Driving it with verify.mjs

Preconditions:

- `doctor --port <port>` exits 0.

Run `node .claude/skills/verify-nojs-elements/scripts/verify.mjs drive --journey .claude/skills/verify-nojs-elements/journeys/dropdown.json`.

- **Closed state.** Step `["goto", "/docs/examples/dropdown/"]`. `[data-test=basic-menu]` is hidden and `[data-test=basic-toggle]` has `aria-expanded="false"`.
- **Open.** Step `["click", "[data-test=basic-toggle]"]`. The menu is visible and `aria-expanded` is `true`.
- **Keyboard.** Steps `["key", "ArrowDown"]` twice. Focus lands on `Edit`, then `Duplicate` (`[data-test=basic-menu] >> role=menuitem[name="Duplicate"]`).
- **Escape.** Step `["key", "Escape"]`. The menu is hidden and `aria-expanded` is back to `false`.
- **Outside click.** Steps `["click", "[data-test=basic-toggle]"]`, `["click", "body", { "position": { "x": 10, "y": 10 } }]`. The menu is hidden.
- **Disabled item.** Step `["expect-disabled", "[data-test=disabled-item]"]`.
- **Proof.** Steps `["screenshot", "01-open-keyboard"]` and `["aria", "01-open-keyboard", "[data-test=basic-menu]"]`.

## Gotchas

- Focus must still be on the toggle when ArrowDown is pressed; clicking the toggle leaves it there in Chromium. The e2e spec re-focuses the toggle for WebKit.
- Menu items have no `data-test`; select them by `role=menuitem` and name inside `[data-test=basic-menu]`.
- The NoJS docs site uses this same element for its language picker (see the core repo's `verify-nojs` docs-site journey).
