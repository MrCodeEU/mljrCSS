<script lang="ts">
  import { VideoPlayer } from '$lib';
  const src = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
</script>

<div class="mljr-space-y-8">
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Default Player</h3>
    <VideoPlayer {src} title="Big Buck Bunny" />
  </section>

  <section>
    <h3 class="mljr-h4 mljr-mb-4">No Source</h3>
    <VideoPlayer />
  </section>

  <section>
    <h3 class="mljr-h4 mljr-mb-4">Looping + Autoplay Muted</h3>
    <VideoPlayer {src} loop autoplay muted title="Looping" />
  </section>
</div>
