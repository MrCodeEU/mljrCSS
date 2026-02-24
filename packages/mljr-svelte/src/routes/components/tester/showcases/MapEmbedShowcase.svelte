<script lang="ts">
  import { MapEmbed } from '$lib';
</script>

<div class="mljr-space-y-8">
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Vienna, Austria (lat/lon coordinates)</h3>
    <MapEmbed
      lat={48.2082}
      lon={16.3738}
      zoom={13}
      label="Vienna City Center"
      height="300px"
    />
  </section>

  <section>
    <h3 class="mljr-h4 mljr-mb-4">Tall Map — St. Stephen's Cathedral</h3>
    <MapEmbed
      lat={48.2085}
      lon={16.3731}
      zoom={16}
      label="Stephansdom, Vienna"
      height="400px"
      rounded="lg"
    />
  </section>

  <section>
    <h3 class="mljr-h4 mljr-mb-4">Square Corners — Schönbrunn Palace</h3>
    <MapEmbed
      lat={48.1845}
      lon={16.3123}
      zoom={15}
      label="Schönbrunn Palace"
      height="250px"
      rounded="square"
    />
  </section>

  <section>
    <h3 class="mljr-h4 mljr-mb-4">No Attribution</h3>
    <MapEmbed
      lat={48.2082}
      lon={16.3738}
      zoom={12}
      height="200px"
      showAttribution={false}
    />
  </section>

  <section>
    <h3 class="mljr-h4 mljr-mb-4">World Overview (no coordinates)</h3>
    <MapEmbed height="250px" />
  </section>
</div>
