<script lang="ts">
  import Icon from '../layout/Icon.svelte';
  const browser = typeof window !== 'undefined';

  interface Command {
    id: string;
    label: string;
    icon?: string;
    shortcut?: string;
    section?: string;
    disabled?: boolean;
    action: () => void;
  }

  interface Props {
    /** Whether the palette is open */
    open?: boolean;
    /** Available commands */
    commands: Command[];
    /** Placeholder text */
    placeholder?: string;
    /** Show keyboard shortcut hints */
    showShortcuts?: boolean;
    /** Empty state message */
    emptyMessage?: string;
    /** Additional CSS class */
    class?: string;
    /** Callback when palette closes */
    onclose?: () => void;
    /** Callback when command is executed */
    onselect?: (command: Command) => void;
  }

  let {
    open = $bindable(false),
    commands,
    placeholder = 'Type a command or search...',
    showShortcuts = true,
    emptyMessage = 'No commands found',
    class: className = '',
    onclose,
    onselect,
  }: Props = $props();

  let query = $state('');
  let selectedIndex = $state(0);
  let inputRef = $state<HTMLInputElement | null>(null);

  // Filter and group commands
  let filteredCommands = $derived(() => {
    if (!query) return commands;
    const lowerQuery = query.toLowerCase();
    return commands.filter(cmd => 
      !cmd.disabled && 
      (cmd.label.toLowerCase().includes(lowerQuery) || 
       cmd.section?.toLowerCase().includes(lowerQuery))
    );
  });

  let groupedCommands = $derived(() => {
    const filtered = filteredCommands();
    const groups: Record<string, Command[]> = {};
    
    filtered.forEach(cmd => {
      const section = cmd.section || 'Commands';
      if (!groups[section]) groups[section] = [];
      groups[section].push(cmd);
    });
    
    return groups;
  });

  let flatCommands = $derived(() => {
    return filteredCommands();
  });

  function handleKeydown(event: KeyboardEvent) {
    if (!open) {
      // Open on Cmd/Ctrl + K
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        open = true;
      }
      return;
    }

    switch (event.key) {
      case 'Escape':
        event.preventDefault();
        closePalette();
        break;
      case 'ArrowDown':
        event.preventDefault();
        selectedIndex = (selectedIndex + 1) % flatCommands().length;
        scrollIntoView();
        break;
      case 'ArrowUp':
        event.preventDefault();
        selectedIndex = (selectedIndex - 1 + flatCommands().length) % flatCommands().length;
        scrollIntoView();
        break;
      case 'Enter':
        event.preventDefault();
        executeCommand(flatCommands()[selectedIndex]);
        break;
    }
  }

  function scrollIntoView() {
    const element = document.querySelector(`[data-command-index="${selectedIndex}"]`);
    element?.scrollIntoView({ block: 'nearest' });
  }

  function executeCommand(command: Command) {
    if (command?.disabled) return;
    command?.action();
    onselect?.(command);
    closePalette();
  }

  function closePalette() {
    open = false;
    query = '';
    selectedIndex = 0;
    onclose?.();
  }

  function handleBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      closePalette();
    }
  }

  // Focus input when opened
  $effect(() => {
    if (open && browser) {
      setTimeout(() => {
        inputRef?.focus();
        selectedIndex = 0;
      }, 50);
    }
  });

  // Keyboard listener
  $effect(() => {
    if (browser) {
      document.addEventListener('keydown', handleKeydown);
      return () => document.removeEventListener('keydown', handleKeydown);
    }
  });
</script>

{#if open}
  <div class="mljr-command-palette {className}" onclick={handleBackdropClick} onkeydown={(e) => e.key === 'Escape' && (open = false)} role="dialog" aria-modal="true" tabindex="-1">
    <div class="mljr-command-palette-content">
      <!-- Search Input -->
      <div class="mljr-command-palette-search">
        <Icon icon="ph:magnifying-glass" size={20} />
        <input
          bind:this={inputRef}
          type="text"
          {placeholder}
          bind:value={query}
        />
        {#if query}
          <button 
            type="button" 
            class="mljr-command-palette-clear"
            onclick={() => query = ''}
          >
            <Icon icon="ph:x" size={16} />
          </button>
        {/if}
        <kbd class="mljr-command-palette-kbd">ESC</kbd>
      </div>

      <!-- Results -->
      <div class="mljr-command-palette-results">
        {#if flatCommands().length > 0}
          {#each Object.entries(groupedCommands()) as [section, sectionCommands], sectionIndex}
            <div class="mljr-command-palette-section">
              <div class="mljr-command-palette-section-title">{section}</div>
              {#each sectionCommands as command, index}
                {@const globalIndex = flatCommands().indexOf(command)}
                <button
                  type="button"
                  class="mljr-command-palette-item"
                  class:selected={globalIndex === selectedIndex}
                  class:disabled={command.disabled}
                  data-command-index={globalIndex}
                  onclick={() => executeCommand(command)}
                  onmouseenter={() => selectedIndex = globalIndex}
                >
                  {#if command.icon}
                    <span class="mljr-command-palette-icon">
                      <Icon icon={command.icon} size={18} />
                    </span>
                  {/if}
                  <span class="mljr-command-palette-label">{command.label}</span>
                  {#if showShortcuts && command.shortcut}
                    <kbd class="mljr-command-palette-shortcut">{command.shortcut}</kbd>
                  {/if}
                </button>
              {/each}
            </div>
          {/each}
        {:else}
          <div class="mljr-command-palette-empty">
            <Icon icon="ph:magnifying-glass" size={32} />
            <p>{emptyMessage}</p>
          </div>
        {/if}
      </div>

      <!-- Footer -->
      <div class="mljr-command-palette-footer">
        <div class="mljr-command-palette-hint">
          <kbd>↑↓</kbd> to navigate
        </div>
        <div class="mljr-command-palette-hint">
          <kbd>↵</kbd> to select
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .mljr-command-palette {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding-top: 20vh;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    z-index: 100;
    animation: fadeIn 0.2s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .mljr-command-palette-content {
    width: 100%;
    max-width: 640px;
    margin: 0 var(--mljr-space-4);
    background: var(--mljr-bg);
    border-radius: var(--mljr-radius-2xl);
    box-shadow: var(--mljr-clay-shadow-xl);
    overflow: hidden;
    animation: slideDown 0.2s ease;
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Search */
  .mljr-command-palette-search {
    display: flex;
    align-items: center;
    gap: var(--mljr-space-3);
    padding: var(--mljr-space-4);
    border-bottom: 1px solid var(--mljr-border);
    color: var(--mljr-text-muted);
  }

  .mljr-command-palette-search input {
    flex: 1;
    background: transparent;
    border: none;
    color: var(--mljr-text);
    font-size: var(--mljr-text-lg);
    outline: none;
  }

  .mljr-command-palette-search input::placeholder {
    color: var(--mljr-text-muted);
  }

  .mljr-command-palette-clear {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--mljr-space-1);
    background: var(--mljr-bg-secondary);
    border: none;
    border-radius: var(--mljr-radius-full);
    color: var(--mljr-text-muted);
    cursor: pointer;
    transition: all var(--mljr-transition-fast);
  }

  .mljr-command-palette-clear:hover {
    background: var(--mljr-bg-tertiary);
    color: var(--mljr-text);
  }

  .mljr-command-palette-kbd {
    padding: var(--mljr-space-1) var(--mljr-space-2);
    background: var(--mljr-bg-secondary);
    border: 1px solid var(--mljr-border);
    border-radius: var(--mljr-radius-md);
    color: var(--mljr-text-muted);
    font-size: var(--mljr-text-xs);
    font-family: monospace;
  }

  /* Results */
  .mljr-command-palette-results {
    max-height: 400px;
    overflow-y: auto;
    padding: var(--mljr-space-2);
  }

  .mljr-command-palette-section {
    margin-bottom: var(--mljr-space-2);
  }

  .mljr-command-palette-section-title {
    padding: var(--mljr-space-2) var(--mljr-space-4);
    font-size: var(--mljr-text-xs);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--mljr-text-muted);
  }

  .mljr-command-palette-item {
    display: flex;
    align-items: center;
    gap: var(--mljr-space-3);
    width: 100%;
    padding: var(--mljr-space-3) var(--mljr-space-4);
    background: transparent;
    border: none;
    border-radius: var(--mljr-radius-lg);
    color: var(--mljr-text);
    cursor: pointer;
    font-size: var(--mljr-text-sm);
    text-align: left;
    transition: all var(--mljr-transition-fast);
  }

  .mljr-command-palette-item:hover,
  .mljr-command-palette-item.selected {
    background: var(--mljr-primary-100);
    color: var(--mljr-primary-700);
  }

  .mljr-command-palette-item.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .mljr-command-palette-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: var(--mljr-bg-secondary);
    border-radius: var(--mljr-radius-md);
    color: var(--mljr-text-muted);
  }

  .mljr-command-palette-item:hover .mljr-command-palette-icon,
  .mljr-command-palette-item.selected .mljr-command-palette-icon {
    background: var(--mljr-primary-200);
    color: var(--mljr-primary-600);
  }

  .mljr-command-palette-label {
    flex: 1;
  }

  .mljr-command-palette-shortcut {
    padding: var(--mljr-space-1) var(--mljr-space-2);
    background: var(--mljr-bg-secondary);
    border: 1px solid var(--mljr-border);
    border-radius: var(--mljr-radius-md);
    color: var(--mljr-text-muted);
    font-size: var(--mljr-text-xs);
    font-family: monospace;
  }

  /* Empty State */
  .mljr-command-palette-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--mljr-space-4);
    padding: var(--mljr-space-12);
    color: var(--mljr-text-muted);
  }

  .mljr-command-palette-empty p {
    margin: 0;
    font-size: var(--mljr-text-sm);
  }

  /* Footer */
  .mljr-command-palette-footer {
    display: flex;
    gap: var(--mljr-space-4);
    padding: var(--mljr-space-3) var(--mljr-space-4);
    background: var(--mljr-bg-secondary);
    border-top: 1px solid var(--mljr-border);
    font-size: var(--mljr-text-xs);
    color: var(--mljr-text-muted);
  }

  .mljr-command-palette-hint {
    display: flex;
    align-items: center;
    gap: var(--mljr-space-2);
  }

  .mljr-command-palette-hint kbd {
    padding: var(--mljr-space-1) var(--mljr-space-2);
    background: var(--mljr-bg);
    border: 1px solid var(--mljr-border);
    border-radius: var(--mljr-radius-md);
    font-family: monospace;
  }

  /* Dark Mode */
  :global([data-theme="dark"]) .mljr-command-palette-content,
  :global(.dark) .mljr-command-palette-content {
    background: var(--mljr-bg-secondary);
  }

  :global([data-theme="dark"]) .mljr-command-palette-item:hover,
  :global([data-theme="dark"]) .mljr-command-palette-item.selected,
  :global(.dark) .mljr-command-palette-item:hover,
  :global(.dark) .mljr-command-palette-item.selected {
    background: rgba(249, 115, 22, 0.15);
    color: var(--mljr-primary-300);
  }

  :global([data-theme="dark"]) .mljr-command-palette-icon,
  :global(.dark) .mljr-command-palette-icon {
    background: var(--mljr-bg-tertiary);
  }

  :global([data-theme="dark"]) .mljr-command-palette-footer,
  :global(.dark) .mljr-command-palette-footer {
    background: var(--mljr-bg-tertiary);
  }
</style>
