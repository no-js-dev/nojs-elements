---
name: verify-nojs-elements
description: Launch, health-check and drive the NoJS-Elements UI components (modal, tabs, dropdown, validation, drag-and-drop and the rest) on their example pages in a real Chromium browser, on top of a NoJS core build you choose, and capture screenshots, ARIA snapshots, console and network logs as proof. Use when you need to prove an Elements change works the way a visitor of a NoJS page sees it (core mode). Compiled-host mode under NoJS-Server is documented here as a pointer only.
---

# verify-nojs-elements

NoJS-Elements is a plugin: the user is a site author who adds element directives to a NoJS page, and the visitor who clicks, types and drags on it. This skill proves behavior on the example pages in this checkout:

- **Element examples** `http://127.0.0.1:<port>/docs/examples/<element>/`: one page per element (`accordion`, `breadcrumb`, `dnd`, `dropdown`, `modal`, `popover`, `scroll-spy`, `skeleton`, `split`, `stepper`, `table`, `tabs`, `toast`, `tooltip`, `tree`, `validation`, `virtual-list`), with `data-test` handles. Primary surface; the e2e specs in `e2e/tests/<element>.spec.ts` drive the same pages.
- **Extra fixtures** `http://127.0.0.1:<port>/e2e/examples/<name>.html` (`dnd`, `drag-enter`, `stepper-*`, `tree-drag`, `validation-*`).

Everything runs through `scripts/verify.mjs` (Node + the repo's own `@playwright/test` Chromium), from the repo root. Feature recipes live in [`features/`](features/README.md); executable journeys in `journeys/`.

## Launch

```bash
npm ci                                                                              # once per checkout
node .claude/skills/verify-nojs-elements/scripts/verify.mjs launch --core ../NoJS--verify/dist/iife/no.js
node .claude/skills/verify-nojs-elements/scripts/verify.mjs launch --port 4322 --core <core no.js> --build
```

- Starts `node test-server.js` detached with `TEST_PORT=<port>` (default 4321; use 4301-4399), cwd = repo root. Run state goes to `.verify/run/<port>/` (`server.pid`, `server.log`, `meta.json`).
- `--core <path>` names the NoJS core build the pages run on, and is recorded in `meta.json`. Without it the default is `../NoJS/dist/iife/no.js`, the shared sibling checkout, which is often an older release (it was 1.21.1 while Elements was 1.23.0). Point it at a core worktree or release build you control. Launch fails if the file is not a NoJS build and warns when its version differs from `package.json`.
- Ready means usable: the helper polls until `/dist/iife/nojs-elements.js` returns 200 with the banner `NoJS Elements v<package.json version>` and `/docs/examples/modal/` returns 200. It prints `READY http://127.0.0.1:4321 pid=<pid> elements=<version> sha=<git sha> core=<version> (<path>) log=...`. No `READY` within 15 s means a failed launch: the log tail is printed and the exit code is 1.
- `--build` runs `node build.js` first. Use it whenever `src/` changed: the pages load `dist/iife/nojs-elements.js`. The build rewrites tracked `dist/` files; on a clean `main` it produces no diff.
- `launch` refuses a port in use and refuses to start twice on one port. `npm start` (`docs/dev-server.js`) picks the first free port in 3000-3010 and cannot be pinned, so it is not used here.

## Doctor

```bash
node .claude/skills/verify-nojs-elements/scripts/verify.mjs doctor --port 4321
```

Read-only; one `OK`/`WARN`/`FAIL` line per check, exit 1 on any `FAIL`:

- the recorded pid is alive and is the process listening on the port, running `test-server.js` with cwd = this checkout;
- `/dist/iife/nojs-elements.js` serves the `package.json` version;
- `dist/iife/nojs-elements.js` is newer than every file in `src/` (`WARN`: stop, then `launch --build`);
- the recorded core build exists, with its version and git sha (`WARN` when it differs from the Elements version);
- Playwright Chromium is installed.

## Drive

```bash
node .claude/skills/verify-nojs-elements/scripts/verify.mjs drive --journey .claude/skills/verify-nojs-elements/journeys/modal.json
node .claude/skills/verify-nojs-elements/scripts/verify.mjs drive --journey my-journey.json --port 4322 --headed
```

Each drive opens a fresh headless Chromium context (1280x800, locale `en-US`, empty storage), runs the steps in order, stops at the first failure, and exits 0 only if every step passed and no uncaught page error fired. In that browser the harness serves three script URLs from local files: `/NoJS/dist/iife/no.js` and `https://cdn.no-js.dev/` get the recorded core build, `https://cdn-elements.no-js.dev/` gets this checkout's `dist/iife/nojs-elements.js`. `result.json` records the core version the page actually loaded (`loadedCoreVersion`). Google Analytics requests are aborted.

A journey is `{ "name": "...", "steps": [[verb, ...args], ...] }` (`"allowPageErrors": true` only for a page expected to throw). Selectors are Playwright selector strings; prefer `[data-test=...]`, then `role=<role>[name="..."]` scoped with `>>`. `>> nth=<i>` picks one of several matches; actions are strict, so ambiguity fails.

| Verb | Args | Effect |
| --- | --- | --- |
| `goto` | path or URL | Navigate, relative to the server base. |
| `click` | selector, `{force, position}`? | Mouse click. `force` clicks an `aria-disabled` element a mouse can still hit; `position` `{x, y}` clicks a point inside the element (outside-click dismissal on `body`). |
| `fill` | selector, value | Replace an input's value. |
| `focus` | selector | Move keyboard focus to the element (what Tab does). |
| `key` | key | Keyboard press on whatever has focus: `Escape`, `Tab`, `ArrowDown`, `Space`, `Enter`. |
| `press` | selector, key | Focus the element, then press. |
| `drag` | source, target | Mouse drag and drop (HTML5 drag events). |
| `hover`, `check`, `select` | selector (, value) | Pointer hover, checkbox, `<select>` option. |
| `reload`, `back` | none | Browser reload or history back. |
| `mock` | glob, status, body, `{method, delay, contentType}`? | Answer a backend request (register before `goto`). |
| `wait-for` | selector | Wait until visible. |
| `expect-text` / `expect-contains` | selector, text | Whitespace-collapsed text equals / contains. |
| `expect-value` | selector, value | Input value. |
| `expect-visible` / `expect-hidden` | selector | Visible / hidden or absent. |
| `expect-count` | selector, n | Exactly `n` matches. |
| `expect-attr` | selector, attr, value | Attribute value (`null` = absent). Use for ARIA state: `aria-expanded`, `aria-selected`, `role`. |
| `expect-class` | selector, class, present? | Class present (default) or absent (`false`). |
| `expect-focused` | selector | The element is `document.activeElement`. |
| `expect-enabled` / `expect-disabled` | selector | Enabled / disabled (`disabled` or `aria-disabled`). |
| `expect-url` | substring | Full URL contains it. |
| `expect-request` | method, glob, bodyIncludes? | A request was sent. |
| `screenshot` | name | `<name>.png` in the evidence dir. |
| `aria` | name, selector? | ARIA snapshot `<name>.aria.yml` of `body` or the selector. |

Expectations poll for up to 5 s (`VERIFY_STEP_TIMEOUT=<ms>` changes it). For an element not in the feature map, read `e2e/tests/<element>.spec.ts` for its `data-test` handles and expected ARIA, and translate it into a journey with user actions (replace `locator.focus()` + `page.keyboard` with `focus` + `key`).

## Evidence

Every drive writes `.verify/evidence/<YYYYMMDD-HHMMSS>-<journey name>/`:

- `steps.log`: one `PASS`/`FAIL` line per step with arguments and duration.
- `result.json`: pass/fail, failed step and error, git sha, Elements version, core path, recorded and loaded core versions, page errors.
- `console.log`: console messages and uncaught errors (absent when the page logged nothing).
- `network.jsonl`: method, URL, status and body of every request.
- `<name>.png` / `<name>.aria.yml` per `screenshot` / `aria` step; `failure.png` and `failure.aria.yml` on a failure.

Proof standards:

- Drive the real user path: mouse, keyboard and drag on the page's own controls. Never call `NoJS.*`, element internals or test-only hooks.
- After each action assert the visible result and the ARIA state that assistive tech reads (`aria-expanded`, `aria-selected`, `role`, focus), then capture a screenshot and an ARIA snapshot of the end state.
- Verify side effects: list contents and counters after a drag, focus return after a dialog closes, `expect-request` when a form posts.
- Record which core build ran (`loadedCoreVersion`). A pass on the stale shared core says nothing about the release pairing.
- A failing step is a failure; report it with its evidence directory and record the reason in the feature's `Gotchas`. Never rewrite a journey until it passes.

## Cleanup

```bash
node .claude/skills/verify-nojs-elements/scripts/verify.mjs stop --port 4321
git status --short    # dist/ changes only if you used --build on purpose
```

`stop` kills only the pid recorded in `.verify/run/<port>/server.pid`, after confirming it is still this checkout's `test-server.js` (otherwise it refuses). It copies `server.log` to `.verify/evidence/_server-logs/port<port>-<stamp>.log`, deletes `.verify/run/<port>/`, and never touches `.verify/evidence/` (gitignored, survives teardown). Never kill by process name: other worktrees, NoJS-Server runs and the owner's long-running reference containers use Node too. Run `stop` after a failed launch or drive as well.

## Helpers

`scripts/verify.mjs` (executable, `#!/usr/bin/env node`):

```bash
node .claude/skills/verify-nojs-elements/scripts/verify.mjs launch [--port 4321] [--core <no.js>] [--build]
node .claude/skills/verify-nojs-elements/scripts/verify.mjs doctor [--port 4321]
node .claude/skills/verify-nojs-elements/scripts/verify.mjs drive  --journey <file.json> [--port 4321] [--name <label>] [--headed]
node .claude/skills/verify-nojs-elements/scripts/verify.mjs stop   [--port 4321]
```

`VERIFY_PORT` sets the default port. Keep `journeys/` and `features/` in sync.

## Isolation

- Run state and evidence live in this checkout's `.verify/`, keyed by port; two worktrees or two ports run side by side.
- `test-server.js` listens on all interfaces (it has no host option), so the example pages are reachable from the local network while it runs. Stop it when done.
- `test-server.js` serves any URL containing `/NoJS/` from the sibling `../NoJS` checkout. Only the browser driven by this harness gets the `--core` build; `curl` against the server still returns the sibling's file.
- `cd e2e && npx playwright test` starts its own server on `TEST_PORT` (default 3001) and reuses whatever already listens there.

## Compiled-host mode (pointer, not driven by this skill)

Under NoJS-Server, Elements runs without core: the server renders the page and the integrator's plugin host (`hostApi`) gives each directive `value`, `watch`, `exec`, `onDispose`. This skill does not drive that mode. The `e2e/examples/*-host.html` fixtures here exercise the host API only through an in-page stand-in booted with test-only hooks (`window.__boot`, `window.__rerender`), so they are not user-path proof of compiled mode.

To verify an Elements change in compiled mode, use a NoJS-Server worktree that is a direct sibling of `NoJS-Server`, build this checkout (`node build.js`), and point NoJS-Server at it:

```bash
NOJS_ELEMENTS_PATH=<this checkout dir> NOJS_CORE_PATH=<core checkout dir at the matching release> npm run compile
NOJS_ELEMENTS_PATH=<this checkout dir> NOJS_CORE_PATH=<core checkout dir> node --experimental-vm-modules e2e/runner/verify-compiled.js elements-drag-list
```

Fixtures that load Elements there: `dnd-reorder`, `elements-data`, `elements-disclosure`, `elements-drag-list`, `elements-navigation`, `elements-overlays`, `elements-wizard`, `validate-form`, `validate-if-model`, `validate-shared-scope` (NoJS-Server `main` at 458fad0). That repo's own CLAUDE.md is authoritative for ports (`PARITY_PORT`) and prerequisites. These commands were not run while writing this skill.
