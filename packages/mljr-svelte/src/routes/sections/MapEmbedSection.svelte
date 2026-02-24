<script lang="ts">
  import { MapEmbed } from '$lib';
  import CodeExample from '$lib/components/CodeExample.svelte';
</script>

<div class="mljr-space-y-8">
  <!-- Default location (Paris) -->
  <div>
    <h3 class="mljr-h5 mljr-mb-4">Specific Location (Paris)</h3>
    <MapEmbed lat={48.8566} lon={2.3522} zoom={13} label="Paris, France" height="300px" />
    <CodeExample code={`<MapEmbed lat={48.8566} lon={2.3522} zoom={13} label="Paris, France" />`} />
  </div>

  <!-- Different zoom levels -->
  <div>
    <h3 class="mljr-h5 mljr-mb-4">Zoom Levels</h3>
    <div class="mljr-grid mljr-grid-cols-1 md:mljr-grid-cols-2 mljr-gap-4">
      <div>
        <p class="mljr-text-sm mljr-text-muted mljr-mb-2">City view (zoom 12)</p>
        <MapEmbed lat={51.5074} lon={-0.1278} zoom={12} label="London" height="220px" />
      </div>
      <div>
        <p class="mljr-text-sm mljr-text-muted mljr-mb-2">Street view (zoom 16)</p>
        <MapEmbed lat={51.5074} lon={-0.1278} zoom={16} label="London (close)" height="220px" />
      </div>
    </div>
    <CodeExample code={`<!-- City view -->
<MapEmbed lat={51.5074} lon={-0.1278} zoom={12} />

<!-- Street view -->
<MapEmbed lat={51.5074} lon={-0.1278} zoom={16} />`} />
  </div>

  <!-- Tokyo -->
  <div>
    <h3 class="mljr-h5 mljr-mb-4">Another Location (Tokyo)</h3>
    <MapEmbed lat={35.6762} lon={139.6503} zoom={12} label="Tokyo, Japan" height="300px" />
    <CodeExample code={`<MapEmbed lat={35.6762} lon={139.6503} zoom={12} label="Tokyo, Japan" />`} />
  </div>

  <!-- Different height -->
  <div>
    <h3 class="mljr-h5 mljr-mb-4">Tall Map</h3>
    <MapEmbed lat={40.7128} lon={-74.006} zoom={13} label="New York City" height="450px" />
    <CodeExample code={`<MapEmbed lat={40.7128} lon={-74.006} zoom={13} height="450px" />`} />
  </div>

  <!-- Rounded variants -->
  <div>
    <h3 class="mljr-h5 mljr-mb-4">Rounded Variants</h3>
    <div class="mljr-space-y-4">
      <div>
        <p class="mljr-text-sm mljr-text-muted mljr-mb-2">Default (radius-md)</p>
        <MapEmbed lat={48.2082} lon={16.3738} zoom={13} height="200px" label="Vienna" />
      </div>
      <div>
        <p class="mljr-text-sm mljr-text-muted mljr-mb-2">Large rounded</p>
        <MapEmbed lat={48.2082} lon={16.3738} zoom={13} height="200px" label="Vienna" rounded="lg" />
      </div>
      <div>
        <p class="mljr-text-sm mljr-text-muted mljr-mb-2">Square (no radius)</p>
        <MapEmbed lat={48.2082} lon={16.3738} zoom={13} height="200px" label="Vienna" rounded="square" />
      </div>
    </div>
    <CodeExample code={`<MapEmbed rounded="default" />  <!-- default -->
<MapEmbed rounded="lg" />
<MapEmbed rounded="square" />`} />
  </div>

  <!-- No label / no attribution -->
  <div>
    <h3 class="mljr-h5 mljr-mb-4">Minimal (no label or attribution)</h3>
    <MapEmbed lat={48.8566} lon={2.3522} zoom={12} showAttribution={false} height="250px" />
    <CodeExample code={`<MapEmbed lat={48.8566} lon={2.3522} showAttribution={false} />`} />
  </div>

  <div class="mljr-alert mljr-alert-info">
    Maps are powered by <strong>OpenStreetMap</strong> — free, open-source, no API key required.
    Map data © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener" class="mljr-link">OpenStreetMap contributors</a>.
  </div>
</div>
