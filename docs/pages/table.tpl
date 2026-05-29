<style>
  table { width: 100%; border-collapse: collapse; }
  th, td {
    padding: 0.75rem 1rem;
    text-align: left;
    border-bottom: 1px solid var(--border);
    font-size: 0.875rem;
  }
  th {
    background: var(--white);
    font-weight: 600;
    cursor: pointer;
    user-select: none;
    white-space: nowrap;
  }
  th:hover { background: var(--hover-bg); }
  tr:hover td { background: var(--white-subtle); }
  .scroll-container {
    height: 280px;
    overflow-y: auto;
    border: 1px solid var(--border);
    border-radius: 8px;
  }
  .name-cell { font-weight: 500; }
  .muted { color: var(--text-muted); }
  .badge {
    display: inline-block;
    padding: 0.15rem 0.5rem;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 600;
  }
  .badge-green  { background: #DCFCE7; color: #166534; }
  .badge-red    { background: #FEE2E2; color: #991B1B; }
  .badge-yellow { background: #FEF3C7; color: #92400E; }
</style>

<div class="route-header">
  <span class="route-badge">Data Display</span>
  <h1>Sortable Table</h1>
  <p>Sortable tables with typed columns, default sort, fixed headers, and tri-state cycling.</p>
</div>

<div class="container" style="padding: 2rem;">

<!-- API Documentation -->
<section class="docs-api">

  <p>Sortable tables with typed columns, default sort direction, fixed headers, and sticky columns. Sorting cycles through ascending, descending, and original order. Works with both static rows and reactive <code>each</code>-bound data arrays.</p>

  <h3>Table Attributes</h3>
  <table class="docs-table">
    <thead><tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
    <tbody>
      <tr><td><code>sortable</code></td><td>boolean attr</td><td>—</td><td>Enables sort coordination on the table. Adds <code>.nojs-sortable</code> class</td></tr>
      <tr><td><code>fixed-header</code></td><td>boolean attr</td><td>—</td><td>Place on <code>&lt;thead&gt;</code> to apply <code>position: sticky; top: 0</code></td></tr>
      <tr><td><code>fixed-col</code></td><td>boolean attr</td><td>—</td><td>Place on <code>&lt;th&gt;</code> or <code>&lt;td&gt;</code> to pin a column to the left edge during horizontal scrolling</td></tr>
    </tbody>
  </table>

  <h3>Column Sort Attributes</h3>
  <table class="docs-table">
    <thead><tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
    <tbody>
      <tr><td><code>sort</code></td><td>string</td><td><em>required</em></td><td>Property key to sort by (e.g., <code>"name"</code>, <code>"age"</code>). Place on <code>&lt;th&gt;</code></td></tr>
      <tr><td><code>sort-type</code></td><td><code>"string"</code> | <code>"number"</code> | <code>"date"</code></td><td><code>"string"</code></td><td>Comparator type. <code>string</code> uses <code>localeCompare</code>, <code>number</code> uses numeric comparison, <code>date</code> parses with <code>new Date()</code></td></tr>
      <tr><td><code>sort-default</code></td><td><code>"asc"</code> | <code>"desc"</code></td><td>—</td><td>Initial sort direction applied on page load</td></tr>
    </tbody>
  </table>

  <h3>Accessibility</h3>
  <p>Adds <code>aria-sort="none"</code> on each sortable <code>&lt;th&gt;</code>, updating to <code>aria-sort="ascending"</code> or <code>aria-sort="descending"</code> as the user sorts. Sortable headers receive <code>cursor: pointer</code> and <code>user-select: none</code>. Only one column can be sorted at a time.</p>

</section>

<!-- 1. Basic Sortable Table -->
<section class="demo-section">
  <h2>Basic Sortable Table</h2>
  <p>Click column headers to sort ascending, then descending, then back to original order.</p>
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
      <table sortable>
        <thead>
          <tr>
            <th sort="name">Name</th>
            <th sort="age" sort-type="number">Age</th>
            <th sort="email">Email</th>
            <th sort="status">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr><td class="name-cell">Alice Johnson</td><td>30</td><td class="muted">alice@example.com</td><td><span class="badge badge-green">Active</span></td></tr>
          <tr><td class="name-cell">Bob Smith</td><td>25</td><td class="muted">bob@example.com</td><td><span class="badge badge-green">Active</span></td></tr>
          <tr><td class="name-cell">Charlie Brown</td><td>35</td><td class="muted">charlie@example.com</td><td><span class="badge badge-red">Inactive</span></td></tr>
          <tr><td class="name-cell">Diana Prince</td><td>28</td><td class="muted">diana@example.com</td><td><span class="badge badge-green">Active</span></td></tr>
          <tr><td class="name-cell">Eve Martinez</td><td>22</td><td class="muted">eve@example.com</td><td><span class="badge badge-yellow">Pending</span></td></tr>
          <tr><td class="name-cell">Frank Wilson</td><td>41</td><td class="muted">frank@example.com</td><td><span class="badge badge-green">Active</span></td></tr>
          <tr><td class="name-cell">Grace Lee</td><td>33</td><td class="muted">grace@example.com</td><td><span class="badge badge-red">Inactive</span></td></tr>
        </tbody>
      </table>
    </div>
    <div class="demo-tabbed-panel demo-tab-code" show="showCode">
      <div class="demo-code-scroll">
        <pre>
<span class="ln"> 1</span><span class="hl-tag">&lt;table</span> <span class="hl-attr">sortable</span><span class="hl-tag">&gt;</span>
<span class="ln"> 2</span>  <span class="hl-tag">&lt;thead&gt;&lt;tr&gt;</span>
<span class="ln"> 3</span>    <span class="hl-tag">&lt;th</span> <span class="hl-attr">sort</span><span class="hl-op">=</span><span class="hl-str">"name"</span><span class="hl-tag">&gt;</span><span class="hl-expr">Name</span><span class="hl-tag">&lt;/th&gt;</span>
<span class="ln"> 4</span>    <span class="hl-tag">&lt;th</span> <span class="hl-attr">sort</span><span class="hl-op">=</span><span class="hl-str">"age"</span>
<span class="ln"> 5</span>        <span class="hl-attr">sort-type</span><span class="hl-op">=</span><span class="hl-str">"number"</span><span class="hl-tag">&gt;</span><span class="hl-expr">Age</span><span class="hl-tag">&lt;/th&gt;</span>
<span class="ln"> 6</span>    <span class="hl-tag">&lt;th</span> <span class="hl-attr">sort</span><span class="hl-op">=</span><span class="hl-str">"email"</span><span class="hl-tag">&gt;</span><span class="hl-expr">Email</span><span class="hl-tag">&lt;/th&gt;</span>
<span class="ln"> 7</span>    <span class="hl-tag">&lt;th</span> <span class="hl-attr">sort</span><span class="hl-op">=</span><span class="hl-str">"status"</span><span class="hl-tag">&gt;</span><span class="hl-expr">Status</span><span class="hl-tag">&lt;/th&gt;</span>
<span class="ln"> 8</span>  <span class="hl-tag">&lt;/tr&gt;&lt;/thead&gt;</span>
<span class="ln"> 9</span>  <span class="hl-tag">&lt;tbody&gt;</span>
<span class="ln">10</span>    <span class="hl-tag">&lt;tr&gt;</span>
<span class="ln">11</span>      <span class="hl-tag">&lt;td&gt;</span><span class="hl-expr">Alice Johnson</span><span class="hl-tag">&lt;/td&gt;</span>
<span class="ln">12</span>      <span class="hl-tag">&lt;td&gt;</span><span class="hl-expr">30</span><span class="hl-tag">&lt;/td&gt;</span>
<span class="ln">13</span>      <span class="hl-tag">&lt;td&gt;</span><span class="hl-expr">alice@example.com</span><span class="hl-tag">&lt;/td&gt;</span>
<span class="ln">14</span>      <span class="hl-tag">&lt;td&gt;</span><span class="hl-expr">Active</span><span class="hl-tag">&lt;/td&gt;</span>
<span class="ln">15</span>    <span class="hl-tag">&lt;/tr&gt;</span>
<span class="ln">16</span>    <span class="hl-cmt">&lt;!-- more rows... --&gt;</span>
<span class="ln">17</span>  <span class="hl-tag">&lt;/tbody&gt;</span>
<span class="ln">18</span><span class="hl-tag">&lt;/table&gt;</span></pre>
      </div>
    </div>
  </div>
</section>

<!-- 2. Default Sort -->
<section class="demo-section">
  <h2>Default Sort</h2>
  <p>This table loads with the Name column pre-sorted in ascending order.</p>
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
      <table sortable>
        <thead>
          <tr>
            <th sort="name" sort-default="asc">Name</th>
            <th sort="role">Role</th>
            <th sort="dept">Department</th>
          </tr>
        </thead>
        <tbody>
          <tr><td class="name-cell">Anna Schmidt</td><td>Engineering Manager</td><td class="muted">Engineering</td></tr>
          <tr><td class="name-cell">Grace Kim</td><td>DevOps Engineer</td><td class="muted">Infrastructure</td></tr>
          <tr><td class="name-cell">Leo Park</td><td>QA Engineer</td><td class="muted">Engineering</td></tr>
          <tr><td class="name-cell">Milo Torres</td><td>Frontend Developer</td><td class="muted">Engineering</td></tr>
          <tr><td class="name-cell">Omar Hassan</td><td>Data Analyst</td><td class="muted">Analytics</td></tr>
          <tr><td class="name-cell">Zara Chen</td><td>Product Designer</td><td class="muted">Design</td></tr>
        </tbody>
      </table>
    </div>
    <div class="demo-tabbed-panel demo-tab-code" show="showCode">
      <div class="demo-code-scroll">
        <pre>
<span class="ln"> 1</span><span class="hl-tag">&lt;table</span> <span class="hl-attr">sortable</span><span class="hl-tag">&gt;</span>
<span class="ln"> 2</span>  <span class="hl-tag">&lt;thead&gt;&lt;tr&gt;</span>
<span class="ln"> 3</span>    <span class="hl-tag">&lt;th</span> <span class="hl-attr">sort</span><span class="hl-op">=</span><span class="hl-str">"name"</span>
<span class="ln"> 4</span>        <span class="hl-attr">sort-default</span><span class="hl-op">=</span><span class="hl-str">"asc"</span><span class="hl-tag">&gt;</span><span class="hl-expr">Name</span><span class="hl-tag">&lt;/th&gt;</span>
<span class="ln"> 5</span>    <span class="hl-tag">&lt;th</span> <span class="hl-attr">sort</span><span class="hl-op">=</span><span class="hl-str">"role"</span><span class="hl-tag">&gt;</span><span class="hl-expr">Role</span><span class="hl-tag">&lt;/th&gt;</span>
<span class="ln"> 6</span>    <span class="hl-tag">&lt;th</span> <span class="hl-attr">sort</span><span class="hl-op">=</span><span class="hl-str">"dept"</span><span class="hl-tag">&gt;</span><span class="hl-expr">Department</span><span class="hl-tag">&lt;/th&gt;</span>
<span class="ln"> 7</span>  <span class="hl-tag">&lt;/tr&gt;&lt;/thead&gt;</span>
<span class="ln"> 8</span>  <span class="hl-tag">&lt;tbody&gt;</span>
<span class="ln"> 9</span>    <span class="hl-tag">&lt;tr&gt;</span>
<span class="ln">10</span>      <span class="hl-tag">&lt;td&gt;</span><span class="hl-expr">Anna Schmidt</span><span class="hl-tag">&lt;/td&gt;</span>
<span class="ln">11</span>      <span class="hl-tag">&lt;td&gt;</span><span class="hl-expr">Engineering Manager</span><span class="hl-tag">&lt;/td&gt;</span>
<span class="ln">12</span>      <span class="hl-tag">&lt;td&gt;</span><span class="hl-expr">Engineering</span><span class="hl-tag">&lt;/td&gt;</span>
<span class="ln">13</span>    <span class="hl-tag">&lt;/tr&gt;</span>
<span class="ln">14</span>    <span class="hl-cmt">&lt;!-- more rows... --&gt;</span>
<span class="ln">15</span>  <span class="hl-tag">&lt;/tbody&gt;</span>
<span class="ln">16</span><span class="hl-tag">&lt;/table&gt;</span></pre>
      </div>
    </div>
  </div>
</section>

<!-- 3. Date Sort -->
<section class="demo-section">
  <h2>Date Sort</h2>
  <p>Sort by date column with <code>sort-type="date"</code>.</p>
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
      <table sortable>
        <thead>
          <tr>
            <th sort="name">Project</th>
            <th sort="owner">Owner</th>
            <th sort="date" sort-type="date">Created</th>
            <th sort="budget" sort-type="number">Budget</th>
          </tr>
        </thead>
        <tbody>
          <tr><td class="name-cell">Project Alpha</td><td>Alice</td><td class="muted">2024-03-15</td><td>$45,000</td></tr>
          <tr><td class="name-cell">Project Beta</td><td>Bob</td><td class="muted">2024-01-08</td><td>$120,000</td></tr>
          <tr><td class="name-cell">Project Gamma</td><td>Charlie</td><td class="muted">2024-06-22</td><td>$78,000</td></tr>
          <tr><td class="name-cell">Project Delta</td><td>Diana</td><td class="muted">2024-02-01</td><td>$250,000</td></tr>
          <tr><td class="name-cell">Project Epsilon</td><td>Eve</td><td class="muted">2024-11-30</td><td>$15,000</td></tr>
          <tr><td class="name-cell">Project Zeta</td><td>Frank</td><td class="muted">2024-08-14</td><td>$92,000</td></tr>
        </tbody>
      </table>
    </div>
    <div class="demo-tabbed-panel demo-tab-code" show="showCode">
      <div class="demo-code-scroll">
        <pre>
<span class="ln"> 1</span><span class="hl-tag">&lt;table</span> <span class="hl-attr">sortable</span><span class="hl-tag">&gt;</span>
<span class="ln"> 2</span>  <span class="hl-tag">&lt;thead&gt;&lt;tr&gt;</span>
<span class="ln"> 3</span>    <span class="hl-tag">&lt;th</span> <span class="hl-attr">sort</span><span class="hl-op">=</span><span class="hl-str">"name"</span><span class="hl-tag">&gt;</span><span class="hl-expr">Project</span><span class="hl-tag">&lt;/th&gt;</span>
<span class="ln"> 4</span>    <span class="hl-tag">&lt;th</span> <span class="hl-attr">sort</span><span class="hl-op">=</span><span class="hl-str">"owner"</span><span class="hl-tag">&gt;</span><span class="hl-expr">Owner</span><span class="hl-tag">&lt;/th&gt;</span>
<span class="ln"> 5</span>    <span class="hl-tag">&lt;th</span> <span class="hl-attr">sort</span><span class="hl-op">=</span><span class="hl-str">"date"</span>
<span class="ln"> 6</span>        <span class="hl-attr">sort-type</span><span class="hl-op">=</span><span class="hl-str">"date"</span><span class="hl-tag">&gt;</span><span class="hl-expr">Created</span><span class="hl-tag">&lt;/th&gt;</span>
<span class="ln"> 7</span>    <span class="hl-tag">&lt;th</span> <span class="hl-attr">sort</span><span class="hl-op">=</span><span class="hl-str">"budget"</span>
<span class="ln"> 8</span>        <span class="hl-attr">sort-type</span><span class="hl-op">=</span><span class="hl-str">"number"</span><span class="hl-tag">&gt;</span><span class="hl-expr">Budget</span><span class="hl-tag">&lt;/th&gt;</span>
<span class="ln"> 9</span>  <span class="hl-tag">&lt;/tr&gt;&lt;/thead&gt;</span>
<span class="ln">10</span>  <span class="hl-tag">&lt;tbody&gt;</span>
<span class="ln">11</span>    <span class="hl-tag">&lt;tr&gt;</span>
<span class="ln">12</span>      <span class="hl-tag">&lt;td&gt;</span><span class="hl-expr">Project Alpha</span><span class="hl-tag">&lt;/td&gt;</span>
<span class="ln">13</span>      <span class="hl-tag">&lt;td&gt;</span><span class="hl-expr">Alice</span><span class="hl-tag">&lt;/td&gt;</span>
<span class="ln">14</span>      <span class="hl-tag">&lt;td&gt;</span><span class="hl-expr">2024-03-15</span><span class="hl-tag">&lt;/td&gt;</span>
<span class="ln">15</span>      <span class="hl-tag">&lt;td&gt;</span><span class="hl-expr">$45,000</span><span class="hl-tag">&lt;/td&gt;</span>
<span class="ln">16</span>    <span class="hl-tag">&lt;/tr&gt;</span>
<span class="ln">17</span>    <span class="hl-cmt">&lt;!-- more rows... --&gt;</span>
<span class="ln">18</span>  <span class="hl-tag">&lt;/tbody&gt;</span>
<span class="ln">19</span><span class="hl-tag">&lt;/table&gt;</span></pre>
      </div>
    </div>
  </div>
</section>

<!-- 4. Fixed Header -->
<section class="demo-section">
  <h2>Fixed Header</h2>
  <p>The header stays visible while scrolling through many rows.</p>
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
      <div class="scroll-container">
        <table sortable fixed-header>
          <thead>
            <tr>
              <th sort="id" sort-type="number" style="width: 60px">ID</th>
              <th sort="product">Product</th>
              <th sort="category">Category</th>
              <th sort="price" sort-type="number">Price</th>
              <th sort="stock" sort-type="number">Stock</th>
            </tr>
          </thead>
          <tbody>
            <tr><td class="muted">1</td><td class="name-cell">MacBook Pro 16"</td><td>Laptops</td><td>$2,499</td><td>24</td></tr>
            <tr><td class="muted">2</td><td class="name-cell">Magic Mouse</td><td>Accessories</td><td>$79</td><td>156</td></tr>
            <tr><td class="muted">3</td><td class="name-cell">Mechanical Keyboard</td><td>Accessories</td><td>$149</td><td>89</td></tr>
            <tr><td class="muted">4</td><td class="name-cell">UltraWide Monitor</td><td>Displays</td><td>$899</td><td>12</td></tr>
            <tr><td class="muted">5</td><td class="name-cell">Webcam HD Pro</td><td>Accessories</td><td>$129</td><td>67</td></tr>
            <tr><td class="muted">6</td><td class="name-cell">Headset 7.1</td><td>Audio</td><td>$199</td><td>43</td></tr>
            <tr><td class="muted">7</td><td class="name-cell">USB-C Hub</td><td>Accessories</td><td>$59</td><td>201</td></tr>
            <tr><td class="muted">8</td><td class="name-cell">LED Desk Lamp</td><td>Office</td><td>$45</td><td>78</td></tr>
            <tr><td class="muted">9</td><td class="name-cell">Ergonomic Chair</td><td>Furniture</td><td>$699</td><td>15</td></tr>
            <tr><td class="muted">10</td><td class="name-cell">Desk Mat XL</td><td>Office</td><td>$35</td><td>312</td></tr>
            <tr><td class="muted">11</td><td class="name-cell">Cable Management Kit</td><td>Office</td><td>$22</td><td>445</td></tr>
            <tr><td class="muted">12</td><td class="name-cell">Bluetooth Speakers</td><td>Audio</td><td>$149</td><td>56</td></tr>
            <tr><td class="muted">13</td><td class="name-cell">Portable SSD 1TB</td><td>Storage</td><td>$109</td><td>93</td></tr>
            <tr><td class="muted">14</td><td class="name-cell">Wireless Charger</td><td>Accessories</td><td>$39</td><td>187</td></tr>
            <tr><td class="muted">15</td><td class="name-cell">Standing Desk</td><td>Furniture</td><td>$549</td><td>8</td></tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="demo-tabbed-panel demo-tab-code" show="showCode">
      <div class="demo-code-scroll">
        <pre>
<span class="ln"> 1</span><span class="hl-tag">&lt;div</span> <span class="hl-attr">class</span><span class="hl-op">=</span><span class="hl-str">"scroll-container"</span><span class="hl-tag">&gt;</span>
<span class="ln"> 2</span>  <span class="hl-tag">&lt;table</span> <span class="hl-attr">sortable</span> <span class="hl-attr">fixed-header</span><span class="hl-tag">&gt;</span>
<span class="ln"> 3</span>    <span class="hl-tag">&lt;thead&gt;&lt;tr&gt;</span>
<span class="ln"> 4</span>      <span class="hl-tag">&lt;th</span> <span class="hl-attr">sort</span><span class="hl-op">=</span><span class="hl-str">"id"</span>
<span class="ln"> 5</span>          <span class="hl-attr">sort-type</span><span class="hl-op">=</span><span class="hl-str">"number"</span><span class="hl-tag">&gt;</span><span class="hl-expr">ID</span><span class="hl-tag">&lt;/th&gt;</span>
<span class="ln"> 6</span>      <span class="hl-tag">&lt;th</span> <span class="hl-attr">sort</span><span class="hl-op">=</span><span class="hl-str">"product"</span><span class="hl-tag">&gt;</span><span class="hl-expr">Product</span><span class="hl-tag">&lt;/th&gt;</span>
<span class="ln"> 7</span>      <span class="hl-tag">&lt;th</span> <span class="hl-attr">sort</span><span class="hl-op">=</span><span class="hl-str">"category"</span><span class="hl-tag">&gt;</span><span class="hl-expr">Category</span><span class="hl-tag">&lt;/th&gt;</span>
<span class="ln"> 8</span>      <span class="hl-tag">&lt;th</span> <span class="hl-attr">sort</span><span class="hl-op">=</span><span class="hl-str">"price"</span>
<span class="ln"> 9</span>          <span class="hl-attr">sort-type</span><span class="hl-op">=</span><span class="hl-str">"number"</span><span class="hl-tag">&gt;</span><span class="hl-expr">Price</span><span class="hl-tag">&lt;/th&gt;</span>
<span class="ln">10</span>      <span class="hl-tag">&lt;th</span> <span class="hl-attr">sort</span><span class="hl-op">=</span><span class="hl-str">"stock"</span>
<span class="ln">11</span>          <span class="hl-attr">sort-type</span><span class="hl-op">=</span><span class="hl-str">"number"</span><span class="hl-tag">&gt;</span><span class="hl-expr">Stock</span><span class="hl-tag">&lt;/th&gt;</span>
<span class="ln">12</span>    <span class="hl-tag">&lt;/tr&gt;&lt;/thead&gt;</span>
<span class="ln">13</span>    <span class="hl-tag">&lt;tbody&gt;</span>
<span class="ln">14</span>      <span class="hl-tag">&lt;tr&gt;</span>
<span class="ln">15</span>        <span class="hl-tag">&lt;td&gt;</span><span class="hl-expr">1</span><span class="hl-tag">&lt;/td&gt;</span>
<span class="ln">16</span>        <span class="hl-tag">&lt;td&gt;</span><span class="hl-expr">MacBook Pro 16"</span><span class="hl-tag">&lt;/td&gt;</span>
<span class="ln">17</span>        <span class="hl-tag">&lt;td&gt;</span><span class="hl-expr">Laptops</span><span class="hl-tag">&lt;/td&gt;</span>
<span class="ln">18</span>        <span class="hl-tag">&lt;td&gt;</span><span class="hl-expr">$2,499</span><span class="hl-tag">&lt;/td&gt;</span>
<span class="ln">19</span>        <span class="hl-tag">&lt;td&gt;</span><span class="hl-expr">24</span><span class="hl-tag">&lt;/td&gt;</span>
<span class="ln">20</span>      <span class="hl-tag">&lt;/tr&gt;</span>
<span class="ln">21</span>      <span class="hl-cmt">&lt;!-- 14 more rows... --&gt;</span>
<span class="ln">22</span>    <span class="hl-tag">&lt;/tbody&gt;</span>
<span class="ln">23</span>  <span class="hl-tag">&lt;/table&gt;</span>
<span class="ln">24</span><span class="hl-tag">&lt;/div&gt;</span></pre>
      </div>
    </div>
  </div>
</section>

<!-- 5. Sticky Column -->
<section class="demo-section">
  <h2>Sticky Column</h2>
  <p>The first column stays fixed while scrolling horizontally. Combine with <code>fixed-header</code> for both axes.</p>
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
      <div style="max-width: 100%; overflow-x: auto; border: 1px solid #E2E8F0; border-radius: 8px;">
        <table sortable>
          <thead>
            <tr>
              <th fixed-col sort="name" style="min-width: 160px; background: #F8FAFC;">Name</th>
              <th sort="q1" sort-type="number" style="min-width: 120px">Q1 Revenue</th>
              <th sort="q2" sort-type="number" style="min-width: 120px">Q2 Revenue</th>
              <th sort="q3" sort-type="number" style="min-width: 120px">Q3 Revenue</th>
              <th sort="q4" sort-type="number" style="min-width: 120px">Q4 Revenue</th>
              <th sort="total" sort-type="number" style="min-width: 120px">Total</th>
              <th style="min-width: 100px">Region</th>
              <th style="min-width: 100px">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr><td fixed-col class="name-cell" style="background: #fff;">Acme Corp</td><td>$120K</td><td>$145K</td><td>$132K</td><td>$160K</td><td>$557K</td><td class="muted">North</td><td><span class="badge badge-green">Active</span></td></tr>
            <tr><td fixed-col class="name-cell" style="background: #fff;">Globex Inc</td><td>$89K</td><td>$95K</td><td>$110K</td><td>$105K</td><td>$399K</td><td class="muted">East</td><td><span class="badge badge-green">Active</span></td></tr>
            <tr><td fixed-col class="name-cell" style="background: #fff;">Initech</td><td>$67K</td><td>$72K</td><td>$58K</td><td>$80K</td><td>$277K</td><td class="muted">West</td><td><span class="badge badge-yellow">Pending</span></td></tr>
            <tr><td fixed-col class="name-cell" style="background: #fff;">Umbrella Co</td><td>$200K</td><td>$210K</td><td>$195K</td><td>$240K</td><td>$845K</td><td class="muted">South</td><td><span class="badge badge-green">Active</span></td></tr>
            <tr><td fixed-col class="name-cell" style="background: #fff;">Wayne Ent</td><td>$310K</td><td>$290K</td><td>$340K</td><td>$380K</td><td>$1.32M</td><td class="muted">North</td><td><span class="badge badge-green">Active</span></td></tr>
            <tr><td fixed-col class="name-cell" style="background: #fff;">Stark Ind</td><td>$450K</td><td>$480K</td><td>$420K</td><td>$510K</td><td>$1.86M</td><td class="muted">East</td><td><span class="badge badge-red">Inactive</span></td></tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="demo-tabbed-panel demo-tab-code" show="showCode">
      <div class="demo-code-scroll">
        <pre>
<span class="ln"> 1</span><span class="hl-tag">&lt;table</span> <span class="hl-attr">sortable</span><span class="hl-tag">&gt;</span>
<span class="ln"> 2</span>  <span class="hl-tag">&lt;thead&gt;&lt;tr&gt;</span>
<span class="ln"> 3</span>    <span class="hl-tag">&lt;th</span> <span class="hl-attr">fixed-col</span>
<span class="ln"> 4</span>        <span class="hl-attr">sort</span><span class="hl-op">=</span><span class="hl-str">"name"</span><span class="hl-tag">&gt;</span><span class="hl-expr">Name</span><span class="hl-tag">&lt;/th&gt;</span>
<span class="ln"> 5</span>    <span class="hl-tag">&lt;th</span> <span class="hl-attr">sort</span><span class="hl-op">=</span><span class="hl-str">"q1"</span>
<span class="ln"> 6</span>        <span class="hl-attr">sort-type</span><span class="hl-op">=</span><span class="hl-str">"number"</span><span class="hl-tag">&gt;</span><span class="hl-expr">Q1 Revenue</span><span class="hl-tag">&lt;/th&gt;</span>
<span class="ln"> 7</span>    <span class="hl-tag">&lt;th</span> <span class="hl-attr">sort</span><span class="hl-op">=</span><span class="hl-str">"q2"</span>
<span class="ln"> 8</span>        <span class="hl-attr">sort-type</span><span class="hl-op">=</span><span class="hl-str">"number"</span><span class="hl-tag">&gt;</span><span class="hl-expr">Q2 Revenue</span><span class="hl-tag">&lt;/th&gt;</span>
<span class="ln"> 9</span>    <span class="hl-cmt">&lt;!-- Q3, Q4, Total, Region, Status --&gt;</span>
<span class="ln">10</span>  <span class="hl-tag">&lt;/tr&gt;&lt;/thead&gt;</span>
<span class="ln">11</span>  <span class="hl-tag">&lt;tbody&gt;</span>
<span class="ln">12</span>    <span class="hl-tag">&lt;tr&gt;</span>
<span class="ln">13</span>      <span class="hl-tag">&lt;td</span> <span class="hl-attr">fixed-col</span><span class="hl-tag">&gt;</span><span class="hl-expr">Acme Corp</span><span class="hl-tag">&lt;/td&gt;</span>
<span class="ln">14</span>      <span class="hl-tag">&lt;td&gt;</span><span class="hl-expr">$120K</span><span class="hl-tag">&lt;/td&gt;</span>
<span class="ln">15</span>      <span class="hl-tag">&lt;td&gt;</span><span class="hl-expr">$145K</span><span class="hl-tag">&lt;/td&gt;</span>
<span class="ln">16</span>      <span class="hl-cmt">&lt;!-- ... --&gt;</span>
<span class="ln">17</span>    <span class="hl-tag">&lt;/tr&gt;</span>
<span class="ln">18</span>    <span class="hl-cmt">&lt;!-- more rows... --&gt;</span>
<span class="ln">19</span>  <span class="hl-tag">&lt;/tbody&gt;</span>
<span class="ln">20</span><span class="hl-tag">&lt;/table&gt;</span></pre>
      </div>
    </div>
  </div>
</section>

</div>
