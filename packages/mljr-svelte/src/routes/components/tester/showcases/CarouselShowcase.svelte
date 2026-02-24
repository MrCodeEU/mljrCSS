<script lang="ts">
  import { Carousel, Card } from '$lib';

  let slide1 = $state(0);
</script>

<div class="mljr-space-y-8">
  <!-- Basic -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Basic Carousel</h3>
    <Carousel bind:currentSlide={slide1}>
      <div class="mljr-h-48 mljr-bg-gradient-primary mljr-rounded-xl mljr-flex mljr-items-center mljr-justify-center mljr-text-white mljr-text-2xl mljr-font-bold">
        Slide 1
      </div>
      <div class="mljr-h-48 mljr-rounded-xl mljr-flex mljr-items-center mljr-justify-center mljr-text-white mljr-text-2xl mljr-font-bold" style="background: linear-gradient(135deg, #14b8a6, #0d9488)">
        Slide 2
      </div>
      <div class="mljr-h-48 mljr-rounded-xl mljr-flex mljr-items-center mljr-justify-center mljr-text-white mljr-text-2xl mljr-font-bold" style="background: linear-gradient(135deg, #a855f7, #9333ea)">
        Slide 3
      </div>
    </Carousel>
    <p class="mljr-text-xs mljr-text-muted mljr-mt-2">Current slide: {slide1 + 1}</p>
  </section>

  <!-- Autoplay -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Autoplay</h3>
    <Carousel autoplay interval={2000} loop>
      {#each ['Orange', 'Teal', 'Purple', 'Rose'] as color, i}
        {@const colors = ['#f97316', '#14b8a6', '#a855f7', '#f43f5e']}
        <div
          class="mljr-h-40 mljr-rounded-xl mljr-flex mljr-items-center mljr-justify-center mljr-text-white mljr-text-xl mljr-font-bold"
          style="background: {colors[i]}"
        >
          {color}
        </div>
      {/each}
    </Carousel>
  </section>

  <!-- Fade Variant -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Fade Transition</h3>
    <Carousel variant="fade">
      <div class="mljr-h-48 mljr-bg-gradient-primary mljr-rounded-xl mljr-flex mljr-items-center mljr-justify-center mljr-text-white mljr-text-2xl mljr-font-bold">
        First
      </div>
      <div class="mljr-h-48 mljr-rounded-xl mljr-flex mljr-items-center mljr-justify-center mljr-text-white mljr-text-2xl mljr-font-bold" style="background: linear-gradient(135deg, #14b8a6, #0d9488)">
        Second
      </div>
      <div class="mljr-h-48 mljr-rounded-xl mljr-flex mljr-items-center mljr-justify-center mljr-text-white mljr-text-2xl mljr-font-bold" style="background: linear-gradient(135deg, #a855f7, #9333ea)">
        Third
      </div>
    </Carousel>
  </section>

  <!-- No Controls -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Without Controls</h3>
    <Carousel showControls={false} autoplay loop>
      <div class="mljr-h-32 mljr-bg-gradient-primary mljr-rounded-xl mljr-flex mljr-items-center mljr-justify-center mljr-text-white mljr-font-bold">
        Indicator only
      </div>
      <div class="mljr-h-32 mljr-rounded-xl mljr-flex mljr-items-center mljr-justify-center mljr-text-white mljr-font-bold" style="background: #14b8a6">
        No nav arrows
      </div>
    </Carousel>
  </section>

  <!-- No Indicators -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Without Indicators</h3>
    <Carousel showIndicators={false}>
      <div class="mljr-h-32 mljr-bg-gradient-primary mljr-rounded-xl mljr-flex mljr-items-center mljr-justify-center mljr-text-white mljr-font-bold">Controls only</div>
      <div class="mljr-h-32 mljr-rounded-xl mljr-flex mljr-items-center mljr-justify-center mljr-text-white mljr-font-bold" style="background: #a855f7">No dots</div>
    </Carousel>
  </section>

  <!-- Content Cards -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Content Cards Carousel</h3>
    <Carousel loop>
      {#each [
        { title: 'Getting Started', desc: 'Install MLJR CSS and start building beautiful UIs.', icon: '🚀' },
        { title: 'Claymorphism', desc: 'Soft, inflated 3D aesthetic with dual shadows.', icon: '🎨' },
        { title: '47+ Components', desc: 'Fully tested Svelte 5 component library.', icon: '🧩' },
      ] as slide}
        <Card class="mljr-text-center mljr-py-8">
          <div class="mljr-text-5xl mljr-mb-4">{slide.icon}</div>
          <h3 class="mljr-h4 mljr-mb-2">{slide.title}</h3>
          <p class="mljr-text-secondary">{slide.desc}</p>
        </Card>
      {/each}
    </Carousel>
  </section>
</div>
