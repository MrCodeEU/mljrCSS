<script lang="ts">
  import { InView } from '$lib';
  type Animation = 'none' | 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale' | 'flip';
  const animations: Animation[] = ['fade', 'slide-up', 'slide-down', 'slide-left', 'slide-right', 'scale', 'flip'];
</script>

<div class="mljr-space-y-8">
  <!-- All animations -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Animation Variants (once=false, scroll up/down to repeat)</h3>
    <div class="mljr-grid mljr-gap-4" style="grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));">
      {#each animations as anim}
        <InView animation={anim} once={false}>
          <div class="mljr-card mljr-p-4" style="text-align: center; min-height: 80px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.5rem;">
            <code class="mljr-text-sm">{anim}</code>
          </div>
        </InView>
      {/each}
    </div>
  </section>

  <!-- Staggered -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Staggered Delay</h3>
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      {#each [0, 100, 200, 300, 400] as delay, i}
        <InView animation="slide-up" {delay} once={false}>
          <div class="mljr-card mljr-p-4" style="min-width: 100px; text-align: center;">
            <div class="mljr-text-muted mljr-text-sm">delay</div>
            <div class="mljr-font-semibold">{delay}ms</div>
          </div>
        </InView>
      {/each}
    </div>
  </section>

  <!-- Custom duration -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Custom Duration</h3>
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      {#each [200, 600, 1200, 2000] as duration}
        <InView animation="fade" {duration} once={false}>
          <div class="mljr-card mljr-p-4" style="min-width: 120px; text-align: center;">
            <div class="mljr-text-muted mljr-text-sm">fade in</div>
            <div class="mljr-font-semibold">{duration}ms</div>
          </div>
        </InView>
      {/each}
    </div>
  </section>

  <!-- animation=none (callback only) -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">No Animation (callback only)</h3>
    <InView animation="none" once={false} onEnter={() => console.log('entered')} onLeave={() => console.log('left')}>
      <div class="mljr-card mljr-p-4">
        No CSS animation — just fires onEnter/onLeave callbacks. (Check console)
      </div>
    </InView>
  </section>
</div>
