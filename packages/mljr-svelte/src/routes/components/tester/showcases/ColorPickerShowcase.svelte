<script lang="ts">
  import { ColorPicker, Card, Button } from '$lib';

  let color1 = $state('#F97316');
  let color2 = $state('#14b8a6');
  let brandColor = $state('#F97316');
  let accentColor = $state('#a855f7');
  let textColor = $state('#1f2937');
  let bgColor = $state('#fffbf7');
</script>

<div class="mljr-space-y-8">
  <!-- Basic Color Picker -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Basic Color Picker</h3>
    <div class="mljr-space-y-2">
      <ColorPicker bind:value={color1} />
      <div class="mljr-flex mljr-items-center mljr-gap-3">
        <div
          class="mljr-w-10 mljr-h-10 mljr-rounded-lg mljr-border mljr-border-black/10"
          style="background: {color1}"
        ></div>
        <span class="mljr-text-sm mljr-font-mono">{color1}</span>
      </div>
    </div>
  </section>

  <!-- With Label -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Label</h3>
    <ColorPicker
      label="Theme Color"
      bind:value={color2}
    />
  </section>

  <!-- With Alpha -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Alpha Channel</h3>
    <ColorPicker
      label="Color with Opacity"
      showAlpha
    />
  </section>

  <!-- Custom Presets -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Custom Preset Colors</h3>
    <ColorPicker
      label="Brand Palette"
      presets={['#F97316', '#14b8a6', '#a855f7', '#ef4444', '#22c55e', '#3b82f6', '#f59e0b', '#ec4899']}
    />
  </section>

  <!-- Without Format Toggle -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Hex Only (No Format Toggle)</h3>
    <ColorPicker
      label="Hex Color"
      showFormat={false}
    />
  </section>

  <!-- Brand Color Customizer -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Brand Customizer</h3>
    <Card>
      <h4 class="mljr-h5 mljr-mb-4">Customize Your Brand</h4>
      <div class="mljr-grid mljr-grid-cols-1 mljr-sm:grid-cols-2 mljr-gap-6">
        <ColorPicker label="Primary Color" bind:value={brandColor} />
        <ColorPicker label="Accent Color" bind:value={accentColor} />
        <ColorPicker label="Text Color" bind:value={textColor} />
        <ColorPicker label="Background" bind:value={bgColor} />
      </div>
      <div
        class="mljr-mt-6 mljr-p-4 mljr-rounded-lg mljr-border"
        style="background: {bgColor}; color: {textColor}; border-color: {brandColor}40"
      >
        <h5 style="color: {brandColor}" class="mljr-font-bold mljr-mb-2">Brand Preview</h5>
        <p class="mljr-text-sm mljr-mb-3">This is how your brand colors look together.</p>
        <button
          class="mljr-px-4 mljr-py-2 mljr-rounded-lg mljr-text-white mljr-text-sm mljr-font-medium"
          style="background: {brandColor}"
        >
          Sample Button
        </button>
        <span
          class="mljr-ml-2 mljr-px-3 mljr-py-1 mljr-rounded-full mljr-text-white mljr-text-xs"
          style="background: {accentColor}"
        >
          Badge
        </span>
      </div>
    </Card>
  </section>
</div>
