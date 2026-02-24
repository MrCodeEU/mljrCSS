<script lang="ts">
  export interface CalendarEvent {
    date: string; // YYYY-MM-DD
    label: string;
    color?: string;
  }

  interface Props {
    value?: string; // YYYY-MM-DD
    month?: number; // 0-11
    year?: number;
    min?: string; // YYYY-MM-DD
    max?: string; // YYYY-MM-DD
    events?: CalendarEvent[];
    onSelect?: (date: string) => void;
    class?: string;
  }

  let {
    value = $bindable(undefined),
    month: initialMonth,
    year: initialYear,
    min,
    max,
    events = [],
    onSelect,
    class: className = '',
  }: Props = $props();

  const today = new Date();

  // intentionally captures initial value — internal navigation state seeded from props
  // svelte-ignore state_referenced_locally
  let viewMonth: number = $state(initialMonth ?? today.getMonth());
  // svelte-ignore state_referenced_locally
  let viewYear: number = $state(initialYear ?? today.getFullYear());

  const WEEKDAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

  const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  function formatDate(year: number, month: number, day: number): string {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  }

  function prevMonth() {
    if (viewMonth === 0) {
      viewMonth = 11;
      viewYear -= 1;
    } else {
      viewMonth -= 1;
    }
  }

  function nextMonth() {
    if (viewMonth === 11) {
      viewMonth = 0;
      viewYear += 1;
    } else {
      viewMonth += 1;
    }
  }

  // Get the first day of the month (0=Sun, 1=Mon...)
  // We want Monday-first grid so shift
  function getStartPadding(year: number, month: number): number {
    const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
    // Convert to Monday-first: Mon=0, Tue=1, ..., Sun=6
    return (firstDay + 6) % 7;
  }

  let daysInMonth = $derived(new Date(viewYear, viewMonth + 1, 0).getDate());
  let startPadding = $derived(getStartPadding(viewYear, viewMonth));

  let cells = $derived(() => {
    const result: Array<{ day: number | null; dateStr: string | null }> = [];
    for (let i = 0; i < startPadding; i++) {
      result.push({ day: null, dateStr: null });
    }
    for (let d = 1; d <= daysInMonth; d++) {
      result.push({ day: d, dateStr: formatDate(viewYear, viewMonth, d) });
    }
    return result;
  });

  function isToday(dateStr: string | null): boolean {
    if (!dateStr) return false;
    return dateStr === formatDate(today.getFullYear(), today.getMonth(), today.getDate());
  }

  function isSelected(dateStr: string | null): boolean {
    if (!dateStr || !value) return false;
    return dateStr === value;
  }

  function isDisabled(dateStr: string | null): boolean {
    if (!dateStr) return true;
    if (min && dateStr < min) return true;
    if (max && dateStr > max) return true;
    return false;
  }

  function getEventsForDate(dateStr: string | null): CalendarEvent[] {
    if (!dateStr) return [];
    return events.filter(e => e.date === dateStr);
  }

  function selectDay(dateStr: string | null) {
    if (!dateStr || isDisabled(dateStr)) return;
    value = dateStr;
    onSelect?.(dateStr);
  }

  let titleText = $derived(`${MONTH_NAMES[viewMonth]} ${viewYear}`);
</script>

<div class="mljr-calendar {className}">
  <!-- Header -->
  <div class="mljr-calendar-header">
    <button
      class="mljr-calendar-nav-btn"
      onclick={prevMonth}
      aria-label="Previous month"
      type="button"
    >
      ‹
    </button>
    <span class="mljr-calendar-title">{titleText}</span>
    <button
      class="mljr-calendar-nav-btn"
      onclick={nextMonth}
      aria-label="Next month"
      type="button"
    >
      ›
    </button>
  </div>

  <!-- Grid -->
  <div class="mljr-calendar-grid" role="grid" aria-label={titleText}>
    <!-- Weekday headers -->
    {#each WEEKDAYS as wd}
      <div class="mljr-calendar-weekday" role="columnheader">{wd}</div>
    {/each}

    <!-- Day cells -->
    {#each cells() as cell}
      {#if cell.day === null}
        <div class="mljr-calendar-day mljr-calendar-day-empty" role="gridcell"></div>
      {:else}
        {@const dayEvents = getEventsForDate(cell.dateStr)}
        <button
          class="mljr-calendar-day
            {isToday(cell.dateStr) && !isSelected(cell.dateStr) ? 'mljr-calendar-day-today' : ''}
            {isSelected(cell.dateStr) ? 'mljr-calendar-day-selected' : ''}
            {isDisabled(cell.dateStr) ? 'mljr-calendar-day-disabled' : ''}"
          onclick={() => selectDay(cell.dateStr)}
          disabled={isDisabled(cell.dateStr)}
          role="gridcell"
          aria-label={cell.dateStr ?? undefined}
          aria-selected={isSelected(cell.dateStr)}
          aria-disabled={isDisabled(cell.dateStr)}
          type="button"
        >
          {cell.day}
          {#if dayEvents.length > 0}
            <div class="mljr-calendar-day-events" aria-hidden="true">
              {#each dayEvents.slice(0, 3) as ev}
                <span
                  class="mljr-calendar-event-dot"
                  style={ev.color ? `background: ${ev.color}` : ''}
                ></span>
              {/each}
            </div>
          {/if}
        </button>
      {/if}
    {/each}
  </div>
</div>
