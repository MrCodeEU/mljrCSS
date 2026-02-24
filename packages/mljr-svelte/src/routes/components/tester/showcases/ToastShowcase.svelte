<script lang="ts">
  import { Button, Card } from '$lib';
  import { toastStore as toast } from '$lib/stores/toast.svelte';

  function showBasicToast() {
    toast.add({ type: 'info', message: 'This is a basic toast notification' });
  }

  function showSuccessToast() {
    toast.success('Operation completed successfully!');
  }

  function showErrorToast() {
    toast.error('Something went wrong. Please try again.');
  }

  function showWarningToast() {
    toast.warning('Warning: This action cannot be undone.');
  }

  function showInfoToast() {
    toast.info('New message received.');
  }

  function showWithDuration() {
    toast.add({
      type: 'info',
      message: 'This toast will disappear in 2 seconds',
      duration: 2000
    });
  }

  function showPersistent() {
    toast.add({
      type: 'warning',
      message: 'This toast will stay until you close it',
      duration: 0
    });
  }

  function showWithTitle() {
    toast.add({
      type: 'success',
      title: 'Success',
      message: 'Your changes have been saved successfully.'
    });
  }

  function showWithActions() {
    toast.add({
      type: 'info',
      title: 'Update Available',
      message: 'A new version is available. Would you like to update now?',
      duration: 0,
      actions: [
        {
          label: 'Update',
          onClick: () => {
            console.log('Update clicked');
            toast.success('Update started!');
          }
        },
        {
          label: 'Later',
          onClick: () => {
            console.log('Later clicked');
          }
        }
      ]
    });
  }

  function showMultiple() {
    toast.info('First notification');
    setTimeout(() => toast.success('Second notification'), 500);
    setTimeout(() => toast.warning('Third notification'), 1000);
  }

  async function showPromiseToast() {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        Math.random() > 0.5 ? resolve('Success!') : reject('Failed!');
      }, 2000);
    });

    await toast.promise(promise, {
      loading: 'Processing your request...',
      success: 'Request completed successfully!',
      error: 'Request failed. Please try again.'
    });
  }

  function showWithProgress() {
    toast.add({
      type: 'info',
      message: 'Uploading file...',
      duration: 5000
    });
  }

  function clearAll() {
    toast.clear();
  }
</script>

<div class="mljr-space-y-8">
  <!-- Basic Types -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Toast Types</h3>
    <div class="mljr-flex mljr-flex-wrap mljr-gap-2">
      <Button size="sm" variant="outline-primary" onclick={showInfoToast}>
        Info
      </Button>
      <Button size="sm" variant="success" onclick={showSuccessToast}>
        Success
      </Button>
      <Button size="sm" variant="outline-primary" onclick={showWarningToast}>
        Warning
      </Button>
      <Button size="sm" variant="danger" onclick={showErrorToast}>
        Error
      </Button>
    </div>
  </section>

  <!-- With Title -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Title</h3>
    <Button variant="primary" onclick={showWithTitle}>
      Show Toast with Title
    </Button>
  </section>

  <!-- Duration Control -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Duration Control</h3>
    <div class="mljr-flex mljr-flex-wrap mljr-gap-2">
      <Button size="sm" variant="outline-primary" onclick={showWithDuration}>
        2 Seconds
      </Button>
      <Button size="sm" variant="outline-primary" onclick={showPersistent}>
        Persistent (Manual Close)
      </Button>
    </div>
  </section>

  <!-- With Actions -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Action Buttons</h3>
    <Button variant="primary" onclick={showWithActions}>
      Show Toast with Actions
    </Button>
  </section>

  <!-- Promise-based -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Promise-based Toast</h3>
    <Card>
      <p class="mljr-text-secondary mljr-mb-3">
        Shows a loading toast that automatically updates to success or error
        based on the promise result.
      </p>
      <Button variant="primary" onclick={showPromiseToast}>
        Trigger Promise Toast
      </Button>
    </Card>
  </section>

  <!-- With Progress Bar -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Progress Bar</h3>
    <Button variant="primary" onclick={showWithProgress}>
      Show Toast with Progress
    </Button>
  </section>

  <!-- Multiple Toasts -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Multiple Toasts</h3>
    <Button variant="primary" onclick={showMultiple}>
      Show Multiple Toasts
    </Button>
  </section>

  <!-- Position Examples -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Positions</h3>
    <div class="mljr-grid mljr-grid-cols-2 mljr-md:grid-cols-3 mljr-gap-2">
      <Button
        size="sm"
        variant="outline-primary"
        onclick={() => { toast.setPosition('top-right'); toast.add({ type: 'info', message: 'Top Right' }); }}
      >
        Top Right
      </Button>
      <Button
        size="sm"
        variant="outline-primary"
        onclick={() => { toast.setPosition('top-center'); toast.add({ type: 'info', message: 'Top Center' }); }}
      >
        Top Center
      </Button>
      <Button
        size="sm"
        variant="outline-primary"
        onclick={() => { toast.setPosition('top-left'); toast.add({ type: 'info', message: 'Top Left' }); }}
      >
        Top Left
      </Button>
      <Button
        size="sm"
        variant="outline-primary"
        onclick={() => { toast.setPosition('bottom-right'); toast.add({ type: 'info', message: 'Bottom Right' }); }}
      >
        Bottom Right
      </Button>
      <Button
        size="sm"
        variant="outline-primary"
        onclick={() => { toast.setPosition('bottom-center'); toast.add({ type: 'info', message: 'Bottom Center' }); }}
      >
        Bottom Center
      </Button>
      <Button
        size="sm"
        variant="outline-primary"
        onclick={() => { toast.setPosition('bottom-left'); toast.add({ type: 'info', message: 'Bottom Left' }); }}
      >
        Bottom Left
      </Button>
    </div>
  </section>

  <!-- Clear All -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Clear All Toasts</h3>
    <Button variant="danger" onclick={clearAll}>
      Clear All Toasts
    </Button>
  </section>

  <!-- Examples -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Common Use Cases</h3>
    <Card>
      <div class="mljr-space-y-3">
        <div>
          <h5 class="mljr-font-medium mljr-mb-2">Form Submission</h5>
          <Button
            size="sm"
            variant="primary"
            onclick={() => {
              toast.add({
                type: 'info',
                message: 'Saving...',
                duration: 1000
              });
              setTimeout(() => {
                toast.success('Form saved successfully!');
              }, 1000);
            }}
          >
            Save Form
          </Button>
        </div>

        <div>
          <h5 class="mljr-font-medium mljr-mb-2">File Upload</h5>
          <Button
            size="sm"
            variant="primary"
            onclick={() => {
              toast.add({
                type: 'info',
                message: 'Uploading file...',
                duration: 3000
              });
              setTimeout(() => {
                toast.success('File uploaded successfully!');
              }, 3000);
            }}
          >
            Upload File
          </Button>
        </div>

        <div>
          <h5 class="mljr-font-medium mljr-mb-2">Delete Confirmation</h5>
          <Button
            size="sm"
            variant="danger"
            onclick={() => {
              toast.add({
                type: 'warning',
                title: 'Are you sure?',
                message: 'This action cannot be undone.',
                duration: 0,
                actions: [
                  {
                    label: 'Delete',
                    onClick: () => {
                      toast.success('Item deleted');
                    }
                  },
                  {
                    label: 'Cancel',
                    onClick: () => {}
                  }
                ]
              });
            }}
          >
            Delete Item
          </Button>
        </div>
      </div>
    </Card>
  </section>
</div>
