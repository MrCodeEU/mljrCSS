<script lang="ts">
  interface Props {
    /** Target date/time to count down to */
    targetDate: Date | string;
    /** Variant style */
    variant?: 'default' | 'compact' | 'card' | 'minimal';
    /** Show labels for time units */
    showLabels?: boolean;
    /** Custom labels for time units */
    labels?: {
      days?: string;
      hours?: string;
      minutes?: string;
      seconds?: string;
    };
    /** Show specific units */
    showDays?: boolean;
    showHours?: boolean;
    showMinutes?: boolean;
    showSeconds?: boolean;
    /** Callback when countdown reaches zero */
    onComplete?: () => void;
    /** Message to show when countdown completes */
    completeMessage?: string;
    /** Additional CSS classes */
    class?: string;
  }

  let {
    targetDate,
    variant = 'default',
    showLabels = true,
    labels = {},
    showDays = true,
    showHours = true,
    showMinutes = true,
    showSeconds = true,
    onComplete,
    completeMessage = 'Time\'s up!',
    class: className = '',
  }: Props = $props();

  let timeRemaining = $state({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    total: 0,
  });

  let completed = $state(false);

  let defaultLabels = $derived({
    days: labels.days || 'Days',
    hours: labels.hours || 'Hours',
    minutes: labels.minutes || 'Minutes',
    seconds: labels.seconds || 'Seconds',
  });

  function calculateTimeRemaining() {
    const target = typeof targetDate === 'string' ? new Date(targetDate) : targetDate;
    const now = new Date();
    const total = target.getTime() - now.getTime();

    if (total <= 0) {
      if (!completed) {
        completed = true;
        onComplete?.();
      }
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        total: 0,
      };
    }

    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));

    return { days, hours, minutes, seconds, total };
  }

  function updateCountdown() {
    timeRemaining = calculateTimeRemaining();
  }

  // Update countdown every second
  $effect(() => {
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  });

  function formatNumber(num: number): string {
    return num.toString().padStart(2, '0');
  }
</script>

<div class="mljr-countdown mljr-countdown-{variant} {className}">
  {#if completed && completeMessage}
    <div class="mljr-countdown-complete">{completeMessage}</div>
  {:else}
    <div class="mljr-countdown-units">
      {#if showDays}
        <div class="mljr-countdown-unit">
          <div class="mljr-countdown-value">{formatNumber(timeRemaining.days)}</div>
          {#if showLabels}
            <div class="mljr-countdown-label">{defaultLabels.days}</div>
          {/if}
        </div>
        {#if showHours || showMinutes || showSeconds}
          <div class="mljr-countdown-separator">:</div>
        {/if}
      {/if}

      {#if showHours}
        <div class="mljr-countdown-unit">
          <div class="mljr-countdown-value">{formatNumber(timeRemaining.hours)}</div>
          {#if showLabels}
            <div class="mljr-countdown-label">{defaultLabels.hours}</div>
          {/if}
        </div>
        {#if showMinutes || showSeconds}
          <div class="mljr-countdown-separator">:</div>
        {/if}
      {/if}

      {#if showMinutes}
        <div class="mljr-countdown-unit">
          <div class="mljr-countdown-value">{formatNumber(timeRemaining.minutes)}</div>
          {#if showLabels}
            <div class="mljr-countdown-label">{defaultLabels.minutes}</div>
          {/if}
        </div>
        {#if showSeconds}
          <div class="mljr-countdown-separator">:</div>
        {/if}
      {/if}

      {#if showSeconds}
        <div class="mljr-countdown-unit">
          <div class="mljr-countdown-value">{formatNumber(timeRemaining.seconds)}</div>
          {#if showLabels}
            <div class="mljr-countdown-label">{defaultLabels.seconds}</div>
          {/if}
        </div>
      {/if}
    </div>
  {/if}
</div>

<style>
  .mljr-countdown {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .mljr-countdown-units {
    display: flex;
    align-items: center;
    gap: var(--mljr-space-2);
  }

  .mljr-countdown-unit {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--mljr-space-1);
  }

  .mljr-countdown-value {
    font-size: var(--mljr-text-4xl);
    font-weight: 700;
    color: var(--mljr-primary-600);
    font-variant-numeric: tabular-nums;
    line-height: 1;
  }

  .mljr-countdown-label {
    font-size: var(--mljr-text-xs);
    font-weight: 500;
    color: var(--mljr-text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .mljr-countdown-separator {
    font-size: var(--mljr-text-3xl);
    font-weight: 700;
    color: var(--mljr-text-secondary);
    margin: 0 var(--mljr-space-1);
    line-height: 1;
  }

  .mljr-countdown-complete {
    font-size: var(--mljr-text-2xl);
    font-weight: 700;
    color: var(--mljr-success-600);
    text-align: center;
    padding: var(--mljr-space-4);
  }

  /* Compact variant */
  .mljr-countdown-compact .mljr-countdown-value {
    font-size: var(--mljr-text-2xl);
  }

  .mljr-countdown-compact .mljr-countdown-label {
    font-size: var(--mljr-text-2xs);
  }

  .mljr-countdown-compact .mljr-countdown-separator {
    font-size: var(--mljr-text-xl);
  }

  /* Card variant */
  .mljr-countdown-card .mljr-countdown-units {
    gap: var(--mljr-space-4);
  }

  .mljr-countdown-card .mljr-countdown-unit {
    background: var(--mljr-bg);
    border-radius: var(--mljr-radius-lg);
    padding: var(--mljr-space-4) var(--mljr-space-6);
    box-shadow: var(--mljr-clay-shadow);
    min-width: 5rem;
  }

  .mljr-countdown-card .mljr-countdown-separator {
    display: none;
  }

  /* Minimal variant */
  .mljr-countdown-minimal .mljr-countdown-units {
    gap: var(--mljr-space-3);
  }

  .mljr-countdown-minimal .mljr-countdown-unit {
    gap: var(--mljr-space-2);
  }

  .mljr-countdown-minimal .mljr-countdown-value {
    font-size: var(--mljr-text-3xl);
  }

  .mljr-countdown-minimal .mljr-countdown-label {
    font-size: var(--mljr-text-xs);
  }

  .mljr-countdown-minimal .mljr-countdown-separator {
    font-size: var(--mljr-text-2xl);
  }
</style>
