<script lang="ts">
  import { LazyImage, InfiniteScroll } from '$lib';
  import CodeExample from '$lib/components/CodeExample.svelte';

  // Infinite scroll demo state
  let items = $state(Array.from({ length: 10 }, (_, i) => ({ id: i + 1, label: `Item ${i + 1}` })));
  let loading = $state(false);
  let hasMore = $state(true);

  async function loadMore() {
    if (loading) return;
    loading = true;
    await new Promise((r) => setTimeout(r, 800));
    const start = items.length + 1;
    const next = Array.from({ length: 8 }, (_, i) => ({ id: start + i, label: `Item ${start + i}` }));
    items = [...items, ...next];
    loading = false;
    if (items.length >= 40) hasMore = false;
  }
</script>

<section id="lazy-load" class="mljr-mb-12">
  <h2 class="mljr-h2 mljr-mb-2">Lazy Loading</h2>
  <p class="mljr-text-muted mljr-mb-8">
    Load images only when they enter the viewport (LazyImage) and stream content lists on demand (InfiniteScroll).
  </p>

  <div class="mljr-space-y-10">
    <!-- LazyImage grid -->
    <div>
      <h3 class="mljr-h4 mljr-mb-2">LazyImage — Image Grid</h3>
      <p class="mljr-text-muted mljr-text-sm mljr-mb-4">Images load with a shimmer placeholder until they enter the viewport (200px before visible area).</p>
      <div class="mljr-grid mljr-gap-4" style="grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));">
        {#each [1, 2, 3, 4, 5, 6] as seed}
          <LazyImage
            src="https://picsum.photos/seed/{seed}a/400/260"
            alt="Lazy loaded photo {seed}"
            height={180}
          />
        {/each}
      </div>
    </div>

    <!-- Infinite scroll demo -->
    <div>
      <h3 class="mljr-h4 mljr-mb-2">InfiniteScroll — Load More on Scroll</h3>
      <p class="mljr-text-muted mljr-text-sm mljr-mb-4">Scroll to the bottom of the list to load more items automatically (up to 40).</p>
      <div class="mljr-card" style="max-height: 360px; overflow-y: auto; padding: 0;">
        <InfiniteScroll onLoadMore={loadMore} {loading} {hasMore} endMessage="All 40 items loaded">
          <ul style="list-style: none; margin: 0; padding: 0;">
            {#each items as item (item.id)}
              <li style="
                padding: 0.75rem 1.25rem;
                border-bottom: 1px solid var(--mljr-border);
                display: flex;
                align-items: center;
                gap: 0.75rem;
                font-size: 0.9rem;
                color: var(--mljr-text);
              ">
                <span style="
                  width: 28px; height: 28px;
                  border-radius: 50%;
                  background: var(--mljr-primary-100);
                  display: flex; align-items: center; justify-content: center;
                  font-size: 0.75rem;
                  color: var(--mljr-primary-700);
                  font-weight: 600;
                  flex-shrink: 0;
                ">{item.id}</span>
                {item.label}
              </li>
            {/each}
          </ul>
        </InfiniteScroll>
      </div>
    </div>

    <!-- Code examples -->
    <CodeExample
      code={`<script>
  import { LazyImage, InfiniteScroll } from 'mljr-svelte';

  let items = $state([...]);
  let loading = $state(false);
  let hasMore = $state(true);

  async function loadMore() {
    loading = true;
    const more = await fetchNextPage();
    items = [...items, ...more];
    loading = false;
    if (items.length >= total) hasMore = false;
  }
<\/script>

<!-- LazyImage with skeleton placeholder -->
<LazyImage
  src="/hero.jpg"
  alt="Hero image"
  height={300}
/>

<!-- InfiniteScroll wraps any content -->
<InfiniteScroll
  onLoadMore={loadMore}
  {loading}
  {hasMore}
  endMessage="You've reached the end!"
>
  {#each items as item}
    <Card>{item.title}</Card>
  {/each}
</InfiniteScroll>`}
      language="svelte"
    />
  </div>
</section>
