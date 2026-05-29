<style>
  /* ─── DnD-specific ──────────────────────────── */
  .dnd-demo-zone {
    min-height: 80px;
    padding: 1rem;
    border: 2px dashed var(--border);
    border-radius: 8px;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    align-items: flex-start;
    transition: border-color 0.15s;
  }
  .dnd-demo-zone.nojs-drag-over {
    border-color: var(--primary);
    background: var(--primary-surface);
  }
  .dnd-demo-item {
    padding: 0.5rem 1rem;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 6px;
    cursor: grab;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text-secondary);
    user-select: none;
  }
  .dnd-demo-item.nojs-dragging {
    opacity: 0.4;
  }
  .dnd-demo-item.nojs-selected {
    border-color: var(--primary);
    background: var(--primary-surface);
  }
  .dnd-kanban {
    display: flex;
    gap: 1rem;
  }
  .dnd-kanban-col {
    flex: 1;
    min-width: 0;
  }
  .dnd-kanban-col h4 {
    margin: 0 0 0.5rem;
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text-muted);
  }
  .dnd-kanban-col .dnd-demo-zone {
    flex-direction: column;
    min-height: 120px;
  }
  .dnd-kanban-col .dnd-demo-item {
    width: 100%;
    box-sizing: border-box;
  }
  @media (max-width: 600px) {
    .dnd-kanban { flex-direction: column; }
  }
</style>

<div class="route-header">
  <span class="route-badge">Interaction</span>
  <h1>Drag & Drop</h1>
  <p>Declarative drag-and-drop with sortable lists, Kanban transfers, multi-select, handles, and placeholders.</p>
</div>

<div class="container" style="padding: 2rem;">

<!-- API Documentation -->
<section class="docs-api">

  <p>Full drag-and-drop system built on the HTML Drag and Drop API. Supports typed drag sources, filtered drop zones, sortable lists, multi-select, custom handles, drag images, and placeholder indicators — all via HTML attributes.</p>

  <h3>Drag Attributes</h3>
  <table class="docs-table">
    <thead><tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
    <tbody>
      <tr><td><code>drag</code></td><td>expression</td><td><em>required</em></td><td>The value being dragged</td></tr>
      <tr><td><code>drag-type</code></td><td>string</td><td><code>"default"</code></td><td>Named type — only matching <code>drop-accept</code> zones respond</td></tr>
      <tr><td><code>drag-effect</code></td><td><code>"copy"</code> | <code>"move"</code> | <code>"link"</code></td><td><code>"move"</code></td><td>Maps to <code>dataTransfer.effectAllowed</code></td></tr>
      <tr><td><code>drag-handle</code></td><td>CSS selector</td><td>—</td><td>Restricts the grab area to a child element</td></tr>
      <tr><td><code>drag-image</code></td><td>CSS selector | <code>"none"</code></td><td>—</td><td>Custom drag ghost element</td></tr>
      <tr><td><code>drag-disabled</code></td><td>expression</td><td><code>false</code></td><td>When truthy, disables dragging</td></tr>
      <tr><td><code>drag-class</code></td><td>string</td><td><code>"nojs-dragging"</code></td><td>Class added while dragging</td></tr>
      <tr><td><code>drag-group</code></td><td>string</td><td>—</td><td>Group name for multi-select</td></tr>
    </tbody>
  </table>

  <h3>Drop Attributes</h3>
  <table class="docs-table">
    <thead><tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
    <tbody>
      <tr><td><code>drop</code></td><td>statement</td><td><em>required</em></td><td>Expression executed on drop</td></tr>
      <tr><td><code>drop-accept</code></td><td>string</td><td><code>"default"</code></td><td>Accepted <code>drag-type</code>(s). Use <code>"*"</code> for any</td></tr>
      <tr><td><code>drop-effect</code></td><td><code>"copy"</code> | <code>"move"</code> | <code>"link"</code></td><td><code>"move"</code></td><td>Maps to <code>dataTransfer.dropEffect</code></td></tr>
      <tr><td><code>drop-class</code></td><td>string</td><td><code>"nojs-drag-over"</code></td><td>Class added when valid item hovers</td></tr>
      <tr><td><code>drop-disabled</code></td><td>expression</td><td><code>false</code></td><td>When truthy, disables dropping</td></tr>
      <tr><td><code>drop-max</code></td><td>number</td><td><code>Infinity</code></td><td>Max items the zone accepts</td></tr>
      <tr><td><code>drop-sort</code></td><td><code>"vertical"</code> | <code>"horizontal"</code> | <code>"grid"</code></td><td>—</td><td>Enables sortable reorder by position</td></tr>
      <tr><td><code>drop-placeholder</code></td><td>template ID | <code>"auto"</code></td><td>—</td><td>Shows a placeholder at insertion point</td></tr>
    </tbody>
  </table>

  <h3>Drag-List Attributes</h3>
  <table class="docs-table">
    <thead><tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
    <tbody>
      <tr><td><code>drag-list</code></td><td>path</td><td><em>required</em></td><td>Path to array in state</td></tr>
      <tr><td><code>template</code></td><td>template ID</td><td>—</td><td>Template for each item</td></tr>
      <tr><td><code>drag-list-key</code></td><td>property name</td><td>—</td><td>Unique key per item for stable identity</td></tr>
      <tr><td><code>drag-list-item</code></td><td>variable name</td><td><code>"item"</code></td><td>Loop variable name in template</td></tr>
      <tr><td><code>drop-sort</code></td><td><code>"vertical"</code> | <code>"horizontal"</code> | <code>"grid"</code></td><td><code>"vertical"</code></td><td>Layout direction</td></tr>
      <tr><td><code>drag-list-copy</code></td><td>boolean attr</td><td>—</td><td>Copy items instead of moving</td></tr>
      <tr><td><code>drag-list-remove</code></td><td>boolean attr</td><td>—</td><td>Remove items when dragged out</td></tr>
    </tbody>
  </table>

  <h3>Drag-List Events</h3>
  <table class="docs-table">
    <thead><tr><th>Event</th><th><code>$event.detail</code></th><th>Description</th></tr></thead>
    <tbody>
      <tr><td><code>on:reorder</code></td><td><code>{ list, item, from, to }</code></td><td>Item reordered within same list</td></tr>
      <tr><td><code>on:receive</code></td><td><code>{ list, item, from, fromList }</code></td><td>Item received from another list</td></tr>
      <tr><td><code>on:remove</code></td><td><code>{ list, item, index }</code></td><td>Item removed (dragged out)</td></tr>
    </tbody>
  </table>

  <h3>Implicit Variables</h3>
  <table class="docs-table">
    <thead><tr><th>Variable</th><th>Type</th><th>Description</th></tr></thead>
    <tbody>
      <tr><td><code>$drag</code></td><td>any</td><td>The dragged value. Array if multi-select</td></tr>
      <tr><td><code>$dragType</code></td><td>string</td><td>The <code>drag-type</code> of the item</td></tr>
      <tr><td><code>$dropIndex</code></td><td>number</td><td>Insertion index within the drop zone</td></tr>
      <tr><td><code>$source</code></td><td>object | null</td><td><code>{ list, index, el }</code> — source info</td></tr>
      <tr><td><code>$target</code></td><td>object | null</td><td><code>{ list, index, el }</code> — target info</td></tr>
    </tbody>
  </table>

  <h3>Keyboard Navigation</h3>
  <table class="docs-table">
    <thead><tr><th>Key</th><th>Action</th></tr></thead>
    <tbody>
      <tr><td><code>Space</code></td><td>Grab the focused item</td></tr>
      <tr><td><code>Arrow keys</code></td><td>Navigate while grabbed</td></tr>
      <tr><td><code>Enter</code></td><td>Drop the item at current position</td></tr>
      <tr><td><code>Escape</code></td><td>Cancel the drag</td></tr>
    </tbody>
  </table>

  <h3>Accessibility</h3>
  <p>Adds <code>draggable="true"</code>, <code>aria-grabbed</code>, <code>aria-dropeffect</code>, <code>role="listbox"</code>/<code>"option"</code> on <code>drag-list</code>, and <code>tabindex="0"</code> for keyboard access.</p>

</section>

<!-- Basic Drag & Drop -->
<section class="demo-section">
  <h2>Basic Drag & Drop</h2>
  <p>Drag fruits from the palette into the basket. Items are copied (the palette keeps them).</p>
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
      <div state="{ fruits: ['Apple', 'Banana', 'Cherry'], basket: [] }" style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 200px;">
          <p style="margin: 0 0 0.5rem; font-size: 0.8rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted);">Palette</p>
          <div drag-list="fruits"
               template="basic-src-tpl"
               drag-list-key="$index"
               drag-type="fruit"
               drop-sort="vertical"
               drag-list-copy
               class="dnd-demo-zone"
               style="flex-direction: column;">
          </div>
        </div>
        <div style="flex: 1; min-width: 200px;">
          <p style="margin: 0 0 0.5rem; font-size: 0.8rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted);">Basket</p>
          <div drag-list="basket"
               template="basic-dst-tpl"
               drag-list-key="$index"
               drag-type="fruit"
               drop-accept="fruit"
               drop-sort="vertical"
               drop-placeholder="auto"
               class="dnd-demo-zone"
               style="flex-direction: column;">
          </div>
        </div>
        <template id="basic-src-tpl">
          <div class="dnd-demo-item" style="width: 100%; box-sizing: border-box; cursor: grab;">
            <span bind="item"></span>
          </div>
        </template>
        <template id="basic-dst-tpl">
          <div class="dnd-demo-item" style="width: 100%; box-sizing: border-box; cursor: grab;">
            <span bind="item"></span>
          </div>
        </template>
      </div>
    </div>
    <div class="demo-tabbed-panel demo-tab-code" show="showCode">
      <div class="demo-code-scroll">
        <pre>
<span class="ln"> 1</span><span class="hl-tag">&lt;div</span> <span class="hl-attr">state</span><span class="hl-op">=</span><span class="hl-str">"{ fruits: ['Apple','Banana','Cherry'], basket: [] }"</span><span class="hl-tag">&gt;</span>
<span class="ln"> 2</span>
<span class="ln"> 3</span>  <span class="hl-cmt">&lt;!-- Source palette (drag-list-copy keeps items) --&gt;</span>
<span class="ln"> 4</span>  <span class="hl-tag">&lt;div</span>
<span class="ln"> 5</span>    <span class="hl-attr">drag-list</span><span class="hl-op">=</span><span class="hl-str">"fruits"</span>
<span class="ln"> 6</span>    <span class="hl-attr">template</span><span class="hl-op">=</span><span class="hl-str">"fruit-tpl"</span>
<span class="ln"> 7</span>    <span class="hl-attr">drag-type</span><span class="hl-op">=</span><span class="hl-str">"fruit"</span>
<span class="ln"> 8</span>    <span class="hl-attr">drag-list-copy</span><span class="hl-tag">&gt;</span>
<span class="ln"> 9</span>  <span class="hl-tag">&lt;/div&gt;</span>
<span class="ln">10</span>
<span class="ln">11</span>  <span class="hl-cmt">&lt;!-- Target basket --&gt;</span>
<span class="ln">12</span>  <span class="hl-tag">&lt;div</span>
<span class="ln">13</span>    <span class="hl-attr">drag-list</span><span class="hl-op">=</span><span class="hl-str">"basket"</span>
<span class="ln">14</span>    <span class="hl-attr">template</span><span class="hl-op">=</span><span class="hl-str">"fruit-tpl"</span>
<span class="ln">15</span>    <span class="hl-attr">drop-accept</span><span class="hl-op">=</span><span class="hl-str">"fruit"</span>
<span class="ln">16</span>    <span class="hl-attr">drop-sort</span><span class="hl-op">=</span><span class="hl-str">"vertical"</span>
<span class="ln">17</span>    <span class="hl-attr">drop-placeholder</span><span class="hl-op">=</span><span class="hl-str">"auto"</span><span class="hl-tag">&gt;</span>
<span class="ln">18</span>  <span class="hl-tag">&lt;/div&gt;</span>
<span class="ln">19</span>
<span class="ln">20</span>  <span class="hl-tag">&lt;template</span> <span class="hl-attr">id</span><span class="hl-op">=</span><span class="hl-str">"fruit-tpl"</span><span class="hl-tag">&gt;</span>
<span class="ln">21</span>    <span class="hl-tag">&lt;div</span> <span class="hl-attr">bind</span><span class="hl-op">=</span><span class="hl-str">"item"</span><span class="hl-tag">&gt;&lt;/div&gt;</span>
<span class="ln">22</span>  <span class="hl-tag">&lt;/template&gt;</span>
<span class="ln">23</span>
<span class="ln">24</span><span class="hl-tag">&lt;/div&gt;</span></pre>
      </div>
    </div>
  </div>
</section>

<!-- Sortable List -->
<section class="demo-section">
  <h2>Sortable List</h2>
  <p>Reorder items within a single list using <code>drag-list</code>.</p>
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
      <div state="{ tasks: [{id:1, title:'Design mockups'}, {id:2, title:'Write tests'}, {id:3, title:'Code review'}, {id:4, title:'Deploy to staging'}] }">
        <div drag-list="tasks"
             template="sortable-tpl"
             drag-list-key="id"
             drop-sort="vertical"
             drop-placeholder="auto"
             class="dnd-demo-zone"
             style="flex-direction: column;">
        </div>
        <template id="sortable-tpl">
          <div class="dnd-demo-item" style="width: 100%; box-sizing: border-box; cursor: grab;">
            <span bind="item.title"></span>
          </div>
        </template>
      </div>
    </div>
    <div class="demo-tabbed-panel demo-tab-code" show="showCode">
      <div class="demo-code-scroll">
        <pre>
<span class="ln"> 1</span><span class="hl-tag">&lt;div</span> <span class="hl-attr">state</span><span class="hl-op">=</span><span class="hl-str">"{ tasks: [</span>
<span class="ln"> 2</span><span class="hl-str">  {id:1, title:'Design mockups'},</span>
<span class="ln"> 3</span><span class="hl-str">  {id:2, title:'Write tests'},</span>
<span class="ln"> 4</span><span class="hl-str">  {id:3, title:'Code review'},</span>
<span class="ln"> 5</span><span class="hl-str">  {id:4, title:'Deploy to staging'}</span>
<span class="ln"> 6</span><span class="hl-str">] }"</span><span class="hl-tag">&gt;</span>
<span class="ln"> 7</span>
<span class="ln"> 8</span>  <span class="hl-tag">&lt;div</span>
<span class="ln"> 9</span>    <span class="hl-attr">drag-list</span><span class="hl-op">=</span><span class="hl-str">"tasks"</span>
<span class="ln">10</span>    <span class="hl-attr">template</span><span class="hl-op">=</span><span class="hl-str">"task-tpl"</span>
<span class="ln">11</span>    <span class="hl-attr">drag-list-key</span><span class="hl-op">=</span><span class="hl-str">"id"</span>
<span class="ln">12</span>    <span class="hl-attr">drop-sort</span><span class="hl-op">=</span><span class="hl-str">"vertical"</span>
<span class="ln">13</span>    <span class="hl-attr">drop-placeholder</span><span class="hl-op">=</span><span class="hl-str">"auto"</span><span class="hl-tag">&gt;</span>
<span class="ln">14</span>  <span class="hl-tag">&lt;/div&gt;</span>
<span class="ln">15</span>
<span class="ln">16</span>  <span class="hl-tag">&lt;template</span> <span class="hl-attr">id</span><span class="hl-op">=</span><span class="hl-str">"task-tpl"</span><span class="hl-tag">&gt;</span>
<span class="ln">17</span>    <span class="hl-tag">&lt;div</span> <span class="hl-attr">bind</span><span class="hl-op">=</span><span class="hl-str">"item.title"</span><span class="hl-tag">&gt;&lt;/div&gt;</span>
<span class="ln">18</span>  <span class="hl-tag">&lt;/template&gt;</span>
<span class="ln">19</span>
<span class="ln">20</span><span class="hl-tag">&lt;/div&gt;</span></pre>
      </div>
    </div>
  </div>
</section>

<!-- Kanban Transfer -->
<section class="demo-section">
  <h2>Kanban — Two-List Transfer</h2>
  <p>Drag cards between columns. Uses <code>drag-list-remove</code> to remove from the source list on transfer.</p>
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
      <div state="{ todo: [{id:1,title:'Research API'},{id:2,title:'Write docs'},{id:3,title:'Add tests'}], done: [{id:4,title:'Setup repo'}] }">
        <div class="dnd-kanban">
          <div class="dnd-kanban-col">
            <h4>To Do</h4>
            <div drag-list="todo"
                 template="kanban-tpl"
                 drag-list-key="id"
                 drag-type="task"
                 drop-accept="task"
                 drop-sort="vertical"
                 drag-list-remove
                 drop-placeholder="auto"
                 class="dnd-demo-zone"
                 style="flex-direction: column;">
            </div>
          </div>
          <div class="dnd-kanban-col">
            <h4>Done</h4>
            <div drag-list="done"
                 template="kanban-tpl"
                 drag-list-key="id"
                 drag-type="task"
                 drop-accept="task"
                 drop-sort="vertical"
                 drag-list-remove
                 drop-placeholder="auto"
                 class="dnd-demo-zone"
                 style="flex-direction: column;">
            </div>
          </div>
        </div>
        <template id="kanban-tpl">
          <div class="dnd-demo-item" style="width: 100%; box-sizing: border-box; cursor: grab;">
            <span bind="item.title"></span>
          </div>
        </template>
      </div>
    </div>
    <div class="demo-tabbed-panel demo-tab-code" show="showCode">
      <div class="demo-code-scroll">
        <pre>
<span class="ln"> 1</span><span class="hl-tag">&lt;div</span> <span class="hl-attr">state</span><span class="hl-op">=</span><span class="hl-str">"{ todo: [...], done: [...] }"</span><span class="hl-tag">&gt;</span>
<span class="ln"> 2</span>
<span class="ln"> 3</span>  <span class="hl-cmt">&lt;!-- To Do column --&gt;</span>
<span class="ln"> 4</span>  <span class="hl-tag">&lt;div</span>
<span class="ln"> 5</span>    <span class="hl-attr">drag-list</span><span class="hl-op">=</span><span class="hl-str">"todo"</span>
<span class="ln"> 6</span>    <span class="hl-attr">template</span><span class="hl-op">=</span><span class="hl-str">"kanban-tpl"</span>
<span class="ln"> 7</span>    <span class="hl-attr">drag-list-key</span><span class="hl-op">=</span><span class="hl-str">"id"</span>
<span class="ln"> 8</span>    <span class="hl-attr">drag-type</span><span class="hl-op">=</span><span class="hl-str">"task"</span>
<span class="ln"> 9</span>    <span class="hl-attr">drop-accept</span><span class="hl-op">=</span><span class="hl-str">"task"</span>
<span class="ln">10</span>    <span class="hl-attr">drop-sort</span><span class="hl-op">=</span><span class="hl-str">"vertical"</span>
<span class="ln">11</span>    <span class="hl-attr">drag-list-remove</span>
<span class="ln">12</span>    <span class="hl-attr">drop-placeholder</span><span class="hl-op">=</span><span class="hl-str">"auto"</span><span class="hl-tag">&gt;</span>
<span class="ln">13</span>  <span class="hl-tag">&lt;/div&gt;</span>
<span class="ln">14</span>
<span class="ln">15</span>  <span class="hl-cmt">&lt;!-- Done column --&gt;</span>
<span class="ln">16</span>  <span class="hl-tag">&lt;div</span>
<span class="ln">17</span>    <span class="hl-attr">drag-list</span><span class="hl-op">=</span><span class="hl-str">"done"</span>
<span class="ln">18</span>    <span class="hl-attr">template</span><span class="hl-op">=</span><span class="hl-str">"kanban-tpl"</span>
<span class="ln">19</span>    <span class="hl-attr">drag-list-key</span><span class="hl-op">=</span><span class="hl-str">"id"</span>
<span class="ln">20</span>    <span class="hl-attr">drag-type</span><span class="hl-op">=</span><span class="hl-str">"task"</span>
<span class="ln">21</span>    <span class="hl-attr">drop-accept</span><span class="hl-op">=</span><span class="hl-str">"task"</span>
<span class="ln">22</span>    <span class="hl-attr">drop-sort</span><span class="hl-op">=</span><span class="hl-str">"vertical"</span>
<span class="ln">23</span>    <span class="hl-attr">drag-list-remove</span>
<span class="ln">24</span>    <span class="hl-attr">drop-placeholder</span><span class="hl-op">=</span><span class="hl-str">"auto"</span><span class="hl-tag">&gt;</span>
<span class="ln">25</span>  <span class="hl-tag">&lt;/div&gt;</span>
<span class="ln">26</span>
<span class="ln">27</span>  <span class="hl-tag">&lt;template</span> <span class="hl-attr">id</span><span class="hl-op">=</span><span class="hl-str">"kanban-tpl"</span><span class="hl-tag">&gt;</span>
<span class="ln">28</span>    <span class="hl-tag">&lt;div&gt;</span><span class="hl-tag">&lt;span</span> <span class="hl-attr">bind</span><span class="hl-op">=</span><span class="hl-str">"item.title"</span><span class="hl-tag">&gt;&lt;/span&gt;&lt;/div&gt;</span>
<span class="ln">29</span>  <span class="hl-tag">&lt;/template&gt;</span>
<span class="ln">30</span>
<span class="ln">31</span><span class="hl-tag">&lt;/div&gt;</span></pre>
      </div>
    </div>
  </div>
</section>

<!-- Multi-Select -->
<section class="demo-section">
  <h2>Multi-Select</h2>
  <p>Click to select, <code>Ctrl/Cmd+Click</code> to add to selection, then drag all selected items together.</p>
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
      <div state="{ colors: ['Red', 'Green', 'Blue', 'Yellow'], received: [] }" style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 200px;">
          <p style="margin: 0 0 0.5rem; font-size: 0.8rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted);">Select & drag</p>
          <div drag-list="colors"
               template="multi-src-tpl"
               drag-list-key="$index"
               drag-type="color"
               drop-sort="horizontal"
               drag-list-copy
               class="dnd-demo-zone">
          </div>
        </div>
        <div style="flex: 1; min-width: 200px;">
          <p style="margin: 0 0 0.5rem; font-size: 0.8rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted);">Drop here</p>
          <div drag-list="received"
               template="multi-dst-tpl"
               drag-list-key="$index"
               drag-type="color"
               drop-accept="color"
               drop-sort="horizontal"
               drop-placeholder="auto"
               class="dnd-demo-zone">
          </div>
        </div>
        <template id="multi-src-tpl">
          <div class="dnd-demo-item" drag-group="palette" drag-multiple style="cursor: grab;">
            <span bind="item"></span>
          </div>
        </template>
        <template id="multi-dst-tpl">
          <div class="dnd-demo-item" style="cursor: grab;">
            <span bind="item"></span>
          </div>
        </template>
      </div>
    </div>
    <div class="demo-tabbed-panel demo-tab-code" show="showCode">
      <div class="demo-code-scroll">
        <pre>
<span class="ln"> 1</span><span class="hl-tag">&lt;div</span> <span class="hl-attr">drag</span><span class="hl-op">=</span><span class="hl-str">"'Red'"</span>
<span class="ln"> 2</span>     <span class="hl-attr">drag-type</span><span class="hl-op">=</span><span class="hl-str">"color"</span>
<span class="ln"> 3</span>     <span class="hl-attr">drag-group</span><span class="hl-op">=</span><span class="hl-str">"palette"</span>
<span class="ln"> 4</span>     <span class="hl-attr">drag-multiple</span><span class="hl-tag">&gt;</span>
<span class="ln"> 5</span>  <span class="hl-expr">Red</span>
<span class="ln"> 6</span><span class="hl-tag">&lt;/div&gt;</span>
<span class="ln"> 7</span>
<span class="ln"> 8</span><span class="hl-cmt">&lt;!-- Repeat for Green, Blue, Yellow... --&gt;</span>
<span class="ln"> 9</span>
<span class="ln">10</span><span class="hl-tag">&lt;div</span>
<span class="ln">11</span>  <span class="hl-attr">drop</span><span class="hl-op">=</span><span class="hl-str">"received = [...received,</span>
<span class="ln">12</span><span class="hl-str">    ...(Array.isArray($drag) ? $drag : [$drag])]"</span>
<span class="ln">13</span>  <span class="hl-attr">drop-accept</span><span class="hl-op">=</span><span class="hl-str">"color"</span><span class="hl-tag">&gt;</span>
<span class="ln">14</span><span class="hl-tag">&lt;/div&gt;</span></pre>
      </div>
    </div>
  </div>
</section>

<!-- Max Capacity -->
<section class="demo-section">
  <h2>Max Capacity</h2>
  <p>The drop zone accepts at most 2 items. Additional drops are rejected with the <code>nojs-drop-reject</code> class.</p>
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
      <div state="{ items: ['Item A', 'Item B', 'Item C'], slots: [] }" style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 200px;">
          <div drag-list="items"
               template="max-src-tpl"
               drag-list-key="$index"
               drag-type="any"
               drop-sort="vertical"
               drag-list-copy
               class="dnd-demo-zone"
               style="flex-direction: column;">
          </div>
        </div>
        <div style="flex: 1; min-width: 200px;">
          <p style="margin: 0 0 0.5rem; font-size: 0.8rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted);">Max 2 items</p>
          <div drag-list="slots"
               template="max-dst-tpl"
               drag-list-key="$index"
               drag-type="any"
               drop-accept="any"
               drop-sort="vertical"
               drop-max="2"
               drop-placeholder="auto"
               class="dnd-demo-zone"
               style="flex-direction: column;">
          </div>
        </div>
        <template id="max-src-tpl">
          <div class="dnd-demo-item" style="width: 100%; box-sizing: border-box; cursor: grab;">
            <span bind="item"></span>
          </div>
        </template>
        <template id="max-dst-tpl">
          <div class="dnd-demo-item" style="width: 100%; box-sizing: border-box; cursor: grab;">
            <span bind="item"></span>
          </div>
        </template>
      </div>
    </div>
    <div class="demo-tabbed-panel demo-tab-code" show="showCode">
      <div class="demo-code-scroll">
        <pre>
<span class="ln">1</span><span class="hl-tag">&lt;div</span>
<span class="ln">2</span>  <span class="hl-attr">drop</span><span class="hl-op">=</span><span class="hl-str">"slots = [...slots, $drag]"</span>
<span class="ln">3</span>  <span class="hl-attr">drop-accept</span><span class="hl-op">=</span><span class="hl-str">"any"</span>
<span class="ln">4</span>  <span class="hl-attr">drop-max</span><span class="hl-op">=</span><span class="hl-str">"2"</span><span class="hl-tag">&gt;</span>
<span class="ln">5</span><span class="hl-tag">&lt;/div&gt;</span></pre>
      </div>
    </div>
  </div>
</section>


</div>
