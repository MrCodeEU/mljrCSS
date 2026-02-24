<script lang="ts">
  import { AboutPage } from '$lib';
  import type { AboutStat, AboutValue, AboutTeamMember } from '$lib';

  const stats: AboutStat[] = [
    { value: '12+', label: { en: 'Years of Experience', de: 'Jahre Erfahrung' } },
    { value: '200+', label: { en: 'Projects Delivered', de: 'Projekte abgeliefert' } },
    { value: '50+', label: { en: 'Happy Clients', de: 'Zufriedene Kunden' } },
    { value: '8', label: { en: 'Team Members', de: 'Teammitglieder' } },
  ];

  const values: AboutValue[] = [
    {
      icon: '🎨',
      name: { en: 'Design First', de: 'Design zuerst' },
      description: { en: 'We craft beautiful, intuitive interfaces that users love.', de: 'Wir gestalten schöne, intuitive Oberflächen, die Nutzer lieben.' },
    },
    {
      icon: '⚡',
      name: { en: 'Performance', de: 'Performance' },
      description: { en: 'Fast, efficient code that scales with your business.', de: 'Schneller, effizienter Code der mit Ihrem Unternehmen wächst.' },
    },
    {
      icon: '🤝',
      name: { en: 'Partnership', de: 'Partnerschaft' },
      description: { en: 'We work closely with our clients to achieve their goals.', de: 'Wir arbeiten eng mit unseren Kunden zusammen.' },
    },
    {
      icon: '🔒',
      name: { en: 'Security', de: 'Sicherheit' },
      description: { en: 'Privacy and security are built into everything we do.', de: 'Datenschutz und Sicherheit in allem was wir tun.' },
    },
  ];

  const team: AboutTeamMember[] = [
    { name: 'Anna Müller', role: { en: 'CEO & Founder', de: 'Geschäftsführerin' }, initials: 'AM' },
    { name: 'Thomas Weber', role: { en: 'Lead Developer', de: 'Leitender Entwickler' }, initials: 'TW' },
    { name: 'Sara Fischer', role: { en: 'UX Designer', de: 'UX Designerin' }, initials: 'SF' },
    { name: 'Lukas Bauer', role: { en: 'DevOps Engineer', de: 'DevOps Ingenieur' }, initials: 'LB' },
  ];
</script>

<div class="mljr-space-y-8">
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Full About Page</h3>
    <AboutPage
      companyName="Muster Digital"
      tagline={{ en: 'Building the web of tomorrow', de: 'Das Web von morgen aufbauen' }}
      description={{ en: 'We are a Vienna-based digital agency specializing in modern web applications, UX design, and cloud architecture.', de: 'Wir sind eine Wiener Digitalagentur spezialisiert auf moderne Webanwendungen, UX Design und Cloud-Architektur.' }}
      founded={2012}
      mission={{ en: 'Our mission is to empower businesses with elegant, performant digital solutions that make a real difference for their customers.', de: 'Unsere Mission ist es, Unternehmen mit eleganten, performanten digitalen Lösungen zu stärken.' }}
      {stats}
      {values}
      {team}
    />
  </section>

  <section>
    <h3 class="mljr-h4 mljr-mb-4">Minimal About Page (name + tagline only)</h3>
    <AboutPage
      companyName="Simple Corp"
      tagline="We make things simple."
      description="A small but mighty team building great software."
    />
  </section>
</div>
