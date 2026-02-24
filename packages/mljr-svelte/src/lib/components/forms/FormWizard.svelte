<script lang="ts">
  import type { Snippet } from 'svelte';
  import { Icon } from '$lib';

  export interface WizardStep {
    id: string;
    title: string;
    description?: string;
    icon?: string;
    validate?: () => boolean | Promise<boolean>;
  }

  interface Props {
    /** Array of wizard steps */
    steps: WizardStep[];
    /** Current active step index */
    currentStep?: number;
    /** Allow going back to previous steps */
    allowBack?: boolean;
    /** Show step numbers */
    showStepNumbers?: boolean;
    /** Persist data to localStorage */
    persistData?: boolean;
    /** LocalStorage key for data persistence */
    storageKey?: string;
    /** Callback when step changes */
    onStepChange?: (stepIndex: number, stepId: string) => void;
    /** Callback when wizard completes */
    onComplete?: (data: any) => void | Promise<void>;
    /** Additional CSS classes */
    class?: string;
    children?: Snippet<[WizardStep, Record<string, any>]>;
  }

  let {
    steps,
    currentStep = $bindable(0),
    allowBack = true,
    showStepNumbers = true,
    persistData = false,
    storageKey = 'formWizardData',
    onStepChange,
    onComplete,
    class: className = '',
    children,
  }: Props = $props();

  let formData = $state<Record<string, any>>({});
  let isValidating = $state(false);
  let isSubmitting = $state(false);

  // Load persisted data on mount
  $effect(() => {
    if (persistData && typeof window !== 'undefined') {
      const savedData = localStorage.getItem(storageKey);
      if (savedData) {
        try {
          formData = JSON.parse(savedData);
        } catch (e) {
          console.error('Failed to parse saved wizard data:', e);
        }
      }
    }
  });

  // Save data when it changes
  $effect(() => {
    if (persistData && typeof window !== 'undefined') {
      localStorage.setItem(storageKey, JSON.stringify(formData));
    }
  });

  let progress = $derived(() => {
    return ((currentStep + 1) / steps.length) * 100;
  });

  let isFirstStep = $derived(currentStep === 0);
  let isLastStep = $derived(currentStep === steps.length - 1);

  async function goToStep(index: number) {
    if (index < 0 || index >= steps.length) return;
    if (index < currentStep || allowBack) {
      currentStep = index;
      onStepChange?.(index, steps[index].id);
    }
  }

  export async function goNext() {
    if (isLastStep) {
      await complete();
      return;
    }

    const currentStepData = steps[currentStep];

    // Validate current step if validation function exists
    if (currentStepData.validate) {
      isValidating = true;
      try {
        const isValid = await currentStepData.validate();
        if (!isValid) {
          isValidating = false;
          return;
        }
      } catch (error) {
        console.error('Step validation error:', error);
        isValidating = false;
        return;
      }
      isValidating = false;
    }

    currentStep += 1;
    onStepChange?.(currentStep, steps[currentStep].id);
  }

  export async function goBack() {
    if (!isFirstStep && allowBack) {
      currentStep -= 1;
      onStepChange?.(currentStep, steps[currentStep].id);
    }
  }

  async function complete() {
    isSubmitting = true;
    try {
      if (onComplete) {
        await onComplete(formData);
      }

      // Clear persisted data on successful completion
      if (persistData && typeof window !== 'undefined') {
        localStorage.removeItem(storageKey);
      }
    } catch (error) {
      console.error('Wizard completion error:', error);
    } finally {
      isSubmitting = false;
    }
  }

  export function reset() {
    currentStep = 0;
    formData = {};
    if (persistData && typeof window !== 'undefined') {
      localStorage.removeItem(storageKey);
    }
  }

  let wizardClasses = $derived(
    ['mljr-form-wizard', className].filter(Boolean).join(' ')
  );

  export { formData };
</script>

<div class={wizardClasses}>
  <!-- Progress Bar -->
  <div class="mljr-wizard-progress">
    <div class="mljr-wizard-progress-bar" style="width: {progress()}%"></div>
  </div>

  <!-- Steps Header -->
  <div class="mljr-wizard-steps">
    {#each steps as step, index}
      {@const isActive = index === currentStep}
      {@const isCompleted = index < currentStep}
      <button
        type="button"
        class="mljr-wizard-step"
        class:active={isActive}
        class:completed={isCompleted}
        disabled={!allowBack && index > currentStep}
        onclick={() => goToStep(index)}
      >
        <div class="mljr-wizard-step-icon">
          {#if isCompleted}
            <Icon icon="mdi:check" size={20} />
          {:else if step.icon}
            <Icon icon={step.icon} size={20} />
          {:else if showStepNumbers}
            <span>{index + 1}</span>
          {/if}
        </div>
        <div class="mljr-wizard-step-content">
          <div class="mljr-wizard-step-title">{step.title}</div>
          {#if step.description}
            <div class="mljr-wizard-step-description">{step.description}</div>
          {/if}
        </div>
      </button>
      {#if index < steps.length - 1}
        <div class="mljr-wizard-step-connector"></div>
      {/if}
    {/each}
  </div>

  <!-- Step Content -->
  <div class="mljr-wizard-content">
    {@render children?.(steps[currentStep], formData)}
  </div>

  <!-- Navigation -->
  <div class="mljr-wizard-actions">
    {#if !isFirstStep && allowBack}
      <button
        type="button"
        class="mljr-btn mljr-btn-outline-primary"
        onclick={goBack}
        disabled={isValidating || isSubmitting}
      >
        <Icon icon="mdi:chevron-left" size={18} />
        Back
      </button>
    {/if}
    <div class="mljr-flex-1"></div>
    <button
      type="button"
      class="mljr-btn mljr-btn-primary"
      onclick={goNext}
      disabled={isValidating || isSubmitting}
    >
      {#if isSubmitting}
        <Icon icon="mdi:loading" size={18} class="mljr-spin" />
        Submitting...
      {:else if isValidating}
        <Icon icon="mdi:loading" size={18} class="mljr-spin" />
        Validating...
      {:else if isLastStep}
        Complete
      {:else}
        Next
        <Icon icon="mdi:chevron-right" size={18} />
      {/if}
    </button>
  </div>
</div>

<style>
  .mljr-form-wizard {
    width: 100%;
  }

  .mljr-wizard-progress {
    width: 100%;
    height: 4px;
    background: var(--mljr-bg-secondary);
    border-radius: var(--mljr-radius-full);
    overflow: hidden;
    margin-bottom: var(--mljr-space-6);
  }

  .mljr-wizard-progress-bar {
    height: 100%;
    background: linear-gradient(90deg, var(--mljr-primary-600), var(--mljr-primary-500));
    transition: width var(--mljr-transition);
  }

  .mljr-wizard-steps {
    display: flex;
    align-items: center;
    margin-bottom: var(--mljr-space-8);
    gap: var(--mljr-space-2);
  }

  .mljr-wizard-step {
    display: flex;
    align-items: center;
    gap: var(--mljr-space-3);
    padding: var(--mljr-space-4);
    background: var(--mljr-bg);
    border: 2px solid var(--mljr-border);
    border-radius: var(--mljr-radius-lg);
    cursor: pointer;
    transition: all var(--mljr-transition-fast);
    flex: 1;
    text-align: left;
  }

  .mljr-wizard-step:hover:not(:disabled) {
    border-color: var(--mljr-primary-600);
    box-shadow: var(--mljr-clay-shadow-sm);
  }

  .mljr-wizard-step.active {
    border-color: var(--mljr-primary-600);
    background: var(--mljr-primary-50);
    box-shadow: var(--mljr-clay-shadow);
  }

  :global(.dark) .mljr-wizard-step.active {
    background: rgba(249, 115, 22, 0.1);
  }

  .mljr-wizard-step.completed {
    border-color: var(--mljr-success);
  }

  .mljr-wizard-step:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .mljr-wizard-step-icon {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--mljr-bg-secondary);
    border-radius: var(--mljr-radius-full);
    font-weight: 600;
    color: var(--mljr-text-secondary);
    flex-shrink: 0;
  }

  .mljr-wizard-step.active .mljr-wizard-step-icon {
    background: var(--mljr-primary-600);
    color: white;
  }

  .mljr-wizard-step.completed .mljr-wizard-step-icon {
    background: var(--mljr-success);
    color: white;
  }

  .mljr-wizard-step-content {
    flex: 1;
    min-width: 0;
  }

  .mljr-wizard-step-title {
    font-weight: 600;
    color: var(--mljr-text);
    font-size: var(--mljr-text-base);
  }

  .mljr-wizard-step-description {
    font-size: var(--mljr-text-sm);
    color: var(--mljr-text-secondary);
    margin-top: var(--mljr-space-1);
  }

  .mljr-wizard-step-connector {
    width: 24px;
    height: 2px;
    background: var(--mljr-border);
    flex-shrink: 0;
  }

  .mljr-wizard-content {
    padding: var(--mljr-space-6) 0;
    min-height: 200px;
  }

  .mljr-wizard-actions {
    display: flex;
    gap: var(--mljr-space-3);
    padding-top: var(--mljr-space-6);
    border-top: 1px solid var(--mljr-border);
  }

  .mljr-flex-1 {
    flex: 1;
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

  @media (max-width: 768px) {
    .mljr-wizard-steps {
      overflow-x: auto;
      padding-bottom: var(--mljr-space-2);
    }

    .mljr-wizard-step {
      min-width: 200px;
    }

    .mljr-wizard-step-description {
      display: none;
    }
  }
</style>
