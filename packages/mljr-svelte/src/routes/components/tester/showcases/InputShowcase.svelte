<script lang="ts">
  import { Input, Icon, Button } from '$lib';

  let basicValue = $state('');
  let withLabel = $state('');
  let withPlaceholder = $state('');
  let withHelper = $state('');
  let errorValue = $state('');
  let successValue = $state('Valid input');
  let disabledValue = $state('Disabled input');
  let withIcon = $state('');
  let withButton = $state('');
  let readonlyValue = $state('Read-only value');
  let passwordValue = $state('');
</script>

<div class="mljr-space-y-8">
  <!-- Basic -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Basic Input</h3>
    <div class="mljr-space-y-3">
      <Input bind:value={basicValue} />
      <p class="mljr-text-xs mljr-text-muted">Value: {basicValue || '(empty)'}</p>
    </div>
  </section>

  <!-- With Label -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Label</h3>
    <div class="mljr-grid mljr-grid-cols-1 mljr-md:grid-cols-2 mljr-gap-4">
      <Input label="Full Name" bind:value={withLabel} />
      <Input label="Email Address" type="email" bind:value={withPlaceholder} />
    </div>
  </section>

  <!-- With Placeholder -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Placeholder</h3>
    <div class="mljr-grid mljr-grid-cols-1 mljr-md:grid-cols-2 mljr-gap-4">
      <Input placeholder="Enter your username" bind:value={withPlaceholder} />
      <Input
        label="Username"
        placeholder="johndoe"
        bind:value={withPlaceholder}
      />
    </div>
  </section>

  <!-- With Helper Text -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Helper Text</h3>
    <Input
      label="Password"
      type="password"
      helperText="Must be at least 8 characters long"
      bind:value={withHelper}
    />
  </section>

  <!-- States -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">States</h3>
    <div class="mljr-space-y-3">
      <Input
        label="Error State"
        error={true}
        errorText="This field is required"
        bind:value={errorValue}
      />

      <Input
        label="Success State"
        success={true}
        bind:value={successValue}
      />

      <Input label="Disabled" disabled bind:value={disabledValue} />

      <Input label="Read Only" readonly bind:value={readonlyValue} />
    </div>
  </section>

  <!-- Input Types -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Input Types</h3>
    <div class="mljr-grid mljr-grid-cols-1 mljr-md:grid-cols-2 mljr-gap-4">
      <Input label="Text" type="text" placeholder="Text input" />
      <Input label="Email" type="email" placeholder="user@example.com" />
      <Input label="Password" type="password" placeholder="••••••••" />
      <Input label="Number" type="number" placeholder="42" />
      <Input label="Tel" type="tel" placeholder="+1 (555) 123-4567" />
      <Input label="URL" type="url" placeholder="https://example.com" />
      <Input label="Date" type="date" />
      <Input label="Time" type="time" />
    </div>
  </section>

  <!-- With Icons -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Icons</h3>
    <div class="mljr-space-y-3">
      <div class="mljr-relative">
        <span class="mljr-absolute mljr-left-3 mljr-top-1/2 -mljr-translate-y-1/2 mljr-text-muted mljr-pointer-events-none">
          <Icon icon="mdi:magnify" size={20} />
        </span>
        <Input label="Search" placeholder="Search..." bind:value={withIcon} class="mljr-pl-10" />
      </div>

      <div class="mljr-relative">
        <span class="mljr-absolute mljr-left-3 mljr-top-1/2 -mljr-translate-y-1/2 mljr-text-muted mljr-pointer-events-none" style="top: calc(50% + 12px)">
          <Icon icon="mdi:email" size={20} />
        </span>
        <Input label="Email" placeholder="user@example.com" class="mljr-pl-10" />
      </div>

      <Input label="Amount" placeholder="0.00" />
      <Input label="Website" placeholder="example.com" />
    </div>
  </section>

  <!-- With Button -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Button</h3>
    <div class="mljr-space-y-3">
      <div class="mljr-flex mljr-gap-2">
        <Input label="Promo Code" placeholder="Enter code" bind:value={withButton} />
        <div class="mljr-flex mljr-items-end">
          <Button size="sm" variant="primary">Apply</Button>
        </div>
      </div>

      <div class="mljr-flex mljr-gap-2">
        <Input placeholder="Search repositories..." bind:value={withButton} />
        <div class="mljr-flex mljr-items-end">
          <Button size="sm" variant="ghost">
            <Icon icon="mdi:tune" size={20} />
          </Button>
        </div>
      </div>
    </div>
  </section>

  <!-- Sizes -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Sizes</h3>
    <div class="mljr-space-y-3">
      <Input size="sm" label="Small" placeholder="Small input" />
      <Input label="Medium (Default)" placeholder="Medium input" />
      <Input size="lg" label="Large" placeholder="Large input" />
    </div>
  </section>

  <!-- Full Width -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Full Width</h3>
    <Input
      label="Full Width Input"
      placeholder="This input spans the full width"
    />
  </section>

  <!-- Required Field -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Required Field</h3>
    <Input
      label="Required Field"
      placeholder="This field is required"
      required
      helperText="This field cannot be empty"
    />
  </section>
</div>
