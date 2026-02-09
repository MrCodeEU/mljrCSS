<script lang="ts">
  import { Card, CodeExample } from '$lib';
</script>

<section id="gradients" class="mljr-mb-8">
  <Card title="Gradient Utilities" description="Background gradients and Claymorphism effects">
    <div class="mljr-mb-6">
      <h4 class="mljr-h5 mljr-mb-3">Background Gradients</h4>
      <div class="mljr-grid mljr-grid-cols-2 mljr-md:grid-cols-4 mljr-gap-4">
        <div class="mljr-bg-gradient-primary mljr-p-4 mljr-text-center mljr-rounded-lg" style="color: white;">
          Primary
        </div>
        <div class="mljr-bg-gradient-secondary mljr-p-4 mljr-text-center mljr-rounded-lg" style="color: white;">
          Secondary
        </div>
        <div class="mljr-bg-gradient-accent mljr-p-4 mljr-text-center mljr-rounded-lg" style="color: white;">
          Accent
        </div>
        <div class="mljr-bg-gradient-brand mljr-p-4 mljr-text-center mljr-rounded-lg" style="color: white;">
          Brand
        </div>
      </div>
    </div>

    <div class="mljr-mb-6">
      <h4 class="mljr-h5 mljr-mb-3">Animated Gradient</h4>
      <div class="mljr-bg-gradient-animated mljr-p-6 mljr-text-center mljr-rounded-xl" style="color: white;">
        Animated gradient background that shifts colors
      </div>
    </div>

    <div class="mljr-mb-6">
      <h4 class="mljr-h5 mljr-mb-3">Warm Mesh Gradient</h4>
      <div class="mljr-bg-mesh-warm mljr-p-6 mljr-border mljr-rounded-xl">
        <p>Soft mesh gradient with orange, purple, and teal tones</p>
      </div>
    </div>

    <div class="mljr-mb-6">
      <h4 class="mljr-h5 mljr-mb-3">Clay Panel Effects</h4>
      <div class="mljr-flex mljr-gap-4 mljr-flex-wrap">
        <div class="mljr-soft-panel mljr-p-4">
          Soft Panel
        </div>
        <div class="mljr-inset-panel mljr-p-4">
          Inset Panel
        </div>
        <div class="mljr-floating-panel mljr-p-4">
          Floating Panel
        </div>
      </div>
    </div>

    <div class="mljr-mb-6">
      <h4 class="mljr-h5 mljr-mb-3">Frosted Glass</h4>
      <div class="mljr-frosted mljr-p-6 mljr-rounded-xl" style="background-image: linear-gradient(135deg, var(--mljr-primary-100) 0%, var(--mljr-secondary-100) 100%);">
        <p class="mljr-text-sm mljr-mb-2 mljr-font-semibold">FROSTED GLASS</p>
        <p>Frosted glass effect with blur backdrop, perfect for overlays</p>
      </div>
    </div>

    <div>
      <h4 class="mljr-h5 mljr-mb-3">Shimmer Effect</h4>
      <div class="mljr-shimmer mljr-bg-gradient-primary mljr-p-6 mljr-rounded-xl" style="color: white;">
        Shimmer effect that sweeps across the element
      </div>
    </div>
  </Card>

  <CodeExample code={`<!-- Background Gradients -->
<div class="mljr-bg-gradient-primary">Primary</div>
<div class="mljr-bg-gradient-secondary">Secondary</div>
<div class="mljr-bg-gradient-accent">Accent</div>
<div class="mljr-bg-gradient-brand">Brand</div>

<!-- Animated Gradient -->
<div class="mljr-bg-gradient-animated">
  Animated gradient background
</div>

<!-- Mesh Gradient -->
<div class="mljr-bg-mesh-warm">
  Soft mesh gradient
</div>

<!-- Clay Panel Effects -->
<div class="mljr-soft-panel">Soft Panel</div>
<div class="mljr-inset-panel">Inset Panel</div>
<div class="mljr-floating-panel">Floating Panel</div>

<!-- Frosted Glass -->
<div class="mljr-frosted">
  Frosted glass effect
</div>

<!-- Shimmer Effect -->
<div class="mljr-shimmer mljr-bg-gradient-primary">
  Shimmer effect
</div>`} />
</section>
