<script lang="ts">
  interface Props {
    /** Number of OTP digits */
    length?: number;
    /** OTP value (bindable) */
    value?: string;
    /** Input type */
    type?: 'text' | 'number' | 'password';
    /** Disabled state */
    disabled?: boolean;
    /** Auto-focus first input */
    autofocus?: boolean;
    /** Additional CSS class */
    class?: string;
    /** Callback when OTP is complete */
    onComplete?: (otp: string) => void;
    /** Callback when value changes */
    onchange?: (value: string) => void;
  }

  let {
    length = 6,
    value = $bindable(''),
    type = 'text',
    disabled = false,
    autofocus = true,
    class: className = '',
    onComplete,
    onchange,
  }: Props = $props();

  let inputs: HTMLInputElement[] = [];
  let digits = $state<string[]>([]);

  // Initialize and update digits array based on length
  $effect(() => {
    const expectedLength = length;
    if (digits.length !== expectedLength) {
      const chars = value.split('').slice(0, expectedLength);
      digits = [...chars, ...Array(expectedLength - chars.length).fill('')];
    } else if (value !== digits.join('')) {
      const chars = value.split('').slice(0, expectedLength);
      digits = [...chars, ...Array(expectedLength - chars.length).fill('')];
    }
  });

  function handleInput(index: number, event: Event) {
    const target = event.target as HTMLInputElement;
    const val = target.value;

    if (val.length > 1) {
      // Handle paste
      const pastedData = val.slice(0, length);
      for (let i = 0; i < pastedData.length && i + index < length; i++) {
        digits[i + index] = pastedData[i];
      }
      // Focus last filled input
      const lastIndex = Math.min(index + pastedData.length - 1, length - 1);
      inputs[lastIndex]?.focus();
    } else {
      digits[index] = val;
      // Move to next input
      if (val && index < length - 1) {
        inputs[index + 1]?.focus();
      }
    }

    updateValue();
  }

  function handleKeydown(index: number, event: KeyboardEvent) {
    if (event.key === 'Backspace' && !digits[index] && index > 0) {
      // Move to previous input on backspace if current is empty
      inputs[index - 1]?.focus();
    } else if (event.key === 'ArrowLeft' && index > 0) {
      inputs[index - 1]?.focus();
    } else if (event.key === 'ArrowRight' && index < length - 1) {
      inputs[index + 1]?.focus();
    }
  }

  function handlePaste(event: ClipboardEvent) {
    event.preventDefault();
    const pastedData = event.clipboardData?.getData('text') || '';
    const cleanData = pastedData.replace(/\D/g, '').slice(0, length);

    for (let i = 0; i < length; i++) {
      digits[i] = cleanData[i] || '';
    }

    updateValue();

    // Focus last filled input
    const lastIndex = Math.min(cleanData.length - 1, length - 1);
    if (lastIndex >= 0) {
      inputs[lastIndex]?.focus();
    }
  }

  function updateValue() {
    const newValue = digits.join('');
    value = newValue;
    onchange?.(newValue);

    // Check if complete
    if (newValue.length === length && !newValue.includes('')) {
      onComplete?.(newValue);
    }
  }
</script>

<div class="mljr-otp-input {className}">
  {#each digits as digit, i}
    <!-- svelte-ignore a11y_autofocus -->
    <input
      bind:this={inputs[i]}
      type={type}
      value={digit}
      maxlength={type === 'number' ? 1 : length}
      inputmode={type === 'number' ? 'numeric' : 'text'}
      pattern={type === 'number' ? '[0-9]' : undefined}
      {disabled}
      autofocus={autofocus && i === 0}
      oninput={(e) => handleInput(i, e)}
      onkeydown={(e) => handleKeydown(i, e)}
      onpaste={i === 0 ? handlePaste : undefined}
      class="mljr-otp-digit"
      aria-label={`Digit ${i + 1}`}
    />
  {/each}
</div>

<style>
  .mljr-otp-input {
    display: flex;
    gap: var(--mljr-space-3);
    justify-content: center;
  }

  .mljr-otp-digit {
    width: 3rem;
    height: 3.5rem;
    font-size: var(--mljr-text-xl);
    font-weight: 600;
    text-align: center;
    color: var(--mljr-text);
    background: var(--mljr-bg-secondary);
    border: 2px solid var(--mljr-border);
    border-radius: var(--mljr-radius-lg);
    box-shadow: var(--mljr-clay-inset-sm);
    transition: all var(--mljr-transition-fast);
    font-family: var(--mljr-font-mono);
  }

  .mljr-otp-digit:focus {
    outline: none;
    border-color: var(--mljr-primary-500);
    box-shadow: var(--mljr-clay-shadow-sm);
    transform: translateY(-2px);
  }

  .mljr-otp-digit:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 640px) {
    .mljr-otp-digit {
      width: 2.5rem;
      height: 3rem;
      font-size: var(--mljr-text-lg);
    }
  }
</style>
