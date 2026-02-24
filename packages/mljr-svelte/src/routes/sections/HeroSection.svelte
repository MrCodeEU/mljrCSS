<script lang="ts">
  import { Button } from '$lib';
  import * as m from '$lib/paraglide/messages';
</script>

<section class="mljr-text-center mljr-mb-8">
  <div class="mljr-flex mljr-justify-center mljr-mb-4">
    <img src="/Logo.png" alt="MLJR Logo" style="height: 5rem; width: auto;" />
  </div>
  <h1 class="mljr-h1 mljr-mb-4">
    <span style="background: linear-gradient(135deg, var(--mljr-primary-500) 0%, var(--mljr-primary-700) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">MLJR</span> CSS Framework
  </h1>
  <p class="mljr-lead mljr-mb-6" style="max-width: 600px; margin: 0 auto;">
    {m.hero_subtitle()}
  </p>
  <div class="mljr-flex mljr-justify-center mljr-gap-4 mljr-flex-wrap">
    <Button variant="primary" size="lg">{m.hero_documentation()}</Button>
    <Button variant="outline-secondary" size="lg">{m.hero_github()}</Button>
    <a href="/components/tester" class="mljr-btn mljr-btn-outline-primary mljr-btn-lg">
      Component Tester
    </a>
  </div>
</section>
