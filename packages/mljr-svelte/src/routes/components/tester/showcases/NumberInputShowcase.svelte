<script lang="ts">
  import { NumberInput } from '$lib';

  let basic = $state(5);
  let bounded = $state(50);
  let decimal = $state(1.5);
</script>

<div class="mljr-space-y-8">
  <!-- Default -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Default (no limits)</h3>
    <NumberInput bind:value={basic} />
    <p class="mljr-text-muted mljr-text-sm mljr-mt-2">Value: {basic}</p>
  </section>

  <!-- Min / Max / Step -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Min=0, Max=100, Step=10</h3>
    <NumberInput bind:value={bounded} min={0} max={100} step={10} />
    <p class="mljr-text-muted mljr-text-sm mljr-mt-2">Value: {bounded}</p>
  </section>

  <!-- Decimal step -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Decimal Step (0.5)</h3>
    <NumberInput bind:value={decimal} step={0.5} min={0} max={10} />
    <p class="mljr-text-muted mljr-text-sm mljr-mt-2">Value: {decimal}</p>
  </section>

  <!-- Size variants -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Size Variants</h3>
    <div class="mljr-flex mljr-flex-wrap mljr-gap-4 mljr-items-center">
      <div>
        <p class="mljr-text-xs mljr-text-muted mljr-mb-2">Small</p>
        <NumberInput size="sm" />
      </div>
      <div>
        <p class="mljr-text-xs mljr-text-muted mljr-mb-2">Medium (default)</p>
        <NumberInput size="md" />
      </div>
      <div>
        <p class="mljr-text-xs mljr-text-muted mljr-mb-2">Large</p>
        <NumberInput size="lg" />
      </div>
    </div>
  </section>

  <!-- Disabled -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Disabled</h3>
    <NumberInput value={25} disabled />
  </section>

  <!-- Readonly -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Readonly</h3>
    <NumberInput value={42} readonly />
  </section>
</div>
