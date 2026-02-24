<script lang="ts">
  import { Icon } from '$lib';

  type TimeFormat = '12h' | '24h';

  interface Props {
    /** Start time value (HH:MM or HH:MM:SS format) */
    startValue?: string;
    /** End time value (HH:MM or HH:MM:SS format) */
    endValue?: string;
    /** Label for the component */
    label?: string;
    /** Helper text */
    helperText?: string;
    /** Error state */
    error?: boolean;
    /** Error message */
    errorMessage?: string;
    /** Time format: 12h or 24h */
    format?: TimeFormat;
    /** Show seconds */
    showSeconds?: boolean;
    /** Disabled state */
    disabled?: boolean;
    /** Required field */
    required?: boolean;
    /** Step interval in minutes */
    step?: number;
    /** Minimum start time */
    minTime?: string;
    /** Maximum end time */
    maxTime?: string;
    /** Callback when time range changes */
    onchange?: (startTime: string, endTime: string) => void;
    /** Additional CSS classes */
    class?: string;
  }

  let {
    startValue = $bindable('09:00'),
    endValue = $bindable('17:00'),
    label,
    helperText,
    error = false,
    errorMessage,
    format = '24h',
    showSeconds = false,
    disabled = false,
    required = false,
    step = 1,
    minTime,
    maxTime,
    onchange,
    class: className = '',
  }: Props = $props();

  function parseTime(timeStr: string) {
    const parts = timeStr.split(':');
    return {
      hours: parseInt(parts[0] || '0'),
      minutes: parseInt(parts[1] || '0'),
      seconds: parseInt(parts[2] || '0'),
    };
  }

  function formatTime(hours: number, minutes: number, seconds: number = 0): string {
    const h = hours.toString().padStart(2, '0');
    const m = minutes.toString().padStart(2, '0');
    if (showSeconds) {
      const s = seconds.toString().padStart(2, '0');
      return `${h}:${m}:${s}`;
    }
    return `${h}:${m}`;
  }

  function updateTimes() {
    onchange?.(startValue, endValue);
  }

  function isValidRange(): boolean {
    const start = parseTime(startValue);
    const end = parseTime(endValue);

    const startMinutes = start.hours * 60 + start.minutes;
    const endMinutes = end.hours * 60 + end.minutes;

    return startMinutes < endMinutes;
  }

  let rangeClasses = $derived(
    [
      'mljr-time-range-picker',
      disabled && 'mljr-time-range-picker-disabled',
      error && 'mljr-time-range-picker-error',
      !isValidRange() && 'mljr-time-range-picker-invalid',
      className,
    ]
      .filter(Boolean)
      .join(' ')
  );
</script>

<div class={rangeClasses}>
  {#if label}
    <span class="mljr-time-range-picker-label">
      {label}
      {#if required}<span class="mljr-time-range-picker-required">*</span>{/if}
    </span>
  {/if}

  <div class="mljr-time-range-picker-inputs">
    <div class="mljr-time-range-picker-input-wrapper">
      <Icon icon="mdi:clock-outline" size={18} />
      <input
        type="time"
        class="mljr-time-range-picker-input"
        bind:value={startValue}
        {disabled}
        {required}
        {step}
        min={minTime}
        oninput={updateTimes}
      />
      <span class="mljr-time-range-picker-label-small">Start</span>
    </div>

    <div class="mljr-time-range-picker-separator">
      <Icon icon="mdi:arrow-right" size={20} />
    </div>

    <div class="mljr-time-range-picker-input-wrapper">
      <Icon icon="mdi:clock-outline" size={18} />
      <input
        type="time"
        class="mljr-time-range-picker-input"
        bind:value={endValue}
        {disabled}
        {required}
        {step}
        max={maxTime}
        oninput={updateTimes}
      />
      <span class="mljr-time-range-picker-label-small">End</span>
    </div>
  </div>

  {#if !isValidRange()}
    <span class="mljr-time-range-picker-error-message">End time must be after start time</span>
  {:else if error && errorMessage}
    <span class="mljr-time-range-picker-error-message">{errorMessage}</span>
  {:else if helperText}
    <span class="mljr-time-range-picker-helper">{helperText}</span>
  {/if}

  {#if isValidRange()}
    {@const start = parseTime(startValue)}
    {@const end = parseTime(endValue)}
    {@const durationMinutes = (end.hours * 60 + end.minutes) - (start.hours * 60 + start.minutes)}
    {@const hours = Math.floor(durationMinutes / 60)}
    {@const minutes = durationMinutes % 60}
    <div class="mljr-time-range-picker-duration">
      <Icon icon="mdi:timer-outline" size={16} />
      <span>Duration: {hours}h {minutes}m</span>
    </div>
  {/if}
</div>

<style>
  .mljr-time-range-picker {
    display: flex;
    flex-direction: column;
    gap: var(--mljr-space-2);
  }

  .mljr-time-range-picker-label {
    font-size: var(--mljr-text-sm);
    font-weight: 500;
    color: var(--mljr-text);
  }

  .mljr-time-range-picker-required {
    color: var(--mljr-error);
    margin-left: var(--mljr-space-1);
  }

  .mljr-time-range-picker-inputs {
    display: flex;
    align-items: center;
    gap: var(--mljr-space-4);
  }

  .mljr-time-range-picker-input-wrapper {
    display: flex;
    align-items: center;
    gap: var(--mljr-space-2);
    padding: var(--mljr-space-3) var(--mljr-space-4);
    background: var(--mljr-bg);
    border: 1px solid var(--mljr-border);
    border-radius: var(--mljr-radius-md);
    box-shadow: var(--mljr-clay-inset-sm);
    flex: 1;
    transition: all var(--mljr-transition-fast);
  }

  .mljr-time-range-picker-input-wrapper:focus-within {
    border-color: var(--mljr-primary-600);
    box-shadow: var(--mljr-clay-shadow-sm);
  }

  .mljr-time-range-picker-input {
    flex: 1;
    border: none;
    background: none;
    font-size: var(--mljr-text-base);
    color: var(--mljr-text);
    outline: none;
    font-family: var(--mljr-font-mono);
  }

  .mljr-time-range-picker-label-small {
    font-size: var(--mljr-text-xs);
    color: var(--mljr-text-secondary);
    text-transform: uppercase;
    font-weight: 600;
  }

  .mljr-time-range-picker-separator {
    color: var(--mljr-text-secondary);
    flex-shrink: 0;
  }

  .mljr-time-range-picker-duration {
    display: flex;
    align-items: center;
    gap: var(--mljr-space-2);
    padding: var(--mljr-space-2) var(--mljr-space-3);
    background: var(--mljr-bg-secondary);
    border-radius: var(--mljr-radius-sm);
    font-size: var(--mljr-text-sm);
    color: var(--mljr-text-secondary);
  }

  .mljr-time-range-picker-helper {
    font-size: var(--mljr-text-xs);
    color: var(--mljr-text-secondary);
  }

  .mljr-time-range-picker-error-message {
    font-size: var(--mljr-text-xs);
    color: var(--mljr-error);
  }

  .mljr-time-range-picker-disabled {
    opacity: 0.6;
    pointer-events: none;
  }

  .mljr-time-range-picker-error .mljr-time-range-picker-input-wrapper {
    border-color: var(--mljr-error);
  }

  .mljr-time-range-picker-invalid .mljr-time-range-picker-input-wrapper {
    border-color: var(--mljr-warning);
  }

  @media (max-width: 640px) {
    .mljr-time-range-picker-inputs {
      flex-direction: column;
      gap: var(--mljr-space-3);
    }

    .mljr-time-range-picker-separator {
      transform: rotate(90deg);
    }
  }
</style>
