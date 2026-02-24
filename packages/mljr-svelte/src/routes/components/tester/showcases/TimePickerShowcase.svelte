<script lang="ts">
  import { TimePicker, Card, Button } from '$lib';

  let time1 = $state('');
  let time2 = $state('09:00');
  let time3 = $state('');
  let startTime = $state('09:00');
  let endTime = $state('17:00');
</script>

<div class="mljr-space-y-8">
  <!-- Basic -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Basic Time Picker</h3>
    <div class="mljr-space-y-2">
      <TimePicker bind:value={time1} />
      {#if time1}
        <p class="mljr-text-xs mljr-text-muted">Selected: {time1}</p>
      {/if}
    </div>
  </section>

  <!-- With Label -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Label and Pre-selected</h3>
    <TimePicker
      label="Meeting Time"
      bind:value={time2}
    />
  </section>

  <!-- 12-Hour Format -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">12-Hour Format</h3>
    <TimePicker
      label="Appointment Time"
      use12Hour
    />
  </section>

  <!-- With Seconds -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Seconds</h3>
    <TimePicker
      label="Precise Time"
      showSeconds
      bind:value={time3}
    />
  </section>

  <!-- With Min/Max -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Min/Max Constraints</h3>
    <TimePicker
      label="Business Hours"
      helperText="Available between 9 AM and 6 PM"
      min="09:00"
      max="18:00"
    />
  </section>

  <!-- With Step -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">30-Minute Steps</h3>
    <TimePicker
      label="Slot Time"
      step={30}
      helperText="Time increments in 30-minute slots"
    />
  </section>

  <!-- Required + Disabled -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">States</h3>
    <div class="mljr-space-y-3">
      <TimePicker label="Required" required />
      <TimePicker label="Disabled" value="14:30" disabled />
    </div>
  </section>

  <!-- Meeting Scheduler -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Meeting Scheduler</h3>
    <Card>
      <h4 class="mljr-h5 mljr-mb-4">Schedule a Meeting</h4>
      <div class="mljr-grid mljr-grid-cols-2 mljr-gap-4">
        <TimePicker
          label="Start Time"
          bind:value={startTime}
          required
        />
        <TimePicker
          label="End Time"
          bind:value={endTime}
          min={startTime}
          required
        />
      </div>
      {#if startTime && endTime}
        <p class="mljr-text-sm mljr-mt-3 mljr-text-success-600">
          ✓ Meeting: {startTime} – {endTime}
        </p>
      {/if}
      <Button variant="primary" class="mljr-mt-4" fullWidth>
        Book Meeting
      </Button>
    </Card>
  </section>
</div>
