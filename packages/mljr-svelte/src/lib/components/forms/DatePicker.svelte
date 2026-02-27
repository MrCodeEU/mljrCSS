<script lang="ts">
  import Icon from '../layout/Icon.svelte';
  import Button from './Button.svelte';

  interface Props {
    /** Selected date */
    value?: Date | null;
    /** Input label */
    label?: string;
    /** Placeholder text */
    placeholder?: string;
    /** Minimum selectable date */
    min?: Date;
    /** Maximum selectable date */
    max?: Date;
    /** Disable the input */
    disabled?: boolean;
    /** Show time picker */
    showTime?: boolean;
    /** Date format for display */
    format?: 'short' | 'medium' | 'long' | 'iso';
    /** Additional CSS class */
    class?: string;
    /** Callback when date changes */
    onchange?: (date: Date | null) => void;
  }

  let {
    value = $bindable(null),
    label,
    placeholder = 'Select date',
    min,
    max,
    disabled = false,
    showTime = false,
    format = 'medium',
    class: className = '',
    onchange,
  }: Props = $props();

  let isOpen = $state(false);
  let viewDate = $state(new Date());
  let viewMode = $state<'days' | 'months' | 'years'>('days');
  let tempDate = $state<Date | null>(null);
  
  // Generate unique ID for label association
  const triggerId = 'datepicker-' + Math.random().toString(36).slice(2, 9);
  let tempHours = $state(12);
  let tempMinutes = $state(0);

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                  'July', 'August', 'September', 'October', 'November', 'December'];
  const shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                       'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  function formatDate(date: Date | null): string {
    if (!date) return '';
    
    try {
      switch (format) {
        case 'short':
          return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
        case 'long':
          return date.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
        case 'iso':
          return date.toISOString().split('T')[0];
        case 'medium':
        default:
          return date.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' });
      }
    } catch {
      return date.toDateString();
    }
  }

  function formatDateTime(date: Date | null): string {
    if (!date) return '';
    const dateStr = formatDate(date);
    if (!showTime) return dateStr;
    const timeStr = date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
    return `${dateStr}, ${timeStr}`;
  }

  function getDaysInMonth(year: number, month: number): number {
    return new Date(year, month + 1, 0).getDate();
  }

  function getFirstDayOfMonth(year: number, month: number): number {
    return new Date(year, month, 1).getDay();
  }

  function getCalendarDays(): (number | null)[] {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    
    const days: (number | null)[] = [];
    
    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    
    // Days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    return days;
  }

  function getYears(): number[] {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 100;
    const endYear = currentYear + 20;
    return Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);
  }

  function isDateDisabled(day: number): boolean {
    const checkDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    
    if (min && checkDate < new Date(min.getFullYear(), min.getMonth(), min.getDate())) {
      return true;
    }
    if (max && checkDate > new Date(max.getFullYear(), max.getMonth(), max.getDate())) {
      return true;
    }
    
    return false;
  }

  function isSelected(day: number): boolean {
    if (!value && !tempDate) return false;
    const checkDate = tempDate || value;
    return checkDate?.getDate() === day && 
           checkDate?.getMonth() === viewDate.getMonth() && 
           checkDate?.getFullYear() === viewDate.getFullYear();
  }

  function isToday(day: number): boolean {
    const today = new Date();
    return today.getDate() === day && 
           today.getMonth() === viewDate.getMonth() && 
           today.getFullYear() === viewDate.getFullYear();
  }

  function selectDay(day: number) {
    if (isDateDisabled(day)) return;
    
    const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    if (showTime) {
      newDate.setHours(tempHours, tempMinutes);
    }
    tempDate = newDate;
  }

  function confirmSelection() {
    if (tempDate) {
      value = new Date(tempDate);
      onchange?.(value);
    }
    isOpen = false;
    tempDate = null;
  }

  function clearSelection() {
    value = null;
    tempDate = null;
    onchange?.(null);
    isOpen = false;
  }

  function navigateMonth(delta: number) {
    viewDate = new Date(viewDate.getFullYear(), viewDate.getMonth() + delta, 1);
  }

  function selectMonth(monthIndex: number) {
    viewDate = new Date(viewDate.getFullYear(), monthIndex, 1);
    viewMode = 'days';
  }

  function selectYear(year: number) {
    viewDate = new Date(year, viewDate.getMonth(), 1);
    viewMode = 'months';
  }

  function openPicker() {
    if (disabled) return;
    isOpen = true;
    viewMode = 'days';
    if (value) {
      viewDate = new Date(value);
      tempDate = new Date(value);
      tempHours = value.getHours();
      tempMinutes = value.getMinutes();
    } else {
      tempDate = null;
      viewDate = new Date();
    }
  }

  function handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.mljr-datepicker')) {
      isOpen = false;
    }
  }

  const browser = typeof window !== 'undefined';
  
  $effect(() => {
    if (browser && isOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  });
</script>

<div class="mljr-datepicker {className}" class:is-open={isOpen} class:is-disabled={disabled}>
  {#if label}
    <label class="mljr-datepicker-label" for={triggerId}>{label}</label>
  {/if}

  <button
    type="button"
    id={triggerId}
    class="mljr-datepicker-trigger"
    onclick={openPicker}
    {disabled}
  >
    <Icon icon="ph:calendar-blank" size={20} />
    <span class="mljr-datepicker-value">
      {#if value}
        {formatDateTime(value)}
      {:else}
        {placeholder}
      {/if}
    </span>
    {#if value}
      <span 
        class="mljr-datepicker-clear"
        onclick={(e) => { e.stopPropagation(); clearSelection(); }}
        onkeydown={(e) => { 
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            e.stopPropagation();
            clearSelection();
          }
        }}
        role="button"
        tabindex="0"
        aria-label="Clear selection"
      >
        <Icon icon="ph:x" size={16} />
      </span>
    {/if}
  </button>

  {#if isOpen}
    <div class="mljr-datepicker-popup">
      <!-- Header -->
      <div class="mljr-datepicker-header">
        <button type="button" class="mljr-datepicker-nav" onclick={() => navigateMonth(-1)}>
          <Icon icon="ph:caret-left" size={18} />
        </button>
        
        <button 
          type="button" 
          class="mljr-datepicker-title"
          onclick={() => viewMode = viewMode === 'days' ? 'months' : 'years'}
        >
          {#if viewMode === 'days'}
            {months[viewDate.getMonth()]} {viewDate.getFullYear()}
          {:else if viewMode === 'months'}
            {viewDate.getFullYear()}
          {:else}
            Years
          {/if}
        </button>
        
        <button type="button" class="mljr-datepicker-nav" onclick={() => navigateMonth(1)}>
          <Icon icon="ph:caret-right" size={18} />
        </button>
      </div>

      <!-- Days View -->
      {#if viewMode === 'days'}
        <div class="mljr-datepicker-calendar">
          <div class="mljr-datepicker-weekdays">
            {#each weekDays as day}
              <span>{day}</span>
            {/each}
          </div>
          <div class="mljr-datepicker-days">
            {#each getCalendarDays() as day}
              {#if day !== null}
                <button
                  type="button"
                  class="mljr-datepicker-day"
                  class:selected={isSelected(day)}
                  class:today={isToday(day)}
                  class:disabled={isDateDisabled(day)}
                  onclick={() => selectDay(day)}
                  disabled={isDateDisabled(day)}
                >
                  {day}
                </button>
              {:else}
                <span class="mljr-datepicker-day-empty"></span>
              {/if}
            {/each}
          </div>
        </div>

        <!-- Time Picker -->
        {#if showTime}
          <div class="mljr-datepicker-time">
            <span class="mljr-datepicker-time-label">Time:</span>
            <input
              type="number"
              min="0"
              max="23"
              bind:value={tempHours}
              class="mljr-datepicker-time-input"
            />
            <span>:</span>
            <input
              type="number"
              min="0"
              max="59"
              bind:value={tempMinutes}
              class="mljr-datepicker-time-input"
            />
          </div>
        {/if}

        <!-- Footer -->
        <div class="mljr-datepicker-footer">
          <Button variant="ghost" size="sm" onclick={clearSelection}>Clear</Button>
          <Button variant="primary" size="sm" onclick={confirmSelection}>OK</Button>
        </div>
      {/if}

      <!-- Months View -->
      {#if viewMode === 'months'}
        <div class="mljr-datepicker-grid">
          {#each months as month, index}
            <button
              type="button"
              class="mljr-datepicker-grid-item"
              class:selected={viewDate.getMonth() === index}
              onclick={() => selectMonth(index)}
            >
              {shortMonths[index]}
            </button>
          {/each}
        </div>
      {/if}

      <!-- Years View -->
      {#if viewMode === 'years'}
        <div class="mljr-datepicker-grid mljr-datepicker-years">
          {#each getYears() as year}
            <button
              type="button"
              class="mljr-datepicker-grid-item"
              class:selected={viewDate.getFullYear() === year}
              onclick={() => selectYear(year)}
            >
              {year}
            </button>
          {/each}
        </div>
      {/if}
    </div>
  {/if}
</div>

<style>
  .mljr-datepicker {
    position: relative;
    display: inline-flex;
    flex-direction: column;
    gap: var(--mljr-space-2);
  }

  .mljr-datepicker-label {
    font-size: var(--mljr-text-sm);
    font-weight: 500;
    color: var(--mljr-text);
  }

  .mljr-datepicker-trigger {
    display: flex;
    align-items: center;
    gap: var(--mljr-space-3);
    width: 100%;
    padding: var(--mljr-space-3) var(--mljr-space-4);
    background: var(--mljr-bg);
    border: 1px solid var(--mljr-border);
    border-radius: var(--mljr-radius-lg);
    color: var(--mljr-text);
    font-size: var(--mljr-text-base);
    cursor: pointer;
    box-shadow: var(--mljr-clay-inset-sm);
    transition: all var(--mljr-transition-fast);
  }

  .mljr-datepicker-trigger:hover:not(:disabled) {
    border-color: var(--mljr-primary-400);
  }

  .mljr-datepicker-trigger:focus {
    outline: none;
    border-color: var(--mljr-primary-400);
    box-shadow: var(--mljr-clay-inset-sm), 0 0 0 3px var(--mljr-primary-100);
  }

  .mljr-datepicker.is-disabled .mljr-datepicker-trigger {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .mljr-datepicker-value {
    flex: 1;
    text-align: left;
  }

  .mljr-datepicker-value:only-child {
    color: var(--mljr-text-muted);
  }

  .mljr-datepicker-clear {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--mljr-space-1);
    border-radius: var(--mljr-radius-full);
    color: var(--mljr-text-muted);
    transition: all var(--mljr-transition-fast);
  }

  .mljr-datepicker-clear:hover {
    background: var(--mljr-bg-secondary);
    color: var(--mljr-error-500);
  }

  /* Popup */
  .mljr-datepicker-popup {
    position: absolute;
    top: calc(100% + var(--mljr-space-2));
    left: 0;
    width: min(280px, calc(100vw - 1rem));
    max-width: calc(100vw - 1rem);
    padding: var(--mljr-space-4);
    background: var(--mljr-bg);
    border-radius: var(--mljr-radius-xl);
    box-shadow: var(--mljr-clay-shadow-lg);
    z-index: 50;
    animation: datepickerSlide 0.2s ease;
  }

  @keyframes datepickerSlide {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Header */
  .mljr-datepicker-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--mljr-space-4);
  }

  .mljr-datepicker-nav {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.75rem;
    height: 2.75rem;
    padding: 0;
    background: var(--mljr-bg-secondary);
    border: none;
    border-radius: var(--mljr-radius-md);
    color: var(--mljr-text);
    cursor: pointer;
    box-shadow: var(--mljr-clay-btn);
    transition: all var(--mljr-transition-fast);
  }

  .mljr-datepicker-nav:hover {
    transform: translateY(-1px);
    box-shadow: var(--mljr-clay-shadow-sm);
  }

  .mljr-datepicker-title {
    padding: var(--mljr-space-2) var(--mljr-space-3);
    background: transparent;
    border: none;
    border-radius: var(--mljr-radius-md);
    color: var(--mljr-text);
    font-size: var(--mljr-text-sm);
    font-weight: 600;
    cursor: pointer;
    transition: all var(--mljr-transition-fast);
  }

  .mljr-datepicker-title:hover {
    background: var(--mljr-bg-secondary);
  }

  /* Calendar */
  .mljr-datepicker-calendar {
    margin-bottom: var(--mljr-space-4);
  }

  .mljr-datepicker-weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: var(--mljr-space-1);
    margin-bottom: var(--mljr-space-2);
  }

  .mljr-datepicker-weekdays span {
    text-align: center;
    font-size: var(--mljr-text-xs);
    font-weight: 600;
    color: var(--mljr-text-muted);
    padding: var(--mljr-space-1);
  }

  .mljr-datepicker-days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: var(--mljr-space-1);
  }

  .mljr-datepicker-day {
    display: flex;
    align-items: center;
    justify-content: center;
    aspect-ratio: 1;
    padding: 0;
    background: transparent;
    border: none;
    border-radius: var(--mljr-radius-md);
    color: var(--mljr-text);
    font-size: var(--mljr-text-sm);
    cursor: pointer;
    transition: all var(--mljr-transition-fast);
  }

  .mljr-datepicker-day:hover:not(:disabled) {
    background: var(--mljr-bg-secondary);
    transform: scale(1.1);
  }

  .mljr-datepicker-day.selected {
    background: var(--mljr-primary-500);
    color: white;
    box-shadow: var(--mljr-clay-shadow-sm);
  }

  .mljr-datepicker-day.today {
    border: 2px solid var(--mljr-primary-400);
  }

  .mljr-datepicker-day.disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  .mljr-datepicker-day-empty {
    aspect-ratio: 1;
  }

  /* Grid (Months/Years) */
  .mljr-datepicker-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--mljr-space-2);
    margin-bottom: var(--mljr-space-4);
  }

  .mljr-datepicker-years {
    max-height: 200px;
    overflow-y: auto;
  }

  .mljr-datepicker-grid-item {
    padding: var(--mljr-space-3);
    background: var(--mljr-bg-secondary);
    border: none;
    border-radius: var(--mljr-radius-lg);
    color: var(--mljr-text);
    font-size: var(--mljr-text-sm);
    cursor: pointer;
    box-shadow: var(--mljr-clay-shadow-xs);
    transition: all var(--mljr-transition-fast);
  }

  .mljr-datepicker-grid-item:hover {
    transform: translateY(-2px);
    box-shadow: var(--mljr-clay-shadow-sm);
  }

  .mljr-datepicker-grid-item.selected {
    background: var(--mljr-primary-500);
    color: white;
  }

  /* Time Picker */
  .mljr-datepicker-time {
    display: flex;
    align-items: center;
    gap: var(--mljr-space-2);
    padding: var(--mljr-space-3);
    margin-bottom: var(--mljr-space-4);
    background: var(--mljr-bg-secondary);
    border-radius: var(--mljr-radius-lg);
  }

  .mljr-datepicker-time-label {
    font-size: var(--mljr-text-sm);
    color: var(--mljr-text-secondary);
  }

  .mljr-datepicker-time-input {
    width: 3rem;
    padding: var(--mljr-space-2);
    background: var(--mljr-bg);
    border: 1px solid var(--mljr-border);
    border-radius: var(--mljr-radius-md);
    color: var(--mljr-text);
    font-size: var(--mljr-text-sm);
    text-align: center;
  }

  .mljr-datepicker-time-input:focus {
    outline: none;
    border-color: var(--mljr-primary-400);
  }

  /* Footer */
  .mljr-datepicker-footer {
    display: flex;
    justify-content: space-between;
    gap: var(--mljr-space-2);
  }

  /* Dark Mode */
  :global([data-theme="dark"]) .mljr-datepicker-popup,
  :global(.dark) .mljr-datepicker-popup {
    background: var(--mljr-bg-secondary);
  }

  :global([data-theme="dark"]) .mljr-datepicker-day.selected,
  :global(.dark) .mljr-datepicker-day.selected {
    background: var(--mljr-primary-600);
  }
</style>
