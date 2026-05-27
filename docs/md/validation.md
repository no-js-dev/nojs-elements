# Validation

> The Validation module is included in NoJS Elements. When using the CDN, it is auto-installed — no separate registration is needed. For ESM usage, call `NoJS.use(NoJSElements)` once.

## `<form validate>` — Form-Level Validation

Add `validate` to a `<form>` to enable declarative form validation. Creates a `$form` context object that tracks validity, dirty/touched state, errors, and values for all named fields inside the form.

```html
<!-- Basic validated form -->
<div state="{ name: '', email: '' }">
  <form validate on:submit.prevent="post('/api/register', $form.values)">
    <input name="name" model="name" validate="required" placeholder="Name" />
    <span if="$form.fields.name?.touched && $form.fields.name?.error"
          bind="$form.fields.name.error"
          style="color: red"></span>

    <input name="email" model="email" validate="required|email" placeholder="Email" />
    <span if="$form.fields.email?.touched && $form.fields.email?.error"
          bind="$form.fields.email.error"
          style="color: red"></span>

    <button type="submit">Register</button>
  </form>
</div>
```

Native browser validation popups are disabled automatically (`novalidate` is set on the form).

### Form Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `validate` | boolean attr | *required* | Enables form-level validation and creates `$form` context |
| `validate-on` | string | `"input focusout"` | Space-separated list of events that trigger validation (form-wide default) |
| `error-class` | string | — | CSS class applied to invalid fields (form-wide default, overridden per-field) |

---

## `$form` Context API

Inside any `<form validate>`, the `$form` object is available in expressions.

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `$form.valid` | boolean | `true` when all fields pass validation. Reflects real validity regardless of touched/dirty state |
| `$form.dirty` | boolean | `true` when any field value has changed |
| `$form.touched` | boolean | `true` when any field has been focused and blurred |
| `$form.submitting` | boolean | `true` during the submit event handler (auto-resets on next frame) |
| `$form.pending` | boolean | `true` when any async validators are in-flight |
| `$form.errors` | object | Map of field name to error message — only includes errors for interacted (touched or dirty) fields |
| `$form.values` | object | Map of field name to current value. Checkbox fields map to `true`/`false` |
| `$form.firstError` | string \| null | The first error message (among interacted fields), or `null` |
| `$form.errorCount` | number | Number of interacted fields with errors |
| `$form.fields` | object | Per-field state objects (see below) |

### Methods

| Method | Description |
|--------|-------------|
| `$form.reset()` | Resets dirty/touched state, clears pending validators, calls native `form.reset()`, and re-validates |

### Per-Field State (`$form.fields.<name>`)

Each named field gets a state object accessible via `$form.fields.<fieldName>`:

| Property | Type | Description |
|----------|------|-------------|
| `valid` | boolean | `true` when this field passes all rules |
| `dirty` | boolean | `true` when this field's value has changed |
| `touched` | boolean | `true` when this field has been focused and blurred |
| `error` | string \| null | The highest-priority error message, or `null` |
| `value` | any | Current field value |

```html
<div state="{}">
  <form validate>
    <input name="email" model="email" validate="required|email" />

    <!-- Show error only after interaction -->
    <span if="$form.fields.email?.touched && !$form.fields.email?.valid"
          bind="$form.fields.email.error"
          style="color: red"></span>

    <!-- Disable submit while invalid -->
    <button type="submit" disabled="!$form.valid">Save</button>

    <!-- Show overall form state -->
    <p if="$form.firstError" bind="'Error: ' + $form.firstError"></p>
    <p bind="'Errors: ' + $form.errorCount"></p>
  </form>
</div>
```

---

## Field Validation Rules

### `validate` Attribute

Add to `<input>`, `<textarea>`, or `<select>` to define validation rules. Rules are pipe-separated.

```html
<input name="email" validate="required|email" />
<input name="age" type="number" validate="required|min:18|max:120" />
<input name="website" validate="url" />
<input name="code" validate="required|custom:productCode" />
```

### Built-in Validators

| Rule | Arguments | Error message | Description |
|------|-----------|---------------|-------------|
| `required` | — | `"Required"` | Value must not be empty or whitespace |
| `email` | — | `"Invalid email"` | Must match `user@domain.tld` pattern |
| `url` | — | `"Invalid URL"` | Must be a valid URL (via `new URL()`) |
| `min` | `min:N` | `"Minimum value is N"` | Numeric value must be >= N |
| `max` | `max:N` | `"Maximum value is N"` | Numeric value must be <= N |
| `custom` | `custom:name` | *(from validator)* | Calls a custom validator registered via `NoJS.validator()` |

In addition, native HTML5 validation attributes (`required`, `minlength`, `maxlength`, `pattern`, `type="email"`, `type="url"`, `min`, `max`, `step`) are also checked via the browser's `ValidityState` API. NoJS-specific validators take priority over native ones when both detect the same rule.

### Field Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `validate` | string (pipe-separated) | — | Validation rules (e.g., `"required\|email"`) |
| `validate-on` | string | *(inherits from form)* | Space-separated events: `"input"`, `"focusout"`, `"blur"`, `"submit"` |
| `validate-if` | expression | — | Expression that must be truthy for this field to be validated |
| `error` | string \| `"#templateId"` | — | Generic error message or template reference |
| `error-{rule}` | string \| `"#templateId"` | — | Error message or template for a specific rule (e.g., `error-required="Name is required"`) |
| `error-class` | string | *(inherits from form)* | CSS class applied when this field is invalid |
| `as` | string | — | Exposes the field state as a named variable in context (e.g., `as="emailField"` makes `emailField.valid`, `emailField.error` available) |
| `name` | string | *required* | Field name — used as key in `$form.fields`, `$form.values`, and `$form.errors` |

---

## Validation Triggers (`validate-on`)

Control when validation runs and errors become visible.

```html
<!-- Form-wide: validate on blur only -->
<form validate validate-on="focusout">
  <input name="email" validate="required|email" />
</form>

<!-- Per-field override -->
<form validate>
  <input name="name" validate="required" validate-on="input" />
  <input name="email" validate="required|email" validate-on="focusout" />
  <input name="code" validate="required" validate-on="submit" />
</form>
```

| Trigger | Behavior |
|---------|----------|
| `input` | Validates on every keystroke |
| `focusout` / `blur` | Validates when the field loses focus |
| `submit` | Validates only on form submission |

The default triggers are `input` and `focusout`. When `validate-on` is set on the form, it applies to all fields unless overridden per-field.

Regardless of the `validate-on` setting, `$form.valid` always reflects the real-time validity of the form (for submit button state). The trigger only controls when error messages and `error-class` become visible.

---

## Conditional Validation (`validate-if`)

Skip validation for fields based on a reactive expression.

```html
<div state="{ hasAddress: false }">
  <form validate>
    <label>
      <input type="checkbox" model="hasAddress" name="hasAddress" />
      Add shipping address
    </label>

    <input name="street" model="street" validate="required"
           validate-if="hasAddress" placeholder="Street" />
    <input name="city" model="city" validate="required"
           validate-if="hasAddress" placeholder="City" />

    <button type="submit">Order</button>
  </form>
</div>
```

When `validate-if` evaluates to falsy, the field is treated as valid and excluded from `$form.errors`.

---

## Error Display

### Inline Error Messages

The simplest approach: use `$form.fields` to show errors inline.

```html
<form validate>
  <input name="email" model="email" validate="required|email" />
  <span if="$form.fields.email?.touched && $form.fields.email?.error"
        bind="$form.fields.email.error"
        class="error"></span>
</form>
```

### Custom Error Messages

Override the default message per-field or per-rule.

```html
<input name="email"
       validate="required|email"
       error="Please enter a valid email"
       error-required="Email is required"
       error-email="That doesn't look like an email address" />
```

Error resolution priority:
1. `error-{rule}` attribute (e.g., `error-required`)
2. `error` attribute (generic)
3. Built-in default message

### Error Templates

Reference a `<template>` for structured error rendering.

```html
<input name="email" validate="required|email" error="#email-error" />

<template id="email-error">
  <div class="field-error">
    <span bind="$error"></span>
  </div>
</template>
```

Inside error templates, these variables are available:
- `$error` — the error message string
- `$rule` — the failing rule name (e.g., `"required"`, `"email"`)

### Error Class

Add a CSS class to invalid fields for styling.

```html
<!-- Form-wide error class -->
<form validate error-class="border-red">
  <input name="name" validate="required" />
  <input name="email" validate="required|email" />
</form>

<!-- Per-field override -->
<form validate error-class="border-red">
  <input name="name" validate="required" error-class="bg-red-50 border-red" />
</form>
```

The error class is applied only after the field has been interacted with (touched or dirty).

---

## Exposed Field State (`as`)

Use the `as` attribute to expose a field's validation state as a named variable.

```html
<form validate>
  <input name="email" model="email" validate="required|email" as="emailField" />

  <!-- Use the named variable -->
  <span if="emailField?.touched && !emailField?.valid"
        bind="emailField.error"></span>
  <span if="emailField?.valid">Valid!</span>
</form>
```

---

## Custom Validators

Register custom validation functions via `NoJS.validator()`. This API remains in NoJS Core and works with the Elements validation module.

```html
<script>
  NoJS.validator('phone', (value) => {
    if (!value) return null; // let "required" handle empty
    if (!/^\+?[\d\s\-()]{7,}$/.test(value)) return 'Invalid phone number';
    return null; // null = valid
  });

  NoJS.validator('matchField', (value, fieldName, allValues) => {
    if (value !== allValues[fieldName]) return `Must match ${fieldName}`;
    return null;
  });
</script>

<form validate>
  <input name="phone" validate="required|custom:phone" />
  <input name="password" type="password" model="password" />
  <input name="confirm" type="password" validate="required|custom:matchField:password" />
</form>
```

### Validator Function Signature

```javascript
NoJS.validator(name, (value, ...args, allValues) => {
  // value   — the field value (string)
  // args    — arguments after : in the rule (e.g., "min:5" → args = ["5"])
  // allValues — object of all field values in the form { fieldName: value }
  //
  // Return:
  //   null or true   → valid
  //   string         → error message
});
```

---

## Auto-Disable Submit Buttons

Submit buttons (`<button>` without `type="button"` and `<input type="submit">`) are automatically disabled when the form is invalid or has pending async validators.

```html
<form validate>
  <input name="email" validate="required|email" />
  <!-- This button is auto-disabled until the form is valid -->
  <button type="submit">Submit</button>
</form>
```

To opt out for a specific button, give it an explicit `disabled` expression:

```html
<button type="submit" disabled="!$form.valid || isLoading">Submit</button>
```

---

## Standalone Field Validation

Fields with `validate` can also be used outside a `<form validate>` for simple inline validation.

```html
<div state="{ code: '' }">
  <input model="code" validate="required" error="#code-err" />
  <template id="code-err">
    <span class="error" bind="err.message"></span>
  </template>
</div>
```

In standalone mode, validation runs on `input` events. The error template receives `err.message` (note: `err`, not `$error`).

---

## Submit Handling

The `validate` directive sets `$form.submitting = true` during the submit event, marks all fields as touched (making all errors visible), and re-validates. After the event handler completes, `$form.submitting` resets to `false` on the next animation frame.

```html
<div state="{}">
  <form validate on:submit.prevent="post('/api/submit', $form.values)">
    <input name="name" model="name" validate="required" />
    <input name="email" model="email" validate="required|email" />

    <button type="submit">
      <span hide="$form.submitting">Submit</span>
      <span show="$form.submitting">Submitting...</span>
    </button>
  </form>
</div>
```

---

## Complete Example

```html
<div state="{ showAddress: false }">
  <form validate error-class="border-red-500" on:submit.prevent="post('/api/register', $form.values)">
    <h3>Account</h3>
    <div>
      <label>Name</label>
      <input name="name" model="name" validate="required"
             error-required="Please enter your name" />
      <span if="$form.fields.name?.touched && $form.fields.name?.error"
            bind="$form.fields.name.error" class="text-red-500"></span>
    </div>
    <div>
      <label>Email</label>
      <input name="email" model="email" type="email" validate="required|email"
             error-required="Email is required"
             error-email="Please enter a valid email" />
      <span if="$form.fields.email?.touched && $form.fields.email?.error"
            bind="$form.fields.email.error" class="text-red-500"></span>
    </div>
    <div>
      <label>Age</label>
      <input name="age" model="age" type="number" validate="required|min:18|max:120" />
      <span if="$form.fields.age?.touched && $form.fields.age?.error"
            bind="$form.fields.age.error" class="text-red-500"></span>
    </div>

    <h3>Shipping</h3>
    <label>
      <input type="checkbox" model="showAddress" name="showAddress" />
      Add shipping address
    </label>
    <div show="showAddress">
      <input name="street" model="street" validate="required"
             validate-if="showAddress" placeholder="Street" />
      <input name="city" model="city" validate="required"
             validate-if="showAddress" placeholder="City" />
    </div>

    <div>
      <p if="$form.firstError" bind="$form.firstError" class="text-red-500"></p>
      <button type="submit">Register</button>
      <button type="button" on:click="$form.reset()">Reset</button>
    </div>
  </form>
</div>
```

---

**Previous:** [Drag and Drop &larr;](drag-and-drop.md)
