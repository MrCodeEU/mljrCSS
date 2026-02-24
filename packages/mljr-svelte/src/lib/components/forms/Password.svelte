<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';
  import zxcvbn from 'zxcvbn-typescript';

  type PasswordSize = 'sm' | 'md' | 'lg';
  type StrengthLevel = 0 | 1 | 2 | 3 | 4;

  interface ZXCVBNFeedback {
    warning: string;
    suggestions: string[];
  }

  interface ZXCVBNResult {
    score: StrengthLevel;
    feedback: ZXCVBNFeedback;
    crack_times_display: {
      online_throttling_100_per_hour: string;
      online_no_throttling_10_per_second: string;
      offline_slow_hashing_1e4_per_second: string;
      offline_fast_hashing_1e10_per_second: string;
    };
  }

  interface PasswordRequirement {
    id: string;
    label: string;
    test: (password: string) => boolean;
  }

  interface Props extends Omit<HTMLInputAttributes, 'size' | 'value' | 'type'> {
    label?: string;
    helperText?: string;
    errorText?: string;
    size?: PasswordSize;
    error?: boolean;
    success?: boolean;
    required?: boolean;
    value?: string;
    /** Show password strength meter */
    showStrength?: boolean;
    /** Show estimated crack time */
    showCrackTime?: boolean;
    /** Show password requirements checklist */
    showRequirements?: boolean;
    /** Minimum required strength score (0-4) */
    minStrength?: StrengthLevel;
    /** Custom password requirements */
    requirements?: PasswordRequirement[];
    /** User inputs to check against (email, name, etc.) */
    userInputs?: string[];
    /** Called when strength changes */
    onStrengthChange?: (result: ZXCVBNResult) => void;
  }

  let {
    label = '',
    helperText = '',
    errorText = '',
    size = 'md',
    error = false,
    success = false,
    required = false,
    value = $bindable(''),
    showStrength = true,
    showCrackTime = false,
    showRequirements = false,
    minStrength = 0,
    requirements = [],
    userInputs = [],
    onStrengthChange,
    id,
    class: className = '',
    ...restProps
  }: Props = $props();

  // State
  let showPassword = $state(false);
  let strengthResult = $state<ZXCVBNResult | null>(null);
  let touched = $state(false);

  // Default password requirements
  const defaultRequirements: PasswordRequirement[] = [
    { id: 'length', label: 'At least 8 characters', test: (pwd) => pwd.length >= 8 },
    { id: 'lowercase', label: 'One lowercase letter', test: (pwd) => /[a-z]/.test(pwd) },
    { id: 'uppercase', label: 'One uppercase letter', test: (pwd) => /[A-Z]/.test(pwd) },
    { id: 'number', label: 'One number', test: (pwd) => /\d/.test(pwd) },
    { id: 'special', label: 'One special character', test: (pwd) => /[^a-zA-Z0-9]/.test(pwd) },
  ];

  // Combine default and custom requirements
  const allRequirements = $derived(
    requirements.length > 0 ? requirements : defaultRequirements
  );

  // Check which requirements are met
  const requirementStatus = $derived(
    allRequirements.map((req) => ({
      ...req,
      met: req.test(value),
    }))
  );

  // Calculate password strength when value changes
  $effect(() => {
    if (value.length > 0) {
      try {
        // Filter out empty user inputs
        const validUserInputs = userInputs.filter((input) => input && input.length > 0);
        const result = zxcvbn(value, validUserInputs) as ZXCVBNResult;
        strengthResult = result;
        onStrengthChange?.(result);
      } catch (e) {
        console.error('Error calculating password strength:', e);
        strengthResult = null;
      }
    } else {
      strengthResult = null;
    }
  });

  // Derived values
  let inputId = $derived(id || `password-${Math.random().toString(36).slice(2, 9)}`);
  
  const strengthLabels: Record<StrengthLevel, string> = {
    0: 'Very Weak',
    1: 'Weak',
    2: 'Fair',
    3: 'Good',
    4: 'Strong',
  };

  const strengthScore = $derived(strengthResult?.score ?? 0);
  const strengthLabel = $derived(strengthLabels[strengthScore]);
  
  // Map 0-4 score to 0-5 for display (0 becomes 0, others shift up by 1)
  const displayStrength = $derived(value.length === 0 ? 0 : (strengthScore + 1) as 0 | 1 | 2 | 3 | 4 | 5);

  // Check if password meets minimum strength
  const meetsMinStrength = $derived(strengthScore >= minStrength);
  
  // Show error if below minimum strength and touched
  const showStrengthError = $derived(
    touched && minStrength > 0 && !meetsMinStrength && value.length > 0
  );

  // Get feedback messages
  const feedbackMessages = $derived(() => {
    const messages: string[] = [];
    
    if (strengthResult?.feedback.warning) {
      messages.push(strengthResult.feedback.warning);
    }
    
    if (strengthResult?.feedback.suggestions) {
      messages.push(...strengthResult.feedback.suggestions);
    }
    
    return messages;
  });

  // Get crack time display
  const crackTimeDisplay = $derived(() => {
    if (!strengthResult) return '';
    // Use the most restrictive scenario for display
    return strengthResult.crack_times_display.offline_slow_hashing_1e4_per_second;
  });

  // Size classes
  const sizeClasses: Record<PasswordSize, string> = {
    sm: 'mljr-password-sm',
    md: '',
    lg: 'mljr-password-lg',
  };

  // Toggle password visibility
  function toggleVisibility() {
    showPassword = !showPassword;
  }

  // Handle input
  function handleInput() {
    touched = true;
  }

  // Handle blur
  function handleBlur() {
    touched = true;
  }

  // Computed classes
  let containerClasses = $derived(
    [
      'mljr-password',
      sizeClasses[size],
      (error || showStrengthError) && 'mljr-password-error',
      success && 'mljr-password-success',
      className,
    ]
      .filter(Boolean)
      .join(' ')
  );

  let labelClasses = $derived(
    ['mljr-password-label', required && 'mljr-password-label-required'].filter(Boolean).join(' ')
  );
</script>

<div class={containerClasses}>
  {#if label}
    <label for={inputId} class={labelClasses}>
      {label}
    </label>
  {/if}

  <div class="mljr-password-wrapper">
    <input
      id={inputId}
      type={showPassword ? 'text' : 'password'}
      class="mljr-password-input"
      aria-invalid={error || showStrengthError}
      aria-describedby={
        errorText || showStrengthError 
          ? `${inputId}-error` 
          : helperText 
            ? `${inputId}-helper` 
            : undefined
      }
      bind:value
      oninput={handleInput}
      onblur={handleBlur}
      {...restProps}
    />
    
    <button
      type="button"
      class="mljr-password-toggle"
      onclick={toggleVisibility}
      aria-label={showPassword ? 'Hide password' : 'Show password'}
      aria-pressed={showPassword}
      tabindex="-1"
    >
      {#if showPassword}
        <!-- Eye-off icon -->
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
          <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
          <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/>
          <line x1="2" x2="22" y1="2" y2="22"/>
        </svg>
      {:else}
        <!-- Eye icon -->
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      {/if}
    </button>
  </div>

  <!-- Strength Meter -->
  {#if showStrength && value.length > 0}
    <div class="mljr-password-strength">
      <div class="mljr-password-strength-bar">
        <div 
          class="mljr-password-strength-fill" 
          data-strength={displayStrength}
          aria-valuenow={strengthScore}
          aria-valuemin="0"
          aria-valuemax="4"
          role="progressbar"
        ></div>
      </div>
      <div class="mljr-password-strength-label">
        <span class="mljr-password-strength-text" data-strength={displayStrength}>
          {strengthLabel}
        </span>
        <span class="mljr-password-strength-score">
          {strengthScore}/4
        </span>
      </div>
      
      {#if showCrackTime && strengthResult}
        <p class="mljr-password-crack-time">
          Estimated time to crack: {crackTimeDisplay()}
        </p>
      {/if}
    </div>

    <!-- Feedback Messages -->
    {#if feedbackMessages().length > 0}
      <div class="mljr-password-feedback">
        <p class="mljr-password-feedback-title">Suggestions</p>
        <ul class="mljr-password-feedback-list">
          {#each feedbackMessages() as message}
            <li class="mljr-password-feedback-item" data-met="false">
              <svg class="mljr-password-feedback-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" x2="12" y1="8" y2="12"/>
                <line x1="12" x2="12.01" y1="16" y2="16"/>
              </svg>
              {message}
            </li>
          {/each}
        </ul>
      </div>
    {/if}
  {/if}

  <!-- Requirements Checklist -->
  {#if showRequirements}
    <div class="mljr-password-requirements">
      <p class="mljr-password-requirements-title">Password Requirements</p>
      <ul class="mljr-password-requirements-list">
        {#each requirementStatus as req}
          <li class="mljr-password-requirement" data-met={req.met}>
            {#if req.met}
              <svg class="mljr-password-requirement-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            {:else}
              <svg class="mljr-password-requirement-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
              </svg>
            {/if}
            {req.label}
          </li>
        {/each}
      </ul>
    </div>
  {/if}

  <!-- Error Text -->
  {#if errorText}
    <p id="{inputId}-error" class="mljr-password-error-text">{errorText}</p>
  {:else if showStrengthError}
    <p id="{inputId}-error" class="mljr-password-error-text">
      Password must be at least {strengthLabels[minStrength].toLowerCase()}
    </p>
  {:else if helperText}
    <p id="{inputId}-helper" class="mljr-password-helper">{helperText}</p>
  {/if}
</div>
