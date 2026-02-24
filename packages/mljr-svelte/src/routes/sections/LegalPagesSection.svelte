<script lang="ts">
  import Impressum from '$lib/components/layout/Impressum.svelte';
  import Datenschutz from '$lib/components/layout/Datenschutz.svelte';
  import AboutPage from '$lib/components/layout/AboutPage.svelte';
  import type { ImpressumData } from '$lib/components/layout/Impressum.svelte';
  import type { DatenschutzData } from '$lib/components/layout/Datenschutz.svelte';
  import CodeExample from '$lib/components/CodeExample.svelte';

  type Tab = 'impressum' | 'datenschutz' | 'about';
  let activeTab = $state<Tab>('impressum');

  const impressumData: ImpressumData = {
    name: 'Musterfirma',
    legalForm: 'GmbH',
    address: { street: 'Musterstraße 1', zip: '1010', city: 'Wien', country: 'Österreich' },
    phone: '+43 1 234 56 78',
    email: 'office@musterfirma.at',
    website: 'https://musterfirma.at',
    companyRegNo: 'FN 123456 a',
    companyRegCourt: 'Handelsgericht Wien',
    uidNumber: 'ATU12345678',
    lastUpdated: '2026-01-15',
  };

  const datenschutzData: DatenschutzData = {
    controller: {
      name: 'Musterfirma GmbH',
      address: 'Musterstraße 1, 1010 Wien, Österreich',
      email: 'datenschutz@musterfirma.at',
      phone: '+43 1 234 56 78',
    },
    usesContactForm: true,
    usesAnalytics: true,
    analyticsProvider: 'google',
    usesCookies: true,
    lastUpdated: '2026-01-15',
  };
</script>

<div>
  <!-- Tab switcher -->
  <div class="mljr-tabs" style="margin-bottom: 24px;">
    <div class="mljr-tabs-list">
      <button
        type="button"
        class="mljr-tab {activeTab === 'impressum' ? 'mljr-tab-active' : ''}"
        onclick={() => activeTab = 'impressum'}
      >Impressum</button>
      <button
        type="button"
        class="mljr-tab {activeTab === 'datenschutz' ? 'mljr-tab-active' : ''}"
        onclick={() => activeTab = 'datenschutz'}
      >Datenschutz</button>
      <button
        type="button"
        class="mljr-tab {activeTab === 'about' ? 'mljr-tab-active' : ''}"
        onclick={() => activeTab = 'about'}
      >About Page</button>
    </div>
  </div>

  {#if activeTab === 'impressum'}
    <Impressum data={impressumData} />
    <CodeExample
      code={`import { Impressum } from 'mljr-svelte';
import type { ImpressumData } from 'mljr-svelte';

const data: ImpressumData = {
  name: 'Musterfirma',
  legalForm: 'GmbH',
  address: { street: 'Musterstraße 1', zip: '1010', city: 'Wien' },
  email: 'office@musterfirma.at',
  companyRegNo: 'FN 123456 a',
  uidNumber: 'ATU12345678',
};

<Impressum {data} />`}
    />
  {:else if activeTab === 'datenschutz'}
    <Datenschutz data={datenschutzData} />
    <CodeExample
      code={`import { Datenschutz } from 'mljr-svelte';
import type { DatenschutzData } from 'mljr-svelte';

const data: DatenschutzData = {
  controller: {
    name: 'Musterfirma GmbH',
    address: 'Musterstraße 1, 1010 Wien',
    email: 'datenschutz@musterfirma.at',
  },
  usesContactForm: true,
  usesAnalytics: true,
  analyticsProvider: 'google',
  usesCookies: true,
};

<Datenschutz {data} />`}
    />
  {:else}
    <AboutPage
      companyName="MLJR CSS"
      tagline={{ en: 'Beautiful UI for everyone', de: 'Schöne UI für alle' }}
      description={{ en: 'A TailwindCSS-based component library with claymorphism design.', de: 'Eine TailwindCSS-basierte Komponentenbibliothek mit Claymorphism-Design.' }}
      founded={2024}
      mission={{ en: 'To make beautiful, accessible UI components available to every developer.', de: 'Schöne, barrierefreie UI-Komponenten für jeden Entwickler zugänglich zu machen.' }}
      stats={[
        { value: '80+', label: { en: 'Components', de: 'Komponenten' } },
        { value: '2', label: { en: 'Languages', de: 'Sprachen' } },
        { value: '100%', label: { en: 'Open Source', de: 'Open Source' } },
      ]}
      values={[
        { icon: '🎨', name: { en: 'Design', de: 'Design' }, description: { en: 'Beautiful by default.', de: 'Standardmäßig schön.' } },
        { icon: '♿', name: { en: 'Accessibility', de: 'Barrierefreiheit' }, description: { en: 'Inclusive for everyone.', de: 'Inklusiv für alle.' } },
        { icon: '⚡', name: { en: 'Performance', de: 'Leistung' }, description: { en: 'Fast and lightweight.', de: 'Schnell und leichtgewichtig.' } },
      ]}
      team={[
        { name: 'MLJR Team', role: { en: 'Core Team', de: 'Kernteam' }, initials: 'ML' },
      ]}
    />
    <CodeExample
      code={`import { AboutPage } from 'mljr-svelte';

<AboutPage
  companyName="Meine Firma"
  tagline={{ en: 'Great products', de: 'Tolle Produkte' }}
  founded={2022}
  mission={{ en: 'Our mission...', de: 'Unsere Mission...' }}
  stats={[{ value: '100+', label: 'Clients' }]}
  values={[{ icon: '🚀', name: 'Innovation', description: '...' }]}
  team={[{ name: 'Jane Doe', role: 'CEO', initials: 'JD' }]}
/>`}
    />
  {/if}
</div>
