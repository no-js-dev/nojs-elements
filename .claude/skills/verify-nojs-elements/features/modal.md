# Modal

A visitor opens a dialog from a trigger button, focus moves into it, Escape or the close button dismisses it and focus returns to the trigger; a modal can refuse Escape, and a nested modal closes without closing its parent.

## Sub-features

- `modal-open-close` opens with `modal-open` and closes with `modal-close`.
- `modal-aria` exposes `role="dialog"` and `aria-modal="true"`.
- `modal-focus` moves focus to the first focusable element on open and back to the trigger on close.
- `modal-escape` closes on Escape.
- `modal-no-escape` ignores Escape when `modal-escape="false"`.
- `modal-nested` keeps the outer modal open when the inner one closes.
- `modal-no-backdrop` opens without a backdrop when `modal-backdrop="false"` (not in the journey yet).

## How to get to it (user POV)

- Open `/docs/examples/modal/` and use `Open Basic Modal`, `Open No-Escape Modal`, `Open Outer Modal` (then `Open Inner Modal`) or `Open No Backdrop`.

## Driving it with verify.mjs

Preconditions:

- `doctor --port <port>` exits 0 and reports the intended core build.

Run `node .claude/skills/verify-nojs-elements/scripts/verify.mjs drive --journey .claude/skills/verify-nojs-elements/journeys/modal.json`.

- **Open.** Step `["click", "[data-test=open-basic]"]`. `[data-test=basic-modal]` is visible with `role="dialog"` and `aria-modal="true"`.
- **Close by button.** Step `["click", "[data-test=close-basic]"]`. The modal is hidden and `[data-test=open-basic]` has focus again.
- **Close by Escape.** Steps `["click", "[data-test=open-basic]"]`, wait for `["expect-focused", "[data-test=close-basic]"]`, then `["key", "Escape"]`. The modal is hidden.
- **Escape refused.** Steps `["click", "[data-test=open-no-escape]"]`, `["expect-focused", "[data-test=close-no-escape]"]`, `["key", "Escape"]`. `[data-test=no-escape-modal]` stays visible until `["click", "[data-test=close-no-escape]"]`.
- **Nested.** Steps `["click", "[data-test=open-outer]"]`, `["click", "[data-test=open-inner]"]`, `["click", "[data-test=close-inner]"]`. The inner modal is hidden and the outer one is still visible.
- **Proof.** Steps `["screenshot", "01-basic-open"]`, `["aria", "01-basic-open"]`, `["screenshot", "02-nested-open"]`, `["screenshot", "03-outer-still-open"]`.

## Gotchas

- The Escape handler listens on the dialog, and focus moves in one animation frame after opening. Pressing Escape before focus lands inside does nothing; assert `expect-focused` on the dialog's first button first.
- Modals use the HTML popover API (top layer). The example page gives dialogs no background, so in a screenshot of nested modals the outer and inner text overlap; let the `expect-*` steps and the ARIA snapshot carry the proof.
- `e2e/examples/ui-host.html` also contains a modal; it runs on a stand-in host with test-only hooks and is not a user-path proof.
