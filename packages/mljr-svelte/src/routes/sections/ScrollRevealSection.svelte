<script lang="ts">
  import { InView } from '$lib';
  import CodeExample from '$lib/components/CodeExample.svelte';

  type Animation = 'none' | 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale' | 'flip';
  const animations: Animation[] = ['fade', 'slide-up', 'slide-down', 'slide-left', 'slide-right', 'scale', 'flip'];
  const animEmoji: Record<Animation, string> = {
    none: '⬜', fade: '👁️', 'slide-up': '⬆️', 'slide-down': '⬇️',
    'slide-left': '⬅️', 'slide-right': '➡️', scale: '🔍', flip: '🔄',
  };
</script>

<section id="scroll-reveal" class="mljr-mb-12">
  <h2 class="mljr-h2 mljr-mb-2">Scroll Reveal (InView)</h2>
  <p class="mljr-text-muted mljr-mb-8">
    Animate elements as they enter the viewport using the IntersectionObserver API. Supports fade, slide, scale, and flip animations with configurable duration and delay.
  </p>

  <div class="mljr-space-y-10">
    <!-- Animation Types -->
    <div>
      <h3 class="mljr-h4 mljr-mb-6">Animation Variants</h3>
      <div class="mljr-grid mljr-gap-4" style="grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));">
        {#each animations as anim}
          <InView animation={anim} once={false}>
            <div class="mljr-card mljr-p-4" style="text-align: center;">
              <div style="font-size: 2rem; margin-bottom: 0.5rem;">{animEmoji[anim]}</div>
              <div class="mljr-text-sm mljr-font-mono" style="color: var(--mljr-text-muted);">{anim}</div>
            </div>
          </InView>
        {/each}
      </div>
    </div>

    <!-- Staggered animation with delay -->
    <div>
      <h3 class="mljr-h4 mljr-mb-6">Staggered with Delay</h3>
      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        {#each ['First', 'Second', 'Third', 'Fourth'] as label, i}
          <InView animation="slide-up" delay={i * 120} once={false}>
            <div class="mljr-card mljr-p-4" style="min-width: 120px; text-align: center;">
              <div class="mljr-text-muted mljr-text-sm">{label}</div>
              <div style="font-size: 0.75rem; color: var(--mljr-text-muted);">+{i * 120}ms</div>
            </div>
          </InView>
        {/each}
      </div>
    </div>

    <!-- Code example -->
    <CodeExample
      code={`<script>
  import { InView } from 'mljr-svelte';
<\/script>

<!-- Simple fade-in -->
<InView animation="fade">
  <div class="mljr-card mljr-p-4">Fades in on scroll</div>
</InView>

<!-- Staggered slide-up with delay -->
{#each items as item, i}
  <InView animation="slide-up" delay={i * 100} duration={500}>
    <Card>{item.title}</Card>
  </InView>
{/each}

<!-- Toggle on/off (once=false re-animates on leave) -->
<InView animation="scale" once={false} onEnter={() => console.log('entered')}>
  <div>Animates every time</div>
</InView>`}
      language="svelte"
    />
  </div>
</section>
