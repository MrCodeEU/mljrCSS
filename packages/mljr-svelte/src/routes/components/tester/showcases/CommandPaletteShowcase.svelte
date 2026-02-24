<script lang="ts">
  import { CommandPalette, Button, Card, Icon, Badge } from '$lib';

  let open1 = $state(false);
  let open2 = $state(false);
  let lastCommand = $state('');

  const basicCommands = [
    { id: 'new-file', label: 'New File', icon: 'mdi:file-plus', shortcut: 'Ctrl+N', section: 'File', action: () => { lastCommand = 'New File'; } },
    { id: 'open-file', label: 'Open File', icon: 'mdi:folder-open', shortcut: 'Ctrl+O', section: 'File', action: () => { lastCommand = 'Open File'; } },
    { id: 'save', label: 'Save', icon: 'mdi:content-save', shortcut: 'Ctrl+S', section: 'File', action: () => { lastCommand = 'Save'; } },
    { id: 'close', label: 'Close File', icon: 'mdi:close', shortcut: 'Ctrl+W', section: 'File', action: () => { lastCommand = 'Close File'; } },
    { id: 'cut', label: 'Cut', icon: 'mdi:content-cut', shortcut: 'Ctrl+X', section: 'Edit', action: () => { lastCommand = 'Cut'; } },
    { id: 'copy', label: 'Copy', icon: 'mdi:content-copy', shortcut: 'Ctrl+C', section: 'Edit', action: () => { lastCommand = 'Copy'; } },
    { id: 'paste', label: 'Paste', icon: 'mdi:content-paste', shortcut: 'Ctrl+V', section: 'Edit', action: () => { lastCommand = 'Paste'; } },
    { id: 'undo', label: 'Undo', icon: 'mdi:undo', shortcut: 'Ctrl+Z', section: 'Edit', action: () => { lastCommand = 'Undo'; } },
    { id: 'toggle-dark', label: 'Toggle Dark Mode', icon: 'mdi:theme-light-dark', section: 'View', action: () => { lastCommand = 'Toggle Dark Mode'; } },
    { id: 'fullscreen', label: 'Toggle Fullscreen', icon: 'mdi:fullscreen', shortcut: 'F11', section: 'View', action: () => { lastCommand = 'Toggle Fullscreen'; } },
    { id: 'settings', label: 'Open Settings', icon: 'mdi:cog', shortcut: 'Ctrl+,', section: 'Settings', action: () => { lastCommand = 'Open Settings'; } },
    { id: 'keyboard', label: 'Keyboard Shortcuts', icon: 'mdi:keyboard', section: 'Settings', action: () => { lastCommand = 'Keyboard Shortcuts'; } },
  ];

  const navigationCommands = [
    { id: 'go-home', label: 'Go to Home', icon: 'mdi:home', section: 'Navigation', action: () => { lastCommand = 'Go to Home'; } },
    { id: 'go-docs', label: 'Go to Documentation', icon: 'mdi:book-open', section: 'Navigation', action: () => { lastCommand = 'Go to Documentation'; } },
    { id: 'go-components', label: 'Go to Components', icon: 'mdi:puzzle', section: 'Navigation', action: () => { lastCommand = 'Go to Components'; } },
    { id: 'go-examples', label: 'Go to Examples', icon: 'mdi:code-tags', section: 'Navigation', action: () => { lastCommand = 'Go to Examples'; } },
    { id: 'copy-url', label: 'Copy Current URL', icon: 'mdi:link', section: 'Actions', shortcut: 'Ctrl+Shift+C', action: () => { lastCommand = 'Copy URL'; } },
    { id: 'share', label: 'Share Page', icon: 'mdi:share', section: 'Actions', action: () => { lastCommand = 'Share Page'; } },
    { id: 'feedback', label: 'Send Feedback', icon: 'mdi:message', section: 'Help', action: () => { lastCommand = 'Send Feedback'; } },
    { id: 'report-bug', label: 'Report a Bug', icon: 'mdi:bug', section: 'Help', action: () => { lastCommand = 'Report Bug'; } },
    { id: 'disabled-cmd', label: 'Unavailable Feature', icon: 'mdi:lock', section: 'Help', disabled: true, action: () => {} },
  ];
</script>

<div class="mljr-space-y-8">
  <!-- Basic Demo -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Command Palette Demo</h3>
    <div class="mljr-space-y-3">
      <p class="mljr-text-sm mljr-text-muted">
        Press <kbd class="mljr-kbd">Ctrl+K</kbd> or click the button below to open the command palette.
      </p>
      <Button variant="outline-primary" onclick={() => { open1 = true; }}>
        <Icon icon="mdi:magnify" size={18} />
        Open Command Palette
      </Button>
      {#if lastCommand}
        <div class="mljr-flex mljr-items-center mljr-gap-2">
          <span class="mljr-text-sm mljr-text-muted">Last executed:</span>
          <Badge variant="primary">{lastCommand}</Badge>
        </div>
      {/if}
    </div>

    <CommandPalette
      commands={basicCommands}
      bind:open={open1}
      onselect={(cmd) => { lastCommand = cmd.label; }}
    />
  </section>

  <!-- Navigation Palette -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Navigation Palette</h3>
    <Card>
      <div class="mljr-space-y-3">
        <p class="mljr-text-sm">Site navigation and actions palette with disabled items.</p>
        <Button variant="ghost" onclick={() => { open2 = true; }}>
          <Icon icon="mdi:arrow-right-circle" size={18} />
          Open Navigation Palette
        </Button>
      </div>
    </Card>

    <CommandPalette
      commands={navigationCommands}
      bind:open={open2}
      placeholder="Navigate to..."
      onselect={(cmd) => { lastCommand = cmd.label; }}
    />
  </section>

  <!-- Features Overview -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Features</h3>
    <Card>
      <div class="mljr-space-y-3">
        <div class="mljr-flex mljr-items-start mljr-gap-3">
          <Icon icon="mdi:keyboard" size={20} class="mljr-text-primary-500 mljr-mt-0.5 mljr-flex-shrink-0" />
          <div>
            <p class="mljr-font-medium mljr-text-sm">Keyboard Navigation</p>
            <p class="mljr-text-xs mljr-text-muted">Arrow keys to navigate, Enter to select, Escape to close</p>
          </div>
        </div>
        <div class="mljr-flex mljr-items-start mljr-gap-3">
          <Icon icon="mdi:magnify" size={20} class="mljr-text-primary-500 mljr-mt-0.5 mljr-flex-shrink-0" />
          <div>
            <p class="mljr-font-medium mljr-text-sm">Fuzzy Search</p>
            <p class="mljr-text-xs mljr-text-muted">Instantly filters commands as you type</p>
          </div>
        </div>
        <div class="mljr-flex mljr-items-start mljr-gap-3">
          <Icon icon="mdi:folder" size={20} class="mljr-text-primary-500 mljr-mt-0.5 mljr-flex-shrink-0" />
          <div>
            <p class="mljr-font-medium mljr-text-sm">Sections / Groups</p>
            <p class="mljr-text-xs mljr-text-muted">Commands organized by section with dividers</p>
          </div>
        </div>
        <div class="mljr-flex mljr-items-start mljr-gap-3">
          <Icon icon="mdi:information" size={20} class="mljr-text-primary-500 mljr-mt-0.5 mljr-flex-shrink-0" />
          <div>
            <p class="mljr-font-medium mljr-text-sm">Shortcut Display</p>
            <p class="mljr-text-xs mljr-text-muted">Keyboard shortcuts shown alongside commands</p>
          </div>
        </div>
      </div>
    </Card>
  </section>
</div>
