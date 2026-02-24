<script lang="ts">
  import { TimePicker, CodeExample, Alert } from '$lib';

  let basicTime = $state('');
  let time12hr = $state('');
  let timeWithSeconds = $state('');
  let errorTime = $state('');

  const codeExample = `<script>
  import { TimePicker } from 'mljr-svelte';

  let selectedTime = $state('');
<\/script>

<!-- Basic usage -->
<TimePicker bind:value={selectedTime} label="Select Time" />

<!-- 12-hour format -->
<TimePicker
  bind:value={selectedTime}
  label="Appointment Time"
  use12Hour={true}
/>

<!-- With seconds -->
<TimePicker
  bind:value={selectedTime}
  label="Precise Time"
  showSeconds={true}
/>

<!-- With validation -->
<TimePicker
  bind:value={selectedTime}
  label="Business Hours"
  min="09:00"
  max="17:00"
  helperText="Between 9 AM and 5 PM"
/>`;
</script>

<div class="time-picker-section">
  <div class="mljr-mb-6">
    <p class="mljr-text-lg mljr-text-muted">
      Select time with an intuitive dropdown interface. Supports 12/24 hour formats, seconds, and
      time validation.
    </p>
  </div>

  <div class="examples-grid">
    <!-- Basic Usage -->
    <div class="example-card">
      <h3 class="example-title">Basic Usage (24-hour)</h3>
      <TimePicker
        bind:value={basicTime}
        label="Select Time"
        placeholder="Choose a time"
        helperText="24-hour format"
      />
      {#if basicTime}
        <Alert variant="info" class="mljr-mt-4">
          Selected: <strong>{basicTime}</strong>
        </Alert>
      {/if}
    </div>

    <!-- 12-Hour Format -->
    <div class="example-card">
      <h3 class="example-title">12-Hour Format</h3>
      <TimePicker
        bind:value={time12hr}
        label="Appointment Time"
        use12Hour={true}
        placeholder="Select time"
        helperText="AM/PM format"
      />
      {#if time12hr}
        <Alert variant="success" class="mljr-mt-4">
          Selected: <strong>{time12hr}</strong>
        </Alert>
      {/if}
    </div>

    <!-- With Seconds -->
    <div class="example-card">
      <h3 class="example-title">With Seconds</h3>
      <TimePicker
        bind:value={timeWithSeconds}
        label="Precise Time"
        showSeconds={true}
        helperText="Includes seconds"
      />
    </div>

    <!-- With Min/Max -->
    <div class="example-card">
      <h3 class="example-title">Business Hours (Min/Max)</h3>
      <TimePicker
        bind:value={basicTime}
        label="Meeting Time"
        min="09:00"
        max="17:00"
        helperText="Between 9 AM and 5 PM"
      />
    </div>

    <!-- Error State -->
    <div class="example-card">
      <h3 class="example-title">Error State</h3>
      <TimePicker
        bind:value={errorTime}
        label="Required Time"
        error={errorTime === ''}
        errorMessage="Please select a time"
        required={true}
      />
    </div>

    <!-- Disabled State -->
    <div class="example-card">
      <h3 class="example-title">Disabled State</h3>
      <TimePicker value="14:30" label="Locked Time" disabled={true} />
    </div>

    <!-- Custom Step -->
    <div class="example-card full-width">
      <h3 class="example-title">Custom Step Interval</h3>
      <div class="step-examples">
        <TimePicker
          bind:value={basicTime}
          label="15-minute intervals"
          step={15}
          helperText="Step: 15 minutes"
        />
        <TimePicker
          bind:value={basicTime}
          label="30-minute intervals"
          step={30}
          helperText="Step: 30 minutes"
        />
      </div>
    </div>

    <!-- Code Example -->
    <div class="example-card full-width">
      <h3 class="example-title">Usage Example</h3>
      <CodeExample code={codeExample} language="svelte" />
    </div>
  </div>
</div>

<style>
  .time-picker-section {
    max-width: 100%;
  }

  .examples-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--mljr-space-6);
  }

  .example-card {
    padding: var(--mljr-space-6);
    background: var(--mljr-bg);
    border-radius: var(--mljr-radius-lg);
    box-shadow: var(--mljr-clay-shadow);
  }

  .example-card.full-width {
    grid-column: 1 / -1;
  }

  .example-title {
    font-size: var(--mljr-text-lg);
    font-weight: 600;
    color: var(--mljr-text);
    margin-bottom: var(--mljr-space-4);
  }

  .step-examples {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--mljr-space-4);
  }
</style>
