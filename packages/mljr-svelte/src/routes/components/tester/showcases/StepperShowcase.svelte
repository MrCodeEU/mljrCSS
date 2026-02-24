<script lang="ts">
  import { Stepper, Button, Card } from '$lib';

  const checkoutSteps = [
    { id: 'cart', title: 'Cart', description: 'Review your items' },
    { id: 'shipping', title: 'Shipping', description: 'Enter delivery info' },
    { id: 'payment', title: 'Payment', description: 'Add payment method' },
    { id: 'review', title: 'Review', description: 'Confirm your order' },
  ];

  const onboardingSteps = [
    { id: 'profile', title: 'Profile', icon: 'mdi:account' },
    { id: 'preferences', title: 'Preferences', icon: 'mdi:cog' },
    { id: 'team', title: 'Team', icon: 'mdi:account-group' },
    { id: 'done', title: 'Done!', icon: 'mdi:check-circle' },
  ];

  let step1 = $state(1);
  let step2 = $state(0);
  let step3 = $state(2);
</script>

<div class="mljr-space-y-8">
  <!-- Basic Horizontal -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Basic Horizontal</h3>
    <Stepper steps={checkoutSteps} bind:currentStep={step1} />
    <div class="mljr-flex mljr-gap-2 mljr-mt-4">
      <Button variant="outline-primary" size="sm" onclick={() => { if (step1 > 0) step1--; }} disabled={step1 === 0}>Back</Button>
      <Button variant="primary" size="sm" onclick={() => { if (step1 < checkoutSteps.length - 1) step1++; }} disabled={step1 === checkoutSteps.length - 1}>Next</Button>
    </div>
    <p class="mljr-text-xs mljr-text-muted mljr-mt-2">Step {step1 + 1} of {checkoutSteps.length}</p>
  </section>

  <!-- With Icons -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Icons</h3>
    <Stepper steps={onboardingSteps} bind:currentStep={step2} />
    <div class="mljr-flex mljr-gap-2 mljr-mt-4">
      <Button variant="outline-primary" size="sm" onclick={() => { if (step2 > 0) step2--; }} disabled={step2 === 0}>Back</Button>
      <Button variant="primary" size="sm" onclick={() => { if (step2 < onboardingSteps.length - 1) step2++; }} disabled={step2 === onboardingSteps.length - 1}>Next</Button>
    </div>
  </section>

  <!-- Pills Variant -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Pills Variant</h3>
    <Stepper steps={checkoutSteps} bind:currentStep={step3} variant="pills" />
  </section>

  <!-- Vertical -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Vertical Orientation</h3>
    <Stepper steps={checkoutSteps.slice(0, 3)} currentStep={1} orientation="vertical" />
  </section>

  <!-- Clickable Steps -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Clickable Steps</h3>
    <Stepper
      steps={checkoutSteps}
      bind:currentStep={step1}
      allowClick
    />
    <p class="mljr-text-xs mljr-text-muted mljr-mt-2">Click completed steps to navigate back</p>
  </section>

  <!-- Checkout Form Example -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Checkout Flow</h3>
    <Card>
      <Stepper steps={checkoutSteps} bind:currentStep={step1} />
      <div class="mljr-mt-6 mljr-p-4 mljr-bg-secondary mljr-rounded-xl mljr-min-h-24 mljr-flex mljr-items-center mljr-justify-center">
        <p class="mljr-text-secondary mljr-text-center">
          <strong>{checkoutSteps[step1].title}</strong><br>
          <span class="mljr-text-sm">{checkoutSteps[step1].description}</span>
        </p>
      </div>
      <div class="mljr-flex mljr-justify-between mljr-mt-4">
        <Button variant="outline-primary" onclick={() => { if (step1 > 0) step1--; }} disabled={step1 === 0}>
          Back
        </Button>
        <Button variant="primary" onclick={() => { if (step1 < checkoutSteps.length - 1) step1++; }}>
          {step1 === checkoutSteps.length - 1 ? 'Place Order' : 'Continue'}
        </Button>
      </div>
    </Card>
  </section>
</div>
