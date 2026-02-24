<script lang="ts">
  import { getLocale } from '../../paraglide/runtime.js';
  import * as m from '../../paraglide/messages.js';

  export interface DataController {
    name: string;
    address: string;
    email: string;
    phone?: string;
    website?: string;
  }

  export interface DatenschutzData {
    controller: DataController;
    /** Optional DPO (Datenschutzbeauftragter) */
    dpo?: { name: string; email: string };
    /** Feature flags for third-party services */
    usesAnalytics?: boolean;
    analyticsProvider?: 'google' | 'matomo' | 'plausible' | string;
    usesYoutube?: boolean;
    usesStripe?: boolean;
    usesContactForm?: boolean;
    usesNewsletter?: boolean;
    usesCookies?: boolean;
    /** ISO date of last update */
    lastUpdated?: string;
  }

  interface Props {
    data: DatenschutzData;
    class?: string;
  }

  let { data, class: className = '' }: Props = $props();

  const locale = $derived(getLocale());
  const isDE = $derived(locale === 'de');

  function formatDate(iso?: string): string {
    if (!iso) return '';
    try {
      return new Date(iso).toLocaleDateString(isDE ? 'de-AT' : 'en-GB', { dateStyle: 'long' });
    } catch {
      return iso ?? '';
    }
  }

  const analyticsName = $derived(() => {
    if (!data.analyticsProvider) return isDE ? 'Analyse-Tool' : 'Analytics tool';
    if (data.analyticsProvider === 'google') return 'Google Analytics';
    if (data.analyticsProvider === 'matomo') return 'Matomo';
    if (data.analyticsProvider === 'plausible') return 'Plausible Analytics';
    return data.analyticsProvider;
  });
</script>

<article class="mljr-legal {className}">
  <header class="mljr-legal__header">
    <h1 class="mljr-legal__title">
      {isDE ? 'Datenschutzerklärung' : 'Privacy Policy'}
    </h1>
    {#if data.lastUpdated}
      <div class="mljr-legal__meta">
        <span>{m.legal_last_updated()}: {formatDate(data.lastUpdated)}</span>
        <button type="button" class="mljr-legal__print-btn" onclick={() => window.print()}>
          {m.legal_print()}
        </button>
      </div>
    {/if}
  </header>

  <!-- 1. Verantwortlicher -->
  <section class="mljr-legal__section">
    <h2 class="mljr-legal__section-title">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
      </svg>
      {isDE ? 'Verantwortlicher' : 'Data Controller'}
    </h2>
    <div class="mljr-legal__body">
      <p>
        {#if isDE}
          Verantwortlicher für die Datenverarbeitung auf dieser Website im Sinne der DSGVO ist:
        {:else}
          The data controller responsible for the processing of personal data on this website is:
        {/if}
      </p>
    </div>
    <div class="mljr-legal__row">
      <span class="mljr-legal__label">{isDE ? 'Name' : 'Name'}</span>
      <span class="mljr-legal__value">{data.controller.name}</span>
    </div>
    <div class="mljr-legal__row">
      <span class="mljr-legal__label">{isDE ? 'Adresse' : 'Address'}</span>
      <span class="mljr-legal__value">{data.controller.address}</span>
    </div>
    <div class="mljr-legal__row">
      <span class="mljr-legal__label">E-Mail</span>
      <span class="mljr-legal__value"><a href="mailto:{data.controller.email}">{data.controller.email}</a></span>
    </div>
    {#if data.controller.phone}
      <div class="mljr-legal__row">
        <span class="mljr-legal__label">{isDE ? 'Telefon' : 'Phone'}</span>
        <span class="mljr-legal__value"><a href="tel:{data.controller.phone}">{data.controller.phone}</a></span>
      </div>
    {/if}
  </section>

  <!-- DPO -->
  {#if data.dpo}
    <section class="mljr-legal__section">
      <h2 class="mljr-legal__section-title">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
        </svg>
        {isDE ? 'Datenschutzbeauftragter' : 'Data Protection Officer'}
      </h2>
      <div class="mljr-legal__row">
        <span class="mljr-legal__label">{isDE ? 'Name' : 'Name'}</span>
        <span class="mljr-legal__value">{data.dpo.name}</span>
      </div>
      <div class="mljr-legal__row">
        <span class="mljr-legal__label">E-Mail</span>
        <span class="mljr-legal__value"><a href="mailto:{data.dpo.email}">{data.dpo.email}</a></span>
      </div>
    </section>
  {/if}

  <!-- 2. Rechtsgrundlagen -->
  <section class="mljr-legal__section">
    <h2 class="mljr-legal__section-title">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
      {isDE ? 'Rechtsgrundlagen der Verarbeitung' : 'Legal Bases for Processing'}
    </h2>
    <div class="mljr-legal__body">
      {#if isDE}
        <p>Wir verarbeiten personenbezogene Daten auf Grundlage folgender Rechtsgrundlagen gemäß DSGVO Art. 6:</p>
        <ul>
          <li><strong>Art. 6 Abs. 1 lit. a DSGVO</strong> – Einwilligung der betroffenen Person</li>
          <li><strong>Art. 6 Abs. 1 lit. b DSGVO</strong> – Vertragserfüllung oder vorvertragliche Maßnahmen</li>
          <li><strong>Art. 6 Abs. 1 lit. c DSGVO</strong> – Erfüllung einer rechtlichen Verpflichtung</li>
          <li><strong>Art. 6 Abs. 1 lit. f DSGVO</strong> – Berechtigte Interessen des Verantwortlichen</li>
        </ul>
      {:else}
        <p>We process personal data on the following legal bases under GDPR Art. 6:</p>
        <ul>
          <li><strong>Art. 6(1)(a) GDPR</strong> – Consent of the data subject</li>
          <li><strong>Art. 6(1)(b) GDPR</strong> – Performance of a contract or pre-contractual measures</li>
          <li><strong>Art. 6(1)(c) GDPR</strong> – Compliance with a legal obligation</li>
          <li><strong>Art. 6(1)(f) GDPR</strong> – Legitimate interests of the controller</li>
        </ul>
      {/if}
    </div>
  </section>

  <!-- 3. Hosting / Server logs -->
  <section class="mljr-legal__section">
    <h2 class="mljr-legal__section-title">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
      {isDE ? 'Hosting & Server-Logfiles' : 'Hosting & Server Log Files'}
    </h2>
    <div class="mljr-legal__body">
      {#if isDE}
        <p>Beim Besuch dieser Website werden automatisch Informationen in sogenannten Server-Logfiles gespeichert. Dies umfasst: IP-Adresse, Browsertyp, Betriebssystem, Referrer-URL, Datum und Uhrzeit des Zugriffs.</p>
        <p>Diese Daten werden auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (berechtigte Interessen) verarbeitet und nach spätestens 30 Tagen gelöscht.</p>
      {:else}
        <p>When visiting this website, information is automatically stored in so-called server log files, including: IP address, browser type, operating system, referrer URL, date and time of access.</p>
        <p>This data is processed on the basis of Art. 6(1)(f) GDPR (legitimate interests) and deleted after a maximum of 30 days.</p>
      {/if}
    </div>
  </section>

  <!-- 4. Cookies (conditional) -->
  {#if data.usesCookies}
    <section class="mljr-legal__section">
      <h2 class="mljr-legal__section-title">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/><circle cx="8" cy="10" r="1" fill="currentColor"/><circle cx="14" cy="8" r="1" fill="currentColor"/><circle cx="15" cy="14" r="1" fill="currentColor"/>
        </svg>
        Cookies
      </h2>
      <div class="mljr-legal__body">
        {#if isDE}
          <p>Diese Website verwendet Cookies. Cookies sind kleine Textdateien, die auf Ihrem Endgerät gespeichert werden. Technisch notwendige Cookies werden auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO gesetzt. Weitere Cookies werden nur mit Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) gesetzt.</p>
          <p>Sie können die Verwendung von Cookies jederzeit über Ihre Browser-Einstellungen oder unsere Cookie-Einstellungen anpassen.</p>
        {:else}
          <p>This website uses cookies — small text files stored on your device. Technically necessary cookies are set on the basis of Art. 6(1)(f) GDPR. Additional cookies are only set with your consent (Art. 6(1)(a) GDPR).</p>
          <p>You can adjust the use of cookies at any time through your browser settings or our cookie settings.</p>
        {/if}
      </div>
    </section>
  {/if}

  <!-- 5. Contact form (conditional) -->
  {#if data.usesContactForm}
    <section class="mljr-legal__section">
      <h2 class="mljr-legal__section-title">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
        </svg>
        {isDE ? 'Kontaktformular' : 'Contact Form'}
      </h2>
      <div class="mljr-legal__body">
        {#if isDE}
          <p>Bei Nutzung unseres Kontaktformulars werden die von Ihnen eingegebenen Daten (Name, E-Mail-Adresse, Nachricht) zur Bearbeitung Ihrer Anfrage verarbeitet. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b bzw. lit. f DSGVO. Die Daten werden nach abschließender Bearbeitung gelöscht, sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen.</p>
        {:else}
          <p>When using our contact form, the data you provide (name, email address, message) is processed to handle your request. The legal basis is Art. 6(1)(b) and/or Art. 6(1)(f) GDPR. The data is deleted after the matter is concluded, unless statutory retention obligations apply.</p>
        {/if}
      </div>
    </section>
  {/if}

  <!-- 6. Newsletter (conditional) -->
  {#if data.usesNewsletter}
    <section class="mljr-legal__section">
      <h2 class="mljr-legal__section-title">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0"/>
        </svg>
        Newsletter
      </h2>
      <div class="mljr-legal__body">
        {#if isDE}
          <p>Wenn Sie unseren Newsletter abonnieren, verwenden wir Ihre E-Mail-Adresse ausschließlich zum Versand des Newsletters. Rechtsgrundlage ist Ihre Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO. Sie können sich jederzeit abmelden.</p>
        {:else}
          <p>When you subscribe to our newsletter, we use your email address solely to send the newsletter. The legal basis is your consent pursuant to Art. 6(1)(a) GDPR. You can unsubscribe at any time.</p>
        {/if}
      </div>
    </section>
  {/if}

  <!-- 7. Analytics (conditional) -->
  {#if data.usesAnalytics}
    <section class="mljr-legal__section">
      <h2 class="mljr-legal__section-title">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
        </svg>
        {analyticsName()}
      </h2>
      <div class="mljr-legal__body">
        {#if isDE}
          <p>Diese Website nutzt {analyticsName()} zur anonymisierten Analyse des Nutzerverhaltens. Die erhobenen Daten werden verwendet, um die Website-Nutzung auszuwerten und Berichte zu erstellen. Rechtsgrundlage ist Ihre Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO.</p>
          {#if data.analyticsProvider === 'google'}
            <p>Anbieter: Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Weitere Informationen: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Google Datenschutzerklärung</a>.</p>
          {/if}
        {:else}
          <p>This website uses {analyticsName()} for anonymised analysis of user behaviour. The data collected is used to evaluate website usage and compile reports. The legal basis is your consent pursuant to Art. 6(1)(a) GDPR.</p>
          {#if data.analyticsProvider === 'google'}
            <p>Provider: Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland. Further information: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Google Privacy Policy</a>.</p>
          {/if}
        {/if}
      </div>
    </section>
  {/if}

  <!-- 8. YouTube (conditional) -->
  {#if data.usesYoutube}
    <section class="mljr-legal__section">
      <h2 class="mljr-legal__section-title">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/>
        </svg>
        YouTube
      </h2>
      <div class="mljr-legal__body">
        {#if isDE}
          <p>Diese Website bindet Videos von YouTube (Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland) ein. Bei Aufruf einer Seite mit eingebettetem YouTube-Video wird eine Verbindung zu den Servern von YouTube hergestellt. Dabei kann Ihre IP-Adresse übermittelt werden. Rechtsgrundlage ist Ihre Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO.</p>
        {:else}
          <p>This website embeds videos from YouTube (Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland). When a page with an embedded YouTube video is accessed, a connection to YouTube's servers is established, which may transmit your IP address. The legal basis is your consent pursuant to Art. 6(1)(a) GDPR.</p>
        {/if}
      </div>
    </section>
  {/if}

  <!-- 9. Stripe (conditional) -->
  {#if data.usesStripe}
    <section class="mljr-legal__section">
      <h2 class="mljr-legal__section-title">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>
        </svg>
        Stripe
      </h2>
      <div class="mljr-legal__body">
        {#if isDE}
          <p>Für die Zahlungsabwicklung nutzen wir Stripe (Stripe Payments Europe, Ltd., 1 Grand Canal Street Lower, Grand Canal Dock, Dublin, Irland). Ihre Zahlungsdaten werden direkt an Stripe übermittelt. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung). Weitere Informationen: <a href="https://stripe.com/de/privacy" target="_blank" rel="noopener">Stripe Datenschutz</a>.</p>
        {:else}
          <p>We use Stripe (Stripe Payments Europe, Ltd., 1 Grand Canal Street Lower, Grand Canal Dock, Dublin, Ireland) for payment processing. Your payment data is transmitted directly to Stripe. The legal basis is Art. 6(1)(b) GDPR (contract performance). Further information: <a href="https://stripe.com/privacy" target="_blank" rel="noopener">Stripe Privacy Policy</a>.</p>
        {/if}
      </div>
    </section>
  {/if}

  <!-- 10. Betroffenenrechte -->
  <section class="mljr-legal__section">
    <h2 class="mljr-legal__section-title">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
      {isDE ? 'Ihre Rechte als betroffene Person' : 'Your Rights as a Data Subject'}
    </h2>
    <div class="mljr-legal__body">
      {#if isDE}
        <p>Gemäß DSGVO haben Sie folgende Rechte:</p>
        <ul>
          <li><strong>Auskunftsrecht</strong> (Art. 15 DSGVO)</li>
          <li><strong>Recht auf Berichtigung</strong> (Art. 16 DSGVO)</li>
          <li><strong>Recht auf Löschung</strong> (Art. 17 DSGVO)</li>
          <li><strong>Recht auf Einschränkung der Verarbeitung</strong> (Art. 18 DSGVO)</li>
          <li><strong>Recht auf Datenübertragbarkeit</strong> (Art. 20 DSGVO)</li>
          <li><strong>Widerspruchsrecht</strong> (Art. 21 DSGVO)</li>
          <li><strong>Recht auf Widerruf der Einwilligung</strong> (Art. 7 Abs. 3 DSGVO)</li>
        </ul>
        <p>Um diese Rechte auszuüben, wenden Sie sich bitte an: <a href="mailto:{data.controller.email}">{data.controller.email}</a></p>
        <div class="mljr-legal__highlight">
          <strong>Beschwerderecht:</strong> Sie haben das Recht, sich bei der österreichischen Datenschutzbehörde (DSB) zu beschweren: Österreichische Datenschutzbehörde, Barichgasse 40-42, 1030 Wien, <a href="mailto:dsb@dsb.gv.at">dsb@dsb.gv.at</a>
        </div>
      {:else}
        <p>Under the GDPR, you have the following rights:</p>
        <ul>
          <li><strong>Right of access</strong> (Art. 15 GDPR)</li>
          <li><strong>Right to rectification</strong> (Art. 16 GDPR)</li>
          <li><strong>Right to erasure</strong> (Art. 17 GDPR)</li>
          <li><strong>Right to restriction of processing</strong> (Art. 18 GDPR)</li>
          <li><strong>Right to data portability</strong> (Art. 20 GDPR)</li>
          <li><strong>Right to object</strong> (Art. 21 GDPR)</li>
          <li><strong>Right to withdraw consent</strong> (Art. 7(3) GDPR)</li>
        </ul>
        <p>To exercise these rights, please contact: <a href="mailto:{data.controller.email}">{data.controller.email}</a></p>
        <div class="mljr-legal__highlight">
          <strong>Right to lodge a complaint:</strong> You have the right to lodge a complaint with the Austrian Data Protection Authority (DSB): Österreichische Datenschutzbehörde, Barichgasse 40-42, 1030 Vienna, Austria. <a href="mailto:dsb@dsb.gv.at">dsb@dsb.gv.at</a>
        </div>
      {/if}
    </div>
  </section>
</article>
