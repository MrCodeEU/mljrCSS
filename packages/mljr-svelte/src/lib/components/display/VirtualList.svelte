<script lang="ts" generics="T">
  import type { Snippet } from 'svelte';

  interface Props {
    items: T[];
    itemHeight?: number;
    containerHeight?: number;
    overscan?: number;
    item?: Snippet<[{ item: T; index: number }]>;
    class?: string;
  }

  let {
    items,
    itemHeight = 40,
    containerHeight = 400,
    overscan = 3,
    item: itemSnippet,
    class: className = '',
  }: Props = $props();

  let scrollTop = $state(0);

  let totalHeight = $derived(items.length * itemHeight);

  let visibleCount = $derived(Math.ceil(containerHeight / itemHeight));

  let startIndex = $derived(
    Math.max(0, Math.floor(scrollTop / itemHeight) - overscan)
  );

  let endIndex = $derived(
    items.length === 0 ? -1 : Math.min(items.length - 1, startIndex + visibleCount + overscan * 2)
  );

  let visibleItems = $derived(
    endIndex < 0
      ? []
      : items.slice(startIndex, endIndex + 1).map((it, i) => ({
          item: it,
          index: startIndex + i,
        }))
  );

  let offsetY = $derived(startIndex * itemHeight);

  function onScroll(e: Event) {
    scrollTop = (e.currentTarget as HTMLElement).scrollTop;
  }
</script>

<div
  class="mljr-virtual-list {className}"
  style="height: {containerHeight}px; overflow-y: auto; position: relative;"
  onscroll={onScroll}
  role="list"
>
  <div style="height: {totalHeight}px; position: relative; pointer-events: none;">
    <div style="position: absolute; top: 0; left: 0; right: 0; transform: translateY({offsetY}px); pointer-events: auto;">
      {#each visibleItems as entry (entry.index)}
        <div style="height: {itemHeight}px; overflow: hidden;" role="listitem">
          {@render itemSnippet?.({ item: entry.item, index: entry.index })}
        </div>
      {/each}
    </div>
  </div>
</div>
