<script lang="ts">
  import { themeStore } from '../stores/theme.svelte';

  interface Props {
    pattern?: 'crosses' | 'dots' | 'lines' | 'none';
    opacity?: number;
    size?: number;
    gap?: number;
    spacing?: number; // Spacing between pattern elements - adds to background-size
    color?: string; // Custom color override
    lightColor?: string; // Light mode color
    darkColor?: string; // Dark mode color
    fixed?: boolean;
    class?: string;
  }

  let {
    pattern = 'crosses',
    opacity = 0.12,
    size = 32,
    gap = 0,
    spacing,
    color,
    lightColor,
    darkColor,
    fixed = true,
    class: className = '',
  }: Props = $props();

  // Use spacing if provided, otherwise fall back to gap
  const effectiveSpacing = $derived(spacing ?? gap);

  // Much lighter colors for better visibility
  const defaultLightColor = 'rgba(100, 60, 30, 0.25)';
  const defaultDarkColor = 'rgba(255, 200, 150, 0.45)';
  
  let patternColor = $derived(() => {
    if (color) return color;
    if (themeStore.isDark) {
      return darkColor ?? defaultDarkColor;
    }
    return lightColor ?? defaultLightColor;
  });

  // The actual tile size includes spacing for proper gaps between elements
  let tileSize = $derived(size + effectiveSpacing);

  // Pattern generation functions - elements are centered in the tile
  function generateCrossesPattern(): string {
    const halfSize = size / 2;
    const strokeWidth = Math.max(1.5, size / 16);
    const svg = `
      <svg width="${tileSize}" height="${tileSize}" xmlns="http://www.w3.org/2000/svg">
        <line x1="${tileSize / 2}" y1="${(tileSize - size) / 2}" x2="${tileSize / 2}" y2="${(tileSize + size) / 2}" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round"/>
        <line x1="${(tileSize - size) / 2}" y1="${tileSize / 2}" x2="${(tileSize + size) / 2}" y2="${tileSize / 2}" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round"/>
      </svg>
    `;
    return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
  }

  function generateDotsPattern(): string {
    const radius = Math.max(2, size / 8);
    const svg = `
      <svg width="${tileSize}" height="${tileSize}" xmlns="http://www.w3.org/2000/svg">
        <circle cx="${tileSize / 2}" cy="${tileSize / 2}" r="${radius}" fill="currentColor"/>
      </svg>
    `;
    return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
  }

  function generateLinesPattern(): string {
    const strokeWidth = Math.max(1, size / 24);
    const svg = `
      <svg width="${tileSize}" height="${tileSize}" xmlns="http://www.w3.org/2000/svg">
        <line x1="${(tileSize - size) / 2}" y1="${tileSize / 2}" x2="${(tileSize + size) / 2}" y2="${tileSize / 2}" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round"/>
      </svg>
    `;
    return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
  }

  let backgroundImage = $derived(() => {
    if (pattern === 'none') return 'none';
    if (pattern === 'crosses') return generateCrossesPattern();
    if (pattern === 'dots') return generateDotsPattern();
    if (pattern === 'lines') return generateLinesPattern();
    return 'none';
  });
</script>

{#if fixed}
  <div
    class="mljr-background {className}"
    class:mljr-background-fixed={true}
    style="--pattern-color: {patternColor()}; --background-image: {backgroundImage()}; --pattern-opacity: {opacity}; --pattern-size: {tileSize}px; --element-size: {size}px;"
    data-theme={themeStore.resolvedTheme}
  >
    <div class="mljr-background-pattern"></div>
  </div>
{:else}
  <div
    class="mljr-background {className}"
    class:mljr-background-relative={true}
    style="--pattern-color: {patternColor()}; --background-image: {backgroundImage()}; --pattern-opacity: {opacity}; --pattern-size: {tileSize}px; --element-size: {size}px;"
    data-theme={themeStore.resolvedTheme}
  >
    <div class="mljr-background-pattern"></div>
  </div>
{/if}

<style>
  .mljr-background {
    --pattern-color: rgba(100, 60, 30, 0.25);
    --background-image: none;
    --pattern-opacity: 0.12;
    --pattern-size: 32px;
    --element-size: 32px;
  }

  .mljr-background-fixed {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    z-index: -1;
    overflow: hidden;
  }

  .mljr-background-relative {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    overflow: hidden;
  }

  .mljr-background-pattern {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: var(--pattern-opacity);
    color: var(--pattern-color);
    background-image: var(--background-image);
    background-size: var(--pattern-size) var(--pattern-size);
    background-position: center;
    background-repeat: repeat;
  }

  /* Dark mode - ensure lighter colors */
  :global([data-theme="dark"] .mljr-background),
  :global(.dark .mljr-background) {
    --pattern-color: rgba(255, 200, 150, 0.45);
  }
</style>
