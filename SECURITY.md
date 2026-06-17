# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.13.x  | :white_check_mark: |
| < 1.13  | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability in NoJS Elements, please report it responsibly.

**Do NOT open a public GitHub issue for security vulnerabilities.**

Instead, please email **<contact@no-js.dev>** with:

- A description of the vulnerability
- Steps to reproduce the issue
- The affected version(s)
- Any potential impact assessment

### What to expect

- **Acknowledgment** within 48 hours of your report
- **Status update** within 7 days with an assessment and expected timeline
- **Fix and disclosure** coordinated with you before any public announcement

### Scope

The following are in scope:

- Cross-site scripting (XSS) via element rendering (e.g., innerHTML injection in DnD ghost elements, toast content, modal bodies)
- DOM clobbering or prototype pollution via directive processing
- Event handler injection through user-controlled attribute values
- CSS injection via style injection functions

### Out of scope

- Vulnerabilities in the No.JS core framework (report those to the [core repo](https://github.com/no-js-dev/nojs/security))
- Vulnerabilities in third-party dependencies (we have zero runtime dependencies beyond No.JS)
- Issues requiring physical access to the user's machine

## Security Measures

NoJS Elements follows these security practices:

- **`textContent` over `innerHTML`** — all user-facing text rendering uses `textContent` to prevent XSS
- **`cloneNode(true)` for duplication** — never `innerHTML` for cloning element content
- **`CSS.escape()` for selectors** — all dynamic ID/class lookups use proper escaping
- **No `eval()` or `new Function()`** — no dynamic code execution
- **Scoped event listeners** — all listeners are cleaned up via `NoJS._onDispose()` to prevent memory leaks
- **No prototype access** — no use of `__proto__`, `constructor`, or `prototype` on user data
