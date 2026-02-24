<script module lang="ts">
  export interface MenuItem {
    /** Menu item label */
    label: string;
    /** Menu item icon (Iconify name) */
    icon?: string;
    /** URL/href for the menu item */
    href?: string;
    /** Click handler */
    onclick?: () => void;
    /** Active state */
    active?: boolean;
    /** Disabled state */
    disabled?: boolean;
    /** Badge text */
    badge?: string;
    /** Submenu items */
    submenu?: MenuItem[];
  }
</script>

<script lang="ts">
  import type { Snippet } from 'svelte';

  type MenuOrientation = 'vertical' | 'horizontal';
  type MenuSize = 'sm' | 'md' | 'lg';

  interface Props {
    /** Menu items */
    items?: MenuItem[];
    /** Menu orientation */
    orientation?: MenuOrientation;
    /** Menu size */
    size?: MenuSize;
    /** Collapsible groups */
    collapsible?: boolean;
    /** Additional CSS class */
    class?: string;
    /** Custom menu content */
    children?: Snippet;
  }

  let {
    items = [],
    orientation = 'vertical',
    size = 'md',
    collapsible = true,
    class: className = '',
    children,
  }: Props = $props();

  let expandedItems = $state<Set<number>>(new Set());

  function toggleSubmenu(index: number) {
    if (!collapsible) return;

    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    expandedItems = newExpanded;
  }

  function handleItemClick(item: MenuItem, event: MouseEvent) {
    if (item.disabled) {
      event.preventDefault();
      return;
    }

    if (item.onclick) {
      event.preventDefault();
      item.onclick();
    }
  }

  const orientationClasses: Record<MenuOrientation, string> = {
    vertical: 'mljr-menu-vertical',
    horizontal: 'mljr-menu-horizontal',
  };

  const sizeClasses: Record<MenuSize, string> = {
    sm: 'mljr-menu-sm',
    md: '',
    lg: 'mljr-menu-lg',
  };

  let menuClasses = $derived(
    ['mljr-menu', orientationClasses[orientation], sizeClasses[size], className]
      .filter(Boolean)
      .join(' ')
  );
</script>

<nav class={menuClasses}>
  {#if children}
    {@render children()}
  {:else}
    <ul class="mljr-menu-list">
      {#each items as item, index}
        <li class="mljr-menu-item" class:mljr-menu-item-disabled={item.disabled}>
          {#if item.submenu && item.submenu.length > 0}
            <!-- Item with submenu -->
            <button
              class="mljr-menu-link mljr-menu-submenu-trigger"
              class:mljr-menu-link-active={item.active}
              onclick={() => toggleSubmenu(index)}
              disabled={item.disabled}
              type="button"
            >
              {#if item.icon}
                <span class="mljr-menu-icon iconify" data-icon={item.icon}></span>
              {/if}
              <span class="mljr-menu-label">{item.label}</span>
              {#if item.badge}
                <span class="mljr-badge mljr-badge-sm mljr-badge-primary">{item.badge}</span>
              {/if}
              <span class="mljr-menu-chevron" class:mljr-menu-chevron-expanded={expandedItems.has(index)}>
                <span class="iconify" data-icon="lucide:chevron-down"></span>
              </span>
            </button>

            {#if expandedItems.has(index)}
              <ul class="mljr-menu-submenu">
                {#each item.submenu as subitem}
                  <li class="mljr-menu-item" class:mljr-menu-item-disabled={subitem.disabled}>
                    {#if subitem.href}
                      <a
                        href={subitem.href}
                        class="mljr-menu-link"
                        class:mljr-menu-link-active={subitem.active}
                        onclick={(e) => handleItemClick(subitem, e)}
                        aria-disabled={subitem.disabled}
                      >
                        {#if subitem.icon}
                          <span class="mljr-menu-icon iconify" data-icon={subitem.icon}></span>
                        {/if}
                        <span class="mljr-menu-label">{subitem.label}</span>
                        {#if subitem.badge}
                          <span class="mljr-badge mljr-badge-sm mljr-badge-primary">{subitem.badge}</span>
                        {/if}
                      </a>
                    {:else}
                      <button
                        class="mljr-menu-link"
                        class:mljr-menu-link-active={subitem.active}
                        onclick={(e) => handleItemClick(subitem, e)}
                        disabled={subitem.disabled}
                        type="button"
                      >
                        {#if subitem.icon}
                          <span class="mljr-menu-icon iconify" data-icon={subitem.icon}></span>
                        {/if}
                        <span class="mljr-menu-label">{subitem.label}</span>
                        {#if subitem.badge}
                          <span class="mljr-badge mljr-badge-sm mljr-badge-primary">{subitem.badge}</span>
                        {/if}
                      </button>
                    {/if}
                  </li>
                {/each}
              </ul>
            {/if}
          {:else}
            <!-- Regular item -->
            {#if item.href}
              <a
                href={item.href}
                class="mljr-menu-link"
                class:mljr-menu-link-active={item.active}
                onclick={(e) => handleItemClick(item, e)}
                aria-disabled={item.disabled}
              >
                {#if item.icon}
                  <span class="mljr-menu-icon iconify" data-icon={item.icon}></span>
                {/if}
                <span class="mljr-menu-label">{item.label}</span>
                {#if item.badge}
                  <span class="mljr-badge mljr-badge-sm mljr-badge-primary">{item.badge}</span>
                {/if}
              </a>
            {:else}
              <button
                class="mljr-menu-link"
                class:mljr-menu-link-active={item.active}
                onclick={(e) => handleItemClick(item, e)}
                disabled={item.disabled}
                type="button"
              >
                {#if item.icon}
                  <span class="mljr-menu-icon iconify" data-icon={item.icon}></span>
                {/if}
                <span class="mljr-menu-label">{item.label}</span>
                {#if item.badge}
                  <span class="mljr-badge mljr-badge-sm mljr-badge-primary">{item.badge}</span>
                {/if}
              </button>
            {/if}
          {/if}
        </li>
      {/each}
    </ul>
  {/if}
</nav>

<style>
  .mljr-menu {
    display: flex;
    flex-direction: column;
  }

  .mljr-menu-horizontal {
    flex-direction: row;
  }

  .mljr-menu-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: var(--mljr-space-1);
  }

  .mljr-menu-horizontal .mljr-menu-list {
    flex-direction: row;
    gap: var(--mljr-space-2);
  }

  .mljr-menu-item {
    position: relative;
  }

  .mljr-menu-link {
    display: flex;
    align-items: center;
    gap: var(--mljr-space-3);
    padding: var(--mljr-space-3) var(--mljr-space-4);
    font-size: var(--mljr-text-sm);
    font-weight: 500;
    color: var(--mljr-text);
    text-decoration: none;
    border: none;
    background: transparent;
    border-radius: var(--mljr-radius-lg);
    cursor: pointer;
    transition: all var(--mljr-transition-fast);
    width: 100%;
    text-align: left;
  }

  .mljr-menu-link:hover {
    background: var(--mljr-bg-secondary);
    box-shadow: var(--mljr-clay-shadow-sm);
  }

  .mljr-menu-link-active {
    background: linear-gradient(135deg, var(--mljr-primary-100) 0%, var(--mljr-primary-50) 100%);
    color: var(--mljr-primary-700);
    box-shadow: var(--mljr-clay-shadow-sm);
    font-weight: 600;
  }

  .mljr-menu-item-disabled .mljr-menu-link {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  .mljr-menu-icon {
    flex-shrink: 0;
    width: 1.25rem;
    height: 1.25rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .mljr-menu-label {
    flex: 1;
  }

  .mljr-menu-chevron {
    flex-shrink: 0;
    width: 1rem;
    height: 1rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: transform var(--mljr-transition-fast);
  }

  .mljr-menu-chevron-expanded {
    transform: rotate(180deg);
  }

  .mljr-menu-submenu {
    list-style: none;
    margin: 0;
    padding: 0;
    padding-left: var(--mljr-space-6);
    margin-top: var(--mljr-space-1);
    display: flex;
    flex-direction: column;
    gap: var(--mljr-space-1);
  }

  .mljr-menu-submenu-trigger {
    justify-content: space-between;
  }

  /* Size variants */
  .mljr-menu-sm .mljr-menu-link {
    padding: var(--mljr-space-2) var(--mljr-space-3);
    font-size: var(--mljr-text-xs);
  }

  .mljr-menu-sm .mljr-menu-icon {
    width: 1rem;
    height: 1rem;
  }

  .mljr-menu-lg .mljr-menu-link {
    padding: var(--mljr-space-4) var(--mljr-space-5);
    font-size: var(--mljr-text-base);
  }

  .mljr-menu-lg .mljr-menu-icon {
    width: 1.5rem;
    height: 1.5rem;
  }
</style>
