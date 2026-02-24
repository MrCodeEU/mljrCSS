<script lang="ts">
  type VizType = 'bars' | 'waveform' | 'circular';

  interface Props {
    /** Visualization style */
    type?: VizType;
    /** Whether to show animated simulation (without real audio) */
    playing?: boolean;
    /** Use microphone input (requires browser permission) */
    microphone?: boolean;
    /** Primary color (default: primary orange) */
    color?: string;
    /** Secondary gradient color */
    colorSecondary?: string;
    /** Canvas height in px */
    height?: number;
    /** Number of bars/samples */
    bars?: number;
    /** Additional CSS class */
    class?: string;
  }

  let {
    type = $bindable<VizType>('bars'),
    playing = false,
    microphone = false,
    color = '#f97316',
    colorSecondary = '#14b8a6',
    height = 160,
    bars = 64,
    class: className = '',
  }: Props = $props();

  let canvas: HTMLCanvasElement | undefined = $state();
  let wrapEl: HTMLElement | undefined = $state();
  let animationId: number | undefined;
  let audioCtx: AudioContext | undefined;
  let analyser: AnalyserNode | undefined;
  let micStream: MediaStream | undefined;
  let micActive = $state(false);
  let micError = $state('');
  let simTime = 0;

  /* ── Mic / Audio Context ── */
  async function startMic() {
    micError = '';
    try {
      micStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      audioCtx = new AudioContext();
      analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.8;
      const src = audioCtx.createMediaStreamSource(micStream);
      src.connect(analyser);
      micActive = true;
    } catch {
      micError = 'Microphone access denied. Enable mic permission and try again.';
    }
  }

  function stopMic() {
    micStream?.getTracks().forEach(t => t.stop());
    audioCtx?.close();
    analyser = undefined;
    micActive = false;
  }

  /* ── Simulation data (no real audio) ── */
  function getSimData(count: number, t: number): Uint8Array<ArrayBuffer> {
    const data = new Uint8Array(count) as Uint8Array<ArrayBuffer>;
    for (let i = 0; i < count; i++) {
      const wave =
        Math.sin(i * 0.3 + t * 0.05) * 0.4 +
        Math.sin(i * 0.7 + t * 0.08) * 0.25 +
        Math.sin(i * 0.15 + t * 0.03) * 0.35;
      data[i] = Math.max(0, Math.min(255, Math.round((wave * 0.5 + 0.5) * 200 + 20)));
    }
    return data;
  }

  /* ── Draw functions ── */
  function drawBars(ctx: CanvasRenderingContext2D, data: Uint8Array<ArrayBuffer>, w: number, h: number) {
    const count = data.length;
    const gap = 2;
    const barW = Math.max(1, (w - gap * (count - 1)) / count);

    for (let i = 0; i < count; i++) {
      const ratio = data[i] / 255;
      const barH = ratio * h;
      const x = i * (barW + gap);
      const y = h - barH;

      // Gradient per bar
      const grad = ctx.createLinearGradient(x, y, x, h);
      grad.addColorStop(0, colorSecondary);
      grad.addColorStop(1, color);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.roundRect(x, y, barW, barH, [3, 3, 0, 0]);
      ctx.fill();
    }
  }

  function drawWaveform(ctx: CanvasRenderingContext2D, data: Uint8Array<ArrayBuffer>, w: number, h: number) {
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const grad = ctx.createLinearGradient(0, 0, w, 0);
    grad.addColorStop(0, color);
    grad.addColorStop(0.5, colorSecondary);
    grad.addColorStop(1, color);
    ctx.strokeStyle = grad;

    ctx.beginPath();
    const sliceW = w / data.length;
    for (let i = 0; i < data.length; i++) {
      const x = i * sliceW;
      const y = (data[i] / 255) * h;
      if (i === 0) ctx.moveTo(x, y);
      else         ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Mirror (reflected)
    ctx.globalAlpha = 0.25;
    ctx.beginPath();
    for (let i = 0; i < data.length; i++) {
      const x = i * sliceW;
      const y = h - (data[i] / 255) * h;
      if (i === 0) ctx.moveTo(x, y);
      else         ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.globalAlpha = 1;
  }

  function drawCircular(ctx: CanvasRenderingContext2D, data: Uint8Array<ArrayBuffer>, w: number, h: number) {
    const cx = w / 2;
    const cy = h / 2;
    const radius = Math.min(w, h) * 0.3;
    const count = data.length;

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
      const amplitude = (data[i] / 255) * radius * 0.7;
      const x1 = cx + Math.cos(angle) * radius;
      const y1 = cy + Math.sin(angle) * radius;
      const x2 = cx + Math.cos(angle) * (radius + amplitude);
      const y2 = cy + Math.sin(angle) * (radius + amplitude);

      const t = i / count;
      const r1 = parseInt(color.slice(1, 3), 16);
      const g1 = parseInt(color.slice(3, 5), 16);
      const b1 = parseInt(color.slice(5, 7), 16);
      const r2 = parseInt(colorSecondary.slice(1, 3), 16);
      const g2 = parseInt(colorSecondary.slice(3, 5), 16);
      const b2 = parseInt(colorSecondary.slice(5, 7), 16);
      const r  = Math.round(r1 + (r2 - r1) * t);
      const g  = Math.round(g1 + (g2 - g1) * t);
      const b  = Math.round(b1 + (b2 - b1) * t);

      ctx.strokeStyle = `rgb(${r},${g},${b})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    // Inner circle
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    ctx.globalAlpha = 0.3;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.globalAlpha = 1;
  }

  /* ── Animation loop ── */
  function startAnimation() {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    function frame() {
      if (!canvas) return;
      const w = canvas.width;
      const h = canvas.height;
      ctx!.clearRect(0, 0, w, h);

      let data: Uint8Array<ArrayBuffer>;
      if (analyser) {
        data = new Uint8Array(analyser.frequencyBinCount) as Uint8Array<ArrayBuffer>;
        if (type === 'waveform') {
          analyser.getByteTimeDomainData(data);
        } else {
          analyser.getByteFrequencyData(data);
        }
      } else {
        simTime += 1;
        data = getSimData(bars, simTime);
      }

      if (type === 'bars')      drawBars(ctx!, data, w, h);
      else if (type === 'waveform') drawWaveform(ctx!, data, w, h);
      else                      drawCircular(ctx!, data, w, h);

      animationId = requestAnimationFrame(frame);
    }
    frame();
  }

  function stopAnimation() {
    if (animationId !== undefined) {
      cancelAnimationFrame(animationId);
      animationId = undefined;
    }
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  /* ── Canvas sizing via ResizeObserver ── */
  $effect(() => {
    if (!wrapEl || !canvas) return;
    const ro = new ResizeObserver(entries => {
      for (const e of entries) {
        if (canvas) {
          canvas.width  = e.contentRect.width;
          canvas.height = height;
        }
      }
    });
    ro.observe(wrapEl);
    return () => ro.disconnect();
  });

  /* ── Start/stop animation based on playing prop ── */
  $effect(() => {
    if (playing || micActive) {
      startAnimation();
    } else {
      stopAnimation();
    }
    return () => stopAnimation();
  });

  /* ── Cleanup on destroy ── */
  $effect(() => {
    return () => {
      stopAnimation();
      stopMic();
    };
  });
</script>

<div class="mljr-audio-viz {className}">
  <div bind:this={wrapEl} class="mljr-audio-viz-canvas-wrap" style="height: {height}px;">
    <canvas bind:this={canvas} width="600" {height}></canvas>

    {#if !playing && !micActive}
      <div class="mljr-audio-viz-idle" aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M9 18V5l12-2v13"/>
          <circle cx="6" cy="18" r="3"/>
          <circle cx="18" cy="16" r="3"/>
        </svg>
        <span>{microphone ? 'Click Start Mic to visualize audio' : 'Set playing={true} to animate'}</span>
      </div>
    {/if}
  </div>

  <!-- Controls -->
  <div class="mljr-audio-viz-controls">
    <!-- Type selector -->
    <div class="mljr-audio-viz-types" role="group" aria-label="Visualization type">
      {#each (['bars', 'waveform', 'circular'] as VizType[]) as t}
        <button
          class="mljr-audio-viz-type-btn {type === t ? 'mljr-audio-viz-type-btn-active' : ''}"
          onclick={() => (type = t)}
          aria-pressed={type === t}
        >{t}</button>
      {/each}
    </div>

    {#if microphone}
      {#if !micActive}
        <button class="mljr-btn mljr-btn-primary mljr-btn-sm" onclick={startMic}>
          Start Mic
        </button>
      {:else}
        <button class="mljr-btn mljr-btn-sm" onclick={stopMic}>
          Stop Mic
        </button>
      {/if}
    {/if}
  </div>

  {#if micError}
    <div class="mljr-audio-viz-error" role="alert">{micError}</div>
  {/if}
</div>
