<script lang="ts">
  import { Card, Radio, CodeExample } from '$lib';

  let selectedColor = $state('orange');
  let selectedSize = $state('medium');
  let selectedPlan = $state('pro');
</script>

<section id="radio" class="mljr-mb-8">
  <div class="mljr-grid mljr-grid-cols-1 mljr-lg:grid-cols-2 mljr-gap-6">
    <Card title="Basic Radio" description="Simple radio buttons">
      <div class="mljr-radio-group">
        <Radio label="Option 1" name="basic" value="1" />
        <Radio label="Option 2" name="basic" value="2" />
        <Radio label="Option 3" name="basic" value="3" />
      </div>
    </Card>

    <Card title="Radio Sizes" description="Different size options">
      <div class="mljr-flex mljr-flex-col mljr-gap-6">
        <div>
          <h4 class="mljr-text-sm mljr-font-medium mljr-mb-2">Small</h4>
          <div class="mljr-radio-group">
            <Radio label="Small 1" name="size-sm" value="1" size="sm" />
            <Radio label="Small 2" name="size-sm" value="2" size="sm" />
          </div>
        </div>
        <div>
          <h4 class="mljr-text-sm mljr-font-medium mljr-mb-2">Medium (default)</h4>
          <div class="mljr-radio-group">
            <Radio label="Medium 1" name="size-md" value="1" />
            <Radio label="Medium 2" name="size-md" value="2" />
          </div>
        </div>
        <div>
          <h4 class="mljr-text-sm mljr-font-medium mljr-mb-2">Large</h4>
          <div class="mljr-radio-group">
            <Radio label="Large 1" name="size-lg" value="1" size="lg" />
            <Radio label="Large 2" name="size-lg" value="2" size="lg" />
          </div>
        </div>
      </div>
    </Card>

    <Card title="Color Variants" description="Different color options">
      <div class="mljr-flex mljr-flex-col mljr-gap-4">
        <div class="mljr-radio-group">
          <Radio label="Primary (Orange)" name="color" value="orange" color="primary" bind:group={selectedColor} />
          <Radio label="Secondary (Purple)" name="color" value="purple" color="secondary" bind:group={selectedColor} />
          <Radio label="Accent (Teal)" name="color" value="teal" color="accent" bind:group={selectedColor} />
        </div>
        <p class="mljr-text-sm mljr-text-secondary">Selected: {selectedColor}</p>
      </div>
    </Card>

    <Card title="Radio Group Example" description="Practical usage example">
      <div class="mljr-flex mljr-flex-col mljr-gap-4">
        <h4 class="mljr-text-sm mljr-font-medium">Choose your plan:</h4>
        <div class="mljr-radio-group mljr-p-4 mljr-bg-secondary mljr-rounded-lg">
          <Radio label="Basic - $9/month" name="plan" value="basic" bind:group={selectedPlan} />
          <Radio label="Pro - $29/month" name="plan" value="pro" bind:group={selectedPlan} />
          <Radio label="Enterprise - $99/month" name="plan" value="enterprise" bind:group={selectedPlan} />
        </div>
        <p class="mljr-text-sm mljr-text-secondary">Selected plan: {selectedPlan}</p>
      </div>
    </Card>

    <Card title="Horizontal Layout" description="Side by side radios">
      <div class="mljr-radio-group mljr-radio-group-horizontal">
        <Radio label="XS" name="size-h" value="xs" bind:group={selectedSize} />
        <Radio label="S" name="size-h" value="small" bind:group={selectedSize} />
        <Radio label="M" name="size-h" value="medium" bind:group={selectedSize} />
        <Radio label="L" name="size-h" value="large" bind:group={selectedSize} />
        <Radio label="XL" name="size-h" value="xlarge" bind:group={selectedSize} />
      </div>
      <p class="mljr-text-sm mljr-text-secondary mljr-mt-2">Selected: {selectedSize}</p>
    </Card>

    <Card title="Disabled State" description="Disabled radio buttons">
      <div class="mljr-radio-group">
        <Radio label="Enabled option" name="disabled-demo" value="1" />
        <Radio label="Disabled option" name="disabled-demo" value="2" disabled />
        <Radio label="Another enabled" name="disabled-demo" value="3" />
      </div>
    </Card>
  </div>

  <CodeExample code={`<!-- Basic Radio Group -->
<div class="mljr-radio-group">
  <Radio label="Option 1" name="group" value="1" />
  <Radio label="Option 2" name="group" value="2" />
  <Radio label="Option 3" name="group" value="3" />
</div>

<!-- With Binding -->
<Radio
  label="Primary"
  name="color"
  value="orange"
  color="primary"
  bind:group={selectedColor}
/>
<Radio
  label="Secondary"
  name="color"
  value="purple"
  color="secondary"
  bind:group={selectedColor}
/>

<!-- Sizes -->
<Radio label="Small" name="size" value="sm" size="sm" />
<Radio label="Medium" name="size" value="md" />
<Radio label="Large" name="size" value="lg" size="lg" />

<!-- Horizontal Layout -->
<div class="mljr-radio-group mljr-radio-group-horizontal">
  <Radio label="XS" name="h" value="xs" />
  <Radio label="S" name="h" value="small" />
  <Radio label="M" name="h" value="medium" />
</div>

<!-- Disabled -->
<Radio label="Disabled" name="d" value="1" disabled />`} />
</section>
