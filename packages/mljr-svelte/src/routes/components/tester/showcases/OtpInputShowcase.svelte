<script lang="ts">
  import { OtpInput, Card, Button, Icon } from '$lib';

  let otp1 = $state('');
  let otp2 = $state('');
  let otp3 = $state('');
  let isVerified = $state(false);
  let isLoading = $state(false);

  function verify() {
    if (otp1.length === 6) {
      isLoading = true;
      setTimeout(() => {
        isLoading = false;
        isVerified = otp1 === '123456';
      }, 1000);
    }
  }
</script>

<div class="mljr-space-y-8">
  <!-- Basic -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Basic OTP Input (6 digits)</h3>
    <div class="mljr-space-y-2">
      <OtpInput bind:value={otp1} />
      <p class="mljr-text-xs mljr-text-muted">Value: "{otp1}"</p>
    </div>
  </section>

  <!-- 4-Digit PIN -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">4-Digit PIN</h3>
    <OtpInput length={4} bind:value={otp2} />
  </section>

  <!-- Password Type -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Password Type (Hidden)</h3>
    <OtpInput type="password" bind:value={otp3} />
  </section>

  <!-- With Auto-focus -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Auto-focus</h3>
    <OtpInput autofocus />
  </section>

  <!-- On Complete Callback -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Completion Callback</h3>
    <div class="mljr-space-y-2">
      <OtpInput
        bind:value={otp2}
        length={4}
        onComplete={(val) => { otp2 = val; }}
      />
      {#if otp2.length === 4}
        <p class="mljr-text-sm mljr-text-success-600">✓ PIN complete!</p>
      {/if}
    </div>
  </section>

  <!-- Disabled -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Disabled</h3>
    <OtpInput value="123" disabled />
  </section>

  <!-- Verification Example -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Email Verification Example</h3>
    <Card>
      <div class="mljr-text-center mljr-space-y-4">
        <div class="mljr-w-16 mljr-h-16 mljr-bg-primary-100 dark:mljr-bg-primary-900/20 mljr-rounded-full mljr-flex mljr-items-center mljr-justify-center mljr-mx-auto">
          <Icon icon="mdi:email-check" size={32} class="mljr-text-primary-500" />
        </div>
        <div>
          <h4 class="mljr-h5">Check your email</h4>
          <p class="mljr-text-sm mljr-text-muted mljr-mt-1">
            We sent a 6-digit code to user@example.com
          </p>
          <p class="mljr-text-xs mljr-text-muted mljr-mt-1">(Try code: 123456)</p>
        </div>
        <OtpInput bind:value={otp1} onComplete={verify} />
        {#if isVerified !== false || otp1.length === 6}
          <div class="mljr-text-sm {isLoading ? 'mljr-text-muted' : isVerified ? 'mljr-text-success-600' : 'mljr-text-error-600'}">
            {#if isLoading}
              Verifying...
            {:else if isVerified}
              ✓ Verified successfully!
            {:else if otp1.length === 6}
              ✗ Invalid code. Please try again.
            {/if}
          </div>
        {/if}
        <Button
          variant="primary"
          fullWidth
          onclick={verify}
          disabled={otp1.length !== 6 || isLoading}
        >
          {isLoading ? 'Verifying...' : 'Verify Code'}
        </Button>
        <p class="mljr-text-xs mljr-text-muted">
          Didn't receive it? <a href="." class="mljr-text-primary-500">Resend code</a>
        </p>
      </div>
    </Card>
  </section>
</div>
