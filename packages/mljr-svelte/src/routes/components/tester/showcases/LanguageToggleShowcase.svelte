<script lang="ts">
  import { LanguageToggle } from '$lib';
</script>

<div class="mljr-space-y-8">
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Language Toggle</h3>
    <p class="mljr-text-sm mljr-text-muted mljr-mb-4">
      The LanguageToggle component switches the UI language between available locales.
      It uses the Paraglide i18n runtime to set the active locale.
    </p>
    <div class="mljr-flex mljr-items-center mljr-gap-4">
      <LanguageToggle />
    </div>
  </section>

  <section>
    <h3 class="mljr-h4 mljr-mb-4">In Context (Navbar-style)</h3>
    <div class="mljr-p-4 mljr-flex mljr-items-center mljr-justify-between" style="background:var(--mljr-bg-secondary);border-radius:var(--mljr-radius-md);border:1px solid var(--mljr-border);">
      <span class="mljr-font-semibold">My App</span>
      <div class="mljr-flex mljr-items-center mljr-gap-3">
        <a href="/" class="mljr-text-sm mljr-text-muted">Home</a>
        <a href="/" class="mljr-text-sm mljr-text-muted">About</a>
        <LanguageToggle />
      </div>
    </div>
  </section>

  <section>
    <h3 class="mljr-h4 mljr-mb-4">Usage Notes</h3>
    <div class="mljr-p-4" style="background:var(--mljr-bg-secondary);border-radius:var(--mljr-radius-md);">
      <p class="mljr-text-sm mljr-text-muted mljr-mb-2">
        The toggle reads available locales from the Paraglide runtime and renders a button for each.
        The active locale is highlighted with the primary gradient.
      </p>
      <p class="mljr-text-sm mljr-text-muted">
        Language preference is stored in a cookie: <code>PARAGLIDE_LOCALE</code>
      </p>
    </div>
  </section>
</div>
