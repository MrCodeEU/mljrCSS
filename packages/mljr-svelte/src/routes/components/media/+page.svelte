<script lang="ts">
  import MarqueeSection from '../../sections/MarqueeSection.svelte';
  import ImageCompareSection from '../../sections/ImageCompareSection.svelte';
  import AudioVisualizerSection from '../../sections/AudioVisualizerSection.svelte';
  import VideoPlayerSection from '../../sections/VideoPlayerSection.svelte';
  import DropZoneSection from '../../sections/DropZoneSection.svelte';
  import ScrollRevealSection from '../../sections/ScrollRevealSection.svelte';
  import LazyLoadSection from '../../sections/LazyLoadSection.svelte';
</script>

<svelte:head>
  <title>Media - MLJR CSS</title>
</svelte:head>

<div class="docs-content">
  <div class="docs-sections">
    <section id="marquee" class="docs-section">
      <h2 class="docs-section-title">Marquee</h2>
      <div class="docs-section-body"><MarqueeSection /></div>
    </section>

    <section id="image-compare" class="docs-section">
      <h2 class="docs-section-title">Image Compare</h2>
      <div class="docs-section-body"><ImageCompareSection /></div>
    </section>

    <section id="audio-visualizer" class="docs-section">
      <h2 class="docs-section-title">Audio Visualizer</h2>
      <div class="docs-section-body"><AudioVisualizerSection /></div>
    </section>

    <section id="video-player" class="docs-section">
      <h2 class="docs-section-title">Video Player</h2>
      <div class="docs-section-body"><VideoPlayerSection /></div>
    </section>

    <section id="drop-zone" class="docs-section">
      <h2 class="docs-section-title">Drop Zone (Advanced File Upload)</h2>
      <div class="docs-section-body"><DropZoneSection /></div>
    </section>

    <section id="scroll-reveal" class="docs-section">
      <h2 class="docs-section-title">Scroll Reveal (InView)</h2>
      <div class="docs-section-body"><ScrollRevealSection /></div>
    </section>

    <section id="lazy-load" class="docs-section">
      <h2 class="docs-section-title">Lazy Loading</h2>
      <div class="docs-section-body"><LazyLoadSection /></div>
    </section>
  </div>
</div>
