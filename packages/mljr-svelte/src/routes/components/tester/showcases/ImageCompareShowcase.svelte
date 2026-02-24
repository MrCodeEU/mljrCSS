<script lang="ts">
  import { ImageCompare } from '$lib';
</script>

<div class="mljr-space-y-8">
  <!-- Horizontal -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Horizontal Comparison</h3>
    <ImageCompare
      before="https://picsum.photos/seed/mountain1/800/450"
      after="https://picsum.photos/seed/mountain2/800/450"
      beforeLabel="Before"
      afterLabel="After"
    />
    <p class="mljr-text-muted mljr-text-sm mljr-mt-2">Drag slider or use ← → arrow keys</p>
  </section>

  <!-- Starting at 25% -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Initial Position at 25%</h3>
    <ImageCompare
      before="https://picsum.photos/seed/city3/800/450"
      after="https://picsum.photos/seed/city4/800/450"
      initialPosition={25}
      beforeLabel="Day"
      afterLabel="Night"
    />
  </section>

  <!-- Vertical -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Vertical Mode</h3>
    <div style="max-width: 500px;">
      <ImageCompare
        before="https://picsum.photos/seed/nature3/600/400"
        after="https://picsum.photos/seed/nature4/600/400"
        vertical={true}
        beforeLabel="Before"
        afterLabel="After"
      />
    </div>
    <p class="mljr-text-muted mljr-text-sm mljr-mt-2">Drag slider or use ↑ ↓ arrow keys</p>
  </section>

  <!-- Without labels -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Without Labels</h3>
    <ImageCompare
      before="https://picsum.photos/seed/abstract1/800/350"
      after="https://picsum.photos/seed/abstract2/800/350"
      initialPosition={60}
    />
  </section>
</div>
