<script lang="ts">
  import { Form, Fieldset, Label, Validator } from '$lib';

  let emailValue = $state('');
  let formSubmitted = $state(false);
  let formData = $state<Record<string, string>>({});

  function handleSubmit(data: FormData) {
    formSubmitted = true;
    const result: Record<string, string> = {};
    data.forEach((value, key) => { result[key] = value as string; });
    formData = result;
  }

  const emailRules = [
    {
      validate: (val: string) => !!val && val.length > 0,
      message: 'Email is required',
    },
    {
      validate: (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
      message: 'Please enter a valid email address',
    },
  ];
</script>

<div class="mljr-space-y-8">
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Label Component</h3>
    <div class="mljr-space-y-4">
      <Label label="Simple Label" for="demo-input" />
      <Label label="Required Field" for="demo-required" required={true} />
      <Label label="With Helper Text" for="demo-helper" helperText="This is a hint for the user." />
      <Label label="Error State" for="demo-error" error="This field has an error." />
      <Label label="Disabled" for="demo-disabled" disabled={true} helperText="This label is disabled." />
    </div>
    <div class="mljr-mt-4">
      <Label label="Email Address" for="demo-email-label" required={true} helperText="We'll never share your email.">
      </Label>
      <input id="demo-email-label" type="email" class="mljr-input mljr-w-full" placeholder="you@example.com" />
    </div>
  </section>

  <section>
    <h3 class="mljr-h4 mljr-mb-4">Fieldset Component</h3>
    <div class="mljr-space-y-4">
      <Fieldset legend="Personal Information">
        {#snippet children()}
          <div>
            <Label label="Full Name" for="fs-name" required={true} />
            <input id="fs-name" type="text" class="mljr-input mljr-w-full" placeholder="John Doe" />
          </div>
          <div>
            <Label label="Email" for="fs-email" required={true} />
            <input id="fs-email" type="email" class="mljr-input mljr-w-full" placeholder="john@example.com" />
          </div>
        {/snippet}
      </Fieldset>

      <Fieldset legend="Address" disabled={true}>
        {#snippet children()}
          <div>
            <Label label="Street" for="fs-street" />
            <input id="fs-street" type="text" class="mljr-input mljr-w-full" placeholder="123 Main St" disabled />
          </div>
        {/snippet}
      </Fieldset>
    </div>
  </section>

  <section>
    <h3 class="mljr-h4 mljr-mb-4">Validator Component</h3>
    <div class="mljr-space-y-4">
      <div>
        <label class="mljr-label" for="val-email">Email with live validation</label>
        <input
          id="val-email"
          type="text"
          class="mljr-input mljr-w-full mljr-mb-1"
          placeholder="Type an email..."
          bind:value={emailValue}
        />
        <Validator
          value={emailValue}
          rules={emailRules}
          variant="error"
        />
      </div>

      <Validator variant="success" message="Your email has been verified!" />
      <Validator variant="warning" message="Password strength is weak." />
      <Validator variant="error" message="Username is already taken." />
      <Validator variant="info" message="Passwords must be at least 8 characters." />
    </div>
  </section>

  <section>
    <h3 class="mljr-h4 mljr-mb-4">Form Component (with HTML5 validation)</h3>
    <Form onsubmit={handleSubmit}>
      {#snippet children()}
        <Fieldset legend="Contact Us">
          {#snippet children()}
            <div>
              <Label label="Name" for="form-name" required={true} />
              <input id="form-name" name="name" type="text" class="mljr-input mljr-w-full" required placeholder="Your Name" />
            </div>
            <div>
              <Label label="Email" for="form-email" required={true} />
              <input id="form-email" name="email" type="email" class="mljr-input mljr-w-full" required placeholder="you@example.com" />
            </div>
            <div>
              <Label label="Message" for="form-msg" />
              <textarea id="form-msg" name="message" class="mljr-textarea mljr-w-full" rows={3} placeholder="Your message..."></textarea>
            </div>
            <button type="submit" class="mljr-btn mljr-btn-primary">Submit</button>
          {/snippet}
        </Fieldset>
      {/snippet}
    </Form>

    {#if formSubmitted}
      <div class="mljr-mt-4 mljr-p-4" style="background:var(--mljr-bg-secondary);border-radius:var(--mljr-radius-md);">
        <p class="mljr-text-sm mljr-font-medium mljr-mb-2">Form submitted successfully!</p>
        {#each Object.entries(formData) as [key, value]}
          <p class="mljr-text-sm mljr-text-muted"><strong>{key}:</strong> {value}</p>
        {/each}
      </div>
    {/if}
  </section>

  <section>
    <h3 class="mljr-h4 mljr-mb-4">Disabled Form</h3>
    <Form disabled={true}>
      {#snippet children()}
        <Fieldset legend="Locked Form">
          {#snippet children()}
            <div>
              <Label label="Name" for="dis-name" disabled={true} />
              <input id="dis-name" type="text" class="mljr-input mljr-w-full" placeholder="Disabled" />
            </div>
            <button type="submit" class="mljr-btn mljr-btn-primary" disabled>Submit</button>
          {/snippet}
        </Fieldset>
      {/snippet}
    </Form>
  </section>
</div>
