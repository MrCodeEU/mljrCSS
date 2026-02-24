<script lang="ts">
  import { AnimatedHeadline } from '$lib';
  import CodeExample from '$lib/components/CodeExample.svelte';
</script>

<section id="animated-headline" class="mljr-mb-12">
  <h2 class="mljr-h2 mljr-mb-2">Animated Headline</h2>
  <p class="mljr-text-muted mljr-mb-8">Dynamic text animations for headings — typing, fade, slide, and flip effects.</p>

  <div class="mljr-space-y-10">
    <!-- Typing Animation -->
    <div>
      <h3 class="mljr-h4 mljr-mb-4">Typing Animation (default)</h3>
      <h2 class="mljr-h2" style="min-height: 2.5rem;">
        <AnimatedHeadline
          prefix="We build"
          words={['fast apps', 'beautiful UIs', 'great experiences', 'the future']}
          animation="typing"
        />
      </h2>
    </div>

    <CodeExample
      code={`<AnimatedHeadline
  prefix="We build"
  words={['fast apps', 'beautiful UIs', 'great experiences']}
  animation="typing"
/>`}
      language="svelte"
    />

    <!-- Fade Animation -->
    <div>
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
    </div>

    <!-- Slide Animation -->
    <div>
      <h3 class="mljr-h4 mljr-mb-4">Slide Animation</h3>
      <h2 class="mljr-h2" style="min-height: 2.5rem; overflow: hidden;">
        <AnimatedHeadline
          prefix="Made for"
          words={['developers', 'designers', 'teams', 'startups']}
          animation="slide"
          interval={2200}
        />
      </h2>
    </div>

    <!-- Flip Animation -->
    <div>
      <h3 class="mljr-h4 mljr-mb-4">Flip Animation</h3>
      <h2 class="mljr-h2" style="min-height: 2.5rem; perspective: 800px;">
        <AnimatedHeadline
          prefix="Built with"
          words={['passion', 'purpose', 'precision', 'pride']}
          animation="flip"
          interval={2000}
        />
      </h2>
    </div>

    <!-- Highlight -->
    <div>
      <h3 class="mljr-h4 mljr-mb-4">With Highlight Effect</h3>
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
    </div>

    <!-- Typing with suffix -->
    <div>
      <h3 class="mljr-h4 mljr-mb-4">Typing with Prefix and Suffix</h3>
      <p class="mljr-text-lg" style="min-height: 2rem;">
        I love working with
        <AnimatedHeadline
          words={['Svelte', 'TypeScript', 'CSS', 'open source']}
          animation="typing"
          typingSpeed={70}
          erasingSpeed={30}
          interval={1800}
        /> every day.
      </p>
    </div>
  </div>
</section>
