<script lang="ts">
  import { themeStore } from '../../stores/theme.svelte';

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
    opacity = 0.2,
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

  const defaultLightColor = '#3d1a06';
  const defaultDarkColor = '#ffe8c8';

  // Plain $derived value — Svelte tracks themeStore.isDark directly so
  // backgroundImage re-computes whenever the theme changes.
  let patternColor = $derived(
    color ?? (themeStore.isDark ? (darkColor ?? defaultDarkColor) : (lightColor ?? defaultLightColor))
  );

  // The actual tile size includes spacing for proper gaps between elements
  let tileSize = $derived(size + effectiveSpacing);

  // Pattern generation functions - color is baked directly into the SVG because
  // data URI background-images are isolated from the CSS cascade (currentColor won't work).
  function generateCrossesPattern(col: string): string {
    const strokeWidth = Math.max(1.5, size / 16);
    const svg = `<svg width="${tileSize}" height="${tileSize}" xmlns="http://www.w3.org/2000/svg"><line x1="${tileSize / 2}" y1="${(tileSize - size) / 2}" x2="${tileSize / 2}" y2="${(tileSize + size) / 2}" stroke="${col}" stroke-width="${strokeWidth}" stroke-linecap="round"/><line x1="${(tileSize - size) / 2}" y1="${tileSize / 2}" x2="${(tileSize + size) / 2}" y2="${tileSize / 2}" stroke="${col}" stroke-width="${strokeWidth}" stroke-linecap="round"/></svg>`;
    return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
  }

  function generateDotsPattern(col: string): string {
    const radius = Math.max(2, size / 8);
    const svg = `<svg width="${tileSize}" height="${tileSize}" xmlns="http://www.w3.org/2000/svg"><circle cx="${tileSize / 2}" cy="${tileSize / 2}" r="${radius}" fill="${col}"/></svg>`;
    return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
  }

  function generateLinesPattern(col: string): string {
    const strokeWidth = Math.max(1, size / 24);
    const svg = `<svg width="${tileSize}" height="${tileSize}" xmlns="http://www.w3.org/2000/svg"><line x1="${(tileSize - size) / 2}" y1="${tileSize / 2}" x2="${(tileSize + size) / 2}" y2="${tileSize / 2}" stroke="${col}" stroke-width="${strokeWidth}" stroke-linecap="round"/></svg>`;
    return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
  }

  let backgroundImage = $derived.by(() => {
    if (pattern === 'none') return 'none';
    if (pattern === 'crosses') return generateCrossesPattern(patternColor);
    if (pattern === 'dots') return generateDotsPattern(patternColor);
    if (pattern === 'lines') return generateLinesPattern(patternColor);
    return 'none';
  });
</script>

{#if fixed}
  <div
    class="mljr-background {className}"
    class:mljr-background-fixed={true}
    style="--pattern-color: {patternColor}; --background-image: {backgroundImage}; --pattern-opacity: {opacity}; --pattern-size: {tileSize}px; --element-size: {size}px;"
    data-theme={themeStore.resolvedTheme}
  >
    <div class="mljr-background-pattern"></div>
  </div>
{:else}
  <div
    class="mljr-background {className}"
    class:mljr-background-relative={true}
    style="--pattern-color: {patternColor}; --background-image: {backgroundImage}; --pattern-opacity: {opacity}; --pattern-size: {tileSize}px; --element-size: {size}px;"
    data-theme={themeStore.resolvedTheme}
  >
    <div class="mljr-background-pattern"></div>
  </div>
{/if}

<style>
  .mljr-background {
    --pattern-color: #3d1a06;
    --background-image: none;
    --pattern-opacity: 0.2;
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
    background-image: var(--background-image);
    background-size: var(--pattern-size) var(--pattern-size);
    background-position: center;
    background-repeat: repeat;
  }
</style>
