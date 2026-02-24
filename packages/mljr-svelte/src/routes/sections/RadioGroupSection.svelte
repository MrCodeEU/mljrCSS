<script lang="ts">
  import { RadioGroup, CodeExample, Alert, type RadioOption } from '$lib';

  const sizeOptions: RadioOption[] = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
    { value: 'xlarge', label: 'Extra Large' },
  ];

  const planOptions: RadioOption[] = [
    {
      value: 'free',
      label: 'Free Plan',
      helperText: 'Perfect for individuals getting started',
    },
    {
      value: 'pro',
      label: 'Pro Plan',
      helperText: 'For professionals and small teams',
    },
    {
      value: 'enterprise',
      label: 'Enterprise Plan',
      helperText: 'Advanced features for large organizations',
    },
  ];

  const paymentOptions: RadioOption[] = [
    {
      value: 'credit',
      label: 'Credit Card',
      helperText: 'Pay with Visa, Mastercard, or Amex',
    },
    {
      value: 'paypal',
      label: 'PayPal',
      helperText: 'Fast and secure payment',
    },
    {
      value: 'bank',
      label: 'Bank Transfer',
      helperText: 'Direct bank transfer (2-3 business days)',
      disabled: true,
    },
  ];

  const shippingOptions: RadioOption[] = [
    { value: 'standard', label: 'Standard Shipping (5-7 days)' },
    { value: 'express', label: 'Express Shipping (2-3 days)' },
    { value: 'overnight', label: 'Overnight Shipping' },
  ];

  let sizeSelection = $state('medium');
  let planSelection = $state('pro');
  let paymentSelection = $state('');
  let shippingSelection = $state('standard');
  let errorSelection = $state('');

  const codeExample = `<script>
  import { RadioGroup, type RadioOption } from 'mljr-svelte';

  const options: RadioOption[] = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
  ];

  let selected = $state('medium');
<\/script>

<!-- Basic usage -->
<RadioGroup
  name="size"
  {options}
  bind:value={selected}
  label="Select Size"
/>

<!-- With helper texts -->
<RadioGroup
  name="plan"
  options={[
    {
      value: 'free',
      label: 'Free Plan',
      helperText: 'Perfect for individuals'
    },
    {
      value: 'pro',
      label: 'Pro Plan',
      helperText: 'For professionals'
    }
  ]}
  bind:value={selected}
  label="Choose Your Plan"
/>

<!-- Horizontal layout -->
<RadioGroup
  name="size"
  {options}
  bind:value={selected}
  direction="horizontal"
/>

<!-- With error state -->
<RadioGroup
  name="payment"
  {options}
  bind:value={selected}
  label="Payment Method"
  error={true}
  errorMessage="Please select a payment method"
/>`;
</script>

<div class="radio-group-section">
  <div class="mljr-mb-6">
    <p class="mljr-text-lg mljr-text-muted">
      Manage radio button selections as a group with mutually exclusive options and rich helper
      text support.
    </p>
  </div>

  <div class="examples-grid">
    <!-- Basic Usage -->
    <div class="example-card">
      <h3 class="example-title">Basic Usage</h3>
      <RadioGroup
        name="size-basic"
        options={sizeOptions}
        bind:value={sizeSelection}
        label="Select Size"
        helperText="Choose your preferred size"
      />
      <Alert variant="info" class="mljr-mt-4">
        Selected: <strong>{sizeSelection || 'None'}</strong>
      </Alert>
    </div>

    <!-- With Helper Text -->
    <div class="example-card">
      <h3 class="example-title">With Helper Text</h3>
      <RadioGroup
        name="plan"
        options={planOptions}
        bind:value={planSelection}
        label="Choose Your Plan"
        helperText="Select the plan that best fits your needs"
      />
    </div>

    <!-- Horizontal Layout -->
    <div class="example-card full-width">
      <h3 class="example-title">Horizontal Layout</h3>
      <RadioGroup
        name="size-horizontal"
        options={sizeOptions}
        bind:value={sizeSelection}
        label="Product Size"
        direction="horizontal"
      />
    </div>

    <!-- With Disabled Option -->
    <div class="example-card">
      <h3 class="example-title">With Disabled Option</h3>
      <RadioGroup
        name="payment"
        options={paymentOptions}
        bind:value={paymentSelection}
        label="Payment Method"
        helperText="Bank transfer is temporarily unavailable"
      />
    </div>

    <!-- Disabled State -->
    <div class="example-card">
      <h3 class="example-title">Disabled State</h3>
      <RadioGroup
        name="size-disabled"
        options={sizeOptions}
        value="large"
        label="Locked Selection"
        disabled={true}
      />
    </div>

    <!-- Error State -->
    <div class="example-card full-width">
      <h3 class="example-title">Error State</h3>
      <RadioGroup
        name="shipping-error"
        options={shippingOptions}
        bind:value={errorSelection}
        label="Shipping Method *"
        error={errorSelection === ''}
        errorMessage={errorSelection === '' ? 'Please select a shipping method' : ''}
        helperText="Required field"
      />
    </div>

    <!-- With onChange Callback -->
    <div class="example-card full-width">
      <h3 class="example-title">With Change Callback</h3>
      <RadioGroup
        name="shipping"
        options={shippingOptions}
        bind:value={shippingSelection}
        label="Delivery Speed"
        onchange={(val) => console.log('Shipping method changed:', val)}
      />
      <Alert variant="success" class="mljr-mt-4">
        Current selection: <strong>{shippingSelection}</strong>
      </Alert>
    </div>

    <!-- Comparison: Radio vs RadioGroup -->
    <div class="example-card full-width">
      <h3 class="example-title">Why Use RadioGroup?</h3>
      <div class="comparison-grid">
        <div class="comparison-item">
          <h4 class="comparison-title">✅ With RadioGroup</h4>
          <ul class="comparison-list">
            <li>Automatic state management</li>
            <li>Built-in label and helper text</li>
            <li>Consistent spacing and layout</li>
            <li>Error handling</li>
            <li>Less boilerplate code</li>
            <li>Type-safe options</li>
          </ul>
        </div>
        <div class="comparison-item">
          <h4 class="comparison-title">⚠️ Without RadioGroup</h4>
          <ul class="comparison-list">
            <li>Manual state tracking</li>
            <li>Custom label implementation</li>
            <li>Manual spacing/layout</li>
            <li>Custom error display</li>
            <li>More code to maintain</li>
            <li>Potential inconsistencies</li>
          </ul>
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
  .radio-group-section {
    max-width: 100%;
  }

  .examples-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
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

  .comparison-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: var(--mljr-space-4);
  }

  .comparison-item {
    padding: var(--mljr-space-4);
    background: var(--mljr-bg-secondary);
    border-radius: var(--mljr-radius-md);
    border: 1px solid var(--mljr-border);
  }

  .comparison-title {
    font-size: var(--mljr-text-base);
    font-weight: 600;
    color: var(--mljr-text);
    margin-bottom: var(--mljr-space-3);
  }

  .comparison-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: var(--mljr-space-2);
  }

  .comparison-list li {
    font-size: var(--mljr-text-sm);
    color: var(--mljr-text-secondary);
    padding-left: var(--mljr-space-4);
    position: relative;
  }

  .comparison-list li::before {
    content: '•';
    position: absolute;
    left: 0;
    color: var(--mljr-primary-600);
  }
</style>
