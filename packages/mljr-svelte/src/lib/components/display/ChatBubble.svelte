<script lang="ts">
  import type { Snippet } from 'svelte';

  type ChatBubbleVariant = 'user' | 'bot' | 'system';
  type ChatBubblePosition = 'left' | 'right';

  interface Props {
    /** Message text */
    message?: string;
    /** Variant style */
    variant?: ChatBubbleVariant;
    /** Position (overrides variant positioning) */
    position?: ChatBubblePosition;
    /** Avatar image URL */
    avatar?: string;
    /** Avatar alt text */
    avatarAlt?: string;
    /** Username/sender name */
    username?: string;
    /** Timestamp */
    timestamp?: string;
    /** Show status indicator */
    status?: 'sent' | 'delivered' | 'read' | 'typing';
    /** Additional CSS class */
    class?: string;
    /** Custom message content */
    children?: Snippet;
  }

  let {
    message,
    variant = 'user',
    position,
    avatar,
    avatarAlt = '',
    username,
    timestamp,
    status,
    class: className = '',
    children,
  }: Props = $props();

  const variantClasses: Record<ChatBubbleVariant, string> = {
    user: 'mljr-chat-bubble-user',
    bot: 'mljr-chat-bubble-bot',
    system: 'mljr-chat-bubble-system',
  };

  // Determine position based on variant if not explicitly set
  let effectivePosition = $derived(position || (variant === 'user' ? 'right' : 'left'));

  let containerClasses = $derived(
    [
      'mljr-chat-bubble-container',
      `mljr-chat-bubble-${effectivePosition}`,
      className,
    ]
      .filter(Boolean)
      .join(' ')
  );

  let bubbleClasses = $derived(
    ['mljr-chat-bubble', variantClasses[variant]].filter(Boolean).join(' ')
  );
</script>

<div class={containerClasses}>
  {#if avatar && effectivePosition === 'left'}
    <div class="mljr-chat-avatar">
      <img src={avatar} alt={avatarAlt} />
    </div>
  {/if}

  <div class="mljr-chat-bubble-content">
    {#if username}
      <div class="mljr-chat-username">{username}</div>
    {/if}

    <div class={bubbleClasses}>
      {#if children}
        {@render children()}
      {:else if message}
        <p class="mljr-chat-message">{message}</p>
      {/if}

      {#if status === 'typing'}
        <div class="mljr-chat-typing">
          <span></span>
          <span></span>
          <span></span>
        </div>
      {/if}
    </div>

    {#if timestamp || status}
      <div class="mljr-chat-meta">
        {#if timestamp}
          <span class="mljr-chat-timestamp">{timestamp}</span>
        {/if}
        {#if status && status !== 'typing'}
          <span class="mljr-chat-status mljr-chat-status-{status}">
            {#if status === 'sent'}
              <span class="iconify" data-icon="lucide:check"></span>
            {:else if status === 'delivered'}
              <span class="iconify" data-icon="lucide:check-check"></span>
            {:else if status === 'read'}
              <span class="iconify" data-icon="lucide:check-check"></span>
            {/if}
          </span>
        {/if}
      </div>
    {/if}
  </div>

  {#if avatar && effectivePosition === 'right'}
    <div class="mljr-chat-avatar">
      <img src={avatar} alt={avatarAlt} />
    </div>
  {/if}
</div>

<style>
  .mljr-chat-bubble-container {
    display: flex;
    gap: var(--mljr-space-3);
    margin-bottom: var(--mljr-space-4);
  }

  .mljr-chat-bubble-left {
    justify-content: flex-start;
  }

  .mljr-chat-bubble-right {
    justify-content: flex-end;
    flex-direction: row-reverse;
  }

  .mljr-chat-avatar {
    flex-shrink: 0;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: var(--mljr-radius-full);
    overflow: hidden;
    background: var(--mljr-bg-secondary);
    box-shadow: var(--mljr-clay-shadow-xs);
  }

  .mljr-chat-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .mljr-chat-bubble-content {
    max-width: 70%;
    display: flex;
    flex-direction: column;
    gap: var(--mljr-space-1);
  }

  .mljr-chat-bubble-right .mljr-chat-bubble-content {
    align-items: flex-end;
  }

  .mljr-chat-username {
    font-size: var(--mljr-text-xs);
    font-weight: 600;
    color: var(--mljr-text-secondary);
    padding: 0 var(--mljr-space-3);
  }

  .mljr-chat-bubble {
    position: relative;
    padding: var(--mljr-space-3) var(--mljr-space-4);
    border-radius: var(--mljr-radius-lg);
    box-shadow: var(--mljr-clay-shadow-sm);
    word-wrap: break-word;
  }

  .mljr-chat-bubble-user {
    background: linear-gradient(135deg, var(--mljr-primary-100) 0%, var(--mljr-primary-50) 100%);
    color: var(--mljr-primary-900);
    border-top-right-radius: var(--mljr-radius-sm);
  }

  .mljr-chat-bubble-bot {
    background: var(--mljr-bg);
    border: 1px solid var(--mljr-border);
    color: var(--mljr-text);
    border-top-left-radius: var(--mljr-radius-sm);
  }

  .mljr-chat-bubble-system {
    background: var(--mljr-bg-secondary);
    color: var(--mljr-text-secondary);
    font-size: var(--mljr-text-sm);
    text-align: center;
    border-radius: var(--mljr-radius-lg);
  }

  .mljr-chat-message {
    margin: 0;
    font-size: var(--mljr-text-sm);
    line-height: 1.5;
  }

  .mljr-chat-meta {
    display: flex;
    align-items: center;
    gap: var(--mljr-space-2);
    padding: 0 var(--mljr-space-3);
  }

  .mljr-chat-timestamp {
    font-size: var(--mljr-text-xs);
    color: var(--mljr-text-muted);
  }

  .mljr-chat-status {
    display: inline-flex;
    align-items: center;
    font-size: 0.875rem;
  }

  .mljr-chat-status-sent {
    color: var(--mljr-text-muted);
  }

  .mljr-chat-status-delivered {
    color: var(--mljr-text-secondary);
  }

  .mljr-chat-status-read {
    color: var(--mljr-primary-600);
  }

  /* Typing indicator */
  .mljr-chat-typing {
    display: flex;
    gap: var(--mljr-space-1);
    align-items: center;
    padding: var(--mljr-space-2) 0;
  }

  .mljr-chat-typing span {
    width: 0.5rem;
    height: 0.5rem;
    background: var(--mljr-text-muted);
    border-radius: var(--mljr-radius-full);
    animation: typing 1.4s infinite;
  }

  .mljr-chat-typing span:nth-child(2) {
    animation-delay: 0.2s;
  }

  .mljr-chat-typing span:nth-child(3) {
    animation-delay: 0.4s;
  }

  @keyframes typing {
    0%, 60%, 100% {
      transform: translateY(0);
      opacity: 0.4;
    }
    30% {
      transform: translateY(-0.5rem);
      opacity: 1;
    }
  }
</style>
