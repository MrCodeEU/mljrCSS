<script lang="ts">
  export interface DonutChartSegment {
    label: string;
    value: number;
    color?: string;
  }

  interface Props {
    /** Chart segments */
    segments: DonutChartSegment[];
    /** Chart title */
    title?: string;
    /** Total label in center (auto-computed if not set) */
    centerLabel?: string;
    /** Subtitle in center */
    centerSubLabel?: string;
    /** Size in pixels */
    size?: number;
    /** Donut thickness (0–1) */
    thickness?: number;
    /** Whether to show legend */
    showLegend?: boolean;
    /** Whether to show values in legend */
    showValues?: boolean;
    /** Whether to show percentages in legend */
    showPercents?: boolean;
    /** Additional CSS class */
    class?: string;
  }

  let {
    segments,
    title,
    centerLabel,
    centerSubLabel,
    size = 200,
    thickness = 0.55,
    showLegend = true,
    showValues = true,
    showPercents = false,
    class: className = '',
  }: Props = $props();

  const defaultColors = [
    '#f97316', '#14b8a6', '#a855f7', '#3b82f6', '#ef4444', '#84cc16',
    '#f59e0b', '#06b6d4', '#8b5cf6', '#10b981',
  ];

  const cx = $derived(size / 2);
  const cy = $derived(size / 2);
  const r = $derived(size / 2 - 4);
  const innerR = $derived(r * thickness);

  const total = $derived(segments.reduce((s, seg) => s + seg.value, 0));

  const computedSegments = $derived(() => {
    let angle = -Math.PI / 2; // Start from top
    return segments.map((seg, i) => {
      const fraction = total > 0 ? seg.value / total : 0;
      const startAngle = angle;
      angle += fraction * Math.PI * 2;
      return {
        ...seg,
        color: seg.color ?? defaultColors[i % defaultColors.length],
        fraction,
        startAngle,
        endAngle: angle,
      };
    });
  });

  function polarToCartesian(cx: number, cy: number, r: number, angle: number) {
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
    };
  }

  function buildArcPath(startAngle: number, endAngle: number, outerR: number, innerR: number): string {
    const angleDiff = endAngle - startAngle;
    const largeArc = angleDiff > Math.PI ? 1 : 0;

    const outerStart = polarToCartesian(cx, cy, outerR, startAngle);
    const outerEnd = polarToCartesian(cx, cy, outerR, endAngle);
    const innerStart = polarToCartesian(cx, cy, innerR, endAngle);
    const innerEnd = polarToCartesian(cx, cy, innerR, startAngle);

    return [
      `M ${outerStart.x} ${outerStart.y}`,
      `A ${outerR} ${outerR} 0 ${largeArc} 1 ${outerEnd.x} ${outerEnd.y}`,
      `L ${innerStart.x} ${innerStart.y}`,
      `A ${innerR} ${innerR} 0 ${largeArc} 0 ${innerEnd.x} ${innerEnd.y}`,
      'Z',
    ].join(' ');
  }

  function formatValue(v: number): string {
    if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`;
    if (v >= 1000) return `${(v / 1000).toFixed(1)}k`;
    return String(Math.round(v * 10) / 10);
  }

  const displayCenter = $derived(centerLabel ?? formatValue(total));
  let hoveredIndex = $state<number | null>(null);
</script>

<div class="mljr-chart {className}">
  {#if title}
    <p class="mljr-chart-title">{title}</p>
  {/if}

  <div style="display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap;">
    <!-- SVG Donut -->
    <svg
      width={size}
      height={size}
      viewBox="0 0 {size} {size}"
      role="img"
      aria-label={title ?? 'Donut chart'}
      style="flex-shrink: 0;"
    >
      {#if segments.length === 0}
        <!-- Empty circle -->
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--mljr-border)" stroke-width={r - innerR} />
      {:else}
        {#each computedSegments() as seg, i}
          <path
            d={buildArcPath(seg.startAngle, seg.endAngle, r, innerR)}
            fill={seg.color}
            class="mljr-chart-donut-segment"
            opacity={hoveredIndex !== null && hoveredIndex !== i ? 0.6 : 1}
            onmouseenter={() => hoveredIndex = i}
            onmouseleave={() => hoveredIndex = null}
            role="presentation"
          >
            <title>{seg.label}: {formatValue(seg.value)} ({(seg.fraction * 100).toFixed(1)}%)</title>
          </path>
        {/each}
      {/if}

      <!-- Center text -->
      <text x={cx} y={cy - 8} class="mljr-chart-donut-label" style="font-size: {size * 0.1}px;">
        {hoveredIndex !== null ? formatValue(computedSegments()[hoveredIndex]?.value ?? 0) : displayCenter}
      </text>
      <text x={cx} y={cy + size * 0.08} class="mljr-chart-donut-sublabel" style="font-size: {size * 0.065}px;">
        {hoveredIndex !== null
          ? `${(computedSegments()[hoveredIndex]?.fraction * 100).toFixed(1)}%`
          : (centerSubLabel ?? 'Total')}
      </text>
    </svg>

    <!-- Legend -->
    {#if showLegend}
      <div class="mljr-chart-legend" style="flex-direction: column; gap: 0.5rem;">
        {#each computedSegments() as seg, i}
          <!-- svelte-ignore a11y_no_static_element_interactions -->
          <span
            class="mljr-chart-legend-item"
            role="button"
            tabindex={i}
            style="opacity: {hoveredIndex !== null && hoveredIndex !== i ? 0.5 : 1}; transition: opacity 0.2s;"
            onmouseenter={() => hoveredIndex = i}
            onmouseleave={() => hoveredIndex = null}
          >
            <span class="mljr-chart-legend-dot" style="background: {seg.color};"></span>
            <span style="color: var(--mljr-text);">{seg.label}</span>
            {#if showValues}
              <span style="margin-left: auto; color: var(--mljr-text-muted); font-weight: 500;">{formatValue(seg.value)}</span>
            {/if}
            {#if showPercents}
              <span style="color: var(--mljr-text-muted); font-size: 0.7rem;">({(seg.fraction * 100).toFixed(1)}%)</span>
            {/if}
          </span>
        {/each}
      </div>
    {/if}
  </div>
</div>
