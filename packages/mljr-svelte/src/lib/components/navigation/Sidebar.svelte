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
    categories?: NavCategory[];
    children?: Snippet;
    open?: boolean;
    showOverlay?: boolean;
    logo?: Snippet;
    headerActions?: Snippet;
    /** Enable search within navigation items */
    showSearch?: boolean;
    /** Search placeholder */
    searchPlaceholder?: string;
    /** Contained mode: use relative positioning for embedding in demos/cards */
    contained?: boolean;
    onToggle?: () => void;
  }

  let {
    categories = [],
    children,
    open = $bindable(true),
    showOverlay = false,
    logo,
    headerActions,
    showSearch = false,
    searchPlaceholder = 'Search...',
    contained = false,
    onToggle
  }: Props = $props();

  let searchQuery = $state('');

  const filteredCategories = $derived(
    !searchQuery
      ? categories
      : categories
          .map(cat => ({
            ...cat,
            items: cat.items.filter(item =>
              item.label.toLowerCase().includes(searchQuery.toLowerCase())
            ),
          }))
          .filter(cat => cat.items.length > 0)
  );

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

<!-- Open button (shown when collapsed, not in contained/demo mode) -->
{#if !open && !contained}
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
  data-contained={contained || undefined}
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

  <!-- Search -->
  {#if showSearch}
    <div class="mljr-sidebar-search">
      <input
        type="search"
        class="mljr-input mljr-input-sm"
        placeholder={searchPlaceholder}
        bind:value={searchQuery}
        aria-label={searchPlaceholder}
      />
    </div>
  {/if}

  <!-- Navigation -->
  <nav class="mljr-sidebar-nav">
    {#if children}
      {@render children()}
    {:else}
    {#each filteredCategories as category}
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
    {/if}
  </nav>
</aside>
