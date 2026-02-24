<script lang="ts">
  import { LazyImage } from '$lib';
</script>

<div class="mljr-space-y-8">
  <!-- Basic grid -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Image Grid (shimmer skeleton → fade in)</h3>
    <div class="mljr-grid mljr-gap-4" style="grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));">
      {#each [10, 11, 12, 13, 14, 15] as seed}
        <LazyImage
          src="https://picsum.photos/seed/{seed}b/400/260"
          alt="Photo {seed}"
          height={180}
        />
      {/each}
    </div>
  </section>

  <!-- Wide image -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Wide Image</h3>
    <LazyImage
      src="https://picsum.photos/seed/wide1/1200/400"
      alt="Wide landscape"
      height={300}
    />
  </section>

  <!-- Custom dimensions -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Custom Width &amp; Height</h3>
    <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: flex-start;">
      <LazyImage src="https://picsum.photos/seed/sq1/200/200" alt="Square" width={120} height={120} />
      <LazyImage src="https://picsum.photos/seed/port1/200/300" alt="Portrait" width={120} height={200} />
      <LazyImage src="https://picsum.photos/seed/land1/300/200" alt="Landscape" width={220} height={120} />
    </div>
  </section>
</div>
