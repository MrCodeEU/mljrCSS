<script lang="ts">
  import type { Snippet } from 'svelte';

  interface NavItem {
    id: string;
    label: string;
    href?: string;
    active?: boolean;
  }

  interface NavCategory {
    id: string;
    name: string;
    items: NavItem[];
  }

  interface Props {
    categories: NavCategory[];
    open?: boolean;
    showOverlay?: boolean;
    logo?: Snippet;
    headerActions?: Snippet;
    onToggle?: () => void;
  }

  let {
    categories,
    open = $bindable(true),
    showOverlay = false,
    logo,
    headerActions,
    onToggle
  }: Props = $props();

  function toggle() {
    open = !open;
    onToggle?.();
  }

  function handleNavClick() {
    if (showOverlay) {
      open = false;
    }
  }
</script>

<!-- Overlay for mobile -->
{#if showOverlay}
  <div 
    class="mljr-sidebar-overlay" 
    data-visible={open}
    onclick={toggle}
    role="presentation"
    aria-hidden="true"
  ></div>
{/if}

<!-- Open button (shown when collapsed) -->
{#if !open}
  <button 
    type="button"
    class="mljr-sidebar-open-btn"
    onclick={toggle}
    aria-label="Open sidebar"
    aria-expanded="false"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <line x1="3" y1="12" x2="21" y2="12"/>
      <line x1="3" y1="6" x2="21" y2="6"/>
      <line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  </button>
{/if}

<!-- Sidebar -->
<aside 
  class="mljr-sidebar"
  data-collapsed={!open}
  aria-hidden={!open}
>
  <!-- Header -->
  <div class="mljr-sidebar-header">
    {#if logo}
      {@render logo()}
    {/if}
    
    <div class="mljr-flex mljr-gap-2">
      {#if headerActions}
        {@render headerActions()}
      {/if}
      
      <button 
        type="button"
        class="mljr-sidebar-close"
        onclick={toggle}
        aria-label="Close sidebar"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
      </button>
    </div>
  </div>

  <!-- Navigation -->
  <nav class="mljr-sidebar-nav">
    {#each categories as category}
      <div class="mljr-sidebar-category">
        <h3 class="mljr-sidebar-category-title">{category.name}</h3>
        <ul class="mljr-sidebar-list">
          {#each category.items as item}
            <li>
              <a 
                href={item.href || '#'}
                class="mljr-sidebar-link"
                class:mljr-sidebar-link-active={item.active}
                onclick={handleNavClick}
              >
                {item.label}
              </a>
            </li>
          {/each}
        </ul>
      </div>
    {/each}
  </nav>
</aside>
