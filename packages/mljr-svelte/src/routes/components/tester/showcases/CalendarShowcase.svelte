<script lang="ts">
  import { Calendar } from '$lib';
  import type { CalendarEvent } from '$lib';

  let selectedDate = $state('');

  const events: CalendarEvent[] = [
    { date: '2026-02-03', label: 'Team standup', color: '#f97316' },
    { date: '2026-02-10', label: 'Design review', color: '#14b8a6' },
    { date: '2026-02-14', label: "Valentine's Day", color: '#ef4444' },
    { date: '2026-02-17', label: 'Release v2', color: '#a855f7' },
    { date: '2026-02-17', label: 'Sprint end', color: '#3b82f6' },
    { date: '2026-02-24', label: 'Board meeting' },
  ];
</script>

<div class="mljr-space-y-8">
  <!-- Basic calendar -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Default Calendar (Current Month)</h3>
    <Calendar
      bind:value={selectedDate}
      onSelect={(d) => selectedDate = d}
    />
    {#if selectedDate}
      <p class="mljr-text-sm mljr-mt-3" style="color: var(--mljr-primary-600);">
        Selected: <strong>{selectedDate}</strong>
      </p>
    {/if}
  </section>

  <!-- Calendar with events -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Calendar with Events (February 2026)</h3>
    <Calendar
      month={1}
      year={2026}
      {events}
      onSelect={(d) => selectedDate = d}
    />
    <p class="mljr-text-muted mljr-text-sm mljr-mt-2">
      Colored dots indicate events. Multiple events show multiple dots.
    </p>
  </section>

  <!-- Calendar with min/max constraints -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Min/Max Date Constraints</h3>
    <Calendar
      month={1}
      year={2026}
      min="2026-02-08"
      max="2026-02-22"
      onSelect={(d) => selectedDate = d}
    />
    <p class="mljr-text-muted mljr-text-sm mljr-mt-2">
      Only dates from Feb 8–22 are selectable.
    </p>
  </section>
</div>
