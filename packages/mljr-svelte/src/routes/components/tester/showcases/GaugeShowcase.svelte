<script lang="ts">
  import { Gauge } from '$lib';

  let liveValue = $state(65);
</script>

<div class="mljr-space-y-8">
  <!-- Half arc (default) -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Half Arc (180°) — Default</h3>
    <div class="mljr-flex mljr-flex-wrap mljr-gap-8">
      <Gauge value={35} label="CPU" unit="%" arc="half" />
      <Gauge value={72} label="Memory" unit="%" arc="half" color="#14b8a6" />
      <Gauge value={91} label="Disk" unit="%" arc="half" color="#ef4444" />
    </div>
  </section>

  <!-- Full arc (270°) -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Full Arc (270°)</h3>
    <div class="mljr-flex mljr-flex-wrap mljr-gap-8">
      <Gauge value={55} label="Speed" unit=" km/h" arc="full" max={120} />
      <Gauge value={3200} label="RPM" min={0} max={8000} arc="full" color="#a855f7" />
      <Gauge value={8} label="Score" min={0} max={10} arc="full" color="#f97316" />
    </div>
  </section>

  <!-- Live interactive -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Interactive — Live Value</h3>
    <div class="mljr-flex mljr-flex-col mljr-items-start mljr-gap-4" style="max-width: 300px;">
      <Gauge value={liveValue} label="Power" unit="%" arc="full" size={180} animated />
      <div class="mljr-flex mljr-items-center mljr-gap-3 mljr-w-full">
        <input
          type="range"
          min="0"
          max="100"
          bind:value={liveValue}
          class="mljr-slider-input"
          style="width: 100%"
        />
        <span class="mljr-text-sm mljr-font-mono" style="min-width: 2.5rem; text-align: right;">{liveValue}%</span>
      </div>
    </div>
  </section>

  <!-- Size variants -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Size Variants</h3>
    <div class="mljr-flex mljr-flex-wrap mljr-gap-8 mljr-items-end">
      <Gauge value={60} size={120} thickness={14} label="Small" arc="half" />
      <Gauge value={60} size={180} thickness={18} label="Medium" arc="half" />
      <Gauge value={60} size={240} thickness={22} label="Large" arc="half" />
    </div>
  </section>

  <!-- Color variants -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Color Variants</h3>
    <div class="mljr-flex mljr-flex-wrap mljr-gap-6">
      <Gauge value={50} color="#f97316" label="Orange" arc="full" size={140} />
      <Gauge value={50} color="#14b8a6" label="Teal" arc="full" size={140} />
      <Gauge value={50} color="#a855f7" label="Purple" arc="full" size={140} />
      <Gauge value={50} color="#3b82f6" label="Blue" arc="full" size={140} />
      <Gauge value={50} color="#10b981" label="Green" arc="full" size={140} />
    </div>
  </section>

  <!-- No value display -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Without Value Text</h3>
    <div class="mljr-flex mljr-flex-wrap mljr-gap-6">
      <Gauge value={75} showValue={false} label="Progress" arc="full" />
      <Gauge value={40} showValue={false} arc="half" color="#14b8a6" />
    </div>
  </section>
</div>
