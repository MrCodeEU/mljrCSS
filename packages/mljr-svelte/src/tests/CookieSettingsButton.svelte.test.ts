import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import CookieSettingsButton from '../lib/components/overlay/CookieSettingsButton.svelte';
import { cookieStore } from '../lib/stores/cookies.svelte';

describe('CookieSettingsButton', () => {
  describe('Rendering - text variant (default)', () => {
    it('renders a button element', async () => {
      const { container } = render(CookieSettingsButton);
      expect(container.querySelector('button')).toBeTruthy();
    });

    it('applies link button class for text variant', async () => {
      const { container } = render(CookieSettingsButton, { variant: 'text' });
      const btn = container.querySelector('button');
      expect(btn?.classList.contains('mljr-btn-link')).toBe(true);
    });
  });

  describe('Rendering - full variant', () => {
    it('renders full variant with outline class', async () => {
      const { container } = render(CookieSettingsButton, { variant: 'full' });
      const btn = container.querySelector('button');
      expect(btn?.classList.contains('mljr-btn-outline-primary')).toBe(true);
    });
  });

  describe('Rendering - icon variant', () => {
    it('renders icon variant with FAB class', async () => {
      const { container } = render(CookieSettingsButton, { variant: 'icon' });
      const btn = container.querySelector('button');
      expect(btn?.classList.contains('mljr-cookie-fab')).toBe(true);
    });

    it('icon variant has aria-label', async () => {
      const { container } = render(CookieSettingsButton, { variant: 'icon' });
      const btn = container.querySelector('button');
      expect(btn?.getAttribute('aria-label')).toBeTruthy();
    });
  });

  describe('Interaction', () => {
    it('opens the cookie banner on click', async () => {
      cookieStore.acceptAll(['necessary']);
      expect(cookieStore.showBanner).toBe(false);

      const { container } = render(CookieSettingsButton);
      const btn = container.querySelector('button') as HTMLElement;
      btn?.click();
      await Promise.resolve();

      expect(cookieStore.showBanner).toBe(true);
    });
  });

  describe('Custom class', () => {
    it('applies custom class to button', async () => {
      const { container } = render(CookieSettingsButton, { class: 'my-custom' });
      const btn = container.querySelector('button');
      expect(btn?.classList.contains('my-custom')).toBe(true);
    });
  });
});
