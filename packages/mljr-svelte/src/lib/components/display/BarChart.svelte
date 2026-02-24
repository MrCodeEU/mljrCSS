<script lang="ts">
  export interface BarChartDataset {
    label: string;
    data: number[];
    color?: string;
  }

  interface Props {
    /** Data labels (x-axis) */
    labels: string[];
    /** Datasets to display */
    datasets: BarChartDataset[];
    /** Chart title */
    title?: string;
    /** Y-axis label */
    yLabel?: string;
    /** Height of the chart area in px */
    height?: number;
    /** Whether to show grid lines */
    showGrid?: boolean;
    /** Whether to show values on bars */
    showValues?: boolean;
    /** Whether to show the legend */
    showLegend?: boolean;
    /** Number of y-axis ticks */
    yTicks?: number;
    /** Additional CSS class */
    class?: string;
  }

  let {
    labels,
    datasets,
    title,
    yLabel,
    height = 260,
    showGrid = true,
    showValues = false,
    showLegend = true,
    yTicks = 5,
    class: className = '',
  }: Props = $props();

  const defaultColors = [
    '#f97316', // primary orange
    '#14b8a6', // secondary teal
    '#a855f7', // accent purple
    '#3b82f6', // blue
    '#ef4444', // red
    '#84cc16', // lime
  ];

  const paddingLeft = 50;
  const paddingRight = 16;
  const paddingTop = 16;
  const paddingBottom = 40;

  let svgWidth = $state(500);
  let svgEl: SVGElement | undefined = $state();

  $effect(() => {
    if (!svgEl) return;
    const obs = new ResizeObserver(entries => {
      svgWidth = entries[0].contentRect.width || 500;
    });
    obs.observe(svgEl.parentElement!);
    svgWidth = svgEl.parentElement?.getBoundingClientRect().width ?? 500;
    return () => obs.disconnect();
  });

  const allValues = $derived(datasets.flatMap(d => d.data));
  const maxValue = $derived(Math.max(...allValues, 1));
  const minValue = $derived(Math.min(...allValues, 0));

  const chartWidth = $derived(svgWidth - paddingLeft - paddingRight);
  const chartHeight = $derived(height - paddingTop - paddingBottom);

  const yScale = $derived((v: number) => chartHeight - ((v - minValue) / (maxValue - minValue || 1)) * chartHeight);

  const yTickValues = $derived(
    Array.from({ length: yTicks + 1 }, (_, i) => {
      const raw = minValue + (i / yTicks) * (maxValue - minValue);
      return Math.round(raw * 10) / 10;
    })
  );

  const groupWidth = $derived(chartWidth / (labels.length || 1));
  const barWidth = $derived(Math.max(4, (groupWidth / (datasets.length + 1)) * 0.85));

  function formatValue(v: number): string {
    if (Math.abs(v) >= 1000) return `${(v / 1000).toFixed(1)}k`;
    return String(Math.round(v));
  }

  let tooltip = $state<{ x: number; y: number; label: string; value: number; dataset: string } | null>(null);
</script>

<div class="mljr-chart {className}">
  {#if title}
    <p class="mljr-chart-title">{title}</p>
  {/if}

  <div class="mljr-chart-container">
    <svg
      bind:this={svgEl}
      class="mljr-chart-svg"
      width="100%"
      height={height}
      viewBox="0 0 {svgWidth} {height}"
      role="img"
      aria-label={title ?? 'Bar chart'}
    >
      <!-- Y Axis label -->
      {#if yLabel}
        <text
          x={12}
          y={height / 2}
          transform="rotate(-90, 12, {height / 2})"
          class="mljr-chart-axis-label"
          text-anchor="middle"
        >
          {yLabel}
        </text>
      {/if}

      <!-- Grid lines & Y axis ticks -->
      {#each yTickValues as tick}
        {@const y = paddingTop + yScale(tick)}
        {#if showGrid}
          <line
            x1={paddingLeft}
            y1={y}
            x2={svgWidth - paddingRight}
            y2={y}
            class="mljr-chart-grid-line"
          />
        {/if}
        <text x={paddingLeft - 6} y={y + 4} class="mljr-chart-axis-label" text-anchor="end">
          {formatValue(tick)}
        </text>
      {/each}

      <!-- Bars -->
      {#each labels as label, gi}
        {@const groupX = paddingLeft + gi * groupWidth + groupWidth / 2}

        <!-- X axis label -->
        <text
          x={groupX}
          y={height - paddingBottom + 16}
          class="mljr-chart-axis-label"
          text-anchor="middle"
        >
          {label}
        </text>

        {#each datasets as ds, di}
          {@const color = ds.color ?? defaultColors[di % defaultColors.length]}
          {@const barX = groupX - (datasets.length * barWidth) / 2 + di * barWidth + di * 2}
          {@const barY = paddingTop + yScale(ds.data[gi] ?? 0)}
          {@const barH = chartHeight - yScale(ds.data[gi] ?? 0) + yScale(0)}

          <rect
            x={barX}
            y={barY}
            width={barWidth}
            height={Math.max(0, barH)}
            rx="3"
            style="fill: {color}; transition: opacity 0.2s;"
            onmouseenter={(e) => {
              tooltip = {
                x: barX + barWidth / 2,
                y: barY - 8,
                label,
                value: ds.data[gi] ?? 0,
                dataset: ds.label,
              };
            }}
            onmouseleave={() => tooltip = null}
            role="presentation"
          />

          {#if showValues}
            <text
              x={barX + barWidth / 2}
              y={barY - 4}
              class="mljr-chart-axis-label"
              text-anchor="middle"
              style="font-weight: 600;"
            >
              {formatValue(ds.data[gi] ?? 0)}
            </text>
          {/if}
        {/each}
      {/each}

      <!-- Axes -->
      <line x1={paddingLeft} y1={paddingTop} x2={paddingLeft} y2={height - paddingBottom} stroke="var(--mljr-border)" stroke-width="1" />
      <line x1={paddingLeft} y1={height - paddingBottom} x2={svgWidth - paddingRight} y2={height - paddingBottom} stroke="var(--mljr-border)" stroke-width="1" />
    </svg>

    <!-- SVG Tooltip (shown as HTML overlay) -->
    {#if tooltip}
      <div
        class="mljr-chart-tooltip"
        style="left: {(tooltip.x / svgWidth) * 100}%; top: {tooltip.y}px; transform: translateX(-50%);"
      >
        <div class="mljr-chart-tooltip-label">{tooltip.label}</div>
        {#if datasets.length > 1}
          <div style="color: var(--mljr-text-muted); font-size: 0.7rem;">{tooltip.dataset}</div>
        {/if}
        <div class="mljr-chart-tooltip-value">{formatValue(tooltip.value)}</div>
      </div>
    {/if}
  </div>

  <!-- Legend -->
  {#if showLegend && datasets.length > 1}
    <div class="mljr-chart-legend">
      {#each datasets as ds, i}
        <span class="mljr-chart-legend-item">
          <span
            class="mljr-chart-legend-dot"
            style="background: {ds.color ?? defaultColors[i % defaultColors.length]};"
          ></span>
          {ds.label}
        </span>
      {/each}
    </div>
  {/if}
</div>
