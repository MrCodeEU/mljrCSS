<script lang="ts">
  import CookieBanner from '$lib/components/overlay/CookieBanner.svelte';
  import CookieSettingsButton from '$lib/components/overlay/CookieSettingsButton.svelte';
  import { cookieStore } from '$lib/stores/cookies.svelte.js';
  import type { CookieCategory } from '$lib/stores/cookies.svelte.js';
  import CodeExample from '$lib/components/CodeExample.svelte';

  const demoCategories: CookieCategory[] = [
    {
      id: 'essential',
      name: { en: 'Essential', de: 'Erforderlich' },
      description: {
        en: 'These cookies are required for the website to function and cannot be disabled.',
        de: 'Diese Cookies sind für den Betrieb der Website erforderlich und können nicht deaktiviert werden.',
      },
      required: true,
    },
    {
      id: 'analytics',
      name: { en: 'Analytics', de: 'Analyse' },
      description: {
        en: 'Help us understand how visitors interact with our website.',
        de: 'Helfen uns zu verstehen, wie Besucher unsere Website nutzen.',
      },
    },
    {
      id: 'marketing',
      name: { en: 'Marketing', de: 'Marketing' },
      description: {
        en: 'Used to track visitors across websites to display relevant advertisements.',
        de: 'Werden verwendet, um Besucher über Websites hinweg zu verfolgen und relevante Werbung anzuzeigen.',
      },
    },
  ];

  let showDemo = $state(false);

  function launchDemo() {
    cookieStore.resetConsent();
    showDemo = true;
  }
</script>

<div class="space-y-6">
  <p class="text-sm text-mljr-text-muted">
    GDPR-compliant cookie consent banner with customizable categories, settings modal, and reactive store.
  </p>

  <!-- Live demo trigger -->
  <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
    <button type="button" class="mljr-btn mljr-btn-primary" onclick={launchDemo}>
      Show Cookie Banner Demo
    </button>
    <CookieSettingsButton variant="full" />
    <CookieSettingsButton variant="text" />
    <CookieSettingsButton variant="icon" />
  </div>

  <!-- Status display -->
  <div style="padding: 16px; background: var(--mljr-surface-alt); border-radius: var(--mljr-radius-md); font-size: var(--mljr-text-sm);">
    <strong>Store state:</strong>
    hasConsented = {cookieStore.hasConsented},
    analytics = {cookieStore.isAllowed('analytics')},
    marketing = {cookieStore.isAllowed('marketing')}
  </div>

  <!-- Banner (shown when demo active) -->
  {#if showDemo}
    <CookieBanner categories={demoCategories} showFloatingButton />
  {/if}

  <CodeExample
    code={`import { CookieBanner, CookieSettingsButton, cookieStore } from 'mljr-svelte';
import type { CookieCategory } from 'mljr-svelte';

const categories: CookieCategory[] = [
  {
    id: 'essential',
    name: { en: 'Essential', de: 'Erforderlich' },
    description: { en: 'Required for the site to work.', de: 'Für den Betrieb erforderlich.' },
    required: true,
  },
  {
    id: 'analytics',
    name: { en: 'Analytics', de: 'Analyse' },
    description: { en: 'Help us understand usage.', de: 'Hilft uns die Nutzung zu verstehen.' },
  },
];

// In +layout.svelte
onMount(() => cookieStore.initialize());

// Conditional feature loading
if (cookieStore.isAllowed('analytics')) { initAnalytics(); }

// Re-open from footer
<CookieSettingsButton variant="text" />

// Full banner
<CookieBanner {categories} showFloatingButton />`}
  />
</div>
