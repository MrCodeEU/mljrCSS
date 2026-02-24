import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Impressum from '../lib/components/layout/Impressum.svelte';
import type { ImpressumData } from '../lib/components/layout/Impressum.svelte';

const minimalData: ImpressumData = {
  name: 'Test Company',
  address: {
    street: 'Test Street 1',
    zip: '1010',
    city: 'Vienna',
  },
  email: 'test@example.com',
};

const fullData: ImpressumData = {
  name: 'Full Company',
  legalForm: 'GmbH',
  address: {
    street: 'Full Street 42',
    zip: '8010',
    city: 'Graz',
    country: 'Österreich',
  },
  phone: '+43 1 123 456',
  fax: '+43 1 123 457',
  email: 'office@full-company.at',
  website: 'https://www.full-company.at',
  companyRegNo: 'FN 999999 a',
  companyRegCourt: 'Handelsgericht Wien',
  uidNumber: 'ATU99999999',
  profession: 'Software Development',
  chamber: 'Wirtschaftskammer Wien',
  lastUpdated: '2026-01-01',
};

describe('Impressum', () => {
  describe('Rendering', () => {
    it('renders the legal article', async () => {
      const { container } = render(Impressum, { data: minimalData });
      expect(container.querySelector('.mljr-legal')).toBeTruthy();
    });

    it('renders the company name', async () => {
      const { container } = render(Impressum, { data: minimalData });
      expect(container.textContent).toContain('Test Company');
    });

    it('renders the address', async () => {
      const { container } = render(Impressum, { data: minimalData });
      expect(container.textContent).toContain('Test Street 1');
      expect(container.textContent).toContain('1010');
      expect(container.textContent).toContain('Vienna');
    });

    it('renders the email as a link', async () => {
      const { container } = render(Impressum, { data: minimalData });
      const emailLink = container.querySelector('a[href="mailto:test@example.com"]');
      expect(emailLink).toBeTruthy();
    });
  });

  describe('Optional fields', () => {
    it('renders legal form when provided', async () => {
      const { container } = render(Impressum, { data: fullData });
      expect(container.textContent).toContain('GmbH');
    });

    it('renders phone when provided', async () => {
      const { container } = render(Impressum, { data: fullData });
      expect(container.querySelector('a[href^="tel:"]')).toBeTruthy();
    });

    it('renders company registration number when provided', async () => {
      const { container } = render(Impressum, { data: fullData });
      expect(container.textContent).toContain('FN 999999 a');
    });

    it('renders UID number when provided', async () => {
      const { container } = render(Impressum, { data: fullData });
      expect(container.textContent).toContain('ATU99999999');
    });

    it('does not render registration section for minimal data', async () => {
      const { container } = render(Impressum, { data: minimalData });
      expect(container.textContent).not.toContain('ATU');
      expect(container.textContent).not.toContain('FN');
    });

    it('renders website link when provided', async () => {
      const { container } = render(Impressum, { data: fullData });
      expect(container.querySelector('a[href="https://www.full-company.at"]')).toBeTruthy();
    });
  });

  describe('Disclaimer section', () => {
    it('always renders a disclaimer section', async () => {
      const { container } = render(Impressum, { data: minimalData });
      // Disclaimer section is always rendered
      expect(container.querySelector('.mljr-legal__section')).toBeTruthy();
    });
  });
});
