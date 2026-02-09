<script lang="ts">
  import { Card, Alert, Badge, CodeExample } from '$lib';
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

      <div>
        <h4 class="mljr-h5 mljr-mb-3">Sizes</h4>
        <div class="mljr-flex mljr-flex-wrap mljr-items-center mljr-gap-2">
          <Badge variant="primary" size="sm">Small</Badge>
          <Badge variant="primary">Medium</Badge>
          <Badge variant="primary" size="lg">Large</Badge>
        </div>
      </div>
    </Card>
  </div>

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
<Badge variant="warning" outline>Warning</Badge>`} />
</section>
