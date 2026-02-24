<script lang="ts">
  import { InfiniteScroll } from '$lib';

  let items = $state(Array.from({ length: 8 }, (_, i) => ({ id: i + 1, name: `User ${i + 1}`, role: 'Member' })));
  let loading = $state(false);
  let hasMore = $state(true);

  async function loadMore() {
    if (loading) return;
    loading = true;
    await new Promise((r) => setTimeout(r, 700));
    const start = items.length + 1;
    const batch = Array.from({ length: 8 }, (_, i) => ({
      id: start + i,
      name: `User ${start + i}`,
      role: start + i % 3 === 0 ? 'Admin' : 'Member',
    }));
    items = [...items, ...batch];
    loading = false;
    if (items.length >= 32) hasMore = false;
  }
</script>

<div class="mljr-space-y-8">
  <!-- List demo -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">User List (loads 8 at a time, max 32)</h3>
    <div class="mljr-card" style="max-height: 400px; overflow-y: auto; padding: 0;">
      <InfiniteScroll onLoadMore={loadMore} {loading} {hasMore} endMessage="All users loaded">
        {#each items as item (item.id)}
          <div style="
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 0.75rem 1.25rem;
            border-bottom: 1px solid var(--mljr-border);
          ">
            <div style="
              width: 36px; height: 36px; border-radius: 50%;
              background: var(--mljr-primary-500);
              color: white;
              display: flex; align-items: center; justify-content: center;
              font-size: 0.85rem; font-weight: 600; flex-shrink: 0;
            ">{item.name.charAt(5)}</div>
            <div>
              <div style="font-weight: 500; font-size: 0.9rem;">{item.name}</div>
              <div style="font-size: 0.75rem; color: var(--mljr-text-muted);">{item.role}</div>
            </div>
            <div style="margin-left: auto; font-size: 0.75rem; color: var(--mljr-text-muted);">#{item.id}</div>
          </div>
        {/each}
      </InfiniteScroll>
    </div>
    <p class="mljr-text-sm mljr-text-muted mljr-mt-2">Showing {items.length} of 32 users — scroll to load more</p>
  </section>
</div>
