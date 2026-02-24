<script lang="ts">
  interface Props {
    /** Latitude of the center point */
    lat?: number;
    /** Longitude of the center point */
    lon?: number;
    /** Zoom level (1-19) */
    zoom?: number;
    /** Search query (used when lat/lon are not provided) */
    query?: string;
    /** Map height */
    height?: string;
    /** Optional marker label overlay */
    label?: string;
    /** Show attribution */
    showAttribution?: boolean;
    /** Border radius variant */
    rounded?: 'default' | 'lg' | 'square';
    /** Additional CSS class */
    class?: string;
  }

  let {
    lat,
    lon,
    zoom = 13,
    query = '',
    height = '300px',
    label = '',
    showAttribution = true,
    rounded = 'default',
    class: className = '',
  }: Props = $props();

  let loaded = $state(false);

  const roundedClass: Record<string, string> = {
    default: '',
    lg: 'mljr-map-rounded',
    square: 'mljr-map-square',
  };

  const src = $derived(() => {
    const baseUrl = 'https://www.openstreetmap.org/export/embed.html';
    if (lat !== undefined && lon !== undefined) {
      const delta = 0.05 / Math.pow(2, zoom - 10);
      const bbox = `${lon - delta},${lat - delta},${lon + delta},${lat + delta}`;
      return `${baseUrl}?bbox=${bbox}&layer=mapnik&marker=${lat},${lon}`;
    }
    if (query) {
      return `https://www.openstreetmap.org/export/embed.html?query=${encodeURIComponent(query)}&layer=mapnik`;
    }
    // Default: world overview
    return `${baseUrl}?bbox=-180,-85,180,85&layer=mapnik`;
  });
</script>

<div
  class="mljr-map {roundedClass[rounded]} {className}"
  style="height: {height};"
>
  {#if !loaded}
    <div class="mljr-map-loading">
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
        <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
      </svg>
      <span>Loading map…</span>
    </div>
  {/if}

  <iframe
    src={src()}
    title={label || query || 'Map'}
    loading="lazy"
    allowfullscreen
    onload={() => { loaded = true; }}
    style={loaded ? '' : 'opacity: 0; pointer-events: none;'}
    aria-label={label || query || 'Embedded map'}
  ></iframe>

  {#if label && loaded}
    <div class="mljr-map-label">
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0Z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
      {label}
    </div>
  {/if}

  {#if showAttribution && loaded}
    <div class="mljr-map-attribution">© OpenStreetMap contributors</div>
  {/if}
</div>
