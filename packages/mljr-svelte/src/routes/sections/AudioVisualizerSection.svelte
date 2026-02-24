<script lang="ts">
  import { AudioVisualizer } from '$lib';
  import CodeExample from '$lib/components/CodeExample.svelte';

  let playing = $state(false);
</script>

<section id="audio-visualizer" class="mljr-mb-12">
  <h2 class="mljr-h2 mljr-mb-2">Audio Visualizer</h2>
  <p class="mljr-text-muted mljr-mb-8">
    Canvas-based audio visualizations: bars, waveform, and circular. Supports simulated animation or real microphone input via the Web Audio API.
  </p>

  <div class="mljr-space-y-8">
    <!-- Simulated animation demo -->
    <div>
      <h3 class="mljr-h4 mljr-mb-3">Simulated Animation</h3>
      <div style="margin-bottom: 1rem;">
        <button class="mljr-btn {playing ? '' : 'mljr-btn-primary'}" onclick={() => (playing = !playing)}>
          {playing ? 'Stop' : 'Play'}
        </button>
      </div>
      <div class="mljr-grid mljr-gap-4" style="grid-template-columns: 1fr 1fr 1fr;">
        <div>
          <p class="mljr-text-sm mljr-text-muted mljr-mb-2">Bars</p>
          <AudioVisualizer type="bars" {playing} height={120} bars={48} />
        </div>
        <div>
          <p class="mljr-text-sm mljr-text-muted mljr-mb-2">Waveform</p>
          <AudioVisualizer type="waveform" {playing} height={120} bars={80} />
        </div>
        <div>
          <p class="mljr-text-sm mljr-text-muted mljr-mb-2">Circular</p>
          <AudioVisualizer type="circular" {playing} height={120} bars={60} />
        </div>
      </div>
    </div>

    <!-- Mic input -->
    <div>
      <h3 class="mljr-h4 mljr-mb-3">Microphone Input</h3>
      <p class="mljr-text-muted mljr-text-sm mljr-mb-4">Click "Start Mic" to visualize your microphone in real time. Your browser will ask for permission.</p>
      <AudioVisualizer microphone={true} height={180} bars={64} />
    </div>

    <!-- Custom colors -->
    <div>
      <h3 class="mljr-h4 mljr-mb-3">Custom Colors</h3>
      <div class="mljr-grid mljr-gap-4" style="grid-template-columns: 1fr 1fr;">
        <AudioVisualizer type="bars" {playing} height={100} color="#a855f7" colorSecondary="#ec4899" />
        <AudioVisualizer type="circular" {playing} height={100} color="#3b82f6" colorSecondary="#06b6d4" />
      </div>
    </div>

    <CodeExample
      code={`<script>
  import { AudioVisualizer } from 'mljr-svelte';
  let playing = $state(false);
<\/script>

<!-- Simulated animation -->
<AudioVisualizer type="bars" {playing} height={160} />

<!-- Switch visualization type at runtime -->
<AudioVisualizer type="waveform" {playing} bars={80} />

<!-- Real microphone input -->
<AudioVisualizer microphone={true} height={180} />

<!-- Custom colors -->
<AudioVisualizer
  type="circular"
  {playing}
  color="#a855f7"
  colorSecondary="#ec4899"
/>`}
      language="svelte"
    />
  </div>
</section>
