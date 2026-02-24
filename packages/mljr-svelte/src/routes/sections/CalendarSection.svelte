<script lang="ts">
  import { Card, Calendar, type CalendarEvent, CodeExample } from '$lib';

  let selectedDate = $state<string | undefined>(undefined);

  const events: CalendarEvent[] = [
    { date: new Date().toISOString().slice(0, 10), label: 'Today' },
    {
      date: (() => {
        const d = new Date();
        d.setDate(d.getDate() + 3);
        return d.toISOString().slice(0, 10);
      })(),
      label: 'Team Meeting',
      color: '#f97316',
    },
    {
      date: (() => {
        const d = new Date();
        d.setDate(d.getDate() + 7);
        return d.toISOString().slice(0, 10);
      })(),
      label: 'Release Day',
      color: '#14b8a6',
    },
    {
      date: (() => {
        const d = new Date();
        d.setDate(d.getDate() + 14);
        return d.toISOString().slice(0, 10);
      })(),
      label: 'Review',
      color: '#a855f7',
    },
  ];

  const today = new Date().toISOString().slice(0, 10);
  const minDate = (() => {
    const d = new Date();
    d.setDate(d.getDate() - 7);
    return d.toISOString().slice(0, 10);
  })();
  const maxDate = (() => {
    const d = new Date();
    d.setMonth(d.getMonth() + 2);
    return d.toISOString().slice(0, 10);
  })();
</script>

<section id="calendar" class="mljr-mb-8">
  <h2 class="mljr-h2 mljr-mb-2">Calendar</h2>
  <p class="mljr-text-muted mljr-mb-8">Date picker calendar with event support, min/max constraints, and navigation.</p>

  <div class="mljr-grid mljr-grid-cols-1 mljr-md:grid-cols-2 mljr-gap-6">
    <!-- Basic date picker -->
    <Card title="Date Picker" description="Simple date selection">
      <Calendar
        bind:value={selectedDate}
        onSelect={(d) => selectedDate = d}
      />
      <p class="mljr-text-sm mljr-text-muted mljr-mt-3">
        Selected: <strong>{selectedDate ?? 'None'}</strong>
      </p>
    </Card>

    <!-- With events -->
    <Card title="With Events" description="Events marked on calendar dates">
      <Calendar {events} />
      <p class="mljr-text-sm mljr-text-muted mljr-mt-3">Events shown as colored dots below dates</p>
    </Card>

    <!-- Min/Max range -->
    <Card title="Date Range Constraint" description="Restrict selectable dates">
      <Calendar
        min={minDate}
        max={maxDate}
        value={today}
      />
      <p class="mljr-text-sm mljr-text-muted mljr-mt-3">
        Selectable: <strong>{minDate}</strong> to <strong>{maxDate}</strong>
      </p>
    </Card>

    <!-- Combined: events + range + selection -->
    <Card title="Full-Featured" description="Events, constraints, and selection combined">
      <Calendar
        bind:value={selectedDate}
        {events}
        min={minDate}
        max={maxDate}
        onSelect={(d) => selectedDate = d}
      />
      <p class="mljr-text-sm mljr-text-muted mljr-mt-3">
        Selected: <strong>{selectedDate ?? 'None'}</strong>
      </p>
    </Card>
  </div>

  <CodeExample code={`<script>
  import { Calendar } from 'mljr-svelte';
  let selected = $state(undefined);
  const events = [
    { date: '2026-03-15', label: 'Team Meeting', color: '#f97316' },
    { date: '2026-03-22', label: 'Release Day', color: '#14b8a6' },
  ];
<\/script>

<Calendar
  bind:value={selected}
  {events}
  min="2026-03-01"
  max="2026-05-31"
  onSelect={(date) => console.log(date)}
/>`} language="svelte" />
</section>
