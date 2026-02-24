<script lang="ts">
  import { AnimatedHeadline } from '$lib';
</script>

<div class="mljr-space-y-10">
  <!-- Typing -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Typing Animation</h3>
    <h2 class="mljr-h2" style="min-height: 2.5rem;">
      <AnimatedHeadline
        prefix="We build"
        words={['fast apps', 'beautiful UIs', 'great experiences', 'the future']}
        animation="typing"
      />
    </h2>
  </section>

  <!-- Fade -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Fade Animation</h3>
    <h2 class="mljr-h2" style="min-height: 2.5rem;">
      <AnimatedHeadline
        prefix="The"
        words={['simplest', 'fastest', 'most elegant', 'cleanest']}
        suffix="solution"
        animation="fade"
        interval={2000}
      />
    </h2>
  </section>

  <!-- Slide -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Slide Animation</h3>
    <h2 class="mljr-h2" style="min-height: 2.5rem; overflow: hidden;">
      <AnimatedHeadline
        prefix="Made for"
        words={['developers', 'designers', 'teams', 'startups']}
        animation="slide"
        interval={2200}
      />
    </h2>
  </section>

  <!-- Flip -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Flip Animation</h3>
    <h2 class="mljr-h2" style="min-height: 2.5rem; perspective: 800px;">
      <AnimatedHeadline
        prefix="Built with"
        words={['passion', 'purpose', 'precision', 'pride']}
        animation="flip"
        interval={2000}
      />
    </h2>
  </section>

  <!-- Highlight -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Gradient Highlight</h3>
    <h2 class="mljr-h2" style="min-height: 2.5rem;">
      <AnimatedHeadline
        prefix="Ship"
        words={['faster', 'smarter', 'better']}
        suffix="today"
        animation="fade"
        highlight={true}
        interval={2500}
      />
    </h2>
  </section>

  <!-- Inline usage -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Inline in Paragraph</h3>
    <p class="mljr-text-lg" style="min-height: 2rem;">
      I love working with
      <AnimatedHeadline
        words={['Svelte', 'TypeScript', 'CSS', 'open source']}
        animation="typing"
        typingSpeed={70}
        erasingSpeed={30}
        interval={1800}
      />
      every day.
    </p>
  </section>

  <!-- Custom speed -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Fast Typing Speed</h3>
    <h3 class="mljr-h3" style="min-height: 2.25rem;">
      <AnimatedHeadline
        prefix="Technology:"
        words={['AI', 'ML', 'IoT', 'AR/VR', 'Web3', 'Cloud', 'Edge']}
        animation="typing"
        typingSpeed={50}
        erasingSpeed={25}
        interval={1500}
      />
    </h3>
  </section>
</div>
