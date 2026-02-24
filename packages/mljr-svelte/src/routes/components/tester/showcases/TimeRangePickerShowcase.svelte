<script lang="ts">
  import { TimeRangePicker } from '$lib';

  let start1 = $state('09:00');
  let end1 = $state('17:00');

  let start2 = $state('08:30');
  let end2 = $state('16:00');

  let start3 = $state('10:00:00');
  let end3 = $state('18:00:00');
</script>

<div class="mljr-space-y-8">
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Default (24h format)</h3>
    <TimeRangePicker
      bind:startValue={start1}
      bind:endValue={end1}
      label="Working Hours"
      helperText="Select your working hours"
    />
    <p class="mljr-text-sm mljr-text-muted mljr-mt-2">Range: {start1} – {end1}</p>
  </section>

  <section>
    <h3 class="mljr-h4 mljr-mb-4">Required Field</h3>
    <TimeRangePicker
      bind:startValue={start2}
      bind:endValue={end2}
      label="Meeting Time"
      required={true}
      format="24h"
    />
  </section>

  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Seconds</h3>
    <TimeRangePicker
      bind:startValue={start3}
      bind:endValue={end3}
      label="Precise Interval"
      showSeconds={true}
    />
    <p class="mljr-text-sm mljr-text-muted mljr-mt-2">Range: {start3} – {end3}</p>
  </section>

  <section>
    <h3 class="mljr-h4 mljr-mb-4">Error State</h3>
    <TimeRangePicker
      label="Error Example"
      error={true}
      errorMessage="Time range conflicts with an existing booking"
    />
  </section>

  <section>
    <h3 class="mljr-h4 mljr-mb-4">Disabled</h3>
    <TimeRangePicker
      label="Disabled Time Range"
      disabled={true}
      startValue="09:00"
      endValue="17:00"
    />
  </section>

  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Min/Max Constraints</h3>
    <TimeRangePicker
      label="Office Hours Only"
      minTime="08:00"
      maxTime="20:00"
      helperText="Allowed between 08:00 and 20:00"
    />
  </section>
</div>
