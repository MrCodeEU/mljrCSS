<script lang="ts">
  import { Card, TreeView, CodeExample, type TreeNode } from '$lib';

  const fileTree: TreeNode[] = [
    {
      id: 'src',
      label: 'src',
      icon: 'mdi:folder-open',
      children: [
        {
          id: 'components',
          label: 'components',
          children: [
            { id: 'button', label: 'Button.svelte', icon: 'mdi:language-typescript' },
            { id: 'card', label: 'Card.svelte', icon: 'mdi:language-typescript' },
            { id: 'input', label: 'Input.svelte', icon: 'mdi:language-typescript' },
          ],
        },
        {
          id: 'routes',
          label: 'routes',
          children: [
            { id: 'page', label: '+page.svelte', icon: 'mdi:language-typescript' },
            { id: 'layout', label: '+layout.svelte', icon: 'mdi:language-typescript' },
          ],
        },
        { id: 'app-css', label: 'app.css', icon: 'mdi:language-css3' },
        { id: 'app-html', label: 'app.html', icon: 'mdi:language-html5' },
      ],
    },
    {
      id: 'static',
      label: 'static',
      children: [
        { id: 'favicon', label: 'favicon.png', icon: 'mdi:image' },
      ],
    },
    { id: 'package-json', label: 'package.json', icon: 'mdi:code-json' },
    { id: 'tsconfig', label: 'tsconfig.json', icon: 'mdi:code-json' },
  ];

  const orgTree: TreeNode[] = [
    {
      id: 'company',
      label: 'MLJR Corp',
      icon: 'mdi:office-building',
      children: [
        {
          id: 'engineering',
          label: 'Engineering',
          icon: 'mdi:code-braces',
          children: [
            { id: 'frontend', label: 'Frontend Team', icon: 'mdi:monitor' },
            { id: 'backend', label: 'Backend Team', icon: 'mdi:server' },
            { id: 'devops', label: 'DevOps', icon: 'mdi:cloud' },
          ],
        },
        {
          id: 'design',
          label: 'Design',
          icon: 'mdi:palette',
          children: [
            { id: 'ux', label: 'UX Design', icon: 'mdi:pencil-ruler' },
            { id: 'brand', label: 'Brand', icon: 'mdi:brush' },
          ],
        },
        { id: 'hr', label: 'Human Resources', icon: 'mdi:account-group' },
      ],
    },
  ];

  let selected = $state<string[]>([]);
  let checkedItems = $state<string[]>([]);
  let searchQuery = $state('');
</script>

<section id="tree-view" class="mljr-mb-8">
  <div class="mljr-grid mljr-grid-cols-1 mljr-gap-6">

    <div class="mljr-grid mljr-grid-cols-1 mljr-md:grid-cols-2 mljr-gap-6">
      <!-- File Tree -->
      <Card title="File Tree" description="Directory browser with icons">
        <div class="tree-demo">
          <TreeView
            nodes={fileTree}
            bind:selected
            defaultExpanded={['src', 'components']}
            onSelect={(ids) => selected = ids}
          />
        </div>
        {#if selected.length}
          <p style="font-size: 0.75rem; color: var(--mljr-text-muted); margin-top: 0.5rem;">
            Selected: {selected.join(', ')}
          </p>
        {/if}
      </Card>

      <!-- Organization Tree with Checkboxes -->
      <Card title="Checkable Tree" description="Hierarchical selection with parent-child relationship">
        <div class="tree-demo">
          <TreeView
            nodes={orgTree}
            checkable
            bind:selected={checkedItems}
            defaultExpanded={['company', 'engineering']}
          />
        </div>
        {#if checkedItems.length}
          <p style="font-size: 0.75rem; color: var(--mljr-text-muted); margin-top: 0.5rem;">
            Selected: {checkedItems.length} item(s)
          </p>
        {/if}
      </Card>
    </div>

    <!-- Searchable Tree -->
    <Card title="Searchable Tree" description="Filter tree nodes with search">
      <div class="search-demo">
        <input
          type="search"
          class="mljr-input mljr-input-sm"
          placeholder="Search nodes..."
          bind:value={searchQuery}
          style="max-width: 300px; margin-bottom: 1rem;"
        />
        <TreeView
          nodes={fileTree}
          searchQuery={searchQuery}
          defaultExpanded={['src']}
        />
      </div>
    </Card>

    <CodeExample code={`<script lang="ts">
  import { TreeView, type TreeNode } from 'mljr-svelte';

  const nodes: TreeNode[] = [
    {
      id: 'src',
      label: 'src',
      children: [
        {
          id: 'components',
          label: 'components',
          children: [
            { id: 'button', label: 'Button.svelte' },
          ],
        },
      ],
    },
  ];

  let selected = $state([]);
&lt;/script&gt;

&lt;!-- Basic tree --&gt;
&lt;TreeView {nodes} bind:selected /&gt;

&lt;!-- With checkboxes --&gt;
&lt;TreeView {nodes} checkable bind:selected /&gt;

&lt;!-- With search --&gt;
&lt;TreeView {nodes} searchQuery="button" /&gt;

&lt;!-- Pre-expanded nodes --&gt;
&lt;TreeView {nodes} defaultExpanded={['src', 'components']} /&gt;`} />
  </div>
</section>

<style>
  .tree-demo {
    padding: 0.5rem;
    background: var(--mljr-bg-secondary);
    border-radius: var(--mljr-radius-lg);
    min-height: 200px;
    max-height: 300px;
    overflow-y: auto;
  }

  .search-demo {
    padding: 0.5rem;
  }
</style>
