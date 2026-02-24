<script lang="ts">
  import { NotificationCenter } from '$lib';
  import type { Notification } from '$lib';

  let notifications = $state<Notification[]>([
    {
      id: '1',
      title: 'New comment on your post',
      message: 'Alex left a comment: "Great work on the redesign!"',
      time: '2m ago',
      read: false,
      type: 'info',
    },
    {
      id: '2',
      title: 'Build succeeded',
      message: 'Deploy to production completed in 42s',
      time: '5m ago',
      read: false,
      type: 'success',
    },
    {
      id: '3',
      title: 'Storage at 85%',
      message: 'Consider cleaning up old files soon',
      time: '1h ago',
      read: false,
      type: 'warning',
    },
    {
      id: '4',
      title: 'Payment failed',
      message: 'Card ending in 4242 was declined',
      time: '3h ago',
      read: true,
      type: 'error',
    },
    {
      id: '5',
      title: 'Weekly report ready',
      message: 'Your analytics summary for this week is available',
      time: '1d ago',
      read: true,
      type: 'info',
    },
  ]);

  let emptyNotifications = $state<Notification[]>([]);

  function handleRead(id: string) {
    notifications = notifications.map(n => n.id === id ? { ...n, read: true } : n);
  }

  function handleReadAll() {
    notifications = notifications.map(n => ({ ...n, read: true }));
  }

  function handleClear(id: string) {
    notifications = notifications.filter(n => n.id !== id);
  }

  function handleClearAll() {
    notifications = [];
  }

  function addNotification() {
    const types: Array<'info' | 'success' | 'warning' | 'error'> = ['info', 'success', 'warning', 'error'];
    const type = types[Math.floor(Math.random() * types.length)];
    notifications = [
      {
        id: String(Date.now()),
        title: `New ${type} notification`,
        message: 'This was just added dynamically.',
        time: 'just now',
        read: false,
        type,
      },
      ...notifications,
    ];
  }
</script>

<div class="mljr-space-y-8">
  <!-- Live demo -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Live Notification Center</h3>
    <div class="mljr-flex mljr-items-start mljr-gap-4 mljr-flex-wrap">
      <NotificationCenter
        {notifications}
        onRead={handleRead}
        onReadAll={handleReadAll}
        onClear={handleClear}
        onClearAll={handleClearAll}
      />
      <button class="mljr-btn mljr-btn-primary" onclick={addNotification}>
        + Add Notification
      </button>
    </div>
    <p class="mljr-text-muted mljr-text-sm mljr-mt-3">
      Click the bell to open the panel. Hover over items to see action buttons.
    </p>
  </section>

  <!-- Empty state -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Empty State</h3>
    <NotificationCenter notifications={emptyNotifications} />
    <p class="mljr-text-muted mljr-text-sm mljr-mt-2">No badge shown when there are no unread notifications.</p>
  </section>

  <!-- Notification types reference -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Notification Types</h3>
    <div class="mljr-card mljr-p-4">
      <div class="mljr-space-y-2 mljr-text-sm">
        <div class="mljr-flex mljr-gap-3 mljr-items-center">
          <span>ℹ️</span> <strong>info</strong> — Informational notifications
        </div>
        <div class="mljr-flex mljr-gap-3 mljr-items-center">
          <span>✅</span> <strong>success</strong> — Successful operations
        </div>
        <div class="mljr-flex mljr-gap-3 mljr-items-center">
          <span>⚠️</span> <strong>warning</strong> — Needs attention
        </div>
        <div class="mljr-flex mljr-gap-3 mljr-items-center">
          <span>❌</span> <strong>error</strong> — Errors and failures
        </div>
      </div>
    </div>
  </section>
</div>
