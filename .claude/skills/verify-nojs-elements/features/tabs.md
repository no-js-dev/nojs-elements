# Tabs

A visitor switches panels by clicking a tab or moving with the arrow keys; the selected tab is announced through ARIA, a preselected index opens on another tab, and a disabled tab cannot be selected.

## Sub-features

- `tabs-click` shows the clicked tab's panel and hides the others.
- `tabs-aria` keeps `aria-selected` in sync (`role="tab"` / `tabpanel` / `tablist`).
- `tabs-keyboard` moves focus with ArrowRight and ArrowLeft.
- `tabs-preselected` opens on the index given in `tabs="1"`.
- `tabs-disabled` marks `tab-disabled` tabs `aria-disabled="true"` and ignores clicks on them.

## How to get to it (user POV)

- Open `/docs/examples/tabs/`: the basic set (`Overview`, `Details`, `Settings`), a preselected set (`First`, `Second`, `Third`) and a set with `Disabled Tab`.

## Driving it with verify.mjs

Preconditions:

- `doctor --port <port>` exits 0.

Run `node .claude/skills/verify-nojs-elements/scripts/verify.mjs drive --journey .claude/skills/verify-nojs-elements/journeys/tabs.json`.

- **Default.** Step `["goto", "/docs/examples/tabs/"]`. `[data-test=tab-overview]` has `aria-selected="true"`, `[data-test=panel-overview]` is visible, `[data-test=panel-details]` is hidden.
- **Click a tab.** Step `["click", "[data-test=tab-details]"]`. `[data-test=tab-details]` becomes `aria-selected="true"`, Overview `false`; the Details panel is the visible one.
- **Arrow keys.** Steps `["focus", "[data-test=tab-details]"]`, `["key", "ArrowRight"]`. Focus is on `[data-test=tab-settings]`; `["key", "ArrowLeft"]` moves it back to Details.
- **Preselected.** Step `["expect-contains", "[data-test=preselected-tabs] [role=tabpanel]:visible", "Second panel (preselected)"]`.
- **Disabled.** `[data-test=disabled-tab]` has `aria-disabled="true"`. Step `["click", "[data-test=disabled-tab]", { "force": true }]`. It stays `aria-selected="false"` and the first tab of that set stays selected.
- **Proof.** Steps `["screenshot", "01-details-selected"]` and `["aria", "01-tabs", "[data-test=basic-tabs]"]`.

## Gotchas

- Playwright refuses to click an `aria-disabled` element; a mouse user still can. Use `{ "force": true }` for that one click, never elsewhere.
- Arrow keys move focus; the spec does not require them to change the selection. Assert `expect-focused`, not `aria-selected`, after an arrow key.
- The preselected set has no `data-test` on its tabs; address it through `[data-test=preselected-tabs]` and ARIA roles.
