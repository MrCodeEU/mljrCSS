<script lang="ts">
  import { Checkbox, Card } from '$lib';

  let basic = $state(false);
  let withLabel = $state(true);
  let withHelper = $state(false);
  let disabled = $state(false);
  let disabledChecked = $state(true);
  let indeterminate = $state(false);

  let option1 = $state(true);
  let option2 = $state(false);
  let option3 = $state(true);
  let option4 = $state(false);

  let terms = $state(false);
  let newsletter = $state(false);
  let updates = $state(true);
</script>

<div class="mljr-space-y-8">
  <!-- Basic -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Basic Checkbox</h3>
    <div class="mljr-space-y-2">
      <Checkbox bind:checked={basic} />
      <p class="mljr-text-xs mljr-text-muted">Checked: {basic}</p>
    </div>
  </section>

  <!-- With Label -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Label</h3>
    <div class="mljr-space-y-3">
      <Checkbox label="Accept terms and conditions" bind:checked={withLabel} />
      <Checkbox label="Subscribe to newsletter" />
      <Checkbox label="Enable notifications" />
    </div>
  </section>

  <!-- With Helper Text -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Helper Text</h3>
    <Checkbox
      label="I agree to the terms"
      bind:checked={withHelper}
    />
    <p class="mljr-text-xs mljr-text-muted">By checking this box, you agree to our terms of service and privacy policy</p>
  </section>

  <!-- States -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">States</h3>
    <div class="mljr-space-y-3">
      <Checkbox label="Normal unchecked" />
      <Checkbox label="Normal checked" checked />
      <Checkbox label="Disabled unchecked" disabled bind:checked={disabled} />
      <Checkbox
        label="Disabled checked"
        disabled
        bind:checked={disabledChecked}
      />
      <Checkbox
        label="Indeterminate"
        indeterminate
        bind:checked={indeterminate}
      />
    </div>
  </section>

  <!-- Sizes -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Sizes</h3>
    <div class="mljr-space-y-3">
      <Checkbox label="Small checkbox" class="mljr-text-sm" />
      <Checkbox label="Medium checkbox (default)" />
      <Checkbox label="Large checkbox" class="mljr-text-lg" />
    </div>
  </section>

  <!-- Checkbox List -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Checkbox List</h3>
    <Card>
      <h4 class="mljr-h5 mljr-mb-3">Select your preferences</h4>
      <div class="mljr-space-y-3">
        <Checkbox
          label="Email notifications"
          bind:checked={option1}
        />
        <Checkbox
          label="Push notifications"
          bind:checked={option2}
        />
        <Checkbox
          label="SMS notifications"
          bind:checked={option3}
        />
        <Checkbox
          label="Weekly digest"
          bind:checked={option4}
        />
      </div>
    </Card>
  </section>

  <!-- Form Example -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Form Example</h3>
    <Card>
      <h4 class="mljr-h5 mljr-mb-4">Account Settings</h4>
      <div class="mljr-space-y-4">
        <Checkbox
          label="I accept the terms and conditions"
          bind:checked={terms}
          required
        />
        <Checkbox
          label="Subscribe to our newsletter"
          bind:checked={newsletter}
        />
        <Checkbox
          label="Receive product updates"
          bind:checked={updates}
        />

        <div class="mljr-pt-3">
          <p class="mljr-text-sm mljr-text-muted">
            Selected options:
            {#if terms}Terms{/if}
            {#if newsletter}{terms ? ', ' : ''}Newsletter{/if}
            {#if updates}{terms || newsletter ? ', ' : ''}Updates{/if}
            {#if !terms && !newsletter && !updates}None{/if}
          </p>
        </div>
      </div>
    </Card>
  </section>

  <!-- Group with Indeterminate -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Select All with Indeterminate</h3>
    <Card>
      {#snippet header()}
        <Checkbox
          label="Select all features"
          checked={option1 && option2 && option3}
          indeterminate={!!(
            (option1 || option2 || option3) &&
            !(option1 && option2 && option3)
          )}
          onchange={() => {
            const newValue = !(option1 && option2 && option3);
            option1 = newValue;
            option2 = newValue;
            option3 = newValue;
          }}
        />
      {/snippet}

      <div class="mljr-ml-6 mljr-space-y-3">
        <Checkbox label="Feature A" bind:checked={option1} />
        <Checkbox label="Feature B" bind:checked={option2} />
        <Checkbox label="Feature C" bind:checked={option3} />
      </div>
    </Card>
  </section>

  <!-- Custom Styling -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Custom Styling</h3>
    <div class="mljr-space-y-3">
      <Checkbox
        label="Custom styled checkbox"
        class="mljr-text-primary-600"
      />
    </div>
  </section>
</div>
