<script lang="ts">
  import { RadioGroup, Card, Button } from '$lib';
  import type { RadioOption } from '$lib';

  const sizes: RadioOption[] = [
    { value: 'xs', label: 'Extra Small', helperText: 'For minimal overhead' },
    { value: 'sm', label: 'Small', helperText: 'Lightweight option' },
    { value: 'md', label: 'Medium', helperText: 'Balanced performance' },
    { value: 'lg', label: 'Large', helperText: 'Full-featured option' },
  ];

  const plans: RadioOption[] = [
    { value: 'free', label: 'Free', helperText: '$0/month - Up to 3 projects' },
    { value: 'pro', label: 'Pro', helperText: '$12/month - Unlimited projects' },
    { value: 'team', label: 'Team', helperText: '$49/month - 10 team members' },
    { value: 'enterprise', label: 'Enterprise', helperText: 'Custom pricing' },
  ];

  let size1 = $state('md');
  let plan = $state('pro');
  let color = $state('primary');
  let alignment = $state('left');
</script>

<div class="mljr-space-y-8">
  <!-- Basic -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Basic Radio Group</h3>
    <div class="mljr-space-y-2">
      <RadioGroup name="size-group" options={sizes} bind:value={size1} label="Instance Size" />
      <p class="mljr-text-xs mljr-text-muted">Selected: {size1}</p>
    </div>
  </section>

  <!-- Horizontal -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Horizontal Layout</h3>
    <RadioGroup
      name="alignment-group"
      options={[
        { value: 'left', label: 'Left' },
        { value: 'center', label: 'Center' },
        { value: 'right', label: 'Right' },
      ]}
      direction="horizontal"
      label="Text Alignment"
      bind:value={alignment}
    />
  </section>

  <!-- With Helper Text -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Helper Text per Option</h3>
    <RadioGroup
      name="plan-group"
      options={plans}
      bind:value={plan}
      label="Subscription Plan"
      helperText="You can upgrade or downgrade at any time"
    />
  </section>

  <!-- Error State -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Error State</h3>
    <RadioGroup
      name="tos-group"
      options={[
        { value: 'yes', label: 'Yes, I agree' },
        { value: 'no', label: 'No, I disagree' },
      ]}
      label="Terms of Service"
      error
      errorMessage="You must agree to continue"
    />
  </section>

  <!-- Disabled -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Disabled</h3>
    <RadioGroup
      name="disabled-group"
      options={[
        { value: 'a', label: 'Option A' },
        { value: 'b', label: 'Option B', disabled: true },
        { value: 'c', label: 'Option C' },
      ]}
      value="a"
      label="Disabled Options"
      disabled
    />
  </section>

  <!-- Color Theme Picker -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Settings Form Example</h3>
    <Card>
      <h4 class="mljr-h5 mljr-mb-4">Account Settings</h4>
      <div class="mljr-space-y-6">
        <RadioGroup
          name="color-theme-group"
          options={[
            { value: 'primary', label: 'Orange (Default)' },
            { value: 'teal', label: 'Teal' },
            { value: 'purple', label: 'Purple' },
          ]}
          direction="horizontal"
          label="Color Theme"
          bind:value={color}
        />
        <RadioGroup
          name="appearance-group"
          options={[
            { value: 'light', label: 'Light' },
            { value: 'dark', label: 'Dark' },
            { value: 'system', label: 'System' },
          ]}
          direction="horizontal"
          label="Appearance"
        />
        <Button variant="primary">Save Settings</Button>
      </div>
    </Card>
  </section>
</div>
