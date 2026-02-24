<script lang="ts">
  import { parsePhoneNumberFromString, isValidPhoneNumber, getCountries, getCountryCallingCode, type CountryCode } from 'libphonenumber-js';
  import Icon from '../layout/Icon.svelte';
  import type { HTMLInputAttributes } from 'svelte/elements';

  interface Props extends Omit<HTMLInputAttributes, 'value' | 'oninput' | 'onchange'> {
    /** Input value (E.164 format: +1234567890) */
    value?: string;
    /** Currently selected country code */
    country?: CountryCode;
    /** Input label */
    label?: string;
    /** Helper text */
    helper?: string;
    /** Error message */
    error?: string;
    /** Whether the field is required */
    required?: boolean;
    /** Placeholder text */
    placeholder?: string;
    /** Disable the input */
    disabled?: boolean;
    /** Show country flags in dropdown */
    showFlags?: boolean;
    /** Only allow specific countries */
    allowedCountries?: CountryCode[];
    /** Exclude specific countries */
    excludedCountries?: CountryCode[];
    /** Preferred countries to show at top */
    preferredCountries?: CountryCode[];
    /** Callback when value changes */
    onchange?: (value: string, isValid: boolean, country?: CountryCode) => void;
  }

  let {
    value = $bindable(''),
    country = $bindable('US'),
    label,
    helper,
    error,
    required = false,
    placeholder = 'Phone number',
    disabled = false,
    showFlags = true,
    allowedCountries,
    excludedCountries = [],
    preferredCountries = ['US', 'GB', 'DE', 'FR', 'CA', 'AU', 'JP'],
    onchange,
    class: className = '',
    ...rest
  }: Props = $props();

  let inputElement = $state<HTMLInputElement | null>(null);
  let isOpen = $state(false);
  let searchQuery = $state('');
  let isValid = $state(false);
  let nationalNumber = $state('');
  
  // Generate unique ID for label association
  const inputId = 'phone-' + Math.random().toString(36).slice(2, 9);

  // Get all available countries
  const allCountries = getCountries();
  
  // Filter countries based on allowed/excluded lists
  let availableCountries = $derived(() => {
    let countries = allowedCountries || allCountries;
    return countries.filter(c => !excludedCountries.includes(c));
  });

  // Sort countries: preferred first, then alphabetically
  let sortedCountries = $derived(() => {
    const countries = availableCountries();
    return countries.sort((a, b) => {
      const aPreferred = preferredCountries.indexOf(a);
      const bPreferred = preferredCountries.indexOf(b);
      
      if (aPreferred !== -1 && bPreferred !== -1) return aPreferred - bPreferred;
      if (aPreferred !== -1) return -1;
      if (bPreferred !== -1) return 1;
      
      return new Intl.Collator().compare(getCountryName(a), getCountryName(b));
    });
  });

  // Filter countries by search
  let filteredCountries = $derived(() => {
    if (!searchQuery) return sortedCountries();
    const query = searchQuery.toLowerCase();
    return sortedCountries().filter(c => 
      getCountryName(c).toLowerCase().includes(query) ||
      getCountryCallingCode(c).includes(query) ||
      c.toLowerCase().includes(query)
    );
  });

  function getCountryName(code: CountryCode): string {
    try {
      const names = new Intl.DisplayNames(['en'], { type: 'region' });
      return names.of(code) || code;
    } catch {
      return code;
    }
  }

  function getFlagEmoji(code: CountryCode): string {
    const codePoints = code
      .toUpperCase()
      .split('')
      .map(char => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  }

  function formatNationalNumber(number: string, countryCode: CountryCode): string {
    try {
      const phoneNumber = parsePhoneNumberFromString(number, countryCode);
      return phoneNumber?.formatNational() || number;
    } catch {
      return number;
    }
  }

  function handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    let rawValue = target.value.replace(/\D/g, '');
    
    // Try to parse and format
    try {
      const phoneNumber = parsePhoneNumberFromString(rawValue, country);
      if (phoneNumber) {
        isValid = phoneNumber.isValid();
        value = phoneNumber.format('E.164');
        nationalNumber = phoneNumber.formatNational();
      } else {
        nationalNumber = target.value;
        isValid = isValidPhoneNumber(rawValue, country);
        // Don't update E.164 value if parsing fails
      }
    } catch {
      nationalNumber = target.value;
      isValid = false;
    }
    
    onchange?.(value, isValid, country);
  }

  function handleCountrySelect(newCountry: CountryCode) {
    country = newCountry;
    isOpen = false;
    searchQuery = '';
    
    // Re-validate with new country
    if (nationalNumber) {
      try {
        const phoneNumber = parsePhoneNumberFromString(nationalNumber, country);
        if (phoneNumber) {
          isValid = phoneNumber.isValid();
          value = phoneNumber.format('E.164');
        }
      } catch {
        isValid = false;
      }
      onchange?.(value, isValid, country);
    }
    
    inputElement?.focus();
  }

  function toggleDropdown() {
    if (!disabled) {
      isOpen = !isOpen;
      if (isOpen) {
        // Focus search input after opening
        setTimeout(() => {
          const searchInput = document.querySelector('.mljr-phone-search input') as HTMLInputElement;
          searchInput?.focus();
        }, 0);
      }
    }
  }

  function handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.mljr-phone-input')) {
      isOpen = false;
    }
  }

  // Close dropdown on click outside
  $effect(() => {
    if (browser && isOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  });

  import { browser } from '$app/environment';
</script>

<div class="mljr-phone-input {className}" class:has-error={!!error} class:is-disabled={disabled}>
  {#if label}
    <label class="mljr-phone-label" for={inputId}>
      {label}
      {#if required}
        <span class="mljr-phone-required">*</span>
      {/if}
    </label>
  {/if}

  <div class="mljr-phone-wrapper">
    <!-- Country Selector -->
    <button
      type="button"
      class="mljr-phone-country"
      class:is-expanded={isOpen}
      onclick={toggleDropdown}
      {disabled}
      aria-haspopup="listbox"
      aria-expanded={isOpen}
    >
      {#if showFlags}
        <span class="mljr-phone-flag">{getFlagEmoji(country)}</span>
      {/if}
      <span class="mljr-phone-code">+{getCountryCallingCode(country)}</span>
      <Icon icon="ph:caret-down" size={14} class="mljr-phone-caret" />
    </button>

    <!-- Phone Number Input -->
    <input
      bind:this={inputElement}
      id={inputId}
      type="tel"
      class="mljr-phone-field"
      {placeholder}
      {disabled}
      {required}
      value={nationalNumber || value}
      oninput={handleInput}
      {...rest}
    />

    <!-- Validation Status -->
    {#if value}
      <span class="mljr-phone-status" class:valid={isValid}>
        <Icon icon={isValid ? 'ph:check-circle' : 'ph:warning-circle'} size={18} />
      </span>
    {/if}

    <!-- Country Dropdown -->
    {#if isOpen}
      <div class="mljr-phone-dropdown" role="listbox">
        <!-- Search -->
        <div class="mljr-phone-search">
          <Icon icon="ph:magnifying-glass" size={16} />
          <input
            type="text"
            placeholder="Search countries..."
            bind:value={searchQuery}
          />
        </div>

        <!-- Country List -->
        <div class="mljr-phone-list">
          {#each filteredCountries() as countryCode}
            <button
              type="button"
              class="mljr-phone-option"
              class:selected={countryCode === country}
              onclick={() => handleCountrySelect(countryCode)}
              role="option"
              aria-selected={countryCode === country}
            >
              {#if showFlags}
                <span class="mljr-phone-flag">{getFlagEmoji(countryCode)}</span>
              {/if}
              <span class="mljr-phone-country-name">{getCountryName(countryCode)}</span>
              <span class="mljr-phone-country-code">+{getCountryCallingCode(countryCode)}</span>
              {#if countryCode === country}
                <Icon icon="ph:check" size={14} class="mljr-phone-check" />
              {/if}
            </button>
          {/each}
          
          {#if filteredCountries().length === 0}
            <div class="mljr-phone-empty">
              No countries found
            </div>
          {/if}
        </div>
      </div>
    {/if}
  </div>

  <!-- Helper or Error Text -->
  {#if error}
    <span class="mljr-phone-error">{error}</span>
  {:else if helper}
    <span class="mljr-phone-helper">{helper}</span>
  {/if}
</div>

<style>
  .mljr-phone-input {
    display: flex;
    flex-direction: column;
    gap: var(--mljr-space-2);
  }

  .mljr-phone-label {
    font-size: var(--mljr-text-sm);
    font-weight: 500;
    color: var(--mljr-text);
  }

  .mljr-phone-required {
    color: var(--mljr-error-500);
    margin-left: var(--mljr-space-1);
  }

  .mljr-phone-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    background: var(--mljr-bg);
    border: 1px solid var(--mljr-border);
    border-radius: var(--mljr-radius-lg);
    box-shadow: var(--mljr-clay-inset-sm);
    transition: all var(--mljr-transition-fast);
  }

  .mljr-phone-wrapper:focus-within {
    border-color: var(--mljr-primary-400);
    box-shadow: var(--mljr-clay-inset-sm), 0 0 0 3px var(--mljr-primary-100);
  }

  .has-error .mljr-phone-wrapper {
    border-color: var(--mljr-error-400);
  }

  .has-error .mljr-phone-wrapper:focus-within {
    box-shadow: var(--mljr-clay-inset-sm), 0 0 0 3px var(--mljr-error-100);
  }

  .is-disabled .mljr-phone-wrapper {
    opacity: 0.6;
    cursor: not-allowed;
  }

  /* Country Selector Button */
  .mljr-phone-country {
    display: flex;
    align-items: center;
    gap: var(--mljr-space-2);
    padding: var(--mljr-space-3) var(--mljr-space-3);
    background: var(--mljr-bg-secondary);
    border: none;
    border-right: 1px solid var(--mljr-border);
    border-radius: var(--mljr-radius-lg) 0 0 var(--mljr-radius-lg);
    color: var(--mljr-text);
    cursor: pointer;
    font-size: var(--mljr-text-sm);
    font-weight: 500;
    transition: all var(--mljr-transition-fast);
    flex-shrink: 0;
  }

  .mljr-phone-country:hover:not(:disabled) {
    background: var(--mljr-bg-tertiary);
  }

  .mljr-phone-flag {
    font-size: 1.25em;
    line-height: 1;
  }

  .mljr-phone-code {
    color: var(--mljr-text-secondary);
    font-variant-numeric: tabular-nums;
  }

  .mljr-phone-caret {
    color: var(--mljr-text-muted);
    transition: transform var(--mljr-transition-fast);
  }

  .mljr-phone-country.is-expanded .mljr-phone-caret {
    transform: rotate(180deg);
  }

  /* Phone Input Field */
  .mljr-phone-field {
    flex: 1;
    padding: var(--mljr-space-3) var(--mljr-space-4);
    background: transparent;
    border: none;
    color: var(--mljr-text);
    font-size: var(--mljr-text-base);
    font-variant-numeric: tabular-nums;
    min-width: 0;
  }

  .mljr-phone-field:focus {
    outline: none;
  }

  .mljr-phone-field::placeholder {
    color: var(--mljr-text-muted);
  }

  .mljr-phone-field:disabled {
    cursor: not-allowed;
  }

  /* Validation Status */
  .mljr-phone-status {
    display: flex;
    align-items: center;
    padding-right: var(--mljr-space-3);
    color: var(--mljr-error-500);
    flex-shrink: 0;
  }

  .mljr-phone-status.valid {
    color: var(--mljr-success-500);
  }

  /* Dropdown */
  .mljr-phone-dropdown {
    position: absolute;
    top: calc(100% + var(--mljr-space-2));
    left: 0;
    min-width: 280px;
    max-height: 320px;
    background: var(--mljr-bg);
    border-radius: var(--mljr-radius-xl);
    box-shadow: var(--mljr-clay-shadow-lg);
    z-index: 50;
    overflow: hidden;
    animation: phoneDropdownSlide 0.2s ease;
  }

  @keyframes phoneDropdownSlide {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Search */
  .mljr-phone-search {
    display: flex;
    align-items: center;
    gap: var(--mljr-space-2);
    padding: var(--mljr-space-3);
    border-bottom: 1px solid var(--mljr-border);
    color: var(--mljr-text-muted);
  }

  .mljr-phone-search input {
    flex: 1;
    background: transparent;
    border: none;
    color: var(--mljr-text);
    font-size: var(--mljr-text-sm);
  }

  .mljr-phone-search input:focus {
    outline: none;
  }

  /* Country List */
  .mljr-phone-list {
    max-height: 240px;
    overflow-y: auto;
    padding: var(--mljr-space-2);
  }

  .mljr-phone-option {
    display: flex;
    align-items: center;
    gap: var(--mljr-space-3);
    width: 100%;
    padding: var(--mljr-space-3);
    background: transparent;
    border: none;
    border-radius: var(--mljr-radius-lg);
    color: var(--mljr-text);
    cursor: pointer;
    font-size: var(--mljr-text-sm);
    text-align: left;
    transition: all var(--mljr-transition-fast);
  }

  .mljr-phone-option:hover {
    background: var(--mljr-bg-secondary);
  }

  .mljr-phone-option.selected {
    background: var(--mljr-primary-100);
    color: var(--mljr-primary-700);
  }

  .mljr-phone-country-name {
    flex: 1;
  }

  .mljr-phone-country-code {
    color: var(--mljr-text-muted);
    font-variant-numeric: tabular-nums;
  }

  .mljr-phone-check {
    color: var(--mljr-primary-500);
  }

  .mljr-phone-empty {
    padding: var(--mljr-space-6);
    text-align: center;
    color: var(--mljr-text-muted);
    font-size: var(--mljr-text-sm);
  }

  /* Helper/Error */
  .mljr-phone-helper {
    font-size: var(--mljr-text-xs);
    color: var(--mljr-text-muted);
  }

  .mljr-phone-error {
    font-size: var(--mljr-text-xs);
    color: var(--mljr-error-500);
  }

  /* Dark Mode */
  :global([data-theme="dark"]) .mljr-phone-country,
  :global(.dark) .mljr-phone-country {
    background: var(--mljr-bg-tertiary);
  }

  :global([data-theme="dark"]) .mljr-phone-option.selected,
  :global(.dark) .mljr-phone-option.selected {
    background: rgba(249, 115, 22, 0.15);
    color: var(--mljr-primary-300);
  }
</style>
