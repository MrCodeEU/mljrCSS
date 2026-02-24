<script lang="ts">
  import { Card, VirtualList, Resizable, CodeExample } from '$lib';

  // 10 000 item list for virtual scroll demo
  const bigList = Array.from({ length: 10_000 }, (_, i) => ({
    id: i + 1,
    name: `Item ${i + 1}`,
    value: Math.floor(Math.random() * 1000),
  }));

  let resizeSplit = $state(50);
</script>

<section id="virtual-list" class="mljr-mb-8">
  <h2 class="mljr-h2 mljr-mb-2">VirtualList &amp; Resizable</h2>
  <p class="mljr-text-muted mljr-mb-8">Performance-first rendering of large lists, and draggable panel splits.</p>

  <div class="mljr-space-y-8">
    <!-- VirtualList -->
    <div>
      <h3 class="mljr-h4 mljr-mb-4">VirtualList</h3>
      <p class="mljr-text-sm mljr-text-muted mljr-mb-4">
        Renders only the visible rows from a 10,000-item list — no lag, no DOM bloat.
      </p>
      <Card>
        <VirtualList items={bigList} itemHeight={48} containerHeight={360}>
          {#snippet item({ item, index })}
            <div
              class="mljr-flex mljr-items-center mljr-justify-between mljr-px-4"
              style="height: 48px; border-bottom: 1px solid var(--mljr-border);"
            >
              <span class="mljr-text-sm mljr-text-muted">#{item.id}</span>
              <span class="mljr-font-medium">{item.name}</span>
              <span class="mljr-text-sm" style="color: var(--mljr-primary-500);">{item.value}</span>
            </div>
          {/snippet}
        </VirtualList>
      </Card>

      <CodeExample code={`<VirtualList items={bigList} itemHeight={48} containerHeight={360}>
  {#snippet item({ item, index })}
    <div style="height: 48px;">
      {item.name}
    </div>
  {/snippet}
</VirtualList>`} language="svelte" />
    </div>

    <!-- Resizable -->
    <div>
      <h3 class="mljr-h4 mljr-mb-4">Resizable</h3>
      <p class="mljr-text-sm mljr-text-muted mljr-mb-4">
        Drag the divider to resize panels. Works horizontally and vertically.
      </p>

      <Card title="Horizontal Split" description="Drag the handle between the panels">
        <div style="height: 280px;">
          <Resizable
            direction="horizontal"
            initialSplit={resizeSplit}
            minSize={20}
            maxSize={80}
            onresize={(s) => resizeSplit = s}
          >
            {#snippet panelA()}
              <div class="mljr-p-4 mljr-h-full" style="background: var(--mljr-bg-secondary); border-radius: var(--mljr-radius-md) 0 0 var(--mljr-radius-md);">
                <h4 class="mljr-h5 mljr-mb-2">Panel A</h4>
                <p class="mljr-text-sm mljr-text-muted">Left panel — {resizeSplit.toFixed(0)}%</p>
              </div>
            {/snippet}
            {#snippet panelB()}
              <div class="mljr-p-4 mljr-h-full" style="background: var(--mljr-bg-tertiary, var(--mljr-bg-secondary)); border-radius: 0 var(--mljr-radius-md) var(--mljr-radius-md) 0;">
                <h4 class="mljr-h5 mljr-mb-2">Panel B</h4>
                <p class="mljr-text-sm mljr-text-muted">Right panel — {(100 - resizeSplit).toFixed(0)}%</p>
              </div>
            {/snippet}
          </Resizable>
        </div>
      </Card>

      <Card title="Vertical Split" description="Top/bottom resizable panels" class="mljr-mt-4">
        <div style="height: 300px;">
          <Resizable direction="vertical" initialSplit={40}>
            {#snippet panelA()}
              <div class="mljr-p-4" style="background: var(--mljr-bg-secondary); height: 100%; border-radius: var(--mljr-radius-md) var(--mljr-radius-md) 0 0;">
                <h4 class="mljr-h5">Top Panel</h4>
                <p class="mljr-text-sm mljr-text-muted">Drag handle below to resize</p>
              </div>
            {/snippet}
            {#snippet panelB()}
              <div class="mljr-p-4" style="background: var(--mljr-bg-secondary); height: 100%; border-radius: 0 0 var(--mljr-radius-md) var(--mljr-radius-md);">
                <h4 class="mljr-h5">Bottom Panel</h4>
                <p class="mljr-text-sm mljr-text-muted">Expands when top shrinks</p>
              </div>
            {/snippet}
          </Resizable>
        </div>
      </Card>

      <CodeExample code={`<Resizable direction="horizontal" initialSplit={50} minSize={20} maxSize={80}>
  {#snippet panelA()}
    <div>Left content</div>
  {/snippet}
  {#snippet panelB()}
    <div>Right content</div>
  {/snippet}
</Resizable>

<!-- Vertical split -->
<Resizable direction="vertical" initialSplit={40}>
  {#snippet panelA()}<div>Top</div>{/snippet}
  {#snippet panelB()}<div>Bottom</div>{/snippet}
</Resizable>`} language="svelte" />
    </div>
  </div>
</section>
