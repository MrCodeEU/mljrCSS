<script lang="ts">
  import type { Snippet } from 'svelte';
  import { themeStore } from '../stores/theme.svelte';

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

      <!-- Right: Theme Toggle -->
      <div class="nav-topbar-right">
        <button
          type="button"
          class="nav-theme-btn"
          onclick={() => themeStore.toggleTheme()}
          aria-label="Toggle theme"
        >
          {#if themeStore.isDark}
            <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"/>
            </svg>
          {:else}
            <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>
            </svg>
          {/if}
        </button>
        
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
    /* Strong 3D Claymorphism */
    box-shadow:
      10px 10px 30px rgba(0, 0, 0, 0.15),
      6px 6px 15px rgba(0, 0, 0, 0.1),
      -8px -8px 25px rgba(255, 255, 255, 0.9),
      -4px -4px 12px rgba(255, 255, 255, 0.6),
      inset 0 1px 2px rgba(255, 255, 255, 0.8),
      inset 0 -1px 1px rgba(0, 0, 0, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.5);
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
    border: 1px solid rgba(255, 255, 255, 0.4);
    border-radius: var(--mljr-radius-lg);
    color: var(--mljr-text);
    cursor: pointer;
    /* 3D Button Effect */
    box-shadow:
      4px 4px 12px rgba(0, 0, 0, 0.1),
      2px 2px 6px rgba(0, 0, 0, 0.06),
      -3px -3px 10px rgba(255, 255, 255, 0.8),
      -1px -1px 4px rgba(255, 255, 255, 0.5),
      inset 0 1px 1px rgba(255, 255, 255, 0.6);
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .nav-menu-btn:hover {
    transform: translateY(-2px);
    box-shadow:
      6px 6px 16px rgba(0, 0, 0, 0.12),
      3px 3px 8px rgba(0, 0, 0, 0.08),
      -4px -4px 12px rgba(255, 255, 255, 0.9),
      -2px -2px 6px rgba(255, 255, 255, 0.6),
      inset 0 1px 1px rgba(255, 255, 255, 0.6);
  }

  .nav-menu-btn:active {
    transform: translateY(0);
    box-shadow:
      inset 3px 3px 8px rgba(0, 0, 0, 0.1),
      inset -2px -2px 6px rgba(255, 255, 255, 0.5);
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
    border: 1px solid rgba(255, 255, 255, 0.4);
    box-shadow:
      3px 3px 8px rgba(0, 0, 0, 0.08),
      -2px -2px 6px rgba(255, 255, 255, 0.7),
      inset 0 1px 1px rgba(255, 255, 255, 0.5);
    transition: all 0.2s ease;
  }

  .nav-quick-link:hover {
    color: var(--mljr-text);
    transform: translateY(-2px);
    box-shadow:
      5px 5px 12px rgba(0, 0, 0, 0.1),
      -3px -3px 8px rgba(255, 255, 255, 0.8),
      inset 0 1px 1px rgba(255, 255, 255, 0.5);
  }

  /* Right Section: Theme Toggle */
  .nav-topbar-right {
    display: flex;
    align-items: center;
    gap: var(--mljr-space-2);
    flex-shrink: 0;
  }

  .nav-theme-btn {
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
    border: 1px solid rgba(255, 255, 255, 0.4);
    border-radius: var(--mljr-radius-full);
    color: var(--mljr-text);
    cursor: pointer;
    box-shadow:
      4px 4px 12px rgba(0, 0, 0, 0.1),
      2px 2px 6px rgba(0, 0, 0, 0.06),
      -3px -3px 10px rgba(255, 255, 255, 0.8),
      inset 0 1px 1px rgba(255, 255, 255, 0.6);
    transition: all 0.2s ease;
  }

  .nav-theme-btn:hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow:
      6px 6px 16px rgba(0, 0, 0, 0.12),
      3px 3px 8px rgba(0, 0, 0, 0.08),
      -4px -4px 12px rgba(255, 255, 255, 0.9),
      inset 0 1px 1px rgba(255, 255, 255, 0.6);
  }

  .nav-theme-btn:active {
    transform: translateY(0) scale(1);
    box-shadow:
      inset 3px 3px 8px rgba(0, 0, 0, 0.1),
      inset -2px -2px 6px rgba(255, 255, 255, 0.5);
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
    /* Strong 3D Shadow */
    box-shadow:
      12px 12px 35px rgba(0, 0, 0, 0.18),
      8px 8px 20px rgba(0, 0, 0, 0.12),
      -6px -6px 25px rgba(255, 255, 255, 0.9),
      -3px -3px 12px rgba(255, 255, 255, 0.6),
      inset 0 1px 2px rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.5);
    overflow: hidden;
  }

  .nav-sidebar.position-right .nav-sidebar-inner {
    box-shadow:
      -12px 12px 35px rgba(0, 0, 0, 0.18),
      -8px 8px 20px rgba(0, 0, 0, 0.12),
      6px -6px 25px rgba(255, 255, 255, 0.9),
      3px -3px 12px rgba(255, 255, 255, 0.6),
      inset 0 1px 2px rgba(255, 255, 255, 0.8);
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
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: var(--mljr-radius-lg);
    color: var(--mljr-text);
    font-size: var(--mljr-text-xs);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    cursor: pointer;
    box-shadow:
      3px 3px 8px rgba(0, 0, 0, 0.06),
      -2px -2px 6px rgba(255, 255, 255, 0.6),
      inset 0 1px 1px rgba(255, 255, 255, 0.4);
    transition: all 0.2s ease;
  }

  .nav-category-header:hover {
    box-shadow:
      5px 5px 12px rgba(0, 0, 0, 0.08),
      -3px -3px 8px rgba(255, 255, 255, 0.7),
      inset 0 1px 1px rgba(255, 255, 255, 0.4);
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
    border: 1px solid rgba(255, 255, 255, 0.25);
    box-shadow:
      2px 2px 6px rgba(0, 0, 0, 0.05),
      -2px -2px 5px rgba(255, 255, 255, 0.5),
      inset 0 1px 1px rgba(255, 255, 255, 0.3);
    transition: all 0.2s ease;
  }

  .nav-link:hover {
    color: var(--mljr-text);
    transform: translateX(4px);
    box-shadow:
      4px 4px 10px rgba(0, 0, 0, 0.08),
      -2px -2px 6px rgba(255, 255, 255, 0.6),
      inset 0 1px 1px rgba(255, 255, 255, 0.3);
  }

  .nav-link.active {
    background: linear-gradient(
      145deg,
      var(--mljr-primary-100) 0%,
      var(--mljr-primary-200) 100%
    );
    color: var(--mljr-primary-700);
    box-shadow:
      2px 2px 8px rgba(249, 115, 22, 0.15),
      -2px -2px 5px rgba(255, 255, 255, 0.5),
      inset 0 0 0 1px var(--mljr-primary-300);
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
