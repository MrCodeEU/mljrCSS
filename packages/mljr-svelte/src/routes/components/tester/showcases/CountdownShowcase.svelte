<script lang="ts">
  import { Countdown, Card, Button } from '$lib';

  const nextYear = new Date();
  nextYear.setFullYear(nextYear.getFullYear() + 1);
  nextYear.setMonth(0, 1);
  nextYear.setHours(0, 0, 0, 0);

  const inOneHour = new Date(Date.now() + 3600 * 1000);
  const in5Minutes = new Date(Date.now() + 5 * 60 * 1000);
  const inTenSeconds = new Date(Date.now() + 10 * 1000);
</script>

<div class="mljr-space-y-8">
  <!-- Default Variant -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Default Variant</h3>
    <Countdown targetDate={nextYear} />
    <p class="mljr-text-xs mljr-text-muted mljr-mt-2">Counting down to New Year's Day</p>
  </section>

  <!-- Compact Variant -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Compact Variant</h3>
    <Countdown targetDate={inOneHour} variant="compact" />
  </section>

  <!-- Card Variant -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Card Variant</h3>
    <Countdown targetDate={in5Minutes} variant="card" />
  </section>

  <!-- Minimal Variant -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Minimal Variant</h3>
    <Countdown targetDate={inOneHour} variant="minimal" />
  </section>

  <!-- Without Labels -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Without Labels</h3>
    <Countdown targetDate={inOneHour} showLabels={false} />
  </section>

  <!-- Custom Labels -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Custom Labels</h3>
    <Countdown
      targetDate={nextYear}
      labels={{ days: 'Days', hours: 'Hrs', minutes: 'Min', seconds: 'Sec' }}
    />
  </section>

  <!-- Only Specific Units -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Hours & Minutes Only</h3>
    <Countdown
      targetDate={inOneHour}
      showDays={false}
      showSeconds={false}
    />
  </section>

  <!-- With Complete Callback -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Complete Message</h3>
    <Countdown
      targetDate={inTenSeconds}
      completeMessage="🎉 Time's up!"
    />
    <p class="mljr-text-xs mljr-text-muted mljr-mt-2">Shows message when countdown ends</p>
  </section>

  <!-- Launch Countdown -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Product Launch Example</h3>
    <Card>
      <div class="mljr-text-center mljr-space-y-4">
        <h4 class="mljr-h5">🚀 Launch Countdown</h4>
        <p class="mljr-text-secondary">Our new product drops on New Year's Day!</p>
        <Countdown targetDate={nextYear} variant="card" />
        <Button variant="primary">Get Notified</Button>
      </div>
    </Card>
  </section>
</div>
