<script lang="ts">
  import { FormWizard, Input, EmailInput, Password, RadioGroup, Button, Card, Icon } from '$lib';
  import type { WizardStep } from '$lib';

  const registrationSteps: WizardStep[] = [
    {
      id: 'account',
      title: 'Account',
      description: 'Create your login credentials',
      icon: 'mdi:account'
    },
    {
      id: 'profile',
      title: 'Profile',
      description: 'Tell us about yourself',
      icon: 'mdi:card-account-details'
    },
    {
      id: 'preferences',
      title: 'Preferences',
      description: 'Customize your experience',
      icon: 'mdi:tune'
    },
    {
      id: 'confirm',
      title: 'Confirm',
      description: 'Review and submit',
      icon: 'mdi:check-circle'
    }
  ];

  let wizardRef = $state<any>(null);
  let completed = $state(false);
</script>

<div class="mljr-space-y-8">
  <!-- Registration Wizard -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Multi-Step Registration Form</h3>
    {#if completed}
      <Card>
        <div class="mljr-text-center mljr-py-8">
          <div class="mljr-w-16 mljr-h-16 mljr-bg-success-100 dark:mljr-bg-success-900/20 mljr-rounded-full mljr-flex mljr-items-center mljr-justify-center mljr-mx-auto mljr-mb-4">
            <Icon icon="mdi:check" size={32} class="mljr-text-success-500" />
          </div>
          <h4 class="mljr-h4 mljr-mb-2">Registration Complete!</h4>
          <p class="mljr-text-secondary mljr-mb-4">Your account has been created successfully.</p>
          <Button variant="outline-primary" onclick={() => { completed = false; }}>
            Start Over
          </Button>
        </div>
      </Card>
    {:else}
      <FormWizard
        steps={registrationSteps}
        bind:this={wizardRef}
        onComplete={async () => { completed = true; }}
      >
        {#snippet children(step, formData)}
          {#if step.id === 'account'}
            <div class="mljr-space-y-4">
              <EmailInput label="Email Address" required placeholder="you@example.com" />
              <Password label="Password" showStrength showRequirements required />
              <Password label="Confirm Password" required placeholder="Repeat your password" />
            </div>

          {:else if step.id === 'profile'}
            <div class="mljr-space-y-4">
              <div class="mljr-grid mljr-grid-cols-2 mljr-gap-4">
                <Input label="First Name" required placeholder="John" />
                <Input label="Last Name" required placeholder="Doe" />
              </div>
              <Input label="Username" placeholder="johndoe" />
              <RadioGroup
                options={[
                  { value: 'developer', label: 'Developer' },
                  { value: 'designer', label: 'Designer' },
                  { value: 'manager', label: 'Manager' },
                  { value: 'other', label: 'Other' },
                ]}
                name="role"
                direction="horizontal"
                label="Role"
              />
            </div>

          {:else if step.id === 'preferences'}
            <div class="mljr-space-y-4">
              <RadioGroup
                options={[
                  { value: 'light', label: 'Light' },
                  { value: 'dark', label: 'Dark' },
                  { value: 'system', label: 'System' },
                ]}
                name="theme"
                direction="horizontal"
                label="Theme Preference"
              />
              <RadioGroup
                options={[
                  { value: 'weekly', label: 'Weekly digest' },
                  { value: 'daily', label: 'Daily updates' },
                  { value: 'never', label: 'Never' },
                ]}
                name="notifications"
                label="Email Notifications"
              />
            </div>

          {:else if step.id === 'confirm'}
            <div class="mljr-space-y-3">
              <p class="mljr-text-secondary mljr-text-sm">Please review your information before submitting.</p>
              <div class="mljr-p-4 mljr-bg-secondary mljr-rounded-xl mljr-space-y-2">
                <div class="mljr-flex mljr-justify-between mljr-text-sm">
                  <span class="mljr-text-muted">Steps completed</span>
                  <span class="mljr-font-medium">3 / 3</span>
                </div>
                <div class="mljr-flex mljr-items-center mljr-gap-2 mljr-text-success-600 mljr-text-sm">
                  <Icon icon="mdi:check-circle" size={16} />
                  <span>Account details provided</span>
                </div>
                <div class="mljr-flex mljr-items-center mljr-gap-2 mljr-text-success-600 mljr-text-sm">
                  <Icon icon="mdi:check-circle" size={16} />
                  <span>Profile information filled</span>
                </div>
                <div class="mljr-flex mljr-items-center mljr-gap-2 mljr-text-success-600 mljr-text-sm">
                  <Icon icon="mdi:check-circle" size={16} />
                  <span>Preferences configured</span>
                </div>
              </div>
              <label class="mljr-flex mljr-items-start mljr-gap-2 mljr-text-sm mljr-cursor-pointer">
                <input type="checkbox" class="mljr-checkbox mljr-mt-0.5" />
                <span class="mljr-text-secondary">
                  I agree to the <a href="." class="mljr-text-primary-500">Terms of Service</a> and
                  <a href="." class="mljr-text-primary-500">Privacy Policy</a>
                </span>
              </label>
            </div>
          {/if}
        {/snippet}
      </FormWizard>
    {/if}
  </section>

  <!-- Features Overview -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">FormWizard Features</h3>
    <div class="mljr-grid mljr-grid-cols-2 mljr-gap-4">
      {#each [
        { icon: 'mdi:step-forward', title: 'Step Navigation', desc: 'Next/Back buttons with progress tracking' },
        { icon: 'mdi:check-all', title: 'Per-step Validation', desc: 'Validate each step before advancing' },
        { icon: 'mdi:content-save', title: 'Data Persistence', desc: 'Optional localStorage saving' },
        { icon: 'mdi:restore', title: 'Reset Support', desc: 'Clear all steps and start over' },
      ] as feature}
        <Card>
          <div class="mljr-flex mljr-items-start mljr-gap-3">
            <Icon icon={feature.icon} size={24} class="mljr-text-primary-500 mljr-flex-shrink-0" />
            <div>
              <p class="mljr-font-medium mljr-text-sm">{feature.title}</p>
              <p class="mljr-text-xs mljr-text-muted">{feature.desc}</p>
            </div>
          </div>
        </Card>
      {/each}
    </div>
  </section>
</div>
