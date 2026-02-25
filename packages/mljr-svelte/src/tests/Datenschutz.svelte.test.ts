import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import Datenschutz from '../lib/components/layout/Datenschutz.svelte';
import type { DatenschutzData } from '../lib/components/layout/Datenschutz.svelte';

const baseData: DatenschutzData = {
  controller: {
    name: 'Test GmbH',
    address: 'Testgasse 1, 1010 Wien',
    email: 'datenschutz@test.at',
  },
};

const fullData: DatenschutzData = {
  controller: {
    name: 'Full Company GmbH',
    address: 'Musterstraße 42, 1010 Wien',
    email: 'privacy@full-company.at',
    phone: '+43 1 234 5678',
    website: 'https://www.full-company.at',
  },
  dpo: {
    name: 'Max Datenschutz',
    email: 'dpo@full-company.at',
  },
  usesAnalytics: true,
  analyticsProvider: 'plausible',
  usesYoutube: true,
  usesContactForm: true,
  usesNewsletter: true,
  usesCookies: true,
  lastUpdated: '2026-01-01',
};

describe('Datenschutz', () => {
  describe('Rendering', () => {
    it('renders the legal article', async () => {
      const { container } = render(Datenschutz, { data: baseData });
      expect(container.querySelector('.mljr-legal')).toBeTruthy();
    });

    it('renders the controller name', async () => {
      const { container } = render(Datenschutz, { data: baseData });
      expect(container.textContent).toContain('Test GmbH');
    });

    it('renders the controller email as a link', async () => {
      const { container } = render(Datenschutz, { data: baseData });
      expect(container.querySelector('a[href="mailto:datenschutz@test.at"]')).toBeTruthy();
    });

    it('renders controller address', async () => {
      const { container } = render(Datenschutz, { data: baseData });
      expect(container.textContent).toContain('Testgasse 1');
    });
  });

  describe('Legal sections (always present)', () => {
    it('renders legal bases section', async () => {
      const { container } = render(Datenschutz, { data: baseData });
      expect(container.querySelectorAll('.mljr-legal__section').length).toBeGreaterThan(1);
    });

    it('renders hosting section', async () => {
      const { container } = render(Datenschutz, { data: baseData });
      expect(container.textContent).toMatch(/hosting|server/i);
    });

    it('renders data subject rights section', async () => {
      const { container } = render(Datenschutz, { data: baseData });
      expect(container.textContent).toMatch(/rights|rechte/i);
    });
  });

  describe('Feature flags', () => {
    it('renders DPO section when dpo is provided', async () => {
      const { container } = render(Datenschutz, { data: fullData });
      expect(container.textContent).toContain('Max Datenschutz');
    });

    it('renders cookies section when usesCookies=true', async () => {
      const { container } = render(Datenschutz, { data: fullData });
      expect(container.textContent).toMatch(/cookies/i);
    });

    it('does not render cookies section when usesCookies is not set', async () => {
      const { container } = render(Datenschutz, { data: baseData });
      // Base data has no usesCookies flag, so cookies section should not appear
      const sections = container.querySelectorAll('.mljr-legal__section');
      let hasCookieSection = false;
      sections.forEach(s => {
        if (s.textContent?.match(/^cookies$/i)) hasCookieSection = true;
      });
      expect(hasCookieSection).toBe(false);
    });

    it('renders analytics section when usesAnalytics=true', async () => {
      const { container } = render(Datenschutz, { data: fullData });
      expect(container.textContent).toContain('Plausible Analytics');
    });

    it('renders YouTube section when usesYoutube=true', async () => {
      const { container } = render(Datenschutz, { data: fullData });
      expect(container.textContent).toContain('YouTube');
    });

    it('renders contact form section when usesContactForm=true', async () => {
      const { container } = render(Datenschutz, { data: fullData });
      expect(container.textContent).toMatch(/contact form|kontaktformular/i);
    });

    it('renders newsletter section when usesNewsletter=true', async () => {
      const { container } = render(Datenschutz, { data: fullData });
      expect(container.textContent).toContain('Newsletter');
    });
  });
});
