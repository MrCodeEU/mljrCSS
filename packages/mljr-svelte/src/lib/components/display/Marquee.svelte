<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    /** Items to scroll (used when no children snippet is provided) */
    items?: string[];
    /** Duration in seconds for one full scroll cycle */
    duration?: number;
    /** Whether to reverse the scroll direction */
    reverse?: boolean;
    /** Pause scrolling on mouse hover */
    pauseOnHover?: boolean;
    /** Fade out edges with gradient mask */
    gradient?: boolean;
    /** Whether to scroll vertically instead of horizontally */
    vertical?: boolean;
    /** Height for vertical marquee (CSS value) */
    height?: string;
    /** Gap between items (CSS value) */
    gap?: string;
    /** Separator string between items */
    separator?: string;
    /** Additional CSS class */
    class?: string;
    /** Custom item content snippet (receives item string) */
    children?: Snippet<[string]>;
    /** Default slot for fully custom content (duplicated automatically) */
    content?: Snippet;
  }

  let {
    items = [],
    duration = 20,
    reverse = false,
    pauseOnHover = true,
    gradient = true,
    vertical = false,
    height = '200px',
    gap = '1rem',
    separator,
    class: className = '',
    children,
    content,
  }: Props = $props();

  const marqueeClasses = $derived(
    [
      'mljr-marquee',
      reverse && 'mljr-marquee-reverse',
      pauseOnHover && 'mljr-marquee-pause',
      gradient && 'mljr-marquee-gradient',
      vertical && 'mljr-marquee-vertical',
      className,
    ]
      .filter(Boolean)
      .join(' ')
  );

  const style = $derived(
    [
      `--mljr-marquee-duration: ${duration}s`,
      `--mljr-marquee-gap: ${gap}`,
      vertical ? `--mljr-marquee-height: ${height}` : '',
    ]
      .filter(Boolean)
      .join('; ')
  );
</script>

<div class={marqueeClasses} {style} aria-label="Scrolling content" role="marquee">
  <!-- Duplicate content for seamless looping -->
  {#each [0, 1] as _}
    <div class="mljr-marquee-content" aria-hidden={_ === 1 ? 'true' : undefined}>
      {#if content}
        {@render content()}
      {:else if children}
        {#each items as item, i}
          {@render children(item)}
          {#if separator && i < items.length - 1}
            <span class="mljr-marquee-separator" aria-hidden="true">{separator}</span>
          {/if}
        {/each}
      {:else}
        {#each items as item, i}
          <span class="mljr-marquee-item">{item}</span>
          {#if separator && i < items.length - 1}
            <span class="mljr-marquee-separator" aria-hidden="true">{separator}</span>
          {/if}
        {/each}
      {/if}
    </div>
  {/each}
</div>
