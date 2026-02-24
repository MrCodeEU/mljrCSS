<script lang="ts">
  import { Alert, Button } from '$lib';
</script>

<div class="mljr-space-y-8">
  <!-- Variants -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Variants</h3>
    <div class="mljr-space-y-3">
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

      <Alert variant="default" title="Default">
        This is a default alert message.
      </Alert>

      <Alert variant="primary" title="Primary">
        This is a primary styled alert.
      </Alert>

      <Alert variant="secondary" title="Secondary">
        This is a secondary styled alert.
      </Alert>
    </div>
  </section>

  <!-- Solid Style -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Solid Style</h3>
    <div class="mljr-space-y-3">
      <Alert variant="info" title="Solid Info" solid>
        Solid background style with higher contrast.
      </Alert>

      <Alert variant="success" title="Solid Success" solid>
        Operation was successful with solid styling.
      </Alert>

      <Alert variant="warning" title="Solid Warning" solid>
        This is a solid warning alert.
      </Alert>

      <Alert variant="error" title="Solid Error" solid>
        Solid error alert with high visibility.
      </Alert>
    </div>
  </section>

  <!-- Dismissible -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Dismissible</h3>
    <div class="mljr-space-y-3">
      <Alert variant="info" title="Dismissible Info" dismissible>
        Click the × button to dismiss this alert.
      </Alert>

      <Alert variant="success" dismissible>
        Alert without title but with dismiss button.
      </Alert>

      <Alert variant="primary" title="Can be closed" dismissible>
        This alert can be dismissed by the user.
      </Alert>
    </div>
  </section>

  <!-- Without Title -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Without Title</h3>
    <div class="mljr-space-y-3">
      <Alert variant="info">
        Simple info message without a title.
      </Alert>

      <Alert variant="success">
        Success message with no title, just content.
      </Alert>

      <Alert variant="warning">
        Warning without title for shorter messages.
      </Alert>
    </div>
  </section>

  <!-- With Actions -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Action Buttons</h3>
    <div class="mljr-space-y-3">
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
  </section>

  <!-- Long Content -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Long Content</h3>
    <Alert variant="info" title="Detailed Information" dismissible>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    </Alert>
  </section>
</div>
