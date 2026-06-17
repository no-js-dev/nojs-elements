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

- The version lives in `package.json` — it must match the NoJS ecosystem version
- **Contributors should NOT bump versions** — maintainers handle version bumps and releases

---

## Need Help?

- **Found a bug?** Open an [Issue](https://github.com/no-js-dev/nojs-elements/issues)
- **First-time contributor?** Look for issues labeled [`good first issue`](https://github.com/no-js-dev/nojs-elements/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)

We appreciate every contribution, no matter how small. Welcome aboard!
