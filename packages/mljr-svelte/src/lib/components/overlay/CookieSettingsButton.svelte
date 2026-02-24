<script lang="ts">
  import { cookieStore } from '../../stores/cookies.svelte.js';
  import * as m from '../../paraglide/messages.js';

  interface Props {
    variant?: 'icon' | 'text' | 'full';
    class?: string;
  }

  let {
    variant = 'text',
    class: className = '',
  }: Props = $props();
</script>

{#if variant === 'icon'}
  <button
    type="button"
    class="mljr-cookie-fab {className}"
    onclick={() => cookieStore.openBanner()}
    aria-label={m.cookie_manage_settings()}
    title={m.cookie_manage_settings()}
  >
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
    </svg>
  </button>
{:else if variant === 'full'}
  <button
    type="button"
    class="mljr-btn mljr-btn-outline-primary {className}"
    onclick={() => cookieStore.openBanner()}
  >
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
    </svg>
    {m.cookie_manage_settings()}
  </button>
{:else}
  <button
    type="button"
    class="mljr-btn mljr-btn-link {className}"
    onclick={() => cookieStore.openBanner()}
  >
    {m.cookie_manage_settings()}
  </button>
{/if}
