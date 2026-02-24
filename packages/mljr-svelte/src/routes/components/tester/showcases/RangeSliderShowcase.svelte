<script lang="ts">
  import { RangeSlider } from '$lib';

  let min1 = $state(20);
  let max1 = $state(80);

  let min2 = $state(0);
  let max2 = $state(5);

  let min3 = $state(100);
  let max3 = $state(500);
</script>

<div class="mljr-space-y-8">
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Default Range Slider</h3>
    <RangeSlider bind:minValue={min1} bind:maxValue={max1} label="Price Range" />
    <p class="mljr-text-sm mljr-text-muted mljr-mt-4">Selected: {min1} – {max1}</p>
  </section>

  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Steps (step=1, range 0–10)</h3>
    <RangeSlider bind:minValue={min2} bind:maxValue={max2} min={0} max={10} step={1} label="Rating Range" />
    <p class="mljr-text-sm mljr-text-muted mljr-mt-4">Selected: {min2} – {max2}</p>
  </section>

  <section>
    <h3 class="mljr-h4 mljr-mb-4">Budget Range (step=50, range 0–1000)</h3>
    <RangeSlider bind:minValue={min3} bind:maxValue={max3} min={0} max={1000} step={50} label="Budget (€)" />
    <p class="mljr-text-sm mljr-text-muted mljr-mt-4">Selected: €{min3} – €{max3}</p>
  </section>

  <section>
    <h3 class="mljr-h4 mljr-mb-4">Small Size</h3>
    <RangeSlider size="sm" label="Small Slider" />
  </section>

  <section>
    <h3 class="mljr-h4 mljr-mb-4">Large Size</h3>
    <RangeSlider size="lg" label="Large Slider" />
  </section>

  <section>
    <h3 class="mljr-h4 mljr-mb-4">Disabled</h3>
    <RangeSlider disabled={true} label="Disabled Slider" minValue={30} maxValue={70} />
  </section>

  <section>
    <h3 class="mljr-h4 mljr-mb-4">Without Floating Value</h3>
    <RangeSlider showFloatingValue={false} label="No floating tooltip" />
  </section>
</div>
