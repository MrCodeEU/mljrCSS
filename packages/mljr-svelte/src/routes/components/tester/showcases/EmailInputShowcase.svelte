<script lang="ts">
  import { EmailInput, Button, Card } from '$lib';

  let email1 = $state('');
  let email2 = $state('');
  let email3 = $state('');
  let multipleEmails = $state('');
  let isValid1 = $state<boolean | null>(null);
</script>

<div class="mljr-space-y-8">
  <!-- Basic Email -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Basic Email Input</h3>
    <EmailInput bind:value={email1} />
  </section>

  <!-- With Label -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Label and Helper</h3>
    <EmailInput
      label="Email Address"
      helper="We'll never share your email with anyone else"
      bind:value={email2}
    />
  </section>

  <!-- With Validation Callback -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Validation Feedback</h3>
    <div class="mljr-space-y-2">
      <EmailInput
        label="Work Email"
        bind:value={email3}
        onvalidation={(valid) => { isValid1 = valid; }}
      />
      {#if isValid1 !== null && email3}
        <p class="mljr-text-sm {isValid1 ? 'mljr-text-success-600' : 'mljr-text-error-600'}">
          {isValid1 ? '✓ Valid email address' : '✗ Please enter a valid email'}
        </p>
      {/if}
    </div>
  </section>

  <!-- Custom Validator -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Custom Validator (work emails only)</h3>
    <EmailInput
      label="Corporate Email"
      helper="Must be a work email (@company.com)"
      validator={(email) => email.endsWith('@company.com')}
    />
  </section>

  <!-- Multiple Emails -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Multiple Emails</h3>
    <EmailInput
      label="CC Recipients"
      helper="Enter multiple emails separated by commas"
      multiple
      bind:value={multipleEmails}
    />
  </section>

  <!-- No Validation Icons -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Without Validation Icons</h3>
    <EmailInput
      label="Email"
      showValidation={false}
    />
  </section>

  <!-- Required -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Required Field</h3>
    <EmailInput
      label="Email Address"
      required
    />
  </section>

  <!-- Disabled -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Disabled</h3>
    <EmailInput
      label="Email"
      value="user@example.com"
      disabled
    />
  </section>

  <!-- Sign In Form Example -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Sign In Form</h3>
    <Card>
      <h4 class="mljr-h5 mljr-mb-4">Welcome Back</h4>
      <div class="mljr-space-y-4">
        <EmailInput
          label="Email"
          required
          bind:value={email1}
        />
        <Button variant="primary" fullWidth>
          Continue
        </Button>
      </div>
    </Card>
  </section>
</div>
