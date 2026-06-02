# Changelog

All notable changes to **NoJS Elements** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.13.2](https://github.com/ErickXavier/nojs-elements/compare/v1.13.1...v1.13.2) — 2026-06-02

### Fixed

- Element hardening pass — disposal and reopen invariants tightened across the component suite following the 2026-05-29 deep code review. Popover disposal and the dropdown reopen behavior were the primary fixes, with related hardening across `popover`, `dropdown`, `modal`, `stepper`, `table`, `toast`, `tree`, `tabs`, `tooltip`, `split`, and `skeleton`.
- Added `__tests__/dropdown-reopen-regression.test.js` covering the dropdown reopen regression.

## [1.13.1](https://github.com/ErickXavier/nojs-elements/compare/v1.13.0...v1.13.1) — 2026-06-01

Ecosystem version-sync release. No functional changes to NoJS Elements — version bumped to stay lockstep with the rest of the NoJS ecosystem (NoJS-LSP plugin-metadata polish).

## [1.13.0](https://github.com/ErickXavier/nojs-elements/compare/v1.12.0...v1.13.0) — 2026-06-01

### Added

- **DnD module** — `drag`, `drop`, `drag-list`, `drag-multiple` directives (extracted from NoJS core)
- **Validation module** — `validate` directive with full `$form` context (extracted from NoJS core)
- **Table + DnD integration** — `table-reorder` directive for drag-and-drop row reordering
- **Tree + DnD integration** — `tree-drag-mode` directive for node reparenting and reordering
- **Stepper + Validation integration** — validation gate blocks step advancement on invalid forms
- Migration guide: `docs/md/migration-from-core.md`

### Changed

- Peer dependency bumped to `@erickxavier/no-js >= 1.13.0` (requires `NoJS.internals` API)
- Plugin entry point registers DnD and Validation before UI elements for integration detection

## [1.12.0](https://github.com/ErickXavier/nojs-elements/compare/v1.11.0...v1.12.0) — 2026-05-27

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

## [1.11.0](https://github.com/ErickXavier/nojs-elements/releases/tag/v1.11.0) — 2026-03-26

### Added

- Initial release with 12 UI components: Drag & Drop, Dropdown, Modal, Popover, Skeleton, Split Pane, Stepper, Sortable Table, Tabs, Toast, Tooltip, Tree
