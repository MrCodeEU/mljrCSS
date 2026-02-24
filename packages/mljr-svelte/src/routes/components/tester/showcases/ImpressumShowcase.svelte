<script lang="ts">
  import { Impressum } from '$lib';
  import type { ImpressumData } from '$lib';

  const fullData: ImpressumData = {
    name: 'Muster Digital',
    legalForm: 'GmbH',
    address: {
      street: 'Musterstraße 42',
      zip: '1010',
      city: 'Wien',
      country: 'Österreich',
    },
    phone: '+43 1 234 5678',
    fax: '+43 1 234 5679',
    email: 'office@muster-digital.at',
    website: 'https://www.muster-digital.at',
    companyRegNo: 'FN 123456 a',
    companyRegCourt: 'Handelsgericht Wien',
    uidNumber: 'ATU12345678',
    profession: 'Webentwicklung und IT-Dienstleistungen',
    chamber: 'Wirtschaftskammer Wien',
    supervisoryAuthority: 'Wirtschaftskammer Österreich',
    professionalLaw: 'Gewerbeordnung 1994',
    gewerberechtURL: 'https://www.ris.bka.gv.at',
    lastUpdated: '2026-01-15',
  };

  const minimalData: ImpressumData = {
    name: 'Max Mustermann',
    address: {
      street: 'Beispielgasse 7',
      zip: '8010',
      city: 'Graz',
    },
    email: 'max@mustermann.at',
  };
</script>

<div class="mljr-space-y-8">
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Full Impressum (Austrian GmbH)</h3>
    <Impressum data={fullData} />
  </section>

  <section>
    <h3 class="mljr-h4 mljr-mb-4">Minimal Impressum (individual, required fields only)</h3>
    <Impressum data={minimalData} />
  </section>
</div>
