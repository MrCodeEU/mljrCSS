<script lang="ts">
  import type { Snippet } from 'svelte';
  import '../app.css';
  import { Footer, Background, UnifiedNav, LanguageToggle, setLocale, locales } from '$lib';
  import { onMount } from 'svelte';

  interface Props {
    children?: Snippet;
  }
  
  let { children }: Props = $props();

  let sidebarOpen = $state(true);
  let isMobile = $state(false);

  // Initialize theme and language on mount
  onMount(() => {
    const theme = document.cookie.match(/theme=(dark|light)/)?.[1];
    if (theme) {
      document.documentElement.setAttribute('data-theme', theme);
    }
    
    // Initialize language from cookie
    const lang = document.cookie.match(/PARAGLIDE_LOCALE=(en|de)/)?.[1];
    if (lang && locales.includes(lang as 'en' | 'de')) {
      setLocale(lang as 'en' | 'de');
    }
  });

  // Check for mobile
  $effect(() => {
    const checkMobile = () => {
      const wasMobile = isMobile;
      isMobile = window.innerWidth <= 1024;
      if (isMobile && !wasMobile) {
        sidebarOpen = false;
      } else if (!isMobile && wasMobile) {
        sidebarOpen = true;
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  });

  const categories = [
    { id: 'background', name: 'Effects', items: [
      { id: 'background', label: 'Background', href: '#background-section' },
      { id: 'gradients', label: 'Gradients', href: '#gradients' },
    ]},
    { id: 'navigation', name: 'Navigation', items: [
      { id: 'navbar', label: 'Navbar', href: '#navbar-section' },
      { id: 'unified-nav', label: 'UnifiedNav', href: '#unified-nav-section' },
      { id: 'tabs', label: 'Tabs', href: '#data' },
      { id: 'breadcrumb', label: 'Breadcrumb', href: '#data' },
      { id: 'pagination', label: 'Pagination', href: '#display-components' },
      { id: 'stepper', label: 'Stepper', href: '#stepper' },
    ]},
    { id: 'layout', name: 'Layout', items: [
      { id: 'layout', label: 'Container & Grid', href: '#layout' },
      { id: 'sidebar', label: 'Sidebar', href: '#sidebar-section' },
      { id: 'footer', label: 'Footer', href: '#footer-section' },
    ]},
    { id: 'forms', name: 'Forms', items: [
      { id: 'forms', label: 'Input & Select', href: '#forms' },
      { id: 'textarea', label: 'Textarea', href: '#textarea' },
      { id: 'password', label: 'Password', href: '#forms' },
      { id: 'checkbox', label: 'Checkbox', href: '#forms' },
      { id: 'radio', label: 'Radio', href: '#radio' },
      { id: 'switch', label: 'Switch', href: '#forms' },
      { id: 'file-upload', label: 'File Upload', href: '#file-upload' },
      { id: 'advanced-inputs', label: 'Advanced Inputs', href: '#advanced-inputs' },
      { id: 'new-inputs', label: 'Phone, Date, Color, Email', href: '#new-inputs' },
    ]},
    { id: 'feedback', name: 'Feedback', items: [
      { id: 'alert', label: 'Alert', href: '#feedback' },
      { id: 'toast', label: 'Toast', href: '#feedback' },
      { id: 'progress', label: 'Progress', href: '#display-components' },
      { id: 'skeleton', label: 'Skeleton', href: '#display-components' },
      { id: 'spinner', label: 'Spinner', href: '#feedback' },
      { id: 'empty-state', label: 'Empty State', href: '#empty-state' },
    ]},
    { id: 'data', name: 'Data Display', items: [
      { id: 'card', label: 'Card', href: '#data' },
      { id: 'table', label: 'Table', href: '#data' },
      { id: 'stats', label: 'Stats', href: '#data' },
      { id: 'avatar', label: 'Avatar', href: '#display-components' },
      { id: 'badge', label: 'Badge', href: '#feedback' },
      { id: 'chip', label: 'Chip', href: '#chip' },
    ]},
    
    { id: 'overlays', name: 'Overlays', items: [
      { id: 'modal', label: 'Modal', href: '#modal' },
      { id: 'popover', label: 'Popover', href: '#additional-components' },
      { id: 'tooltip', label: 'Tooltip', href: '#display-components' },
      { id: 'dropdown', label: 'Dropdown', href: '#additional-components' },
      { id: 'drawer', label: 'Drawer', href: '#drawer' },
    ]},
    { id: 'media', name: 'Media', items: [
      { id: 'carousel', label: 'Carousel', href: '#carousel' },
      { id: 'rating', label: 'Rating', href: '#additional-components' },
    ]},
    { id: 'misc', name: 'Misc', items: [
      { id: 'buttons', label: 'Button', href: '#buttons' },
      { id: 'icons', label: 'Icon', href: '#icons' },
      { id: 'divider', label: 'Divider', href: '#display-components' },
      { id: 'accordion', label: 'Accordion', href: '#data' },
    ]},
  ];

  const topLinks = [
    { label: 'Forms', href: '#forms' },
    { label: 'Buttons', href: '#buttons' },
    { label: 'Data', href: '#data' },
    { label: 'Feedback', href: '#feedback' },
  ];
</script>

<!-- Global Background - Fixed to page -->
<Background pattern="crosses" opacity={0.12} size={24} spacing={16} fixed={true} />

<!-- Unified Navigation - Navbar + Sidebar -->
<UnifiedNav
  {categories}
  {topLinks}
  bind:open={sidebarOpen}
  {isMobile}
  position="left"
>
  {#snippet logo()}
    <a href="/" class="docs-logo">
      <img src="/Logo.png" alt="MLJR" />
      <span class="logo-text">CSS</span>
    </a>
  {/snippet}
  
  {#snippet headerActions()}
    <LanguageToggle />
  {/snippet}
</UnifiedNav>

<!-- Main Content -->
<main class="docs-main" data-sidebar-open={sidebarOpen} data-is-mobile={isMobile}>
  {@render children?.()}
  
  <!-- Page Footer -->
  <Footer
    description="A TailwindCSS-based CSS framework with beautiful claymorphism design."
    copyright="© 2024 MLJR CSS. All rights reserved."
    sections={[
      {
        title: 'Documentation',
        links: [
          { label: 'Getting Started', href: '#' },
          { label: 'Components', href: '#' },
          { label: 'Examples', href: '#' },
        ]
      },
      {
        title: 'Resources',
        links: [
          { label: 'GitHub', href: 'https://github.com', external: true },
          { label: 'npm', href: 'https://npmjs.com', external: true },
        ]
      },
      {
        title: 'Community',
        links: [
          { label: 'Discord', href: '#', external: true },
          { label: 'Twitter', href: '#', external: true },
        ]
      },
    ]}
  />
</main>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
  }

  /* Logo Styles */
  :global(.docs-logo) {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: var(--mljr-text);
    text-decoration: none;
    font-weight: 700;
    font-size: var(--mljr-text-xl);
  }

  :global(.docs-logo img) {
    height: 2.5rem;
    width: auto;
    flex-shrink: 0;
  }

  :global(.logo-text) {
    background: linear-gradient(135deg, var(--mljr-primary-500) 0%, var(--mljr-primary-700) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* Main content area - Accounts for fixed navbar */
  .docs-main {
    margin-top: calc(76px + var(--mljr-space-6)); /* Navbar height + gap */
    margin-left: var(--mljr-space-6);
    margin-right: var(--mljr-space-6);
    margin-bottom: var(--mljr-space-6);
    min-height: calc(100vh - 76px - var(--mljr-space-12));
    transition: margin-left 0.25s ease;
    padding: var(--mljr-space-4);
  }

  /* When sidebar is open, shift content */
  .docs-main[data-sidebar-open="true"] {
    margin-left: calc(280px + var(--mljr-space-6));
  }

  /* Mobile styles */
  @media (max-width: 1024px) {
    .docs-main {
      margin-left: var(--mljr-space-4);
      margin-right: var(--mljr-space-4);
    }

    .docs-main[data-sidebar-open="true"] {
      margin-left: var(--mljr-space-4);
    }
  }

  @media (max-width: 768px) {
    .docs-main {
      margin-top: calc(72px + var(--mljr-space-4));
      padding: var(--mljr-space-3);
    }
  }
</style>
