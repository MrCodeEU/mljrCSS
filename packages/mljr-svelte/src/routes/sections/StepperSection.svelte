<script lang="ts">
  import { Card, Stepper, Button, CodeExample } from '$lib';

  let currentStep = $state(0);
  let currentStep2 = $state(1);
  let currentStep3 = $state(2);

  const steps = [
    { id: '1', title: 'Account', description: 'Login details' },
    { id: '2', title: 'Personal', description: 'Your info' },
    { id: '3', title: 'Payment', description: 'Billing' },
    { id: '4', title: 'Confirm', description: 'Review' },
  ];

  const simpleSteps = [
    { id: '1', title: 'Cart' },
    { id: '2', title: 'Shipping' },
    { id: '3', title: 'Payment' },
    { id: '4', title: 'Complete' },
  ];
</script>

<section id="stepper" class="mljr-mb-8">
  <div class="mljr-grid mljr-grid-cols-1 mljr-gap-6">
    <Card title="Horizontal Stepper" description="Default horizontal layout">
      <Stepper
        {steps}
        bind:currentStep
        allowClick
      />
      <div class="mljr-stepper-actions mljr-mt-6">
        <Button
          variant="secondary"
          disabled={currentStep === 0}
          onclick={() => currentStep--}
        >
          Previous
        </Button>
        <Button
          variant="primary"
          disabled={currentStep === steps.length - 1}
          onclick={() => currentStep++}
        >
          Next
        </Button>
      </div>
    </Card>

    <Card title="Vertical Stepper" description="Stacked vertical layout">
      <Stepper
        steps={simpleSteps}
        bind:currentStep={currentStep2}
        orientation="vertical"
        style="max-width: 300px;"
      />
    </Card>

    <Card title="Stepper Sizes" description="Different size options">
      <div class="mljr-flex mljr-flex-col mljr-gap-8">
        <div>
          <h4 class="mljr-text-sm mljr-font-medium mljr-mb-3">Small</h4>
          <Stepper steps={simpleSteps} currentStep={2} size="sm" />
        </div>
        <div>
          <h4 class="mljr-text-sm mljr-font-medium mljr-mb-3">Medium (default)</h4>
          <Stepper steps={simpleSteps} currentStep={2} />
        </div>
        <div>
          <h4 class="mljr-text-sm mljr-font-medium mljr-mb-3">Large</h4>
          <Stepper steps={simpleSteps} currentStep={2} size="lg" />
        </div>
      </div>
    </Card>

    <Card title="Non-clickable Steps" description="Steps cannot be clicked directly">
      <Stepper
        {steps}
        currentStep={currentStep3}
      />
      <p class="mljr-text-sm mljr-text-secondary mljr-mt-4">
        Current step: {steps[currentStep3].title}
      </p>
    </Card>
  </div>

  <CodeExample code={`// Component usage
<Stepper {steps} bind:currentStep allowClick />

<Stepper
  steps={simpleSteps}
  bind:currentStep
  orientation="vertical"
  style="max-width: 300px;"
/>

<Stepper {steps} currentStep={2} size="sm" />
<Stepper {steps} currentStep={2} />
<Stepper {steps} currentStep={2} size="lg" />

<Stepper {steps} currentStep={2} />`} />
</section>
