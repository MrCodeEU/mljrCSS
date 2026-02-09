<script lang="ts">
  interface Props {
    src?: string;
    alt?: string;
    initials?: string;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    variant?: 'primary' | 'secondary' | 'accent';
    shape?: 'square' | 'circle';
    status?: 'online' | 'offline' | 'busy' | 'away';
    ring?: boolean | 'primary' | 'secondary' | 'accent';
    class?: string;
  }

  let {
    src,
    alt = '',
    initials,
    size = 'md',
    variant = 'primary',
    shape = 'square',
    status,
    ring = false,
    class: className = '',
  }: Props = $props();

  let imageError = $state(false);

  const avatarClasses = $derived(
    [
      'mljr-avatar',
      `mljr-avatar-${size}`,
      variant !== 'primary' && `mljr-avatar-${variant}`,
      shape === 'circle' && 'mljr-avatar-circle',
      ring === true && 'mljr-avatar-ring',
      ring === 'secondary' && 'mljr-avatar-ring-secondary',
      ring === 'accent' && 'mljr-avatar-ring-accent',
      className,
    ]
      .filter(Boolean)
      .join(' ')
  );

  const statusClasses = $derived(
    status ? `mljr-avatar-status mljr-avatar-status-${status}` : ''
  );

  const displayInitials = $derived(
    initials || (alt ? alt.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : '')
  );

  function handleImageError() {
    imageError = true;
  }
</script>

<div class={avatarClasses}>
  {#if src && !imageError}
    <img {src} {alt} onerror={handleImageError} />
  {:else if displayInitials}
    <span class="mljr-avatar-initials">{displayInitials}</span>
  {:else}
    <span class="mljr-avatar-placeholder">
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
      </svg>
    </span>
  {/if}

  {#if status}
    <span class={statusClasses} aria-label={`Status: ${status}`}></span>
  {/if}
</div>
