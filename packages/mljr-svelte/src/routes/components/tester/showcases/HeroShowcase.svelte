<script lang="ts">
  import { Hero, Button, Badge } from '$lib';
</script>

<div class="mljr-space-y-8">
  <!-- Default Variant -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Default Variant</h3>
    <Hero
      title="Build Beautiful UIs"
      subtitle="A claymorphism design system for Svelte 5 with 60+ components."
      variant="default"
      minHeight="300px"
    >
      {#snippet actions()}
        <Button variant="primary" size="lg">Get Started</Button>
        <Button variant="outline-primary" size="lg">Learn More</Button>
      {/snippet}
    </Hero>
  </section>

  <!-- Centered Variant -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Centered Variant</h3>
    <Hero
      title="Welcome to MLJR CSS"
      subtitle="Soft, inflated, playful 3D aesthetics for modern web apps."
      variant="centered"
      minHeight="280px"
    >
      {#snippet actions()}
        <Button variant="primary">Start Building</Button>
        <Button variant="ghost">View Examples</Button>
      {/snippet}
    </Hero>
  </section>

  <!-- Minimal Variant -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Minimal Variant</h3>
    <Hero
      title="Simple and Clean"
      subtitle="Less is more. Focused on what matters."
      variant="minimal"
      minHeight="250px"
    >
      {#snippet actions()}
        <Button variant="primary" size="sm">Explore</Button>
      {/snippet}
    </Hero>
  </section>

  <!-- With Gradient -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Gradient Background</h3>
    <Hero
      title="Orange Gradient Hero"
      subtitle="Matching the MLJR brand with warm orange tones."
      variant="centered"
      gradient
      gradientColor="primary"
      minHeight="280px"
    >
      {#snippet actions()}
        <Button variant="secondary" size="lg">Get Started</Button>
        <Button variant="ghost" size="lg" class="mljr-text-white/80">Documentation</Button>
      {/snippet}
    </Hero>
  </section>

  <!-- With Pattern -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Pattern Overlay</h3>
    <Hero
      title="Pattern Background"
      subtitle="Decorative background patterns add texture and depth."
      variant="centered"
      gradient
      gradientColor="secondary"
      pattern
      minHeight="260px"
    >
      {#snippet actions()}
        <Button variant="primary">Explore Components</Button>
      {/snippet}
    </Hero>
  </section>

  <!-- Split with Media -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Split with Media Slot</h3>
    <Hero
      title="Component Library"
      subtitle="Professionally crafted Svelte 5 components with full TypeScript support and accessibility baked in."
      variant="split"
      minHeight="300px"
    >
      {#snippet actions()}
        <Button variant="primary">Install Now</Button>
        <Button variant="outline-primary">GitHub</Button>
      {/snippet}
      {#snippet media()}
        <div class="mljr-relative mljr-rounded-2xl mljr-overflow-hidden mljr-aspect-video mljr-bg-gradient-primary mljr-flex mljr-items-center mljr-justify-center mljr-text-white">
          <div class="mljr-text-center">
            <div class="mljr-text-6xl mljr-font-bold mljr-mb-2">60+</div>
            <div class="mljr-text-xl">Components</div>
          </div>
        </div>
      {/snippet}
    </Hero>
  </section>
</div>
