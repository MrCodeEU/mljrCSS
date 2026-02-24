<script lang="ts">
  export interface LineChartDataset {
    label: string;
    data: number[];
    color?: string;
    filled?: boolean;
  }

  interface Props {
    /** Data labels (x-axis) */
    labels: string[];
    /** Datasets to display */
    datasets: LineChartDataset[];
    /** Chart title */
    title?: string;
    /** Height of the chart area in px */
    height?: number;
    /** Whether to show grid lines */
    showGrid?: boolean;
    /** Whether to show data points */
    showPoints?: boolean;
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
    height = 260,
    showGrid = true,
    showPoints = true,
    showLegend = true,
    yTicks = 5,
    class: className = '',
  }: Props = $props();

  const defaultColors = [
    '#f97316', '#14b8a6', '#a855f7', '#3b82f6', '#ef4444', '#84cc16',
  ];

  const paddingLeft = 50;
  const paddingRight = 16;
  const paddingTop = 20;
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
  const minValue = $derived(Math.min(0, ...allValues));

  const chartWidth = $derived(svgWidth - paddingLeft - paddingRight);
  const chartHeight = $derived(height - paddingTop - paddingBottom);

  function xPos(i: number): number {
    return paddingLeft + (i / Math.max(labels.length - 1, 1)) * chartWidth;
  }

  function yPos(v: number): number {
    return paddingTop + chartHeight - ((v - minValue) / (maxValue - minValue || 1)) * chartHeight;
  }

  const yTickValues = $derived(
    Array.from({ length: yTicks + 1 }, (_, i) => {
      const raw = minValue + (i / yTicks) * (maxValue - minValue);
      return Math.round(raw * 10) / 10;
    })
  );

  function buildPath(data: number[]): string {
    return data
      .map((v, i) => `${i === 0 ? 'M' : 'L'}${xPos(i)},${yPos(v)}`)
      .join(' ');
  }

  function buildArea(data: number[]): string {
    const baseLine = yPos(0);
    const linePart = buildPath(data);
    const lastX = xPos(data.length - 1);
    const firstX = xPos(0);
    return `${linePart} L${lastX},${baseLine} L${firstX},${baseLine} Z`;
  }

  function formatValue(v: number): string {
    if (Math.abs(v) >= 1000) return `${(v / 1000).toFixed(1)}k`;
    return String(Math.round(v));
  }

  let tooltip = $state<{ x: number; y: number; label: string; items: { label: string; value: number; color: string }[] } | null>(null);

  function handlePointHover(i: number, e: MouseEvent) {
    tooltip = {
      x: xPos(i),
      y: Math.min(...datasets.map(ds => yPos(ds.data[i] ?? 0))) - 10,
      label: labels[i] ?? '',
      items: datasets.map((ds, di) => ({
        label: ds.label,
        value: ds.data[i] ?? 0,
        color: ds.color ?? defaultColors[di % defaultColors.length],
      })),
    };
  }
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
      aria-label={title ?? 'Line chart'}
    >
      <!-- Grid lines & Y ticks -->
      {#each yTickValues as tick}
        {@const y = yPos(tick)}
        {#if showGrid}
          <line x1={paddingLeft} y1={y} x2={svgWidth - paddingRight} y2={y} class="mljr-chart-grid-line" />
        {/if}
        <text x={paddingLeft - 6} y={y + 4} class="mljr-chart-axis-label" text-anchor="end">
          {formatValue(tick)}
        </text>
      {/each}

      <!-- X axis labels -->
      {#each labels as label, i}
        <text
          x={xPos(i)}
          y={height - paddingBottom + 16}
          class="mljr-chart-axis-label"
          text-anchor="middle"
        >
          {label}
        </text>
      {/each}

      <!-- Area fills (rendered before lines) -->
      {#each datasets as ds, di}
        {#if ds.filled}
          {@const color = ds.color ?? defaultColors[di % defaultColors.length]}
          <path
            d={buildArea(ds.data)}
            fill={color}
            opacity="0.15"
          />
        {/if}
      {/each}

      <!-- Lines -->
      {#each datasets as ds, di}
        {@const color = ds.color ?? defaultColors[di % defaultColors.length]}
        <path
          d={buildPath(ds.data)}
          fill="none"
          stroke={color}
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      {/each}

      <!-- Data points -->
      {#if showPoints}
        {#each labels as _, i}
          <!-- Invisible hover area -->
          <rect
            x={xPos(i) - 16}
            y={paddingTop}
            width={32}
            height={chartHeight}
            fill="transparent"
            onmouseenter={(e) => handlePointHover(i, e)}
            onmouseleave={() => tooltip = null}
            role="presentation"
          />
          {#each datasets as ds, di}
            {@const color = ds.color ?? defaultColors[di % defaultColors.length]}
            <circle
              cx={xPos(i)}
              cy={yPos(ds.data[i] ?? 0)}
              r={4}
              fill="white"
              stroke={color}
              stroke-width="2"
            />
          {/each}
        {/each}
      {/if}

      <!-- Axes -->
      <line x1={paddingLeft} y1={paddingTop} x2={paddingLeft} y2={height - paddingBottom} stroke="var(--mljr-border)" stroke-width="1" />
      <line x1={paddingLeft} y1={height - paddingBottom} x2={svgWidth - paddingRight} y2={height - paddingBottom} stroke="var(--mljr-border)" stroke-width="1" />
    </svg>

    {#if tooltip}
      <div
        class="mljr-chart-tooltip"
        style="left: {(tooltip.x / svgWidth) * 100}%; top: {tooltip.y}px; transform: translateX(-50%);"
      >
        <div class="mljr-chart-tooltip-label">{tooltip.label}</div>
        {#each tooltip.items as item}
          <div style="display: flex; align-items: center; gap: 0.375rem;">
            {#if tooltip.items.length > 1}
              <span style="width: 8px; height: 8px; border-radius: 50%; background: {item.color}; flex-shrink: 0;"></span>
              <span style="color: var(--mljr-text-muted); font-size: 0.7rem;">{item.label}:</span>
            {/if}
            <span class="mljr-chart-tooltip-value">{formatValue(item.value)}</span>
          </div>
        {/each}
      </div>
    {/if}
  </div>

  {#if showLegend && datasets.length > 1}
    <div class="mljr-chart-legend">
      {#each datasets as ds, i}
        <span class="mljr-chart-legend-item">
          <span class="mljr-chart-legend-dot" style="background: {ds.color ?? defaultColors[i % defaultColors.length]};"></span>
          {ds.label}
        </span>
      {/each}
    </div>
  {/if}
</div>
