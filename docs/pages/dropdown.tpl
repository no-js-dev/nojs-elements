<style>
  .dropdown-divider {
    height: 1px;
    background: var(--border);
    margin: 0.25rem 0;
  }
  .dropdown-icon { font-size: 1rem; width: 1.25rem; text-align: center; }
  .demo-row {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    align-items: flex-start;
  }
  .position-demo {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    padding: 2rem 0;
  }
</style>

<div class="route-header">
  <span class="route-badge">Navigation</span>
  <h1>Dropdown</h1>
  <p>Accessible dropdown menus with keyboard navigation, positioning, and ARIA support.</p>
</div>

<div class="container" style="padding: 2rem;">

<!-- API Documentation -->
<section class="docs-api">

  <p>Accessible dropdown menus using the native Popover API for light-dismiss behavior. Wraps a toggle button, menu panel, and items into a single unit with full keyboard navigation, viewport-aware positioning, and ARIA attributes.</p>

  <h3>Attributes</h3>
  <table class="docs-table">
    <thead><tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
    <tbody>
      <tr><td><code>dropdown</code></td><td>boolean attr</td><td><em>required</em></td><td>Marks the wrapper element as a dropdown container</td></tr>
      <tr><td><code>dropdown-toggle</code></td><td>boolean attr</td><td><em>required</em></td><td>The element that opens/closes the menu on click. Must be inside a <code>[dropdown]</code> container</td></tr>
      <tr><td><code>dropdown-menu</code></td><td>boolean attr</td><td><em>required</em></td><td>The menu panel that appears when the toggle is activated. Uses <code>popover="auto"</code> for native light-dismiss</td></tr>
      <tr><td><code>dropdown-item</code></td><td>boolean attr</td><td><em>required</em></td><td>Marks an element as an actionable menu item. Supports <code>disabled</code> attribute to skip during keyboard navigation</td></tr>
      <tr><td><code>dropdown-position</code></td><td><code>"bottom"</code> | <code>"top"</code> | <code>"left"</code> | <code>"right"</code></td><td><code>"bottom"</code></td><td>Primary axis for menu placement relative to the toggle</td></tr>
      <tr><td><code>dropdown-align</code></td><td><code>"start"</code> | <code>"end"</code></td><td><code>"start"</code></td><td>Cross-axis alignment of the menu. The menu auto-flips when it would overflow the viewport</td></tr>
    </tbody>
  </table>

  <h3>Accessibility</h3>
  <p>Adds <code>aria-haspopup="menu"</code> and <code>aria-expanded</code> on the toggle, <code>role="menu"</code> on the menu, and <code>role="menuitem"</code> with <code>tabindex="-1"</code> on each item. Disabled items receive <code>aria-disabled="true"</code>. Keyboard navigation: <code>Arrow Down/Up</code> moves between items, <code>Home/End</code> jumps to first/last, <code>Enter/Space</code> activates, <code>Escape/Tab</code> closes and returns focus to the toggle.</p>

</section>

<!-- Basic Dropdown -->
<section class="demo-section">
  <h2>Basic Dropdown</h2>
  <p>Click the button to toggle the dropdown menu.</p>
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
      <div dropdown>
        <button dropdown-toggle>Options</button>
        <div dropdown-menu>
          <button dropdown-item><span class="dropdown-icon">&#9998;</span> Edit</button>
          <button dropdown-item><span class="dropdown-icon">&#10697;</span> Duplicate</button>
          <div class="dropdown-divider"></div>
          <button dropdown-item><span class="dropdown-icon">&#128451;</span> Archive</button>
        </div>
      </div>
    </div>
    <div class="demo-tabbed-panel demo-tab-code" show="showCode">
      <div class="demo-code-scroll">
        <pre>
<span class="ln"> 1</span><span class="hl-tag">&lt;div</span> <span class="hl-attr">dropdown</span><span class="hl-tag">&gt;</span>
<span class="ln"> 2</span>  <span class="hl-tag">&lt;button</span> <span class="hl-attr">dropdown-toggle</span><span class="hl-tag">&gt;</span>
<span class="ln"> 3</span>    <span class="hl-expr">Options</span>
<span class="ln"> 4</span>  <span class="hl-tag">&lt;/button&gt;</span>
<span class="ln"> 5</span>  <span class="hl-tag">&lt;div</span> <span class="hl-attr">dropdown-menu</span><span class="hl-tag">&gt;</span>
<span class="ln"> 6</span>    <span class="hl-tag">&lt;button</span> <span class="hl-attr">dropdown-item</span><span class="hl-tag">&gt;</span>
<span class="ln"> 7</span>      <span class="hl-expr">&#9998; Edit</span>
<span class="ln"> 8</span>    <span class="hl-tag">&lt;/button&gt;</span>
<span class="ln"> 9</span>    <span class="hl-tag">&lt;button</span> <span class="hl-attr">dropdown-item</span><span class="hl-tag">&gt;</span>
<span class="ln">10</span>      <span class="hl-expr">&#10697; Duplicate</span>
<span class="ln">11</span>    <span class="hl-tag">&lt;/button&gt;</span>
<span class="ln">12</span>    <span class="hl-tag">&lt;div</span> <span class="hl-attr">class</span><span class="hl-op">=</span><span class="hl-str">"dropdown-divider"</span><span class="hl-tag">&gt;&lt;/div&gt;</span>
<span class="ln">13</span>    <span class="hl-tag">&lt;button</span> <span class="hl-attr">dropdown-item</span><span class="hl-tag">&gt;</span>
<span class="ln">14</span>      <span class="hl-expr">&#128451; Archive</span>
<span class="ln">15</span>    <span class="hl-tag">&lt;/button&gt;</span>
<span class="ln">16</span>  <span class="hl-tag">&lt;/div&gt;</span>
<span class="ln">17</span><span class="hl-tag">&lt;/div&gt;</span></pre>
      </div>
    </div>
  </div>
</section>

<!-- With Disabled Item -->
<section class="demo-section">
  <h2>With Disabled Item</h2>
  <p>One menu item is disabled and cannot be interacted with.</p>
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
      <div dropdown>
        <button dropdown-toggle>Actions</button>
        <div dropdown-menu>
          <button dropdown-item><span class="dropdown-icon">&#128190;</span> Save</button>
          <button dropdown-item disabled><span class="dropdown-icon">&#128465;</span> Delete (disabled)</button>
          <button dropdown-item><span class="dropdown-icon">&#128228;</span> Export</button>
        </div>
      </div>
    </div>
    <div class="demo-tabbed-panel demo-tab-code" show="showCode">
      <div class="demo-code-scroll">
        <pre>
<span class="ln"> 1</span><span class="hl-tag">&lt;div</span> <span class="hl-attr">dropdown</span><span class="hl-tag">&gt;</span>
<span class="ln"> 2</span>  <span class="hl-tag">&lt;button</span> <span class="hl-attr">dropdown-toggle</span><span class="hl-tag">&gt;</span>
<span class="ln"> 3</span>    <span class="hl-expr">Actions</span>
<span class="ln"> 4</span>  <span class="hl-tag">&lt;/button&gt;</span>
<span class="ln"> 5</span>  <span class="hl-tag">&lt;div</span> <span class="hl-attr">dropdown-menu</span><span class="hl-tag">&gt;</span>
<span class="ln"> 6</span>    <span class="hl-tag">&lt;button</span> <span class="hl-attr">dropdown-item</span><span class="hl-tag">&gt;</span>
<span class="ln"> 7</span>      <span class="hl-expr">&#128190; Save</span>
<span class="ln"> 8</span>    <span class="hl-tag">&lt;/button&gt;</span>
<span class="ln"> 9</span>    <span class="hl-tag">&lt;button</span> <span class="hl-attr">dropdown-item</span> <span class="hl-attr">disabled</span><span class="hl-tag">&gt;</span>
<span class="ln">10</span>      <span class="hl-expr">&#128465; Delete (disabled)</span>
<span class="ln">11</span>    <span class="hl-tag">&lt;/button&gt;</span>
<span class="ln">12</span>    <span class="hl-tag">&lt;button</span> <span class="hl-attr">dropdown-item</span><span class="hl-tag">&gt;</span>
<span class="ln">13</span>      <span class="hl-expr">&#128228; Export</span>
<span class="ln">14</span>    <span class="hl-tag">&lt;/button&gt;</span>
<span class="ln">15</span>  <span class="hl-tag">&lt;/div&gt;</span>
<span class="ln">16</span><span class="hl-tag">&lt;/div&gt;</span></pre>
      </div>
    </div>
  </div>
</section>

<!-- Link Items -->
<section class="demo-section">
  <h2>Link Items</h2>
  <p>Dropdown items as anchor links.</p>
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
      <div dropdown>
        <button dropdown-toggle>Navigate</button>
        <div dropdown-menu>
          <a dropdown-item href="#"><span class="dropdown-icon">&#127968;</span> Home</a>
          <a dropdown-item href="#"><span class="dropdown-icon">&#9881;</span> Settings</a>
          <a dropdown-item href="#"><span class="dropdown-icon">&#128100;</span> Profile</a>
        </div>
      </div>
    </div>
    <div class="demo-tabbed-panel demo-tab-code" show="showCode">
      <div class="demo-code-scroll">
        <pre>
<span class="ln"> 1</span><span class="hl-tag">&lt;div</span> <span class="hl-attr">dropdown</span><span class="hl-tag">&gt;</span>
<span class="ln"> 2</span>  <span class="hl-tag">&lt;button</span> <span class="hl-attr">dropdown-toggle</span><span class="hl-tag">&gt;</span>
<span class="ln"> 3</span>    <span class="hl-expr">Navigate</span>
<span class="ln"> 4</span>  <span class="hl-tag">&lt;/button&gt;</span>
<span class="ln"> 5</span>  <span class="hl-tag">&lt;div</span> <span class="hl-attr">dropdown-menu</span><span class="hl-tag">&gt;</span>
<span class="ln"> 6</span>    <span class="hl-tag">&lt;a</span> <span class="hl-attr">dropdown-item</span> <span class="hl-attr">href</span><span class="hl-op">=</span><span class="hl-str">"#"</span><span class="hl-tag">&gt;</span>
<span class="ln"> 7</span>      <span class="hl-expr">&#127968; Home</span>
<span class="ln"> 8</span>    <span class="hl-tag">&lt;/a&gt;</span>
<span class="ln"> 9</span>    <span class="hl-tag">&lt;a</span> <span class="hl-attr">dropdown-item</span> <span class="hl-attr">href</span><span class="hl-op">=</span><span class="hl-str">"#"</span><span class="hl-tag">&gt;</span>
<span class="ln">10</span>      <span class="hl-expr">&#9881; Settings</span>
<span class="ln">11</span>    <span class="hl-tag">&lt;/a&gt;</span>
<span class="ln">12</span>    <span class="hl-tag">&lt;a</span> <span class="hl-attr">dropdown-item</span> <span class="hl-attr">href</span><span class="hl-op">=</span><span class="hl-str">"#"</span><span class="hl-tag">&gt;</span>
<span class="ln">13</span>      <span class="hl-expr">&#128100; Profile</span>
<span class="ln">14</span>    <span class="hl-tag">&lt;/a&gt;</span>
<span class="ln">15</span>  <span class="hl-tag">&lt;/div&gt;</span>
<span class="ln">16</span><span class="hl-tag">&lt;/div&gt;</span></pre>
      </div>
    </div>
  </div>
</section>

<!-- Position Variants -->
<section class="demo-section">
  <h2>Position Variants</h2>
  <p>Dropdown menus can be positioned in different directions relative to the trigger.</p>
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
      <div class="position-demo">
        <div dropdown>
          <button dropdown-toggle>Bottom Start</button>
          <div dropdown-menu>
            <button dropdown-item>Option A</button>
            <button dropdown-item>Option B</button>
          </div>
        </div>

        <div dropdown dropdown-align="end">
          <button dropdown-toggle>Bottom End</button>
          <div dropdown-menu>
            <button dropdown-item>Option A</button>
            <button dropdown-item>Option B</button>
          </div>
        </div>

        <div dropdown dropdown-position="top">
          <button dropdown-toggle>Top Start</button>
          <div dropdown-menu>
            <button dropdown-item>Option A</button>
            <button dropdown-item>Option B</button>
          </div>
        </div>

        <div dropdown dropdown-position="top" dropdown-align="end">
          <button dropdown-toggle>Top End</button>
          <div dropdown-menu>
            <button dropdown-item>Option A</button>
            <button dropdown-item>Option B</button>
          </div>
        </div>
      </div>
    </div>
    <div class="demo-tabbed-panel demo-tab-code" show="showCode">
      <div class="demo-code-scroll">
        <pre>
<span class="ln"> 1</span><span class="hl-cmt">&lt;!-- Bottom Start (default) --&gt;</span>
<span class="ln"> 2</span><span class="hl-tag">&lt;div</span> <span class="hl-attr">dropdown</span><span class="hl-tag">&gt;</span>
<span class="ln"> 3</span>  <span class="hl-tag">&lt;button</span> <span class="hl-attr">dropdown-toggle</span><span class="hl-tag">&gt;</span><span class="hl-expr">Bottom Start</span><span class="hl-tag">&lt;/button&gt;</span>
<span class="ln"> 4</span>  <span class="hl-tag">&lt;div</span> <span class="hl-attr">dropdown-menu</span><span class="hl-tag">&gt;</span>
<span class="ln"> 5</span>    <span class="hl-tag">&lt;button</span> <span class="hl-attr">dropdown-item</span><span class="hl-tag">&gt;</span><span class="hl-expr">Option A</span><span class="hl-tag">&lt;/button&gt;</span>
<span class="ln"> 6</span>    <span class="hl-tag">&lt;button</span> <span class="hl-attr">dropdown-item</span><span class="hl-tag">&gt;</span><span class="hl-expr">Option B</span><span class="hl-tag">&lt;/button&gt;</span>
<span class="ln"> 7</span>  <span class="hl-tag">&lt;/div&gt;</span>
<span class="ln"> 8</span><span class="hl-tag">&lt;/div&gt;</span>
<span class="ln"> 9</span>
<span class="ln">10</span><span class="hl-cmt">&lt;!-- Bottom End --&gt;</span>
<span class="ln">11</span><span class="hl-tag">&lt;div</span> <span class="hl-attr">dropdown</span>
<span class="ln">12</span>     <span class="hl-attr">dropdown-align</span><span class="hl-op">=</span><span class="hl-str">"end"</span><span class="hl-tag">&gt;</span>
<span class="ln">13</span>  <span class="hl-tag">&lt;button</span> <span class="hl-attr">dropdown-toggle</span><span class="hl-tag">&gt;</span><span class="hl-expr">Bottom End</span><span class="hl-tag">&lt;/button&gt;</span>
<span class="ln">14</span>  <span class="hl-tag">&lt;div</span> <span class="hl-attr">dropdown-menu</span><span class="hl-tag">&gt;</span>
<span class="ln">15</span>    <span class="hl-tag">&lt;button</span> <span class="hl-attr">dropdown-item</span><span class="hl-tag">&gt;</span><span class="hl-expr">Option A</span><span class="hl-tag">&lt;/button&gt;</span>
<span class="ln">16</span>    <span class="hl-tag">&lt;button</span> <span class="hl-attr">dropdown-item</span><span class="hl-tag">&gt;</span><span class="hl-expr">Option B</span><span class="hl-tag">&lt;/button&gt;</span>
<span class="ln">17</span>  <span class="hl-tag">&lt;/div&gt;</span>
<span class="ln">18</span><span class="hl-tag">&lt;/div&gt;</span>
<span class="ln">19</span>
<span class="ln">20</span><span class="hl-cmt">&lt;!-- Top Start --&gt;</span>
<span class="ln">21</span><span class="hl-tag">&lt;div</span> <span class="hl-attr">dropdown</span>
<span class="ln">22</span>     <span class="hl-attr">dropdown-position</span><span class="hl-op">=</span><span class="hl-str">"top"</span><span class="hl-tag">&gt;</span>
<span class="ln">23</span>  <span class="hl-tag">&lt;button</span> <span class="hl-attr">dropdown-toggle</span><span class="hl-tag">&gt;</span><span class="hl-expr">Top Start</span><span class="hl-tag">&lt;/button&gt;</span>
<span class="ln">24</span>  <span class="hl-tag">&lt;div</span> <span class="hl-attr">dropdown-menu</span><span class="hl-tag">&gt;</span>
<span class="ln">25</span>    <span class="hl-tag">&lt;button</span> <span class="hl-attr">dropdown-item</span><span class="hl-tag">&gt;</span><span class="hl-expr">Option A</span><span class="hl-tag">&lt;/button&gt;</span>
<span class="ln">26</span>    <span class="hl-tag">&lt;button</span> <span class="hl-attr">dropdown-item</span><span class="hl-tag">&gt;</span><span class="hl-expr">Option B</span><span class="hl-tag">&lt;/button&gt;</span>
<span class="ln">27</span>  <span class="hl-tag">&lt;/div&gt;</span>
<span class="ln">28</span><span class="hl-tag">&lt;/div&gt;</span>
<span class="ln">29</span>
<span class="ln">30</span><span class="hl-cmt">&lt;!-- Top End --&gt;</span>
<span class="ln">31</span><span class="hl-tag">&lt;div</span> <span class="hl-attr">dropdown</span>
<span class="ln">32</span>     <span class="hl-attr">dropdown-position</span><span class="hl-op">=</span><span class="hl-str">"top"</span>
<span class="ln">33</span>     <span class="hl-attr">dropdown-align</span><span class="hl-op">=</span><span class="hl-str">"end"</span><span class="hl-tag">&gt;</span>
<span class="ln">34</span>  <span class="hl-tag">&lt;button</span> <span class="hl-attr">dropdown-toggle</span><span class="hl-tag">&gt;</span><span class="hl-expr">Top End</span><span class="hl-tag">&lt;/button&gt;</span>
<span class="ln">35</span>  <span class="hl-tag">&lt;div</span> <span class="hl-attr">dropdown-menu</span><span class="hl-tag">&gt;</span>
<span class="ln">36</span>    <span class="hl-tag">&lt;button</span> <span class="hl-attr">dropdown-item</span><span class="hl-tag">&gt;</span><span class="hl-expr">Option A</span><span class="hl-tag">&lt;/button&gt;</span>
<span class="ln">37</span>    <span class="hl-tag">&lt;button</span> <span class="hl-attr">dropdown-item</span><span class="hl-tag">&gt;</span><span class="hl-expr">Option B</span><span class="hl-tag">&lt;/button&gt;</span>
<span class="ln">38</span>  <span class="hl-tag">&lt;/div&gt;</span>
<span class="ln">39</span><span class="hl-tag">&lt;/div&gt;</span></pre>
      </div>
    </div>
  </div>
</section>

</div>
