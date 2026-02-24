<script lang="ts">
  import { Select, Icon, Card } from '$lib';

  let basicValue = $state('');
  let withLabel = $state('');
  let withHelper = $state('');
  let errorValue = $state('');
  let successValue = $state('option2');
  let disabledValue = $state('');
  let country = $state('');
  let size = $state('medium');
</script>

<div class="mljr-space-y-8">
  <!-- Basic -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Basic Select</h3>
    <div class="mljr-space-y-3">
      <Select bind:value={basicValue}>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
        <option value="option4">Option 4</option>
      </Select>
      <p class="mljr-text-xs mljr-text-muted">
        Selected: {basicValue || '(none)'}
      </p>
    </div>
  </section>

  <!-- With Label -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Label</h3>
    <div class="mljr-grid mljr-grid-cols-1 mljr-md:grid-cols-2 mljr-gap-4">
      <Select label="Choose an option" bind:value={withLabel}>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
        <option value="option4">Option 4</option>
      </Select>
      <Select
        label="Country"
        bind:value={country}
      >
        <option value="">Select your country</option>
        <option value="us">United States</option>
        <option value="uk">United Kingdom</option>
        <option value="ca">Canada</option>
        <option value="au">Australia</option>
        <option value="de">Germany</option>
        <option value="fr">France</option>
        <option value="jp">Japan</option>
      </Select>
    </div>
  </section>

  <!-- With Placeholder -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Placeholder</h3>
    <Select bind:value={basicValue}>
      <option value="">Choose an option...</option>
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      <option value="option3">Option 3</option>
      <option value="option4">Option 4</option>
    </Select>
  </section>

  <!-- With Helper Text -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Helper Text</h3>
    <Select
      label="T-Shirt Size"
      helperText="Please select your preferred size"
      bind:value={size}
    >
      <option value="xs">Extra Small</option>
      <option value="small">Small</option>
      <option value="medium">Medium</option>
      <option value="large">Large</option>
      <option value="xl">Extra Large</option>
    </Select>
  </section>

  <!-- States -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">States</h3>
    <div class="mljr-space-y-3">
      <Select
        label="Error State"
        error={true}
        errorText="Please select a valid option"
        bind:value={errorValue}
      >
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
        <option value="option4">Option 4</option>
      </Select>

      <Select
        label="Success State"
        bind:value={successValue}
      >
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
        <option value="option4">Option 4</option>
      </Select>

      <Select
        label="Disabled"
        disabled
        bind:value={disabledValue}
      >
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
        <option value="option4">Option 4</option>
      </Select>
    </div>
  </section>

  <!-- Sizes -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Sizes</h3>
    <div class="mljr-space-y-3">
      <Select size="sm" label="Small">
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </Select>
      <Select label="Medium (Default)">
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </Select>
      <Select size="lg" label="Large">
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </Select>
    </div>
  </section>

  <!-- With Icons -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Icon</h3>
    <Select label="Language">
      <option value="">Select language</option>
      <option value="us">United States</option>
      <option value="uk">United Kingdom</option>
      <option value="ca">Canada</option>
    </Select>
  </section>

  <!-- Full Width -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Full Width</h3>
    <Select
      label="Full Width Select"
    >
      <option value="">This select spans the full width</option>
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      <option value="option3">Option 3</option>
    </Select>
  </section>

  <!-- Required Field -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Required Field</h3>
    <Select
      label="Required Selection"
      required
      helperText="This field is required"
    >
      <option value="">Please make a selection</option>
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      <option value="option3">Option 3</option>
    </Select>
  </section>

  <!-- Form Example -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Form Example</h3>
    <Card>
      <h4 class="mljr-h5 mljr-mb-4">Shipping Information</h4>
      <div class="mljr-space-y-4">
        <Select
          label="Country"
          required
          bind:value={country}
        >
          <option value="">Select your country</option>
          <option value="us">United States</option>
          <option value="uk">United Kingdom</option>
          <option value="ca">Canada</option>
          <option value="au">Australia</option>
        </Select>

        <Select
          label="Shipping Speed"
          helperText="Delivery time estimates"
        >
          <option value="standard">Standard (5-7 days)</option>
          <option value="express">Express (2-3 days)</option>
          <option value="overnight">Overnight</option>
        </Select>

        <Select
          label="Package Size"
          bind:value={size}
        >
          <option value="xs">Extra Small</option>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
          <option value="xl">Extra Large</option>
        </Select>
      </div>
    </Card>
  </section>

  <!-- Many Options -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Many Options</h3>
    <Select label="Choose a number">
      <option value="">Select a number...</option>
      {#each Array.from({ length: 50 }, (_, i) => i + 1) as num}
        <option value={String(num)}>Number {num}</option>
      {/each}
    </Select>
  </section>
</div>
