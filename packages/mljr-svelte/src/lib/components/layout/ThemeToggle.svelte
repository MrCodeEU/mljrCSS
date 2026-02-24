<script lang="ts">
  import Icon from './Icon.svelte';
  import { themeStore, type Theme } from '../../stores/theme.svelte';

  interface Props {
    /** Visual style variant */
    variant?: 'default' | 'simple' | 'segmented';
    /** Size of the toggle */
    size?: 'sm' | 'md' | 'lg';
    /** Show labels alongside icons */
    showLabels?: boolean;
    /** Additional CSS class */
    class?: string;
  }

  let {
    variant = 'default',
    size = 'md',
    showLabels = false,
    class: className = '',
  }: Props = $props();

  const themes: { value: Theme; icon: string; label: string }[] = [
    { value: 'light', icon: 'ph:sun-duotone', label: 'Light' },
    { value: 'dark', icon: 'ph:moon-duotone', label: 'Dark' },
    { value: 'system', icon: 'ph:monitor-duotone', label: 'Auto' },
  ];

  function handleThemeChange(newTheme: Theme) {
    themeStore.setTheme(newTheme);
  }

  let iconSize = $derived(size === 'sm' ? 16 : size === 'md' ? 20 : 24);
</script>

{#if variant === 'segmented'}
  <!-- Segmented Control Style -->
  <div 
    class="mljr-theme-toggle-segmented {className}"
    data-size={size}
    role="radiogroup"
    aria-label="Theme selection"
  >
    {#each themes as { value, icon, label }}
      <button
        type="button"
        class="mljr-theme-toggle-segmented-btn"
        class:active={themeStore.theme === value}
        onclick={() => handleThemeChange(value)}
        role="radio"
        aria-checked={themeStore.theme === value}
        title={label}
      >
        <Icon icon={icon} size={iconSize} />
        {#if showLabels}
          <span class="mljr-theme-toggle-label">{label}</span>
        {/if}
      </button>
    {/each}
  </div>
{:else if variant === 'simple'}
  <!-- Simple Toggle Button -->
  <button
    type="button"
    class="mljr-theme-toggle-simple {className}"
    data-size={size}
    onclick={() => themeStore.toggleTheme()}
    aria-label={themeStore.isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    title={themeStore.isDark ? 'Switch to light mode' : 'Switch to dark mode'}
  >
    {#if themeStore.isDark}
      <Icon icon="ph:sun-duotone" size={iconSize} />
    {:else}
      <Icon icon="ph:moon-duotone" size={iconSize} />
    {/if}
    {#if showLabels}
      <span class="mljr-theme-toggle-label">
        {themeStore.isDark ? 'Light' : 'Dark'}
      </span>
    {/if}
  </button>
{:else}
  <!-- Default Dropdown Style -->
  <div class="mljr-theme-toggle {className}" data-size={size}>
    <button
      type="button"
      class="mljr-theme-toggle-btn"
      aria-label="Toggle theme"
      onclick={() => themeStore.toggleTheme()}
    >
      {#if themeStore.theme === 'light'}
        <Icon icon="ph:sun-duotone" size={iconSize} />
      {:else if themeStore.theme === 'dark'}
        <Icon icon="ph:moon-duotone" size={iconSize} />
      {:else}
        <Icon icon="ph:monitor-duotone" size={iconSize} />
      {/if}
      {#if showLabels}
        <span class="mljr-theme-toggle-label">
          {themes.find(t => t.value === themeStore.theme)?.label}
        </span>
      {/if}
    </button>
    
    <div class="mljr-theme-toggle-menu">
      {#each themes as { value, icon, label }}
        <button
          type="button"
          class="mljr-theme-toggle-option"
          class:active={themeStore.theme === value}
          onclick={() => handleThemeChange(value)}
        >
          <Icon icon={icon} size={18} />
          <span>{label}</span>
          {#if themeStore.theme === value}
            <Icon icon="ph:check-bold" size={14} class="mljr-theme-toggle-check" />
          {/if}
        </button>
      {/each}
    </div>
  </div>
{/if}

<style>
  /* Segmented Control */
  .mljr-theme-toggle-segmented {
    display: inline-flex;
    align-items: center;
    padding: var(--mljr-space-1);
    background: var(--mljr-bg-secondary);
    border-radius: var(--mljr-radius-full);
    box-shadow: var(--mljr-clay-inset-sm);
    gap: var(--mljr-space-1);
  }

  .mljr-theme-toggle-segmented-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--mljr-space-2);
    padding: var(--mljr-space-2) var(--mljr-space-3);
    background: transparent;
    border: none;
    border-radius: var(--mljr-radius-full);
    color: var(--mljr-text-secondary);
    cursor: pointer;
    transition: all var(--mljr-transition-fast);
    font-size: var(--mljr-text-sm);
    font-weight: 500;
  }

  .mljr-theme-toggle-segmented-btn:hover {
    color: var(--mljr-text);
    background: var(--mljr-bg);
  }

  .mljr-theme-toggle-segmented-btn.active {
    color: var(--mljr-primary-600);
    background: var(--mljr-bg);
    box-shadow: var(--mljr-clay-shadow-xs);
  }

  .mljr-theme-toggle-segmented[data-size="sm"] .mljr-theme-toggle-segmented-btn {
    padding: var(--mljr-space-1) var(--mljr-space-2);
  }

  .mljr-theme-toggle-segmented[data-size="lg"] .mljr-theme-toggle-segmented-btn {
    padding: var(--mljr-space-3) var(--mljr-space-4);
  }

  /* Simple Toggle */
  .mljr-theme-toggle-simple {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--mljr-space-2);
    padding: var(--mljr-space-2);
    background: var(--mljr-bg-secondary);
    border: none;
    border-radius: var(--mljr-radius-full);
    color: var(--mljr-text);
    cursor: pointer;
    box-shadow: var(--mljr-clay-btn);
    transition: all var(--mljr-transition-fast);
  }

  .mljr-theme-toggle-simple:hover {
    transform: translateY(-2px);
    box-shadow: var(--mljr-clay-shadow);
  }

  .mljr-theme-toggle-simple:active {
    transform: translateY(0);
    box-shadow: var(--mljr-clay-btn-pressed);
  }

  .mljr-theme-toggle-simple[data-size="sm"] {
    padding: var(--mljr-space-1);
  }

  .mljr-theme-toggle-simple[data-size="lg"] {
    padding: var(--mljr-space-3);
  }

  /* Default Dropdown */
  .mljr-theme-toggle {
    position: relative;
    display: inline-block;
  }

  .mljr-theme-toggle-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--mljr-space-2);
    padding: var(--mljr-space-2);
    background: var(--mljr-bg-secondary);
    border: none;
    border-radius: var(--mljr-radius-full);
    color: var(--mljr-text);
    cursor: pointer;
    box-shadow: var(--mljr-clay-btn);
    transition: all var(--mljr-transition-fast);
  }

  .mljr-theme-toggle-btn:hover {
    transform: translateY(-2px);
    box-shadow: var(--mljr-clay-shadow);
  }

  .mljr-theme-toggle[data-size="sm"] .mljr-theme-toggle-btn {
    padding: var(--mljr-space-1);
  }

  .mljr-theme-toggle[data-size="lg"] .mljr-theme-toggle-btn {
    padding: var(--mljr-space-3);
  }

  .mljr-theme-toggle-menu {
    position: absolute;
    top: calc(100% + var(--mljr-space-2));
    right: 0;
    min-width: 160px;
    padding: var(--mljr-space-2);
    background: var(--mljr-bg);
    border-radius: var(--mljr-radius-xl);
    box-shadow: var(--mljr-clay-shadow-lg);
    opacity: 0;
    visibility: hidden;
    transform: translateY(-8px);
    transition: all var(--mljr-transition-fast);
    z-index: 100;
  }

  .mljr-theme-toggle:hover .mljr-theme-toggle-menu,
  .mljr-theme:focus-within .mljr-theme-toggle-menu {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  .mljr-theme-toggle-option {
    display: flex;
    align-items: center;
    gap: var(--mljr-space-3);
    width: 100%;
    padding: var(--mljr-space-3) var(--mljr-space-4);
    background: transparent;
    border: none;
    border-radius: var(--mljr-radius-lg);
    color: var(--mljr-text-secondary);
    cursor: pointer;
    font-size: var(--mljr-text-sm);
    font-weight: 500;
    text-align: left;
    transition: all var(--mljr-transition-fast);
  }

  .mljr-theme-toggle-option:hover {
    color: var(--mljr-text);
    background: var(--mljr-bg-secondary);
    transform: translateX(4px);
  }

  .mljr-theme-toggle-option.active {
    color: var(--mljr-primary-600);
    background: var(--mljr-primary-100);
  }

  .mljr-theme-toggle-check {
    margin-left: auto;
    color: var(--mljr-primary-500);
  }

  /* Labels */
  .mljr-theme-toggle-label {
    font-size: var(--mljr-text-sm);
    font-weight: 500;
  }

  /* Dark Mode */
  :global([data-theme="dark"]) .mljr-theme-toggle-segmented,
  :global(.dark) .mljr-theme-toggle-segmented {
    background: var(--mljr-bg-tertiary);
  }

  :global([data-theme="dark"]) .mljr-theme-toggle-segmented-btn.active,
  :global(.dark) .mljr-theme-toggle-segmented-btn.active {
    background: var(--mljr-bg-secondary);
  }

  :global([data-theme="dark"]) .mljr-theme-toggle-simple,
  :global(.dark) .mljr-theme-toggle-simple,
  :global([data-theme="dark"]) .mljr-theme-toggle-btn,
  :global(.dark) .mljr-theme-toggle-btn {
    background: var(--mljr-bg-tertiary);
  }

  :global([data-theme="dark"]) .mljr-theme-toggle-menu,
  :global(.dark) .mljr-theme-toggle-menu {
    background: var(--mljr-bg-secondary);
  }

  :global([data-theme="dark"]) .mljr-theme-toggle-option:hover,
  :global(.dark) .mljr-theme-toggle-option:hover {
    background: var(--mljr-bg-tertiary);
  }
</style>
