<script lang="ts">
  import { CookieBanner, CookieSettingsButton, cookieStore } from '$lib';
  import type { CookieCategory } from '$lib';

  const categories: CookieCategory[] = [
    {
      id: 'necessary',
      name: { en: 'Necessary', de: 'Notwendig' },
      description: { en: 'Essential cookies required for the website to function.', de: 'Notwendige Cookies für den Betrieb der Website.' },
      required: true,
    },
    {
      id: 'analytics',
      name: { en: 'Analytics', de: 'Analyse' },
      description: { en: 'Cookies that help us understand how visitors use the website.', de: 'Cookies zur Analyse der Website-Nutzung.' },
      required: false,
    },
    {
      id: 'marketing',
      name: { en: 'Marketing', de: 'Marketing' },
      description: { en: 'Cookies used for targeted advertising.', de: 'Cookies für zielgerichtete Werbung.' },
      required: false,
    },
  ];
</script>

<div class="mljr-space-y-8">
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Cookie Banner (triggered manually)</h3>
    <p class="mljr-text-sm mljr-text-muted mljr-mb-4">
      The CookieBanner shows at the bottom of the page when <code>cookieStore.showBanner</code> is true.
      Click the button below to open it.
    </p>

    <div class="mljr-flex mljr-gap-3 mljr-flex-wrap">
      <button
        type="button"
        class="mljr-btn mljr-btn-primary"
        onclick={() => cookieStore.openBanner()}
      >
        Open Cookie Banner
      </button>
      <button
        type="button"
        class="mljr-btn mljr-btn-ghost"
        onclick={() => cookieStore.resetConsent()}
      >
        Reset Consent
      </button>
    </div>

    <div class="mljr-mt-4 mljr-p-4" style="background:var(--mljr-bg-secondary);border-radius:var(--mljr-radius-md);">
      <p class="mljr-text-sm mljr-font-medium mljr-mb-2">Current State:</p>
      <p class="mljr-text-sm mljr-text-muted">Has consented: {cookieStore.hasConsented}</p>
      <p class="mljr-text-sm mljr-text-muted">Banner visible: {cookieStore.showBanner}</p>
    </div>
  </section>

  <section>
    <h3 class="mljr-h4 mljr-mb-4">CookieSettingsButton (floating button)</h3>
    <p class="mljr-text-sm mljr-text-muted mljr-mb-4">
      The floating settings button appears after the user has consented. It's shown with
      <code>showFloatingButton=true</code> on the CookieBanner.
    </p>
    <CookieSettingsButton />
  </section>

  <section>
    <h3 class="mljr-h4 mljr-mb-4">Categories Preview</h3>
    <p class="mljr-text-sm mljr-text-muted mljr-mb-3">These categories will appear in the cookie settings panel:</p>
    <div class="mljr-space-y-3">
      {#each categories as cat}
        <div class="mljr-p-4" style="background:var(--mljr-bg-secondary);border-radius:var(--mljr-radius-md);border:1px solid var(--mljr-border);">
          <div class="mljr-flex mljr-justify-between mljr-items-start">
            <div>
              <p class="mljr-font-medium mljr-text-sm">
                {typeof cat.name === 'string' ? cat.name : cat.name.en}
                {#if cat.required}
                  <span class="mljr-badge mljr-badge-sm mljr-badge-primary mljr-ml-2">Required</span>
                {/if}
              </p>
              <p class="mljr-text-xs mljr-text-muted mljr-mt-1">
                {typeof cat.description === 'string' ? cat.description : cat.description.en}
              </p>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </section>
</div>

<!-- The actual cookie banner (fixed at bottom of page) -->
<CookieBanner {categories} position="bottom" showFloatingButton={true} />
