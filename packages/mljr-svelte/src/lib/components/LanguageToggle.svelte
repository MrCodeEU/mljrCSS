<script lang="ts">
  import { setLocale, getLocale, locales } from '../i18n';
  import type { Locale } from '../i18n';

  let currentLang = $derived(getLocale());

  function setLanguage(lang: Locale) {
    setLocale(lang);
    // Store preference in cookie (paraglide uses PARAGLIDE_LOCALE by default)
    document.cookie = `PARAGLIDE_LOCALE=${lang};path=/;max-age=${60 * 60 * 24 * 365}`;
  }
</script>

<div class="language-toggle">
  {#each locales as lang}
    <button
      type="button"
      class="lang-btn"
      class:active={currentLang === lang}
      onclick={() => setLanguage(lang)}
      aria-label={lang === 'en' ? 'English' : 'Deutsch'}
      title={lang === 'en' ? 'English' : 'Deutsch'}
    >
      {lang.toUpperCase()}
    </button>
  {/each}
</div>

<style>
  .language-toggle {
    display: flex;
    align-items: center;
    gap: var(--mljr-space-1);
    padding: var(--mljr-space-1);
    background: linear-gradient(
      145deg,
      var(--mljr-bg) 0%,
      var(--mljr-bg-secondary) 100%
    );
    border-radius: var(--mljr-radius-full);
    border: 1px solid rgba(255, 255, 255, 0.4);
    box-shadow:
      3px 3px 8px rgba(0, 0, 0, 0.08),
      -2px -2px 6px rgba(255, 255, 255, 0.6),
      inset 0 1px 1px rgba(255, 255, 255, 0.4);
  }

  .lang-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 32px;
    height: 32px;
    padding: 0 var(--mljr-space-2);
    background: transparent;
    border: none;
    border-radius: var(--mljr-radius-full);
    color: var(--mljr-text-secondary);
    font-size: var(--mljr-text-xs);
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .lang-btn:hover {
    color: var(--mljr-text);
    background: rgba(255, 255, 255, 0.3);
  }

  .lang-btn.active {
    background: linear-gradient(
      145deg,
      var(--mljr-primary-500) 0%,
      var(--mljr-primary-600) 100%
    );
    color: white;
    box-shadow:
      2px 2px 6px rgba(249, 115, 22, 0.3),
      inset 0 1px 1px rgba(255, 255, 255, 0.3);
  }
</style>
