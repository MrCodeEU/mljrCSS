<script lang="ts">
  import { Card, Alert, Badge, Button, RadialProgress, CodeExample } from '$lib';

  let radialValue1 = $state(75);
  let radialValue2 = $state(45);
  let radialValue3 = $state(90);
</script>

<section id="feedback" class="mljr-mb-8">
  <h2 class="mljr-h2 mljr-mb-4">Feedback</h2>
  <p class="mljr-text-secondary mljr-mb-6">Alerts, badges, and status indicators for user feedback.</p>

  <div class="mljr-grid mljr-grid-cols-1 mljr-lg:grid-cols-2 mljr-gap-6">
    <!-- Alerts -->
    <Card title="Alerts" description="Notification and feedback messages">
      <div class="mljr-flex mljr-flex-col mljr-gap-3">
        <Alert variant="info" title="Information">
          This is an informational message for the user.
        </Alert>
        <Alert variant="success" title="Success">
          Operation completed successfully!
        </Alert>
        <Alert variant="warning" title="Warning">
          Please review your input before proceeding.
        </Alert>
        <Alert variant="error" title="Error">
          Something went wrong. Please try again.
        </Alert>
        <Alert variant="primary" title="Primary" dismissible>
          This alert can be dismissed.
        </Alert>
        <Alert variant="secondary" solid>
          A solid secondary alert without title.
        </Alert>
      </div>
    </Card>

    <!-- Alerts with Actions -->
    <Card title="Alerts with Actions" description="Alerts with action buttons">
      <div class="mljr-flex mljr-flex-col mljr-gap-3">
        <Alert variant="info" title="Update Available">
          A new version of the app is available. Update now to get the latest features.
          {#snippet actions()}
            <Button size="sm" variant="ghost">Remind me later</Button>
            <Button size="sm" variant="primary">Update now</Button>
          {/snippet}
        </Alert>

        <Alert variant="warning" title="Unsaved Changes" dismissible>
          You have unsaved changes that will be lost if you leave this page.
          {#snippet actions()}
            <Button size="sm" variant="outline-primary">Save</Button>
            <Button size="sm" variant="ghost">Discard</Button>
          {/snippet}
        </Alert>

        <Alert variant="success" title="Payment Successful">
          Your payment of $99.00 has been processed successfully.
          {#snippet actions()}
            <Button size="sm" variant="outline-primary">View Receipt</Button>
          {/snippet}
        </Alert>

        <Alert variant="error" title="Connection Failed">
          Unable to connect to the server. Please check your internet connection.
          {#snippet actions()}
            <Button size="sm" variant="primary">Retry</Button>
            <Button size="sm" variant="ghost">Troubleshoot</Button>
          {/snippet}
        </Alert>
      </div>

      <CodeExample code={`<Alert variant="info" title="Update Available">
  A new version is available.
  {#snippet actions()}
    <Button size="sm" variant="ghost">
      Remind me later
    </Button>
    <Button size="sm" variant="primary">
      Update now
    </Button>
  {/snippet}
</Alert>

<Alert variant="warning" title="Unsaved Changes" dismissible>
  You have unsaved changes.
  {#snippet actions()}
    <Button size="sm" variant="outline-primary">Save</Button>
    <Button size="sm" variant="ghost">Discard</Button>
  {/snippet}
</Alert>`} />
    </Card>

    <!-- Badges -->
    <Card title="Badges" description="Labels and status indicators">
      <div class="mljr-mb-4">
        <h4 class="mljr-h5 mljr-mb-3">Default</h4>
        <div class="mljr-flex mljr-flex-wrap mljr-gap-2">
          <Badge>Default</Badge>
          <Badge variant="primary">Primary</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="error">Error</Badge>
          <Badge variant="info">Info</Badge>
        </div>
      </div>

      <div class="mljr-mb-4">
        <h4 class="mljr-h5 mljr-mb-3">Solid</h4>
        <div class="mljr-flex mljr-flex-wrap mljr-gap-2">
          <Badge variant="primary" solid>Primary</Badge>
          <Badge variant="secondary" solid>Secondary</Badge>
          <Badge variant="success" solid>Success</Badge>
          <Badge variant="warning" solid>Warning</Badge>
          <Badge variant="error" solid>Error</Badge>
        </div>
      </div>

      <div class="mljr-mb-4">
        <h4 class="mljr-h5 mljr-mb-3">Outline</h4>
        <div class="mljr-flex mljr-flex-wrap mljr-gap-2">
          <Badge variant="primary" outline>Primary</Badge>
          <Badge variant="secondary" outline>Secondary</Badge>
        </div>
      </div>

      <div class="mljr-mb-4">
        <h4 class="mljr-h5 mljr-mb-3">With Dot</h4>
        <div class="mljr-flex mljr-flex-wrap mljr-gap-2">
          <Badge variant="success" dot>Online</Badge>
          <Badge variant="warning" dot>Away</Badge>
          <Badge variant="error" dot>Offline</Badge>
        </div>
      </div>

      <div class="mljr-mb-4">
        <h4 class="mljr-h5 mljr-mb-3">Sizes</h4>
        <div class="mljr-flex mljr-flex-wrap mljr-items-center mljr-gap-2">
          <Badge variant="primary" size="sm">Small</Badge>
          <Badge variant="primary">Medium</Badge>
          <Badge variant="primary" size="lg">Large</Badge>
        </div>
      </div>

      <div>
        <h4 class="mljr-h5 mljr-mb-3">With Icons</h4>
        <div class="mljr-flex mljr-flex-wrap mljr-gap-2">
          <Badge variant="primary" icon="mdi:star">Featured</Badge>
          <Badge variant="success" icon="mdi:check-circle">Verified</Badge>
          <Badge variant="error" icon="mdi:alert-circle">Critical</Badge>
          <Badge variant="info" icon="mdi:information">Info</Badge>
          <Badge variant="warning" icon="mdi:clock" iconPosition="right">Pending</Badge>
        </div>
      </div>
    </Card>
  </div>

  <Card title="Radial Progress" description="Circular progress indicators with customizable colors and sizes">
    <div class="mljr-grid mljr-grid-cols-1 mljr-md:grid-cols-2 mljr-lg:grid-cols-3 mljr-gap-8">
      <div class="mljr-flex mljr-flex-col mljr-items-center mljr-gap-3">
        <RadialProgress value={radialValue1} variant="primary" />
        <div class="mljr-flex mljr-gap-2">
          <button class="mljr-btn mljr-btn-sm mljr-btn-outline-primary" onclick={() => radialValue1 = Math.max(0, radialValue1 - 10)}>-</button>
          <button class="mljr-btn mljr-btn-sm mljr-btn-outline-primary" onclick={() => radialValue1 = Math.min(100, radialValue1 + 10)}>+</button>
        </div>
      </div>

      <div class="mljr-flex mljr-flex-col mljr-items-center mljr-gap-3">
        <RadialProgress value={radialValue2} variant="success" />
        <div class="mljr-flex mljr-gap-2">
          <button class="mljr-btn mljr-btn-sm mljr-btn-outline-primary" onclick={() => radialValue2 = Math.max(0, radialValue2 - 10)}>-</button>
          <button class="mljr-btn mljr-btn-sm mljr-btn-outline-primary" onclick={() => radialValue2 = Math.min(100, radialValue2 + 10)}>+</button>
        </div>
      </div>

      <div class="mljr-flex mljr-flex-col mljr-items-center mljr-gap-3">
        <RadialProgress value={radialValue3} variant="warning" />
        <div class="mljr-flex mljr-gap-2">
          <button class="mljr-btn mljr-btn-sm mljr-btn-outline-primary" onclick={() => radialValue3 = Math.max(0, radialValue3 - 10)}>-</button>
          <button class="mljr-btn mljr-btn-sm mljr-btn-outline-primary" onclick={() => radialValue3 = Math.min(100, radialValue3 + 10)}>+</button>
        </div>
      </div>
    </div>

    <div class="mljr-mt-8">
      <h4 class="mljr-h5 mljr-mb-4">Size Variants</h4>
      <div class="mljr-flex mljr-items-center mljr-gap-8 mljr-flex-wrap">
        <RadialProgress value={65} size="sm" variant="primary" />
        <RadialProgress value={75} size="md" variant="secondary" />
        <RadialProgress value={85} size="lg" variant="accent" />
        <RadialProgress value={95} size="xl" variant="error" />
      </div>
    </div>

    <div class="mljr-mt-8">
      <h4 class="mljr-h5 mljr-mb-4">Custom Labels</h4>
      <div class="mljr-flex mljr-items-center mljr-gap-8 mljr-flex-wrap">
        <RadialProgress value={80} variant="primary" label="80/100" />
        <RadialProgress value={15} variant="warning" label="Low" />
        <RadialProgress value={100} variant="success" label="Done" />
      </div>
    </div>

    <CodeExample code={`<script>
  import { RadialProgress } from 'mljr-svelte';

  let value = $state(75);
<\/script>

<!-- Basic radial progress -->
<RadialProgress value={75} variant="primary" />

<!-- Color variants -->
<RadialProgress value={65} variant="secondary" />
<RadialProgress value={85} variant="success" />
<RadialProgress value={45} variant="warning" />
<RadialProgress value={25} variant="error" />

<!-- Size variants -->
<RadialProgress value={75} size="sm" />
<RadialProgress value={75} size="md" />
<RadialProgress value={75} size="lg" />
<RadialProgress value={75} size="xl" />

<!-- Custom labels -->
<RadialProgress value={80} label="80/100" />
<RadialProgress value={100} label="Complete" />

<!-- Without label -->
<RadialProgress value={75} showLabel={false} />`} />
  </Card>

  <CodeExample code={`<!-- Alert with variants -->
<Alert variant="info" title="Information">
  This is an informational message.
</Alert>

<Alert variant="success" title="Success" dismissible>
  Operation completed successfully!
</Alert>

<!-- Badge styles -->
<Badge variant="primary" solid>Primary</Badge>
<Badge variant="success" dot>Online</Badge>
<Badge variant="warning" outline>Warning</Badge>

<!-- Badge with icons -->
<Badge variant="primary" icon="mdi:star">Featured</Badge>
<Badge variant="success" icon="mdi:check-circle">Verified</Badge>
<Badge variant="warning" icon="mdi:clock" iconPosition="right">Pending</Badge>`} />
</section>
