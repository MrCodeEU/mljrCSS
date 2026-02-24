<script lang="ts">
  import type { Snippet } from 'svelte';
  import '../app.css';
  import { Footer, Background, UnifiedNav, LanguageToggle, ThemeToggle, setLocale, locales, themeStore } from '$lib';
  import * as m from '$lib/paraglide/messages';
  import { onMount } from 'svelte';

  interface Props {
    children?: Snippet;
  }
  
  let { children }: Props = $props();

  let sidebarOpen = $state(true);
  let isMobile = $state(false);

  // Initialize theme and language on mount
  onMount(() => {
    const savedTheme = document.cookie.match(/theme=(dark|light|system)/)?.[1] as 'dark' | 'light' | 'system' | undefined;
    themeStore.initialize(savedTheme);

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

  let categories = $derived([
    { id: 'forms', name: m.nav_forms(), items: [
      { id: 'forms', label: m.nav_input_select(), href: '/components/forms#forms' },
      { id: 'textarea', label: m.section_textarea(), href: '/components/forms#textarea' },
      { id: 'radio', label: m.nav_radio_checkbox(), href: '/components/forms#radio' },
      { id: 'file-upload', label: m.section_file_upload(), href: '/components/forms#file-upload' },
      { id: 'advanced-inputs', label: m.section_advanced_inputs(), href: '/components/forms#advanced-inputs' },
      { id: 'time-picker', label: m.nav_time_picker(), href: '/components/forms#time-picker' },
      { id: 'pin-input', label: m.nav_pin_input(), href: '/components/forms#pin-input' },
      { id: 'new-inputs', label: m.nav_phone_date_color(), href: '/components/forms#new-inputs' },
      { id: 'chip-input', label: m.nav_chip_input(), href: '/components/forms#chip-input' },
      { id: 'autocomplete', label: m.nav_autocomplete(), href: '/components/forms#autocomplete' },
    ]},
    { id: 'buttons', name: m.nav_buttons_chips(), items: [
      { id: 'buttons', label: m.nav_buttons(), href: '/components/buttons#buttons' },
      { id: 'chip', label: m.nav_chip(), href: '/components/buttons#chip' },
      { id: 'copy-button', label: m.nav_copy_button(), href: '/components/buttons#copy-button' },
    ]},
    { id: 'data', name: m.nav_data_display(), items: [
      { id: 'data', label: m.nav_card_table_stats(), href: '/components/data#data' },
      { id: 'tree-view', label: m.nav_tree_view(), href: '/components/data#tree-view' },
      { id: 'stepper', label: m.section_stepper(), href: '/components/data#stepper' },
      { id: 'data-graphs', label: m.nav_charts_graphs(), href: '/components/data#data-graphs' },
    ]},
    { id: 'feedback', name: m.nav_feedback_display(), items: [
      { id: 'feedback', label: m.nav_alert_toast_spinner(), href: '/components/feedback#feedback' },
      { id: 'display-components', label: m.nav_badges_tooltip(), href: '/components/feedback#display-components' },
      { id: 'empty-state', label: m.nav_empty_state(), href: '/components/feedback#empty-state' },
      { id: 'carousel', label: m.section_carousel(), href: '/components/feedback#carousel' },
      { id: 'swap', label: m.nav_swap(), href: '/components/feedback#swap' },
      { id: 'countdown', label: m.nav_countdown(), href: '/components/feedback#countdown' },
    ]},
    { id: 'overlays', name: m.nav_overlays(), items: [
      { id: 'modal', label: m.nav_modal(), href: '/components/overlays#modal' },
      { id: 'drawer', label: m.nav_drawer(), href: '/components/overlays#drawer' },
      { id: 'popover', label: m.nav_popover_dropdown(), href: '/components/overlays#additional-components' },
    ]},
    { id: 'navigation', name: m.nav_navigation(), items: [
      { id: 'navbar', label: m.nav_navbar(), href: '/components/navigation#navbar-section' },
      { id: 'tabs', label: m.nav_tabs_breadcrumb(), href: '/components/navigation#navigation' },
      { id: 'navigation-rail', label: m.nav_navigation_rail(), href: '/components/navigation#navigation-rail' },
      { id: 'dock', label: m.nav_dock(), href: '/components/navigation#dock' },
      { id: 'unified-nav', label: m.nav_unified_nav(), href: '/components/navigation#unified-nav-section' },
    ]},
    { id: 'layout', name: m.nav_layout(), items: [
      { id: 'layout', label: m.nav_container_grid(), href: '/components/layout#layout' },
      { id: 'sidebar', label: m.nav_sidebar(), href: '/components/layout#sidebar-section' },
      { id: 'background', label: m.nav_background(), href: '/components/layout#background-section' },
      { id: 'gradients', label: m.nav_gradients(), href: '/components/layout#gradients' },
      { id: 'footer', label: m.nav_footer(), href: '/components/layout#footer-section' },
      { id: 'hero', label: m.nav_hero_section(), href: '/components/layout#hero' },
    ]},
    { id: 'media', name: m.nav_media(), items: [
      { id: 'marquee', label: m.nav_marquee(), href: '/components/media#marquee' },
      { id: 'image-compare', label: m.nav_image_compare(), href: '/components/media#image-compare' },
      { id: 'audio-visualizer', label: m.nav_audio_visualizer(), href: '/components/media#audio-visualizer' },
      { id: 'video-player', label: m.nav_video_player(), href: '/components/media#video-player' },
      { id: 'drop-zone', label: m.nav_drop_zone(), href: '/components/media#drop-zone' },
      { id: 'scroll-reveal', label: m.nav_scroll_reveal(), href: '/components/media#scroll-reveal' },
      { id: 'lazy-load', label: m.nav_lazy_load(), href: '/components/media#lazy-load' },
    ]},
    { id: 'text', name: m.nav_text(), items: [
      { id: 'icons', label: m.nav_icons(), href: '/components/text#icons' },
      { id: 'animated-headline', label: m.nav_animated_headline(), href: '/components/text#animated-headline' },
      { id: 'table-of-content', label: m.nav_table_of_content(), href: '/components/text#table-of-content' },
      { id: 'diff-viewer', label: m.nav_diff_viewer(), href: '/components/text#diff-viewer' },
    ]},
    { id: 'integration', name: m.nav_integration(), items: [
      { id: 'rich-text-editor', label: m.nav_rich_text_editor(), href: '/components/integration#rich-text-editor' },
      { id: 'map-embed', label: m.nav_map_embed(), href: '/components/integration#map-embed' },
      { id: 'pdf-viewer', label: m.nav_pdf_viewer(), href: '/components/integration#pdf-viewer' },
      { id: 'turnstile', label: m.nav_turnstile(), href: '/components/integration#turnstile' },
      { id: 'cookie-banner', label: m.nav_cookie_banner(), href: '/components/integration#cookie-banner' },
      { id: 'legal-pages', label: m.nav_legal_pages(), href: '/components/integration#legal-pages' },
    ]},
  ]);

  let topLinks = $derived([
    { label: m.nav_home(), href: '/' },
    { label: m.nav_components(), href: '/components' },
    { label: m.nav_tester(), href: '/components/tester' },
  ]);
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
    <ThemeToggle variant="simple" size="md" />
    <LanguageToggle />
  {/snippet}
</UnifiedNav>

<!-- Main Content -->
<main class="docs-main" data-sidebar-open={sidebarOpen} data-is-mobile={isMobile}>
  {@render children?.()}
</main>

  <Footer
    description={m.footer_description()}
    copyright={m.footer_copyright()}
    sections={[
      {
        title: m.footer_documentation(),
        links: [
          { label: m.footer_getting_started(), href: '#' },
          { label: m.footer_components(), href: '#' },
          { label: m.footer_examples(), href: '#' },
        ]
      },
      {
        title: m.footer_resources(),
        links: [
          { label: m.footer_github(), href: 'https://github.com', external: true },
          { label: m.footer_npm(), href: 'https://npmjs.com', external: true },
        ]
      },
      {
        title: m.footer_community(),
        links: [
          { label: m.footer_discord(), href: '#', external: true },
          { label: m.footer_twitter(), href: '#', external: true },
        ]
      },
    ]}
  />

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

  /* Shared docs layout styles (used across all category route pages) */
  :global(.docs-content) {
    max-width: 100%;
  }

  :global(.docs-sections) {
    display: flex;
    flex-direction: column;
    gap: var(--mljr-space-12);
    margin-top: var(--mljr-space-8);
  }

  :global(.docs-section) {
    scroll-margin-top: 2rem;
  }

  :global(.docs-section-title) {
    font-size: var(--mljr-text-3xl);
    font-weight: 700;
    color: var(--mljr-text);
    margin-bottom: var(--mljr-space-6);
    padding-bottom: var(--mljr-space-3);
    border-bottom: 2px solid var(--mljr-border);
  }

  @media (max-width: 768px) {
    :global(.docs-section-title) {
      font-size: var(--mljr-text-2xl);
    }
  }

  /* Card wrapper for section content on docs pages */
  :global(.docs-section-body) {
    background: var(--mljr-bg-secondary);
    border-radius: var(--mljr-radius-xl);
    padding: var(--mljr-space-6);
    box-shadow: var(--mljr-clay-shadow);
  }

  @media (max-width: 768px) {
    :global(.docs-section-body) {
      padding: var(--mljr-space-4);
      border-radius: var(--mljr-radius-lg);
    }
  }
</style>
