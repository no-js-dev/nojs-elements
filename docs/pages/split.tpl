<style>
  .split-demo {
    border: 1px solid var(--border);
    border-radius: 8px;
    overflow: hidden;
  }

  .split-demo [pane] {
    padding: 1rem;
  }

  .pane-sidebar {
    background: var(--hover-bg);
  }

  .pane-content {
    background: var(--surface);
  }

  .pane-editor {
    background: #1e1e2e;
    color: #cdd6f4;
    font-family: monospace;
  }

  .pane-console {
    background: #181825;
    color: #a6e3a1;
    font-family: monospace;
  }

  .pane-nav {
    background: var(--primary-surface);
  }

  .pane-main {
    background: var(--surface);
  }

  .pane-aside {
    background: var(--white);
  }
</style>

<div class="route-header">
  <span class="route-badge">Layout</span>
  <h1>Split Pane</h1>
  <p>Resizable split panes with draggable gutters, min/max constraints, and persistence.</p>
</div>

<div class="container" style="padding: 2rem;">

<!-- API Documentation -->
<section class="docs-api">

  <p>Resizable split panes with draggable gutters, keyboard navigation, min/max constraints, collapsible panels, and optional localStorage persistence. Supports horizontal and vertical layouts, nesting, and any number of panes.</p>

  <h3>Split Container Attributes</h3>
  <table class="docs-table">
    <thead><tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
    <tbody>
      <tr><td><code>split</code></td><td><code>"horizontal"</code> | <code>"vertical"</code></td><td><code>"horizontal"</code></td><td>Split direction. Horizontal places panes side by side; vertical stacks them</td></tr>
      <tr><td><code>split-gutter-size</code></td><td>number (px)</td><td><code>6</code></td><td>Gutter width (horizontal) or height (vertical) in pixels</td></tr>
      <tr><td><code>split-persist</code></td><td>string</td><td>—</td><td>localStorage key for saving/restoring pane sizes. Stored under <code>nojs-split:&lt;key&gt;</code></td></tr>
    </tbody>
  </table>

  <h3>Pane Attributes</h3>
  <table class="docs-table">
    <thead><tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
    <tbody>
      <tr><td><code>pane</code></td><td>string (CSS size)</td><td>—</td><td>Initial size (<code>"250px"</code>, <code>"30%"</code>). Omit for flexible fill</td></tr>
      <tr><td><code>pane-min</code></td><td>number (px)</td><td><code>0</code></td><td>Minimum pane size in pixels. When not set, the default of 0 allows panes to be fully collapsed</td></tr>
      <tr><td><code>pane-max</code></td><td>number (px)</td><td><code>Infinity</code></td><td>Maximum pane size in pixels</td></tr>
    </tbody>
  </table>

  <h3>Accessibility</h3>
  <p>Adds <code>role="separator"</code>, <code>aria-orientation</code>, <code>aria-valuenow</code>, <code>aria-valuemin</code>, <code>aria-valuemax</code>, and <code>aria-label="Resize"</code> on each gutter. Gutters are focusable (<code>tabindex="0"</code>) and support keyboard navigation: <code>Arrow</code> keys resize by 10px, <code>Home</code>/<code>End</code> collapse or expand to limits.</p>

</section>

<!-- 1. Horizontal Split -->
<section class="demo-section">
  <h2>Horizontal Split</h2>
  <p>Two panes side by side: a sidebar at 30% and content area at 70%.</p>
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
      <div class="split-demo" split="horizontal">
        <div pane="30%" class="pane-sidebar">
          <h3>Sidebar</h3>
          <p>Navigation links, filters, or secondary content go here.</p>
        </div>
        <div pane="70%" class="pane-content">
          <h3>Main Content</h3>
          <p>This is the primary content area. Drag the gutter to resize the panes.</p>
        </div>
      </div>
    </div>
    <div class="demo-tabbed-panel demo-tab-code" show="showCode">
      <div class="demo-code-scroll">
        <pre>
<span class="ln"> 1</span><span class="hl-tag">&lt;div</span> <span class="hl-attr">split</span><span class="hl-op">=</span><span class="hl-str">"horizontal"</span><span class="hl-tag">&gt;</span>
<span class="ln"> 2</span>  <span class="hl-tag">&lt;div</span> <span class="hl-attr">pane</span><span class="hl-op">=</span><span class="hl-str">"30%"</span><span class="hl-tag">&gt;</span>
<span class="ln"> 3</span>    <span class="hl-tag">&lt;h3&gt;</span><span class="hl-expr">Sidebar</span><span class="hl-tag">&lt;/h3&gt;</span>
<span class="ln"> 4</span>    <span class="hl-tag">&lt;p&gt;</span><span class="hl-expr">Navigation links...</span><span class="hl-tag">&lt;/p&gt;</span>
<span class="ln"> 5</span>  <span class="hl-tag">&lt;/div&gt;</span>
<span class="ln"> 6</span>  <span class="hl-tag">&lt;div</span> <span class="hl-attr">pane</span><span class="hl-op">=</span><span class="hl-str">"70%"</span><span class="hl-tag">&gt;</span>
<span class="ln"> 7</span>    <span class="hl-tag">&lt;h3&gt;</span><span class="hl-expr">Main Content</span><span class="hl-tag">&lt;/h3&gt;</span>
<span class="ln"> 8</span>    <span class="hl-tag">&lt;p&gt;</span><span class="hl-expr">Drag the gutter to resize.</span><span class="hl-tag">&lt;/p&gt;</span>
<span class="ln"> 9</span>  <span class="hl-tag">&lt;/div&gt;</span>
<span class="ln">10</span><span class="hl-tag">&lt;/div&gt;</span></pre>
      </div>
    </div>
  </div>
</section>

<!-- 2. Vertical Split -->
<section class="demo-section">
  <h2>Vertical Split</h2>
  <p>Panes stacked vertically -- an editor on top and console on the bottom.</p>
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
      <div class="split-demo" split="vertical" style="height: 400px;">
        <div pane="60%" class="pane-editor">
          <h3>Editor</h3>
          <p>function greet(name) {</p>
          <p>&nbsp;&nbsp;return `Hello, ${name}!`;</p>
          <p>}</p>
        </div>
        <div pane="40%" class="pane-console">
          <h3>Console</h3>
          <p>&gt; greet("World")</p>
          <p>"Hello, World!"</p>
        </div>
      </div>
    </div>
    <div class="demo-tabbed-panel demo-tab-code" show="showCode">
      <div class="demo-code-scroll">
        <pre>
<span class="ln"> 1</span><span class="hl-tag">&lt;div</span> <span class="hl-attr">split</span><span class="hl-op">=</span><span class="hl-str">"vertical"</span>
<span class="ln"> 2</span>     <span class="hl-attr">style</span><span class="hl-op">=</span><span class="hl-str">"height: 400px"</span><span class="hl-tag">&gt;</span>
<span class="ln"> 3</span>  <span class="hl-tag">&lt;div</span> <span class="hl-attr">pane</span><span class="hl-op">=</span><span class="hl-str">"60%"</span><span class="hl-tag">&gt;</span>
<span class="ln"> 4</span>    <span class="hl-tag">&lt;h3&gt;</span><span class="hl-expr">Editor</span><span class="hl-tag">&lt;/h3&gt;</span>
<span class="ln"> 5</span>    <span class="hl-tag">&lt;p&gt;</span><span class="hl-expr">function greet(name) {</span><span class="hl-tag">&lt;/p&gt;</span>
<span class="ln"> 6</span>    <span class="hl-tag">&lt;p&gt;</span><span class="hl-expr">&amp;nbsp;&amp;nbsp;return `Hello, ${name}!`;</span><span class="hl-tag">&lt;/p&gt;</span>
<span class="ln"> 7</span>    <span class="hl-tag">&lt;p&gt;</span><span class="hl-expr">}</span><span class="hl-tag">&lt;/p&gt;</span>
<span class="ln"> 8</span>  <span class="hl-tag">&lt;/div&gt;</span>
<span class="ln"> 9</span>  <span class="hl-tag">&lt;div</span> <span class="hl-attr">pane</span><span class="hl-op">=</span><span class="hl-str">"40%"</span><span class="hl-tag">&gt;</span>
<span class="ln">10</span>    <span class="hl-tag">&lt;h3&gt;</span><span class="hl-expr">Console</span><span class="hl-tag">&lt;/h3&gt;</span>
<span class="ln">11</span>    <span class="hl-tag">&lt;p&gt;</span><span class="hl-expr">&gt; greet("World")</span><span class="hl-tag">&lt;/p&gt;</span>
<span class="ln">12</span>    <span class="hl-tag">&lt;p&gt;</span><span class="hl-expr">"Hello, World!"</span><span class="hl-tag">&lt;/p&gt;</span>
<span class="ln">13</span>  <span class="hl-tag">&lt;/div&gt;</span>
<span class="ln">14</span><span class="hl-tag">&lt;/div&gt;</span></pre>
      </div>
    </div>
  </div>
</section>

<!-- 3. Three Panes -->
<section class="demo-section">
  <h2>Three Panes</h2>
  <p>A horizontal split with three panes at 20%, 50%, and 30%.</p>
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
      <div class="split-demo" split="horizontal">
        <div pane="20%" class="pane-nav">
          <h3>Nav</h3>
          <p>File tree</p>
        </div>
        <div pane="50%" class="pane-main">
          <h3>Editor</h3>
          <p>Main workspace</p>
        </div>
        <div pane="30%" class="pane-aside">
          <h3>Preview</h3>
          <p>Live output</p>
        </div>
      </div>
    </div>
    <div class="demo-tabbed-panel demo-tab-code" show="showCode">
      <div class="demo-code-scroll">
        <pre>
<span class="ln"> 1</span><span class="hl-tag">&lt;div</span> <span class="hl-attr">split</span><span class="hl-op">=</span><span class="hl-str">"horizontal"</span><span class="hl-tag">&gt;</span>
<span class="ln"> 2</span>  <span class="hl-tag">&lt;div</span> <span class="hl-attr">pane</span><span class="hl-op">=</span><span class="hl-str">"20%"</span><span class="hl-tag">&gt;</span>
<span class="ln"> 3</span>    <span class="hl-tag">&lt;h3&gt;</span><span class="hl-expr">Nav</span><span class="hl-tag">&lt;/h3&gt;</span>
<span class="ln"> 4</span>    <span class="hl-tag">&lt;p&gt;</span><span class="hl-expr">File tree</span><span class="hl-tag">&lt;/p&gt;</span>
<span class="ln"> 5</span>  <span class="hl-tag">&lt;/div&gt;</span>
<span class="ln"> 6</span>  <span class="hl-tag">&lt;div</span> <span class="hl-attr">pane</span><span class="hl-op">=</span><span class="hl-str">"50%"</span><span class="hl-tag">&gt;</span>
<span class="ln"> 7</span>    <span class="hl-tag">&lt;h3&gt;</span><span class="hl-expr">Editor</span><span class="hl-tag">&lt;/h3&gt;</span>
<span class="ln"> 8</span>    <span class="hl-tag">&lt;p&gt;</span><span class="hl-expr">Main workspace</span><span class="hl-tag">&lt;/p&gt;</span>
<span class="ln"> 9</span>  <span class="hl-tag">&lt;/div&gt;</span>
<span class="ln">10</span>  <span class="hl-tag">&lt;div</span> <span class="hl-attr">pane</span><span class="hl-op">=</span><span class="hl-str">"30%"</span><span class="hl-tag">&gt;</span>
<span class="ln">11</span>    <span class="hl-tag">&lt;h3&gt;</span><span class="hl-expr">Preview</span><span class="hl-tag">&lt;/h3&gt;</span>
<span class="ln">12</span>    <span class="hl-tag">&lt;p&gt;</span><span class="hl-expr">Live output</span><span class="hl-tag">&lt;/p&gt;</span>
<span class="ln">13</span>  <span class="hl-tag">&lt;/div&gt;</span>
<span class="ln">14</span><span class="hl-tag">&lt;/div&gt;</span></pre>
      </div>
    </div>
  </div>
</section>

<!-- 4. With Min/Max Constraints -->
<section class="demo-section">
  <h2>Min / Max Constraints</h2>
  <p>Panes with minimum and maximum size constraints (100px min, 500px max).</p>
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
      <div class="split-demo" split>
        <div pane pane-min="100" pane-max="500" class="pane-sidebar">
          <h3>Constrained Left</h3>
          <p>Min: 100px, Max: 500px</p>
        </div>
        <div pane pane-min="100" pane-max="500" class="pane-content">
          <h3>Constrained Right</h3>
          <p>Min: 100px, Max: 500px</p>
        </div>
      </div>
    </div>
    <div class="demo-tabbed-panel demo-tab-code" show="showCode">
      <div class="demo-code-scroll">
        <pre>
<span class="ln"> 1</span><span class="hl-tag">&lt;div</span> <span class="hl-attr">split</span><span class="hl-tag">&gt;</span>
<span class="ln"> 2</span>  <span class="hl-tag">&lt;div</span> <span class="hl-attr">pane</span>
<span class="ln"> 3</span>       <span class="hl-attr">pane-min</span><span class="hl-op">=</span><span class="hl-str">"100"</span>
<span class="ln"> 4</span>       <span class="hl-attr">pane-max</span><span class="hl-op">=</span><span class="hl-str">"500"</span><span class="hl-tag">&gt;</span>
<span class="ln"> 5</span>    <span class="hl-tag">&lt;h3&gt;</span><span class="hl-expr">Constrained Left</span><span class="hl-tag">&lt;/h3&gt;</span>
<span class="ln"> 6</span>    <span class="hl-tag">&lt;p&gt;</span><span class="hl-expr">Min: 100px, Max: 500px</span><span class="hl-tag">&lt;/p&gt;</span>
<span class="ln"> 7</span>  <span class="hl-tag">&lt;/div&gt;</span>
<span class="ln"> 8</span>  <span class="hl-tag">&lt;div</span> <span class="hl-attr">pane</span>
<span class="ln"> 9</span>       <span class="hl-attr">pane-min</span><span class="hl-op">=</span><span class="hl-str">"100"</span>
<span class="ln">10</span>       <span class="hl-attr">pane-max</span><span class="hl-op">=</span><span class="hl-str">"500"</span><span class="hl-tag">&gt;</span>
<span class="ln">11</span>    <span class="hl-tag">&lt;h3&gt;</span><span class="hl-expr">Constrained Right</span><span class="hl-tag">&lt;/h3&gt;</span>
<span class="ln">12</span>    <span class="hl-tag">&lt;p&gt;</span><span class="hl-expr">Min: 100px, Max: 500px</span><span class="hl-tag">&lt;/p&gt;</span>
<span class="ln">13</span>  <span class="hl-tag">&lt;/div&gt;</span>
<span class="ln">14</span><span class="hl-tag">&lt;/div&gt;</span></pre>
      </div>
    </div>
  </div>
</section>

<!-- 5. Nested: Horizontal + Vertical -->
<section class="demo-section">
  <h2>Nested Split (Horizontal + Vertical)</h2>
  <p>A horizontal split with the right pane split vertically -- an IDE-like layout.</p>
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
      <div class="split-demo" split="horizontal" style="height: 400px;">
        <div pane="20%" class="pane-nav">
          <h3>Explorer</h3>
          <p style="font-size: 0.85rem; color: #64748B">src/<br>&#8194;&#8194;index.js<br>&#8194;&#8194;app.js<br>&#8194;&#8194;utils.js<br>tests/<br>&#8194;&#8194;app.test.js</p>
        </div>
        <div pane="80%" style="padding: 0;">
          <div split="vertical" style="height: 100%;">
            <div pane="65%" class="pane-editor">
              <h3>Editor</h3>
              <p>const app = createApp();</p>
              <p>app.use(router);</p>
              <p>app.mount('#root');</p>
            </div>
            <div pane="35%" class="pane-console">
              <h3>Terminal</h3>
              <p>&gt; npm run dev</p>
              <p>Server running at http://localhost:3000</p>
              <p>Ready in 245ms</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="demo-tabbed-panel demo-tab-code" show="showCode">
      <div class="demo-code-scroll">
        <pre>
<span class="ln"> 1</span><span class="hl-tag">&lt;div</span> <span class="hl-attr">split</span><span class="hl-op">=</span><span class="hl-str">"horizontal"</span>
<span class="ln"> 2</span>     <span class="hl-attr">style</span><span class="hl-op">=</span><span class="hl-str">"height: 400px"</span><span class="hl-tag">&gt;</span>
<span class="ln"> 3</span>  <span class="hl-tag">&lt;div</span> <span class="hl-attr">pane</span><span class="hl-op">=</span><span class="hl-str">"20%"</span><span class="hl-tag">&gt;</span>
<span class="ln"> 4</span>    <span class="hl-tag">&lt;h3&gt;</span><span class="hl-expr">Explorer</span><span class="hl-tag">&lt;/h3&gt;</span>
<span class="ln"> 5</span>    <span class="hl-tag">&lt;p&gt;</span><span class="hl-expr">src/</span><span class="hl-tag">&lt;br&gt;</span><span class="hl-expr">  index.js</span><span class="hl-tag">&lt;/p&gt;</span>
<span class="ln"> 6</span>  <span class="hl-tag">&lt;/div&gt;</span>
<span class="ln"> 7</span>  <span class="hl-tag">&lt;div</span> <span class="hl-attr">pane</span><span class="hl-op">=</span><span class="hl-str">"80%"</span><span class="hl-tag">&gt;</span>
<span class="ln"> 8</span>    <span class="hl-cmt">&lt;!-- Nested vertical split --&gt;</span>
<span class="ln"> 9</span>    <span class="hl-tag">&lt;div</span> <span class="hl-attr">split</span><span class="hl-op">=</span><span class="hl-str">"vertical"</span>
<span class="ln">10</span>         <span class="hl-attr">style</span><span class="hl-op">=</span><span class="hl-str">"height: 100%"</span><span class="hl-tag">&gt;</span>
<span class="ln">11</span>      <span class="hl-tag">&lt;div</span> <span class="hl-attr">pane</span><span class="hl-op">=</span><span class="hl-str">"65%"</span><span class="hl-tag">&gt;</span>
<span class="ln">12</span>        <span class="hl-tag">&lt;h3&gt;</span><span class="hl-expr">Editor</span><span class="hl-tag">&lt;/h3&gt;</span>
<span class="ln">13</span>      <span class="hl-tag">&lt;/div&gt;</span>
<span class="ln">14</span>      <span class="hl-tag">&lt;div</span> <span class="hl-attr">pane</span><span class="hl-op">=</span><span class="hl-str">"35%"</span><span class="hl-tag">&gt;</span>
<span class="ln">15</span>        <span class="hl-tag">&lt;h3&gt;</span><span class="hl-expr">Terminal</span><span class="hl-tag">&lt;/h3&gt;</span>
<span class="ln">16</span>      <span class="hl-tag">&lt;/div&gt;</span>
<span class="ln">17</span>    <span class="hl-tag">&lt;/div&gt;</span>
<span class="ln">18</span>  <span class="hl-tag">&lt;/div&gt;</span>
<span class="ln">19</span><span class="hl-tag">&lt;/div&gt;</span></pre>
      </div>
    </div>
  </div>
</section>

<!-- 6. Custom Gutter -->
<section class="demo-section">
  <h2>Custom Gutter Size</h2>
  <p>A wider 12px gutter for easier resizing.</p>
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
      <div class="split-demo" split split-gutter="12">
        <div pane="40%" class="pane-sidebar">
          <h3>Panel A</h3>
          <p>Notice the wider drag handle between panes.</p>
        </div>
        <div pane="60%" class="pane-content">
          <h3>Panel B</h3>
          <p>The gutter is 12 pixels wide instead of the default.</p>
        </div>
      </div>
    </div>
    <div class="demo-tabbed-panel demo-tab-code" show="showCode">
      <div class="demo-code-scroll">
        <pre>
<span class="ln"> 1</span><span class="hl-tag">&lt;div</span> <span class="hl-attr">split</span>
<span class="ln"> 2</span>     <span class="hl-attr">split-gutter</span><span class="hl-op">=</span><span class="hl-str">"12"</span><span class="hl-tag">&gt;</span>
<span class="ln"> 3</span>  <span class="hl-tag">&lt;div</span> <span class="hl-attr">pane</span><span class="hl-op">=</span><span class="hl-str">"40%"</span><span class="hl-tag">&gt;</span>
<span class="ln"> 4</span>    <span class="hl-tag">&lt;h3&gt;</span><span class="hl-expr">Panel A</span><span class="hl-tag">&lt;/h3&gt;</span>
<span class="ln"> 5</span>    <span class="hl-tag">&lt;p&gt;</span><span class="hl-expr">Wider drag handle.</span><span class="hl-tag">&lt;/p&gt;</span>
<span class="ln"> 6</span>  <span class="hl-tag">&lt;/div&gt;</span>
<span class="ln"> 7</span>  <span class="hl-tag">&lt;div</span> <span class="hl-attr">pane</span><span class="hl-op">=</span><span class="hl-str">"60%"</span><span class="hl-tag">&gt;</span>
<span class="ln"> 8</span>    <span class="hl-tag">&lt;h3&gt;</span><span class="hl-expr">Panel B</span><span class="hl-tag">&lt;/h3&gt;</span>
<span class="ln"> 9</span>    <span class="hl-tag">&lt;p&gt;</span><span class="hl-expr">12px gutter instead of default.</span><span class="hl-tag">&lt;/p&gt;</span>
<span class="ln">10</span>  <span class="hl-tag">&lt;/div&gt;</span>
<span class="ln">11</span><span class="hl-tag">&lt;/div&gt;</span></pre>
      </div>
    </div>
  </div>
</section>

</div>
