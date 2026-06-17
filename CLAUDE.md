# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

NoJS Elements (`@no-js-dev/nojs-elements`) — a plugin library of UI components for the No.JS HTML-first reactive framework. Each component is implemented as one or more NoJS directives registered via `NoJS.directive()`. Peer dependency: `@no-js-dev/nojs >= 1.11.0`.

## Commands

```bash
npm run build          # esbuild → dist/{iife,esm,cjs}/nojs-elements.js
npm test               # Jest unit tests (jsdom)
npm run test:watch     # Jest in watch mode
npm run test:verbose   # Jest with verbose output
npx jest __tests__/modal.test.js          # single unit test file
npx jest --testNamePattern="closes on"    # single test by name
npm start              # docs dev server (port from docs/dev-server.js)

# E2E (Playwright — auto-starts test-server.js on port 3001)
cd e2e && npx playwright test
cd e2e && npx playwright test tests/modal.spec.ts   # single e2e spec
```

## Architecture

### Plugin lifecycle

`src/index.js` exports the plugin object with `install(NoJS, options)` and `dispose(NoJS)`. The CDN entry (`src/cdn.js`) auto-installs when `window.NoJS` exists.

### Element module pattern

Every element lives in `src/<name>/` and follows this structure:

| File | Purpose |
|------|---------|
| `index.js` | Exports `register<Name>(NoJS)` and `cleanup<Name>()` |
| `element.js` (or named variant) | Calls `NoJS.directive(name, { priority, init(el, name, expr) })` |
| `state.js` | Module-scoped state + `reset*State()` for cleanup |
| `styles.js` | Injects a `<style data-nojs-<name>>` tag |

Some modules register multiple directives (e.g., dnd registers `drag`, `drop`, `drag-list`, `drag-multiple`; modal registers `modal`, `modal-open`, `modal-close`).

To add a new element: create `src/<name>/` following this pattern, wire `register`/`cleanup` into `src/index.js`, add unit tests in `__tests__/<name>.test.js`, add e2e tests in `e2e/tests/<name>.spec.ts` with an HTML fixture in `e2e/examples/`.

### Directives

Directives are HTML attributes processed by No.JS. Each directive has a numeric `priority` (1–30) controlling init order. The `init` function receives the DOM element, attribute name, and expression string. Cleanup callbacks are registered via `NoJS._onDispose()`.

### Build

`build.js` uses esbuild targeting ES2020. Three output formats: IIFE (minified, CDN), ESM, CJS. All include sourcemaps and a version banner from package.json.

### Tests

- **Unit tests** (`__tests__/*.test.js`): Jest + jsdom + @testing-library/jest-dom. Tests mock `NoJS` and call register functions directly.
- **E2E tests** (`e2e/tests/*.spec.ts`): Playwright across Chromium/Firefox/WebKit. Uses `data-test` as the test ID attribute. The web server (`test-server.js`) runs on port 3001.

### Docs

Element documentation lives in `docs/md/<element-name>.md`. Technical specs and roadmap are in `.github/spec/elements-roadmap/`.
