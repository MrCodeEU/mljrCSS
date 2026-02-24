<script lang="ts">
  type KbdSize = 'sm' | 'md' | 'lg';

  interface Props {
    /** Keyboard key text */
    keys?: string[];
    /** Single key (alternative to keys array) */
    key?: string;
    /** Size variant */
    size?: KbdSize;
    /** Additional CSS class */
    class?: string;
  }

  let {
    keys = [],
    key,
    size = 'md',
    class: className = '',
  }: Props = $props();

  const sizeClasses: Record<KbdSize, string> = {
    sm: 'mljr-kbd-sm',
    md: '',
    lg: 'mljr-kbd-lg',
  };

  let kbdClasses = $derived(
    ['mljr-kbd', sizeClasses[size], className].filter(Boolean).join(' ')
  );

  // Handle both single key and keys array
  let displayKeys = $derived(key ? [key] : keys);

  // Platform-specific key mapping
  const platformKeys: Record<string, string> = {
    cmd: '⌘',
    command: '⌘',
    ctrl: 'Ctrl',
    control: 'Ctrl',
    shift: '⇧',
    alt: '⌥',
    option: '⌥',
    enter: '↵',
    return: '↵',
    backspace: '⌫',
    delete: '⌦',
    escape: 'Esc',
    esc: 'Esc',
    tab: '⇥',
    capslock: '⇪',
    up: '↑',
    down: '↓',
    left: '←',
    right: '→',
  };

  function formatKey(k: string): string {
    const normalized = k.toLowerCase().trim();
    return platformKeys[normalized] || k;
  }
</script>

<span class={kbdClasses}>
  {#each displayKeys as k, index}
    {#if index > 0}
      <span class="mljr-kbd-separator">+</span>
    {/if}
    <kbd class="mljr-kbd-key">{formatKey(k)}</kbd>
  {/each}
</span>

<style>
  .mljr-kbd {
    display: inline-flex;
    align-items: center;
    gap: var(--mljr-space-1);
    font-family: var(--mljr-font-sans);
  }

  .mljr-kbd-key {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 2rem;
    height: 2rem;
    padding: 0 var(--mljr-space-2);
    font-size: var(--mljr-text-sm);
    font-weight: 600;
    font-family: var(--mljr-font-sans);
    color: var(--mljr-text);
    background: linear-gradient(135deg, var(--mljr-bg) 0%, var(--mljr-bg-secondary) 100%);
    border: 1px solid var(--mljr-border);
    border-radius: var(--mljr-radius);
    box-shadow:
      0 2px 0 0 var(--mljr-border),
      inset 0 1px 0 0 rgba(255, 255, 255, 0.2);
    transition: all var(--mljr-transition-fast);
  }

  .mljr-kbd-separator {
    font-size: var(--mljr-text-xs);
    font-weight: 500;
    color: var(--mljr-text-muted);
    margin: 0 var(--mljr-space-1);
  }

  /* Size variants */
  .mljr-kbd-sm .mljr-kbd-key {
    min-width: 1.5rem;
    height: 1.5rem;
    padding: 0 var(--mljr-space-1);
    font-size: var(--mljr-text-xs);
  }

  .mljr-kbd-lg .mljr-kbd-key {
    min-width: 2.5rem;
    height: 2.5rem;
    padding: 0 var(--mljr-space-3);
    font-size: var(--mljr-text-base);
  }
</style>
