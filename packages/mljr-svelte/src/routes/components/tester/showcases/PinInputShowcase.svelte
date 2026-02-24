<script lang="ts">
  import { PinInput } from '$lib';
  let pin = $state('');
  let completed = $state('');
</script>

<div class="mljr-space-y-8">
  <section>
    <h3 class="mljr-h4 mljr-mb-4">4-Digit Masked PIN</h3>
    <div class="mljr-flex mljr-flex-col mljr-items-center mljr-gap-4">
      <PinInput bind:value={pin} length={4} onComplete={(p) => (completed = p)} />
      <p class="mljr-text-sm mljr-text-muted">Value: {pin} | Completed: {completed || '—'}</p>
    </div>
  </section>

  <section>
    <h3 class="mljr-h4 mljr-mb-4">6-Digit with Separator</h3>
    <PinInput length={6} separator="-" separatorAt={3} masked={false} showToggle={false} />
  </section>

  <section>
    <h3 class="mljr-h4 mljr-mb-4">Sizes</h3>
    <div class="mljr-flex mljr-flex-col mljr-items-center mljr-gap-4">
      <PinInput length={4} size="sm" masked={false} />
      <PinInput length={4} masked={false} />
      <PinInput length={4} size="lg" masked={false} />
    </div>
  </section>

  <section>
    <h3 class="mljr-h4 mljr-mb-4">States</h3>
    <div class="mljr-flex mljr-flex-col mljr-items-center mljr-gap-4">
      <PinInput length={4} status="error" message="Invalid PIN" value="1234" masked={false} />
      <PinInput length={4} status="success" message="PIN verified!" value="5678" masked={false} />
      <PinInput length={4} disabled value="9999" masked={false} />
    </div>
  </section>
</div>
