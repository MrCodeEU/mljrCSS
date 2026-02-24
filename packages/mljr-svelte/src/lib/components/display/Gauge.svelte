<script lang="ts">
  type Arc = 'full' | 'half';

  interface Props {
    value?: number;
    min?: number;
    max?: number;
    size?: number;
    thickness?: number;
    color?: string;
    trackColor?: string;
    label?: string;
    showValue?: boolean;
    unit?: string;
    arc?: Arc;
    animated?: boolean;
    class?: string;
  }

  let {
    value = 0,
    min = 0,
    max = 100,
    size = 200,
    thickness = 20,
    color,
    trackColor,
    label,
    showValue = true,
    unit,
    arc = 'half',
    animated = true,
    class: className = '',
  }: Props = $props();

  // Computed derived values
  let clampedValue = $derived(Math.min(max, Math.max(min, value)));
  let percentage = $derived((clampedValue - min) / (max - min || 1));

  // SVG geometry
  let cx = $derived(size / 2);
  let cy = $derived(size / 2);
  let r = $derived((size - thickness) / 2);
  let circumference = $derived(2 * Math.PI * r);

  // Arc angles: half = 180deg (bottom semicircle from left to right)
  // full = 270deg arc starting at 135deg
  let arcDeg = $derived(arc === 'half' ? 180 : 270);

  // Fraction of circumference used by the arc
  let arcFrac = $derived(arcDeg / 360);
  let trackLength = $derived(circumference * arcFrac);
  let gapLength = $derived(circumference - trackLength);

  // Fill length based on value
  let fillLength = $derived(trackLength * percentage);

  // Rotation: for half arc → start at 180deg (left)
  // For full arc → start at 135deg
  let startAngle = $derived(arc === 'half' ? 180 : 135);

  // CSS transition on stroke-dashoffset
  let dashoffset = $derived(trackLength - fillLength);

  let resolvedColor = $derived(color ?? '#f97316');
  let resolvedTrackColor = $derived(trackColor ?? 'currentColor');

  // Center text position
  let textY = $derived(arc === 'half' ? cy + 10 : cy + 10);
  let valueSize = $derived(Math.max(12, Math.round(size / 7)));
  let unitSize = $derived(Math.max(9, Math.round(size / 14)));
</script>

<div class="mljr-gauge {className}">
  <svg
    class="mljr-gauge-svg"
    width={size}
    height={arc === 'half' ? size / 2 + thickness : size}
    viewBox="0 0 {size} {arc === 'half' ? size / 2 + thickness : size}"
    role="img"
    aria-label="{label ?? 'Gauge'}: {clampedValue}{unit ?? ''}"
  >
    <!-- Track -->
    <circle
      class="mljr-gauge-track"
      cx={cx}
      cy={cy}
      r={r}
      stroke={resolvedTrackColor}
      stroke-width={thickness}
      stroke-dasharray="{trackLength} {gapLength}"
      stroke-dashoffset="0"
      transform="rotate({startAngle}, {cx}, {cy})"
    />

    <!-- Fill -->
    <circle
      class="mljr-gauge-fill"
      cx={cx}
      cy={cy}
      r={r}
      stroke={resolvedColor}
      stroke-width={thickness}
      stroke-dasharray="{trackLength} {gapLength}"
      stroke-dashoffset={dashoffset}
      transform="rotate({startAngle}, {cx}, {cy})"
      style={animated ? 'transition: stroke-dashoffset 0.6s cubic-bezier(0.4,0,0.2,1);' : ''}
    />

    <!-- Center text -->
    {#if showValue}
      <text
        x={cx}
        y={textY}
        text-anchor="middle"
        dominant-baseline="middle"
        font-family="var(--mljr-font-sans, sans-serif)"
        font-size={valueSize}
        font-weight="800"
        fill="var(--mljr-text, #1a1a1a)"
      >
        {clampedValue}{unit ?? ''}
      </text>
    {/if}
  </svg>

  {#if label}
    <div class="mljr-gauge-label">{label}</div>
  {/if}
</div>
