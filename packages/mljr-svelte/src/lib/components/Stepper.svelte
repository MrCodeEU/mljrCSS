<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  interface Step {
    id: string;
    title: string;
    description?: string;
    icon?: string;
    disabled?: boolean;
  }

  interface Props extends HTMLAttributes<HTMLDivElement> {
    steps: Step[];
    currentStep?: number;
    orientation?: 'horizontal' | 'vertical';
    variant?: 'default' | 'pills';
    size?: 'sm' | 'md' | 'lg';
    allowClick?: boolean;
    children?: Snippet;
    onStepClick?: (index: number) => void;
  }

  let {
    steps,
    currentStep = $bindable(0),
    orientation = 'horizontal',
    variant = 'default',
    size = 'md',
    allowClick = false,
    children,
    onStepClick,
    class: className = '',
    ...restProps
  }: Props = $props();

  const sizeClasses = {
    sm: 'mljr-stepper-sm',
    md: '',
    lg: 'mljr-stepper-lg',
  };

  const variantClasses = {
    default: '',
    pills: 'mljr-stepper-pills',
  };

  let stepperClasses = $derived(
    [
      'mljr-stepper',
      `mljr-stepper-${orientation}`,
      sizeClasses[size],
      variantClasses[variant],
      className,
    ]
      .filter(Boolean)
      .join(' ')
  );

  function handleStepClick(index: number, step: Step) {
    if (!allowClick || step.disabled || index > currentStep) return;
    currentStep = index;
    onStepClick?.(index);
  }

  function isStepCompleted(index: number): boolean {
    return index < currentStep;
  }

  function isStepActive(index: number): boolean {
    return index === currentStep;
  }
</script>

<div class={stepperClasses} {...restProps}>
  {#each steps as step, index}
    {@const completed = isStepCompleted(index)}
    {@const active = isStepActive(index)}
    
    <div
      class="mljr-step"
      class:mljr-step-completed={completed}
      class:mljr-step-active={active}
      class:mljr-step-disabled={step.disabled}
      class:mljr-step-clickable={allowClick && !step.disabled && index <= currentStep}
      onclick={() => handleStepClick(index, step)}
      role={allowClick ? 'button' : undefined}
      tabindex={allowClick ? 0 : undefined}
      aria-current={active ? 'step' : undefined}
      aria-disabled={step.disabled}
    >
      <div class="mljr-step-content">
        <div class="mljr-step-indicator">
          {#if completed}
            <svg class="mljr-step-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          {:else if step.icon && active}
            <span>{step.icon}</span>
          {:else}
            <span>{index + 1}</span>
          {/if}
        </div>
        <div class="mljr-step-text">
          <div class="mljr-step-title">{step.title}</div>
          {#if step.description}
            <div class="mljr-step-description">{step.description}</div>
          {/if}
        </div>
      </div>
    </div>
  {/each}
</div>

{#if children}
  <div class="mljr-stepper-content">
    {@render children()}
  </div>
{/if}
