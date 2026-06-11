<style>
  /* ─── Virtual List-specific ─────────────────── */
  .vlist-demo {
    padding: 1rem;
  }
  .vlist-demo ul {
    border: 1px solid var(--border);
    border-radius: 6px;
    background: var(--surface);
    margin: 0;
    padding: 0;
  }
  .vlist-demo li {
    padding: 8px 16px;
    font-size: 0.875rem;
    color: var(--text-secondary);
    border-bottom: 1px solid var(--border);
  }
  .vlist-demo li:last-child {
    border-bottom: none;
  }
</style>

<div class="route-header">
  <span class="route-badge">Performance</span>
  <h1>Virtual List</h1>
  <p>Renders large datasets efficiently by virtualizing the DOM. Only visible items are rendered at any time.</p>
</div>

<div class="container" style="padding: 2rem;">

<!-- API Documentation -->
<section class="docs-api">

  <p>Only the items visible within the scroll viewport (plus a configurable overscan buffer) are rendered, while off-screen items are replaced by lightweight spacer elements. Works with any container/child HTML pattern: <code>&lt;ul&gt;</code>/<code>&lt;li&gt;</code>, <code>&lt;table&gt;</code>/<code>&lt;tr&gt;</code>, <code>&lt;div&gt;</code>/<code>&lt;div&gt;</code>, <code>&lt;dl&gt;</code>, and more.</p>

  <h3>Attributes</h3>
  <table class="docs-table">
    <thead><tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
    <tbody>
      <tr><td><code>virtual-height</code></td><td>number | <code>"auto"</code></td><td><code>50</code></td><td>Row height in pixels. Use a fixed number for uniform rows, or <code>"auto"</code> to measure each row dynamically.</td></tr>
      <tr><td><code>virtual-buffer</code></td><td>number</td><td><code>5</code></td><td>Number of extra items rendered above and below the visible range (overscan).</td></tr>
    </tbody>
  </table>

  <h3>Loop Context Variables</h3>
  <table class="docs-table">
    <thead><tr><th>Variable</th><th>Type</th><th>Description</th></tr></thead>
    <tbody>
      <tr><td><code>$index</code></td><td>number</td><td>Zero-based index of the item in the full array</td></tr>
      <tr><td><code>$count</code></td><td>number</td><td>Total number of items in the array</td></tr>
      <tr><td><code>$first</code></td><td>boolean</td><td><code>true</code> for the first item</td></tr>
      <tr><td><code>$last</code></td><td>boolean</td><td><code>true</code> for the last item</td></tr>
      <tr><td><code>$even</code></td><td>boolean</td><td><code>true</code> for even-indexed items (0, 2, 4...)</td></tr>
      <tr><td><code>$odd</code></td><td>boolean</td><td><code>true</code> for odd-indexed items (1, 3, 5...)</td></tr>
    </tbody>
  </table>

  <h3>CSS Custom Properties</h3>
  <table class="docs-table">
    <thead><tr><th>Property</th><th>Default</th><th>Description</th></tr></thead>
    <tbody>
      <tr><td><code>--nojs-virtual-list-height</code></td><td><code>auto</code></td><td>Container height (can be set via CSS instead of inline styles)</td></tr>
    </tbody>
  </table>

  <h3>Accessibility</h3>
  <p>Spacer elements receive <code>aria-hidden="true"</code> so screen readers skip them. The container uses native scroll semantics. All rendered items retain their original semantics and ARIA attributes from the template.</p>

</section>

<!-- Fixed Height Mode -->
<section class="demo-section">
  <h2>Fixed Height Mode</h2>
  <p>When every row has the same height, set <code>virtual-height</code> to the pixel value for optimal performance.</p>
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
      <div class="vlist-demo" state="{ items: Array.from({ length: 10000 }, (_, i) => ({ name: 'Item ' + (i + 1) })) }">
        <p style="font-size: 0.8125rem; color: var(--text-dim); margin: 0 0 0.5rem;">10,000 items &mdash; scroll to see virtualization in action</p>
        <ul virtual-height="36" style="height: 250px;">
          <li each="item in items" bind="item.name"></li>
        </ul>
      </div>
    </div>
    <div class="demo-tabbed-panel demo-tab-code" show="showCode">
      <div class="demo-code-scroll">
        <pre>
<span class="ln"> 1</span><span class="hl-tag">&lt;div</span> <span class="hl-attr">state</span><span class="hl-op">=</span><span class="hl-str">"{ items: Array.from({ length: 10000 },
<span class="ln"> 2</span>    (_, i) =&gt; ({ name: 'Item ' + (i + 1) })) }"</span><span class="hl-tag">&gt;</span>
<span class="ln"> 3</span>  <span class="hl-tag">&lt;ul</span> <span class="hl-attr">virtual-height</span><span class="hl-op">=</span><span class="hl-str">"36"</span>
<span class="ln"> 4</span>      <span class="hl-attr">style</span><span class="hl-op">=</span><span class="hl-str">"height: 250px;"</span><span class="hl-tag">&gt;</span>
<span class="ln"> 5</span>    <span class="hl-tag">&lt;li</span> <span class="hl-attr">each</span><span class="hl-op">=</span><span class="hl-str">"item in items"</span>
<span class="ln"> 6</span>        <span class="hl-attr">bind</span><span class="hl-op">=</span><span class="hl-str">"item.name"</span><span class="hl-tag">&gt;&lt;/li&gt;</span>
<span class="ln"> 7</span>  <span class="hl-tag">&lt;/ul&gt;</span>
<span class="ln"> 8</span><span class="hl-tag">&lt;/div&gt;</span></pre>
      </div>
    </div>
  </div>
</section>

<!-- Auto Height Mode -->
<section class="demo-section">
  <h2>Auto Height Mode</h2>
  <p>When rows have variable heights, set <code>virtual-height="auto"</code>. Each row is measured dynamically with a ResizeObserver.</p>
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
      <p style="padding: 0.5rem 1rem; font-size: 0.8125rem; color: var(--text-dim);">Auto height mode measures each row with ResizeObserver. An initial estimate of 50px is used for items not yet measured.</p>
    </div>
    <div class="demo-tabbed-panel demo-tab-code" show="showCode">
      <div class="demo-code-scroll">
        <pre>
<span class="ln">1</span><span class="hl-tag">&lt;ul</span> <span class="hl-attr">virtual-height</span><span class="hl-op">=</span><span class="hl-str">"auto"</span>
<span class="ln">2</span>    <span class="hl-attr">style</span><span class="hl-op">=</span><span class="hl-str">"height: 600px;"</span><span class="hl-tag">&gt;</span>
<span class="ln">3</span>  <span class="hl-tag">&lt;li</span> <span class="hl-attr">each</span><span class="hl-op">=</span><span class="hl-str">"item in items"</span><span class="hl-tag">&gt;</span>
<span class="ln">4</span>    <span class="hl-tag">&lt;h3</span> <span class="hl-attr">bind</span><span class="hl-op">=</span><span class="hl-str">"item.title"</span><span class="hl-tag">&gt;&lt;/h3&gt;</span>
<span class="ln">5</span>    <span class="hl-tag">&lt;p</span> <span class="hl-attr">bind</span><span class="hl-op">=</span><span class="hl-str">"item.description"</span><span class="hl-tag">&gt;&lt;/p&gt;</span>
<span class="ln">6</span>  <span class="hl-tag">&lt;/li&gt;</span>
<span class="ln">7</span><span class="hl-tag">&lt;/ul&gt;</span></pre>
      </div>
    </div>
  </div>
</section>

<!-- Table Virtualization -->
<section class="demo-section">
  <h2>Table Virtualization</h2>
  <p>Virtual List supports <code>&lt;table&gt;</code> containers natively. Spacer elements are rendered as <code>&lt;tr&gt;</code> with appropriate <code>colspan</code>.</p>
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
      <p style="padding: 0.5rem 1rem; font-size: 0.8125rem; color: var(--text-dim);">Table containers work out of the box. Spacers use <code>&lt;tr&gt;</code> with <code>&lt;td colspan&gt;</code>.</p>
    </div>
    <div class="demo-tabbed-panel demo-tab-code" show="showCode">
      <div class="demo-code-scroll">
        <pre>
<span class="ln"> 1</span><span class="hl-tag">&lt;table</span> <span class="hl-attr">virtual-height</span><span class="hl-op">=</span><span class="hl-str">"36"</span>
<span class="ln"> 2</span>  <span class="hl-attr">style</span><span class="hl-op">=</span><span class="hl-str">"height: 500px; display: block;
<span class="ln"> 3</span>         overflow-y: auto;"</span><span class="hl-tag">&gt;</span>
<span class="ln"> 4</span>  <span class="hl-tag">&lt;tbody&gt;</span>
<span class="ln"> 5</span>    <span class="hl-tag">&lt;tr</span> <span class="hl-attr">each</span><span class="hl-op">=</span><span class="hl-str">"user in users"</span><span class="hl-tag">&gt;</span>
<span class="ln"> 6</span>      <span class="hl-tag">&lt;td</span> <span class="hl-attr">bind</span><span class="hl-op">=</span><span class="hl-str">"user.name"</span><span class="hl-tag">&gt;&lt;/td&gt;</span>
<span class="ln"> 7</span>      <span class="hl-tag">&lt;td</span> <span class="hl-attr">bind</span><span class="hl-op">=</span><span class="hl-str">"user.email"</span><span class="hl-tag">&gt;&lt;/td&gt;</span>
<span class="ln"> 8</span>      <span class="hl-tag">&lt;td</span> <span class="hl-attr">bind</span><span class="hl-op">=</span><span class="hl-str">"user.role"</span><span class="hl-tag">&gt;&lt;/td&gt;</span>
<span class="ln"> 9</span>    <span class="hl-tag">&lt;/tr&gt;</span>
<span class="ln">10</span>  <span class="hl-tag">&lt;/tbody&gt;</span>
<span class="ln">11</span><span class="hl-tag">&lt;/table&gt;</span></pre>
      </div>
    </div>
  </div>
</section>


</div>
