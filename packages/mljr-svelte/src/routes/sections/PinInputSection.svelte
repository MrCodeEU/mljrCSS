<script lang="ts">
  import { PinInput } from '$lib';
  import CodeExample from '$lib/components/CodeExample.svelte';

  let pin4 = $state('');
  let pin6 = $state('');
  let pinConfirm = $state('');
  let pinConfirm2 = $state('');
  let pinStatus: 'default' | 'error' | 'success' = $state('default');
  let pinMessage = $state('');

  function checkConfirm() {
    if (pinConfirm.length === 4 && pinConfirm2.length === 4) {
      if (pinConfirm === pinConfirm2) {
        pinStatus = 'success';
        pinMessage = 'PINs match!';
      } else {
        pinStatus = 'error';
        pinMessage = 'PINs do not match. Try again.';
      }
    } else {
      pinStatus = 'default';
      pinMessage = '';
    }
  }

  $effect(() => {
    void pinConfirm;
    void pinConfirm2;
    checkConfirm();
  });
</script>

<div class="mljr-space-y-8">
  <!-- Basic 4-digit -->
  <div>
    <h3 class="mljr-h5 mljr-mb-4">4-Digit PIN (masked)</h3>
    <div class="mljr-flex mljr-flex-col mljr-items-center mljr-gap-4">
      <PinInput bind:value={pin4} length={4} onComplete={(p) => alert(`PIN entered: ${p}`)} />
      <p class="mljr-text-sm mljr-text-muted">Value: {pin4 || '—'}</p>
    </div>
    <CodeExample code={`<PinInput bind:value={pin} length={4} onComplete={(p) => console.log(p)} />`} />
  </div>

  <!-- 6-digit -->
  <div>
    <h3 class="mljr-h5 mljr-mb-4">6-Digit PIN with separator</h3>
    <div class="mljr-flex mljr-flex-col mljr-items-center mljr-gap-4">
      <PinInput bind:value={pin6} length={6} separator="-" separatorAt={3} masked={false} showToggle={false} />
      <p class="mljr-text-sm mljr-text-muted">Value: {pin6 || '—'}</p>
    </div>
    <CodeExample code={`<PinInput length={6} separator="-" separatorAt={3} masked={false} />`} />
  </div>

  <!-- Confirmation flow -->
  <div>
    <h3 class="mljr-h5 mljr-mb-4">PIN Confirmation</h3>
    <div class="mljr-flex mljr-flex-col mljr-items-center mljr-gap-6">
      <div class="mljr-flex mljr-flex-col mljr-items-center mljr-gap-2">
        <p class="mljr-text-sm mljr-font-medium">Enter PIN</p>
        <PinInput bind:value={pinConfirm} length={4} message="Choose a 4-digit PIN" />
      </div>
      <div class="mljr-flex mljr-flex-col mljr-items-center mljr-gap-2">
        <p class="mljr-text-sm mljr-font-medium">Confirm PIN</p>
        <PinInput bind:value={pinConfirm2} length={4} status={pinStatus} message={pinMessage} />
      </div>
    </div>
    <CodeExample code={`<PinInput bind:value={pin} length={4} status="error" message="PINs do not match" />`} />
  </div>

  <!-- Sizes -->
  <div>
    <h3 class="mljr-h5 mljr-mb-4">Sizes</h3>
    <div class="mljr-flex mljr-flex-col mljr-items-center mljr-gap-6">
      <div>
        <p class="mljr-text-sm mljr-text-muted mljr-mb-2 mljr-text-center">Small</p>
        <PinInput length={4} size="sm" masked={false} />
      </div>
      <div>
        <p class="mljr-text-sm mljr-text-muted mljr-mb-2 mljr-text-center">Medium (default)</p>
        <PinInput length={4} masked={false} />
      </div>
      <div>
        <p class="mljr-text-sm mljr-text-muted mljr-mb-2 mljr-text-center">Large</p>
        <PinInput length={4} size="lg" masked={false} />
      </div>
    </div>
    <CodeExample code={`<PinInput length={4} size="sm" />\n<PinInput length={4} />\n<PinInput length={4} size="lg" />`} />
  </div>

  <!-- States -->
  <div>
    <h3 class="mljr-h5 mljr-mb-4">States</h3>
    <div class="mljr-flex mljr-flex-col mljr-items-center mljr-gap-6">
      <div>
        <p class="mljr-text-sm mljr-text-muted mljr-mb-2 mljr-text-center">Error</p>
        <PinInput length={4} status="error" message="Invalid PIN" value="1234" masked={false} />
      </div>
      <div>
        <p class="mljr-text-sm mljr-text-muted mljr-mb-2 mljr-text-center">Success</p>
        <PinInput length={4} status="success" message="PIN verified!" value="5678" masked={false} />
      </div>
      <div>
        <p class="mljr-text-sm mljr-text-muted mljr-mb-2 mljr-text-center">Disabled</p>
        <PinInput length={4} disabled value="9999" masked={false} />
      </div>
    </div>
    <CodeExample code={`<PinInput length={4} status="error" message="Invalid PIN" />\n<PinInput length={4} status="success" message="Verified!" />\n<PinInput length={4} disabled />`} />
  </div>
</div>
