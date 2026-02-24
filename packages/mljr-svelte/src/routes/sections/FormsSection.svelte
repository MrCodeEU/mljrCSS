<script lang="ts">
  import { Card, Input, Select, Checkbox, Radio, Switch, Password, Label, Fieldset, Form, Validator, FormWizard, type WizardStep, CodeExample, themeStore, toastStore } from '$lib';

  let inputValue = $state('');
  let selectValue = $state('');
  let checkboxChecked = $state(false);
  let switchEnabled = $state(true);
  let passwordValue = $state('');
  let passwordStrength = $state(0);
  let labelInput = $state('');

  // Form validation examples
  let formData = $state({ username: '', email: '', password: '' });
  let submitResult = $state('');
  let isSubmitting = $state(false);

  async function handleFormSubmit(data: FormData) {
    isSubmitting = true;
    submitResult = 'Submitting...';

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    const username = data.get('username');
    const email = data.get('email');
    submitResult = `Success! Username: ${username}, Email: ${email}`;
    toastStore.add({ type: 'success', message: 'Form submitted successfully!' });
    isSubmitting = false;
  }

  function handleFormReset() {
    submitResult = '';
    formData = { username: '', email: '', password: '' };
    toastStore.add({ type: 'info', message: 'Form reset' });
  }

  // Validator examples
  let validatorInput = $state('');
  let emailValidatorInput = $state('');
  let passwordValidatorInput = $state('');

  const emailRules = [
    {
      validate: (val: string) => !!val && val.length > 0,
      message: 'Email is required',
    },
    {
      validate: (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
      message: 'Must be a valid email address',
    },
  ];

  const passwordRules = [
    {
      validate: (val: string) => !!val && val.length >= 8,
      message: 'Password must be at least 8 characters',
    },
    {
      validate: (val: string) => /[A-Z]/.test(val),
      message: 'Must contain at least one uppercase letter',
    },
    {
      validate: (val: string) => /[0-9]/.test(val),
      message: 'Must contain at least one number',
    },
  ];

  // Custom icons examples
  let customCheckbox1 = $state(false);
  let customCheckbox2 = $state(true);
  let customCheckbox3 = $state(false);
  let customRadio = $state('option1');

  // Form Wizard examples
  let wizardCurrentStep = $state(0);
  let wizardData = $state({
    personalInfo: { name: '', email: '' },
    accountInfo: { username: '', password: '' },
    preferences: { newsletter: false, notifications: true },
  });

  const wizardSteps: WizardStep[] = [
    {
      id: 'personal',
      title: 'Personal Info',
      description: 'Basic information',
      icon: 'mdi:account',
      validate: () => {
        return !!wizardData.personalInfo.name && !!wizardData.personalInfo.email;
      },
    },
    {
      id: 'account',
      title: 'Account',
      description: 'Login credentials',
      icon: 'mdi:lock',
      validate: () => {
        return !!wizardData.accountInfo.username && wizardData.accountInfo.password.length >= 6;
      },
    },
    {
      id: 'preferences',
      title: 'Preferences',
      description: 'Your settings',
      icon: 'mdi:cog',
    },
  ];

  async function handleWizardComplete(data: any) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    toastStore.add({ type: 'success', message: 'Wizard completed!' });
    console.log('Wizard data:', data);
  }
</script>

<section id="forms" class="mljr-mb-8">
  <Card title="Form Components" description="Inputs, selects, checkboxes, and switches">
    <div class="mljr-grid mljr-grid-cols-1 mljr-md:grid-cols-2 mljr-gap-6">
      <div>
        <h4 class="mljr-h5 mljr-mb-3">Text Inputs</h4>
        <Input
          label="Username"
          placeholder="Enter your username"
          bind:value={inputValue}
          helperText="Choose a unique username"
        />
        <div class="mljr-mt-4">
          <Input
            label="Email"
            type="email"
            placeholder="email@example.com"
            required
          />
        </div>
        <div class="mljr-mt-4">
          <Input
            label="Password (Basic)"
            type="password"
            placeholder="Enter password"
            helperText="Basic password input"
          />
        </div>
        <div class="mljr-mt-4">
          <Password
            label="Password (With Strength)"
            bind:value={passwordValue}
            showStrength
            showCrackTime
            showRequirements
            minStrength={2}
            helperText="Type to see strength meter"
          />
        </div>
      </div>

      <div>
        <h4 class="mljr-h5 mljr-mb-3">Select</h4>
        <Select label="Country" bind:value={selectValue}>
          <option value="">Select a country</option>
          <option value="us">United States</option>
          <option value="uk">United Kingdom</option>
          <option value="de">Germany</option>
          <option value="fr">France</option>
          <option value="jp">Japan</option>
        </Select>

        <div class="mljr-mt-6">
          <h4 class="mljr-h5 mljr-mb-3">Checkboxes</h4>
          <div class="mljr-flex mljr-flex-col mljr-gap-2">
            <Checkbox label="Accept terms and conditions" bind:checked={checkboxChecked} />
            <Checkbox label="Subscribe to newsletter" />
            <Checkbox label="Secondary color" secondary checked />
            <Checkbox label="Disabled checkbox" disabled />
          </div>
        </div>

        <div class="mljr-mt-6">
          <h4 class="mljr-h5 mljr-mb-3">Radio Buttons</h4>
          <div class="mljr-radio-group">
            <label class="mljr-radio">
              <input type="radio" name="demo-radio" class="mljr-radio-input" value="option1" checked />
              <span class="mljr-radio-label">Option 1 (Primary)</span>
            </label>
            <label class="mljr-radio">
              <input type="radio" name="demo-radio" class="mljr-radio-input" value="option2" />
              <span class="mljr-radio-label">Option 2</span>
            </label>
            <label class="mljr-radio mljr-radio-secondary">
              <input type="radio" name="demo-radio2" class="mljr-radio-input" value="option3" checked />
              <span class="mljr-radio-label">Secondary Color</span>
            </label>
          </div>
        </div>

        <div class="mljr-mt-6">
          <h4 class="mljr-h5 mljr-mb-3">Switches</h4>
          <div class="mljr-flex mljr-flex-col mljr-gap-2">
            <Switch label="Enable notifications" bind:checked={switchEnabled} />
            <Switch label="Dark mode" checked={themeStore.isDark} onchange={() => themeStore.toggleTheme()} />
            <Switch label="Secondary color" secondary />
            <Switch label="Disabled switch" disabled />
          </div>
        </div>
      </div>
    </div>

    <CodeExample code={`&lt;!-- Input --&gt;
&lt;Input
  label="Username"
  placeholder="Enter your username"
  bind:value={inputValue}
  helperText="Choose a unique username"
/&gt;

&lt;Input
  label="Email"
  type="email"
  placeholder="email@example.com"
  required
/&gt;

&lt;!-- Password with Strength --&gt;
&lt;Password
  label="Password"
  bind:value={passwordValue}
  showStrength
  showCrackTime
  showRequirements
  minStrength={2}
/&gt;

&lt;!-- Select --&gt;
&lt;Select label="Country" bind:value={selectValue}&gt;
  &lt;option value=""&gt;Select a country&lt;/option&gt;
  &lt;option value="us"&gt;United States&lt;/option&gt;
  &lt;option value="uk"&gt;United Kingdom&lt;/option&gt;
&lt;/Select&gt;

&lt;!-- Checkbox --&gt;
&lt;Checkbox label="Accept terms" bind:checked={checkboxChecked} /&gt;
&lt;Checkbox label="Subscribe" secondary checked /&gt;
&lt;Checkbox label="Disabled" disabled /&gt;

&lt;!-- Switch --&gt;
&lt;Switch label="Enable notifications" bind:checked={switchEnabled} /&gt;
&lt;Switch label="Dark mode" secondary /&gt;
&lt;Switch label="Disabled" disabled /&gt;`} />
  </Card>

  <Card title="Form Labels" description="Labels with helper text and error states">
    <div class="mljr-grid mljr-grid-cols-1 mljr-md:grid-cols-2 mljr-gap-6">
      <div>
        <Label label="Standard Label" for="demo-input-1" />
        <Input id="demo-input-1" placeholder="Enter value" />

        <div class="mljr-mt-4">
          <Label label="Required Field" for="demo-input-2" required helperText="This field is required" />
          <Input id="demo-input-2" placeholder="Enter required value" />
        </div>

        <div class="mljr-mt-4">
          <Label label="With Error" for="demo-input-3" error="Invalid email format" />
          <Input id="demo-input-3" bind:value={labelInput} placeholder="email@example.com" />
        </div>
      </div>

      <div>
        <Label label="With Helper Text" for="demo-input-4" helperText="Minimum 8 characters" />
        <Input id="demo-input-4" type="password" placeholder="Enter password" />

        <div class="mljr-mt-4">
          <Label label="Disabled Field" for="demo-input-5" disabled />
          <Input id="demo-input-5" disabled placeholder="Disabled input" />
        </div>

        <div class="mljr-mt-4">
          <Label for="demo-input-6" required>
            Custom Label Content with <strong>formatting</strong>
          </Label>
          <Input id="demo-input-6" placeholder="Custom label example" />
        </div>
      </div>
    </div>

    <CodeExample code={`&lt;!-- Basic Label --&gt;
&lt;Label label="Field Name" for="input-id" /&gt;
&lt;Input id="input-id" /&gt;

&lt;!-- Required Label with Helper Text --&gt;
&lt;Label
  label="Email"
  for="email-input"
  required
  helperText="We'll never share your email"
/&gt;
&lt;Input id="email-input" type="email" /&gt;

&lt;!-- Label with Error --&gt;
&lt;Label
  label="Username"
  for="username-input"
  error="Username is already taken"
/&gt;
&lt;Input id="username-input" /&gt;

&lt;!-- Custom Label Content --&gt;
&lt;Label for="custom-input" required&gt;
  Custom &lt;strong&gt;formatted&lt;/strong&gt; label
&lt;/Label&gt;
&lt;Input id="custom-input" /&gt;`} />
  </Card>

  <Card title="Fieldsets" description="Group related form inputs with a legend">
    <div class="mljr-grid mljr-grid-cols-1 mljr-md:grid-cols-2 mljr-gap-6">
      <div>
        <Fieldset legend="Personal Information">
          <Input label="First Name" placeholder="John" />
          <Input label="Last Name" placeholder="Doe" />
          <Input label="Email" type="email" placeholder="john@example.com" />
        </Fieldset>

        <div class="mljr-mt-6">
          <Fieldset legend="Preferences">
            <Checkbox label="Email notifications" checked />
            <Checkbox label="SMS notifications" />
            <Switch label="Enable two-factor authentication" />
          </Fieldset>
        </div>
      </div>

      <div>
        <Fieldset legend="Disabled Fieldset" disabled>
          <Input label="Username" placeholder="Cannot edit" />
          <Input label="Password" type="password" placeholder="••••••••" />
          <Checkbox label="Remember me" />
        </Fieldset>

        <div class="mljr-mt-6">
          <Fieldset>
            {#snippet legendContent()}
              <span class="mljr-flex mljr-items-center mljr-gap-2">
                <strong>Custom Legend</strong>
                <span class="mljr-badge mljr-badge-sm mljr-badge-primary">Required</span>
              </span>
            {/snippet}
            <Input label="Company Name" placeholder="Acme Corp" required />
            <Select label="Industry">
              <option value="">Select industry</option>
              <option value="tech">Technology</option>
              <option value="finance">Finance</option>
            </Select>
          </Fieldset>
        </div>
      </div>
    </div>

    <CodeExample code={`&lt;!-- Basic Fieldset --&gt;
&lt;Fieldset legend="Personal Information"&gt;
  &lt;Input label="First Name" placeholder="John" /&gt;
  &lt;Input label="Last Name" placeholder="Doe" /&gt;
  &lt;Input label="Email" type="email" /&gt;
&lt;/Fieldset&gt;

&lt;!-- Fieldset with Checkboxes --&gt;
&lt;Fieldset legend="Preferences"&gt;
  &lt;Checkbox label="Email notifications" checked /&gt;
  &lt;Switch label="Enable 2FA" /&gt;
&lt;/Fieldset&gt;

&lt;!-- Disabled Fieldset --&gt;
&lt;Fieldset legend="Locked Section" disabled&gt;
  &lt;Input label="Username" /&gt;
  &lt;Input label="Password" type="password" /&gt;
&lt;/Fieldset&gt;

&lt;!-- Custom Legend Content --&gt;
&lt;Fieldset&gt;
  {#snippet legendContent()}
    &lt;span class="flex gap-2"&gt;
      &lt;strong&gt;Custom&lt;/strong&gt;
      &lt;Badge&gt;Required&lt;/Badge&gt;
    &lt;/span&gt;
  {/snippet}
  &lt;Input label="Company" /&gt;
&lt;/Fieldset&gt;`} />
  </Card>

  <Card title="Custom Icons" description="Checkbox and Radio with custom icon support">
    <div class="mljr-grid mljr-grid-cols-1 mljr-md:grid-cols-2 mljr-gap-6">
      <div>
        <h4 class="mljr-h5 mljr-mb-3">Checkbox with Custom Icons</h4>
        <div class="mljr-flex mljr-flex-col mljr-gap-3">
          <Checkbox
            label="Favorite (Heart icons)"
            bind:checked={customCheckbox1}
            checkedIcon="mdi:heart"
            uncheckedIcon="mdi:heart-outline"
          />
          <Checkbox
            label="Bookmarked (Star icons)"
            bind:checked={customCheckbox2}
            checkedIcon="mdi:star"
            uncheckedIcon="mdi:star-outline"
          />
          <Checkbox
            label="Verified (Shield icons)"
            bind:checked={customCheckbox3}
            checkedIcon="mdi:shield-check"
            uncheckedIcon="mdi:shield-outline"
            secondary
          />
        </div>

        <div class="mljr-mt-6">
          <h4 class="mljr-h5 mljr-mb-3">Indeterminate with Custom Icon</h4>
          <Checkbox
            label="Select partial items"
            indeterminate
            indeterminateIcon="mdi:minus-circle"
            checkedIcon="mdi:check-circle"
            uncheckedIcon="mdi:circle-outline"
          />
        </div>
      </div>

      <div>
        <h4 class="mljr-h5 mljr-mb-3">Radio with Custom Icons</h4>
        <div class="mljr-flex mljr-flex-col mljr-gap-3">
          <Radio
            label="Option 1 (Thumb icons)"
            bind:group={customRadio}
            value="option1"
            checkedIcon="mdi:thumb-up"
            uncheckedIcon="mdi:thumb-up-outline"
          />
          <Radio
            label="Option 2 (Star icons)"
            bind:group={customRadio}
            value="option2"
            checkedIcon="mdi:star"
            uncheckedIcon="mdi:star-outline"
            color="secondary"
          />
          <Radio
            label="Option 3 (Check circle)"
            bind:group={customRadio}
            value="option3"
            checkedIcon="mdi:check-circle"
            uncheckedIcon="mdi:circle-outline"
            color="accent"
          />
        </div>
      </div>
    </div>

    <CodeExample code={`&lt;!-- Checkbox with Custom Icons --&gt;
&lt;Checkbox
  label="Favorite"
  bind:checked={isFavorite}
  checkedIcon="mdi:heart"
  uncheckedIcon="mdi:heart-outline"
/&gt;

&lt;Checkbox
  label="Bookmarked"
  bind:checked={isBookmarked}
  checkedIcon="mdi:star"
  uncheckedIcon="mdi:star-outline"
/&gt;

&lt;!-- Indeterminate with Custom Icon --&gt;
&lt;Checkbox
  label="Select partial"
  indeterminate
  indeterminateIcon="mdi:minus-circle"
  checkedIcon="mdi:check-circle"
  uncheckedIcon="mdi:circle-outline"
/&gt;

&lt;!-- Radio with Custom Icons --&gt;
&lt;Radio
  label="Option 1"
  bind:group={selectedOption}
  value="option1"
  checkedIcon="mdi:thumb-up"
  uncheckedIcon="mdi:thumb-up-outline"
/&gt;

&lt;Radio
  label="Option 2"
  bind:group={selectedOption}
  value="option2"
  checkedIcon="mdi:star"
  uncheckedIcon="mdi:star-outline"
  color="secondary"
/&gt;`} />
  </Card>

  <Card title="Form Validation" description="Complete form with validation, submit, and reset handling">
    <div class="mljr-grid mljr-grid-cols-1 mljr-md:grid-cols-2 mljr-gap-6">
      <div>
        <h4 class="mljr-h5 mljr-mb-3">Basic Form</h4>
        <Form onsubmit={handleFormSubmit} onreset={handleFormReset}>
          <Input
            label="Username"
            name="username"
            placeholder="Enter username"
            required
            bind:value={formData.username}
            helperText="Required field"
          />
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="email@example.com"
            required
            bind:value={formData.email}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="Enter password"
            required
            minlength={8}
            bind:value={formData.password}
            helperText="Minimum 8 characters"
          />
          <div class="mljr-flex mljr-gap-3 mljr-mt-4">
            <button type="submit" class="mljr-btn mljr-btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
            <button type="reset" class="mljr-btn mljr-btn-outline-primary">
              Reset
            </button>
          </div>
        </Form>
        {#if submitResult}
          <p class="mljr-mt-3 mljr-text-sm" class:text-green-600={submitResult.includes('Success')}>
            {submitResult}
          </p>
        {/if}
      </div>

      <div>
        <h4 class="mljr-h5 mljr-mb-3">Validate on Blur</h4>
        <Form validateOnBlur>
          <Input
            label="Full Name"
            name="fullname"
            placeholder="John Doe"
            required
            minlength={3}
            helperText="Validated when you leave the field"
          />
          <Input
            label="Phone"
            name="phone"
            type="tel"
            placeholder="+1 (555) 123-4567"
            pattern="[+]?[0-9\s()-]+"
            helperText="Numbers, spaces, +, -, () allowed"
          />
          <Input
            label="Website"
            name="website"
            type="url"
            placeholder="https://example.com"
            helperText="Must be a valid URL"
          />
          <div class="mljr-mt-4">
            <button type="submit" class="mljr-btn mljr-btn-primary">
              Submit
            </button>
          </div>
        </Form>
      </div>
    </div>

    <div class="mljr-mt-6">
      <h4 class="mljr-h5 mljr-mb-3">Disabled Form</h4>
      <Form disabled>
        <div class="mljr-grid mljr-grid-cols-1 mljr-md:grid-cols-2 mljr-gap-4">
          <Input label="First Name" placeholder="John" />
          <Input label="Last Name" placeholder="Doe" />
        </div>
        <Checkbox label="Accept terms and conditions" />
        <Switch label="Enable notifications" />
        <div class="mljr-mt-4">
          <button type="submit" class="mljr-btn mljr-btn-primary">
            Submit (Disabled)
          </button>
        </div>
      </Form>
    </div>

    <CodeExample code={`&lt;script lang="ts"&gt;
  import { Form, Input, toastStore } from 'mljr-svelte';

  async function handleSubmit(data: FormData) {
    const username = data.get('username');
    const email = data.get('email');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    toastStore.show('Form submitted!', 'success');
  }

  function handleReset() {
    toastStore.add({ type: 'info', message: 'Form reset' });
  }
&lt;/script&gt;

&lt;!-- Basic Form with Validation --&gt;
&lt;Form onsubmit={handleSubmit} onreset={handleReset}&gt;
  &lt;Input
    label="Username"
    name="username"
    required
    minlength={3}
  /&gt;
  &lt;Input
    label="Email"
    name="email"
    type="email"
    required
  /&gt;
  &lt;button type="submit" class="mljr-btn mljr-btn-primary"&gt;
    Submit
  &lt;/button&gt;
  &lt;button type="reset" class="mljr-btn mljr-btn-outline"&gt;
    Reset
  &lt;/button&gt;
&lt;/Form&gt;

&lt;!-- Validate on Blur --&gt;
&lt;Form validateOnBlur&gt;
  &lt;Input label="Name" required minlength={3} /&gt;
  &lt;Input label="Phone" type="tel" pattern="[0-9]+" /&gt;
  &lt;button type="submit"&gt;Submit&lt;/button&gt;
&lt;/Form&gt;

&lt;!-- Disabled Form --&gt;
&lt;Form disabled&gt;
  &lt;Input label="Field 1" /&gt;
  &lt;Input label="Field 2" /&gt;
&lt;/Form&gt;`} />
  </Card>

  <Card title="Validators" description="Display validation states with custom rules">
    <div class="mljr-grid mljr-grid-cols-1 mljr-md:grid-cols-2 mljr-gap-6">
      <div>
        <h4 class="mljr-h5 mljr-mb-3">Validation States</h4>
        <div class="mljr-flex mljr-flex-col mljr-gap-4">
          <div>
            <Validator variant="error" message="This field is required" />
          </div>
          <div>
            <Validator variant="success" message="Email is valid!" />
          </div>
          <div>
            <Validator variant="warning" message="Username might be taken" />
          </div>
          <div>
            <Validator variant="info" message="Must be at least 8 characters" />
          </div>
        </div>

        <div class="mljr-mt-6">
          <h4 class="mljr-h5 mljr-mb-3">Without Icons</h4>
          <Validator variant="error" message="Error without icon" showIcon={false} />
          <Validator variant="success" message="Success without icon" showIcon={false} />
        </div>
      </div>

      <div>
        <h4 class="mljr-h5 mljr-mb-3">Email Validation with Rules</h4>
        <Input
          label="Email"
          type="email"
          bind:value={emailValidatorInput}
          placeholder="Enter email address"
        />
        <Validator bind:value={emailValidatorInput} rules={emailRules} />

        <div class="mljr-mt-6">
          <h4 class="mljr-h5 mljr-mb-3">Password Validation with Multiple Rules</h4>
          <Input
            label="Password"
            type="password"
            bind:value={passwordValidatorInput}
            placeholder="Enter password"
          />
          <Validator bind:value={passwordValidatorInput} rules={passwordRules} />
        </div>
      </div>
    </div>

    <div class="mljr-mt-6">
      <h4 class="mljr-h5 mljr-mb-3">Custom Content</h4>
      <Validator>
        <div style="color: var(--mljr-primary-600); display: flex; align-items: center; gap: 0.5rem;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
          <span>Custom validation message with icon</span>
        </div>
      </Validator>
    </div>

    <CodeExample code={`&lt;script lang="ts"&gt;
  import { Validator, Input } from 'mljr-svelte';

  let email = $state('');
  let password = $state('');

  const emailRules = [
    {
      validate: (val: string) => !!val && val.length > 0,
      message: 'Email is required',
    },
    {
      validate: (val: string) => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(val),
      message: 'Must be a valid email address',
    },
  ];

  const passwordRules = [
    {
      validate: (val: string) => val.length >= 8,
      message: 'Password must be at least 8 characters',
    },
    {
      validate: (val: string) => /[A-Z]/.test(val),
      message: 'Must contain uppercase letter',
    },
    {
      validate: (val: string) => /[0-9]/.test(val),
      message: 'Must contain a number',
    },
  ];
&lt;/script&gt;

&lt;!-- Static Messages --&gt;
&lt;Validator variant="error" message="This field is required" /&gt;
&lt;Validator variant="success" message="Email is valid!" /&gt;
&lt;Validator variant="warning" message="Username might be taken" /&gt;
&lt;Validator variant="info" message="Must be at least 8 characters" /&gt;

&lt;!-- Dynamic Validation with Rules --&gt;
&lt;Input label="Email" bind:value={email} /&gt;
&lt;Validator bind:value={email} rules={emailRules} /&gt;

&lt;Input label="Password" type="password" bind:value={password} /&gt;
&lt;Validator bind:value={password} rules={passwordRules} /&gt;

&lt;!-- Without Icon --&gt;
&lt;Validator variant="error" message="Error" showIcon={false} /&gt;

&lt;!-- Custom Content --&gt;
&lt;Validator&gt;
  &lt;div class="custom-validation"&gt;
    Custom validation message
  &lt;/div&gt;
&lt;/Validator&gt;`} />
  </Card>

  <Card title="Form Wizard" description="Multi-step forms with progress tracking and validation">
    <FormWizard
      steps={wizardSteps}
      bind:currentStep={wizardCurrentStep}
      onComplete={handleWizardComplete}
      persistData
      storageKey="exampleWizard"
    >
      {#if wizardCurrentStep === 0}
        <div class="mljr-flex mljr-flex-col mljr-gap-4">
          <h3 class="mljr-h4">Personal Information</h3>
          <Input
            label="Full Name"
            bind:value={wizardData.personalInfo.name}
            placeholder="John Doe"
            required
          />
          <Input
            label="Email Address"
            type="email"
            bind:value={wizardData.personalInfo.email}
            placeholder="john@example.com"
            required
          />
        </div>
      {:else if wizardCurrentStep === 1}
        <div class="mljr-flex mljr-flex-col mljr-gap-4">
          <h3 class="mljr-h4">Account Setup</h3>
          <Input
            label="Username"
            bind:value={wizardData.accountInfo.username}
            placeholder="johndoe"
            required
          />
          <Password
            label="Password"
            bind:value={wizardData.accountInfo.password}
            showStrength
            placeholder="••••••••"
            required
          />
          <p class="mljr-text-sm mljr-text-secondary">Password must be at least 6 characters</p>
        </div>
      {:else if wizardCurrentStep === 2}
        <div class="mljr-flex mljr-flex-col mljr-gap-4">
          <h3 class="mljr-h4">Your Preferences</h3>
          <Checkbox
            label="Subscribe to newsletter"
            bind:checked={wizardData.preferences.newsletter}
          />
          <Switch
            label="Enable email notifications"
            bind:checked={wizardData.preferences.notifications}
          />
          <div class="mljr-mt-4 mljr-p-4 mljr-rounded-lg mljr-bg-secondary" style="background: var(--mljr-bg-secondary);">
            <p class="mljr-text-sm"><strong>Review your information:</strong></p>
            <p class="mljr-text-sm mljr-mt-2">Name: {wizardData.personalInfo.name || 'Not provided'}</p>
            <p class="mljr-text-sm">Email: {wizardData.personalInfo.email || 'Not provided'}</p>
            <p class="mljr-text-sm">Username: {wizardData.accountInfo.username || 'Not provided'}</p>
          </div>
        </div>
      {/if}
    </FormWizard>

    <CodeExample code={`&lt;script lang="ts"&gt;
  import { FormWizard, type WizardStep, Input, Checkbox } from 'mljr-svelte';

  let currentStep = $state(0);
  let wizardData = $state({
    personalInfo: { name: '', email: '' },
    accountInfo: { username: '', password: '' },
    preferences: { newsletter: false },
  });

  const steps: WizardStep[] = [
    {
      id: 'personal',
      title: 'Personal Info',
      description: 'Basic information',
      icon: 'mdi:account',
      validate: () => {
        return !!wizardData.personalInfo.name && !!wizardData.personalInfo.email;
      },
    },
    {
      id: 'account',
      title: 'Account',
      description: 'Login credentials',
      icon: 'mdi:lock',
    },
    {
      id: 'preferences',
      title: 'Preferences',
      icon: 'mdi:cog',
    },
  ];

  async function handleComplete(data: any) {
    console.log('Wizard completed:', data);
  }
&lt;/script&gt;

&lt;FormWizard
  steps={steps}
  bind:currentStep
  onComplete={handleComplete}
  persistData
  storageKey="myWizard"
&gt;
  {#if currentStep === 0}
    &lt;Input label="Name" bind:value={wizardData.personalInfo.name} /&gt;
    &lt;Input label="Email" bind:value={wizardData.personalInfo.email} /&gt;
  {:else if currentStep === 1}
    &lt;Input label="Username" bind:value={wizardData.accountInfo.username} /&gt;
    &lt;Input label="Password" type="password" bind:value={wizardData.accountInfo.password} /&gt;
  {:else}
    &lt;Checkbox label="Subscribe" bind:checked={wizardData.preferences.newsletter} /&gt;
  {/if}
&lt;/FormWizard&gt;`} />
  </Card>
</section>

