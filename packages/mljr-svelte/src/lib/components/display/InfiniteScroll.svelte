<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    /** Called when the sentinel enters the viewport */
    onLoadMore: () => void | Promise<void>;
    /** Whether a load is currently in progress */
    loading?: boolean;
    /** Whether there are more items to load */
    hasMore?: boolean;
    /** IntersectionObserver threshold */
    threshold?: number;
    /** Message shown when all items are loaded */
    endMessage?: string;
    /** Additional CSS class */
    class?: string;
    children?: Snippet;
    /** Custom loading indicator (overrides default spinner) */
    loadingContent?: Snippet;
  }

  let {
    onLoadMore,
    loading = false,
    hasMore = true,
    threshold = 0.1,
    endMessage = 'No more items',
    class: className = '',
    children,
    loadingContent,
  }: Props = $props();

  let sentinel: HTMLElement | undefined = $state();

  $effect(() => {
    if (!sentinel || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          onLoadMore();
        }
      },
      { threshold }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  });
</script>

<div class="mljr-infinite-scroll {className}">
  {@render children?.()}

  {#if hasMore}
    <div bind:this={sentinel} class="mljr-infinite-scroll-sentinel" aria-hidden="true"></div>
    {#if loading}
      {#if loadingContent}
        {@render loadingContent?.()}
      {:else}
        <div class="mljr-infinite-scroll-loading">
          <div class="mljr-spinner mljr-spinner-ring"></div>
          <span>Loading more…</span>
        </div>
      {/if}
    {/if}
  {:else}
    <div class="mljr-infinite-scroll-end">{endMessage}</div>
  {/if}
</div>
