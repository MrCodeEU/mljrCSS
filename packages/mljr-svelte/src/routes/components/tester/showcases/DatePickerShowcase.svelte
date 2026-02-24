<script lang="ts">
  import { DatePicker, Button, Card } from '$lib';

  let date1 = $state<Date | null>(null);
  let date2 = $state<Date | null>(new Date());
  let dateTime = $state<Date | null>(null);
  let eventDate = $state<Date | null>(null);
  let checkIn = $state<Date | null>(null);
  let checkOut = $state<Date | null>(null);

  const today = new Date();
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);
  const nextMonth = new Date(today);
  nextMonth.setMonth(today.getMonth() + 1);
  const minDate = new Date(today);
  minDate.setDate(today.getDate() - 30);
</script>

<div class="mljr-space-y-8">
  <!-- Basic -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Basic Date Picker</h3>
    <div class="mljr-space-y-2">
      <DatePicker bind:value={date1} />
      {#if date1}
        <p class="mljr-text-xs mljr-text-muted">Selected: {date1.toDateString()}</p>
      {/if}
    </div>
  </section>

  <!-- With Label -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Label and Pre-selected Date</h3>
    <DatePicker
      label="Date of Birth"
      bind:value={date2}
    />
  </section>

  <!-- Date Formats -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Date Formats</h3>
    <div class="mljr-space-y-3">
      <DatePicker label="Short (MM/DD/YY)" format="short" value={new Date()} />
      <DatePicker label="Medium (Jan 1, 2024)" format="medium" value={new Date()} />
      <DatePicker label="Long (January 1, 2024)" format="long" value={new Date()} />
      <DatePicker label="ISO (2024-01-01)" format="iso" value={new Date()} />
    </div>
  </section>

  <!-- With Time -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Time Picker</h3>
    <div class="mljr-space-y-2">
      <DatePicker
        label="Meeting Date & Time"
        showTime
        format="long"
        bind:value={dateTime}
      />
      {#if dateTime}
        <p class="mljr-text-xs mljr-text-muted">Selected: {dateTime.toLocaleString()}</p>
      {/if}
    </div>
  </section>

  <!-- Min / Max Dates -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Min / Max Constraints</h3>
    <div class="mljr-space-y-3">
      <DatePicker
        label="Future Events Only"
        min={today}
        bind:value={eventDate}
        placeholder="Select a future date"
      />
      <DatePicker
        label="Last 30 Days Only"
        min={minDate}
        max={today}
        placeholder="Select from last 30 days"
      />
    </div>
  </section>

  <!-- Disabled -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Disabled</h3>
    <DatePicker
      label="Date"
      value={new Date()}
      disabled
    />
  </section>

  <!-- Hotel Booking Example -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Hotel Booking Example</h3>
    <Card>
      <h4 class="mljr-h5 mljr-mb-4">Book Your Stay</h4>
      <div class="mljr-grid mljr-grid-cols-1 mljr-sm:grid-cols-2 mljr-gap-4">
        <DatePicker
          label="Check-in"
          min={today}
          bind:value={checkIn}
          placeholder="Select check-in date"
        />
        <DatePicker
          label="Check-out"
          min={checkIn ?? today}
          bind:value={checkOut}
          placeholder="Select check-out date"
        />
      </div>
      {#if checkIn && checkOut}
        {@const nights = Math.round((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))}
        {#if nights > 0}
          <p class="mljr-text-sm mljr-mt-3 mljr-text-success-600">
            ✓ {nights} night{nights === 1 ? '' : 's'} selected
          </p>
        {/if}
      {/if}
      <Button variant="primary" fullWidth class="mljr-mt-4">
        Search Availability
      </Button>
    </Card>
  </section>
</div>
