<script lang="ts">
  import { Card, Button, Modal, Input, CodeExample } from '$lib';

  let modalOpen = $state(false);
  let modalSize = $state<'sm' | 'md' | 'lg'>('md');

  function openModal(size: 'sm' | 'md' | 'lg') {
    modalSize = size;
    modalOpen = true;
  }
</script>

<section id="modal" class="mljr-mb-8">
  <Card title="Modal" description="Dialog windows and overlays">
    <div class="mljr-flex mljr-flex-wrap mljr-gap-2">
      <Button variant="primary" onclick={() => openModal('sm')}>Small Modal</Button>
      <Button variant="secondary" onclick={() => openModal('md')}>Medium Modal</Button>
      <Button variant="outline-primary" onclick={() => openModal('lg')}>Large Modal</Button>
    </div>

    <Modal
      bind:open={modalOpen}
      title="Modal Title"
      description="This is a modal dialog description."
      size={modalSize}
    >
      <p class="mljr-mb-4">
        This is the modal content. You can put any content here including forms,
        images, or other components.
      </p>
      <Input label="Example Input" placeholder="Type something..." />

      {#snippet footer()}
        <Button variant="ghost" onclick={() => modalOpen = false}>Cancel</Button>
        <Button variant="primary" onclick={() => modalOpen = false}>Confirm</Button>
      {/snippet}
    </Modal>
  </Card>

  <CodeExample code={`let modalOpen = $state(false);

<Button onclick={() => modalOpen = true}>Open Modal</Button>

<Modal
  bind:open={modalOpen}
  title="Modal Title"
  description="Modal description text."
  size="md"
>
  <p>Your modal content goes here.</p>
  
  {#snippet footer()}
    <Button variant="ghost" onclick={() => modalOpen = false}>
      Cancel
    </Button>
    <Button variant="primary" onclick={() => modalOpen = false}>
      Confirm
    </Button>
  {/snippet}
</Modal>`} />
</section>
