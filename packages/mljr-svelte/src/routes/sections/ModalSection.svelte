<script lang="ts">
  import { Card, Button, Modal, Input, AlertDialog, ContextMenu, NotificationCenter, type ContextMenuItem, type Notification, CodeExample } from '$lib';

  let modalOpen = $state(false);
  let modalSize = $state<'sm' | 'md' | 'lg'>('md');
  let focusTrapModal = $state(false);
  let parentModal = $state(false);
  let nestedModal = $state(false);

  // AlertDialog state
  let deleteDialogOpen = $state(false);
  let warningDialogOpen = $state(false);
  let defaultDialogOpen = $state(false);
  let lastAction = $state('');

  // ContextMenu items
  const contextItems: ContextMenuItem[] = [
    { label: 'Open', icon: 'ph:folder-open', onClick: () => lastAction = 'Open' },
    { label: 'Rename', icon: 'ph:pencil', onClick: () => lastAction = 'Rename' },
    { label: 'Copy', icon: 'ph:copy', shortcut: 'Ctrl+C', onClick: () => lastAction = 'Copy' },
    { divider: true },
    { label: 'Delete', icon: 'ph:trash', danger: true, onClick: () => lastAction = 'Delete' },
  ];

  // NotificationCenter state
  let notifications = $state<Notification[]>([
    { id: '1', title: 'New message', message: 'You have a new message from Alex', time: '2 min ago', type: 'info', read: false },
    { id: '2', title: 'Build succeeded', message: 'Your deployment is live', time: '15 min ago', type: 'success', read: false },
    { id: '3', title: 'Disk space low', message: 'Only 2GB remaining', time: '1 hour ago', type: 'warning', read: true },
    { id: '4', title: 'Login from new device', message: 'Chrome on Windows detected', time: '2 hours ago', type: 'error', read: false },
  ]);

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

  <Card
    title="Modal - Focus Trap"
    description="Keyboard focus is trapped within the modal (try pressing Tab/Shift+Tab)"
  >
    <Button variant="primary" onclick={() => (focusTrapModal = true)}>
      Open Modal with Focus Trap
    </Button>

    <Modal bind:open={focusTrapModal} title="Focus Trap Demo" trapFocus>
      <p class="mljr-mb-4">
        Try pressing <kbd>Tab</kbd> or <kbd>Shift+Tab</kbd> - focus will stay within this modal.
        You cannot focus elements outside the modal until you close it.
      </p>

      <div class="mljr-space-y-3">
        <Input label="First Name" placeholder="John" />
        <Input label="Last Name" placeholder="Doe" />
        <Input label="Email" placeholder="john@example.com" type="email" />
      </div>

      {#snippet footer()}
        <Button variant="ghost" onclick={() => (focusTrapModal = false)}>Cancel</Button>
        <Button variant="primary" onclick={() => (focusTrapModal = false)}>Submit</Button>
      {/snippet}
    </Modal>

    <CodeExample code={`let modalOpen = $state(false);

<Button onclick={() => modalOpen = true}>Open Modal</Button>

<!-- Focus trap is enabled by default (trapFocus={true}) -->
<Modal bind:open={modalOpen} title="Focus Trap Demo" trapFocus>
  <Input label="First Name" placeholder="John" />
  <Input label="Last Name" placeholder="Doe" />
  <Input label="Email" placeholder="john@example.com" type="email" />

  {#snippet footer()}
    <Button variant="ghost" onclick={() => modalOpen = false}>Cancel</Button>
    <Button variant="primary" onclick={() => modalOpen = false}>Submit</Button>
  {/snippet}
</Modal>

<!-- Disable focus trap if needed -->
<Modal bind:open={modalOpen} trapFocus={false}>
  <!-- Content -->
</Modal>`} />
  </Card>

  <Card
    title="Modal - Nested Modals"
    description="Open modals within modals with proper z-index stacking"
  >
    <Button variant="primary" onclick={() => (parentModal = true)}>
      Open Parent Modal
    </Button>

    <Modal bind:open={parentModal} title="Parent Modal" size="lg">
      <p class="mljr-mb-4">This is the parent modal. You can open another modal from here.</p>

      <div class="mljr-p-4 mljr-rounded-lg mljr-bg-secondary mljr-mb-4">
        <h4 class="mljr-h5 mljr-mb-2">Parent Modal Content</h4>
        <p class="mljr-text-sm">
          Click the button below to open a nested modal. Only the topmost modal will respond to
          Escape key presses.
        </p>
      </div>

      <Button variant="secondary" onclick={() => (nestedModal = true)}>
        Open Nested Modal
      </Button>

      {#snippet footer()}
        <Button variant="ghost" onclick={() => (parentModal = false)}>Close</Button>
      {/snippet}
    </Modal>

    <Modal bind:open={nestedModal} title="Nested Modal" size="md">
      <p class="mljr-mb-4">
        This is a nested modal opened from the parent modal. It appears on top with proper
        z-index stacking.
      </p>

      <div class="mljr-p-4 mljr-rounded-lg mljr-bg-primary-50 dark:mljr-bg-primary-900/20">
        <p class="mljr-text-sm">
          Press <kbd>Escape</kbd> to close only this modal, not the parent.
        </p>
      </div>

      {#snippet footer()}
        <Button variant="primary" onclick={() => (nestedModal = false)}>Close Nested</Button>
      {/snippet}
    </Modal>

    <CodeExample code={`let parentModal = $state(false);
let nestedModal = $state(false);

<Button onclick={() => parentModal = true}>Open Parent Modal</Button>

<!-- Parent Modal -->
<Modal bind:open={parentModal} title="Parent Modal" size="lg">
  <p>This is the parent modal.</p>

  <Button onclick={() => nestedModal = true}>
    Open Nested Modal
  </Button>

  {#snippet footer()}
    <Button variant="ghost" onclick={() => parentModal = false}>Close</Button>
  {/snippet}
</Modal>

<!-- Nested Modal -->
<Modal bind:open={nestedModal} title="Nested Modal" size="md">
  <p>This is a nested modal with automatic z-index stacking.</p>

  {#snippet footer()}
    <Button variant="primary" onclick={() => nestedModal = false}>
      Close Nested
    </Button>
  {/snippet}
</Modal>`} />
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

  <!-- AlertDialog -->
  <Card title="AlertDialog" description="Confirmation dialogs for destructive or important actions" class="mljr-mt-6">
    <div class="mljr-flex mljr-flex-wrap mljr-gap-3">
      <Button variant="primary" onclick={() => defaultDialogOpen = true}>Info Confirm</Button>
      <Button variant="outline-primary" onclick={() => warningDialogOpen = true}>Warning Confirm</Button>
      <Button variant="danger" onclick={() => deleteDialogOpen = true}>Delete (Danger)</Button>
    </div>
    {#if lastAction}
      <p class="mljr-text-sm mljr-text-muted mljr-mt-3">Last action: <strong>{lastAction}</strong></p>
    {/if}

    <AlertDialog
      bind:open={defaultDialogOpen}
      title="Save Changes?"
      description="You have unsaved changes. Do you want to save them before leaving?"
      confirmLabel="Save"
      cancelLabel="Discard"
      onconfirm={() => { lastAction = 'Saved'; defaultDialogOpen = false; }}
      oncancel={() => { lastAction = 'Discarded'; defaultDialogOpen = false; }}
    />
    <AlertDialog
      bind:open={warningDialogOpen}
      variant="warning"
      title="Archive Project?"
      description="This project will be archived and hidden from your dashboard. You can restore it later."
      confirmLabel="Archive"
      onconfirm={() => { lastAction = 'Archived'; warningDialogOpen = false; }}
      oncancel={() => warningDialogOpen = false}
    />
    <AlertDialog
      bind:open={deleteDialogOpen}
      variant="danger"
      title="Delete Account?"
      description="This action cannot be undone. All your data will be permanently removed."
      confirmLabel="Delete"
      onconfirm={() => { lastAction = 'Deleted'; deleteDialogOpen = false; }}
      oncancel={() => deleteDialogOpen = false}
    />

    <CodeExample code={`<AlertDialog
  bind:open={open}
  variant="danger"
  title="Delete Account?"
  description="This action cannot be undone."
  confirmLabel="Delete"
  onconfirm={() => handleDelete()}
  oncancel={() => open = false}
/>`} language="svelte" />
  </Card>

  <!-- ContextMenu -->
  <Card title="ContextMenu" description="Right-click context menus on any element" class="mljr-mt-6">
    <ContextMenu items={contextItems}>
      <div class="mljr-p-8 mljr-rounded-xl mljr-border-2 mljr-border-dashed mljr-text-center mljr-select-none mljr-cursor-context-menu" style="border-color: var(--mljr-border);">
        <p class="mljr-text-muted">Right-click anywhere in this area</p>
        <p class="mljr-text-sm mljr-text-muted mljr-mt-1">A context menu will appear</p>
      </div>
    </ContextMenu>
    {#if lastAction}
      <p class="mljr-text-sm mljr-text-muted mljr-mt-3">Last action: <strong>{lastAction}</strong></p>
    {/if}
    <CodeExample code={`const items = [
  { label: 'Open', icon: 'ph:folder-open', onClick: () => handleOpen() },
  { label: 'Copy', shortcut: 'Ctrl+C', onClick: () => handleCopy() },
  { divider: true },
  { label: 'Delete', danger: true, onClick: () => handleDelete() },
];

<ContextMenu {items}>
  <div>Right-click me</div>
</ContextMenu>`} language="svelte" />
  </Card>

  <!-- NotificationCenter -->
  <Card title="NotificationCenter" description="Bell icon with grouped notification panel" class="mljr-mt-6">
    <div class="mljr-flex mljr-items-center mljr-gap-4">
      <NotificationCenter
        {notifications}
        onRead={(id) => {
          notifications = notifications.map(n => n.id === id ? { ...n, read: true } : n);
        }}
        onReadAll={() => {
          notifications = notifications.map(n => ({ ...n, read: true }));
        }}
        onClear={(id) => {
          notifications = notifications.filter(n => n.id !== id);
        }}
        onClearAll={() => {
          notifications = [];
        }}
      />
      <span class="mljr-text-sm mljr-text-muted">Click the bell icon →</span>
    </div>
    <CodeExample code={`const notifications = $state([
  { id: '1', title: 'New message', message: 'From Alex', time: '2 min ago', type: 'info', read: false },
  { id: '2', title: 'Build succeeded', time: '15 min ago', type: 'success', read: false },
]);

<NotificationCenter
  {notifications}
  onRead={(id) => markRead(id)}
  onReadAll={() => markAllRead()}
  onClear={(id) => remove(id)}
/>`} language="svelte" />
  </Card>
</section>
