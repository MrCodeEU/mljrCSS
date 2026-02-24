<script lang="ts">
  import { Datenschutz } from '$lib';
  import type { DatenschutzData } from '$lib';

  const fullData: DatenschutzData = {
    controller: {
      name: 'Muster Digital GmbH',
      address: 'Musterstraße 42, 1010 Wien, Österreich',
      email: 'datenschutz@muster-digital.at',
      phone: '+43 1 234 5678',
      website: 'https://www.muster-digital.at',
    },
    dpo: {
      name: 'Dr. Maria Datenschutz',
      email: 'dpo@muster-digital.at',
    },
    usesAnalytics: true,
    analyticsProvider: 'plausible',
    usesYoutube: true,
    usesContactForm: true,
    usesNewsletter: true,
    usesCookies: true,
    lastUpdated: '2026-01-15',
  };

  const minimalData: DatenschutzData = {
    controller: {
      name: 'Max Mustermann',
      address: 'Beispielgasse 7, 8010 Graz',
      email: 'max@mustermann.at',
    },
    usesCookies: false,
    usesContactForm: false,
    usesAnalytics: false,
    usesYoutube: false,
  };
</script>

<div class="mljr-space-y-8">
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Full Privacy Policy (all services enabled)</h3>
    <Datenschutz data={fullData} />
  </section>

  <section>
    <h3 class="mljr-h4 mljr-mb-4">Minimal Privacy Policy (no third-party services)</h3>
    <Datenschutz data={minimalData} />
  </section>
</div>
