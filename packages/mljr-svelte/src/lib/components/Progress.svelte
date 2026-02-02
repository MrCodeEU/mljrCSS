<script lang="ts">
  interface Props {
    value?: number;
    max?: number;
    variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error';
    size?: 'sm' | 'md' | 'lg' | 'xl';
    indeterminate?: boolean;
    striped?: boolean;
    animated?: boolean;
    label?: string;
    showLabel?: boolean;
    showAccents?: boolean;
    class?: string;
  }

  let {
    value = 0,
    max = 100,
    variant = 'primary',
    size = 'md',
    indeterminate = false,
    striped = false,
    animated = false,
    label,
    showLabel = false,
    showAccents = true,
    class: className = '',
  }: Props = $props();

  const percentage = $derived(Math.min(100, Math.max(0, (value / max) * 100)));

  const progressClasses = $derived(
    [
      'mljr-progress',
      variant !== 'primary' && `mljr-progress-${variant}`,
      size !== 'md' && `mljr-progress-${size}`,
      indeterminate && 'mljr-progress-indeterminate',
      striped && 'mljr-progress-striped',
      animated && striped && 'mljr-progress-striped-animated',
      className,
    ]
      .filter(Boolean)
      .join(' ')
  );

  const containerClasses = $derived(
    showLabel ? 'mljr-progress-labeled' : ''
  );

  const ariaLabel = $derived(label || `Progress: ${Math.round(percentage)}%`);
</script>

{#if showLabel}
  <div class={containerClasses}>
    <div class="mljr-progress-wrapper">
      {#if showAccents}
        <span class="mljr-progress-accent-tl"></span>
        <span class="mljr-progress-accent-br"></span>
      {/if}
      <div
        class={progressClasses}
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={ariaLabel}
      >
        <div
          class="mljr-progress-bar"
          style:width={indeterminate ? undefined : `${percentage}%`}
        ></div>
      </div>
    </div>
    <span class="mljr-progress-label">{Math.round(percentage)}%</span>
  </div>
{:else}
  <div class="mljr-progress-wrapper">
    {#if showAccents}
      <span class="mljr-progress-accent-tl"></span>
      <span class="mljr-progress-accent-br"></span>
    {/if}
    <div
      class={progressClasses}
      role="progressbar"
      aria-valuenow={indeterminate ? undefined : value}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={ariaLabel}
    >
      <div
        class="mljr-progress-bar"
        style:width={indeterminate ? undefined : `${percentage}%`}
      ></div>
    </div>
  </div>
{/if}
