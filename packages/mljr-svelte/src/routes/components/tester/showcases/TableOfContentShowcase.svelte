<script lang="ts">
  import { TableOfContent } from '$lib';

  const sampleItems = [
    { id: 'intro', text: 'Introduction', level: 2 },
    { id: 'getting-started', text: 'Getting Started', level: 2 },
    { id: 'installation', text: 'Installation', level: 3 },
    { id: 'configuration', text: 'Configuration', level: 3 },
    { id: 'components', text: 'Components', level: 2 },
    { id: 'button', text: 'Button', level: 3 },
    { id: 'card', text: 'Card', level: 3 },
    { id: 'advanced', text: 'Advanced Topics', level: 2 },
    { id: 'customization', text: 'Customization', level: 3 },
    { id: 'theming', text: 'Theming', level: 4 },
    { id: 'dark-mode', text: 'Dark Mode', level: 4 },
  ];
</script>

<div class="mljr-space-y-8">
  <!-- Basic TOC -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Basic Table of Content</h3>
    <div style="max-width: 280px;">
      <TableOfContent
        items={sampleItems}
        title="On this page"
        activeTracking={false}
      />
    </div>
  </section>

  <!-- No title -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Without Title</h3>
    <div style="max-width: 280px;">
      <TableOfContent
        items={sampleItems.slice(0, 5)}
        activeTracking={false}
      />
    </div>
  </section>

  <!-- Typical layout -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Sidebar Layout</h3>
    <div class="mljr-card mljr-p-6">
      <div style="display: flex; gap: 2rem; align-items: flex-start;">
        <article style="flex: 1; color: var(--mljr-text-muted); line-height: 1.7;">
          <h2 id="toc-s-intro" style="color: var(--mljr-text); font-size: 1.2rem; font-weight: 600; margin: 0 0 0.5rem;">Introduction</h2>
          <p>The TableOfContent component scans headings in a content area and generates navigation links automatically.</p>
          <h3 id="toc-s-install" style="color: var(--mljr-text); font-size: 1.05rem; font-weight: 600; margin: 1rem 0 0.5rem;">Installation</h3>
          <p>Add the component to your project and point it at the content container using a CSS selector.</p>
          <h3 id="toc-s-config" style="color: var(--mljr-text); font-size: 1.05rem; font-weight: 600; margin: 1rem 0 0.5rem;">Configuration</h3>
          <p>Control which heading levels are included, whether to show a title, and whether to track the active section on scroll.</p>
          <h2 id="toc-s-advanced" style="color: var(--mljr-text); font-size: 1.2rem; font-weight: 600; margin: 1rem 0 0.5rem;">Advanced</h2>
          <p>Use the <code>sticky</code> prop for a TOC that stays visible while scrolling through long articles.</p>
        </article>
        <aside style="width: 200px; flex-shrink: 0;">
          <TableOfContent
            items={[
              { id: 'toc-s-intro', text: 'Introduction', level: 2 },
              { id: 'toc-s-install', text: 'Installation', level: 3 },
              { id: 'toc-s-config', text: 'Configuration', level: 3 },
              { id: 'toc-s-advanced', text: 'Advanced', level: 2 },
            ]}
            title="Contents"
            activeTracking={false}
          />
        </aside>
      </div>
    </div>
  </section>
</div>
