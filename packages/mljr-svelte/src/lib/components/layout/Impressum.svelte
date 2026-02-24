<script lang="ts">
  import { getLocale } from '../../paraglide/runtime.js';
  import * as m from '../../paraglide/messages.js';

  export interface ImpressumAddress {
    street: string;
    zip: string;
    city: string;
    country?: string;
  }

  export interface ImpressumData {
    /** Full legal name of the company or individual */
    name: string;
    /** Legal form, e.g. "GmbH", "e.U.", "OG" */
    legalForm?: string;
    address: ImpressumAddress;
    phone?: string;
    fax?: string;
    email: string;
    website?: string;
    /** Firmenbuchnummer, e.g. "FN 123456 a" */
    companyRegNo?: string;
    /** Firmenbuchgericht */
    companyRegCourt?: string;
    /** UID-Nummer, e.g. "ATU12345678" */
    uidNumber?: string;
    /** Berufsbezeichnung */
    profession?: string;
    /** Kammer / Berufsverband */
    chamber?: string;
    /** Aufsichtsbehörde */
    supervisoryAuthority?: string;
    /** Gewerbeordnung URL */
    gewerberechtURL?: string;
    /** Berufsrecht / anwendbares Recht */
    professionalLaw?: string;
    /** Additional custom information */
    additionalInfo?: string;
    /** Date last updated (ISO string) */
    lastUpdated?: string;
  }

  interface Props {
    data: ImpressumData;
    class?: string;
  }

  let { data, class: className = '' }: Props = $props();

  const locale = $derived(getLocale());
  const isDE = $derived(locale === 'de');

  const labels = $derived({
    title: isDE ? 'Impressum' : 'Legal Notice',
    legalForm: isDE ? 'Rechtsform' : 'Legal form',
    address: isDE ? 'Adresse' : 'Address',
    phone: isDE ? 'Telefon' : 'Phone',
    fax: 'Fax',
    email: 'E-Mail',
    website: 'Website',
    companyReg: isDE ? 'Firmenbuchnummer' : 'Company reg. no.',
    companyRegCourt: isDE ? 'Firmenbuchgericht' : 'Company reg. court',
    uid: isDE ? 'UID-Nummer' : 'VAT ID',
    profession: isDE ? 'Berufsbezeichnung' : 'Profession',
    chamber: isDE ? 'Kammer' : 'Chamber',
    supervisory: isDE ? 'Aufsichtsbehörde' : 'Supervisory authority',
    professionalLaw: isDE ? 'Berufsrecht' : 'Professional law',
    disclaimer: isDE ? 'Haftungsausschluss' : 'Disclaimer',
    contentLiability: isDE ? 'Haftung für Inhalte' : 'Liability for content',
    contentLiabilityText: isDE
      ? 'Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.'
      : 'The contents of this website have been compiled with the greatest possible care. However, we cannot guarantee the accuracy, completeness or topicality of the contents.',
    linkLiability: isDE ? 'Haftung für Links' : 'Liability for links',
    linkLiabilityText: isDE
      ? 'Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.'
      : 'Our website contains links to external third-party websites over which we have no control. We accept no liability for the content of these external links.',
    copyright: isDE ? 'Urheberrecht' : 'Copyright',
    copyrightText: isDE
      ? 'Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem österreichischen Urheberrecht. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.'
      : 'The content and works created by the site operator on these pages are subject to Austrian copyright law. Downloads and copies of this site are only permitted for private, non-commercial use.',
  });

  function formatDate(iso?: string): string {
    if (!iso) return '';
    try {
      return new Date(iso).toLocaleDateString(isDE ? 'de-AT' : 'en-GB', { dateStyle: 'long' });
    } catch {
      return iso;
    }
  }
</script>

<article class="mljr-legal {className}">
  <header class="mljr-legal__header">
    <h1 class="mljr-legal__title">{labels.title}</h1>
    {#if data.lastUpdated}
      <div class="mljr-legal__meta">
        <span>{m.legal_last_updated()}: {formatDate(data.lastUpdated)}</span>
        <button type="button" class="mljr-legal__print-btn" onclick={() => window.print()}>
          {m.legal_print()}
        </button>
      </div>
    {/if}
  </header>

  <!-- Contact / Company info -->
  <section class="mljr-legal__section">
    <h2 class="mljr-legal__section-title">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
      {data.name}{data.legalForm ? ` ${data.legalForm}` : ''}
    </h2>

    <div class="mljr-legal__row">
      <span class="mljr-legal__label">{labels.address}</span>
      <span class="mljr-legal__value">
        {data.address.street}<br/>
        {data.address.zip} {data.address.city}{#if data.address.country}<br/>{data.address.country}{/if}
      </span>
    </div>

    {#if data.phone}
      <div class="mljr-legal__row">
        <span class="mljr-legal__label">{labels.phone}</span>
        <span class="mljr-legal__value"><a href="tel:{data.phone}">{data.phone}</a></span>
      </div>
    {/if}

    {#if data.fax}
      <div class="mljr-legal__row">
        <span class="mljr-legal__label">{labels.fax}</span>
        <span class="mljr-legal__value">{data.fax}</span>
      </div>
    {/if}

    <div class="mljr-legal__row">
      <span class="mljr-legal__label">{labels.email}</span>
      <span class="mljr-legal__value"><a href="mailto:{data.email}">{data.email}</a></span>
    </div>

    {#if data.website}
      <div class="mljr-legal__row">
        <span class="mljr-legal__label">{labels.website}</span>
        <span class="mljr-legal__value"><a href={data.website} target="_blank" rel="noopener">{data.website}</a></span>
      </div>
    {/if}
  </section>

  <!-- Registration / UID -->
  {#if data.companyRegNo || data.uidNumber}
    <section class="mljr-legal__section">
      <h2 class="mljr-legal__section-title">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 3H8a2 2 0 0 0-2 2v2h12V5a2 2 0 0 0-2-2z"/>
        </svg>
        {isDE ? 'Unternehmensregistrierung' : 'Company Registration'}
      </h2>

      {#if data.companyRegNo}
        <div class="mljr-legal__row">
          <span class="mljr-legal__label">{labels.companyReg}</span>
          <span class="mljr-legal__value">{data.companyRegNo}</span>
        </div>
      {/if}

      {#if data.companyRegCourt}
        <div class="mljr-legal__row">
          <span class="mljr-legal__label">{labels.companyRegCourt}</span>
          <span class="mljr-legal__value">{data.companyRegCourt}</span>
        </div>
      {/if}

      {#if data.uidNumber}
        <div class="mljr-legal__row">
          <span class="mljr-legal__label">{labels.uid}</span>
          <span class="mljr-legal__value">{data.uidNumber}</span>
        </div>
      {/if}
    </section>
  {/if}

  <!-- Profession / Chamber -->
  {#if data.profession || data.chamber || data.supervisoryAuthority || data.professionalLaw}
    <section class="mljr-legal__section">
      <h2 class="mljr-legal__section-title">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
        </svg>
        {isDE ? 'Berufliche Informationen' : 'Professional Information'}
      </h2>

      {#if data.profession}
        <div class="mljr-legal__row">
          <span class="mljr-legal__label">{labels.profession}</span>
          <span class="mljr-legal__value">{data.profession}</span>
        </div>
      {/if}

      {#if data.chamber}
        <div class="mljr-legal__row">
          <span class="mljr-legal__label">{labels.chamber}</span>
          <span class="mljr-legal__value">{data.chamber}</span>
        </div>
      {/if}

      {#if data.supervisoryAuthority}
        <div class="mljr-legal__row">
          <span class="mljr-legal__label">{labels.supervisory}</span>
          <span class="mljr-legal__value">{data.supervisoryAuthority}</span>
        </div>
      {/if}

      {#if data.professionalLaw}
        <div class="mljr-legal__row">
          <span class="mljr-legal__label">{labels.professionalLaw}</span>
          <span class="mljr-legal__value">
            {#if data.gewerberechtURL}
              <a href={data.gewerberechtURL} target="_blank" rel="noopener">{data.professionalLaw}</a>
            {:else}
              {data.professionalLaw}
            {/if}
          </span>
        </div>
      {/if}
    </section>
  {/if}

  <!-- Additional info -->
  {#if data.additionalInfo}
    <section class="mljr-legal__section">
      <div class="mljr-legal__body">
        {@html data.additionalInfo}
      </div>
    </section>
  {/if}

  <!-- Disclaimer -->
  <section class="mljr-legal__section">
    <h2 class="mljr-legal__section-title">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
      {labels.disclaimer}
    </h2>

    <div class="mljr-legal__body">
      <h3>{labels.contentLiability}</h3>
      <p>{labels.contentLiabilityText}</p>
      <h3>{labels.linkLiability}</h3>
      <p>{labels.linkLiabilityText}</p>
      <h3>{labels.copyright}</h3>
      <p>{labels.copyrightText}</p>
    </div>
  </section>
</article>
