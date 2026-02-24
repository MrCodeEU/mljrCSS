<script lang="ts">
  import { Slider, RangeSlider, Card } from '$lib';

  let basic = $state(50);
  let volume = $state(70);
  let brightness = $state(80);
  let temperature = $state(22);
  let opacity = $state(0.5);

  let rangeMin1 = $state(20);
  let rangeMax1 = $state(80);
  let priceMin = $state(100);
  let priceMax = $state(500);
  let ageMin = $state(18);
  let ageMax = $state(65);
</script>

<div class="mljr-space-y-8">
  <!-- Basic Slider -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Basic Slider</h3>
    <div class="mljr-space-y-2">
      <Slider bind:value={basic} />
      <p class="mljr-text-xs mljr-text-muted">Value: {basic}</p>
    </div>
  </section>

  <!-- With Label -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Label</h3>
    <Slider label="Volume" bind:value={volume} showValue />
  </section>

  <!-- Min / Max / Step -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Min / Max / Step</h3>
    <div class="mljr-space-y-4">
      <Slider
        label="Temperature (°C)"
        min={-10}
        max={40}
        step={0.5}
        bind:value={temperature}
        showValue
      />
      <Slider
        label="Opacity"
        min={0}
        max={1}
        step={0.01}
        bind:value={opacity}
        showValue
      />
    </div>
  </section>

  <!-- Disabled -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Disabled</h3>
    <Slider label="Disabled Slider" value={40} disabled />
  </section>

  <!-- Range Slider -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Range Slider</h3>
    <div class="mljr-space-y-2">
      <RangeSlider bind:minValue={rangeMin1} bind:maxValue={rangeMax1} />
      <p class="mljr-text-xs mljr-text-muted">Range: {rangeMin1} – {rangeMax1}</p>
    </div>
  </section>

  <!-- Range with Labels -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Range with Label</h3>
    <div class="mljr-space-y-4">
      <RangeSlider
        label="Price Range ($)"
        min={0}
        max={1000}
        step={10}
        bind:minValue={priceMin}
        bind:maxValue={priceMax}
        showFloatingValue
      />
      <RangeSlider
        label="Age Range"
        min={0}
        max={100}
        bind:minValue={ageMin}
        bind:maxValue={ageMax}
        showFloatingValue
      />
    </div>
  </section>

  <!-- Settings Panel Example -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Settings Panel</h3>
    <Card>
      <h4 class="mljr-h5 mljr-mb-4">Display Settings</h4>
      <div class="mljr-space-y-6">
        <Slider
          label="Brightness"
          min={10}
          max={100}
          bind:value={brightness}
          showValue
        />
        <Slider
          label="Volume"
          min={0}
          max={100}
          bind:value={volume}
          showValue
        />
        <Slider
          label="Opacity"
          min={0}
          max={100}
          bind:value={basic}
          showValue
        />
      </div>
    </Card>
  </section>

  <!-- Product Filter Example -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Product Filter</h3>
    <Card>
      <h4 class="mljr-h5 mljr-mb-4">Filter by Price</h4>
      <RangeSlider
        min={0}
        max={1000}
        step={10}
        bind:minValue={priceMin}
        bind:maxValue={priceMax}
        showFloatingValue
      />
      <div class="mljr-flex mljr-justify-between mljr-mt-2">
        <span class="mljr-text-sm mljr-text-muted">Min: ${priceMin}</span>
        <span class="mljr-text-sm mljr-text-muted">Max: ${priceMax}</span>
      </div>
    </Card>
  </section>

  <!-- Color Temperature -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Color Temperature</h3>
    <Card>
      <Slider
        label="Color Temperature (K)"
        min={2700}
        max={6500}
        step={100}
        bind:value={temperature}
        showValue
      />
      <div
        class="mljr-mt-4 mljr-h-8 mljr-rounded-lg"
        style="background: linear-gradient(to right, #ff9329 0%, #fff4e0 30%, #ffffff 60%, #cce4ff 100%)"
      >
        <div
          class="mljr-h-full mljr-flex mljr-items-center mljr-justify-end mljr-pr-3"
        >
          <div
            class="mljr-w-3 mljr-h-6 mljr-rounded mljr-border-2 mljr-border-white/50 mljr-shadow"
            style="background: white; transform: translateX({((temperature - 2700) / (6500 - 2700)) * 100}%)"
          ></div>
        </div>
      </div>
    </Card>
  </section>
</div>
