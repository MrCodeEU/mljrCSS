import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import CookieBanner from '../lib/components/overlay/CookieBanner.svelte';
import { cookieStore } from '../lib/stores/cookies.svelte';

const testCategories = [
  {
    id: 'necessary',
    name: { en: 'Necessary', de: 'Notwendig' },
    description: { en: 'Required for the website to function.', de: 'Notwendig für den Betrieb.' },
    required: true,
  },
  {
    id: 'analytics',
    name: { en: 'Analytics', de: 'Analyse' },
    description: { en: 'Help us understand usage.', de: 'Hilft uns Nutzung zu verstehen.' },
    required: false,
  },
];

describe('CookieBanner', () => {
  describe('Rendering when banner is open', () => {
    it('renders the banner when cookieStore.showBanner is true', async () => {
      cookieStore.openBanner();
      const { container } = render(CookieBanner, { categories: testCategories });
      expect(container.querySelector('.mljr-cookie-banner')).toBeTruthy();
    });

    it('shows Accept All button when banner is open', async () => {
      cookieStore.openBanner();
      const { container } = render(CookieBanner, { categories: testCategories });
      expect(container.textContent).toMatch(/accept all/i);
    });

    it('shows Deny All button when banner is open', async () => {
      cookieStore.openBanner();
      const { container } = render(CookieBanner, { categories: testCategories });
      expect(container.textContent).toMatch(/deny optional/i);
    });

    it('shows Customize button when multiple categories', async () => {
      cookieStore.openBanner();
      const { container } = render(CookieBanner, { categories: testCategories });
      expect(container.textContent).toMatch(/customize|settings/i);
    });
  });

  describe('Rendering when banner is closed', () => {
    it('does not render banner when cookieStore.showBanner is false', async () => {
      cookieStore.acceptAll(testCategories.map(c => c.id));
      const { container } = render(CookieBanner, { categories: testCategories });
      expect(container.querySelector('.mljr-cookie-banner')).toBeNull();
    });
  });

  describe('Position', () => {
    it('applies top position class when position="top"', async () => {
      cookieStore.openBanner();
      const { container } = render(CookieBanner, { categories: testCategories, position: 'top' });
      const banner = container.querySelector('.mljr-cookie-banner');
      expect(banner?.className).toContain('mljr-cookie-banner--top');
    });

    it('does not apply top class for bottom position (default)', async () => {
      cookieStore.openBanner();
      const { container } = render(CookieBanner, { categories: testCategories, position: 'bottom' });
      const banner = container.querySelector('.mljr-cookie-banner');
      expect(banner?.className).not.toContain('mljr-cookie-banner--top');
    });
  });
});
