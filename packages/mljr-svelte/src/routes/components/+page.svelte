<script lang="ts">
  import { Card } from '$lib';

  const categories = [
    {
      name: 'Forms',
      href: '/components/forms',
      description: 'Input fields, selects, checkboxes, radio, time picker, pin input, autocomplete',
      count: 12,
    },
    {
      name: 'Buttons & Chips',
      href: '/components/buttons',
      description: 'Buttons with clay shadows, chip tags, and copy button',
      count: 3,
    },
    {
      name: 'Data Display',
      href: '/components/data',
      description: 'Cards, tables, stats, tree view, stepper, and data charts',
      count: 4,
    },
    {
      name: 'Feedback & Display',
      href: '/components/feedback',
      description: 'Alerts, toasts, badges, tooltips, progress, skeleton, carousel, countdown',
      count: 8,
    },
    {
      name: 'Overlays',
      href: '/components/overlays',
      description: 'Modals, drawers, popovers, dropdowns, and tooltips',
      count: 3,
    },
    {
      name: 'Navigation',
      href: '/components/navigation',
      description: 'Navbar, tabs, breadcrumbs, navigation rail, dock, and unified nav',
      count: 5,
    },
    {
      name: 'Layout',
      href: '/components/layout',
      description: 'Container, grid, sidebar, background, gradients, hero, and footer',
      count: 6,
    },
    {
      name: 'Media',
      href: '/components/media',
      description: 'Marquee, image compare, audio/video player, drop zone, scroll reveal, lazy load',
      count: 7,
    },
    {
      name: 'Text & Content',
      href: '/components/text',
      description: 'Icons, animated headlines, table of content, and diff viewer',
      count: 4,
    },
    {
      name: 'Integration',
      href: '/components/integration',
      description: 'Rich text editor, map embed, PDF viewer, Turnstile, cookie banner, legal pages',
      count: 6,
    },
  ];

  const totalCount = categories.reduce((sum, cat) => sum + cat.count, 0);
</script>

<svelte:head>
  <title>Components - MLJR CSS</title>
</svelte:head>

<div class="components-index">
  <div class="mljr-mb-8">
    <h1 class="mljr-text-4xl mljr-font-bold mljr-mb-4">Component Library</h1>
    <p class="mljr-text-lg mljr-text-muted">
      Browse our collection of {totalCount}+ beautifully designed Svelte 5 components
      with claymorphism styling.
    </p>
  </div>

  <div class="mljr-grid mljr-grid-cols-1 mljr-md:grid-cols-2 mljr-lg:grid-cols-3 mljr-gap-6">
    {#each categories as category}
      <a href={category.href} class="category-link">
        <Card title={category.name} description={category.description} interactive shadow>
          <div class="category-count">
            <span class="count-badge">{category.count}</span>
            <span class="count-label">sections</span>
          </div>
        </Card>
      </a>
    {/each}
  </div>
</div>

<style>
  .components-index {
    max-width: 1200px;
    margin: 0 auto;
    padding: var(--mljr-space-8) var(--mljr-space-4);
  }

  .category-link {
    text-decoration: none;
    display: block;
    transition: transform var(--mljr-transition-fast);
  }

  .category-link:hover {
    transform: translateY(-4px);
  }

  .category-count {
    display: flex;
    align-items: baseline;
    gap: var(--mljr-space-2);
    margin-top: var(--mljr-space-4);
  }

  .count-badge {
    font-size: var(--mljr-text-2xl);
    font-weight: 700;
    color: var(--mljr-primary-600);
  }

  .count-label {
    font-size: var(--mljr-text-sm);
    color: var(--mljr-text-secondary);
  }
</style>
