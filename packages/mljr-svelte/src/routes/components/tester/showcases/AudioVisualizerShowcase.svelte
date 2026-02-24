<script lang="ts">
  import { AudioVisualizer } from '$lib';
  let playing = $state(false);
</script>

<div class="mljr-space-y-8">
  <!-- Playback controls -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Simulated Animation — All Types</h3>
    <div class="mljr-mb-4">
      <button class="mljr-btn {playing ? '' : 'mljr-btn-primary'}" onclick={() => (playing = !playing)}>
        {playing ? '⏸ Stop' : '▶ Play'}
      </button>
    </div>
    <div class="mljr-space-y-4">
      <div>
        <p class="mljr-text-sm mljr-text-muted mljr-mb-2">Bars</p>
        <AudioVisualizer type="bars" {playing} height={140} bars={56} />
      </div>
      <div>
        <p class="mljr-text-sm mljr-text-muted mljr-mb-2">Waveform</p>
        <AudioVisualizer type="waveform" {playing} height={100} bars={90} />
      </div>
      <div>
        <p class="mljr-text-sm mljr-text-muted mljr-mb-2">Circular</p>
        <AudioVisualizer type="circular" {playing} height={180} bars={72} />
      </div>
    </div>
  </section>

  <!-- Custom colors -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Custom Colors</h3>
    <div class="mljr-grid mljr-gap-4" style="grid-template-columns: 1fr 1fr 1fr;">
      <AudioVisualizer type="bars" {playing} height={100} color="#a855f7" colorSecondary="#ec4899" bars={32} />
      <AudioVisualizer type="bars" {playing} height={100} color="#3b82f6" colorSecondary="#06b6d4" bars={32} />
      <AudioVisualizer type="bars" {playing} height={100} color="#ef4444" colorSecondary="#f97316" bars={32} />
    </div>
  </section>

  <!-- Microphone -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Microphone Input</h3>
    <AudioVisualizer microphone={true} height={160} bars={64} />
  </section>
</div>
