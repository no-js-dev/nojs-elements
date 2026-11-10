# Contributing to NoJS Elements

Thank you for your interest in contributing to NoJS Elements! Whether you're fixing a bug, adding a new element, improving documentation, or writing tests — every contribution makes the library better for everyone.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Development Setup](#development-setup)
- [Code Conventions](#code-conventions)
- [Contribution Workflows](#contribution-workflows)
  - [Adding a New Element](#adding-a-new-element)
  - [Fixing a Bug](#fixing-a-bug)
  - [Documentation Only](#documentation-only)
- [Branch & Commit Conventions](#branch--commit-conventions)
- [Pull Request Guidelines](#pull-request-guidelines)
- [Quality Gates](#quality-gates)
- [Version Management](#version-management)
- [Need Help?](#need-help)

---

## Code of Conduct

We are committed to providing a welcoming, inclusive, and harassment-free experience for everyone. Please read our [Code of Conduct](CODE_OF_CONDUCT.md).

---

## Getting Started

NoJS Elements (`@no-js-dev/nojs-elements`) is a plugin library of UI components for the [No.JS](https://no-js.dev/) HTML-first reactive framework. Each component is implemented as one or more NoJS directives.

| Repository | Package | Purpose |
| --- | --- | --- |
| [nojs-elements](https://github.com/no-js-dev/nojs-elements) | `@no-js-dev/nojs-elements` | UI element plugins |
| [no-js](https://github.com/no-js-dev/nojs) | `@no-js-dev/nojs` | Core framework (peer dependency) |
| [nojs-lsp](https://github.com/no-js-dev/nojs-lsp) | `nojs-lsp` | VS Code language server |

If your change adds a new directive, the **LSP repo** may need updates too (completions, hover docs).

---

## Project Structure

```plaintext
src/
├── index.js              # Plugin entry: install(NoJS, opts) / dispose(NoJS)
├── cdn.js                # CDN entry — auto-installs when window.NoJS exists
├── dnd/                  # Drag & Drop (drag, drop, drag-list, drag-multiple)
├── dropdown/             # Dropdown menus
├── modal/                # Modal dialogs
├── popover/              # Popovers
├── toast/                # Toast notifications
├── tooltip/              # Tooltips
├── tabs/                 # Tab panels
├── tree/                 # Tree views
├── split/                # Split panes
├── table/                # Sortable tables
├── stepper/              # Step wizards
├── skeleton/             # Loading skeletons
└── validation/           # Form validation

__tests__/               # Jest unit tests (jsdom)
e2e/tests/               # Playwright E2E tests
e2e/examples/            # HTML fixtures for E2E
docs/                    # Documentation site
```

### Element Module Pattern

Every element lives in `src/<name>/` and follows this structure:

| File | Purpose |
| --- | --- |
| `index.js` | Exports `register<Name>(NoJS)` and `cleanup<Name>()` |
| `element.js` | Calls `NoJS.directive(name, { priority, init(el, name, expr) })` |
| `state.js` | Module-scoped state + `reset*State()` for cleanup |
| `styles.js` | Injects a `<style data-nojs-<name>>` tag |

---

## Development Setup

### Prerequisites

- **Node.js** >= 18
- **npm** >= 9

### Setup

```bash
git clone https://github.com/no-js-dev/nojs-elements.git
cd nojs-elements
npm install

# Build (outputs to dist/)
npm run build

# Start the docs dev server
npm start

# Run unit tests
npm test

# Run E2E tests (requires Playwright browsers)
cd e2e && npx playwright install && npx playwright test
```

---

## Code Conventions

| Convention | Example |
| --- | --- |
| One directory per element | `src/dropdown/`, `src/modal/` |
| Register via `NoJS.directive()` | `NoJS.directive('dropdown', { priority: 10, init })` |
| Cleanup via `NoJS._onDispose()` | All listeners, timers, observers |
| Scoped CSS with `data-nojs-*` guard | `style[data-nojs-dropdown]` — inject once |
| State reset function | `resetDropdownState()` called from `cleanup<Name>()` |
| ARIA attributes required | Every interactive element must have proper roles, labels, keyboard nav |
| CSS.escape() for selectors | Never interpolate raw IDs into selectors |
| `textContent` over `innerHTML` | Prevent XSS — use `cloneNode(true)` for duplication |

---

## Contribution Workflows

### Adding a New Element

**Checklist:**

- [ ] Create `src/<name>/` with `index.js`, `element.js`, `state.js`, `styles.js`
- [ ] Wire `register<Name>` / `cleanup<Name>` into `src/index.js`
- [ ] Add unit tests in `__tests__/<name>.test.js`
- [ ] Add E2E tests in `e2e/tests/<name>.spec.ts` with fixture in `e2e/examples/`
- [ ] Add documentation page in `docs/`
- [ ] Implement full ARIA accessibility and keyboard navigation
- [ ] Register cleanup for all event listeners and timers

### Fixing a Bug

- [ ] Write a **failing test** that reproduces the bug
- [ ] Fix the bug
- [ ] Verify **all existing tests** still pass (`npm test`)
- [ ] Run E2E tests if the element has them (`cd e2e && npx playwright test`)
- [ ] If the fix affects LSP-visible behavior, note it in the PR

### Documentation Only

- [ ] Element docs go in `docs/md/` or `docs/pages/`
- [ ] Preview your changes with `npm start`

---

## Branch & Commit Conventions

### Branch Naming

Create your branch from `main`:

| Prefix | Use for |
| --- | --- |
| `feat/` | New features or elements |
| `fix/` | Bug fixes |
| `docs/` | Documentation changes |
| `refactor/` | Code restructuring |
| `chore/` | Tooling, deps, config |

### Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <short description>
```

**Examples:**

```
feat(stepper): add horizontal layout mode
fix(modal): prevent aria-expanded stuck on rapid open/close
docs(tooltip): add delay configuration examples
test(dnd): add cross-container transfer coverage
```

---

## Pull Request Guidelines

1. **One concern per PR** — don't mix unrelated changes
2. **Describe what and why** — explain the change and reasoning
3. **Link related issues** — use `Closes #123` or `Fixes #456`
4. **Ensure all quality gates pass** before requesting review
5. **Keep it reviewable** — split large changes into smaller PRs

---

## Quality Gates

All of the following must pass before a PR can be merged.

| Gate | Command |
| --- | --- |
| Unit tests | `npm test` |
| E2E tests (if applicable) | `cd e2e && npx playwright test` |
| Build succeeds | `npm run build` |

### Quick Verification

```bash
npm run build && npm test
```

---

## Version Management

- All NoJS repositories (Core, Elements, LSP, Server, Skill) share **one version**
- **Contributors should NOT bump versions** — maintainers handle version bumps and releases
- [`.versionrc.json`](.versionrc.json) is the source of truth for every place that declares the current version:
  - `package.json` — `version` (source of truth)
  - `package-lock.json` — root `version` and `packages[""].version`
  - `docs/index.html`, `docs/404.html` — `version: '…'` in `<body state>` (header and footer badge)
  - `dist/{iife,esm,cjs}/nojs-elements.js` — banner, generated by `npm run build`
- [`scripts/version.mjs`](scripts/version.mjs) rewrites (`sync`) and verifies (`check`) those locations; `npm install` (`prepare`) points `core.hooksPath` at `.githooks/` and adds the `git release` / `git release-check` aliases

### Releasing / version bumps

1. On the release branch, update `CHANGELOG.md`, then run `git release X.Y.Z`. It rewrites every declared location, runs `npm run build`, stages them with `CHANGELOG.md` and commits `chore: release vX.Y.Z`. It never creates a tag. (Without the alias: `npm run version:sync -- X.Y.Z`, then commit.)
2. Push the branch, open the release PR and merge it (merge commit).
3. Tag the merge commit: `git tag vX.Y.Z <merge-commit>`. The `reference-transaction` hook runs `scripts/version.mjs check --tag vX.Y.Z` against that commit's files and refuses the tag on any mismatch.
4. Push the tag: `git push origin vX.Y.Z`. The `pre-push` hook runs the same check again before the tag leaves your machine.

CI runs `npm run version:check` on every push and pull request. Run it locally with `npm run version:check` or `git release-check`.

The check fails (exit 1, with `file:line`) when:

- a `files` entry in `.versionrc.json` does not contain the `package.json` version exactly `count` times (default 1)
- `--tag vX.Y.Z` is given and does not match the version
- a tracked file still mentions the previous release (the highest `v*` tag below the current version) outside `scanExclude`, the declared files and `reviewAllowlist`

Version mentions come in three kinds:

| Kind | Example | Handling |
|------|---------|----------|
| Declaration of the current version | the locations above | Listed in `files` — always synced and verified |
| Historical mention | `CHANGELOG.md`, "migrated from core in v1.13.0" | Never touched — excluded via `scanExclude`, or simply not the previous version |
| State claim | "Counts on main at X.Y.Z" | Never changed automatically — listed in `reviewAllowlist` and reported as `REVIEW`, not as a failure |

**Adding a version location:** add `{ "file": "path", "pattern": "literal text with {v}" }` to `files` (or `"regex"` instead of `"pattern"`; `{v}` stands for the version). Add `"count": N` when the pattern legitimately occurs N times, and `"generated": true` when the build writes the file. Then run `npm run version:check`.

---

## Need Help?

- **Found a bug?** Open an [Issue](https://github.com/no-js-dev/nojs-elements/issues)
- **First-time contributor?** Look for issues labeled [`good first issue`](https://github.com/no-js-dev/nojs-elements/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)

We appreciate every contribution, no matter how small. Welcome aboard!
