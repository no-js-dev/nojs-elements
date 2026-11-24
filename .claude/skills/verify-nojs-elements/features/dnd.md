# Drag and drop

A visitor drags items between lists with the mouse and sees both lists and their counters update, or reorders a list from the keyboard (Space to grab, arrows to move, Space to drop) while a live region announces each step.

## Sub-features

- `dnd-cross-list` moves an item from `drag-list` A to B and updates bound counts.
- `dnd-aria` marks items `role="option"` with `aria-roledescription="draggable item"` in a `listbox`.
- `dnd-keyboard-grab` grabs a focused item with Space (`nojs-dragging` class, `Grabbed ...` announcement).
- `dnd-keyboard-reorder` moves the grabbed item with ArrowDown and drops it with Space.
- `dnd-keyboard-cancel` cancels with Escape (not in the journey yet).
- Type isolation, wildcard accept, max items, handles, multi-select and file drops have sections on the page but are not in the journey yet.

## How to get to it (user POV)

- Open `/docs/examples/dnd/`. "Test 1" has `List A` / `List B` with counters; "Test 12: Keyboard drag and drop" has `KB-1`, `KB-2`, `KB-3`.

## Driving it with verify.mjs

Preconditions:

- `doctor --port <port>` exits 0.

Run `node .claude/skills/verify-nojs-elements/scripts/verify.mjs drive --journey .claude/skills/verify-nojs-elements/journeys/dnd.json`.

- **Initial lists.** List A has 3 items, List B none; `[data-test=count-a]` reads `3`, `[data-test=count-b]` `0`; the first item has `aria-roledescription="draggable item"`.
- **Mouse drag.** Step `["drag", "[data-test=list-a] [data-test=item] >> nth=0", "[data-test=list-b]"]`. Counters read `2` and `1`; List B holds one item.
- **Keyboard grab.** Steps `["focus", "[data-test=kb-list] [data-test=item] >> nth=0"]`, `["key", "Space"]`. That item has class `nojs-dragging` and `.nojs-dnd-live-region` contains `Grabbed`.
- **Keyboard move and drop.** Steps `["key", "ArrowDown"]`, `["key", "Space"]`. The list reads `KB-2`, `KB-1`, `KB-3`.
- **Proof.** Steps `["screenshot", "01-after-cross-list-drag"]`, `["screenshot", "02-after-keyboard-reorder"]`, `["aria", "02-kb-list", "[data-test=kb-list]"]` (a `listbox` whose options are in the new order).

## Gotchas

- Every list renders items from one template with `data-test="item"`; always scope by the list's `data-test`, and use `>> nth=<i>` for position.
- `drag` uses real HTML5 drag events in Chromium; Firefox and WebKit behave differently under Playwright, which this harness does not run.
- The page keeps state in memory only: a reload restores the initial lists.
