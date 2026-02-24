<script lang="ts">
  import { onMount } from 'svelte';
  import { cookieStore } from '../../stores/cookies.svelte.js';
  import type { CookieCategory } from '../../stores/cookies.svelte.js';
  import { getLocale } from '../../paraglide/runtime.js';
  import * as m from '../../paraglide/messages.js';

  interface Props {
    categories?: CookieCategory[];
    position?: 'bottom' | 'top';
    showFloatingButton?: boolean;
    class?: string;
  }

  let {
    categories = [],
    position = 'bottom',
    showFloatingButton = false,
    class: className = '',
  }: Props = $props();

  let showSettings = $state(false);
  let settingsPrefs = $state<Record<string, boolean>>({});

  const allIds = $derived(categories.map(c => c.id));
  const requiredIds = $derived(categories.filter(c => c.required).map(c => c.id));

  onMount(() => {
    cookieStore.initialize();
  });

  function localizedString(val: string | { en: string; de: string }): string {
    if (typeof val === 'string') return val;
    const locale = getLocale();
    return locale === 'de' ? val.de : val.en;
  }

  function openSettings() {
    // Initialise toggles from current prefs (required = always on)
    const prefs: Record<string, boolean> = {};
    for (const cat of categories) {
      prefs[cat.id] = cat.required ? true : (cookieStore.preferences[cat.id] ?? false);
    }
    settingsPrefs = prefs;
    showSettings = true;
  }

  function closeSettings() {
    showSettings = false;
  }

  function handleAcceptAll() {
    cookieStore.acceptAll(allIds);
    showSettings = false;
  }

  function handleDenyAll() {
    cookieStore.denyAll(allIds, requiredIds);
    showSettings = false;
  }

  function handleSave() {
    // Ensure required categories stay true
    for (const id of requiredIds) {
      settingsPrefs[id] = true;
    }
    cookieStore.savePreferences(settingsPrefs);
    showSettings = false;
  }

  function handleOverlayClick(e: MouseEvent) {
    if (e.target === e.currentTarget) closeSettings();
  }

</script>

<!-- Floating settings button (always visible after consent) -->
{#if showFloatingButton && cookieStore.hasConsented}
  <button
    type="button"
    class="mljr-cookie-fab"
    onclick={() => { cookieStore.openBanner(); }}
    aria-label={m.cookie_manage_settings()}
    title={m.cookie_manage_settings()}
  >
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
    </svg>
  </button>
{/if}

<!-- Banner bar -->
{#if cookieStore.showBanner && !showSettings}
  <div
    class="mljr-cookie-banner {position === 'top' ? 'mljr-cookie-banner--top' : ''} {className}"
    role="banner"
    aria-live="polite"
  >
    <div class="mljr-cookie-banner__content">
      <p class="mljr-cookie-banner__title">{m.cookie_banner_title()}</p>
      <p class="mljr-cookie-banner__desc">{m.cookie_banner_desc()}</p>
    </div>
    <div class="mljr-cookie-banner__actions">
      <button type="button" class="mljr-btn mljr-btn-ghost" onclick={handleDenyAll}>
        {m.cookie_deny_all()}
      </button>
      {#if categories.length > 1}
        <button type="button" class="mljr-btn mljr-btn-outline-primary" onclick={openSettings}>
          {m.cookie_customize()}
        </button>
      {/if}
      <button type="button" class="mljr-btn mljr-btn-primary" onclick={handleAcceptAll}>
        {m.cookie_accept_all()}
      </button>
    </div>
  </div>
{/if}

<!-- Settings overlay -->
{#if showSettings}
  <div
    class="mljr-cookie-overlay"
    role="dialog"
    aria-modal="true"
    aria-label={m.cookie_settings_title()}
    tabindex="-1"
    onclick={handleOverlayClick}
    onkeydown={(e) => { if (e.key === 'Escape') closeSettings(); }}
  >
    <div class="mljr-cookie-settings">
      <div class="mljr-cookie-settings__header">
        <button
          type="button"
          class="mljr-cookie-settings__back"
          onclick={closeSettings}
          aria-label={m.cookie_settings_back()}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <h2 class="mljr-cookie-settings__title">{m.cookie_settings_title()}</h2>
      </div>

      <div class="mljr-cookie-categories">
        {#each categories as cat (cat.id)}
          <div class="mljr-cookie-category">
            <div class="mljr-cookie-category__info">
              <p class="mljr-cookie-category__name">
                {localizedString(cat.name)}
                {#if cat.required}
                  <span class="mljr-cookie-category__required-badge">{m.cookie_required_label()}</span>
                {/if}
              </p>
              <p class="mljr-cookie-category__desc">{localizedString(cat.description)}</p>
            </div>
            <label class="mljr-cookie-toggle" aria-label={localizedString(cat.name)}>
              <input
                type="checkbox"
                checked={cat.required ? true : (settingsPrefs[cat.id] ?? false)}
                disabled={cat.required}
                onchange={(e) => {
                  if (!cat.required) {
                    settingsPrefs = { ...settingsPrefs, [cat.id]: (e.currentTarget as HTMLInputElement).checked };
                  }
                }}
              />
              <span class="mljr-cookie-toggle__track">
                <span class="mljr-cookie-toggle__thumb"></span>
              </span>
            </label>
          </div>
        {/each}
      </div>

      <div class="mljr-cookie-settings__footer">
        <button type="button" class="mljr-btn mljr-btn-ghost" onclick={handleDenyAll}>
          {m.cookie_deny_all()}
        </button>
        <button type="button" class="mljr-btn mljr-btn-outline-primary" onclick={handleAcceptAll}>
          {m.cookie_accept_all()}
        </button>
        <button type="button" class="mljr-btn mljr-btn-primary" onclick={handleSave}>
          {m.cookie_save_prefs()}
        </button>
      </div>
    </div>
  </div>
{/if}

