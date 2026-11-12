# Changelog

All notable changes to **NoJS Elements** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased](https://github.com/no-js-dev/nojs-elements/compare/v1.23.0...HEAD)

## [1.23.0](https://github.com/no-js-dev/nojs-elements/compare/v1.22.0...v1.23.0) — 2026-11-12

### Added

- validate: a pure validation engine, `src/validate/engine.js` (also built as `dist/esm/validate-engine.mjs` and `dist/cjs/validate-engine.mjs`). It holds the rules and their default messages, `validate-empty`, rule priority, message and template resolution, `validate-on` display gating, touched/dirty transitions and `$form` assembly, with no DOM access, no timers and no module state. The directive on core pages now gathers values, native `ValidityState` flags and `validate-if` results from the page and calls it; behavior is unchanged (a differential test runs the previous directive and the engine-backed one over 400 generated forms with random interactions and compares `$form`, `as` variables, markup and submit vetoes after every step)
- validate runs on the NoJS-Server plugin host API when a host provides one (`NoJS.hostApi >= 1`, NoJS-Server ADR-028). Validation runs on the server; the browser sets `novalidate`, reports field values, the event and native validity through the form's validate action (`input` / `change` after a 300 ms pause per form, `focusout` and submit at once), and disables the submit buttons from the server-rendered `data-nj-form-state`, keeping them enabled while a report is waiting or in flight so no click is lost. It never blocks a submit; the server re-validates it. A standalone field reports its value to its own action. `validate` is no longer a warning stub on compiled sites
- The plugin contract gains `validation: { api: 1, engine: "./validate-engine.mjs" }`, which NoJS-Server bundles into its server runtime (ADR-021 amendment). The engine passes NoJS-Server's server purity rules
- stepper: `checkStepValidationGate` reads form validity from `data-nj-form-state` when called without `findContext` (compiled sites, where `$form` does not exist in the browser)
- validate: opt-in `auto-disable="off"` on a submit button turns off the automatic disabling for that button, so its own `bind-disabled` decides (for example `bind-disabled="!$form.valid || !$form.dirty"`), or it stays clickable and a click on an invalid form shows every error. The form still blocks an invalid submit. Without the attribute, submit buttons keep the v1.22.0 automatic state
- validate: opt-in `validate-empty="skip"` on a form or field (the field wins) lets an empty or whitespace-only value pass `min`, `max` and `url`, so an optional field is not rejected while empty; `required` still reports it. The default (`validate-empty="check"`) keeps the v1.21.1 behavior, where `min:1` fails an empty field and `url` fails `""`. The default is planned to become `skip` in the next major version ([`5915bca`](https://github.com/no-js-dev/nojs-elements/commit/5915bca))

### Fixed

- validate: a custom validator registered after the Elements script (or after `NoJS.use(NoJSElements)`) runs. The module kept a copy of the validator registry from install, so a later `NoJS.validator()` was never called, as a rule name or through `custom:name`. Fields now read the registry each time they validate; validators registered before install behave as before, and registering a name again replaces the validator from the next validation on
- validate: inline content of an `if` inside a `<form validate>` on the initial page renders. The plugin init hook re-bound every validated form after core had processed it, so an `if="$form.errors.email"` re-read its content after the first render had cleared it and never showed it again. Forms and fields bound by the real directive are now left alone, as dnd nodes are since v1.22.0
- validate: when the Elements script loads after core has processed the page (an `async` script, or one added after `DOMContentLoaded`), an `if` or `each` inside a `<form validate>` keeps its content. Core binds the form to its stub first; Elements disposed the form's whole subtree and processed it again, and an `if` that the first render had cleared came back empty (`each` stopped re-rendering, `state` on the form was reset). When the form has `state` on it or on an element above it, Elements now removes the stub's submit listener and binds the real directive to the form element alone. A form with no `state` on it or above it is still processed again, and Elements logs a console warning when an `if` or loop inside it may have lost its content
- validate: a field excluded by `validate-if` resets its `as` variable to the valid state, like its `$form.fields` entry; it kept its last validated state
- stepper: a stepper without a `state` around it gives its steps `$stepper`. Core gave each element a separate throwaway context, so `$stepper` and values written by `model` (`step-validate="agree"`) never reached the steps. The stepper now keeps a context of its own, which the steps share; a `<form validate>` inside a step keeps its own `$form`. A stepper inside a `state` keeps using that state
- validate: in a `<form validate>` without `validate-on`, a select, checkbox or radio with `model` keeps the user's pick. The form validated on `input`, before `model` synced on `change`, and the re-render reverted the pick (the Complete Example's `model="showAddress"` checkbox never checked). Text fields keep their validation timing
- validate: a field excluded by `validate-if` drops the `aria-invalid`, `error-class` and error template it showed while it was validated
- validate: a field with an error template inside `<form validate>` renders the template once, after the `<template>`, following `validate-on`. The standalone-field handler also ran there on every keystroke and inserted a second copy after the field with only `err` in scope (`$rule + ': ' + $error` showed "undefined: undefined"). That handler still sets `aria-invalid` as in v1.21.1, and form templates now also get `err.message`, so a template that reads it keeps working ([`3bbc878`](https://github.com/no-js-dev/nojs-elements/commit/3bbc878))
- tree: with static `<li branch>` markup, tree drag and drop starts. `tree-drag-mode` (priority 15) ran before the `branch` and `subtree` directives (priority 16) gave the items `role="treeitem"`, and its `MutationObserver` only watched added nodes, so the items written in the HTML never became draggable and no `tree:*` event fired in a browser (the jsdom tests set the role by hand and missed it). The observer now also watches the `role` attribute, so branches and subtree leaves become draggable once they are initialized, in every mode (`reparent`, `reorder`, `both`). Items rendered by `each`, added after load, or written with `role="treeitem"` stay draggable as before, and `tree-drag-disabled` items still are not
- tree: `tree:drag-end` fires after a successful drop. The drop handler cleared the drag state before `dragend`, so the event only fired for a cancelled drag, although the docs say it fires regardless of outcome
- dnd, tree, table: in WebKit (Safari), a release on the first pointer position inside a drop target drops there. WebKit only drops on an element whose `dragenter` or `dragover` was cancelled, and such a release fires `dragenter` and no `dragover`; the `drop` and `drag-list` zones, `tree-drag-mode` and `table-reorder` cancelled only `dragover`, so the drop was lost. They now also cancel `dragenter` on a target that accepts the drop, with the same drop effect as `dragover`, and a tree takes its drop position from `dragenter` too. A target that rejects the drop (a type outside `drop-accept`, a full `drop-max`, `drop-disabled`, the dragged tree node or one of its descendants) still leaves `dragenter` alone, so Chromium and Firefox behave as before

### Documentation

- Validation: new "Server-Rendered Hosts" section: `validate` runs on hosts that implement the plugin host API, with the engine on the server and the browser reporting facts
- Validation: examples no longer use a plain `disabled="..."` attribute, which core never evaluates (the button stayed disabled); the auto-disable section documents what the automatic state covers, that it replaces a `bind-disabled` on the same button, and the new `auto-disable="off"` opt-out. The custom-validator example uses the real `(value, allValues)` signature of `custom:name` (the `matchField` example threw), shows `name:arg` for validators that take arguments, and avoids a field named `confirm`, which core expressions cannot read
- Stepper: the Events section names the events the stepper dispatches, `nojs:stepper-change` and `nojs:stepper-complete` (listened to with `on:nojs:stepper-change` / `on:nojs:stepper-complete`). The docs still showed `step-change` and `step-complete`, the names v1.15.0 replaced, so the documented listeners never ran. The old names stay unsupported (no alias): no release since v1.14.1 dispatched them. The docs site page gains an Events table, and `.nojs-step-invalid` is documented on the indicator item, where the stepper puts it
- Migration guide: loading the Elements script after core (`async` or injected), and what it means for `<form validate>`
- Stepper: the `$stepper` example uses `bind-disabled` / `bind-hidden` instead of plain `disabled` / `hidden` attributes (the buttons stayed disabled and hidden), and replaces the undefined `submitForm()` call
- Validation: custom validators can be registered before or after the Elements script; `as` documents the reset of an excluded field. Stepper: `$stepper` no longer needs a `state` around the stepper
- Validation: new "Empty Values (`validate-empty`)" section; error templates list `err.message` and render once per field; the standalone section says a field inside `<form validate>` uses the form's template rendering
- Accordion and Drag and Drop: the Events sections name the events the source dispatches. Accordion: `nojs:accordion-change` (was `accordion-change`). Drag and Drop: `nojs:dnd-start`, `nojs:dnd-end`, `nojs:dnd-enter`, `nojs:dnd-leave`, `nojs:dnd-over`, `nojs:dnd-drop` (were `drag-start`, `drag-end`, `drag-enter`, `drag-leave`, `drag-over`, `drop`) and `nojs:dnd-reorder`, `nojs:dnd-receive`, `nojs:dnd-remove` (were `reorder`, `receive`, `remove`). The docs kept the names v1.15.0 replaced, so the documented listeners never ran (`on:drop` ran on the native event, without `$event.detail`). The old names stay unsupported (no alias). Fixed in `docs/md`, `docs/pages` and `docs/llms-full.txt`, each with a note on the old names. The stepper note no longer says v1.15.0 renamed every event: split (`split-resize`, `split-collapse`), tree (`tree:*`), table (`table:reorder`) and `stepper:validation-blocked` keep their names
- A unit test (`__tests__/events-docs.test.js`, replacing `stepper-events-docs.test.js`) reads the events each element dispatches from `src/` and fails when a doc names an event the source does not dispatch, or when an element's docs leave out an event it dispatches
- Drag and Drop, Split, Sortable Table and Tree: the docs site pages list every event the element dispatches in an Events table (Drag and Drop gains the `nojs:dnd-*` element-level events next to the drag-list events). `__tests__/events-docs.test.js` now fails when a page's Events table leaves out a dispatched event, as it already did for `docs/md` and `docs/llms-full.txt`
- Tree: drag and drop works with items written in the HTML as well as items rendered by `each`
- Sortable Table and Tree: the docs site pages document the `table-reorder` attributes (`table-reorder`, `table-reorder-handle`, `table-reorder-drag-class`, `table-reorder-over-class`) and the `tree-drag-mode` attributes (`tree-drag-mode`, `tree-drag-disabled`), as `docs/md` does

## [1.22.0](https://github.com/no-js-dev/nojs-elements/compare/v1.21.1...v1.22.0) — 2026-11-10

Works with NoJS Core 1.22. Core's opt-in hardening flags all default to `false`, so v1.21.1 behavior is unchanged without them.

### Added

- dnd runs on the NoJS-Server plugin host API when a host provides one (`NoJS.hostApi >= 1`): drag math, placeholder and pointer tracking stay in the browser, and the drop statement becomes a server action with `$drag` / `$dropIndex` / `$dragType` / `$dragEffect` as its payload; `src/dnd/contract.js` declares the attribute contract. With the CDN core nothing changes ([`6f8cae5`](https://github.com/no-js-dev/nojs-elements/commit/6f8cae5), from [#101](https://github.com/no-js-dev/nojs-elements/pull/101), PR [#106](https://github.com/no-js-dev/nojs-elements/pull/106))

### Fixed

- dnd: the plugin init hook no longer re-binds `[drag]` / `[drop]` nodes that are already bound, so children of a drop zone initialize once (`on:init` fired twice) and, with Core 1.22, an `each` inside a drop zone re-renders after a drop ([`6f8cae5`](https://github.com/no-js-dev/nojs-elements/commit/6f8cae5), PR [#106](https://github.com/no-js-dev/nojs-elements/pull/106))
- validate: fields with `model` keep the user's value under `validate-on` (text was wiped and select / checkbox / radio picks were reverted, so a validated login posted empty fields); fields without `model` and forms without `validate-on` keep the v1.21.1 listener order. `model` choice controls validate on `input` again, as in v1.21.1 ([`75d73db`](https://github.com/no-js-dev/nojs-elements/commit/75d73db) from [#103](https://github.com/no-js-dev/nojs-elements/pull/103), [`a620d2a`](https://github.com/no-js-dev/nojs-elements/commit/a620d2a), PR [#106](https://github.com/no-js-dev/nojs-elements/pull/106))
- Docs site: the header and footer badges show the Elements version instead of the core version ([`c02bdd6`](https://github.com/no-js-dev/nojs-elements/commit/c02bdd6))

### Documentation

- Skeleton: the Text Skeleton demo leaves the loading state (it is a toggle now); the reactive loading example uses `call` with `as` / `then` instead of `fetch().then()` (PR [#108](https://github.com/no-js-dev/nojs-elements/pull/108))
- Modal: the template demo and example work; `var-*` names are lowercase, and the confirm button sets a `confirmed` flag on the instance's state instead of calling a block-bodied arrow callback that never wrote state (PR [#109](https://github.com/no-js-dev/nojs-elements/pull/109))
- Validation: examples submit with `<form validate post="...">` instead of calling a non-existent `post()` function; `$form.submitting` stays `true` until the form's request settles or `$form.endSubmit()` runs (new table row), and the live demos call `$form.endSubmit()` so their submit buttons re-enable (PR [#109](https://github.com/no-js-dev/nojs-elements/pull/109))

### Chore

- Version sync script (`scripts/version.mjs` sync / check), release hooks and `version:check` in CI ([`191795e`](https://github.com/no-js-dev/nojs-elements/commit/191795e))
- CI runs on pull requests into release branches ([`341e249`](https://github.com/no-js-dev/nojs-elements/commit/341e249))
- Dev-dependency bumps (esbuild 0.28.2, Jest 30.5, Playwright 1.64, Babel 8.0.7 and others); `dist/` is byte-identical ([`7ad69a7`](https://github.com/no-js-dev/nojs-elements/commit/7ad69a7), from [#102](https://github.com/no-js-dev/nojs-elements/pull/102), PR [#106](https://github.com/no-js-dev/nojs-elements/pull/106))

## [1.21.1](https://github.com/no-js-dev/nojs-elements/compare/v1.21.0...v1.21.1) — 2026-08-14

### Changed

- Version sync with ecosystem release v1.21.1

## [1.21.0](https://github.com/no-js-dev/nojs-elements/compare/v1.20.2...v1.21.0) — 2026-08-13

### Changed

- Version sync with ecosystem release v1.21.0 (NoJS Core ADR-024 compiler support surface)

## [1.20.2](https://github.com/no-js-dev/nojs-elements/compare/v1.20.1...v1.20.2) — 2026-08-05

### Fixed

- fix(popover): popover opened at viewport (0,0) for one frame before positioning, swallowing outside clicks (light dismiss) — now hidden inline until synchronously positioned, exception-safe via try/finally ([`3ffda07`](https://github.com/no-js-dev/nojs-elements/commit/3ffda07), [`ec24f76`](https://github.com/no-js-dev/nojs-elements/commit/ec24f76), [`134b2f8`](https://github.com/no-js-dev/nojs-elements/commit/134b2f8), [#80](https://github.com/no-js-dev/nojs-elements/issues/80), PR [#81](https://github.com/no-js-dev/nojs-elements/pull/81))

### Changed

- test(a11y): rewrite dnd keyboard tests — assert `aria-roledescription` + drag class + live-region (aria-grabbed deprecated-removal now correctly asserted); popover trigger `aria-haspopup="dialog"` ([`c46e638`](https://github.com/no-js-dev/nojs-elements/commit/c46e638), PR [#81](https://github.com/no-js-dev/nojs-elements/pull/81))
- docs(examples): table example migrated off the removed v1.15 sibling else pattern; dnd example listens to `nojs:dnd-*` events ([`3ffda07`](https://github.com/no-js-dev/nojs-elements/commit/3ffda07), PR [#81](https://github.com/no-js-dev/nojs-elements/pull/81))
- ci(e2e): new e2e job (chromium, clones+builds Core on node 22) — Playwright suite now gates every PR ([`c46e638`](https://github.com/no-js-dev/nojs-elements/commit/c46e638), [`79048da`](https://github.com/no-js-dev/nojs-elements/commit/79048da), PR [#81](https://github.com/no-js-dev/nojs-elements/pull/81))

## [1.20.1](https://github.com/no-js-dev/nojs-elements/compare/v1.20.0...v1.20.1) — 2026-08-04

### Changed

- Version alignment with NoJS Core v1.20.1

### Dependencies

- Bump `@testing-library/jest-dom` from 6.9.1 to 7.0.0
- Bump `@playwright/test` from 1.61.1 to 1.62.0
- Bump `actions/setup-node` from 6 to 7

## [1.20.0](https://github.com/no-js-dev/nojs-elements/compare/v1.19.0...v1.20.0) — 2026-07-17

### Changed

- Version bump to align with NoJS Core v1.20.0 SSE directive release. No functional changes to elements.

## [1.19.0](https://github.com/no-js-dev/nojs-elements/compare/v1.18.0...v1.19.0) — 2026-07-09

### Changed

- Version bump to align with NoJS Core v1.19.0 reactive-core performance overhaul. No functional changes to elements.

## [1.18.0](https://github.com/no-js-dev/nojs-elements/compare/v1.17.0...v1.18.0) — 2026-07-07

### Changed

- Version bump to align with NoJS Core v1.18.0 directive incompatibility remediation. No functional changes to elements.

## [1.17.0](https://github.com/no-js-dev/nojs-elements/compare/v1.16.1...v1.17.0) — 2026-07-06

### Changed

- Bump to 1.17.0 for ecosystem version sync (NoJS Core QUERY method release). No functional changes to elements.

## [1.16.1](https://github.com/no-js-dev/nojs-elements/compare/v1.16.0...v1.16.1) — 2026-07-03

### Changed

- No functional changes. Version parity with the NoJS Core v1.16.1 security release. Peer dependency remains aligned with Core (`@no-js-dev/nojs >= 1.11.0`, which includes 1.16.1).

## [1.16.0](https://github.com/no-js-dev/nojs-elements/compare/v1.15.6...v1.16.0) — 2026-07-01

### Changed

- No functional changes; version aligned with the NoJS ecosystem release.

## [1.15.6](https://github.com/no-js-dev/nojs-elements/compare/v1.15.5...v1.15.6) — 2026-06-25

### Changed

- Ecosystem version bump to sync with core v1.15.6

## [1.15.5](https://github.com/no-js-dev/nojs-elements/compare/v1.15.4...v1.15.5) — 2026-06-24

### Removed

- Removed npm distribution config (.npmignore, --legacy-peer-deps)

### Changed

- Clarified CDN-only distribution model

## [1.15.4](https://github.com/no-js-dev/nojs-elements/compare/v1.15.3...v1.15.4) — 2026-06-22

### Fixed

- fix(docs): remove npm/ESM sections from README and docs — NoJS Elements is CDN-only
- fix(docs): remove npmjs.com link from llms.txt
- fix(docs): remove npm/ESM/CJS migration sections from migration-from-core.md
- fix(docs): expand Contributing section with build/test commands
- fix(docs): standardize CDN URL to cdn-elements.no-js.dev/
- fix(docs): remove surviving ESM instructions from llms-full.txt
- fix(docs): fix dead link to Skill repo element references

## [1.15.3](https://github.com/no-js-dev/nojs-elements/compare/v1.15.2...v1.15.3) — 2026-06-20

### Changed

- chore: version bump for ecosystem sync

## [1.15.2] - 2026-06-20

### Fixed
- fix(build): ensure all dist files contain correct version on release

## [1.15.1](https://github.com/no-js-dev/nojs-elements/compare/v1.15.0...v1.15.1) — 2026-06-20

### Fixed

- chore(docs): fix README.md badges and miscellaneous documentation files

## [1.15.0](https://github.com/no-js-dev/nojs-elements/compare/v1.14.1...v1.15.0) — 2026-06-19

### Changed

- chore: version bump

## [1.14.1](https://github.com/no-js-dev/nojs-elements/compare/v1.14.0...v1.14.1) — 2026-06-11

### Fixed

- `$toast()` now registered via `NoJS.global()` for expression scope access
- Fixed bare `click=` → `on:click=` in toast documentation (7 instances)
- Updated toast docs to document `$toast()` for expressions, `NoJS.toast()` for JS
- Added `step-complete` event to stepper docs
- Added element-level drag/drop events table (6 CustomEvents) to DnD docs
- Fixed default `validate-on` from "input focusout" to "input change focusout"
- Added 4 missing element rows (accordion, breadcrumb, scroll-spy, virtual-list) to README tables
- Updated component count from 12 to 17 across all index surfaces
- Fixed peer-dep from >=1.11.0 to >=1.13.0
- Regenerated `llms-full.txt` from current 17 docs/md sources
- Added 5 missing docs site routes and .tpl pages

## [1.14.0](https://github.com/no-js-dev/nojs-elements/compare/v1.13.3...v1.14.0) — 2026-06-09

### Added

- **Virtual List** element — efficient rendering of large datasets with dynamic row heights, O(log N) binary search for scroll position, and configurable overscan ([fafe96c](https://github.com/no-js-dev/nojs-elements/commit/fafe96c))
- **Accordion** element — collapsible content panels with exclusive/multi mode, keyboard navigation, and CSS-driven animations ([27975bf](https://github.com/no-js-dev/nojs-elements/commit/27975bf))
- **Scroll Spy** element — auto-highlights navigation links based on scroll position with configurable offset, group-level shared MutationObserver ([60d2b24](https://github.com/no-js-dev/nojs-elements/commit/60d2b24))
- **Breadcrumb** element — auto-generates breadcrumb navigation from route hierarchy with customizable separator ([47275a2](https://github.com/no-js-dev/nojs-elements/commit/47275a2))
- Documentation for all 4 new elements (`docs/md/`)
- Unit tests: 104 tests across virtual-list, accordion, scroll-spy, breadcrumb
- GitHub community files: issue template, PR template, contributing, CoC, security, npmignore

### Fixed

- Scroll Spy: consolidated per-element MutationObserver to group-level shared observer — reduces DOM observer count ([2d77626](https://github.com/no-js-dev/nojs-elements/commit/2d77626))
- Virtual List: replaced rAF polling with 100ms setTimeout for container height detection ([2d77626](https://github.com/no-js-dev/nojs-elements/commit/2d77626))
- Virtual List: prefix-sum array with binary search for O(log N) height lookup replacing O(N) scan ([2d77626](https://github.com/no-js-dev/nojs-elements/commit/2d77626))

## [1.13.3](https://github.com/no-js-dev/nojs-elements/compare/v1.13.2...v1.13.3) — 2026-06-05

### Fixed

- Toast: non-interactive `[toast]` element outside reactive context no longer crashes with TypeError.
- DnD: replaced `innerHTML` with `cloneNode(true)` in ghost element creation — prevents XSS via inline event handlers on cloned content.
- Modal: `_observeClose` race condition resolved — `aria-expanded` no longer stuck at `"true"` when modal opens and closes before `requestAnimationFrame` fires.

### Changed

- Tree: extracted keyboard/selection helpers to module scope, added leaf node click selection and keyboard navigation.
- Build: updated banner homepage URL to `elements.no-js.dev`, added `@repository` field.

## [1.13.2](https://github.com/no-js-dev/nojs-elements/compare/v1.13.1...v1.13.2) — 2026-06-02

### Fixed

- Element hardening pass — disposal and reopen invariants tightened across the component suite following the 2026-05-29 deep code review. Popover disposal and the dropdown reopen behavior were the primary fixes, with related hardening across `popover`, `dropdown`, `modal`, `stepper`, `table`, `toast`, `tree`, `tabs`, `tooltip`, `split`, and `skeleton`.
- Added `__tests__/dropdown-reopen-regression.test.js` covering the dropdown reopen regression.

## [1.13.1](https://github.com/no-js-dev/nojs-elements/compare/v1.13.0...v1.13.1) — 2026-06-01

Ecosystem version-sync release. No functional changes to NoJS Elements — version bumped to stay lockstep with the rest of the NoJS ecosystem (NoJS-LSP plugin-metadata polish).

## [1.13.0](https://github.com/no-js-dev/nojs-elements/compare/v1.12.0...v1.13.0) — 2026-06-01

### Added

- **DnD module** — `drag`, `drop`, `drag-list`, `drag-multiple` directives (extracted from NoJS core)
- **Validation module** — `validate` directive with full `$form` context (extracted from NoJS core)
- **Table + DnD integration** — `table-reorder` directive for drag-and-drop row reordering
- **Tree + DnD integration** — `tree-drag-mode` directive for node reparenting and reordering
- **Stepper + Validation integration** — validation gate blocks step advancement on invalid forms
- Migration guide: `docs/md/migration-from-core.md`

### Changed

- Peer dependency bumped to `@no-js-dev/nojs >= 1.13.0` (requires `NoJS.internals` API)
- Plugin entry point registers DnD and Validation before UI elements for integration detection

## [1.12.0](https://github.com/no-js-dev/nojs-elements/compare/v1.11.0...v1.12.0) — 2026-05-27

### Changed

- Consolidated docs CSS design system to match Core (`--primary`, `--text`, `--border` variable names)
- Aligned docs hero section with Core — light `var(--surface)` background, badge, 48px title
- Aligned sidebar with Core — `sidebar-nav` wrapper, `sidebar-title` groups, Core-exact link styling
- Aligned header with Core — added "Getting Started" and "Components" nav links, migrated "More" dropdown to Popover API
- Aligned footer with Core design — replaced links layout with `footer-cols`, removed "Powered by" badge, use Core's SVG logo
- Removed `filter: brightness(0) invert(1)` from inline SVG footer logo
- Added `width: auto` to footer logo SVG to fix spacing
- Version display now reads dynamically from `NoJS.version` instead of hardcoded string
- Connected home hero and docs hero via View Transition API (`view-transition-name: hero`)
- Added `transition="fade"` to `route-view` matching Core

## [1.11.0](https://github.com/no-js-dev/nojs-elements/releases/tag/v1.11.0) — 2026-03-26

### Added

- Initial release with 12 UI components: Drag & Drop, Dropdown, Modal, Popover, Skeleton, Split Pane, Stepper, Sortable Table, Tabs, Toast, Tooltip, Tree
