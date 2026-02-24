<script module lang="ts">
  export interface UserMenuItem {
    label: string;
    href?: string;
    icon?: string;
    divider?: boolean;
    onClick?: () => void;
  }
</script>

<script lang="ts">
  import type { Snippet } from 'svelte';
  import Icon from '../layout/Icon.svelte';

  interface NavLink {
    label: string;
    href: string;
    icon?: string;
    active?: boolean;
    external?: boolean;
  }

  interface NavItem extends NavLink {
    children?: NavLink[];
  }

  interface Props {
    /** Logo content slot */
    logo?: Snippet;
    /** Navigation items */
    items?: NavItem[];
    /** Custom navigation snippet (alternative to items array) */
    nav?: Snippet;
    /** Right side actions */
    actions?: Snippet;
    /** Whether to show the mobile menu toggle */
    showMenuToggle?: boolean;
    /** Whether mobile menu is open (bindable) */
    mobileMenuOpen?: boolean;
    /** Variant style */
    variant?: 'default' | 'transparent' | 'sticky';
    /** Whether navbar is fixed to top */
    fixed?: boolean;
    /** Enable search functionality */
    showSearch?: boolean;
    /** Search placeholder text */
    searchPlaceholder?: string;
    /** Search value (bindable) */
    searchValue?: string;
    /** Search callback */
    onSearch?: (value: string) => void;
    /** User menu items */
    userMenu?: UserMenuItem[];
    /** User avatar/name snippet */
    userContent?: Snippet;
    /** Additional CSS class */
    class?: string;
    /** Callback when mobile menu toggles */
    onMenuToggle?: (open: boolean) => void;
  }

  let {
    logo,
    items = [],
    nav,
    actions,
    showMenuToggle = true,
    mobileMenuOpen = $bindable(false),
    variant = 'default',
    fixed = false,
    showSearch = false,
    searchPlaceholder = 'Search...',
    searchValue = $bindable(''),
    onSearch,
    userMenu,
    userContent,
    class: className = '',
    onMenuToggle,
  }: Props = $props();

  let searchOpen = $state(false);
  let userMenuOpen = $state(false);

  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
    onMenuToggle?.(mobileMenuOpen);
  }

  function handleLinkClick() {
    // Close mobile menu when clicking a link
    if (mobileMenuOpen) {
      mobileMenuOpen = false;
      onMenuToggle?.(false);
    }
  }

  function handleSearch(e: Event) {
    const target = e.target as HTMLInputElement;
    searchValue = target.value;
    onSearch?.(target.value);
  }

  function toggleUserMenu() {
    userMenuOpen = !userMenuOpen;
  }

  function handleUserMenuClick(item: UserMenuItem) {
    if (item.onClick) {
      item.onClick();
    }
    userMenuOpen = false;
  }

  // Close user menu when clicking outside
  $effect(() => {
    if (userMenuOpen) {
      setTimeout(() => {
        document.addEventListener('click', handleClickOutside);
      }, 0);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });

  function handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.mljr-navbar-user-menu')) {
      userMenuOpen = false;
    }
  }
</script>

<header 
  class="mljr-navbar {className}"
  class:mljr-navbar-transparent={variant === 'transparent'}
  class:mljr-navbar-sticky={variant === 'sticky'}
  class:mljr-navbar-fixed={fixed}
  data-variant={variant}
>
  <div class="mljr-navbar-container">
    <!-- Left: Logo & Mobile Toggle -->
    <div class="mljr-navbar-start">
      {#if showMenuToggle}
        <button 
          type="button"
          class="mljr-navbar-toggle"
          onclick={toggleMobileMenu}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="navbar-menu"
        >
          {#if mobileMenuOpen}
            <Icon icon="mdi:close" size={24} />
          {:else}
            <Icon icon="mdi:menu" size={24} />
          {/if}
        </button>
      {/if}
      
      {#if logo}
        <div class="mljr-navbar-logo">
          {@render logo()}
        </div>
      {/if}
    </div>

    <!-- Center: Navigation Links (Desktop) -->
    <nav class="mljr-navbar-center" aria-label="Main navigation">
      {#if nav}
        {@render nav()}
      {:else}
      <ul class="mljr-navbar-menu" id="navbar-menu">
        {#each items as item}
          <li class="mljr-navbar-item" class:mljr-navbar-item-has-children={!!item.children}>
            <a 
              href={item.href}
              class="mljr-navbar-link"
              class:mljr-navbar-link-active={item.active}
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noopener noreferrer' : undefined}
              onclick={handleLinkClick}
            >
              {#if item.icon}
                <Icon icon={item.icon} size={18} class="mljr-navbar-link-icon" />
              {/if}
              <span>{item.label}</span>
            </a>
            
            {#if item.children}
              <div class="mljr-navbar-dropdown">
                <ul class="mljr-navbar-dropdown-menu">
                  {#each item.children as child}
                    <li>
                      <a 
                        href={child.href}
                        class="mljr-navbar-dropdown-link"
                        class:mljr-navbar-dropdown-link-active={child.active}
                        target={child.external ? '_blank' : undefined}
                        rel={child.external ? 'noopener noreferrer' : undefined}
                        onclick={handleLinkClick}
                      >
                        {#if child.icon}
                          <Icon icon={child.icon} size={16} />
                        {/if}
                        {child.label}
                      </a>
                    </li>
                  {/each}
                </ul>
              </div>
            {/if}
          </li>
        {/each}
      </ul>
      {/if}
    </nav>

    <!-- Right: Actions -->
    <div class="mljr-navbar-end">
      <!-- Search -->
      {#if showSearch}
        <div class="mljr-navbar-search">
          {#if searchOpen}
            <!-- svelte-ignore a11y_autofocus -->
            <input
              type="search"
              class="mljr-navbar-search-input"
              placeholder={searchPlaceholder}
              value={searchValue}
              oninput={handleSearch}
              autofocus
            />
            <button
              type="button"
              class="mljr-navbar-search-close"
              onclick={() => (searchOpen = false)}
              aria-label="Close search"
            >
              <Icon icon="mdi:close" size={20} />
            </button>
          {:else}
            <button
              type="button"
              class="mljr-navbar-search-btn"
              onclick={() => (searchOpen = true)}
              aria-label="Open search"
            >
              <Icon icon="mdi:magnify" size={20} />
            </button>
          {/if}
        </div>
      {/if}

      <!-- User Menu -->
      {#if userMenu && userMenu.length > 0}
        <div class="mljr-navbar-user-menu">
          <button
            type="button"
            class="mljr-navbar-user-btn"
            onclick={toggleUserMenu}
            aria-label="User menu"
            aria-expanded={userMenuOpen}
          >
            {#if userContent}
              {@render userContent()}
            {:else}
              <Icon icon="mdi:account-circle" size={32} />
            {/if}
          </button>

          {#if userMenuOpen}
            <div class="mljr-navbar-user-dropdown">
              <ul class="mljr-navbar-user-menu-list">
                {#each userMenu as item}
                  {#if item.divider}
                    <li class="mljr-navbar-user-menu-divider"></li>
                  {:else}
                    <li>
                      {#if item.href}
                        <a
                          href={item.href}
                          class="mljr-navbar-user-menu-item"
                          onclick={() => handleUserMenuClick(item)}
                        >
                          {#if item.icon}
                            <Icon icon={item.icon} size={18} />
                          {/if}
                          <span>{item.label}</span>
                        </a>
                      {:else}
                        <button
                          type="button"
                          class="mljr-navbar-user-menu-item"
                          onclick={() => handleUserMenuClick(item)}
                        >
                          {#if item.icon}
                            <Icon icon={item.icon} size={18} />
                          {/if}
                          <span>{item.label}</span>
                        </button>
                      {/if}
                    </li>
                  {/if}
                {/each}
              </ul>
            </div>
          {/if}
        </div>
      {/if}

      <!-- Custom Actions -->
      {#if actions}
        <div class="mljr-navbar-actions">
          {@render actions()}
        </div>
      {/if}
    </div>
  </div>

  <!-- Mobile Menu -->
  {#if mobileMenuOpen}
    <div class="mljr-navbar-mobile" role="dialog" aria-modal="true" aria-label="Mobile navigation">
      <nav class="mljr-navbar-mobile-nav">
        <ul class="mljr-navbar-mobile-menu">
          {#each items as item}
            <li class="mljr-navbar-mobile-item">
              <a 
                href={item.href}
                class="mljr-navbar-mobile-link"
                class:mljr-navbar-mobile-link-active={item.active}
                onclick={handleLinkClick}
              >
                {#if item.icon}
                  <Icon icon={item.icon} size={20} />
                {/if}
                {item.label}
              </a>
              
              {#if item.children}
                <ul class="mljr-navbar-mobile-submenu">
                  {#each item.children as child}
                    <li>
                      <a 
                        href={child.href}
                        class="mljr-navbar-mobile-sublink"
                        class:mljr-navbar-mobile-sublink-active={child.active}
                        onclick={handleLinkClick}
                      >
                        {child.label}
                      </a>
                    </li>
                  {/each}
                </ul>
              {/if}
            </li>
          {/each}
        </ul>
      </nav>
    </div>
  {/if}
</header>
