<script lang="ts">
  import type { Snippet } from 'svelte';

  export interface ContextMenuItem {
    label?: string;
    icon?: string;
    shortcut?: string;
    disabled?: boolean;
    danger?: boolean;
    divider?: boolean;
    onClick?: () => void;
  }

  interface Props {
    items: ContextMenuItem[];
    children?: Snippet;
    class?: string;
  }

  let {
    items,
    children,
    class: className = '',
  }: Props = $props();

  let open = $state(false);
  let x = $state(0);
  let y = $state(0);
  let menuEl: HTMLElement | undefined = $state();

  function showMenu(event: MouseEvent) {
    event.preventDefault();

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Estimate menu size (approximate)
    const menuWidth = 210;
    const menuHeight = items.length * 36 + 16;

    x = Math.min(event.clientX, vw - menuWidth - 8);
    y = Math.min(event.clientY, vh - menuHeight - 8);

    open = true;
  }

  function closeMenu() {
    open = false;
  }

  function handleItemClick(item: ContextMenuItem) {
    if (item.disabled) return;
    item.onClick?.();
    closeMenu();
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      closeMenu();
    }
  }

  $effect(() => {
    if (open) {
      setTimeout(() => {
        document.addEventListener('click', closeMenu);
        document.addEventListener('contextmenu', closeMenu);
        document.addEventListener('keydown', handleKeydown);
      }, 0);
      return () => {
        document.removeEventListener('click', closeMenu);
        document.removeEventListener('contextmenu', closeMenu);
        document.removeEventListener('keydown', handleKeydown);
      };
    }
  });
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class="mljr-context-menu-trigger {className}"
  oncontextmenu={showMenu}
>
  {@render children?.()}
</div>

{#if open}
  <div
    class="mljr-context-menu"
    style="top: {y}px; left: {x}px;"
    role="menu"
    tabindex="-1"
    bind:this={menuEl}
    onclick={(e) => e.stopPropagation()}
    onkeydown={(e) => { if (e.key === 'Escape') closeMenu(); }}
  >
    {#each items as item}
      {#if item.divider}
        <div class="mljr-context-menu-divider" role="separator"></div>
      {:else}
        <button
          class="mljr-context-menu-item {item.danger ? 'mljr-context-menu-item-danger' : ''} {item.disabled ? 'mljr-context-menu-item-disabled' : ''}"
          onclick={() => handleItemClick(item)}
          disabled={item.disabled}
          role="menuitem"
          type="button"
        >
          {#if item.icon}
            <span class="mljr-context-menu-item-icon" aria-hidden="true">{item.icon}</span>
          {/if}
          <span class="mljr-context-menu-item-label">{item.label}</span>
          {#if item.shortcut}
            <span class="mljr-context-menu-item-shortcut">{item.shortcut}</span>
          {/if}
        </button>
      {/if}
    {/each}
  </div>
{/if}
