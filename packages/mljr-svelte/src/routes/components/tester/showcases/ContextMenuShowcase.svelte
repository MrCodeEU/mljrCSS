<script lang="ts">
  import { ContextMenu } from '$lib';
  import type { ContextMenuItem } from '$lib';

  let lastAction = $state('');

  const fileItems: ContextMenuItem[] = [
    { label: 'Open', icon: '📂', shortcut: '⌘O', onClick: () => lastAction = 'Open' },
    { label: 'Open in New Tab', icon: '🔗', onClick: () => lastAction = 'Open in New Tab' },
    { divider: true },
    { label: 'Rename', icon: '✏️', shortcut: 'F2', onClick: () => lastAction = 'Rename' },
    { label: 'Duplicate', icon: '📋', onClick: () => lastAction = 'Duplicate' },
    { divider: true },
    { label: 'Copy Path', icon: '📍', shortcut: '⌘⇧C', onClick: () => lastAction = 'Copy Path' },
    { divider: true },
    { label: 'Move to Trash', icon: '🗑️', danger: true, shortcut: '⌘⌫', onClick: () => lastAction = 'Delete' },
  ];

  const imageItems: ContextMenuItem[] = [
    { label: 'View Full Size', icon: '🔍', onClick: () => lastAction = 'View' },
    { label: 'Save Image', icon: '💾', onClick: () => lastAction = 'Save' },
    { label: 'Copy Image', icon: '📋', shortcut: '⌘C', onClick: () => lastAction = 'Copy' },
    { divider: true },
    { label: 'Share', icon: '↗️', onClick: () => lastAction = 'Share' },
    { label: 'Disabled Option', disabled: true },
  ];
</script>

<div class="mljr-space-y-8">
  <!-- File context menu -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">File Context Menu (Right-click the box)</h3>
    <ContextMenu items={fileItems}>
      <div
        class="mljr-card mljr-p-6 mljr-text-center"
        style="border: 2px dashed var(--mljr-border); border-radius: var(--mljr-radius-lg); cursor: context-menu; min-height: 120px; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 0.5rem;"
      >
        <span style="font-size: 2rem;">📁</span>
        <span class="mljr-text-muted mljr-text-sm">Right-click me for file options</span>
      </div>
    </ContextMenu>
    {#if lastAction}
      <p class="mljr-text-sm mljr-mt-3" style="color: var(--mljr-primary-600);">
        Last action: <strong>{lastAction}</strong>
      </p>
    {/if}
  </section>

  <!-- Image context menu -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Image Context Menu</h3>
    <ContextMenu items={imageItems}>
      <div
        style="width: 200px; height: 130px; background: var(--mljr-primary-100); border-radius: var(--mljr-radius-lg); cursor: context-menu; display: flex; align-items: center; justify-content: center; font-size: 3rem;"
      >
        🖼️
      </div>
    </ContextMenu>
  </section>

  <!-- Items reference -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Item Types Reference</h3>
    <div class="mljr-card mljr-p-4">
      <ul class="mljr-space-y-2 mljr-text-sm">
        <li><strong>label</strong> + <strong>icon</strong> + <strong>shortcut</strong> — Standard item</li>
        <li><strong>danger: true</strong> — Red danger action</li>
        <li><strong>disabled: true</strong> — Grayed out, non-interactive</li>
        <li><strong>divider: true</strong> — Separator line</li>
        <li><strong>onClick</strong> — Action callback</li>
      </ul>
    </div>
  </section>
</div>
