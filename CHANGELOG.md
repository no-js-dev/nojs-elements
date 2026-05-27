# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.13.0] - 2026-05-27

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
