<script lang="ts">
  import { TreeView } from '$lib';
  import type { TreeNode } from '$lib';

  const fileTree: TreeNode[] = [
    {
      id: 'src',
      label: 'src',
      icon: 'mdi:folder',
      children: [
        {
          id: 'components',
          label: 'components',
          icon: 'mdi:folder',
          children: [
            { id: 'button', label: 'Button.svelte', icon: 'mdi:file-code' },
            { id: 'card', label: 'Card.svelte', icon: 'mdi:file-code' },
            { id: 'modal', label: 'Modal.svelte', icon: 'mdi:file-code' },
          ],
        },
        {
          id: 'routes',
          label: 'routes',
          icon: 'mdi:folder',
          children: [
            { id: 'layout', label: '+layout.svelte', icon: 'mdi:file-code' },
            { id: 'page', label: '+page.svelte', icon: 'mdi:file-code' },
          ],
        },
        { id: 'app-css', label: 'app.css', icon: 'mdi:file' },
        { id: 'app-html', label: 'app.html', icon: 'mdi:file' },
      ],
    },
    {
      id: 'tests',
      label: 'tests',
      icon: 'mdi:folder',
      children: [
        { id: 'button-test', label: 'Button.test.ts', icon: 'mdi:file-document' },
        { id: 'card-test', label: 'Card.test.ts', icon: 'mdi:file-document' },
      ],
    },
    { id: 'package', label: 'package.json', icon: 'mdi:file-code' },
    { id: 'readme', label: 'README.md', icon: 'mdi:file-document' },
  ];

  const orgTree: TreeNode[] = [
    {
      id: 'engineering',
      label: 'Engineering',
      children: [
        {
          id: 'frontend',
          label: 'Frontend',
          children: [
            { id: 'alice', label: 'Alice Chen' },
            { id: 'bob', label: 'Bob Smith' },
          ],
        },
        {
          id: 'backend',
          label: 'Backend',
          children: [
            { id: 'carol', label: 'Carol Jones' },
            { id: 'dave', label: 'Dave Wilson', disabled: true },
          ],
        },
      ],
    },
    {
      id: 'design',
      label: 'Design',
      children: [
        { id: 'eve', label: 'Eve Martinez' },
        { id: 'frank', label: 'Frank Lee' },
      ],
    },
  ];

  let selected = $state<string[]>([]);
  let checkedItems = $state<string[]>([]);
  let searchQuery = $state('');
  let lastExpanded = $state('');
</script>

<div class="mljr-space-y-8">
  <!-- Basic File Tree -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">File System Tree</h3>
    <div style="max-width: 400px; border: 1px solid var(--mljr-border); border-radius: var(--mljr-radius-md); padding: 1rem;">
      <TreeView
        nodes={fileTree}
        defaultExpanded={['src', 'components']}
        bind:selected
        onSelect={(ids) => selected = ids}
      />
    </div>
    {#if selected.length > 0}
      <p class="mljr-text-sm mljr-mt-2">Selected: <strong>{selected.join(', ')}</strong></p>
    {/if}
  </section>

  <!-- Checkable Tree -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Checkable Tree (with cascading selection)</h3>
    <div style="max-width: 400px; border: 1px solid var(--mljr-border); border-radius: var(--mljr-radius-md); padding: 1rem;">
      <TreeView
        nodes={orgTree}
        checkable={true}
        multiple={true}
        bind:selected={checkedItems}
        defaultExpanded={['engineering', 'frontend', 'backend', 'design']}
      />
    </div>
    {#if checkedItems.length > 0}
      <p class="mljr-text-sm mljr-mt-2">Checked: <strong>{checkedItems.join(', ')}</strong></p>
    {/if}
  </section>

  <!-- Search/Filter -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Search & Filter</h3>
    <div class="mljr-mb-3">
      <input
        type="search"
        placeholder="Search nodes..."
        bind:value={searchQuery}
        class="mljr-input mljr-w-full"
        style="max-width: 400px;"
      />
    </div>
    <div style="max-width: 400px; border: 1px solid var(--mljr-border); border-radius: var(--mljr-radius-md); padding: 1rem;">
      <TreeView
        nodes={fileTree}
        {searchQuery}
        defaultExpanded={['src', 'components', 'routes', 'tests']}
      />
    </div>
  </section>

  <!-- No Lines, Compact -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Compact, No Guide Lines</h3>
    <div style="max-width: 400px; border: 1px solid var(--mljr-border); border-radius: var(--mljr-radius-md); padding: 1rem;">
      <TreeView
        nodes={orgTree}
        lines={false}
        compact={true}
        defaultExpanded={['engineering', 'frontend']}
        onExpand={(id, exp) => lastExpanded = `${id}: ${exp ? 'expanded' : 'collapsed'}`}
      />
    </div>
    {#if lastExpanded}
      <p class="mljr-text-sm mljr-mt-2">Last toggle: <strong>{lastExpanded}</strong></p>
    {/if}
  </section>
</div>
