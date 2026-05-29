<style>
  /* ─── Tooltip-specific ─────────────────────── */
  .tooltip-grid {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: flex-start;
    padding: 1rem;
  }
  .tooltip-grid button {
    padding: 0.6rem 1.2rem;
    border: 1px solid var(--border);
    border-radius: 6px;
    background: var(--surface);
    cursor: pointer;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text-secondary);
    transition: background 0.12s, border-color 0.12s;
  }
  .tooltip-grid button:hover {
    background: var(--hover-bg);
    border-color: var(--hover-border);
  }
</style>

<div class="route-header">
  <span class="route-badge">Overlay</span>
  <h1>Tooltip</h1>
  <p>Lightweight text hints on hover and focus, with positioning, delay, and reactive disable.</p>
</div>

<div class="container" style="padding: 2rem;">

<!-- API Documentation -->
<section class="docs-api">

  <p>Passive text hints that appear on hover or focus. Positioned automatically with viewport awareness, full keyboard support, and reactive disable control.</p>

  <h3>Attributes</h3>
  <table class="docs-table">
    <thead><tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
    <tbody>
      <tr><td><code>tooltip</code></td><td>string</td><td><em>required</em></td><td>Text content displayed in the tooltip</td></tr>
      <tr><td><code>tooltip-position</code></td><td><code>"top"</code> | <code>"bottom"</code> | <code>"left"</code> | <code>"right"</code></td><td><code>"top"</code></td><td>Placement relative to the trigger element</td></tr>
      <tr><td><code>tooltip-delay</code></td><td>number (ms)</td><td><code>300</code></td><td>Delay before the tooltip appears</td></tr>
      <tr><td><code>tooltip-disabled</code></td><td>expression</td><td>—</td><td>Reactive boolean. When truthy, prevents tooltip from showing</td></tr>
    </tbody>
  </table>

  <h3>Accessibility</h3>
  <p>Adds <code>role="tooltip"</code>, <code>aria-describedby</code>, and <code>aria-hidden</code> automatically. Shows on <code>focusin</code>, hides on <code>focusout</code>, and dismisses on <code>Escape</code>.</p>

</section>

<!-- Basic Tooltip -->
<section class="demo-section">
  <h2>Basic Tooltip</h2>
  <p>Hover over each button to see the tooltip at different positions.</p>
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
      <div class="tooltip-grid">
        <button tooltip="Tooltip on top" tooltip-position="top">Top</button>
        <button tooltip="Tooltip on bottom" tooltip-position="bottom">Bottom</button>
        <button tooltip="Tooltip on left" tooltip-position="left">Left</button>
        <button tooltip="Tooltip on right" tooltip-position="right">Right</button>
      </div>
    </div>
    <div class="demo-tabbed-panel demo-tab-code" show="showCode">
      <div class="demo-code-scroll">
        <pre>
<span class="ln"> 1</span><span class="hl-tag">&lt;button</span>
<span class="ln"> 2</span>  <span class="hl-attr">tooltip</span><span class="hl-op">=</span><span class="hl-str">"Tooltip on top"</span>
<span class="ln"> 3</span>  <span class="hl-attr">tooltip-position</span><span class="hl-op">=</span><span class="hl-str">"top"</span><span class="hl-tag">&gt;</span>
<span class="ln"> 4</span>  <span class="hl-expr">Top</span>
<span class="ln"> 5</span><span class="hl-tag">&lt;/button&gt;</span>
<span class="ln"> 6</span>
<span class="ln"> 7</span><span class="hl-tag">&lt;button</span>
<span class="ln"> 8</span>  <span class="hl-attr">tooltip</span><span class="hl-op">=</span><span class="hl-str">"Tooltip on bottom"</span>
<span class="ln"> 9</span>  <span class="hl-attr">tooltip-position</span><span class="hl-op">=</span><span class="hl-str">"bottom"</span><span class="hl-tag">&gt;</span>
<span class="ln">10</span>  <span class="hl-expr">Bottom</span>
<span class="ln">11</span><span class="hl-tag">&lt;/button&gt;</span>
<span class="ln">12</span>
<span class="ln">13</span><span class="hl-tag">&lt;button</span>
<span class="ln">14</span>  <span class="hl-attr">tooltip</span><span class="hl-op">=</span><span class="hl-str">"Tooltip on left"</span>
<span class="ln">15</span>  <span class="hl-attr">tooltip-position</span><span class="hl-op">=</span><span class="hl-str">"left"</span><span class="hl-tag">&gt;</span>
<span class="ln">16</span>  <span class="hl-expr">Left</span>
<span class="ln">17</span><span class="hl-tag">&lt;/button&gt;</span>
<span class="ln">18</span>
<span class="ln">19</span><span class="hl-tag">&lt;button</span>
<span class="ln">20</span>  <span class="hl-attr">tooltip</span><span class="hl-op">=</span><span class="hl-str">"Tooltip on right"</span>
<span class="ln">21</span>  <span class="hl-attr">tooltip-position</span><span class="hl-op">=</span><span class="hl-str">"right"</span><span class="hl-tag">&gt;</span>
<span class="ln">22</span>  <span class="hl-expr">Right</span>
<span class="ln">23</span><span class="hl-tag">&lt;/button&gt;</span></pre>
      </div>
    </div>
  </div>
</section>

<!-- Custom Delay -->
<section class="demo-section">
  <h2>Custom Delay</h2>
  <p>The first tooltip appears instantly, the second after a 1-second delay.</p>
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
      <div class="tooltip-grid">
        <button tooltip="I appear instantly" tooltip-delay="0">Instant (0ms)</button>
        <button tooltip="I appear after 1s" tooltip-delay="1000">Slow (1000ms)</button>
      </div>
    </div>
    <div class="demo-tabbed-panel demo-tab-code" show="showCode">
      <div class="demo-code-scroll">
        <pre>
<span class="ln"> 1</span><span class="hl-tag">&lt;button</span>
<span class="ln"> 2</span>  <span class="hl-attr">tooltip</span><span class="hl-op">=</span><span class="hl-str">"I appear instantly"</span>
<span class="ln"> 3</span>  <span class="hl-attr">tooltip-delay</span><span class="hl-op">=</span><span class="hl-str">"0"</span><span class="hl-tag">&gt;</span>
<span class="ln"> 4</span>  <span class="hl-expr">Instant (0ms)</span>
<span class="ln"> 5</span><span class="hl-tag">&lt;/button&gt;</span>
<span class="ln"> 6</span>
<span class="ln"> 7</span><span class="hl-tag">&lt;button</span>
<span class="ln"> 8</span>  <span class="hl-attr">tooltip</span><span class="hl-op">=</span><span class="hl-str">"I appear after 1s"</span>
<span class="ln"> 9</span>  <span class="hl-attr">tooltip-delay</span><span class="hl-op">=</span><span class="hl-str">"1000"</span><span class="hl-tag">&gt;</span>
<span class="ln">10</span>  <span class="hl-expr">Slow (1000ms)</span>
<span class="ln">11</span><span class="hl-tag">&lt;/button&gt;</span></pre>
      </div>
    </div>
  </div>
</section>

<!-- Disabled Tooltip -->
<section class="demo-section">
  <h2>Disabled Tooltip</h2>
  <p>Use <code>tooltip-disabled</code> to reactively prevent the tooltip from showing.</p>
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
      <div state="{ off: false }" class="tooltip-grid">
        <button tooltip="I can be disabled" tooltip-disabled="off">Hover me</button>
        <button on:click="off = !off" bind="off ? 'Enable Tooltip' : 'Disable Tooltip'"></button>
      </div>
    </div>
    <div class="demo-tabbed-panel demo-tab-code" show="showCode">
      <div class="demo-code-scroll">
        <pre>
<span class="ln"> 1</span><span class="hl-tag">&lt;div</span> <span class="hl-attr">state</span><span class="hl-op">=</span><span class="hl-str">"{ off: false }"</span><span class="hl-tag">&gt;</span>
<span class="ln"> 2</span>  <span class="hl-tag">&lt;button</span>
<span class="ln"> 3</span>    <span class="hl-attr">tooltip</span><span class="hl-op">=</span><span class="hl-str">"I can be disabled"</span>
<span class="ln"> 4</span>    <span class="hl-attr">tooltip-disabled</span><span class="hl-op">=</span><span class="hl-str">"off"</span><span class="hl-tag">&gt;</span>
<span class="ln"> 5</span>    <span class="hl-expr">Hover me</span>
<span class="ln"> 6</span>  <span class="hl-tag">&lt;/button&gt;</span>
<span class="ln"> 7</span>
<span class="ln"> 8</span>  <span class="hl-tag">&lt;button</span>
<span class="ln"> 9</span>    <span class="hl-attr">on:click</span><span class="hl-op">=</span><span class="hl-str">"off = !off"</span>
<span class="ln">10</span>    <span class="hl-attr">bind</span><span class="hl-op">=</span><span class="hl-str">"off ? 'Enable Tooltip' : 'Disable Tooltip'"</span><span class="hl-tag">&gt;</span>
<span class="ln">11</span>  <span class="hl-tag">&lt;/button&gt;</span>
<span class="ln">12</span><span class="hl-tag">&lt;/div&gt;</span></pre>
      </div>
    </div>
  </div>
</section>


</div>
