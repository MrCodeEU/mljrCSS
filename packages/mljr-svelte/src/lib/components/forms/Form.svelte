<script lang="ts">
  import type { HTMLFormAttributes } from 'svelte/elements';

  interface Props extends Omit<HTMLFormAttributes, 'onsubmit' | 'onreset'> {
    /** Callback when form is submitted with valid data */
    onsubmit?: (data: FormData, event: SubmitEvent) => void | Promise<void>;
    /** Callback when form is reset */
    onreset?: (event: Event) => void;
    /** Show validation errors on submit attempt */
    validateOnSubmit?: boolean;
    /** Show validation errors on field blur */
    validateOnBlur?: boolean;
    /** Show validation errors on field change */
    validateOnChange?: boolean;
    /** Disable the form */
    disabled?: boolean;
    /** Additional CSS classes */
    class?: string;
  }

  let {
    onsubmit,
    onreset,
    validateOnSubmit = true,
    validateOnBlur = false,
    validateOnChange = false,
    disabled = false,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  let formElement = $state<HTMLFormElement | null>(null);
  let isSubmitting = $state(false);
  let validationState = $state<'idle' | 'validating' | 'valid' | 'invalid'>('idle');
  let errors = $state<Map<string, string>>(new Map());

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();

    if (disabled || isSubmitting) return;

    const form = event.currentTarget as HTMLFormElement;
    formElement = form;

    // Check HTML5 validation
    if (validateOnSubmit && !form.checkValidity()) {
      validationState = 'invalid';
      form.reportValidity();
      return;
    }

    validationState = 'validating';
    isSubmitting = true;

    try {
      const formData = new FormData(form);

      if (onsubmit) {
        await onsubmit(formData, event);
      }

      validationState = 'valid';
    } catch (error) {
      validationState = 'invalid';
      console.error('Form submission error:', error);
    } finally {
      isSubmitting = false;
    }
  }

  function handleReset(event: Event) {
    validationState = 'idle';
    errors.clear();

    if (onreset) {
      onreset(event);
    }
  }

  function handleBlur(event: FocusEvent) {
    if (validateOnBlur) {
      const target = event.target as HTMLInputElement;
      validateField(target);
    }
  }

  function handleInput(event: Event) {
    if (validateOnChange) {
      const target = event.target as HTMLInputElement;
      validateField(target);
    }
  }

  function validateField(field: HTMLInputElement) {
    if (field.validity.valid) {
      errors.delete(field.name);
    } else {
      errors.set(field.name, field.validationMessage);
    }
    errors = errors; // Trigger reactivity
  }

  export function reset() {
    formElement?.reset();
    validationState = 'idle';
    errors.clear();
  }

  export function submit() {
    formElement?.requestSubmit();
  }

  export function validate(): boolean {
    if (!formElement) return false;
    return formElement.checkValidity();
  }

  export function getFormData(): FormData | null {
    if (!formElement) return null;
    return new FormData(formElement);
  }

  let formClasses = $derived(
    [
      'mljr-form',
      disabled && 'mljr-form-disabled',
      validationState !== 'idle' && `mljr-form-${validationState}`,
      className,
    ]
      .filter(Boolean)
      .join(' ')
  );
</script>

<form
  class={formClasses}
  onsubmit={handleSubmit}
  onreset={handleReset}
  onfocusout={handleBlur}
  oninput={handleInput}
  bind:this={formElement}
  novalidate={validateOnSubmit}
  {...restProps}
>
  <fieldset {disabled} class="mljr-form-fieldset">
    {@render children?.()}
  </fieldset>
</form>

<style>
  .mljr-form {
    width: 100%;
  }

  .mljr-form-fieldset {
    border: none;
    padding: 0;
    margin: 0;
    min-width: 0;
  }

  .mljr-form-disabled {
    opacity: 0.6;
    pointer-events: none;
  }

  .mljr-form-validating {
    opacity: 0.8;
  }
</style>
