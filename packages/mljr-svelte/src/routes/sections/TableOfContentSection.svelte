<script lang="ts">
  import { TableOfContent } from '$lib';
  import CodeExample from '$lib/components/CodeExample.svelte';

  // Demo with manual items since we can't scan a specific DOM area in isolation
  const sampleItems = [
    { id: 'intro', text: 'Introduction', level: 2 },
    { id: 'getting-started', text: 'Getting Started', level: 2 },
    { id: 'installation', text: 'Installation', level: 3 },
    { id: 'configuration', text: 'Configuration', level: 3 },
    { id: 'basic-usage', text: 'Basic Usage', level: 3 },
    { id: 'components', text: 'Components', level: 2 },
    { id: 'button', text: 'Button', level: 3 },
    { id: 'card', text: 'Card', level: 3 },
    { id: 'modal', text: 'Modal', level: 3 },
    { id: 'advanced', text: 'Advanced Topics', level: 2 },
    { id: 'customization', text: 'Customization', level: 3 },
    { id: 'theming', text: 'Theming', level: 4 },
    { id: 'dark-mode', text: 'Dark Mode', level: 4 },
    { id: 'api-reference', text: 'API Reference', level: 2 },
  ];
</script>

<section id="table-of-content" class="mljr-mb-12">
  <h2 class="mljr-h2 mljr-mb-2">Table of Content</h2>
  <p class="mljr-text-muted mljr-mb-8">Auto-generates a navigational TOC from headings in a content area, with optional scroll-based active tracking.</p>

  <div class="mljr-space-y-8">
    <!-- Manual items demo -->
    <div class="mljr-flex mljr-gap-8" style="align-items: flex-start;">
      <div style="max-width: 240px; flex-shrink: 0;">
        <h3 class="mljr-h4 mljr-mb-4">Basic TOC (Manual Items)</h3>
        <TableOfContent
          items={sampleItems}
          title="On this page"
          activeTracking={false}
        />
      </div>
      <div style="flex: 1;">
        <CodeExample
          code={`<!-- Auto-scan headings from a content area -->
<TableOfContent
  contentSelector="#my-article"
  levels={[2, 3, 4]}
  title="On this page"
  sticky={true}
  activeTracking={true}
/>

<!-- Or provide items manually -->
<TableOfContent
  items={[
    { id: 'intro', text: 'Introduction', level: 2 },
    { id: 'setup', text: 'Setup', level: 3 },
  ]}
/>`}
          language="svelte"
        />
      </div>
    </div>

    <!-- Sticky variant -->
    <div>
      <h3 class="mljr-h4 mljr-mb-4">Typical Layout (Sticky Sidebar)</h3>
      <div class="mljr-card mljr-p-4">
        <div class="mljr-flex mljr-gap-6" style="align-items: flex-start;">
          <article style="flex: 1; line-height: 1.7; color: var(--mljr-text-muted);">
            <h2 id="toc-demo-intro" style="color: var(--mljr-text); font-size: 1.25rem; font-weight: 600; margin-bottom: 0.5rem;">Introduction</h2>
            <p>The Table of Content component automatically scans your content area for heading elements and generates a navigational list. It supports scroll-based active tracking.</p>
            <h3 id="toc-demo-setup" style="color: var(--mljr-text); font-size: 1.1rem; font-weight: 600; margin: 1rem 0 0.5rem;">Setup</h3>
            <p>Point the component at your content container with a CSS selector. It will find all headings at the specified levels and generate anchor links.</p>
            <h3 id="toc-demo-usage" style="color: var(--mljr-text); font-size: 1.1rem; font-weight: 600; margin: 1rem 0 0.5rem;">Usage</h3>
            <p>In a typical documentation layout, place the TOC in a sticky sidebar alongside your main content for easy navigation.</p>
          </article>
          <aside style="width: 200px; flex-shrink: 0;">
            <TableOfContent
              items={[
                { id: 'toc-demo-intro', text: 'Introduction', level: 2 },
                { id: 'toc-demo-setup', text: 'Setup', level: 3 },
                { id: 'toc-demo-usage', text: 'Usage', level: 3 },
              ]}
              title="Contents"
              activeTracking={false}
            />
          </aside>
        </div>
      </div>
    </div>
  </div>
</section>
