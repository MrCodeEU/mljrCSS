<script lang="ts">
  import type { Snippet } from 'svelte';
  import { themeStore } from '../../stores/theme.svelte';

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
    isMobile?: boolean;
    position?: 'left' | 'right';
    logo?: Snippet;
    topLinks?: Array<{ label: string; href: string }>;
    headerActions?: Snippet;
  }

  let {
    categories,
    open = $bindable(true),
    isMobile = false,
    position = 'left',
    logo,
    topLinks = [],
    headerActions
  }: Props = $props();

  // Track open categories using a Set for independent toggling
  let openCategories = $state<Set<string>>(new Set());

  function toggleSidebar() {
    open = !open;
  }

  function handleNavClick() {
    if (isMobile) {
      open = false;
    }
  }

  function toggleCategory(categoryId: string) {
    const newOpen = new Set(openCategories);
    if (newOpen.has(categoryId)) {
      newOpen.delete(categoryId);
    } else {
      newOpen.add(categoryId);
    }
    openCategories = newOpen;
  }

  function isCategoryOpen(categoryId: string): boolean {
    return openCategories.has(categoryId);
  }
</script>

<!-- Unified Navigation System -->
<div class="unified-nav" class:position-right={position === 'right'}>
  
  <!-- Top Bar - Always Visible Navbar -->
  <header class="nav-topbar">
    <div class="nav-topbar-inner">
      <!-- Left: Hamburger + Logo -->
      <div class="nav-topbar-left">
        <button
          type="button"
          class="nav-menu-btn"
          onclick={toggleSidebar}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <svg class="menu-icon" class:open={open} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            {#if open}
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            {:else}
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            {/if}
          </svg>
        </button>

        <div class="nav-logo">
          {#if logo}
            {@render logo()}
          {/if}
        </div>
      </div>

      <!-- Center: Quick Links (hidden on mobile) -->
      {#if !isMobile && topLinks.length > 0}
        <nav class="nav-quick-nav">
          {#each topLinks as link}
            <a href={link.href} class="nav-quick-link">{link.label}</a>
          {/each}
        </nav>
      {/if}

      <!-- Right: Actions -->
      <div class="nav-topbar-right">
        {#if headerActions}
          {@render headerActions()}
        {/if}
      </div>
    </div>
  </header>

  <!-- Sidebar Panel - Slides out below navbar -->
  {#if open}
    <aside 
      class="nav-sidebar"
      class:position-right={position === 'right'}
      transition:slide={{ duration: 250, axis: 'x' }}
    >
      <div class="nav-sidebar-inner">
        <!-- Categories Navigation -->
        <nav class="nav-categories">
          {#each categories as category}
            <div class="nav-category" class:active={isCategoryOpen(category.id)}>
              <button
                type="button"
                class="nav-category-header"
                onclick={() => toggleCategory(category.id)}
                aria-expanded={isCategoryOpen(category.id)}
              >
                <span class="nav-category-name">{category.name}</span>
                <svg class="nav-category-arrow" class:open={isCategoryOpen(category.id)} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              
              {#if isCategoryOpen(category.id)}
                <ul class="nav-items" transition:slide={{ duration: 250 }}>
                  {#each category.items as item}
                    <li class="nav-item">
                      <a 
                        href={item.href || '#'} 
                        class="nav-link"
                        class:active={item.active}
                        onclick={handleNavClick}
                      >
                        <span class="nav-link-dot"></span>
                        <span class="nav-link-text">{item.label}</span>
                      </a>
                    </li>
                  {/each}
                </ul>
              {/if}
            </div>
          {/each}
        </nav>
      </div>
    </aside>
  {/if}
</div>

<!-- Mobile Overlay -->
{#if isMobile && open}
  <div
    class="nav-overlay"
    onclick={() => open = false}
    role="presentation"
    aria-hidden="true"
    transition:fade={{ duration: 200 }}
  ></div>
{/if}

<script lang="ts" module>
  import { slide, fade } from 'svelte/transition';
</script>

<style>
  /* Container */
  .unified-nav {
    position: fixed;
    top: var(--mljr-space-4);
    left: var(--mljr-space-4);
    right: var(--mljr-space-4);
    z-index: 100;
    display: flex;
    flex-direction: column;
    gap: var(--mljr-space-3);
    pointer-events: none;
  }

  .unified-nav.position-right {
    left: auto;
    right: var(--mljr-space-4);
    align-items: flex-end;
  }

  .unified-nav > * {
    pointer-events: auto;
  }

  /* Top Bar - The Navbar (Always Visible) */
  .nav-topbar {
    width: 100%;
    max-width: 100%;
  }

  .nav-topbar-inner {
    display: flex;
    align-items: center;
    gap: var(--mljr-space-3);
    padding: var(--mljr-space-2);
    background: linear-gradient(
      145deg,
      var(--mljr-bg) 0%,
      var(--mljr-bg-secondary) 50%,
      var(--mljr-bg-tertiary) 100%
    );
    border-radius: var(--mljr-radius-xl);
    box-shadow: var(--mljr-clay-shadow);
    border: 1px solid var(--mljr-frosted-border);
  }

  /* Left Section: Menu + Logo */
  .nav-topbar-left {
    display: flex;
    align-items: center;
    gap: var(--mljr-space-3);
    flex-shrink: 0;
  }

  /* Menu Button (Hamburger/Close) */
  .nav-menu-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    padding: 0;
    background: linear-gradient(
      145deg,
      var(--mljr-bg) 0%,
      var(--mljr-bg-secondary) 100%
    );
    border: 1px solid var(--mljr-frosted-border);
    border-radius: var(--mljr-radius-lg);
    color: var(--mljr-text);
    cursor: pointer;
    box-shadow: var(--mljr-clay-btn);
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .nav-menu-btn:hover {
    transform: translateY(-2px);
    box-shadow: var(--mljr-clay-shadow);
  }

  .nav-menu-btn:active {
    transform: translateY(0);
    box-shadow: var(--mljr-clay-btn-pressed);
  }

  .menu-icon {
    transition: transform 0.3s ease;
  }

  .menu-icon.open {
    transform: rotate(90deg);
  }

  /* Logo */
  .nav-logo {
    flex-shrink: 0;
  }

  .nav-logo :global(a) {
    display: flex;
    align-items: center;
    gap: var(--mljr-space-2);
    color: var(--mljr-text);
    text-decoration: none;
    font-weight: 700;
    font-size: var(--mljr-text-xl);
  }

  .nav-logo :global(img) {
    height: 2.5rem;
    width: auto;
  }

  /* Quick Navigation (Center) */
  .nav-quick-nav {
    display: flex;
    align-items: center;
    gap: var(--mljr-space-2);
    flex: 1;
    justify-content: center;
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    padding: var(--mljr-space-1);
  }

  .nav-quick-nav::-webkit-scrollbar {
    display: none;
  }

  .nav-quick-link {
    padding: var(--mljr-space-2) var(--mljr-space-4);
    background: linear-gradient(
      145deg,
      var(--mljr-bg) 0%,
      var(--mljr-bg-secondary) 100%
    );
    border-radius: var(--mljr-radius-full);
    color: var(--mljr-text-secondary);
    font-size: var(--mljr-text-sm);
    font-weight: 600;
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    white-space: nowrap;
    border: 1px solid var(--mljr-frosted-border);
    box-shadow: var(--mljr-clay-shadow-xs);
    transition: all 0.2s ease;
  }

  .nav-quick-link:hover {
    color: var(--mljr-text);
    transform: translateY(-2px);
    box-shadow: var(--mljr-clay-shadow-sm);
  }

  /* Right Section: Theme Toggle */
  .nav-topbar-right {
    display: flex;
    align-items: center;
    gap: var(--mljr-space-2);
    flex-shrink: 0;
  }

  /* Sidebar Panel */
  .nav-sidebar {
    position: fixed;
    top: calc(76px + var(--mljr-space-4));
    left: var(--mljr-space-4);
    width: 280px;
    max-height: calc(100vh - 100px);
    z-index: 99;
  }

  .nav-sidebar.position-right {
    left: auto;
    right: var(--mljr-space-4);
  }

  .nav-sidebar-inner {
    background: linear-gradient(
      165deg,
      var(--mljr-bg) 0%,
      var(--mljr-bg-secondary) 50%,
      var(--mljr-bg-tertiary) 100%
    );
    border-radius: var(--mljr-radius-xl);
    box-shadow: var(--mljr-clay-shadow-lg);
    border: 1px solid var(--mljr-frosted-border);
    overflow: hidden;
  }

  /* Categories */
  .nav-categories {
    padding: var(--mljr-space-3);
    max-height: calc(100vh - 120px);
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: var(--mljr-primary-300) transparent;
  }

  .nav-categories::-webkit-scrollbar {
    width: 5px;
  }

  .nav-categories::-webkit-scrollbar-track {
    background: transparent;
  }

  .nav-categories::-webkit-scrollbar-thumb {
    background: var(--mljr-primary-300);
    border-radius: var(--mljr-radius-full);
  }

  .nav-category {
    margin-bottom: var(--mljr-space-2);
    border-radius: var(--mljr-radius-lg);
    overflow: hidden;
  }

  .nav-category.active {
    background: linear-gradient(
      145deg,
      rgba(249, 115, 22, 0.06) 0%,
      rgba(249, 115, 22, 0.02) 100%
    );
  }

  .nav-category-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: var(--mljr-space-3);
    background: linear-gradient(
      145deg,
      var(--mljr-bg) 0%,
      var(--mljr-bg-secondary) 100%
    );
    border: 1px solid var(--mljr-frosted-border);
    border-radius: var(--mljr-radius-lg);
    color: var(--mljr-text);
    font-size: var(--mljr-text-xs);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    cursor: pointer;
    box-shadow: var(--mljr-clay-shadow-xs);
    transition: all 0.2s ease;
  }

  .nav-category-header:hover {
    box-shadow: var(--mljr-clay-shadow-sm);
  }

  .nav-category-arrow {
    transition: transform 0.25s ease;
    color: var(--mljr-text-muted);
  }

  .nav-category-arrow.open {
    transform: rotate(180deg);
  }

  /* Items */
  .nav-items {
    list-style: none;
    margin: var(--mljr-space-1) 0 0 0;
    padding: 0;
    overflow: hidden;
  }

  .nav-item {
    padding: 0 var(--mljr-space-2);
  }

  .nav-link {
    display: flex;
    align-items: center;
    gap: var(--mljr-space-3);
    padding: var(--mljr-space-2) var(--mljr-space-3);
    margin-bottom: var(--mljr-space-1);
    border-radius: var(--mljr-radius-md);
    color: var(--mljr-text-secondary);
    text-decoration: none;
    font-size: var(--mljr-text-sm);
    font-weight: 500;
    background: linear-gradient(
      145deg,
      var(--mljr-bg) 0%,
      var(--mljr-bg-secondary) 100%
    );
    border: 1px solid var(--mljr-frosted-border);
    box-shadow: var(--mljr-clay-shadow-xs);
    transition: all 0.2s ease;
  }

  .nav-link:hover {
    color: var(--mljr-text);
    transform: translateX(4px);
    box-shadow: var(--mljr-clay-shadow-sm);
  }

  .nav-link.active {
    background: var(--mljr-primary-100);
    color: var(--mljr-primary-700);
    box-shadow: var(--mljr-clay-inset-sm);
  }

  .nav-link-dot {
    width: 6px;
    height: 6px;
    border-radius: var(--mljr-radius-full);
    background: var(--mljr-text-muted);
    transition: all 0.2s ease;
    flex-shrink: 0;
  }

  .nav-link:hover .nav-link-dot,
  .nav-link.active .nav-link-dot {
    background: var(--mljr-primary-500);
    box-shadow: 0 0 6px var(--mljr-primary-400);
    transform: scale(1.3);
  }

  .nav-link-text {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* Mobile Overlay */
  .nav-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(6px);
    z-index: 98;
  }

  /* Responsive */
  @media (max-width: 1024px) {
    .unified-nav {
      left: var(--mljr-space-3);
      right: var(--mljr-space-3);
      top: var(--mljr-space-3);
    }

    .nav-sidebar {
      left: var(--mljr-space-3);
      width: 260px;
    }

    .nav-sidebar.position-right {
      right: var(--mljr-space-3);
      left: auto;
    }
  }

  @media (max-width: 768px) {
    .nav-quick-nav {
      display: none;
    }

    .nav-sidebar {
      position: fixed;
      top: 0;
      left: 0;
      width: 280px;
      height: 100vh;
      max-height: 100vh;
      z-index: 101;
    }

    .nav-sidebar-inner {
      height: 100%;
      border-radius: 0 var(--mljr-radius-xl) var(--mljr-radius-xl) 0;
    }

    .nav-sidebar.position-right {
      left: auto;
      right: 0;
    }

    .nav-sidebar.position-right .nav-sidebar-inner {
      border-radius: var(--mljr-radius-xl) 0 0 var(--mljr-radius-xl);
    }

    .nav-categories {
      max-height: calc(100vh - var(--mljr-space-6));
    }
  }
</style>
