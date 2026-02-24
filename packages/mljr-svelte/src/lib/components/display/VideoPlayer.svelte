<script lang="ts">
  import { untrack } from 'svelte';

  interface Props {
    /** Video source URL */
    src?: string;
    /** Poster image URL */
    poster?: string;
    /** Video title shown on overlay */
    title?: string;
    /** Auto-play (muted) */
    autoplay?: boolean;
    /** Loop video */
    loop?: boolean;
    /** Start muted */
    muted?: boolean;
    /** Maintain 16:9 aspect ratio container */
    aspectRatio?: boolean;
    /** Additional CSS class */
    class?: string;
    /** Callback when playback ends */
    onEnded?: () => void;
  }

  let {
    src = '',
    poster = '',
    title = '',
    autoplay = false,
    loop = false,
    muted: initialMuted = false,
    aspectRatio = true,
    class: className = '',
    onEnded,
  }: Props = $props();

  let videoEl: HTMLVideoElement | undefined = $state();
  let containerEl: HTMLElement | undefined = $state();

  let playing = $state(false);
  let currentTime = $state(0);
  let duration = $state(0);
  let buffered = $state(0);
  let volume = $state(1);
  let muted = $state(untrack(() => initialMuted));
  let loading = $state(false);
  let error = $state('');
  let controlsVisible = $state(true);
  let isFullscreen = $state(false);
  let seeking = $state(false);

  let hideControlsTimer: ReturnType<typeof setTimeout> | undefined;

  /* ── Computed ── */
  const progressPct = $derived(duration > 0 ? (currentTime / duration) * 100 : 0);
  const bufferedPct = $derived(duration > 0 ? (buffered / duration) * 100 : 0);

  function pad(n: number) {
    return String(Math.floor(n)).padStart(2, '0');
  }

  function formatTime(s: number) {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = Math.floor(s % 60);
    return h > 0 ? `${pad(h)}:${pad(m)}:${pad(sec)}` : `${pad(m)}:${pad(sec)}`;
  }

  const timeDisplay = $derived(`${formatTime(currentTime)} / ${formatTime(duration)}`);

  /* ── Playback ── */
  function togglePlay() {
    if (!videoEl) return;
    if (playing) {
      videoEl.pause();
    } else {
      videoEl.play().catch(() => { error = 'Playback failed.'; });
    }
  }

  function seek(event: MouseEvent | TouchEvent) {
    if (!videoEl || duration === 0) return;
    const bar = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const clientX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
    const ratio = Math.max(0, Math.min(1, (clientX - bar.left) / bar.width));
    videoEl.currentTime = ratio * duration;
    currentTime = videoEl.currentTime;
  }

  /* ── Volume ── */
  function handleVolumeChange(event: Event) {
    if (!videoEl) return;
    volume = Number((event.target as HTMLInputElement).value);
    videoEl.volume = volume;
    muted = volume === 0;
    videoEl.muted = muted;
  }

  function toggleMute() {
    if (!videoEl) return;
    muted = !muted;
    videoEl.muted = muted;
    if (!muted && volume === 0) {
      volume = 0.5;
      videoEl.volume = 0.5;
    }
  }

  /* ── Fullscreen ── */
  function toggleFullscreen() {
    if (!containerEl) return;
    if (!document.fullscreenElement) {
      containerEl.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }

  /* ── Controls auto-hide ── */
  function showControls() {
    controlsVisible = true;
    clearTimeout(hideControlsTimer);
    if (playing) {
      hideControlsTimer = setTimeout(() => { controlsVisible = false; }, 2500);
    }
  }

  /* ── Keyboard shortcuts ── */
  function handleKeydown(event: KeyboardEvent) {
    if (!videoEl) return;
    switch (event.key) {
      case ' ':
      case 'k':
        event.preventDefault();
        togglePlay();
        break;
      case 'ArrowLeft':
        event.preventDefault();
        videoEl.currentTime = Math.max(0, videoEl.currentTime - 5);
        break;
      case 'ArrowRight':
        event.preventDefault();
        videoEl.currentTime = Math.min(duration, videoEl.currentTime + 5);
        break;
      case 'm':
        toggleMute();
        break;
      case 'f':
        toggleFullscreen();
        break;
    }
  }

  /* ── Video event handlers ── */
  function onPlay()    { playing = true;  showControls(); }
  function onPause()   { playing = false; controlsVisible = true; clearTimeout(hideControlsTimer); }
  function onWaiting() { loading = true; }
  function onCanPlay() { loading = false; }
  function onError()   { loading = false; error = 'Failed to load video.'; }
  function onTimeUpdate() {
    if (!videoEl || seeking) return;
    currentTime = videoEl.currentTime;
    // Update buffered amount
    if (videoEl.buffered.length > 0) {
      buffered = videoEl.buffered.end(videoEl.buffered.length - 1);
    }
  }
  function onLoadedMetadata() {
    if (!videoEl) return;
    duration = videoEl.duration;
    videoEl.muted = muted;
    videoEl.volume = volume;
    if (autoplay) videoEl.play().catch(() => {});
  }
  function onVideoEnded() {
    playing = false;
    controlsVisible = true;
    onEnded?.();
  }

  $effect(() => {
    function onFsChange() {
      isFullscreen = !!document.fullscreenElement;
    }
    document.addEventListener('fullscreenchange', onFsChange);
    return () => {
      document.removeEventListener('fullscreenchange', onFsChange);
      clearTimeout(hideControlsTimer);
    };
  });
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<div
  bind:this={containerEl}
  class="mljr-video-player {aspectRatio ? 'mljr-video-16-9' : ''} {controlsVisible || !playing ? 'mljr-video-controls-visible' : ''} {className}"
  onmousemove={showControls}
  ontouchstart={showControls}
  onkeydown={handleKeydown}
  tabindex="0"
  role="region"
  aria-label={title || 'Video player'}
>
  <!-- Video element -->
  <video
    bind:this={videoEl}
    {src}
    {poster}
    {loop}
    preload="metadata"
    onclick={togglePlay}
    onplay={onPlay}
    onpause={onPause}
    onwaiting={onWaiting}
    oncanplay={onCanPlay}
    onerror={onError}
    ontimeupdate={onTimeUpdate}
    onloadedmetadata={onLoadedMetadata}
    onended={onVideoEnded}
    aria-label={title || 'Video'}
  >
    <track kind="captions" />
  </video>

  <!-- Title overlay -->
  {#if title && !playing}
    <div class="mljr-video-title">{title}</div>
  {/if}

  <!-- Center play/pause button (shows when paused) -->
  {#if !playing && !loading && !error}
    <div class="mljr-video-overlay mljr-video-overlay-visible">
      <button class="mljr-video-center-btn" onclick={togglePlay} aria-label="Play">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="5,3 19,12 5,21"/>
        </svg>
      </button>
    </div>
  {/if}

  <!-- Loading spinner -->
  {#if loading}
    <div class="mljr-video-loading" aria-label="Loading">
      <div class="mljr-spinner mljr-spinner-lg" style="border-color: rgba(255,255,255,0.2); border-top-color: #fff;"></div>
    </div>
  {/if}

  <!-- Error overlay -->
  {#if error}
    <div class="mljr-video-error" role="alert">
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="1.5">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
      <span>{error}</span>
      {#if src}
        <button class="mljr-btn mljr-btn-sm" onclick={() => { error = ''; videoEl?.load(); }}>Retry</button>
      {/if}
    </div>
  {/if}

  <!-- Controls bar -->
  {#if !error}
    <div class="mljr-video-controls">
      <!-- Progress bar -->
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <!-- svelte-ignore a11y_interactive_supports_focus -->
      <div
        class="mljr-video-progress"
        role="slider"
        tabindex="-1"
        aria-label="Seek"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progressPct)}
        onclick={seek}
      >
        <div class="mljr-video-progress-buffered" style="width: {bufferedPct}%"></div>
        <div class="mljr-video-progress-fill" style="width: {progressPct}%"></div>
        <div class="mljr-video-progress-thumb" style="left: {progressPct}%"></div>
      </div>

      <!-- Bottom row -->
      <div class="mljr-video-controls-row">
        <!-- Play/Pause -->
        <button class="mljr-video-btn" onclick={togglePlay} aria-label={playing ? 'Pause' : 'Play'}>
          {#if playing}
            <!-- Pause icon -->
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16"/>
              <rect x="14" y="4" width="4" height="16"/>
            </svg>
          {:else}
            <!-- Play icon -->
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5,3 19,12 5,21"/>
            </svg>
          {/if}
        </button>

        <!-- Volume -->
        <div class="mljr-video-volume">
          <button class="mljr-video-btn" onclick={toggleMute} aria-label={muted ? 'Unmute' : 'Mute'}>
            {#if muted || volume === 0}
              <!-- Muted icon -->
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="11,5 6,9 2,9 2,15 6,15 11,19"/>
                <line x1="23" y1="9" x2="17" y2="15"/>
                <line x1="17" y1="9" x2="23" y2="15"/>
              </svg>
            {:else}
              <!-- Volume icon -->
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="11,5 6,9 2,9 2,15 6,15 11,19"/>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
              </svg>
            {/if}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={muted ? 0 : volume}
            class="mljr-video-volume-slider"
            aria-label="Volume"
            oninput={handleVolumeChange}
          />
        </div>

        <!-- Time display -->
        <span class="mljr-video-time">{timeDisplay}</span>

        <div class="mljr-video-spacer"></div>

        <!-- Fullscreen -->
        <button class="mljr-video-btn" onclick={toggleFullscreen} aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}>
          {#if isFullscreen}
            <!-- Compress icon -->
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/>
            </svg>
          {:else}
            <!-- Expand icon -->
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
            </svg>
          {/if}
        </button>
      </div>
    </div>
  {/if}
</div>
