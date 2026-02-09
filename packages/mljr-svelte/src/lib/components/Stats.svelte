<script lang="ts">
  type Trend = 'up' | 'down' | 'neutral';
  type Variant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';

  interface Props {
    label: string;
    value: string | number;
    description?: string;
    trend?: Trend;
    trendValue?: string;
    icon?: string;
    variant?: Variant;
    class?: string;
  }

  let {
    label,
    value,
    description = '',
    trend,
    trendValue = '',
    icon = '',
    variant = 'default',
    class: className = '',
  }: Props = $props();

  const variantClasses: Record<Variant, string> = {
    default: '',
    primary: 'mljr-stats-primary',
    secondary: 'mljr-stats-secondary',
    success: 'mljr-stats-success',
    warning: 'mljr-stats-warning',
    error: 'mljr-stats-error',
  };

  let statsClasses = $derived(
    ['mljr-stats', variantClasses[variant], className]
      .filter(Boolean)
      .join(' ')
  );
</script>

<div class={statsClasses}>
  {#if icon}
    <div class="mljr-stats-icon">
      {@html icon}
    </div>
  {/if}

  <div class="mljr-stats-content">
    <span class="mljr-stats-label">{label}</span>
    <span class="mljr-stats-value">{value}</span>

    {#if description || trend}
      <div class="mljr-stats-footer">
        {#if trend}
          <span class="mljr-stats-trend mljr-stats-trend-{trend}">
            {#if trend === 'up'}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                <polyline points="17 6 23 6 23 12"></polyline>
              </svg>
            {:else if trend === 'down'}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline>
                <polyline points="17 18 23 18 23 12"></polyline>
              </svg>
            {/if}
            {#if trendValue}
              <span>{trendValue}</span>
            {/if}
          </span>
        {/if}
        {#if description}
          <span class="mljr-stats-description">{description}</span>
        {/if}
      </div>
    {/if}
  </div>
</div>

<style>
  .mljr-stats {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: var(--mljr-space-5);
    background: var(--mljr-frosted-bg);
    border-radius: var(--mljr-radius-xl);
    box-shadow: var(--mljr-clay-shadow);
  }

  .mljr-stats-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    background: var(--mljr-gradient-primary);
    border-radius: var(--mljr-radius-lg);
    color: white;
    flex-shrink: 0;
  }

  .mljr-stats-primary .mljr-stats-icon {
    background: var(--mljr-gradient-primary);
  }

  .mljr-stats-secondary .mljr-stats-icon {
    background: var(--mljr-gradient-secondary);
  }

  .mljr-stats-success .mljr-stats-icon {
    background: var(--mljr-success);
  }

  .mljr-stats-warning .mljr-stats-icon {
    background: var(--mljr-warning);
  }

  .mljr-stats-error .mljr-stats-icon {
    background: var(--mljr-error);
  }

  .mljr-stats-content {
    flex: 1;
    min-width: 0;
  }

  .mljr-stats-label {
    display: block;
    font-size: var(--mljr-text-sm);
    color: var(--mljr-text-secondary);
    margin-bottom: 0.25rem;
  }

  .mljr-stats-value {
    display: block;
    font-size: var(--mljr-text-2xl);
    font-weight: 700;
    color: var(--mljr-text);
    line-height: 1.2;
  }

  .mljr-stats-footer {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.5rem;
    font-size: var(--mljr-text-sm);
  }

  .mljr-stats-trend {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    font-weight: 500;
  }

  .mljr-stats-trend-up {
    color: var(--mljr-success);
  }

  .mljr-stats-trend-down {
    color: var(--mljr-error);
  }

  .mljr-stats-trend-neutral {
    color: var(--mljr-text-muted);
  }

  .mljr-stats-description {
    color: var(--mljr-text-muted);
  }
</style>
