<script lang="ts">
  import { VideoPlayer } from '$lib';
  import CodeExample from '$lib/components/CodeExample.svelte';

  // Public domain / Creative Commons sample videos
  const sampleSrc = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
  const posterUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Camponotus_flavomarginatus_ant.jpg/320px-Camponotus_flavomarginatus_ant.jpg';
</script>

<div class="mljr-space-y-8">
  <!-- Default player -->
  <div>
    <h3 class="mljr-h5 mljr-mb-4">Default Player</h3>
    <VideoPlayer
      src={sampleSrc}
      title="Big Buck Bunny"
    />
    <CodeExample code={`<VideoPlayer src="video.mp4" title="My Video" />`} />
  </div>

  <!-- No src (error/empty state) -->
  <div>
    <h3 class="mljr-h5 mljr-mb-4">Empty State (no source)</h3>
    <VideoPlayer />
    <CodeExample code={`<VideoPlayer />`} />
  </div>

  <!-- With poster -->
  <div>
    <h3 class="mljr-h5 mljr-mb-4">With Poster Image</h3>
    <VideoPlayer
      src={sampleSrc}
      poster={posterUrl}
      title="Video with poster"
    />
    <CodeExample code={`<VideoPlayer src="video.mp4" poster="poster.jpg" title="My Video" />`} />
  </div>

  <!-- Looping -->
  <div>
    <h3 class="mljr-h5 mljr-mb-4">Looping + Autoplay Muted</h3>
    <VideoPlayer
      src={sampleSrc}
      loop
      autoplay
      muted
      title="Looping video"
    />
    <CodeExample code={`<VideoPlayer src="video.mp4" loop autoplay muted />`} />
  </div>

  <!-- Keyboard shortcuts info -->
  <div class="mljr-alert mljr-alert-info">
    <strong>Keyboard shortcuts:</strong> Space/K = play/pause · ← → = seek ±5s · M = mute · F = fullscreen
  </div>
</div>
