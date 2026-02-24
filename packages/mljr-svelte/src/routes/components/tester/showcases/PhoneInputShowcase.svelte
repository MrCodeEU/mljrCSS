<script lang="ts">
  import { PhoneInput, Button, Card } from '$lib';

  let phone1 = $state('');
  let phone2 = $state('');
  let phone3 = $state('');
  let isValid = $state(false);
</script>

<div class="mljr-space-y-8">
  <!-- Basic -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Basic Phone Input</h3>
    <div class="mljr-space-y-2">
      <PhoneInput bind:value={phone1} />
      {#if phone1}
        <p class="mljr-text-xs mljr-text-muted">Value: {phone1}</p>
      {/if}
    </div>
  </section>

  <!-- With Label -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Label and Helper</h3>
    <PhoneInput
      label="Phone Number"
      helper="Enter your mobile number for SMS verification"
      bind:value={phone2}
      onchange={(val, valid) => { isValid = valid; }}
    />
    {#if phone2}
      <p class="mljr-text-xs mljr-mt-2 {isValid ? 'mljr-text-success-600' : 'mljr-text-error-600'}">
        {isValid ? '✓ Valid phone number' : '✗ Invalid phone number'}
      </p>
    {/if}
  </section>

  <!-- Without Flags -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Without Country Flags</h3>
    <PhoneInput
      label="Phone"
      showFlags={false}
      bind:value={phone3}
    />
  </section>

  <!-- Preferred Countries -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Preferred Countries</h3>
    <PhoneInput
      label="Business Phone"
      preferredCountries={['US', 'GB', 'DE']}
    />
  </section>

  <!-- Allowed Countries Only -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Restricted to Specific Countries</h3>
    <PhoneInput
      label="EU Phone Number"
      helper="Only European countries are available"
      allowedCountries={['DE', 'FR', 'IT', 'ES', 'NL', 'BE', 'AT', 'CH']}
    />
  </section>

  <!-- Required -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Required</h3>
    <PhoneInput
      label="Mobile Number"
      required
    />
  </section>

  <!-- Disabled -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Disabled</h3>
    <PhoneInput
      label="Phone Number"
      value="+14155552671"
      disabled
    />
  </section>

  <!-- Registration Form Example -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Registration Form</h3>
    <Card>
      <h4 class="mljr-h5 mljr-mb-4">Contact Information</h4>
      <div class="mljr-space-y-4">
        <PhoneInput
          label="Mobile Number"
          helper="For account verification"
          required
        />
        <Button variant="primary" fullWidth>
          Send Verification Code
        </Button>
      </div>
    </Card>
  </section>
</div>
