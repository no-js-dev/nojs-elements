# Changelog

All notable changes to **NoJS Elements** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased](https://github.com/no-js-dev/nojs-elements/compare/v1.15.4...HEAD)

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
