<style>
  .modal-content {
    padding: 2rem;
    max-width: 480px;
    background: var(--surface);
    border-radius: var(--radius-xl);
    box-shadow: 0 20px 60px rgba(0,0,0,0.15), 0 4px 12px rgba(0,0,0,0.1);
  }
  .modal-content h2 {
    margin: 0 0 0.5rem;
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--text);
  }
  .modal-content .modal-desc {
    margin: 0 0 1.5rem;
    color: var(--text-muted);
    font-size: 0.9rem;
    line-height: 1.6;
  }
  .modal-actions {
    display: flex;
    gap: 0.5rem;
    justify-content: flex-end;
    padding-top: 1rem;
    border-top: 1px solid var(--hover-bg);
  }
  .modal-actions button {
    padding: 0.55rem 1.2rem;
    border: 1px solid var(--border);
    border-radius: 8px;
    background: var(--surface);
    cursor: pointer;
    font-size: 0.875rem;
    font-weight: 500;
    transition: all 0.15s ease;
  }
  .modal-actions button:hover { background: var(--white); }
  .modal-actions button.primary {
    background: var(--primary);
    color: var(--surface);
    border-color: var(--primary);
  }
  .modal-actions button.primary:hover { background: var(--primary-dark); }
  .modal-icon {
    width: 44px; height: 44px;
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 1rem;
    font-size: 1.4rem;
  }
  .icon-info  { background: var(--primary-surface); color: var(--primary-dark); }
  .icon-warn  { background: #FFF7ED; color: var(--warning); }
  .icon-lock  { background: #FFF1F2; color: #E11D48; }
  .icon-stack { background: #F0FDF4; color: var(--success); }
  .trigger-btn {
    padding: 0.6rem 1.2rem;
    border: 1px solid var(--border);
    border-radius: 8px;
    background: var(--surface);
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 500;
    transition: all 0.15s ease;
  }
  .trigger-btn:hover { background: var(--hover-bg); border-color: var(--hover-border); }
</style>

<div class="route-header">
  <span class="route-badge">Overlay</span>
  <h1>Modal</h1>
  <p>Accessible modal dialogs with escape control, backdrop options, and nesting support.</p>
</div>

<div class="container" style="padding: 2rem;">

<!-- API Documentation -->
<section class="docs-api">

  <p>Accessible modal dialogs built on the native Popover API. Supports focus trapping, stacking (nested modals), backdrop control, Escape key handling, and full ARIA attributes. Modals can be declared inline or instantiated from <code>&lt;template&gt;</code> elements with <code>use</code> and <code>var-*</code> attributes.</p>

  <h3>Attributes</h3>
  <table class="docs-table">
    <thead><tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
    <tbody>
      <tr><td><code>modal</code></td><td>string (ID)</td><td><em>auto-generated</em></td><td>Unique ID linking the modal to its triggers. When empty, a unique ID is auto-generated</td></tr>
      <tr><td><code>modal-open</code></td><td>string (ID) | empty</td><td>—</td><td>Opens the modal with the given ID on click. Without a value, finds the nearest modal in scope</td></tr>
      <tr><td><code>modal-close</code></td><td>string (ID) | empty</td><td>—</td><td>Without value: closes the closest ancestor modal. With value: closes the modal with that ID</td></tr>
      <tr><td><code>modal-escape</code></td><td><code>"true"</code> | <code>"false"</code></td><td><code>"true"</code></td><td>Set to <code>"false"</code> to disable closing with Escape key and prevent backdrop click from closing</td></tr>
      <tr><td><code>modal-backdrop</code></td><td><code>"true"</code> | <code>"false"</code></td><td><code>"true"</code></td><td>Set to <code>"false"</code> to remove the dark backdrop overlay</td></tr>
      <tr><td><code>modal-class</code></td><td>string</td><td>—</td><td>Additional CSS class(es) applied to the modal element while it is open</td></tr>
    </tbody>
  </table>

  <h3>Accessibility</h3>
  <p>Adds <code>role="dialog"</code>, <code>aria-modal="true"</code>, and <code>aria-labelledby</code> (pointing to the first heading) automatically. Triggers receive <code>aria-haspopup="dialog"</code>, <code>aria-expanded</code>, and <code>aria-controls</code>. Focus is trapped inside the modal with <code>Tab</code>/<code>Shift+Tab</code>. <code>Escape</code> closes the topmost modal (unless disabled). On close, focus returns to the trigger element.</p>

</section>

<!-- Basic Modal -->
<section class="demo-section">
  <h2>Basic Modal</h2>
  <p>Click to open a simple modal. Close it with the button or press Escape.</p>
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
      <button class="trigger-btn" modal-open="basic-modal">Open Basic Modal</button>
      <div modal="basic-modal">
        <div class="modal-content">
          <div class="modal-icon icon-info">&#9432;</div>
          <h2>Basic Modal</h2>
          <p class="modal-desc">This is a simple modal dialog. You can close it by clicking the button below, pressing Escape, or clicking the backdrop.</p>
          <div class="modal-actions">
            <button modal-close>Cancel</button>
            <button class="primary" modal-close>Confirm</button>
          </div>
        </div>
      </div>
    </div>
    <div class="demo-tabbed-panel demo-tab-code" show="showCode">
      <div class="demo-code-scroll">
        <pre>
<span class="ln"> 1</span><span class="hl-tag">&lt;button</span>
<span class="ln"> 2</span>  <span class="hl-attr">class</span><span class="hl-op">=</span><span class="hl-str">"trigger-btn"</span>
<span class="ln"> 3</span>  <span class="hl-attr">modal-open</span><span class="hl-op">=</span><span class="hl-str">"basic-modal"</span><span class="hl-tag">&gt;</span>
<span class="ln"> 4</span>  <span class="hl-expr">Open Basic Modal</span>
<span class="ln"> 5</span><span class="hl-tag">&lt;/button&gt;</span>
<span class="ln"> 6</span>
<span class="ln"> 7</span><span class="hl-tag">&lt;div</span> <span class="hl-attr">modal</span><span class="hl-op">=</span><span class="hl-str">"basic-modal"</span><span class="hl-tag">&gt;</span>
<span class="ln"> 8</span>  <span class="hl-tag">&lt;div</span> <span class="hl-attr">class</span><span class="hl-op">=</span><span class="hl-str">"modal-content"</span><span class="hl-tag">&gt;</span>
<span class="ln"> 9</span>    <span class="hl-tag">&lt;div</span> <span class="hl-attr">class</span><span class="hl-op">=</span><span class="hl-str">"modal-icon icon-info"</span><span class="hl-tag">&gt;</span><span class="hl-expr">&amp;#9432;</span><span class="hl-tag">&lt;/div&gt;</span>
<span class="ln">10</span>    <span class="hl-tag">&lt;h2&gt;</span><span class="hl-expr">Basic Modal</span><span class="hl-tag">&lt;/h2&gt;</span>
<span class="ln">11</span>    <span class="hl-tag">&lt;p</span> <span class="hl-attr">class</span><span class="hl-op">=</span><span class="hl-str">"modal-desc"</span><span class="hl-tag">&gt;</span><span class="hl-expr">This is a simple modal dialog. You can close it by clicking the button below, pressing Escape, or clicking the backdrop.</span><span class="hl-tag">&lt;/p&gt;</span>
<span class="ln">12</span>    <span class="hl-tag">&lt;div</span> <span class="hl-attr">class</span><span class="hl-op">=</span><span class="hl-str">"modal-actions"</span><span class="hl-tag">&gt;</span>
<span class="ln">13</span>      <span class="hl-tag">&lt;button</span> <span class="hl-attr">modal-close</span><span class="hl-tag">&gt;</span><span class="hl-expr">Cancel</span><span class="hl-tag">&lt;/button&gt;</span>
<span class="ln">14</span>      <span class="hl-tag">&lt;button</span> <span class="hl-attr">class</span><span class="hl-op">=</span><span class="hl-str">"primary"</span> <span class="hl-attr">modal-close</span><span class="hl-tag">&gt;</span>
<span class="ln">15</span>        <span class="hl-expr">Confirm</span>
<span class="ln">16</span>      <span class="hl-tag">&lt;/button&gt;</span>
<span class="ln">17</span>    <span class="hl-tag">&lt;/div&gt;</span>
<span class="ln">18</span>  <span class="hl-tag">&lt;/div&gt;</span>
<span class="ln">19</span><span class="hl-tag">&lt;/div&gt;</span></pre>
      </div>
    </div>
  </div>
</section>

<!-- No Escape -->
<section class="demo-section">
  <h2>No Escape</h2>
  <p>This modal cannot be closed with the Escape key. You must use the close button.</p>
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
      <button class="trigger-btn" modal-open="no-escape-modal">Open No-Escape Modal</button>
      <div modal="no-escape-modal" modal-escape="false">
        <div class="modal-content">
          <div class="modal-icon icon-lock">&#128274;</div>
          <h2>No Escape Modal</h2>
          <p class="modal-desc">Pressing Escape will not close this modal. You must click the close button to dismiss it.</p>
          <div class="modal-actions">
            <button class="primary" modal-close>I Understand</button>
          </div>
        </div>
      </div>
    </div>
    <div class="demo-tabbed-panel demo-tab-code" show="showCode">
      <div class="demo-code-scroll">
        <pre>
<span class="ln"> 1</span><span class="hl-tag">&lt;button</span>
<span class="ln"> 2</span>  <span class="hl-attr">class</span><span class="hl-op">=</span><span class="hl-str">"trigger-btn"</span>
<span class="ln"> 3</span>  <span class="hl-attr">modal-open</span><span class="hl-op">=</span><span class="hl-str">"no-escape-modal"</span><span class="hl-tag">&gt;</span>
<span class="ln"> 4</span>  <span class="hl-expr">Open No-Escape Modal</span>
<span class="ln"> 5</span><span class="hl-tag">&lt;/button&gt;</span>
<span class="ln"> 6</span>
<span class="ln"> 7</span><span class="hl-tag">&lt;div</span>
<span class="ln"> 8</span>  <span class="hl-attr">modal</span><span class="hl-op">=</span><span class="hl-str">"no-escape-modal"</span>
<span class="ln"> 9</span>  <span class="hl-attr">modal-escape</span><span class="hl-op">=</span><span class="hl-str">"false"</span><span class="hl-tag">&gt;</span>
<span class="ln">10</span>  <span class="hl-tag">&lt;div</span> <span class="hl-attr">class</span><span class="hl-op">=</span><span class="hl-str">"modal-content"</span><span class="hl-tag">&gt;</span>
<span class="ln">11</span>    <span class="hl-tag">&lt;div</span> <span class="hl-attr">class</span><span class="hl-op">=</span><span class="hl-str">"modal-icon icon-lock"</span><span class="hl-tag">&gt;</span><span class="hl-expr">&amp;#128274;</span><span class="hl-tag">&lt;/div&gt;</span>
<span class="ln">12</span>    <span class="hl-tag">&lt;h2&gt;</span><span class="hl-expr">No Escape Modal</span><span class="hl-tag">&lt;/h2&gt;</span>
<span class="ln">13</span>    <span class="hl-tag">&lt;p</span> <span class="hl-attr">class</span><span class="hl-op">=</span><span class="hl-str">"modal-desc"</span><span class="hl-tag">&gt;</span><span class="hl-expr">Pressing Escape will not close this modal. You must click the close button to dismiss it.</span><span class="hl-tag">&lt;/p&gt;</span>
<span class="ln">14</span>    <span class="hl-tag">&lt;div</span> <span class="hl-attr">class</span><span class="hl-op">=</span><span class="hl-str">"modal-actions"</span><span class="hl-tag">&gt;</span>
<span class="ln">15</span>      <span class="hl-tag">&lt;button</span> <span class="hl-attr">class</span><span class="hl-op">=</span><span class="hl-str">"primary"</span> <span class="hl-attr">modal-close</span><span class="hl-tag">&gt;</span>
<span class="ln">16</span>        <span class="hl-expr">I Understand</span>
<span class="ln">17</span>      <span class="hl-tag">&lt;/button&gt;</span>
<span class="ln">18</span>    <span class="hl-tag">&lt;/div&gt;</span>
<span class="ln">19</span>  <span class="hl-tag">&lt;/div&gt;</span>
<span class="ln">20</span><span class="hl-tag">&lt;/div&gt;</span></pre>
      </div>
    </div>
  </div>
</section>

<!-- No Backdrop -->
<section class="demo-section">
  <h2>No Backdrop</h2>
  <p>This modal opens without a backdrop overlay.</p>
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
      <button class="trigger-btn" modal-open="no-backdrop-modal">Open No-Backdrop Modal</button>
      <div modal="no-backdrop-modal" modal-backdrop="false">
        <div class="modal-content">
          <div class="modal-icon icon-warn">&#9888;</div>
          <h2>No Backdrop Modal</h2>
          <p class="modal-desc">This modal has no backdrop behind it. The page content remains visible and accessible.</p>
          <div class="modal-actions">
            <button modal-close>Close</button>
          </div>
        </div>
      </div>
    </div>
    <div class="demo-tabbed-panel demo-tab-code" show="showCode">
      <div class="demo-code-scroll">
        <pre>
<span class="ln"> 1</span><span class="hl-tag">&lt;button</span>
<span class="ln"> 2</span>  <span class="hl-attr">class</span><span class="hl-op">=</span><span class="hl-str">"trigger-btn"</span>
<span class="ln"> 3</span>  <span class="hl-attr">modal-open</span><span class="hl-op">=</span><span class="hl-str">"no-backdrop-modal"</span><span class="hl-tag">&gt;</span>
<span class="ln"> 4</span>  <span class="hl-expr">Open No-Backdrop Modal</span>
<span class="ln"> 5</span><span class="hl-tag">&lt;/button&gt;</span>
<span class="ln"> 6</span>
<span class="ln"> 7</span><span class="hl-tag">&lt;div</span>
<span class="ln"> 8</span>  <span class="hl-attr">modal</span><span class="hl-op">=</span><span class="hl-str">"no-backdrop-modal"</span>
<span class="ln"> 9</span>  <span class="hl-attr">modal-backdrop</span><span class="hl-op">=</span><span class="hl-str">"false"</span><span class="hl-tag">&gt;</span>
<span class="ln">10</span>  <span class="hl-tag">&lt;div</span> <span class="hl-attr">class</span><span class="hl-op">=</span><span class="hl-str">"modal-content"</span><span class="hl-tag">&gt;</span>
<span class="ln">11</span>    <span class="hl-tag">&lt;div</span> <span class="hl-attr">class</span><span class="hl-op">=</span><span class="hl-str">"modal-icon icon-warn"</span><span class="hl-tag">&gt;</span><span class="hl-expr">&amp;#9888;</span><span class="hl-tag">&lt;/div&gt;</span>
<span class="ln">12</span>    <span class="hl-tag">&lt;h2&gt;</span><span class="hl-expr">No Backdrop Modal</span><span class="hl-tag">&lt;/h2&gt;</span>
<span class="ln">13</span>    <span class="hl-tag">&lt;p</span> <span class="hl-attr">class</span><span class="hl-op">=</span><span class="hl-str">"modal-desc"</span><span class="hl-tag">&gt;</span><span class="hl-expr">This modal has no backdrop behind it. The page content remains visible and accessible.</span><span class="hl-tag">&lt;/p&gt;</span>
<span class="ln">13</span>    <span class="hl-tag">&lt;div</span> <span class="hl-attr">class</span><span class="hl-op">=</span><span class="hl-str">"modal-actions"</span><span class="hl-tag">&gt;</span>
<span class="ln">14</span>      <span class="hl-tag">&lt;button</span> <span class="hl-attr">modal-close</span><span class="hl-tag">&gt;</span><span class="hl-expr">Close</span><span class="hl-tag">&lt;/button&gt;</span>
<span class="ln">15</span>    <span class="hl-tag">&lt;/div&gt;</span>
<span class="ln">16</span>  <span class="hl-tag">&lt;/div&gt;</span>
<span class="ln">17</span><span class="hl-tag">&lt;/div&gt;</span></pre>
      </div>
    </div>
  </div>
</section>

<!-- Nested Modals -->
<section class="demo-section">
  <h2>Nested Modals</h2>
  <p>Open the outer modal, then open another modal from within it.</p>
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
      <button class="trigger-btn" modal-open="outer-modal">Open Outer Modal</button>
      <div modal="outer-modal">
        <div class="modal-content">
          <div class="modal-icon icon-stack">&#9776;</div>
          <h2>Outer Modal</h2>
          <p class="modal-desc">This is the outer modal. Click below to open a nested inner modal on top of this one.</p>
          <div class="modal-actions">
            <button modal-close>Close Outer</button>
            <button class="primary" modal-open="inner-modal">Open Inner Modal</button>
          </div>
        </div>
      </div>
      <div modal="inner-modal">
        <div class="modal-content">
          <div class="modal-icon icon-info">&#10003;</div>
          <h2>Inner Modal</h2>
          <p class="modal-desc">This is the nested inner modal. Closing it will return you to the outer modal.</p>
          <div class="modal-actions">
            <button class="primary" modal-close>Close Inner</button>
          </div>
        </div>
      </div>
    </div>
    <div class="demo-tabbed-panel demo-tab-code" show="showCode">
      <div class="demo-code-scroll">
        <pre>
<span class="ln"> 1</span><span class="hl-cmt">&lt;!-- Trigger --&gt;</span>
<span class="ln"> 2</span><span class="hl-tag">&lt;button</span>
<span class="ln"> 3</span>  <span class="hl-attr">class</span><span class="hl-op">=</span><span class="hl-str">"trigger-btn"</span>
<span class="ln"> 4</span>  <span class="hl-attr">modal-open</span><span class="hl-op">=</span><span class="hl-str">"outer-modal"</span><span class="hl-tag">&gt;</span>
<span class="ln"> 5</span>  <span class="hl-expr">Open Outer Modal</span>
<span class="ln"> 6</span><span class="hl-tag">&lt;/button&gt;</span>
<span class="ln"> 7</span>
<span class="ln"> 8</span><span class="hl-cmt">&lt;!-- Outer modal --&gt;</span>
<span class="ln"> 9</span><span class="hl-tag">&lt;div</span> <span class="hl-attr">modal</span><span class="hl-op">=</span><span class="hl-str">"outer-modal"</span><span class="hl-tag">&gt;</span>
<span class="ln">10</span>  <span class="hl-tag">&lt;div</span> <span class="hl-attr">class</span><span class="hl-op">=</span><span class="hl-str">"modal-content"</span><span class="hl-tag">&gt;</span>
<span class="ln">11</span>    <span class="hl-tag">&lt;div</span> <span class="hl-attr">class</span><span class="hl-op">=</span><span class="hl-str">"modal-icon icon-stack"</span><span class="hl-tag">&gt;</span><span class="hl-expr">&amp;#9776;</span><span class="hl-tag">&lt;/div&gt;</span>
<span class="ln">12</span>    <span class="hl-tag">&lt;h2&gt;</span><span class="hl-expr">Outer Modal</span><span class="hl-tag">&lt;/h2&gt;</span>
<span class="ln">13</span>    <span class="hl-tag">&lt;p</span> <span class="hl-attr">class</span><span class="hl-op">=</span><span class="hl-str">"modal-desc"</span><span class="hl-tag">&gt;</span><span class="hl-expr">This is the outer modal. Click below to open a nested inner modal on top of this one.</span><span class="hl-tag">&lt;/p&gt;</span>
<span class="ln">14</span>    <span class="hl-tag">&lt;div</span> <span class="hl-attr">class</span><span class="hl-op">=</span><span class="hl-str">"modal-actions"</span><span class="hl-tag">&gt;</span>
<span class="ln">15</span>      <span class="hl-tag">&lt;button</span> <span class="hl-attr">modal-close</span><span class="hl-tag">&gt;</span>
<span class="ln">16</span>        <span class="hl-expr">Close Outer</span>
<span class="ln">17</span>      <span class="hl-tag">&lt;/button&gt;</span>
<span class="ln">18</span>      <span class="hl-tag">&lt;button</span> <span class="hl-attr">class</span><span class="hl-op">=</span><span class="hl-str">"primary"</span>
<span class="ln">19</span>        <span class="hl-attr">modal-open</span><span class="hl-op">=</span><span class="hl-str">"inner-modal"</span><span class="hl-tag">&gt;</span>
<span class="ln">20</span>        <span class="hl-expr">Open Inner Modal</span>
<span class="ln">21</span>      <span class="hl-tag">&lt;/button&gt;</span>
<span class="ln">22</span>    <span class="hl-tag">&lt;/div&gt;</span>
<span class="ln">23</span>  <span class="hl-tag">&lt;/div&gt;</span>
<span class="ln">24</span><span class="hl-tag">&lt;/div&gt;</span>
<span class="ln">25</span>
<span class="ln">26</span><span class="hl-cmt">&lt;!-- Inner modal --&gt;</span>
<span class="ln">27</span><span class="hl-tag">&lt;div</span> <span class="hl-attr">modal</span><span class="hl-op">=</span><span class="hl-str">"inner-modal"</span><span class="hl-tag">&gt;</span>
<span class="ln">28</span>  <span class="hl-tag">&lt;div</span> <span class="hl-attr">class</span><span class="hl-op">=</span><span class="hl-str">"modal-content"</span><span class="hl-tag">&gt;</span>
<span class="ln">29</span>    <span class="hl-tag">&lt;div</span> <span class="hl-attr">class</span><span class="hl-op">=</span><span class="hl-str">"modal-icon icon-info"</span><span class="hl-tag">&gt;</span><span class="hl-expr">&amp;#10003;</span><span class="hl-tag">&lt;/div&gt;</span>
<span class="ln">30</span>    <span class="hl-tag">&lt;h2&gt;</span><span class="hl-expr">Inner Modal</span><span class="hl-tag">&lt;/h2&gt;</span>
<span class="ln">31</span>    <span class="hl-tag">&lt;p</span> <span class="hl-attr">class</span><span class="hl-op">=</span><span class="hl-str">"modal-desc"</span><span class="hl-tag">&gt;</span><span class="hl-expr">This is the nested inner modal. Closing it will return you to the outer modal.</span><span class="hl-tag">&lt;/p&gt;</span>
<span class="ln">31</span>    <span class="hl-tag">&lt;div</span> <span class="hl-attr">class</span><span class="hl-op">=</span><span class="hl-str">"modal-actions"</span><span class="hl-tag">&gt;</span>
<span class="ln">32</span>      <span class="hl-tag">&lt;button</span> <span class="hl-attr">class</span><span class="hl-op">=</span><span class="hl-str">"primary"</span> <span class="hl-attr">modal-close</span><span class="hl-tag">&gt;</span>
<span class="ln">33</span>        <span class="hl-expr">Close Inner</span>
<span class="ln">34</span>      <span class="hl-tag">&lt;/button&gt;</span>
<span class="ln">35</span>    <span class="hl-tag">&lt;/div&gt;</span>
<span class="ln">36</span>  <span class="hl-tag">&lt;/div&gt;</span>
<span class="ln">37</span><span class="hl-tag">&lt;/div&gt;</span></pre>
      </div>
    </div>
  </div>
</section>

<!-- Reusable Template -->
<section class="demo-section">
  <h2>Reusable Template</h2>
  <p>Define a modal once as a <code>&lt;template&gt;</code>, then reuse it with different data via <code>var-*</code> attributes.</p>
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
      <!-- Template definition (once) -->
      <template id="confirm-modal">
        <div modal>
          <div class="modal-content">
            <h2 bind="title"></h2>
            <p class="modal-desc" bind="message"></p>
            <div class="modal-actions">
              <button modal-close>Cancel</button>
              <button class="primary" on:click="onConfirm()" modal-close bind="confirmLabel || 'Confirm'"></button>
            </div>
          </div>
        </div>
      </template>

      <!-- Instance 1: Delete -->
      <div state="{ deleted: false }">
        <div use="confirm-modal"
             var-title="'Delete Item?'"
             var-message="'This action cannot be undone. The item will be permanently removed.'"
             var-confirmLabel="'Delete'"
             var-onConfirm="() => { deleted = true }">
        </div>
        <button modal-open class="primary">Delete Item</button>
        <span show="deleted" style="margin-left: 0.5rem; color: var(--error); font-size: 0.85rem;">Deleted!</span>
      </div>

      <div style="margin-top: 1rem;"></div>

      <!-- Instance 2: Archive -->
      <div state="{ archived: false }">
        <div use="confirm-modal"
             var-title="'Archive Project?'"
             var-message="'The project will be moved to the archive. You can restore it later.'"
             var-confirmLabel="'Archive'"
             var-onConfirm="() => { archived = true }">
        </div>
        <button modal-open>Archive Project</button>
        <span show="archived" style="margin-left: 0.5rem; color: var(--success); font-size: 0.85rem;">Archived!</span>
      </div>
    </div>
    <div class="demo-tabbed-panel demo-tab-code" show="showCode">
      <div class="demo-code-scroll">
        <pre>
<span class="ln"> 1</span><span class="hl-cmt">&lt;!-- Define once --&gt;</span>
<span class="ln"> 2</span><span class="hl-tag">&lt;template</span> <span class="hl-attr">id</span><span class="hl-op">=</span><span class="hl-str">"confirm-modal"</span><span class="hl-tag">&gt;</span>
<span class="ln"> 3</span>  <span class="hl-tag">&lt;div</span> <span class="hl-attr">modal</span><span class="hl-tag">&gt;</span>
<span class="ln"> 4</span>    <span class="hl-tag">&lt;div</span> <span class="hl-attr">class</span><span class="hl-op">=</span><span class="hl-str">"modal-content"</span><span class="hl-tag">&gt;</span>
<span class="ln"> 5</span>      <span class="hl-tag">&lt;h2</span> <span class="hl-attr">bind</span><span class="hl-op">=</span><span class="hl-str">"title"</span><span class="hl-tag">&gt;&lt;/h2&gt;</span>
<span class="ln"> 6</span>      <span class="hl-tag">&lt;p</span> <span class="hl-attr">class</span><span class="hl-op">=</span><span class="hl-str">"modal-desc"</span> <span class="hl-attr">bind</span><span class="hl-op">=</span><span class="hl-str">"message"</span><span class="hl-tag">&gt;&lt;/p&gt;</span>
<span class="ln"> 7</span>      <span class="hl-tag">&lt;div</span> <span class="hl-attr">class</span><span class="hl-op">=</span><span class="hl-str">"modal-actions"</span><span class="hl-tag">&gt;</span>
<span class="ln"> 8</span>        <span class="hl-tag">&lt;button</span> <span class="hl-attr">modal-close</span><span class="hl-tag">&gt;</span><span class="hl-expr">Cancel</span><span class="hl-tag">&lt;/button&gt;</span>
<span class="ln"> 9</span>        <span class="hl-tag">&lt;button</span> <span class="hl-attr">class</span><span class="hl-op">=</span><span class="hl-str">"primary"</span>
<span class="ln">10</span>          <span class="hl-attr">on:click</span><span class="hl-op">=</span><span class="hl-str">"onConfirm()"</span>
<span class="ln">11</span>          <span class="hl-attr">modal-close</span>
<span class="ln">12</span>          <span class="hl-attr">bind</span><span class="hl-op">=</span><span class="hl-str">"confirmLabel || 'Confirm'"</span><span class="hl-tag">&gt;</span>
<span class="ln">13</span>        <span class="hl-tag">&lt;/button&gt;</span>
<span class="ln">14</span>      <span class="hl-tag">&lt;/div&gt;</span>
<span class="ln">15</span>    <span class="hl-tag">&lt;/div&gt;</span>
<span class="ln">16</span>  <span class="hl-tag">&lt;/div&gt;</span>
<span class="ln">17</span><span class="hl-tag">&lt;/template&gt;</span>
<span class="ln">18</span>
<span class="ln">19</span><span class="hl-cmt">&lt;!-- Instance 1: Delete --&gt;</span>
<span class="ln">20</span><span class="hl-tag">&lt;div</span> <span class="hl-attr">state</span><span class="hl-op">=</span><span class="hl-str">"{ deleted: false }"</span><span class="hl-tag">&gt;</span>
<span class="ln">21</span>  <span class="hl-tag">&lt;div</span> <span class="hl-attr">use</span><span class="hl-op">=</span><span class="hl-str">"confirm-modal"</span>
<span class="ln">22</span>    <span class="hl-attr">var-title</span><span class="hl-op">=</span><span class="hl-str">"'Delete Item?'"</span>
<span class="ln">23</span>    <span class="hl-attr">var-message</span><span class="hl-op">=</span><span class="hl-str">"'This action cannot be undone. The item will be permanently removed.'"</span>
<span class="ln">24</span>    <span class="hl-attr">var-confirmLabel</span><span class="hl-op">=</span><span class="hl-str">"'Delete'"</span>
<span class="ln">25</span>    <span class="hl-attr">var-onConfirm</span><span class="hl-op">=</span><span class="hl-str">"() =&gt; { deleted = true }"</span><span class="hl-tag">&gt;</span>
<span class="ln">26</span>  <span class="hl-tag">&lt;/div&gt;</span>
<span class="ln">27</span>  <span class="hl-tag">&lt;button</span> <span class="hl-attr">modal-open</span> <span class="hl-attr">class</span><span class="hl-op">=</span><span class="hl-str">"primary"</span><span class="hl-tag">&gt;</span><span class="hl-expr">Delete Item</span><span class="hl-tag">&lt;/button&gt;</span>
<span class="ln">28</span><span class="hl-tag">&lt;/div&gt;</span>
<span class="ln">29</span>
<span class="ln">30</span><span class="hl-cmt">&lt;!-- Instance 2: Archive --&gt;</span>
<span class="ln">31</span><span class="hl-tag">&lt;div</span> <span class="hl-attr">state</span><span class="hl-op">=</span><span class="hl-str">"{ archived: false }"</span><span class="hl-tag">&gt;</span>
<span class="ln">32</span>  <span class="hl-tag">&lt;div</span> <span class="hl-attr">use</span><span class="hl-op">=</span><span class="hl-str">"confirm-modal"</span>
<span class="ln">33</span>    <span class="hl-attr">var-title</span><span class="hl-op">=</span><span class="hl-str">"'Archive Project?'"</span>
<span class="ln">34</span>    <span class="hl-attr">var-message</span><span class="hl-op">=</span><span class="hl-str">"'The project will be moved to the archive. You can restore it later.'"</span>
<span class="ln">35</span>    <span class="hl-attr">var-confirmLabel</span><span class="hl-op">=</span><span class="hl-str">"'Archive'"</span>
<span class="ln">36</span>    <span class="hl-attr">var-onConfirm</span><span class="hl-op">=</span><span class="hl-str">"() =&gt; { archived = true }"</span><span class="hl-tag">&gt;</span>
<span class="ln">37</span>  <span class="hl-tag">&lt;/div&gt;</span>
<span class="ln">38</span>  <span class="hl-tag">&lt;button</span> <span class="hl-attr">modal-open</span><span class="hl-tag">&gt;</span><span class="hl-expr">Archive Project</span><span class="hl-tag">&lt;/button&gt;</span>
<span class="ln">39</span><span class="hl-tag">&lt;/div&gt;</span></pre>
      </div>
    </div>
  </div>
</section>

</div>
