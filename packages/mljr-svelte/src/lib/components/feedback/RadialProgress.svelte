<script lang="ts">
  type RadialProgressSize = 'sm' | 'md' | 'lg' | 'xl';
  type RadialProgressVariant = 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error';

  interface Props {
    /** Progress value (0-100) */
    value: number;
    /** Maximum value */
    max?: number;
    /** Size variant */
    size?: RadialProgressSize;
    /** Color variant */
    variant?: RadialProgressVariant;
    /** Stroke width */
    strokeWidth?: number;
    /** Show label */
    showLabel?: boolean;
    /** Custom label */
    label?: string;
    /** Additional CSS class */
    class?: string;
  }

  let {
    value = 0,
    max = 100,
    size = 'md',
    variant = 'primary',
    strokeWidth = 8,
    showLabel = true,
    label,
    class: className = '',
  }: Props = $props();

  const sizeMap: Record<RadialProgressSize, { radius: number; size: number }> = {
    sm: { radius: 36, size: 80 },
    md: { radius: 54, size: 120 },
    lg: { radius: 72, size: 160 },
    xl: { radius: 90, size: 200 },
  };

  let config = $derived(sizeMap[size]);
  let percentage = $derived(Math.min(Math.max((value / max) * 100, 0), 100));
  let circumference = $derived(2 * Math.PI * config.radius);
  let offset = $derived(circumference - (percentage / 100) * circumference);

  const variantClasses: Record<RadialProgressVariant, string> = {
    primary: 'mljr-radial-progress-primary',
    secondary: 'mljr-radial-progress-secondary',
    accent: 'mljr-radial-progress-accent',
    success: 'mljr-radial-progress-success',
    warning: 'mljr-radial-progress-warning',
    error: 'mljr-radial-progress-error',
  };

  let containerClasses = $derived(
    ['mljr-radial-progress', `mljr-radial-progress-${size}`, variantClasses[variant], className]
      .filter(Boolean)
      .join(' ')
  );
</script>

<div class={containerClasses} style="width: {config.size}px; height: {config.size}px;">
  <svg
    width={config.size}
    height={config.size}
    viewBox="0 0 {config.size} {config.size}"
    class="mljr-radial-progress-svg"
  >
    <!-- Background circle -->
    <circle
      cx={config.size / 2}
      cy={config.size / 2}
      r={config.radius}
      stroke-width={strokeWidth}
      class="mljr-radial-progress-bg"
      fill="none"
    />

    <!-- Progress circle -->
    <circle
      cx={config.size / 2}
      cy={config.size / 2}
      r={config.radius}
      stroke-width={strokeWidth}
      stroke-dasharray={circumference}
      stroke-dashoffset={offset}
      stroke-linecap="round"
      class="mljr-radial-progress-circle"
      fill="none"
      style="transform: rotate(-90deg); transform-origin: center;"
    />
  </svg>

  {#if showLabel}
    <div class="mljr-radial-progress-label">
      {#if label}
        {label}
      {:else}
        <span class="mljr-radial-progress-value">{Math.round(percentage)}</span>
        <span class="mljr-radial-progress-unit">%</span>
      {/if}
    </div>
  {/if}
</div>

<style>
  .mljr-radial-progress {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .mljr-radial-progress-svg {
    position: absolute;
    top: 0;
    left: 0;
  }

  .mljr-radial-progress-bg {
    stroke: var(--mljr-border);
    opacity: 0.2;
  }

  .mljr-radial-progress-circle {
    transition: stroke-dashoffset var(--mljr-transition-normal) ease-in-out;
  }

  .mljr-radial-progress-label {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    text-align: center;
  }

  .mljr-radial-progress-value {
    font-size: 1.5rem;
    line-height: 1;
  }

  .mljr-radial-progress-unit {
    font-size: 0.875rem;
    opacity: 0.7;
    margin-top: 0.125rem;
  }

  /* Size variants */
  .mljr-radial-progress-sm .mljr-radial-progress-value {
    font-size: 1rem;
  }

  .mljr-radial-progress-sm .mljr-radial-progress-unit {
    font-size: 0.75rem;
  }

  .mljr-radial-progress-lg .mljr-radial-progress-value {
    font-size: 2rem;
  }

  .mljr-radial-progress-lg .mljr-radial-progress-unit {
    font-size: 1rem;
  }

  .mljr-radial-progress-xl .mljr-radial-progress-value {
    font-size: 2.5rem;
  }

  .mljr-radial-progress-xl .mljr-radial-progress-unit {
    font-size: 1.25rem;
  }

  /* Color variants */
  .mljr-radial-progress-primary .mljr-radial-progress-circle {
    stroke: var(--mljr-primary-600);
  }

  .mljr-radial-progress-primary .mljr-radial-progress-label {
    color: var(--mljr-primary-700);
  }

  .mljr-radial-progress-secondary .mljr-radial-progress-circle {
    stroke: var(--mljr-secondary-600);
  }

  .mljr-radial-progress-secondary .mljr-radial-progress-label {
    color: var(--mljr-secondary-700);
  }

  .mljr-radial-progress-accent .mljr-radial-progress-circle {
    stroke: var(--mljr-accent-600);
  }

  .mljr-radial-progress-accent .mljr-radial-progress-label {
    color: var(--mljr-accent-700);
  }

  .mljr-radial-progress-success .mljr-radial-progress-circle {
    stroke: var(--mljr-success-600);
  }

  .mljr-radial-progress-success .mljr-radial-progress-label {
    color: var(--mljr-success-700);
  }

  .mljr-radial-progress-warning .mljr-radial-progress-circle {
    stroke: var(--mljr-warning-600);
  }

  .mljr-radial-progress-warning .mljr-radial-progress-label {
    color: var(--mljr-warning-700);
  }

  .mljr-radial-progress-error .mljr-radial-progress-circle {
    stroke: var(--mljr-error-600);
  }

  .mljr-radial-progress-error .mljr-radial-progress-label {
    color: var(--mljr-error-700);
  }
</style>
