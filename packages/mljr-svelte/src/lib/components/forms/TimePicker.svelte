<script lang="ts">
  interface Props {
    /** Selected time value (HH:mm format) */
    value?: string;
    /** Placeholder text */
    placeholder?: string;
    /** Input label */
    label?: string;
    /** Helper text */
    helperText?: string;
    /** Show error state */
    error?: boolean;
    /** Error message */
    errorMessage?: string;
    /** Disable the input */
    disabled?: boolean;
    /** Use 12-hour format */
    use12Hour?: boolean;
    /** Minimum time (HH:mm format) */
    min?: string;
    /** Maximum time (HH:mm format) */
    max?: string;
    /** Time step in minutes */
    step?: number;
    /** Show seconds */
    showSeconds?: boolean;
    /** Required field */
    required?: boolean;
    /** Callback when value changes */
    onchange?: (value: string) => void;
    /** Additional CSS classes */
    class?: string;
  }

  let {
    value = $bindable(''),
    placeholder = 'Select time',
    label,
    helperText,
    error = false,
    errorMessage,
    disabled = false,
    use12Hour = false,
    min,
    max,
    step = 1,
    showSeconds = false,
    required = false,
    onchange,
    class: className = '',
  }: Props = $props();

  let isOpen = $state(false);
  let hours = $state(12);
  let minutes = $state(0);
  let seconds = $state(0);
  let period = $state<'AM' | 'PM'>('AM');

  // Parse initial value
  $effect(() => {
    if (value) {
      parseTimeValue(value);
    }
  });

  function parseTimeValue(timeStr: string) {
    const parts = timeStr.split(':');
    if (parts.length >= 2) {
      let h = parseInt(parts[0]);
      const m = parseInt(parts[1]);
      const s = parts[2] ? parseInt(parts[2]) : 0;

      if (use12Hour) {
        period = h >= 12 ? 'PM' : 'AM';
        h = h % 12 || 12;
      }

      hours = h;
      minutes = m;
      seconds = s;
    }
  }

  function formatDisplayValue(): string {
    if (!value) return '';

    const parts = value.split(':');
    if (parts.length < 2) return '';

    let h = parseInt(parts[0]);
    const m = parts[1];
    const s = parts[2];

    if (use12Hour) {
      const period = h >= 12 ? 'PM' : 'AM';
      h = h % 12 || 12;
      return showSeconds ? `${h}:${m}:${s} ${period}` : `${h}:${m} ${period}`;
    }

    return showSeconds ? `${h.toString().padStart(2, '0')}:${m}:${s}` : `${h.toString().padStart(2, '0')}:${m}`;
  }

  function updateValue() {
    let h = hours;
    if (use12Hour) {
      if (period === 'PM' && hours !== 12) h = hours + 12;
      if (period === 'AM' && hours === 12) h = 0;
    }

    const timeString = showSeconds
      ? `${h.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      : `${h.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

    value = timeString;
    onchange?.(timeString);
  }

  function incrementHours() {
    const max = use12Hour ? 12 : 23;
    const min = use12Hour ? 1 : 0;
    hours = hours >= max ? min : hours + 1;
    updateValue();
  }

  function decrementHours() {
    const max = use12Hour ? 12 : 23;
    const min = use12Hour ? 1 : 0;
    hours = hours <= min ? max : hours - 1;
    updateValue();
  }

  function incrementMinutes() {
    if (minutes >= 60 - step) {
      minutes = 0;
      incrementHours();
    } else {
      minutes = minutes + step;
    }
    updateValue();
  }

  function decrementMinutes() {
    if (minutes < step) {
      minutes = 60 - step;
      decrementHours();
    } else {
      minutes = minutes - step;
    }
    updateValue();
  }

  function incrementSeconds() {
    if (seconds >= 59) {
      seconds = 0;
      incrementMinutes();
    } else {
      seconds++;
    }
    updateValue();
  }

  function decrementSeconds() {
    if (seconds <= 0) {
      seconds = 59;
      decrementMinutes();
    } else {
      seconds--;
    }
    updateValue();
  }

  function togglePeriod() {
    period = period === 'AM' ? 'PM' : 'AM';
    updateValue();
  }

  function handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.mljr-time-picker')) {
      isOpen = false;
    }
  }

  $effect(() => {
    if (isOpen) {
      setTimeout(() => {
        document.addEventListener('click', handleClickOutside);
      }, 0);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });
</script>

<div class="mljr-time-picker {className}" class:mljr-time-picker-disabled={disabled}>
  {#if label}
    <span class="mljr-time-picker-label">
      {label}
      {#if required}<span class="mljr-time-picker-required">*</span>{/if}
    </span>
  {/if}

  <div class="mljr-time-picker-wrapper">
    <button
      type="button"
      class="mljr-time-picker-trigger"
      class:mljr-time-picker-error={error}
      {disabled}
      onclick={() => (isOpen = !isOpen)}
    >
      <span class="mljr-time-picker-value">
        {formatDisplayValue() || placeholder}
      </span>
      <svg
        class="mljr-time-picker-icon"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
      </svg>
    </button>

    {#if isOpen}
      <div class="mljr-time-picker-dropdown">
        <div class="mljr-time-picker-controls">
          <!-- Hours -->
          <div class="mljr-time-picker-unit">
            <button type="button" class="mljr-time-picker-btn" aria-label="Increment hours" onclick={incrementHours}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="18 15 12 9 6 15"></polyline>
              </svg>
            </button>
            <input
              type="number"
              class="mljr-time-picker-input"
              bind:value={hours}
              min={use12Hour ? 1 : 0}
              max={use12Hour ? 12 : 23}
              onchange={updateValue}
            />
            <button type="button" class="mljr-time-picker-btn" aria-label="Decrement hours" onclick={decrementHours}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <span class="mljr-time-picker-label-small">Hours</span>
          </div>

          <span class="mljr-time-picker-separator">:</span>

          <!-- Minutes -->
          <div class="mljr-time-picker-unit">
            <button type="button" class="mljr-time-picker-btn" aria-label="Increment minutes" onclick={incrementMinutes}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="18 15 12 9 6 15"></polyline>
              </svg>
            </button>
            <input
              type="number"
              class="mljr-time-picker-input"
              bind:value={minutes}
              min="0"
              max="59"
              onchange={updateValue}
            />
            <button type="button" class="mljr-time-picker-btn" aria-label="Decrement minutes" onclick={decrementMinutes}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <span class="mljr-time-picker-label-small">Minutes</span>
          </div>

          {#if showSeconds}
            <span class="mljr-time-picker-separator">:</span>

            <!-- Seconds -->
            <div class="mljr-time-picker-unit">
              <button type="button" class="mljr-time-picker-btn" aria-label="Increment seconds" onclick={incrementSeconds}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="18 15 12 9 6 15"></polyline>
                </svg>
              </button>
              <input
                type="number"
                class="mljr-time-picker-input"
                bind:value={seconds}
                min="0"
                max="59"
                onchange={updateValue}
              />
              <button type="button" class="mljr-time-picker-btn" aria-label="Decrement seconds" onclick={decrementSeconds}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              <span class="mljr-time-picker-label-small">Seconds</span>
            </div>
          {/if}

          {#if use12Hour}
            <!-- AM/PM Toggle -->
            <div class="mljr-time-picker-period">
              <button type="button" class="mljr-time-picker-period-btn" onclick={togglePeriod}>
                {period}
              </button>
            </div>
          {/if}
        </div>
      </div>
    {/if}
  </div>

  {#if error && errorMessage}
    <span class="mljr-time-picker-error-message">{errorMessage}</span>
  {:else if helperText}
    <span class="mljr-time-picker-helper">{helperText}</span>
  {/if}
</div>

<style>
  .mljr-time-picker {
    display: flex;
    flex-direction: column;
    gap: var(--mljr-space-2);
    position: relative;
  }

  .mljr-time-picker-label {
    font-size: var(--mljr-text-sm);
    font-weight: 500;
    color: var(--mljr-text);
  }

  .mljr-time-picker-required {
    color: var(--mljr-error);
    margin-left: var(--mljr-space-1);
  }

  .mljr-time-picker-wrapper {
    position: relative;
  }

  .mljr-time-picker-trigger {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--mljr-space-3) var(--mljr-space-4);
    background: var(--mljr-bg);
    border: 1px solid var(--mljr-border);
    border-radius: var(--mljr-radius-md);
    box-shadow: var(--mljr-clay-inset-sm);
    font-size: var(--mljr-text-sm);
    color: var(--mljr-text);
    cursor: pointer;
    transition: all var(--mljr-transition-fast);
  }

  .mljr-time-picker-trigger:hover:not(:disabled) {
    border-color: var(--mljr-primary-600);
  }

  .mljr-time-picker-trigger:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .mljr-time-picker-error {
    border-color: var(--mljr-error);
  }

  .mljr-time-picker-value {
    flex: 1;
    text-align: left;
  }

  .mljr-time-picker-icon {
    color: var(--mljr-text-secondary);
  }

  .mljr-time-picker-dropdown {
    position: absolute;
    top: calc(100% + var(--mljr-space-2));
    left: 0;
    z-index: 1000;
    background: var(--mljr-bg);
    border: 1px solid var(--mljr-border);
    border-radius: var(--mljr-radius-lg);
    box-shadow: var(--mljr-clay-shadow);
    padding: var(--mljr-space-4);
    min-width: min(280px, calc(100vw - 1rem));
    max-width: calc(100vw - 1rem);
  }

  .mljr-time-picker-controls {
    display: flex;
    align-items: center;
    gap: var(--mljr-space-2);
  }

  .mljr-time-picker-unit {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--mljr-space-2);
  }

  .mljr-time-picker-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.75rem;
    height: 2.75rem;
    background: var(--mljr-bg-secondary);
    border: none;
    border-radius: var(--mljr-radius-sm);
    color: var(--mljr-text);
    cursor: pointer;
    transition: all var(--mljr-transition-fast);
  }

  .mljr-time-picker-btn:hover {
    background: var(--mljr-primary-100);
    color: var(--mljr-primary-600);
  }

  .mljr-time-picker-input {
    width: 3rem;
    padding: var(--mljr-space-2);
    text-align: center;
    font-size: var(--mljr-text-lg);
    font-weight: 600;
    background: var(--mljr-bg-secondary);
    border: 1px solid var(--mljr-border);
    border-radius: var(--mljr-radius-sm);
    color: var(--mljr-text);
  }

  .mljr-time-picker-input:focus {
    outline: none;
    border-color: var(--mljr-primary-600);
  }

  .mljr-time-picker-separator {
    font-size: var(--mljr-text-2xl);
    font-weight: 700;
    color: var(--mljr-text-secondary);
    padding: 0 var(--mljr-space-1);
  }

  .mljr-time-picker-label-small {
    font-size: var(--mljr-text-xs);
    color: var(--mljr-text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .mljr-time-picker-period {
    display: flex;
    flex-direction: column;
    gap: var(--mljr-space-2);
  }

  .mljr-time-picker-period-btn {
    padding: var(--mljr-space-2) var(--mljr-space-3);
    background: var(--mljr-primary-100);
    border: 1px solid var(--mljr-primary-600);
    border-radius: var(--mljr-radius-sm);
    color: var(--mljr-primary-700);
    font-weight: 600;
    font-size: var(--mljr-text-sm);
    cursor: pointer;
    transition: all var(--mljr-transition-fast);
  }

  .mljr-time-picker-period-btn:hover {
    background: var(--mljr-primary-200);
  }

  .mljr-time-picker-helper {
    font-size: var(--mljr-text-xs);
    color: var(--mljr-text-secondary);
  }

  .mljr-time-picker-error-message {
    font-size: var(--mljr-text-xs);
    color: var(--mljr-error);
  }
</style>
