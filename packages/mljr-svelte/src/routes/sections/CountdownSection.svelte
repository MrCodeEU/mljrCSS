<script lang="ts">
  import { Countdown, CodeExample, Alert } from '$lib';

  // Create target dates for examples
  const now = new Date();
  const oneHour = new Date(now.getTime() + 60 * 60 * 1000); // 1 hour from now
  const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 hours from now
  const oneWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // 1 week from now
  const fiveSeconds = new Date(now.getTime() + 5 * 1000); // 5 seconds from now

  let completedCount = $state(0);

  function handleComplete() {
    completedCount++;
  }

  const codeExample = `<script>
  import { Countdown } from 'mljr-svelte';

  // Set target date
  const targetDate = new Date('2026-12-31T23:59:59');
<\/script>

<!-- Default countdown -->
<Countdown targetDate={targetDate} />

<!-- Compact variant -->
<Countdown
  targetDate={targetDate}
  variant="compact"
/>

<!-- Card variant with custom labels -->
<Countdown
  targetDate={targetDate}
  variant="card"
  labels={{
    days: 'D',
    hours: 'H',
    minutes: 'M',
    seconds: 'S'
  }}
/>

<!-- Hide certain units -->
<Countdown
  targetDate={targetDate}
  showDays={false}
  showSeconds={false}
/>

<!-- With completion callback -->
<Countdown
  targetDate={targetDate}
  completeMessage="Event has started!"
  onComplete={() => console.log('Countdown complete!')}
/>`;
</script>

<div class="countdown-section">
  <div class="mljr-mb-6">
    <p class="mljr-text-lg mljr-text-muted">
      Display countdowns for events, deadlines, sales, or any time-sensitive content. Automatically
      updates every second with customizable display formats.
    </p>
  </div>

  <div class="examples-grid">
    <!-- Default Variant -->
    <div class="example-card full-width">
      <h3 class="example-title">Default Variant</h3>
      <div class="example-demo centered">
        <Countdown targetDate={oneWeek} />
      </div>
    </div>

    <!-- Compact Variant -->
    <div class="example-card">
      <h3 class="example-title">Compact Variant</h3>
      <div class="example-demo centered">
        <Countdown targetDate={tomorrow} variant="compact" />
      </div>
    </div>

    <!-- Minimal Variant -->
    <div class="example-card">
      <h3 class="example-title">Minimal Variant</h3>
      <div class="example-demo centered">
        <Countdown targetDate={tomorrow} variant="minimal" />
      </div>
    </div>

    <!-- Card Variant -->
    <div class="example-card full-width">
      <h3 class="example-title">Card Variant</h3>
      <div class="example-demo centered">
        <Countdown
          targetDate={oneWeek}
          variant="card"
          labels={{
            days: 'D',
            hours: 'H',
            minutes: 'M',
            seconds: 'S',
          }}
        />
      </div>
    </div>

    <!-- Without Labels -->
    <div class="example-card">
      <h3 class="example-title">Without Labels</h3>
      <div class="example-demo centered">
        <Countdown targetDate={oneHour} showLabels={false} />
      </div>
    </div>

    <!-- Hours and Minutes Only -->
    <div class="example-card">
      <h3 class="example-title">Hours & Minutes Only</h3>
      <div class="example-demo centered">
        <Countdown targetDate={oneHour} showDays={false} showSeconds={false} variant="compact" />
      </div>
    </div>

    <!-- Custom Labels -->
    <div class="example-card full-width">
      <h3 class="example-title">Custom Labels</h3>
      <div class="example-demo centered">
        <Countdown
          targetDate={tomorrow}
          variant="card"
          labels={{
            days: 'Tage',
            hours: 'Stunden',
            minutes: 'Minuten',
            seconds: 'Sekunden',
          }}
        />
      </div>
    </div>

    <!-- Completion Demo -->
    <div class="example-card full-width">
      <h3 class="example-title">Completion Callback Demo</h3>
      <p class="mljr-text-sm mljr-text-muted mljr-mb-4">
        This countdown will complete in 5 seconds and trigger a callback.
      </p>
      <div class="example-demo centered">
        <Countdown
          targetDate={fiveSeconds}
          variant="card"
          completeMessage="🎉 Countdown Complete!"
          onComplete={handleComplete}
        />
      </div>
      {#if completedCount > 0}
        <Alert variant="success" title="Callback Triggered!" class="mljr-mt-4">
          Completion callback has been triggered {completedCount} time{completedCount > 1 ? 's' : ''}.
        </Alert>
      {/if}
    </div>

    <!-- Use Cases -->
    <div class="example-card full-width">
      <h3 class="example-title">Common Use Cases</h3>
      <div class="use-cases">
        <div class="use-case">
          <h4 class="use-case-title">🎫 Event Countdown</h4>
          <p class="use-case-desc">Show time remaining until an event starts</p>
          <div class="use-case-demo">
            <Countdown targetDate={oneWeek} variant="card" />
          </div>
        </div>

        <div class="use-case">
          <h4 class="use-case-title">🏷️ Sale Ends In</h4>
          <p class="use-case-desc">Display limited-time offer countdown</p>
          <div class="use-case-demo">
            <Countdown
              targetDate={tomorrow}
              variant="compact"
              showDays={false}
              labels={{
                hours: 'hrs',
                minutes: 'min',
                seconds: 'sec',
              }}
            />
          </div>
        </div>

        <div class="use-case">
          <h4 class="use-case-title">⏰ Deadline Tracker</h4>
          <p class="use-case-desc">Track time until a deadline</p>
          <div class="use-case-demo">
            <Countdown targetDate={oneHour} variant="minimal" showSeconds={false} />
          </div>
        </div>
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
  .countdown-section {
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

  .example-demo {
    display: flex;
    flex-wrap: wrap;
    gap: var(--mljr-space-4);
    align-items: center;
  }

  .example-demo.centered {
    justify-content: center;
  }

  .use-cases {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--mljr-space-6);
  }

  .use-case {
    padding: var(--mljr-space-4);
    background: var(--mljr-bg-secondary);
    border-radius: var(--mljr-radius-md);
    border: 1px solid var(--mljr-border);
  }

  .use-case-title {
    font-size: var(--mljr-text-base);
    font-weight: 600;
    color: var(--mljr-text);
    margin-bottom: var(--mljr-space-2);
  }

  .use-case-desc {
    font-size: var(--mljr-text-sm);
    color: var(--mljr-text-secondary);
    margin-bottom: var(--mljr-space-4);
  }

  .use-case-demo {
    display: flex;
    justify-content: center;
  }
</style>
