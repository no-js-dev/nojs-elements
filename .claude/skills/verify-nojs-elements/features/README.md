# NoJS-Elements verification map

This directory is the maintained source for verifying what a visitor of a NoJS page sees and can do with each element. Read this index before driving, then use the matching feature file as the recipe. Each feature has an executable journey in `../journeys/<feature>.json`.

## Baseline preconditions

- `npm ci` done in this checkout; `dist/iife/nojs-elements.js` built from the `src/` under test (`launch --build` after any `src/` change).
- A NoJS core build at the matching release passed to `launch --core <no.js>` (for example a core worktree's `dist/iife/no.js`). The default, the shared `../NoJS` checkout, may be an older release.
- A verify server started by this run: `node .claude/skills/verify-nojs-elements/scripts/verify.mjs launch --port <4301-4399> --core <no.js>`, and `doctor --port <port>` exits 0.
- Never drive a server this run did not start.

## Driving conventions

- Every journey starts from a fresh browser context with empty storage.
- Handles are `data-test` attributes from `docs/examples/<element>/index.html`; menu items, tabs and options are addressed by ARIA role and name when they have no `data-test`.
- Keyboard behavior is driven with `focus` + `key`, pointer behavior with `click`, `drag`, `hover`.
- Treat every step as literal: keep selectors, quotes and values unchanged.

## Proof and skip reporting

- Capture the user action and the resulting state: visible change, ARIA state, focus.
- UI proof is a screenshot plus an ARIA snapshot from the same drive.
- Check `result.json` `loadedCoreVersion` and report it with the result.
- Report the evidence directory (`.verify/evidence/<stamp>-<name>/`) and journey with every claim.
- A failing journey is reported as failing with its reason in `Gotchas`; never weaken it to pass.
- Do not report an entry point as verified through a different one (a keyboard path is not proven by a mouse run).

## Feature entry contract

Each feature file starts with an H1 title and one paragraph describing the user-visible behavior, followed by exactly four H2 sections in this order: `Sub-features`, `How to get to it (user POV)`, `Driving it with verify.mjs` (starts with `Preconditions:`, then labeled bullets pairing each user action with an exact step and its observable result), and `Gotchas`.

## Features

- [Modal](./modal.md): open and close by button and Escape, `modal-escape="false"`, nested dialogs, focus moves in and returns to the trigger, dialog ARIA.
- [Tabs](./tabs.md): click and arrow-key navigation, ARIA selection state, preselected index, disabled tab.
- [Dropdown](./dropdown.md): toggle, keyboard focus through items, Escape and outside-click dismissal, disabled item, `aria-expanded`.
- [Form validation](./validation.md): per-field errors on blur, custom messages, `$form.valid` / `errorCount`, auto-disabled submit, successful submit.
- [Drag and drop](./dnd.md): mouse drag between lists with live counters, keyboard grab / move / drop with live-region announcements.

Not yet mapped (example pages and specs exist): accordion, breadcrumb, popover, scroll-spy, skeleton, split, stepper, table, toast, tooltip, tree, virtual-list.
