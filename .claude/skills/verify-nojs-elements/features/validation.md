# Form validation

A visitor fills a form and sees a specific message under each invalid field after leaving it, the submit button stays disabled while the form is invalid, the form summary (`$form.valid`, error count, first error) updates live, and a valid form submits.

## Sub-features

- `validate-required` shows `Name is required` after blurring an empty required field.
- `validate-email` shows `Please enter a valid email` for a malformed address (`error-email`).
- `validate-min` shows `You must be at least 18` below `min:18` (`error-min`).
- `validate-summary` exposes `$form.valid`, `$form.errorCount`, `$form.firstError`.
- `validate-submit-gate` disables the submit button while invalid and enables it when valid.
- `validate-submit` runs the form's `on:submit` once valid.
- Further scenarios on the same page (conditional `validate-if`, focus-out mode, multi-rule, templates, field state, reset) are not in the journey yet.

## How to get to it (user POV)

- Open `/docs/examples/validation/`; "Test 1: Basic form validation" has `Name`, `Email`, `Age`, `Submit` and `Reset`.

## Driving it with verify.mjs

Preconditions:

- `doctor --port <port>` exits 0.

Run `node .claude/skills/verify-nojs-elements/scripts/verify.mjs drive --journey .claude/skills/verify-nojs-elements/journeys/validation.json`.

- **Initial state.** `[data-test=form-valid]` reads `false` and `[data-test=basic-form] [data-test=submit-btn]` is disabled.
- **Required.** Steps `["focus", "[data-test=input-name]"]`, `["key", "Tab"]`. `[data-test=error-name]` reads `Name is required`.
- **Email format.** Steps `["fill", "[data-test=input-email]", "not-an-email"]`, `["key", "Tab"]`. `[data-test=error-email]` reads `Please enter a valid email`.
- **Minimum.** Steps `["fill", "[data-test=input-age]", "10"]`, `["key", "Tab"]`. `[data-test=error-age]` reads `You must be at least 18`.
- **Fix everything.** Fill `Ada`, `ada@example.com`, `30`, then `["key", "Tab"]`. All three errors are hidden, `[data-test=form-valid]` reads `true`, `[data-test=error-count]` reads `0`, the submit button is enabled.
- **Submit.** Step `["click", "[data-test=basic-form] [data-test=submit-btn]"]`. `[data-test=submit-msg]` (`Form submitted!`) is visible.
- **Proof.** Steps `["screenshot", "01-errors"]`, `["aria", "01-errors", "[data-test=basic-form]"]`, `["screenshot", "02-submitted"]`.

## Gotchas

- Several forms on the page reuse `data-test="submit-btn"`; scope it with `[data-test=basic-form]`.
- Errors appear on blur by default; `fill` alone does not blur. Press `Tab` after each field.
- `$form` and `show`/`bind` come from NoJS core. A run on another core release (the shared `../NoJS` default) is not evidence for this pairing; check `loadedCoreVersion` in `result.json`.
