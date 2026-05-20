<style>
  /* ─── Getting Started page ──────────────── */
  .gs-step {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
  .gs-step-num {
    flex-shrink: 0;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: var(--color-accent);
    color: #fff;
    font-family: 'Space Grotesk', system-ui, sans-serif;
    font-size: 14px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 2px;
  }
  .gs-step-content {
    flex: 1;
    min-width: 0;
  }
  .gs-step-content h3 {
    font-family: 'Space Grotesk', system-ui, sans-serif;
    font-size: 1rem;
    font-weight: 700;
    color: var(--color-text);
    margin: 0 0 0.25rem;
  }
  .gs-step-content p {
    font-size: 0.875rem;
    color: var(--color-text-muted);
    margin: 0 0 0.75rem;
    line-height: 1.6;
  }

  .gs-note {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    padding: 1rem 1.25rem;
    background: var(--color-accent-bg);
    border: 1px solid rgba(14, 165, 233, 0.2);
    border-radius: var(--radius-lg);
    font-size: 0.85rem;
    color: var(--color-text-secondary);
    line-height: 1.6;
    margin-top: 1rem;
  }
  .gs-note svg {
    flex-shrink: 0;
    width: 18px;
    height: 18px;
    color: var(--color-accent);
    margin-top: 1px;
  }

  .gs-elements-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 0.75rem;
    margin-top: 1rem;
  }
  .gs-element-card {
    display: block;
    padding: 0.75rem 1rem;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    text-decoration: none;
    color: inherit;
    cursor: pointer;
    transition: border-color 0.15s, box-shadow 0.15s;
  }
  .gs-element-card:hover {
    border-color: var(--color-accent);
    box-shadow: 0 1px 4px var(--color-accent-ring);
  }
  .gs-element-card h4 {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--color-text);
    margin: 0 0 0.15rem;
  }
  .gs-element-card p {
    font-size: 0.75rem;
    color: var(--color-text-faint);
    margin: 0;
  }
</style>

<div class="route-header">
  <span class="route-badge">Guide</span>
  <h1>Getting Started</h1>
  <p>Add 12 declarative UI components to your No.JS project in under a minute.</p>
</div>

<div class="container" style="padding: 2rem;">

<!-- Intro -->
<section class="docs-api">
  <p>
    NoJS Elements is a plugin that adds modals, dropdowns, tabs, tooltips, toasts, and more to the <a href="https://no-js.dev" target="_blank">No.JS</a> framework. Every component is controlled via HTML attributes — zero JavaScript required from you.
  </p>
</section>

<!-- Step 1: Installation -->
<section class="demo-section">
  <h2>Installation</h2>
  <p>Add two script tags to your HTML. NoJS Elements auto-installs itself — no setup code needed.</p>

  <div class="demo-tabbed">
    <div class="demo-tabbed-bar">
      <div class="demo-tabbed-dots"><span></span><span></span><span></span></div>
      <div class="demo-tabbed-tabs">
        <button class="active">
          <svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
          HTML
        </button>
      </div>
    </div>
    <div class="demo-tabbed-panel demo-tab-code" style="display: block;">
      <div class="demo-code-scroll">
        <pre>
<span class="ln"> 1</span><span class="hl-c">&lt;!-- 1. Load No.JS core --&gt;</span>
<span class="ln"> 2</span><span class="hl-t">&lt;script</span> <span class="hl-a">src</span><span class="hl-p">=</span><span class="hl-s">"https://cdn.no-js.dev/"</span><span class="hl-t">&gt;&lt;/script&gt;</span>
<span class="ln"> 3</span>
<span class="ln"> 4</span><span class="hl-c">&lt;!-- 2. Load Elements (auto-installs itself) --&gt;</span>
<span class="ln"> 5</span><span class="hl-t">&lt;script</span> <span class="hl-a">src</span><span class="hl-p">=</span><span class="hl-s">"https://cdn-elements.no-js.dev/"</span><span class="hl-t">&gt;&lt;/script&gt;</span>
<span class="ln"> 6</span>
<span class="ln"> 7</span><span class="hl-c">&lt;!-- That's it — start using elements --&gt;</span>
<span class="ln"> 8</span><span class="hl-t">&lt;button</span> <span class="hl-a">tooltip</span><span class="hl-p">=</span><span class="hl-s">"Hello!"</span><span class="hl-t">&gt;</span><span class="hl-x">Hover me</span><span class="hl-t">&lt;/button&gt;</span></pre>
      </div>
    </div>
  </div>

  <div class="gs-note">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
    <span>
      <strong>Auto-install:</strong> NoJS Elements detects No.JS and registers all 12 components
      automatically. No <code>NoJS.use()</code> call, no initialization code — just include the scripts and start using HTML attributes.
    </span>
  </div>
</section>

<!-- Step 2: Peer dependency -->
<section class="demo-section">
  <h2>Peer Dependency</h2>
  <p>NoJS Elements requires <strong>No.JS &ge; 1.11.0</strong>. Make sure the core framework script is loaded <em>before</em> the Elements script.</p>
</section>

<!-- Step 3: Your first element -->
<section class="demo-section">
  <h2>Your First Element</h2>
  <p>A complete working example — a modal dialog in pure HTML attributes.</p>

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
      <template id="gs-modal">
        <div modal>
          <div class="modal-content" style="padding: 2rem; max-width: 400px; background: var(--color-surface); border-radius: var(--radius-xl); box-shadow: 0 20px 60px rgba(0,0,0,0.15);">
            <h2 style="margin: 0 0 0.5rem; font-size: 1.15rem; font-weight: 700;">Welcome!</h2>
            <p style="margin: 0 0 1.25rem; color: var(--color-text-muted); font-size: 0.9rem; line-height: 1.6;">This modal was created with a single HTML attribute. No JavaScript needed.</p>
            <div style="display: flex; justify-content: flex-end;">
              <button class="btn-primary" modal-close>Got it</button>
            </div>
          </div>
        </div>
      </template>
      <div use="gs-modal"></div>
      <button class="btn-primary" modal-open>Open Modal</button>
    </div>
    <div class="demo-tabbed-panel demo-tab-code" show="showCode">
      <div class="demo-code-scroll">
        <pre>
<span class="ln"> 1</span><span class="hl-c">&lt;!-- Template (define once) --&gt;</span>
<span class="ln"> 2</span><span class="hl-t">&lt;template</span> <span class="hl-a">id</span><span class="hl-p">=</span><span class="hl-s">"my-modal"</span><span class="hl-t">&gt;</span>
<span class="ln"> 3</span>  <span class="hl-t">&lt;div</span> <span class="hl-a">modal</span><span class="hl-t">&gt;</span>
<span class="ln"> 4</span>    <span class="hl-t">&lt;div</span> <span class="hl-a">class</span><span class="hl-p">=</span><span class="hl-s">"modal-content"</span><span class="hl-t">&gt;</span>
<span class="ln"> 5</span>      <span class="hl-t">&lt;h2&gt;</span><span class="hl-x">Welcome!</span><span class="hl-t">&lt;/h2&gt;</span>
<span class="ln"> 6</span>      <span class="hl-t">&lt;p&gt;</span><span class="hl-x">This modal was created with a single</span>
<span class="ln"> 7</span>         <span class="hl-x">HTML attribute. No JavaScript needed.</span><span class="hl-t">&lt;/p&gt;</span>
<span class="ln"> 8</span>      <span class="hl-t">&lt;button</span> <span class="hl-a">modal-close</span><span class="hl-t">&gt;</span><span class="hl-x">Got it</span><span class="hl-t">&lt;/button&gt;</span>
<span class="ln"> 9</span>    <span class="hl-t">&lt;/div&gt;</span>
<span class="ln">10</span>  <span class="hl-t">&lt;/div&gt;</span>
<span class="ln">11</span><span class="hl-t">&lt;/template&gt;</span>
<span class="ln">12</span>
<span class="ln">13</span><span class="hl-c">&lt;!-- Instance + Trigger --&gt;</span>
<span class="ln">14</span><span class="hl-t">&lt;div</span> <span class="hl-a">use</span><span class="hl-p">=</span><span class="hl-s">"my-modal"</span><span class="hl-t">&gt;&lt;/div&gt;</span>
<span class="ln">15</span><span class="hl-t">&lt;button</span> <span class="hl-a">modal-open</span><span class="hl-t">&gt;</span><span class="hl-x">Open Modal</span><span class="hl-t">&lt;/button&gt;</span></pre>
      </div>
    </div>
  </div>
</section>

<!-- Step 4: Full example -->
<section class="demo-section">
  <h2>Full Page Example</h2>
  <p>Copy this into an HTML file and open it in your browser.</p>

  <div class="demo-tabbed">
    <div class="demo-tabbed-bar">
      <div class="demo-tabbed-dots"><span></span><span></span><span></span></div>
      <div class="demo-tabbed-tabs">
        <button class="active">
          <svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
          index.html
        </button>
      </div>
    </div>
    <div class="demo-tabbed-panel demo-tab-code" style="display: block;">
      <div class="demo-code-scroll">
        <pre>
<span class="ln"> 1</span><span class="hl-t">&lt;!DOCTYPE html&gt;</span>
<span class="ln"> 2</span><span class="hl-t">&lt;html</span> <span class="hl-a">lang</span><span class="hl-p">=</span><span class="hl-s">"en"</span><span class="hl-t">&gt;</span>
<span class="ln"> 3</span><span class="hl-t">&lt;head&gt;</span>
<span class="ln"> 4</span>  <span class="hl-t">&lt;meta</span> <span class="hl-a">charset</span><span class="hl-p">=</span><span class="hl-s">"UTF-8"</span><span class="hl-t">&gt;</span>
<span class="ln"> 5</span>  <span class="hl-t">&lt;title&gt;</span><span class="hl-x">My App</span><span class="hl-t">&lt;/title&gt;</span>
<span class="ln"> 6</span><span class="hl-t">&lt;/head&gt;</span>
<span class="ln"> 7</span><span class="hl-t">&lt;body&gt;</span>
<span class="ln"> 8</span>
<span class="ln"> 9</span>  <span class="hl-c">&lt;!-- Tabs --&gt;</span>
<span class="ln">10</span>  <span class="hl-t">&lt;div</span> <span class="hl-a">tabs</span><span class="hl-t">&gt;</span>
<span class="ln">11</span>    <span class="hl-t">&lt;button</span> <span class="hl-a">tab</span><span class="hl-t">&gt;</span><span class="hl-x">Profile</span><span class="hl-t">&lt;/button&gt;</span>
<span class="ln">12</span>    <span class="hl-t">&lt;button</span> <span class="hl-a">tab</span><span class="hl-t">&gt;</span><span class="hl-x">Settings</span><span class="hl-t">&lt;/button&gt;</span>
<span class="ln">13</span>    <span class="hl-t">&lt;div</span> <span class="hl-a">panel</span><span class="hl-t">&gt;</span><span class="hl-x">Profile content</span><span class="hl-t">&lt;/div&gt;</span>
<span class="ln">14</span>    <span class="hl-t">&lt;div</span> <span class="hl-a">panel</span><span class="hl-t">&gt;</span><span class="hl-x">Settings content</span><span class="hl-t">&lt;/div&gt;</span>
<span class="ln">15</span>  <span class="hl-t">&lt;/div&gt;</span>
<span class="ln">16</span>
<span class="ln">17</span>  <span class="hl-c">&lt;!-- Tooltip --&gt;</span>
<span class="ln">18</span>  <span class="hl-t">&lt;button</span> <span class="hl-a">tooltip</span><span class="hl-p">=</span><span class="hl-s">"Save your changes"</span><span class="hl-t">&gt;</span><span class="hl-x">Save</span><span class="hl-t">&lt;/button&gt;</span>
<span class="ln">19</span>
<span class="ln">20</span>  <span class="hl-c">&lt;!-- Toast notifications --&gt;</span>
<span class="ln">21</span>  <span class="hl-t">&lt;div</span> <span class="hl-a">toast-container</span><span class="hl-p">=</span><span class="hl-s">"top-right"</span><span class="hl-t">&gt;&lt;/div&gt;</span>
<span class="ln">22</span>  <span class="hl-t">&lt;button</span> <span class="hl-a">toast</span><span class="hl-p">=</span><span class="hl-s">"Saved!"</span> <span class="hl-a">toast-type</span><span class="hl-p">=</span><span class="hl-s">"success"</span><span class="hl-t">&gt;</span><span class="hl-x">Save &amp; Notify</span><span class="hl-t">&lt;/button&gt;</span>
<span class="ln">23</span>
<span class="ln">24</span>  <span class="hl-t">&lt;script</span> <span class="hl-a">src</span><span class="hl-p">=</span><span class="hl-s">"https://cdn.no-js.dev/"</span><span class="hl-t">&gt;&lt;/script&gt;</span>
<span class="ln">25</span>  <span class="hl-t">&lt;script</span> <span class="hl-a">src</span><span class="hl-p">=</span><span class="hl-s">"https://cdn-elements.no-js.dev/"</span><span class="hl-t">&gt;&lt;/script&gt;</span>
<span class="ln">26</span><span class="hl-t">&lt;/body&gt;</span>
<span class="ln">27</span><span class="hl-t">&lt;/html&gt;</span></pre>
      </div>
    </div>
  </div>
</section>

<!-- Available Elements -->
<section class="demo-section">
  <h2>Available Elements</h2>
  <p>NoJS Elements includes 12 components. Click any to see its full documentation and live demos.</p>

  <div class="gs-elements-grid">
    <a class="gs-element-card" route="/dnd">
      <h4>Drag & Drop</h4>
      <p>drag, drop, drag-list</p>
    </a>
    <a class="gs-element-card" route="/dropdown">
      <h4>Dropdown</h4>
      <p>dropdown, dropdown-toggle</p>
    </a>
    <a class="gs-element-card" route="/modal">
      <h4>Modal</h4>
      <p>modal, modal-open, modal-close</p>
    </a>
    <a class="gs-element-card" route="/popover">
      <h4>Popover</h4>
      <p>popover, popover-trigger</p>
    </a>
    <a class="gs-element-card" route="/skeleton">
      <h4>Skeleton</h4>
      <p>skeleton</p>
    </a>
    <a class="gs-element-card" route="/split">
      <h4>Split Pane</h4>
      <p>split, pane</p>
    </a>
    <a class="gs-element-card" route="/stepper">
      <h4>Stepper</h4>
      <p>stepper, step</p>
    </a>
    <a class="gs-element-card" route="/table">
      <h4>Sortable Table</h4>
      <p>sortable, sort</p>
    </a>
    <a class="gs-element-card" route="/tabs">
      <h4>Tabs</h4>
      <p>tabs, tab, panel</p>
    </a>
    <a class="gs-element-card" route="/toast">
      <h4>Toast</h4>
      <p>toast, toast-container</p>
    </a>
    <a class="gs-element-card" route="/tooltip">
      <h4>Tooltip</h4>
      <p>tooltip</p>
    </a>
    <a class="gs-element-card" route="/tree">
      <h4>Tree</h4>
      <p>tree, branch, subtree</p>
    </a>
  </div>
</section>

</div>
