<script lang="ts">
  import type { Snippet } from 'svelte';
  import { Icon } from '$lib';

  type ValidationState = 'error' | 'success' | 'warning' | 'info';

  interface ValidationRule {
    validate: (value: any) => boolean | Promise<boolean>;
    message: string;
  }

  interface Props {
    /** Current validation state */
    variant?: ValidationState;
    /** Validation message */
    message?: string;
    /** Value to validate */
    value?: any;
    /** Array of validation rules */
    rules?: ValidationRule[];
    /** Show validation icon */
    showIcon?: boolean;
    /** Validate on mount */
    validateOnMount?: boolean;
    /** Callback when validation completes */
    onvalidate?: (isValid: boolean, messages: string[]) => void;
    /** Additional CSS classes */
    class?: string;
    /** Slot content */
    children?: Snippet;
  }

  let {
    variant = 'info',
    message = '',
    value = $bindable(undefined),
    rules = [],
    showIcon = true,
    validateOnMount = false,
    onvalidate,
    class: className = '',
    children,
  }: Props = $props();

  let validationMessages = $state<string[]>([]);
  let isValidating = $state(false);
  let currentState = $state<ValidationState>('info');
  $effect(() => { currentState = variant; });

  const stateIcons: Record<ValidationState, string> = {
    error: 'mdi:alert-circle',
    success: 'mdi:check-circle',
    warning: 'mdi:alert',
    info: 'mdi:information',
  };

  const stateColors: Record<ValidationState, string> = {
    error: 'var(--mljr-error)',
    success: 'var(--mljr-success)',
    warning: 'var(--mljr-warning)',
    info: 'var(--mljr-info)',
  };

  async function validate() {
    if (rules.length === 0) return true;

    isValidating = true;
    validationMessages = [];

    try {
      const results = await Promise.all(
        rules.map(async (rule) => {
          const isValid = await rule.validate(value);
          return { isValid, message: rule.message };
        })
      );

      const failedRules = results.filter((r) => !r.isValid);
      const isValid = failedRules.length === 0;

      if (!isValid) {
        validationMessages = failedRules.map((r) => r.message);
        currentState = 'error';
      } else {
        currentState = 'success';
      }

      onvalidate?.(isValid, validationMessages);
      return isValid;
    } catch (error) {
      validationMessages = ['Validation error occurred'];
      currentState = 'error';
      return false;
    } finally {
      isValidating = false;
    }
  }

  // Watch value changes
  $effect(() => {
    if (value !== undefined && rules.length > 0) {
      validate();
    }
  });

  // Validate on mount if requested
  $effect(() => {
    if (validateOnMount) {
      validate();
    }
  });

  // Update state when prop changes
  $effect(() => {
    if (message) {
      currentState = variant;
    }
  });

  let validatorClasses = $derived(
    ['mljr-validator', `mljr-validator-${currentState}`, className].filter(Boolean).join(' ')
  );

  let displayMessage = $derived(() => {
    if (validationMessages.length > 0) {
      return validationMessages[0]; // Show first error
    }
    return message;
  });

  // Export validate function
  export { validate };
</script>

<div class={validatorClasses}>
  {#if children}
    {@render children()}
  {:else if displayMessage() || isValidating}
    <div class="mljr-validator-content">
      {#if showIcon && !isValidating}
        <Icon icon={stateIcons[currentState]} size={16} color={stateColors[currentState]} />
      {/if}
      {#if isValidating}
        <span class="mljr-validator-loading">
          <Icon icon="mdi:loading" size={16} class="mljr-spin" />
        </span>
      {/if}
      <span class="mljr-validator-message">{isValidating ? 'Validating...' : displayMessage()}</span>
    </div>
    {#if validationMessages.length > 1}
      <ul class="mljr-validator-list">
        {#each validationMessages.slice(1) as msg}
          <li>{msg}</li>
        {/each}
      </ul>
    {/if}
  {/if}
</div>

<style>
  .mljr-validator {
    font-size: var(--mljr-text-sm);
    margin-top: var(--mljr-space-1);
  }

  .mljr-validator-content {
    display: flex;
    align-items: center;
    gap: var(--mljr-space-2);
  }

  .mljr-validator-message {
    flex: 1;
  }

  .mljr-validator-error {
    color: var(--mljr-error);
  }

  .mljr-validator-success {
    color: var(--mljr-success);
  }

  .mljr-validator-warning {
    color: var(--mljr-warning);
  }

  .mljr-validator-info {
    color: var(--mljr-text-secondary);
  }

  .mljr-validator-list {
    list-style: disc;
    margin-top: var(--mljr-space-2);
    margin-left: var(--mljr-space-6);
    padding: 0;
  }

  .mljr-validator-list li {
    margin-top: var(--mljr-space-1);
  }

  .mljr-validator-loading {
    display: inline-flex;
  }

  :global(.mljr-spin) {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
