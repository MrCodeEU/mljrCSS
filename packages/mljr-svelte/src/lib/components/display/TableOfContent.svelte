<script lang="ts">
  interface TocItem {
    id: string;
    text: string;
    level: number;
  }

  interface Props {
    /** CSS selector for the content container to scan for headings */
    contentSelector?: string;
    /** Heading levels to include */
    levels?: number[];
    /** Title displayed above the TOC */
    title?: string;
    /** Whether the TOC sticks while scrolling */
    sticky?: boolean;
    /** Whether to highlight the active section based on scroll */
    activeTracking?: boolean;
    /** Manually provided items (overrides auto-scan) */
    items?: TocItem[];
    /** Additional CSS class */
    class?: string;
  }

  let {
    contentSelector = 'main',
    levels = [2, 3, 4],
    title = 'On this page',
    sticky = false,
    activeTracking = true,
    items = $bindable([]),
    class: className = '',
  }: Props = $props();

  let activeId = $state('');

  function scanHeadings() {
    const container = document.querySelector(contentSelector);
    if (!container) return;

    const selector = levels.map(l => `h${l}`).join(', ');
    const headings = Array.from(container.querySelectorAll(selector)) as HTMLElement[];

    items = headings
      .filter(h => h.id || h.textContent?.trim())
      .map(h => {
        // Auto-generate ID if missing
        if (!h.id) {
          h.id = h.textContent!.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
        }
        return {
          id: h.id,
          text: h.textContent?.trim() ?? '',
          level: parseInt(h.tagName[1]),
        };
      });
  }

  function trackActive() {
    if (!activeTracking || items.length === 0) return;

    const scrollY = window.scrollY + 100;
    let current = items[0]?.id ?? '';

    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el && el.getBoundingClientRect().top + window.scrollY <= scrollY) {
        current = item.id;
      }
    }
    activeId = current;
  }

  $effect(() => {
    if (items.length === 0) {
      scanHeadings();
    }

    if (activeTracking) {
      trackActive();
      window.addEventListener('scroll', trackActive, { passive: true });
      return () => window.removeEventListener('scroll', trackActive);
    }
  });

  const tocClass = $derived(
    ['mljr-toc', sticky && 'mljr-toc-sticky', className].filter(Boolean).join(' ')
  );
</script>

{#if items.length > 0}
  <nav class={tocClass} aria-label="Table of contents">
    {#if title}
      <p class="mljr-toc-title">{title}</p>
    {/if}
    <ul class="mljr-toc-list" role="list">
      {#each items as item}
        <li class="mljr-toc-item">
          <a
            href="#{item.id}"
            class="mljr-toc-link mljr-toc-h{item.level} {activeId === item.id ? 'mljr-toc-link-active' : ''}"
            aria-current={activeId === item.id ? 'location' : undefined}
          >
            {item.text}
          </a>
        </li>
      {/each}
    </ul>
  </nav>
{/if}
