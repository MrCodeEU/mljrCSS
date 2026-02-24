<script lang="ts">
  import { Radio, Card } from '$lib';

  let basic = $state('option1');
  let withLabel = $state('');
  let withHelper = $state('size-medium');
  let disabled = $state('option1');
  let size = $state('medium');
  let payment = $state('credit-card');
  let plan = $state('pro');

  const paymentOptions = [
    { value: 'credit-card', label: 'Credit Card', helper: 'Visa, Mastercard, Amex' },
    { value: 'paypal', label: 'PayPal', helper: 'Pay with your PayPal account' },
    { value: 'bank', label: 'Bank Transfer', helper: '2-3 business days' }
  ];

  const planOptions = [
    {
      value: 'free',
      label: 'Free',
      helper: 'Basic features • Up to 5 projects • Community support'
    },
    {
      value: 'pro',
      label: 'Pro - $29/mo',
      helper: 'All features • Unlimited projects • Priority support'
    },
    {
      value: 'enterprise',
      label: 'Enterprise',
      helper: 'Custom solutions • Dedicated support • SLA'
    }
  ];
</script>

<div class="mljr-space-y-8">
  <!-- Basic -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Basic Radio</h3>
    <div class="mljr-space-y-2">
      <div class="mljr-space-y-2">
        <Radio name="basic" value="option1" bind:group={basic} />
        <Radio name="basic" value="option2" bind:group={basic} />
        <Radio name="basic" value="option3" bind:group={basic} />
      </div>
      <p class="mljr-text-xs mljr-text-muted">Selected: {basic}</p>
    </div>
  </section>

  <!-- With Label -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Label</h3>
    <div class="mljr-space-y-3">
      <Radio
        name="with-label"
        value="option1"
        label="Option 1"
        bind:group={withLabel}
      />
      <Radio
        name="with-label"
        value="option2"
        label="Option 2"
        bind:group={withLabel}
      />
      <Radio
        name="with-label"
        value="option3"
        label="Option 3"
        bind:group={withLabel}
      />
    </div>
    <p class="mljr-text-xs mljr-text-muted mljr-mt-2">
      Selected: {withLabel || '(none)'}
    </p>
  </section>

  <!-- With Helper Text -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Helper Text</h3>
    <div class="mljr-space-y-3">
      <Radio
        name="size"
        value="size-small"
        label="Small"
        bind:group={withHelper}
      />
      <Radio
        name="size"
        value="size-medium"
        label="Medium"
        bind:group={withHelper}
      />
      <Radio
        name="size"
        value="size-large"
        label="Large"
        bind:group={withHelper}
      />
    </div>
  </section>

  <!-- States -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">States</h3>
    <div class="mljr-space-y-3">
      <Radio
        name="states-normal"
        value="unchecked"
        label="Normal unchecked"
        bind:group={basic}
      />
      <Radio
        name="states"
        value="option1"
        label="Normal checked"
        bind:group={disabled}
      />
      <Radio
        name="disabled"
        value="disabled-unchecked"
        label="Disabled unchecked"
        disabled
        bind:group={basic}
      />
      <Radio
        name="disabled"
        value="option1"
        label="Disabled checked"
        disabled
        bind:group={disabled}
      />
    </div>
  </section>

  <!-- Sizes -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Sizes</h3>
    <div class="mljr-space-y-3">
      <Radio
        name="size-demo"
        value="small"
        size="sm"
        label="Small radio"
        bind:group={size}
      />
      <Radio
        name="size-demo"
        value="medium"
        label="Medium radio (default)"
        bind:group={size}
      />
      <Radio
        name="size-demo"
        value="large"
        size="lg"
        label="Large radio"
        bind:group={size}
      />
    </div>
  </section>

  <!-- Payment Method Example -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Payment Method Selection</h3>
    <Card>
      <h4 class="mljr-h5 mljr-mb-3">Choose payment method</h4>
      <div class="mljr-space-y-3">
        {#each paymentOptions as option}
          <Radio
            name="payment"
            value={option.value}
            label={option.label}
            bind:group={payment}
          />
        {/each}
      </div>
      <p class="mljr-text-sm mljr-text-muted mljr-mt-4">
        Selected: {payment}
      </p>
    </Card>
  </section>

  <!-- Pricing Plan Example -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Pricing Plan Selection</h3>
    <Card>
      <h4 class="mljr-h5 mljr-mb-3">Select your plan</h4>
      <div class="mljr-space-y-3">
        {#each planOptions as option}
          <Radio
            name="plan"
            value={option.value}
            label={option.label}
            bind:group={plan}
          />
        {/each}
      </div>
    </Card>
  </section>

  <!-- Card Style Options -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Card-Style Radio Options</h3>
    <div class="mljr-grid mljr-grid-cols-1 mljr-md:grid-cols-3 mljr-gap-3">
      {#each planOptions as option}
        <label
          class="mljr-block mljr-cursor-pointer mljr-p-4 mljr-rounded-lg mljr-border-2 mljr-transition-all {plan === option.value
            ? 'mljr-border-primary-500 mljr-bg-primary-50 dark:mljr-bg-primary-900/20'
            : 'mljr-border-gray-200 dark:mljr-border-gray-700 hover:mljr-border-primary-200'}"
        >
          <Radio
            name="plan-cards"
            value={option.value}
            label={option.label}
            bind:group={plan}
          />
        </label>
      {/each}
    </div>
  </section>
</div>
