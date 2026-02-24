<script lang="ts">
  type PinSize = 'sm' | 'md' | 'lg';
  type PinState = 'default' | 'error' | 'success';

  interface Props {
    /** Number of PIN digits (4 or 6 recommended) */
    length?: number;
    /** PIN value (bindable) */
    value?: string;
    /** Whether to mask digits as dots */
    masked?: boolean;
    /** Allow toggle show/hide */
    showToggle?: boolean;
    /** Size variant */
    size?: PinSize;
    /** Visual status */
    status?: PinState;
    /** Hint/error/success message */
    message?: string;
    /** Disabled status */
    disabled?: boolean;
    /** Auto-focus first input */
    autofocus?: boolean;
    /** Separator (e.g. '-' shown between digit groups) */
    separator?: string;
    /** Position to insert separator (e.g. 3 = after 3rd digit) */
    separatorAt?: number;
    /** Additional CSS class */
    class?: string;
    /** Callback when PIN is complete */
    onComplete?: (pin: string) => void;
    /** Callback when value changes */
    onchange?: (value: string) => void;
  }

  let {
    length = 4,
    value = $bindable(''),
    masked = true,
    showToggle = true,
    size = 'md',
    status = 'default',
    message = '',
    disabled = false,
    autofocus = false,
    separator = '',
    separatorAt = 0,
    class: className = '',
    onComplete,
    onchange,
  }: Props = $props();

  let inputs: HTMLInputElement[] = [];
  let digits: string[] = $state([]);
  let revealed = $state(false);

  $effect(() => {
    const expected = length;
    if (digits.length !== expected || value !== digits.join('')) {
      const chars = value.split('').slice(0, expected);
      digits = [...chars, ...Array(expected - chars.length).fill('')];
    }
  });

  const sizeClass = $derived(size === 'sm' ? 'mljr-pin-digit-sm' : size === 'lg' ? 'mljr-pin-digit-lg' : '');
  const statusClass = $derived(status === 'error' ? 'mljr-pin-input-error' : status === 'success' ? 'mljr-pin-input-success' : '');
  const messageClass = $derived(status === 'error' ? 'mljr-pin-message-error' : status === 'success' ? 'mljr-pin-message-success' : 'mljr-pin-message-hint');
  const inputType = $derived((masked && !revealed) ? 'password' : 'text');

  function handleInput(index: number, event: Event) {
    const target = event.target as HTMLInputElement;
    const raw = target.value;

    // Allow only digits
    const filtered = raw.replace(/\D/g, '');

    if (filtered.length > 1) {
      // Paste scenario — fill from current index
      const chars = filtered.slice(0, length - index);
      for (let i = 0; i < chars.length; i++) {
        digits[index + i] = chars[i];
      }
      const lastFilled = Math.min(index + chars.length - 1, length - 1);
      inputs[lastFilled]?.focus();
    } else {
      digits[index] = filtered;
      if (filtered && index < length - 1) {
        inputs[index + 1]?.focus();
      }
    }
    updateValue();
  }

  function handleKeydown(index: number, event: KeyboardEvent) {
    if (event.key === 'Backspace') {
      if (digits[index]) {
        digits[index] = '';
        updateValue();
      } else if (index > 0) {
        inputs[index - 1]?.focus();
      }
    } else if (event.key === 'ArrowLeft' && index > 0) {
      inputs[index - 1]?.focus();
    } else if (event.key === 'ArrowRight' && index < length - 1) {
      inputs[index + 1]?.focus();
    } else if (event.key === 'Delete') {
      digits[index] = '';
      updateValue();
    }
  }

  function handlePaste(event: ClipboardEvent) {
    event.preventDefault();
    const text = event.clipboardData?.getData('text') || '';
    const nums = text.replace(/\D/g, '').slice(0, length);
    for (let i = 0; i < length; i++) {
      digits[i] = nums[i] || '';
    }
    updateValue();
    const lastIdx = Math.min(nums.length - 1, length - 1);
    if (lastIdx >= 0) inputs[lastIdx]?.focus();
  }

  function handleFocus(event: FocusEvent) {
    // Select content on focus for easy re-entry
    (event.target as HTMLInputElement).select();
  }

  function updateValue() {
    const newVal = digits.join('');
    value = newVal;
    onchange?.(newVal);
    if (newVal.length === length && !newVal.includes('')) {
      onComplete?.(newVal);
    }
  }

  function toggleReveal() {
    revealed = !revealed;
  }
</script>

<div class="mljr-pin-input {statusClass} {className}">
  <div class="mljr-pin-digits">
    {#each digits as digit, i}
      {#if separator && separatorAt > 0 && i === separatorAt}
        <span class="mljr-pin-separator" aria-hidden="true">{separator}</span>
      {/if}
      <!-- svelte-ignore a11y_autofocus -->
      <input
        bind:this={inputs[i]}
        type={inputType}
        inputmode="numeric"
        pattern="[0-9]"
        maxlength={1}
        value={digit}
        {disabled}
        autofocus={autofocus && i === 0}
        data-filled={digit !== '' ? 'true' : 'false'}
        class="mljr-pin-digit {sizeClass}"
        aria-label={`PIN digit ${i + 1} of ${length}`}
        oninput={(e) => handleInput(i, e)}
        onkeydown={(e) => handleKeydown(i, e)}
        onpaste={handlePaste}
        onfocus={handleFocus}
      />
    {/each}
  </div>

  {#if showToggle && masked}
    <button type="button" class="mljr-pin-toggle" onclick={toggleReveal} aria-label={revealed ? 'Hide PIN' : 'Show PIN'}>
      {#if revealed}
        <!-- Eye-off icon -->
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
          <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
          <line x1="1" y1="1" x2="23" y2="23"/>
        </svg>
        Hide PIN
      {:else}
        <!-- Eye icon -->
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
        Show PIN
      {/if}
    </button>
  {/if}

  {#if message}
    <p class="mljr-pin-message {messageClass}" role={status === 'error' ? 'alert' : 'status'}>{message}</p>
  {/if}
</div>
