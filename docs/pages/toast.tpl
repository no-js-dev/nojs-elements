<style>
  .toast-buttons {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .toast-buttons button,
  .btn-dismiss,
  .btn-position {
    border-radius: var(--radius-md);
  }
  .btn-error { background: var(--error); color: var(--surface); border-color: var(--error); }
  .btn-error:hover { background: var(--error); border-color: var(--error); }
  .btn-dismiss { background: var(--primary); color: var(--surface); border-color: var(--primary); }
  .btn-dismiss:hover { background: var(--primary-dark); border-color: var(--primary-dark); }
  .btn-position { background: var(--primary); color: var(--surface); border-color: var(--primary); }
  .btn-position:hover { background: var(--primary-dark); border-color: var(--primary-dark); }

  .declarative-row {
    display: flex;
    gap: 1rem;
    align-items: center;
    flex-wrap: wrap;
  }

  .declarative-row input {
    padding: 0.5rem 0.75rem;
    border: 1px solid var(--border);
    border-radius: 6px;
    font-size: 0.95rem;
    min-width: 200px;
  }
</style>

<div class="route-header">
  <span class="route-badge">Feedback</span>
  <h1>Toast</h1>
  <p>Lightweight toast notifications with programmatic and declarative APIs.</p>
</div>

<div class="container" style="padding: 2rem;">

<!-- API Documentation -->
<section class="docs-api">

  <p>Lightweight toast notifications with both declarative and programmatic APIs. Toasts appear in fixed-position containers, auto-dismiss after a configurable duration, and support four visual types. Use the <code>toast</code> attribute on buttons for declarative usage, or call <code>$toast()</code> from any expression context, or <code>NoJS.toast()</code> from JavaScript, for programmatic control.</p>

  <h3>Declarative Attributes</h3>
  <table class="docs-table">
    <thead><tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
    <tbody>
      <tr><td><code>toast</code></td><td>string | expression</td><td><em>required</em></td><td>On buttons/links: the toast message shown on click. On other elements: a watched expression that triggers a toast when it changes to truthy</td></tr>
      <tr><td><code>toast-type</code></td><td><code>"info"</code> | <code>"success"</code> | <code>"warning"</code> | <code>"error"</code></td><td><code>"info"</code></td><td>Visual type of the toast notification</td></tr>
      <tr><td><code>toast-duration</code></td><td>number (ms)</td><td><code>3000</code></td><td>Auto-dismiss delay. Use <code>0</code> for permanent toasts that require manual dismissal</td></tr>
      <tr><td><code>toast-dismiss</code></td><td><code>"true"</code> | <code>"false"</code></td><td><code>"true"</code></td><td>Whether to show a dismiss button on the toast</td></tr>
      <tr><td><code>toast-container</code></td><td><code>"top-right"</code> | <code>"top-left"</code> | <code>"bottom-right"</code> | <code>"bottom-left"</code> | <code>"top-center"</code> | <code>"bottom-center"</code></td><td><code>"top-right"</code></td><td>Screen position for the toast stack. Multiple containers can coexist. Auto-created if none declared</td></tr>
    </tbody>
  </table>

  <h3>Programmatic API</h3>
  <table class="docs-table">
    <thead><tr><th>Method</th><th>Signature</th><th>Description</th></tr></thead>
    <tbody>
      <tr><td><code>NoJS.toast()</code></td><td><code>(message, type?, duration?) → HTMLElement</code></td><td>Creates and shows a toast notification. Returns the toast DOM element</td></tr>
      <tr><td><code>NoJS.toast.dismiss()</code></td><td><code>(id) → void</code></td><td>Dismisses a specific toast by its internal ID</td></tr>
      <tr><td><code>NoJS.toast.dismissAll()</code></td><td><code>() → void</code></td><td>Dismisses all active toasts</td></tr>
    </tbody>
  </table>

  <h3>Accessibility</h3>
  <p>Toast containers receive <code>role="log"</code>, <code>aria-live="polite"</code>, and <code>aria-relevant="additions"</code>. Error toasts are announced immediately with <code>aria-live="assertive"</code>. Dismiss buttons include <code>aria-label="Dismiss"</code>.</p>

</section>

<!-- Programmatic Toasts -->
<section class="demo-section">
  <h2>Declarative Toasts</h2>
  <p>Add a <code>toast</code> attribute to any button. Click triggers the toast automatically.</p>
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
      <div class="toast-buttons">
        <button class="btn-default" toast="This is a default toast">Default</button>
        <button class="btn-success" toast="Success!" toast-type="success">Success</button>
        <button class="btn-error" toast="Error!" toast-type="error">Error</button>
        <button class="btn-warning" toast="Warning!" toast-type="warning">Warning</button>
      </div>
    </div>
    <div class="demo-tabbed-panel demo-tab-code" show="showCode">
      <div class="demo-code-scroll">
        <pre>
<span class="ln"> 1</span><span class="hl-tag">&lt;button</span>
<span class="ln"> 2</span>  <span class="hl-attr">toast</span><span class="hl-op">=</span><span class="hl-str">"This is a default toast"</span><span class="hl-tag">&gt;</span>
<span class="ln"> 3</span>  <span class="hl-expr">Default</span>
<span class="ln"> 4</span><span class="hl-tag">&lt;/button&gt;</span>
<span class="ln"> 5</span>
<span class="ln"> 6</span><span class="hl-tag">&lt;button</span>
<span class="ln"> 7</span>  <span class="hl-attr">toast</span><span class="hl-op">=</span><span class="hl-str">"Success!"</span>
<span class="ln"> 8</span>  <span class="hl-attr">toast-type</span><span class="hl-op">=</span><span class="hl-str">"success"</span><span class="hl-tag">&gt;</span>
<span class="ln"> 9</span>  <span class="hl-expr">Success</span>
<span class="ln">10</span><span class="hl-tag">&lt;/button&gt;</span>
<span class="ln">11</span>
<span class="ln">12</span><span class="hl-tag">&lt;button</span>
<span class="ln">13</span>  <span class="hl-attr">toast</span><span class="hl-op">=</span><span class="hl-str">"Error!"</span>
<span class="ln">14</span>  <span class="hl-attr">toast-type</span><span class="hl-op">=</span><span class="hl-str">"error"</span><span class="hl-tag">&gt;</span>
<span class="ln">15</span>  <span class="hl-expr">Error</span>
<span class="ln">16</span><span class="hl-tag">&lt;/button&gt;</span>
<span class="ln">17</span>
<span class="ln">18</span><span class="hl-tag">&lt;button</span>
<span class="ln">19</span>  <span class="hl-attr">toast</span><span class="hl-op">=</span><span class="hl-str">"Warning!"</span>
<span class="ln">20</span>  <span class="hl-attr">toast-type</span><span class="hl-op">=</span><span class="hl-str">"warning"</span><span class="hl-tag">&gt;</span>
<span class="ln">21</span>  <span class="hl-expr">Warning</span>
<span class="ln">22</span><span class="hl-tag">&lt;/button&gt;</span></pre>
      </div>
    </div>
  </div>
  <div toast-container="top-right"></div>
</section>

<!-- Declarative Toast -->
<section class="demo-section">
  <h2>Programmatic Toast</h2>
  <p>Use <code>NoJS.toast(msg, type, duration)</code> for dynamic messages from reactive state.</p>
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
      <div state="{ msg: '' }">
        <div class="declarative-row">
          <input
            type="text"
            model="msg"
            placeholder="Type a message..."
          />
          <button
            class="btn-info"
            on:click="NoJS.toast(msg, 'info')"
            bind-disabled="!msg.trim()"
          >Show Toast</button>
        </div>
      </div>
    </div>
    <div class="demo-tabbed-panel demo-tab-code" show="showCode">
      <div class="demo-code-scroll">
        <pre>
<span class="ln"> 1</span><span class="hl-tag">&lt;div</span> <span class="hl-attr">state</span><span class="hl-op">=</span><span class="hl-str">"{ msg: '' }"</span><span class="hl-tag">&gt;</span>
<span class="ln"> 2</span>  <span class="hl-tag">&lt;input</span>
<span class="ln"> 3</span>    <span class="hl-attr">type</span><span class="hl-op">=</span><span class="hl-str">"text"</span>
<span class="ln"> 4</span>    <span class="hl-attr">model</span><span class="hl-op">=</span><span class="hl-str">"msg"</span>
<span class="ln"> 5</span>    <span class="hl-attr">placeholder</span><span class="hl-op">=</span><span class="hl-str">"Type a message..."</span> <span class="hl-tag">/&gt;</span>
<span class="ln"> 6</span>
<span class="ln"> 7</span>  <span class="hl-tag">&lt;button</span>
<span class="ln"> 8</span>    <span class="hl-attr">on:click</span><span class="hl-op">=</span><span class="hl-str">"NoJS.toast(msg, 'info')"</span>
<span class="ln"> 9</span>    <span class="hl-attr">bind-disabled</span><span class="hl-op">=</span><span class="hl-str">"!msg.trim()"</span><span class="hl-tag">&gt;</span>
<span class="ln">10</span>    <span class="hl-expr">Show Toast</span>
<span class="ln">11</span>  <span class="hl-tag">&lt;/button&gt;</span>
<span class="ln">12</span><span class="hl-tag">&lt;/div&gt;</span></pre>
      </div>
    </div>
  </div>
</section>

<!-- Dismissible Toast -->
<section class="demo-section">
  <h2>Dismissible Toast</h2>
  <p>Toasts with a close button that stay visible until manually dismissed.</p>
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
      <button
        class="btn-dismiss"
        toast="Dismiss me"
        toast-type="info"
        toast-duration="0"
      >Show Dismissible Toast</button>
    </div>
    <div class="demo-tabbed-panel demo-tab-code" show="showCode">
      <div class="demo-code-scroll">
        <pre>
<span class="ln">1</span><span class="hl-tag">&lt;button</span>
<span class="ln">2</span>  <span class="hl-attr">toast</span><span class="hl-op">=</span><span class="hl-str">"Dismiss me"</span>
<span class="ln">3</span>  <span class="hl-attr">toast-type</span><span class="hl-op">=</span><span class="hl-str">"info"</span>
<span class="ln">4</span>  <span class="hl-attr">toast-duration</span><span class="hl-op">=</span><span class="hl-str">"0"</span><span class="hl-tag">&gt;</span>
<span class="ln">5</span>  <span class="hl-expr">Show Dismissible Toast</span>
<span class="ln">6</span><span class="hl-tag">&lt;/button&gt;</span></pre>
      </div>
    </div>
  </div>
</section>

<!-- Positions -->
<section class="demo-section">
  <h2>Positions</h2>
  <p>Show toasts in different positions on the screen.</p>
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
      <div class="toast-buttons">
        <button class="btn-position" toast="Top right toast">Top Right</button>
        <button class="btn-position" toast="Bottom center toast">Bottom Center</button>
        <button class="btn-position" toast="Top left toast">Top Left</button>
      </div>
    </div>
    <div class="demo-tabbed-panel demo-tab-code" show="showCode">
      <div class="demo-code-scroll">
        <pre>
<span class="ln"> 1</span><span class="hl-tag">&lt;button</span>
<span class="ln"> 2</span>  <span class="hl-attr">toast</span><span class="hl-op">=</span><span class="hl-str">"Top right toast"</span><span class="hl-tag">&gt;</span>
<span class="ln"> 3</span>  <span class="hl-expr">Top Right</span>
<span class="ln"> 4</span><span class="hl-tag">&lt;/button&gt;</span>
<span class="ln"> 5</span>
<span class="ln"> 6</span><span class="hl-tag">&lt;button</span>
<span class="ln"> 7</span>  <span class="hl-attr">toast</span><span class="hl-op">=</span><span class="hl-str">"Bottom center toast"</span><span class="hl-tag">&gt;</span>
<span class="ln"> 8</span>  <span class="hl-expr">Bottom Center</span>
<span class="ln"> 9</span><span class="hl-tag">&lt;/button&gt;</span>
<span class="ln">10</span>
<span class="ln">11</span><span class="hl-tag">&lt;button</span>
<span class="ln">12</span>  <span class="hl-attr">toast</span><span class="hl-op">=</span><span class="hl-str">"Top left toast"</span><span class="hl-tag">&gt;</span>
<span class="ln">13</span>  <span class="hl-expr">Top Left</span>
<span class="ln">14</span><span class="hl-tag">&lt;/button&gt;</span>
<span class="ln">15</span>
<span class="ln">16</span><span class="hl-tag">&lt;div</span> <span class="hl-attr">toast-container</span><span class="hl-op">=</span><span class="hl-str">"bottom-center"</span><span class="hl-tag">&gt;&lt;/div&gt;</span></pre>
      </div>
    </div>
  </div>
  <div toast-container="bottom-center"></div>
</section>

</div>
