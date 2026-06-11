<style>
  /* ─── Validation-specific ───────────────────── */
  .validation-demo {
    max-width: 500px;
    margin: 0 auto;
    padding: 1rem;
  }
  .validation-demo form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .validation-demo label {
    font-size: 0.8125rem;
    font-weight: 500;
    color: var(--text-secondary);
  }
  .validation-demo input[type="text"],
  .validation-demo input[type="email"],
  .validation-demo input[type="number"],
  .validation-demo input[type="password"] {
    width: 100%;
    padding: 0.5rem 0.75rem;
    border: 1px solid var(--border);
    border-radius: 6px;
    font-size: 0.875rem;
    background: var(--white);
    transition: border-color 0.15s;
  }
  .validation-demo input:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px var(--primary-ring);
  }
  .validation-demo .field-error {
    font-size: 0.75rem;
    color: #EF4444;
    margin-top: 2px;
  }
  .validation-demo .border-red {
    border-color: #EF4444 !important;
  }
  .validation-demo button[type="submit"] {
    padding: 0.5rem 1.25rem;
    border: none;
    border-radius: 6px;
    background: var(--primary);
    color: var(--white);
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.15s;
  }
  .validation-demo button[type="submit"]:hover {
    background: var(--primary-dark);
  }
  .validation-demo button[type="submit"]:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  .validation-demo .field-group {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
</style>

<div class="route-header">
  <span class="route-badge">Forms</span>
  <h1>Validation</h1>
  <p>Declarative form validation with <code>&lt;form validate&gt;</code>, built-in validators, custom rules, and the <code>$form</code> context API.</p>
</div>

<div class="container" style="padding: 2rem;">

<!-- API Documentation -->
<section class="docs-api">

  <p>Add <code>validate</code> to a <code>&lt;form&gt;</code> to enable declarative validation. Creates a <code>$form</code> context object that tracks validity, dirty/touched state, errors, and values for all named fields. The validation module is included in NoJS Elements &mdash; no separate registration needed.</p>

  <h3>Form Attributes</h3>
  <table class="docs-table">
    <thead><tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
    <tbody>
      <tr><td><code>validate</code></td><td>boolean attr</td><td><em>required</em></td><td>Enables form-level validation and creates <code>$form</code> context</td></tr>
      <tr><td><code>validate-on</code></td><td>string</td><td><code>"input focusout"</code></td><td>Space-separated events that trigger validation (form-wide default)</td></tr>
      <tr><td><code>error-class</code></td><td>string</td><td>&mdash;</td><td>CSS class applied to invalid fields (form-wide default)</td></tr>
    </tbody>
  </table>

  <h3>Field Attributes</h3>
  <table class="docs-table">
    <thead><tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
    <tbody>
      <tr><td><code>validate</code></td><td>string (pipe-separated)</td><td>&mdash;</td><td>Validation rules (e.g., <code>"required|email"</code>)</td></tr>
      <tr><td><code>validate-on</code></td><td>string</td><td><em>inherits</em></td><td>Per-field events: <code>"input"</code>, <code>"focusout"</code>, <code>"blur"</code>, <code>"submit"</code></td></tr>
      <tr><td><code>validate-if</code></td><td>expression</td><td>&mdash;</td><td>Expression that must be truthy for this field to be validated</td></tr>
      <tr><td><code>error</code></td><td>string | <code>"#templateId"</code></td><td>&mdash;</td><td>Generic error message or template reference</td></tr>
      <tr><td><code>error-{rule}</code></td><td>string | <code>"#templateId"</code></td><td>&mdash;</td><td>Error message for a specific rule</td></tr>
      <tr><td><code>error-class</code></td><td>string</td><td><em>inherits</em></td><td>CSS class applied when this field is invalid</td></tr>
      <tr><td><code>as</code></td><td>string</td><td>&mdash;</td><td>Expose field state as a named variable in context</td></tr>
      <tr><td><code>name</code></td><td>string</td><td><em>required</em></td><td>Field name, used as key in <code>$form.fields</code>, <code>$form.values</code>, <code>$form.errors</code></td></tr>
    </tbody>
  </table>

  <h3>Built-in Validators</h3>
  <table class="docs-table">
    <thead><tr><th>Rule</th><th>Arguments</th><th>Description</th></tr></thead>
    <tbody>
      <tr><td><code>required</code></td><td>&mdash;</td><td>Value must not be empty or whitespace</td></tr>
      <tr><td><code>email</code></td><td>&mdash;</td><td>Must match <code>user@domain.tld</code> pattern</td></tr>
      <tr><td><code>url</code></td><td>&mdash;</td><td>Must be a valid URL</td></tr>
      <tr><td><code>min</code></td><td><code>min:N</code></td><td>Numeric value must be &gt;= N</td></tr>
      <tr><td><code>max</code></td><td><code>max:N</code></td><td>Numeric value must be &lt;= N</td></tr>
      <tr><td><code>custom</code></td><td><code>custom:name</code></td><td>Calls a validator registered via <code>NoJS.validator()</code></td></tr>
    </tbody>
  </table>

  <h3><code>$form</code> Context API</h3>
  <table class="docs-table">
    <thead><tr><th>Property</th><th>Type</th><th>Description</th></tr></thead>
    <tbody>
      <tr><td><code>$form.valid</code></td><td>boolean</td><td><code>true</code> when all fields pass validation</td></tr>
      <tr><td><code>$form.dirty</code></td><td>boolean</td><td><code>true</code> when any field value has changed</td></tr>
      <tr><td><code>$form.touched</code></td><td>boolean</td><td><code>true</code> when any field has been focused and blurred</td></tr>
      <tr><td><code>$form.submitting</code></td><td>boolean</td><td><code>true</code> during the submit event handler</td></tr>
      <tr><td><code>$form.errors</code></td><td>object</td><td>Map of field name to error message</td></tr>
      <tr><td><code>$form.values</code></td><td>object</td><td>Map of field name to current value</td></tr>
      <tr><td><code>$form.firstError</code></td><td>string | null</td><td>First error message, or <code>null</code></td></tr>
      <tr><td><code>$form.errorCount</code></td><td>number</td><td>Number of fields with errors</td></tr>
      <tr><td><code>$form.reset()</code></td><td>method</td><td>Reset dirty/touched state, clear errors, re-validate</td></tr>
    </tbody>
  </table>

  <h3>Accessibility</h3>
  <p>Native browser validation popups are disabled (<code>novalidate</code> is set). Submit buttons are auto-disabled when the form is invalid. The <code>error-class</code> provides visual feedback for assistive technologies.</p>

</section>

<!-- Basic Form Validation -->
<section class="demo-section">
  <h2>Basic Form Validation</h2>
  <p>A simple registration form with required and email validation rules.</p>
  <div class="demo-tabbed" state="{ showCode: false }">
    <div class="demo-tabbed-bar">
      <div class="demo-tabbed-dots"><span></span><span></span><span></span></div>
      <div class="demo-tabbed-tabs">
        <button class-active="!showCode" on:click="showCode = false">
          <svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/></svg>
          Preview
        </button>
        <button class-active="showCode" on:click="showCode = true">
          <svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
          Code
        </button>
      </div>
    </div>
    <div class="demo-tabbed-panel demo-tab-example" show="!showCode">
      <div class="validation-demo" state="{ name: '', email: '' }">
        <form validate error-class="border-red" on:submit.prevent="">
          <div class="field-group">
            <label>Name</label>
            <input type="text" name="name" model="name" validate="required"
                   error-required="Name is required" placeholder="Enter your name" />
            <span class="field-error"
                  if="$form.fields.name?.touched && $form.fields.name?.error"
                  bind="$form.fields.name.error"></span>
          </div>
          <div class="field-group">
            <label>Email</label>
            <input type="email" name="email" model="email" validate="required|email"
                   error-required="Email is required"
                   error-email="Please enter a valid email" placeholder="you@example.com" />
            <span class="field-error"
                  if="$form.fields.email?.touched && $form.fields.email?.error"
                  bind="$form.fields.email.error"></span>
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
    <div class="demo-tabbed-panel demo-tab-code" show="showCode">
      <div class="demo-code-scroll">
        <pre>
<span class="ln"> 1</span><span class="hl-tag">&lt;div</span> <span class="hl-attr">state</span><span class="hl-op">=</span><span class="hl-str">"{ name: '', email: '' }"</span><span class="hl-tag">&gt;</span>
<span class="ln"> 2</span>  <span class="hl-tag">&lt;form</span> <span class="hl-attr">validate</span> <span class="hl-attr">error-class</span><span class="hl-op">=</span><span class="hl-str">"border-red"</span><span class="hl-tag">&gt;</span>
<span class="ln"> 3</span>    <span class="hl-tag">&lt;input</span> <span class="hl-attr">name</span><span class="hl-op">=</span><span class="hl-str">"name"</span> <span class="hl-attr">model</span><span class="hl-op">=</span><span class="hl-str">"name"</span>
<span class="ln"> 4</span>      <span class="hl-attr">validate</span><span class="hl-op">=</span><span class="hl-str">"required"</span>
<span class="ln"> 5</span>      <span class="hl-attr">error-required</span><span class="hl-op">=</span><span class="hl-str">"Name is required"</span> <span class="hl-tag">/&gt;</span>
<span class="ln"> 6</span>    <span class="hl-tag">&lt;span</span>
<span class="ln"> 7</span>      <span class="hl-attr">if</span><span class="hl-op">=</span><span class="hl-str">"$form.fields.name?.touched
<span class="ln"> 8</span>           &amp;&amp; $form.fields.name?.error"</span>
<span class="ln"> 9</span>      <span class="hl-attr">bind</span><span class="hl-op">=</span><span class="hl-str">"$form.fields.name.error"</span><span class="hl-tag">&gt;&lt;/span&gt;</span>
<span class="ln">10</span>
<span class="ln">11</span>    <span class="hl-tag">&lt;input</span> <span class="hl-attr">name</span><span class="hl-op">=</span><span class="hl-str">"email"</span> <span class="hl-attr">model</span><span class="hl-op">=</span><span class="hl-str">"email"</span>
<span class="ln">12</span>      <span class="hl-attr">validate</span><span class="hl-op">=</span><span class="hl-str">"required|email"</span>
<span class="ln">13</span>      <span class="hl-attr">error-required</span><span class="hl-op">=</span><span class="hl-str">"Email is required"</span>
<span class="ln">14</span>      <span class="hl-attr">error-email</span><span class="hl-op">=</span><span class="hl-str">"Enter a valid email"</span> <span class="hl-tag">/&gt;</span>
<span class="ln">15</span>    <span class="hl-tag">&lt;span</span>
<span class="ln">16</span>      <span class="hl-attr">if</span><span class="hl-op">=</span><span class="hl-str">"$form.fields.email?.touched
<span class="ln">17</span>           &amp;&amp; $form.fields.email?.error"</span>
<span class="ln">18</span>      <span class="hl-attr">bind</span><span class="hl-op">=</span><span class="hl-str">"$form.fields.email.error"</span><span class="hl-tag">&gt;&lt;/span&gt;</span>
<span class="ln">19</span>
<span class="ln">20</span>    <span class="hl-tag">&lt;button</span> <span class="hl-attr">type</span><span class="hl-op">=</span><span class="hl-str">"submit"</span><span class="hl-tag">&gt;</span><span class="hl-expr">Register</span><span class="hl-tag">&lt;/button&gt;</span>
<span class="ln">21</span>  <span class="hl-tag">&lt;/form&gt;</span>
<span class="ln">22</span><span class="hl-tag">&lt;/div&gt;</span></pre>
      </div>
    </div>
  </div>
</section>

<!-- Conditional Validation -->
<section class="demo-section">
  <h2>Conditional Validation</h2>
  <p>Use <code>validate-if</code> to skip validation for fields based on a reactive expression.</p>
  <div class="demo-tabbed" state="{ showCode: false }">
    <div class="demo-tabbed-bar">
      <div class="demo-tabbed-dots"><span></span><span></span><span></span></div>
      <div class="demo-tabbed-tabs">
        <button class-active="!showCode" on:click="showCode = false">
          <svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/></svg>
          Preview
        </button>
        <button class-active="showCode" on:click="showCode = true">
          <svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
          Code
        </button>
      </div>
    </div>
    <div class="demo-tabbed-panel demo-tab-example" show="!showCode">
      <div class="validation-demo" state="{ hasAddress: false }">
        <form validate error-class="border-red" on:submit.prevent="">
          <div class="field-group">
            <label style="display: flex; align-items: center; gap: 6px;">
              <input type="checkbox" model="hasAddress" name="hasAddress" />
              Add shipping address
            </label>
          </div>
          <div show="hasAddress" style="display: flex; flex-direction: column; gap: 0.75rem;">
            <div class="field-group">
              <label>Street</label>
              <input type="text" name="street" model="street" validate="required"
                     validate-if="hasAddress" placeholder="Street address" />
              <span class="field-error"
                    if="$form.fields.street?.touched && $form.fields.street?.error"
                    bind="$form.fields.street.error"></span>
            </div>
            <div class="field-group">
              <label>City</label>
              <input type="text" name="city" model="city" validate="required"
                     validate-if="hasAddress" placeholder="City" />
              <span class="field-error"
                    if="$form.fields.city?.touched && $form.fields.city?.error"
                    bind="$form.fields.city.error"></span>
            </div>
          </div>
          <button type="submit">Order</button>
        </form>
      </div>
    </div>
    <div class="demo-tabbed-panel demo-tab-code" show="showCode">
      <div class="demo-code-scroll">
        <pre>
<span class="ln"> 1</span><span class="hl-tag">&lt;div</span> <span class="hl-attr">state</span><span class="hl-op">=</span><span class="hl-str">"{ hasAddress: false }"</span><span class="hl-tag">&gt;</span>
<span class="ln"> 2</span>  <span class="hl-tag">&lt;form</span> <span class="hl-attr">validate</span><span class="hl-tag">&gt;</span>
<span class="ln"> 3</span>    <span class="hl-tag">&lt;label&gt;</span>
<span class="ln"> 4</span>      <span class="hl-tag">&lt;input</span> <span class="hl-attr">type</span><span class="hl-op">=</span><span class="hl-str">"checkbox"</span>
<span class="ln"> 5</span>        <span class="hl-attr">model</span><span class="hl-op">=</span><span class="hl-str">"hasAddress"</span>
<span class="ln"> 6</span>        <span class="hl-attr">name</span><span class="hl-op">=</span><span class="hl-str">"hasAddress"</span> <span class="hl-tag">/&gt;</span>
<span class="ln"> 7</span>      <span class="hl-expr">Add shipping address</span>
<span class="ln"> 8</span>    <span class="hl-tag">&lt;/label&gt;</span>
<span class="ln"> 9</span>
<span class="ln">10</span>    <span class="hl-tag">&lt;input</span> <span class="hl-attr">name</span><span class="hl-op">=</span><span class="hl-str">"street"</span>
<span class="ln">11</span>      <span class="hl-attr">validate</span><span class="hl-op">=</span><span class="hl-str">"required"</span>
<span class="ln">12</span>      <span class="hl-attr">validate-if</span><span class="hl-op">=</span><span class="hl-str">"hasAddress"</span> <span class="hl-tag">/&gt;</span>
<span class="ln">13</span>    <span class="hl-tag">&lt;input</span> <span class="hl-attr">name</span><span class="hl-op">=</span><span class="hl-str">"city"</span>
<span class="ln">14</span>      <span class="hl-attr">validate</span><span class="hl-op">=</span><span class="hl-str">"required"</span>
<span class="ln">15</span>      <span class="hl-attr">validate-if</span><span class="hl-op">=</span><span class="hl-str">"hasAddress"</span> <span class="hl-tag">/&gt;</span>
<span class="ln">16</span>
<span class="ln">17</span>    <span class="hl-tag">&lt;button</span> <span class="hl-attr">type</span><span class="hl-op">=</span><span class="hl-str">"submit"</span><span class="hl-tag">&gt;</span><span class="hl-expr">Order</span><span class="hl-tag">&lt;/button&gt;</span>
<span class="ln">18</span>  <span class="hl-tag">&lt;/form&gt;</span>
<span class="ln">19</span><span class="hl-tag">&lt;/div&gt;</span></pre>
      </div>
    </div>
  </div>
</section>

<!-- Custom Error Messages -->
<section class="demo-section">
  <h2>Custom Error Messages</h2>
  <p>Override default messages per-field or per-rule with <code>error</code> and <code>error-{rule}</code> attributes.</p>
  <div class="demo-tabbed" state="{ showCode: false }">
    <div class="demo-tabbed-bar">
      <div class="demo-tabbed-dots"><span></span><span></span><span></span></div>
      <div class="demo-tabbed-tabs">
        <button class-active="!showCode" on:click="showCode = false">
          <svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/></svg>
          Preview
        </button>
        <button class-active="showCode" on:click="showCode = true">
          <svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
          Code
        </button>
      </div>
    </div>
    <div class="demo-tabbed-panel demo-tab-example" show="!showCode">
      <p style="padding: 0.5rem 1rem; font-size: 0.8125rem; color: var(--text-dim);">Error resolution priority: <code>error-{rule}</code> &rarr; <code>error</code> &rarr; built-in default.</p>
    </div>
    <div class="demo-tabbed-panel demo-tab-code" show="showCode">
      <div class="demo-code-scroll">
        <pre>
<span class="ln">1</span><span class="hl-tag">&lt;input</span> <span class="hl-attr">name</span><span class="hl-op">=</span><span class="hl-str">"email"</span>
<span class="ln">2</span>  <span class="hl-attr">validate</span><span class="hl-op">=</span><span class="hl-str">"required|email"</span>
<span class="ln">3</span>  <span class="hl-attr">error</span><span class="hl-op">=</span><span class="hl-str">"Please enter a valid email"</span>
<span class="ln">4</span>  <span class="hl-attr">error-required</span><span class="hl-op">=</span><span class="hl-str">"Email is required"</span>
<span class="ln">5</span>  <span class="hl-attr">error-email</span><span class="hl-op">=</span><span class="hl-str">"That doesn't look like an email"</span> <span class="hl-tag">/&gt;</span></pre>
      </div>
    </div>
  </div>
</section>


</div>
