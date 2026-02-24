<script lang="ts">
  import Avatar from './Avatar.svelte';

  export interface AvatarData {
    src?: string;
    alt?: string;
    initials?: string;
  }

  interface Props {
    /** Array of avatar data */
    avatars: AvatarData[];
    /** Maximum number of avatars to display before showing "+N" */
    max?: number;
    /** Size of avatars */
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    /** Shape of avatars */
    shape?: 'square' | 'circle';
    /** Variant color */
    variant?: 'primary' | 'secondary' | 'accent';
    /** Show ring around avatars */
    ring?: boolean | 'primary' | 'secondary' | 'accent';
    class?: string;
  }

  let {
    avatars,
    max = 5,
    size = 'md',
    shape = 'circle',
    variant = 'primary',
    ring = false,
    class: className = '',
  }: Props = $props();

  let displayAvatars = $derived(avatars.slice(0, max));
  let remainingCount = $derived(Math.max(0, avatars.length - max));

  let groupClasses = $derived(
    [
      'mljr-avatar-group',
      `mljr-avatar-group-${size}`,
      className,
    ]
      .filter(Boolean)
      .join(' ')
  );
</script>

<div class={groupClasses}>
  {#each displayAvatars as avatar, index (index)}
    <Avatar
      src={avatar.src}
      alt={avatar.alt}
      initials={avatar.initials}
      {size}
      {shape}
      {variant}
      {ring}
    />
  {/each}

  {#if remainingCount > 0}
    <div class="mljr-avatar mljr-avatar-{size} mljr-avatar-{variant} {shape === 'circle' ? 'mljr-avatar-circle' : ''} mljr-avatar-count">
      <span class="mljr-avatar-initials">+{remainingCount}</span>
    </div>
  {/if}
</div>
