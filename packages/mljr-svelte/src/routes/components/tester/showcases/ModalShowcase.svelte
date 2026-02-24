<script lang="ts">
  import { Modal, Button, Input, Textarea, Select } from '$lib';

  let basicOpen = $state(false);
  let withHeaderOpen = $state(false);
  let withFooterOpen = $state(false);
  let sizesOpen = $state<{ sm: boolean; md: boolean; lg: boolean; xl: boolean; full: boolean }>({
    sm: false,
    md: false,
    lg: false,
    xl: false,
    full: false
  });
  let formOpen = $state(false);
  let nestedOpen = $state(false);
  let nestedLevel2Open = $state(false);
  let confirmOpen = $state(false);
  let noPaddingOpen = $state(false);

  let formData = $state({
    name: '',
    email: '',
    message: ''
  });
</script>

<div class="mljr-space-y-8">
  <!-- Basic -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Basic Modal</h3>
    <Button variant="primary" onclick={() => basicOpen = true}>
      Open Basic Modal
    </Button>

    <Modal bind:open={basicOpen}>
      <h3 class="mljr-h4 mljr-mb-3">Basic Modal</h3>
      <p class="mljr-text-secondary">
        This is a basic modal with default styling. Click outside or press Escape to close.
      </p>
    </Modal>
  </section>

  <!-- With Header and Footer -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Header and Footer</h3>
    <Button variant="primary" onclick={() => withHeaderOpen = true}>
      Open Modal with Header/Footer
    </Button>

    <Modal bind:open={withHeaderOpen}>
      {#snippet header()}
        <h3 class="mljr-h4">Modal Title</h3>
      {/snippet}

      <p class="mljr-text-secondary mljr-mb-4">
        This modal has a dedicated header and footer section. The header typically
        contains the title and close button, while the footer contains action buttons.
      </p>
      <p class="mljr-text-secondary">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>

      {#snippet footer()}
        <Button variant="ghost" onclick={() => withHeaderOpen = false}>
          Cancel
        </Button>
        <Button variant="primary" onclick={() => withHeaderOpen = false}>
          Confirm
        </Button>
      {/snippet}
    </Modal>
  </section>

  <!-- Sizes -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Sizes</h3>
    <div class="mljr-flex mljr-flex-wrap mljr-gap-2">
      <Button size="sm" onclick={() => sizesOpen.sm = true}>Small</Button>
      <Button size="sm" onclick={() => sizesOpen.md = true}>Medium</Button>
      <Button size="sm" onclick={() => sizesOpen.lg = true}>Large</Button>
      <Button size="sm" onclick={() => sizesOpen.xl = true}>Extra Large</Button>
      <Button size="sm" onclick={() => sizesOpen.full = true}>Full Screen</Button>
    </div>

    <Modal bind:open={sizesOpen.sm} size="sm">
      {#snippet header()}
        <h3 class="mljr-h4">Small Modal</h3>
      {/snippet}
      <p class="mljr-text-secondary">This is a small modal, perfect for simple confirmations.</p>
    </Modal>

    <Modal bind:open={sizesOpen.md} size="md">
      {#snippet header()}
        <h3 class="mljr-h4">Medium Modal</h3>
      {/snippet}
      <p class="mljr-text-secondary">This is the default medium-sized modal.</p>
    </Modal>

    <Modal bind:open={sizesOpen.lg} size="lg">
      {#snippet header()}
        <h3 class="mljr-h4">Large Modal</h3>
      {/snippet}
      <p class="mljr-text-secondary">
        This is a large modal with more space for content. Ideal for forms or
        detailed information.
      </p>
    </Modal>

    <Modal bind:open={sizesOpen.xl} size="xl">
      {#snippet header()}
        <h3 class="mljr-h4">Extra Large Modal</h3>
      {/snippet}
      <p class="mljr-text-secondary">
        This is an extra large modal with even more space. Great for complex interfaces
        or lots of content.
      </p>
    </Modal>

    <Modal bind:open={sizesOpen.full} size="full">
      {#snippet header()}
        <h3 class="mljr-h4">Full Screen Modal</h3>
      {/snippet}
      <p class="mljr-text-secondary">
        This modal takes up the entire screen. Useful for immersive experiences or
        when you need maximum space.
      </p>
    </Modal>
  </section>

  <!-- Form Modal -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Form Modal</h3>
    <Button variant="primary" onclick={() => formOpen = true}>
      Open Contact Form
    </Button>

    <Modal bind:open={formOpen} size="lg">
      {#snippet header()}
        <h3 class="mljr-h4">Contact Us</h3>
      {/snippet}

      <div class="mljr-space-y-4">
        <Input
          label="Your Name"
          placeholder="John Doe"
          bind:value={formData.name}
          required
        />
        <Input
          label="Email Address"
          type="email"
          placeholder="john@example.com"
          bind:value={formData.email}
          required
        />
        <Textarea
          label="Message"
          placeholder="How can we help you?"
          rows={5}
          bind:value={formData.message}
          required
        />
      </div>

      {#snippet footer()}
        <Button variant="ghost" onclick={() => formOpen = false}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onclick={() => {
            // Handle form submission
            formOpen = false;
          }}
        >
          Send Message
        </Button>
      {/snippet}
    </Modal>
  </section>

  <!-- Nested Modals -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Nested Modals</h3>
    <Button variant="primary" onclick={() => nestedOpen = true}>
      Open Nested Modal
    </Button>

    <Modal bind:open={nestedOpen}>
      {#snippet header()}
        <h3 class="mljr-h4">First Modal</h3>
      {/snippet}

      <p class="mljr-text-secondary mljr-mb-4">
        This is the first modal. You can open another modal from here.
      </p>
      <Button variant="primary" onclick={() => nestedLevel2Open = true}>
        Open Second Modal
      </Button>

      {#snippet footer()}
        <Button variant="ghost" onclick={() => nestedOpen = false}>
          Close
        </Button>
      {/snippet}
    </Modal>

    <Modal bind:open={nestedLevel2Open} size="sm">
      {#snippet header()}
        <h3 class="mljr-h4">Second Modal</h3>
      {/snippet}

      <p class="mljr-text-secondary">
        This is a nested modal. Notice how it appears on top of the first modal.
      </p>

      {#snippet footer()}
        <Button variant="primary" onclick={() => nestedLevel2Open = false}>
          Close
        </Button>
      {/snippet}
    </Modal>
  </section>

  <!-- Confirmation Dialog -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Confirmation Dialog</h3>
    <Button variant="danger" onclick={() => confirmOpen = true}>
      Delete Account
    </Button>

    <Modal bind:open={confirmOpen} size="sm">
      {#snippet header()}
        <h3 class="mljr-h4 mljr-text-error-600">Confirm Deletion</h3>
      {/snippet}

      <p class="mljr-text-secondary">
        Are you sure you want to delete your account? This action cannot be undone.
      </p>

      {#snippet footer()}
        <Button variant="ghost" onclick={() => confirmOpen = false}>
          Cancel
        </Button>
        <Button
          variant="danger"
          onclick={() => {
            // Handle deletion
            confirmOpen = false;
          }}
        >
          Delete Account
        </Button>
      {/snippet}
    </Modal>
  </section>

  <!-- No Padding -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Custom Content (No Padding)</h3>
    <Button variant="primary" onclick={() => noPaddingOpen = true}>
      Open Image Modal
    </Button>

    <Modal bind:open={noPaddingOpen} size="lg" class="mljr-!p-0">
      <div class="mljr-relative">
        <div class="mljr-aspect-video mljr-bg-gradient-primary mljr-flex mljr-items-center mljr-justify-center">
          <p class="mljr-text-white mljr-text-2xl">Image Placeholder</p>
        </div>
        <div class="mljr-p-6">
          <h3 class="mljr-h4 mljr-mb-2">Image Title</h3>
          <p class="mljr-text-secondary">
            This modal has no default padding, allowing for custom content layouts.
          </p>
        </div>
      </div>
    </Modal>
  </section>

  <!-- Focus Trap -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Focus Trap Example</h3>
    <Button variant="primary" onclick={() => withFooterOpen = true}>
      Open Modal with Focus Trap
    </Button>

    <Modal bind:open={withFooterOpen} trapFocus>
      {#snippet header()}
        <h3 class="mljr-h4">Focus Trap Demo</h3>
      {/snippet}

      <p class="mljr-text-secondary mljr-mb-4">
        Try pressing Tab to navigate through the focusable elements. Focus stays
        within the modal.
      </p>
      <div class="mljr-space-y-3">
        <Input label="First Name" />
        <Input label="Last Name" />
        <Input label="Email" type="email" />
      </div>

      {#snippet footer()}
        <Button variant="ghost" onclick={() => withFooterOpen = false}>
          Cancel
        </Button>
        <Button variant="primary" onclick={() => withFooterOpen = false}>
          Submit
        </Button>
      {/snippet}
    </Modal>
  </section>
</div>
