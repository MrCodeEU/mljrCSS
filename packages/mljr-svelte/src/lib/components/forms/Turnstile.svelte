<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  type Theme = 'light' | 'dark' | 'auto';
  type Size = 'normal' | 'compact' | 'flexible';
  type Status = 'idle' | 'verified' | 'expired' | 'error';

  interface Props {
    /** Cloudflare Turnstile site key. Leave empty to show a demo widget. */
    siteKey?: string;
    /** Widget theme */
    theme?: Theme;
    /** Widget size */
    size?: Size;
    /** Called with the token when the challenge is solved */
    onVerify?: (token: string) => void;
    /** Called when the token expires */
    onExpire?: () => void;
    /** Called when an error occurs */
    onError?: (code?: string) => void;
    /** Show status message below the widget */
    showStatus?: boolean;
    /** Additional CSS class */
    class?: string;
  }

  let {
    siteKey = '',
    theme = 'auto',
    size = 'normal',
    onVerify,
    onExpire,
    onError,
    showStatus = true,
    class: className = '',
  }: Props = $props();

  let widgetEl: HTMLDivElement | undefined = $state();
  let widgetId: string | number | null = null;
  let status = $state<Status>('idle');
  let demoChecked = $state(false);

  // Type-safe access to Cloudflare Turnstile globals
  type TurnstileWindow = Window & {
    turnstile?: {
      render: (el: HTMLElement, opts: object) => string | number;
      reset: (id: string | number) => void;
      remove: (id: string | number) => void;
    };
    onTurnstileLoad?: () => void;
  };

  const win = () => window as TurnstileWindow;

  function initWidget() {
    if (!siteKey || !widgetEl || !win().turnstile) return;
    if (widgetId !== null) return; // already rendered

    widgetId = win().turnstile!.render(widgetEl, {
      sitekey: siteKey,
      theme,
      size,
      callback: (token: string) => {
        status = 'verified';
        onVerify?.(token);
      },
      'expired-callback': () => {
        status = 'expired';
        onExpire?.();
      },
      'error-callback': (code?: string) => {
        status = 'error';
        onError?.(code);
      },
    });
  }

  function loadScript(): Promise<void> {
    return new Promise((resolve) => {
      if (win().turnstile) { resolve(); return; }
      if (document.getElementById('cf-turnstile-script')) {
        // Script already appended, wait for it
        win().onTurnstileLoad = resolve;
        return;
      }
      win().onTurnstileLoad = resolve;
      const script = document.createElement('script');
      script.id = 'cf-turnstile-script';
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad&render=explicit';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    });
  }

  onMount(async () => {
    if (!siteKey) return; // demo mode
    await loadScript();
    initWidget();
  });

  onDestroy(() => {
    if (widgetId !== null && win().turnstile) {
      win().turnstile!.remove(widgetId as string | number);
      widgetId = null;
    }
  });

  const statusMessages: Record<Status, string> = {
    idle: '',
    verified: 'Human verified',
    expired: 'Challenge expired — please verify again',
    error: 'Verification failed — please try again',
  };
</script>

<div class="mljr-turnstile {className}">
  {#if siteKey}
    <!-- Real Turnstile widget -->
    <div bind:this={widgetEl} class="mljr-turnstile-widget" aria-label="Cloudflare Turnstile security challenge"></div>
  {:else}
    <!-- Demo widget (no real API) -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
      class="mljr-turnstile-demo"
      onclick={() => {
        demoChecked = !demoChecked;
        if (demoChecked) {
          status = 'verified';
          onVerify?.('demo_token');
        } else {
          status = 'idle';
        }
      }}
    >
      <div class="mljr-turnstile-demo-checkbox {demoChecked ? 'mljr-turnstile-demo-checkbox-checked' : ''}">
        {#if demoChecked}
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>
        {/if}
      </div>
      <span class="mljr-turnstile-demo-label">I am human</span>
      <div class="mljr-turnstile-demo-brand">
        <span class="mljr-turnstile-demo-brand-name">Turnstile</span>
        <span class="mljr-turnstile-demo-brand-sub">by Cloudflare</span>
      </div>
    </div>
  {/if}

  {#if showStatus && status !== 'idle'}
    <div class="mljr-turnstile-status mljr-turnstile-status-{status}">
      {#if status === 'verified'}
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
      {:else if status === 'error'}
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
      {:else}
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
        </svg>
      {/if}
      {statusMessages[status]}
    </div>
  {/if}
</div>
