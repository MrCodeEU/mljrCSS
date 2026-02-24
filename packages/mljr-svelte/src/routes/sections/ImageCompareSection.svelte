<script lang="ts">
  import { ImageCompare } from '$lib';
  import CodeExample from '$lib/components/CodeExample.svelte';

  // Use placeholder images from picsum
  const before = 'https://picsum.photos/seed/before1/800/450';
  const after = 'https://picsum.photos/seed/after1/800/450';
</script>

<section id="image-compare" class="mljr-mb-12">
  <h2 class="mljr-h2 mljr-mb-2">Image Compare</h2>
  <p class="mljr-text-muted mljr-mb-8">Drag the slider to compare two images side by side.</p>

  <div class="mljr-space-y-8">
    <!-- Basic Compare -->
    <div>
      <h3 class="mljr-h4 mljr-mb-4">Horizontal Comparison</h3>
      <div style="max-width: 700px;">
        <ImageCompare
          {before}
          {after}
          beforeLabel="Original"
          afterLabel="Edited"
        />
      </div>
      <p class="mljr-text-muted mljr-text-sm mljr-mt-2">Drag or use ← → arrow keys to compare</p>
    </div>

    <CodeExample
      code={`<ImageCompare
  before="path/to/before.jpg"
  after="path/to/after.jpg"
  beforeLabel="Original"
  afterLabel="Edited"
/>`}
      language="svelte"
    />

    <!-- Custom Position -->
    <div>
      <h3 class="mljr-h4 mljr-mb-4">Starting at 25%</h3>
      <div style="max-width: 700px;">
        <ImageCompare
          before="https://picsum.photos/seed/city1/800/400"
          after="https://picsum.photos/seed/city2/800/400"
          initialPosition={25}
          beforeLabel="Before"
          afterLabel="After"
        />
      </div>
    </div>

    <!-- Vertical Mode -->
    <div>
      <h3 class="mljr-h4 mljr-mb-4">Vertical Comparison</h3>
      <div style="max-width: 500px;">
        <ImageCompare
          before="https://picsum.photos/seed/nature1/600/400"
          after="https://picsum.photos/seed/nature2/600/400"
          vertical={true}
          beforeLabel="Day"
          afterLabel="Night"
        />
      </div>
    </div>
  </div>
</section>
