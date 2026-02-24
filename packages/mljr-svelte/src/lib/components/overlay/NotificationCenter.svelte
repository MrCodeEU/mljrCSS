<script lang="ts">
  export interface Notification {
    id: string;
    title: string;
    message?: string;
    time?: string;
    read?: boolean;
    type?: 'info' | 'success' | 'warning' | 'error';
    icon?: string;
    onClick?: () => void;
  }

  interface Props {
    notifications?: Notification[];
    maxVisible?: number;
    onRead?: (id: string) => void;
    onReadAll?: () => void;
    onClear?: (id: string) => void;
    onClearAll?: () => void;
    class?: string;
  }

  let {
    notifications = [],
    maxVisible = 5,
    onRead,
    onReadAll,
    onClear,
    onClearAll,
    class: className = '',
  }: Props = $props();

  let open = $state(false);
  let containerEl: HTMLElement | undefined = $state();

  let unreadCount = $derived(notifications.filter(n => !n.read).length);
  let visibleNotifications = $derived(notifications.slice(0, maxVisible));

  const typeIcons: Record<string, string> = {
    info: 'ℹ️',
    success: '✅',
    warning: '⚠️',
    error: '❌',
  };

  function toggle() {
    open = !open;
  }

  function close() {
    open = false;
  }

  function handleClickOutside(event: MouseEvent) {
    if (containerEl && !containerEl.contains(event.target as Node)) {
      close();
    }
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      close();
    }
  }

  $effect(() => {
    if (open) {
      setTimeout(() => {
        document.addEventListener('click', handleClickOutside);
        document.addEventListener('keydown', handleKeydown);
      }, 0);
      return () => {
        document.removeEventListener('click', handleClickOutside);
        document.removeEventListener('keydown', handleKeydown);
      };
    }
  });

  function handleNotifClick(notif: Notification) {
    if (!notif.read) {
      onRead?.(notif.id);
    }
    notif.onClick?.();
  }

  function handleClear(event: MouseEvent, id: string) {
    event.stopPropagation();
    onClear?.(id);
  }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class="mljr-notification-center {className}"
  bind:this={containerEl}
>
  <!-- Bell button -->
  <button
    class="mljr-notification-bell"
    onclick={toggle}
    aria-label="Notifications{unreadCount > 0 ? ` (${unreadCount} unread)` : ''}"
    aria-expanded={open}
    aria-haspopup="true"
    type="button"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>

    {#if unreadCount > 0}
      <span class="mljr-notification-badge" aria-hidden="true">
        {unreadCount > 99 ? '99+' : unreadCount}
      </span>
    {/if}
  </button>

  <!-- Panel -->
  {#if open}
    <div class="mljr-notification-panel" role="dialog" aria-label="Notifications">
      <!-- Header -->
      <div class="mljr-notification-panel-header">
        <span class="mljr-notification-panel-title">Notifications</span>
        <div class="mljr-notification-panel-actions">
          {#if unreadCount > 0}
            <button
              class="mljr-notification-action-btn"
              onclick={() => onReadAll?.()}
              type="button"
            >
              Mark all read
            </button>
          {/if}
          {#if notifications.length > 0}
            <button
              class="mljr-notification-action-btn"
              onclick={() => onClearAll?.()}
              type="button"
            >
              Clear all
            </button>
          {/if}
        </div>
      </div>

      <!-- List -->
      <div class="mljr-notification-list" role="list">
        {#if visibleNotifications.length === 0}
          <div class="mljr-notification-empty">
            <div style="font-size: 2rem; margin-bottom: 0.5rem;">🔔</div>
            <div>No notifications</div>
          </div>
        {:else}
          {#each visibleNotifications as notif (notif.id)}
            <div
              class="mljr-notification-item mljr-notification-type-{notif.type ?? 'info'} {notif.read ? '' : 'mljr-notification-item-unread'}"
              role="button"
              tabindex="0"
              onclick={() => handleNotifClick(notif)}
              onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleNotifClick(notif); } }}
            >
              <div class="mljr-notification-type-icon" aria-hidden="true">
                {notif.icon ?? typeIcons[notif.type ?? 'info'] ?? 'ℹ️'}
              </div>

              <div class="mljr-notification-item-body">
                <div class="mljr-notification-item-title">{notif.title}</div>
                {#if notif.message}
                  <div class="mljr-notification-item-message">{notif.message}</div>
                {/if}
                <div class="mljr-notification-item-footer">
                  {#if notif.time}
                    <span class="mljr-notification-item-time">{notif.time}</span>
                  {/if}
                  <div class="mljr-notification-item-actions">
                    {#if !notif.read}
                      <button
                        class="mljr-notification-item-action"
                        onclick={(e) => { e.stopPropagation(); onRead?.(notif.id); }}
                        title="Mark as read"
                        type="button"
                      >
                        ✓
                      </button>
                    {/if}
                    <button
                      class="mljr-notification-item-action"
                      onclick={(e) => handleClear(e, notif.id)}
                      title="Remove"
                      type="button"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            </div>
          {/each}
        {/if}
      </div>
    </div>
  {/if}
</div>
