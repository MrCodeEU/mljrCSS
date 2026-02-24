<script lang="ts">
  import { Card, NumberInput, TimeRangePicker, CodeExample } from '$lib';

  let qty = $state(1);
  let price = $state(9.99);
  let percentage = $state(75);
  let temperature = $state(22);

  let workHours = $state({ start: '09:00', end: '17:00' });
  let meetingRange = $state({ start: '14:00', end: '15:30' });
</script>

<section id="number-input" class="mljr-mb-8">
  <h2 class="mljr-h2 mljr-mb-2">Number Input &amp; Time Range</h2>
  <p class="mljr-text-muted mljr-mb-8">Numeric stepper and dual time range picker.</p>

  <div class="mljr-space-y-8">
    <!-- Number Input -->
    <div>
      <h3 class="mljr-h4 mljr-mb-4">NumberInput</h3>
      <div class="mljr-grid mljr-grid-cols-1 mljr-md:grid-cols-2 mljr-lg:grid-cols-4 mljr-gap-6">
        <Card title="Quantity">
          <NumberInput bind:value={qty} min={1} max={99} />
          <p class="mljr-text-sm mljr-text-muted mljr-mt-2">Value: {qty}</p>
        </Card>

        <Card title="Price (step 0.01)">
          <NumberInput bind:value={price} min={0} step={0.01} size="md" />
          <p class="mljr-text-sm mljr-text-muted mljr-mt-2">€{price.toFixed(2)}</p>
        </Card>

        <Card title="Percentage (0–100)">
          <NumberInput bind:value={percentage} min={0} max={100} />
          <p class="mljr-text-sm mljr-text-muted mljr-mt-2">{percentage}%</p>
        </Card>

        <Card title="Large size">
          <NumberInput bind:value={temperature} size="lg" />
          <p class="mljr-text-sm mljr-text-muted mljr-mt-2">{temperature} °C</p>
        </Card>
      </div>

      <CodeExample code={`<NumberInput bind:value={qty} min={1} max={99} />
<NumberInput bind:value={price} min={0} step={0.01} size="md" />
<NumberInput bind:value={percentage} min={0} max={100} />`} language="svelte" />
    </div>

    <!-- Time Range Picker -->
    <div>
      <h3 class="mljr-h4 mljr-mb-4">TimeRangePicker</h3>
      <div class="mljr-grid mljr-grid-cols-1 mljr-md:grid-cols-2 mljr-gap-6">
        <Card title="Work Hours (24h)">
          <TimeRangePicker
            label="Working Hours"
            bind:startValue={workHours.start}
            bind:endValue={workHours.end}
            helperText="Set your available hours"
            onchange={(s, e) => { workHours.start = s; workHours.end = e; }}
          />
          <p class="mljr-text-sm mljr-text-muted mljr-mt-2">{workHours.start} – {workHours.end}</p>
        </Card>

        <Card title="Meeting Slot (12h)">
          <TimeRangePicker
            label="Meeting Time"
            format="12h"
            bind:startValue={meetingRange.start}
            bind:endValue={meetingRange.end}
            step={15}
            helperText="Select a 15-minute slot"
            onchange={(s, e) => { meetingRange.start = s; meetingRange.end = e; }}
          />
          <p class="mljr-text-sm mljr-text-muted mljr-mt-2">{meetingRange.start} – {meetingRange.end}</p>
        </Card>

        <Card title="With Seconds">
          <TimeRangePicker
            label="Precise Range"
            showSeconds
            helperText="Includes seconds"
          />
        </Card>

        <Card title="Disabled">
          <TimeRangePicker
            label="Read-only Range"
            startValue="10:00"
            endValue="11:30"
            disabled
          />
        </Card>
      </div>

      <CodeExample code={`<TimeRangePicker
  label="Working Hours"
  bind:startValue={start}
  bind:endValue={end}
  onchange={(s, e) => { start = s; end = e; }}
/>

<!-- 12-hour format -->
<TimeRangePicker format="12h" step={15} />`} language="svelte" />
    </div>
  </div>
</section>
