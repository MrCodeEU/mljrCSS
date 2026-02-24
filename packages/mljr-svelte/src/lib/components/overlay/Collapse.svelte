<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    /** Whether the collapse is open */
    open?: boolean;
    /** Title/trigger text */
    title?: string;
    /** Custom trigger icon (Iconify name) */
    icon?: string;
    /** Disabled state */
    disabled?: boolean;
    /** Additional CSS class */
    class?: string;
    /** Custom trigger content - receives open state as first argument */
    trigger?: Snippet<[boolean]>;
    /** Collapse content */
    children?: Snippet;
    /** Callback when open state changes */
    ontoggle?: (open: boolean) => void;
  }

  let {
    open = $bindable(false),
    title,
    icon = 'lucide:chevron-down',
    disabled = false,
    class: className = '',
    trigger,
    children,
    ontoggle,
  }: Props = $props();

  let contentElement = $state<HTMLDivElement | null>(null);
  let contentHeight = $state(0);

  function toggleOpen() {
    if (disabled) return;

    open = !open;

    if (ontoggle) {
      ontoggle(open);
    }
  }

  $effect(() => {
    if (contentElement) {
      if (open) {
        contentHeight = contentElement.scrollHeight;
      } else {
        contentHeight = 0;
      }
    }
  });
</script>

<div class="mljr-collapse {className}" class:mljr-collapse-open={open} class:mljr-collapse-disabled={disabled}>
  <button
    class="mljr-collapse-trigger"
    onclick={toggleOpen}
    {disabled}
    type="button"
    aria-expanded={open}
  >
    {#if trigger}
      {@render trigger(open)}
    {:else}
      <span class="mljr-collapse-title">{title}</span>
      <span class="mljr-collapse-icon iconify" class:mljr-collapse-icon-rotated={open} data-icon={icon}></span>
    {/if}
  </button>

  <div
    class="mljr-collapse-content-wrapper"
    style="max-height: {contentHeight}px;"
  >
    <div class="mljr-collapse-content" bind:this={contentElement}>
      {#if children}
        {@render children()}
      {/if}
    </div>
  </div>
</div>

<style>
  .mljr-collapse {
    border: 1px solid var(--mljr-border);
    border-radius: var(--mljr-radius-lg);
    background: var(--mljr-bg);
    overflow: hidden;
    transition: all var(--mljr-transition-normal);
  }

  .mljr-collapse-trigger {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--mljr-space-3);
    padding: var(--mljr-space-4) var(--mljr-space-5);
    font-size: var(--mljr-text-base);
    font-weight: 600;
    color: var(--mljr-text);
    background: transparent;
    border: none;
    cursor: pointer;
    text-align: left;
    transition: all var(--mljr-transition-fast);
  }

  .mljr-collapse-trigger:hover {
    background: var(--mljr-bg-secondary);
  }

  .mljr-collapse-open .mljr-collapse-trigger {
    background: var(--mljr-bg-secondary);
    box-shadow: 0 1px 0 0 var(--mljr-border);
  }

  .mljr-collapse-title {
    flex: 1;
  }

  .mljr-collapse-icon {
    flex-shrink: 0;
    width: 1.25rem;
    height: 1.25rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: transform var(--mljr-transition-fast);
    color: var(--mljr-text-muted);
  }

  .mljr-collapse-icon-rotated {
    transform: rotate(180deg);
  }

  .mljr-collapse-content-wrapper {
    overflow: hidden;
    transition: max-height var(--mljr-transition-normal) ease-in-out;
  }

  .mljr-collapse-content {
    padding: var(--mljr-space-5);
    color: var(--mljr-text);
  }

  .mljr-collapse-disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .mljr-collapse-disabled .mljr-collapse-trigger {
    cursor: not-allowed;
    pointer-events: none;
  }

  /* Claymorphism effect when open */
  .mljr-collapse-open {
    box-shadow: var(--mljr-clay-shadow-sm);
  }
</style>
