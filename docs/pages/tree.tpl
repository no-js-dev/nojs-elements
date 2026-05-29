<style>
  .tree-icon { font-size: 1rem; }
  li[on\:click] { cursor: pointer; }
</style>

<div class="route-header">
  <span class="route-badge">Navigation</span>
  <h1>Tree</h1>
  <p>Hierarchical tree view with expandable branches, keyboard navigation, and deep nesting.</p>
</div>

<div class="container" style="padding: 2rem;">

<!-- API Documentation -->
<section class="docs-api">

  <p>Hierarchical tree view with expandable branches, deep nesting, keyboard navigation, and typeahead search. Clicking a branch selects it (adding <code>nojs-branch-selected</code> and <code>aria-selected="true"</code>); selection is mutually exclusive across the tree.</p>

  <h3>Tree Attributes</h3>
  <table class="docs-table">
    <thead><tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
    <tbody>
      <tr><td><code>tree</code></td><td>boolean attr</td><td><em>required</em></td><td>Marks the element as a tree root</td></tr>
      <tr><td><code>tree-icon</code></td><td><code>"true"</code> | <code>"false"</code></td><td><code>"true"</code></td><td>When <code>"false"</code>, hides the built-in expand/collapse triangle icons</td></tr>
    </tbody>
  </table>

  <h3>Branch Attributes</h3>
  <table class="docs-table">
    <thead><tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
    <tbody>
      <tr><td><code>branch</code></td><td><code>""</code> | <code>"expanded"</code></td><td><code>""</code> (collapsed)</td><td>Marks an element as an expandable tree item. Set to <code>"expanded"</code> to start open</td></tr>
    </tbody>
  </table>

  <h3>Subtree Attributes</h3>
  <table class="docs-table">
    <thead><tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
    <tbody>
      <tr><td><code>subtree</code></td><td>boolean attr</td><td><em>required</em></td><td>Marks a child element as the collapsible content group of a <code>branch</code></td></tr>
    </tbody>
  </table>

  <h3>Keyboard Navigation</h3>
  <table class="docs-table">
    <thead><tr><th>Key</th><th>Action</th></tr></thead>
    <tbody>
      <tr><td><code>ArrowRight</code></td><td>Expand a collapsed branch; if already expanded, focus the first child</td></tr>
      <tr><td><code>ArrowLeft</code></td><td>Collapse an expanded branch; if already collapsed, focus the parent branch</td></tr>
      <tr><td><code>ArrowDown</code></td><td>Move focus to the next visible tree item</td></tr>
      <tr><td><code>ArrowUp</code></td><td>Move focus to the previous visible tree item</td></tr>
      <tr><td><code>Enter</code> / <code>Space</code></td><td>Toggle expand/collapse and select the focused branch</td></tr>
      <tr><td><code>Home</code></td><td>Move focus to the first visible tree item</td></tr>
      <tr><td><code>End</code></td><td>Move focus to the last visible tree item</td></tr>
      <tr><td>Printable character</td><td>Typeahead -- focuses the next item whose label starts with the typed characters (resets after 500ms)</td></tr>
    </tbody>
  </table>

  <h3>Accessibility</h3>
  <p>Adds <code>role="tree"</code> on the root, <code>role="treeitem"</code> on each branch, <code>role="group"</code> on each subtree, <code>aria-expanded</code> on branches, <code>aria-hidden</code> on subtrees, <code>aria-selected</code> on the selected branch, and roving <code>tabindex</code> with full keyboard navigation including typeahead search.</p>

</section>

<!-- Demo 1: Basic Tree -->
<section class="demo-section">
  <h2>Basic Tree</h2>
  <p>A file-system style tree with expandable branches. Click to select and expand items. Click a leaf to select it.</p>
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
      <div state="{ selected: '' }">
        <p class="text-sm text-muted" style="margin-bottom: 0.75rem">Selected: <strong bind="selected || 'None'"></strong></p>
        <ul tree>
          <li>
            <span branch="expanded"><span class="tree-icon">&#128193;</span> Documents</span>
            <ul subtree>
              <li>
                <span branch><span class="tree-icon">&#128188;</span> Work</span>
                <ul subtree>
                  <li on:click="selected = 'Reports'">&#128196; Reports</li>
                  <li on:click="selected = 'Presentations'">&#128202; Presentations</li>
                </ul>
              </li>
              <li>
                <span branch><span class="tree-icon">&#127968;</span> Personal</span>
                <ul subtree>
                  <li on:click="selected = 'Photos'">&#127748; Photos</li>
                  <li on:click="selected = 'Videos'">&#127909; Videos</li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            <span branch><span class="tree-icon">&#11015;</span> Downloads</span>
            <ul subtree>
              <li>
                <span branch><span class="tree-icon">&#128187;</span> Apps</span>
                <ul subtree>
                  <li on:click="selected = 'Utilities'">&#128295; Utilities</li>
                  <li on:click="selected = 'Games'">&#127918; Games</li>
                </ul>
              </li>
              <li on:click="selected = 'Music'">&#127925; Music</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <div class="demo-tabbed-panel demo-tab-code" show="showCode">
      <div class="demo-code-scroll">
        <pre>
<span class="ln"> 1</span><span class="hl-tag">&lt;div</span> <span class="hl-attr">state</span><span class="hl-op">=</span><span class="hl-str">"{ selected: '' }"</span><span class="hl-tag">&gt;</span>
<span class="ln"> 2</span>  <span class="hl-tag">&lt;p&gt;</span><span class="hl-expr">Selected: </span><span class="hl-tag">&lt;strong</span> <span class="hl-attr">bind</span><span class="hl-op">=</span><span class="hl-str">"selected || 'None'"</span><span class="hl-tag">&gt;&lt;/strong&gt;&lt;/p&gt;</span>
<span class="ln"> 3</span>
<span class="ln"> 4</span>  <span class="hl-tag">&lt;ul</span> <span class="hl-attr">tree</span><span class="hl-tag">&gt;</span>
<span class="ln"> 5</span>    <span class="hl-tag">&lt;li&gt;</span>
<span class="ln"> 6</span>      <span class="hl-tag">&lt;span</span> <span class="hl-attr">branch</span><span class="hl-op">=</span><span class="hl-str">"expanded"</span><span class="hl-tag">&gt;</span><span class="hl-expr">&#128193; Documents</span><span class="hl-tag">&lt;/span&gt;</span>
<span class="ln"> 7</span>      <span class="hl-tag">&lt;ul</span> <span class="hl-attr">subtree</span><span class="hl-tag">&gt;</span>
<span class="ln"> 8</span>        <span class="hl-tag">&lt;li&gt;</span>
<span class="ln"> 9</span>          <span class="hl-tag">&lt;span</span> <span class="hl-attr">branch</span><span class="hl-tag">&gt;</span><span class="hl-expr">&#128188; Work</span><span class="hl-tag">&lt;/span&gt;</span>
<span class="ln">10</span>          <span class="hl-tag">&lt;ul</span> <span class="hl-attr">subtree</span><span class="hl-tag">&gt;</span>
<span class="ln">11</span>            <span class="hl-tag">&lt;li</span> <span class="hl-attr">on:click</span><span class="hl-op">=</span><span class="hl-str">"selected = 'Reports'"</span><span class="hl-tag">&gt;</span>
<span class="ln">12</span>              <span class="hl-expr">&#128196; Reports</span>
<span class="ln">13</span>            <span class="hl-tag">&lt;/li&gt;</span>
<span class="ln">14</span>            <span class="hl-tag">&lt;li</span> <span class="hl-attr">on:click</span><span class="hl-op">=</span><span class="hl-str">"selected = 'Presentations'"</span><span class="hl-tag">&gt;</span>
<span class="ln">15</span>              <span class="hl-expr">&#128202; Presentations</span>
<span class="ln">16</span>            <span class="hl-tag">&lt;/li&gt;</span>
<span class="ln">17</span>          <span class="hl-tag">&lt;/ul&gt;</span>
<span class="ln">18</span>        <span class="hl-tag">&lt;/li&gt;</span>
<span class="ln">19</span>        <span class="hl-tag">&lt;li&gt;</span>
<span class="ln">20</span>          <span class="hl-tag">&lt;span</span> <span class="hl-attr">branch</span><span class="hl-tag">&gt;</span><span class="hl-expr">&#127968; Personal</span><span class="hl-tag">&lt;/span&gt;</span>
<span class="ln">21</span>          <span class="hl-tag">&lt;ul</span> <span class="hl-attr">subtree</span><span class="hl-tag">&gt;</span>
<span class="ln">22</span>            <span class="hl-tag">&lt;li</span> <span class="hl-attr">on:click</span><span class="hl-op">=</span><span class="hl-str">"selected = 'Photos'"</span><span class="hl-tag">&gt;</span>
<span class="ln">23</span>              <span class="hl-expr">&#127748; Photos</span>
<span class="ln">24</span>            <span class="hl-tag">&lt;/li&gt;</span>
<span class="ln">25</span>            <span class="hl-tag">&lt;li</span> <span class="hl-attr">on:click</span><span class="hl-op">=</span><span class="hl-str">"selected = 'Videos'"</span><span class="hl-tag">&gt;</span>
<span class="ln">26</span>              <span class="hl-expr">&#127909; Videos</span>
<span class="ln">27</span>            <span class="hl-tag">&lt;/li&gt;</span>
<span class="ln">28</span>          <span class="hl-tag">&lt;/ul&gt;</span>
<span class="ln">29</span>        <span class="hl-tag">&lt;/li&gt;</span>
<span class="ln">30</span>      <span class="hl-tag">&lt;/ul&gt;</span>
<span class="ln">31</span>    <span class="hl-tag">&lt;/li&gt;</span>
<span class="ln">32</span>    <span class="hl-tag">&lt;li&gt;</span>
<span class="ln">33</span>      <span class="hl-tag">&lt;span</span> <span class="hl-attr">branch</span><span class="hl-tag">&gt;</span><span class="hl-expr">&#11015; Downloads</span><span class="hl-tag">&lt;/span&gt;</span>
<span class="ln">34</span>      <span class="hl-tag">&lt;ul</span> <span class="hl-attr">subtree</span><span class="hl-tag">&gt;</span>
<span class="ln">35</span>        <span class="hl-tag">&lt;li&gt;</span>
<span class="ln">36</span>          <span class="hl-tag">&lt;span</span> <span class="hl-attr">branch</span><span class="hl-tag">&gt;</span><span class="hl-expr">&#128187; Apps</span><span class="hl-tag">&lt;/span&gt;</span>
<span class="ln">37</span>          <span class="hl-tag">&lt;ul</span> <span class="hl-attr">subtree</span><span class="hl-tag">&gt;</span>
<span class="ln">38</span>            <span class="hl-tag">&lt;li</span> <span class="hl-attr">on:click</span><span class="hl-op">=</span><span class="hl-str">"selected = 'Utilities'"</span><span class="hl-tag">&gt;</span>
<span class="ln">39</span>              <span class="hl-expr">&#128295; Utilities</span>
<span class="ln">40</span>            <span class="hl-tag">&lt;/li&gt;</span>
<span class="ln">41</span>            <span class="hl-tag">&lt;li</span> <span class="hl-attr">on:click</span><span class="hl-op">=</span><span class="hl-str">"selected = 'Games'"</span><span class="hl-tag">&gt;</span>
<span class="ln">42</span>              <span class="hl-expr">&#127918; Games</span>
<span class="ln">43</span>            <span class="hl-tag">&lt;/li&gt;</span>
<span class="ln">44</span>          <span class="hl-tag">&lt;/ul&gt;</span>
<span class="ln">45</span>        <span class="hl-tag">&lt;/li&gt;</span>
<span class="ln">46</span>        <span class="hl-tag">&lt;li</span> <span class="hl-attr">on:click</span><span class="hl-op">=</span><span class="hl-str">"selected = 'Music'"</span><span class="hl-tag">&gt;</span>
<span class="ln">47</span>          <span class="hl-expr">&#127925; Music</span>
<span class="ln">48</span>        <span class="hl-tag">&lt;/li&gt;</span>
<span class="ln">49</span>      <span class="hl-tag">&lt;/ul&gt;</span>
<span class="ln">50</span>    <span class="hl-tag">&lt;/li&gt;</span>
<span class="ln">51</span>  <span class="hl-tag">&lt;/ul&gt;</span>
<span class="ln">52</span><span class="hl-tag">&lt;/div&gt;</span></pre>
      </div>
    </div>
  </div>
</section>

<!-- Demo 2: Deep Nesting -->
<section class="demo-section">
  <h2>Deep Nesting</h2>
  <p>A tree with four levels of nesting to demonstrate deep hierarchy support.</p>
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
      <ul tree>
        <li>
          <span branch="expanded">&#128194; Level 1</span>
          <ul subtree>
            <li>
              <span branch="expanded">&#128194; Level 2</span>
              <ul subtree>
                <li>
                  <span branch="expanded">&#128194; Level 3</span>
                  <ul subtree>
                    <li>
                      <span branch>&#128194; Level 4</span>
                      <ul subtree>
                        <li>&#128196; Leaf Node A</li>
                        <li>&#128196; Leaf Node B</li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="demo-tabbed-panel demo-tab-code" show="showCode">
      <div class="demo-code-scroll">
        <pre>
<span class="ln"> 1</span><span class="hl-tag">&lt;ul</span> <span class="hl-attr">tree</span><span class="hl-tag">&gt;</span>
<span class="ln"> 2</span>  <span class="hl-tag">&lt;li&gt;</span>
<span class="ln"> 3</span>    <span class="hl-tag">&lt;span</span> <span class="hl-attr">branch</span><span class="hl-op">=</span><span class="hl-str">"expanded"</span><span class="hl-tag">&gt;</span><span class="hl-expr">&#128194; Level 1</span><span class="hl-tag">&lt;/span&gt;</span>
<span class="ln"> 4</span>    <span class="hl-tag">&lt;ul</span> <span class="hl-attr">subtree</span><span class="hl-tag">&gt;</span>
<span class="ln"> 5</span>      <span class="hl-tag">&lt;li&gt;</span>
<span class="ln"> 6</span>        <span class="hl-tag">&lt;span</span> <span class="hl-attr">branch</span><span class="hl-op">=</span><span class="hl-str">"expanded"</span><span class="hl-tag">&gt;</span><span class="hl-expr">&#128194; Level 2</span><span class="hl-tag">&lt;/span&gt;</span>
<span class="ln"> 7</span>        <span class="hl-tag">&lt;ul</span> <span class="hl-attr">subtree</span><span class="hl-tag">&gt;</span>
<span class="ln"> 8</span>          <span class="hl-tag">&lt;li&gt;</span>
<span class="ln"> 9</span>            <span class="hl-tag">&lt;span</span> <span class="hl-attr">branch</span><span class="hl-op">=</span><span class="hl-str">"expanded"</span><span class="hl-tag">&gt;</span><span class="hl-expr">&#128194; Level 3</span><span class="hl-tag">&lt;/span&gt;</span>
<span class="ln">10</span>            <span class="hl-tag">&lt;ul</span> <span class="hl-attr">subtree</span><span class="hl-tag">&gt;</span>
<span class="ln">11</span>              <span class="hl-tag">&lt;li&gt;</span>
<span class="ln">12</span>                <span class="hl-tag">&lt;span</span> <span class="hl-attr">branch</span><span class="hl-tag">&gt;</span><span class="hl-expr">&#128194; Level 4</span><span class="hl-tag">&lt;/span&gt;</span>
<span class="ln">13</span>                <span class="hl-tag">&lt;ul</span> <span class="hl-attr">subtree</span><span class="hl-tag">&gt;</span>
<span class="ln">14</span>                  <span class="hl-tag">&lt;li&gt;</span><span class="hl-expr">&#128196; Leaf Node A</span><span class="hl-tag">&lt;/li&gt;</span>
<span class="ln">15</span>                  <span class="hl-tag">&lt;li&gt;</span><span class="hl-expr">&#128196; Leaf Node B</span><span class="hl-tag">&lt;/li&gt;</span>
<span class="ln">16</span>                <span class="hl-tag">&lt;/ul&gt;</span>
<span class="ln">17</span>              <span class="hl-tag">&lt;/li&gt;</span>
<span class="ln">18</span>            <span class="hl-tag">&lt;/ul&gt;</span>
<span class="ln">19</span>          <span class="hl-tag">&lt;/li&gt;</span>
<span class="ln">20</span>        <span class="hl-tag">&lt;/ul&gt;</span>
<span class="ln">21</span>      <span class="hl-tag">&lt;/li&gt;</span>
<span class="ln">22</span>    <span class="hl-tag">&lt;/ul&gt;</span>
<span class="ln">23</span>  <span class="hl-tag">&lt;/li&gt;</span>
<span class="ln">24</span><span class="hl-tag">&lt;/ul&gt;</span></pre>
      </div>
    </div>
  </div>
</section>

<!-- Demo 3: All Expanded -->
<section class="demo-section">
  <h2>All Expanded</h2>
  <p>Every branch starts expanded using <code>branch="expanded"</code>.</p>
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
      <ul tree>
        <li>
          <span branch="expanded">&#128193; src</span>
          <ul subtree>
            <li>
              <span branch="expanded">&#128194; components</span>
              <ul subtree>
                <li>&#9881; Header.js</li>
                <li>&#9881; Footer.js</li>
                <li>&#9881; Sidebar.js</li>
              </ul>
            </li>
            <li>
              <span branch="expanded">&#128194; utils</span>
              <ul subtree>
                <li>&#9881; format.js</li>
                <li>&#9881; validate.js</li>
              </ul>
            </li>
          </ul>
        </li>
        <li>
          <span branch="expanded">&#128193; tests</span>
          <ul subtree>
            <li>&#9881; unit.spec.js</li>
            <li>&#9881; integration.spec.js</li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="demo-tabbed-panel demo-tab-code" show="showCode">
      <div class="demo-code-scroll">
        <pre>
<span class="ln"> 1</span><span class="hl-tag">&lt;ul</span> <span class="hl-attr">tree</span><span class="hl-tag">&gt;</span>
<span class="ln"> 2</span>  <span class="hl-tag">&lt;li&gt;</span>
<span class="ln"> 3</span>    <span class="hl-tag">&lt;span</span> <span class="hl-attr">branch</span><span class="hl-op">=</span><span class="hl-str">"expanded"</span><span class="hl-tag">&gt;</span><span class="hl-expr">&#128193; src</span><span class="hl-tag">&lt;/span&gt;</span>
<span class="ln"> 4</span>    <span class="hl-tag">&lt;ul</span> <span class="hl-attr">subtree</span><span class="hl-tag">&gt;</span>
<span class="ln"> 5</span>      <span class="hl-tag">&lt;li&gt;</span>
<span class="ln"> 6</span>        <span class="hl-tag">&lt;span</span> <span class="hl-attr">branch</span><span class="hl-op">=</span><span class="hl-str">"expanded"</span><span class="hl-tag">&gt;</span><span class="hl-expr">&#128194; components</span><span class="hl-tag">&lt;/span&gt;</span>
<span class="ln"> 7</span>        <span class="hl-tag">&lt;ul</span> <span class="hl-attr">subtree</span><span class="hl-tag">&gt;</span>
<span class="ln"> 8</span>          <span class="hl-tag">&lt;li&gt;</span><span class="hl-expr">&#9881; Header.js</span><span class="hl-tag">&lt;/li&gt;</span>
<span class="ln"> 9</span>          <span class="hl-tag">&lt;li&gt;</span><span class="hl-expr">&#9881; Footer.js</span><span class="hl-tag">&lt;/li&gt;</span>
<span class="ln">10</span>          <span class="hl-tag">&lt;li&gt;</span><span class="hl-expr">&#9881; Sidebar.js</span><span class="hl-tag">&lt;/li&gt;</span>
<span class="ln">11</span>        <span class="hl-tag">&lt;/ul&gt;</span>
<span class="ln">12</span>      <span class="hl-tag">&lt;/li&gt;</span>
<span class="ln">13</span>      <span class="hl-tag">&lt;li&gt;</span>
<span class="ln">14</span>        <span class="hl-tag">&lt;span</span> <span class="hl-attr">branch</span><span class="hl-op">=</span><span class="hl-str">"expanded"</span><span class="hl-tag">&gt;</span><span class="hl-expr">&#128194; utils</span><span class="hl-tag">&lt;/span&gt;</span>
<span class="ln">15</span>        <span class="hl-tag">&lt;ul</span> <span class="hl-attr">subtree</span><span class="hl-tag">&gt;</span>
<span class="ln">16</span>          <span class="hl-tag">&lt;li&gt;</span><span class="hl-expr">&#9881; format.js</span><span class="hl-tag">&lt;/li&gt;</span>
<span class="ln">17</span>          <span class="hl-tag">&lt;li&gt;</span><span class="hl-expr">&#9881; validate.js</span><span class="hl-tag">&lt;/li&gt;</span>
<span class="ln">18</span>        <span class="hl-tag">&lt;/ul&gt;</span>
<span class="ln">19</span>      <span class="hl-tag">&lt;/li&gt;</span>
<span class="ln">20</span>    <span class="hl-tag">&lt;/ul&gt;</span>
<span class="ln">21</span>  <span class="hl-tag">&lt;/li&gt;</span>
<span class="ln">22</span>  <span class="hl-tag">&lt;li&gt;</span>
<span class="ln">23</span>    <span class="hl-tag">&lt;span</span> <span class="hl-attr">branch</span><span class="hl-op">=</span><span class="hl-str">"expanded"</span><span class="hl-tag">&gt;</span><span class="hl-expr">&#128193; tests</span><span class="hl-tag">&lt;/span&gt;</span>
<span class="ln">24</span>    <span class="hl-tag">&lt;ul</span> <span class="hl-attr">subtree</span><span class="hl-tag">&gt;</span>
<span class="ln">25</span>      <span class="hl-tag">&lt;li&gt;</span><span class="hl-expr">&#9881; unit.spec.js</span><span class="hl-tag">&lt;/li&gt;</span>
<span class="ln">26</span>      <span class="hl-tag">&lt;li&gt;</span><span class="hl-expr">&#9881; integration.spec.js</span><span class="hl-tag">&lt;/li&gt;</span>
<span class="ln">27</span>    <span class="hl-tag">&lt;/ul&gt;</span>
<span class="ln">28</span>  <span class="hl-tag">&lt;/li&gt;</span>
<span class="ln">29</span><span class="hl-tag">&lt;/ul&gt;</span></pre>
      </div>
    </div>
  </div>
</section>

</div>
