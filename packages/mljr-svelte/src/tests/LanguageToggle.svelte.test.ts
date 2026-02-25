import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import LanguageToggle from '../lib/components/layout/LanguageToggle.svelte';

describe('LanguageToggle', () => {
  describe('Rendering', () => {
    it('renders language toggle element', async () => {
      const { container } = render(LanguageToggle);
      expect(container.querySelector('.language-toggle')).toBeTruthy();
    });

    it('renders buttons for each locale', async () => {
      const { container } = render(LanguageToggle);
      const buttons = container.querySelectorAll('.lang-btn');
      expect(buttons.length).toBeGreaterThanOrEqual(2);
    });

    it('renders EN button', async () => {
      const { container } = render(LanguageToggle);
      const buttons = Array.from(container.querySelectorAll('.lang-btn'));
      const enButton = buttons.find((b) => b.textContent?.trim() === 'EN');
      expect(enButton).toBeTruthy();
    });

    it('renders DE button', async () => {
      const { container } = render(LanguageToggle);
      const buttons = Array.from(container.querySelectorAll('.lang-btn'));
      const deButton = buttons.find((b) => b.textContent?.trim() === 'DE');
      expect(deButton).toBeTruthy();
    });

    it('EN button has correct aria-label', async () => {
      const { container } = render(LanguageToggle);
      const buttons = Array.from(container.querySelectorAll('.lang-btn'));
      const enButton = buttons.find((b) => b.textContent?.trim() === 'EN');
      expect(enButton?.getAttribute('aria-label')).toBe('English');
    });

    it('DE button has correct aria-label', async () => {
      const { container } = render(LanguageToggle);
      const buttons = Array.from(container.querySelectorAll('.lang-btn'));
      const deButton = buttons.find((b) => b.textContent?.trim() === 'DE');
      expect(deButton?.getAttribute('aria-label')).toBe('Deutsch');
    });

    it('one button is active by default', async () => {
      const { container } = render(LanguageToggle);
      const activeButton = container.querySelector('.lang-btn.active');
      expect(activeButton).toBeTruthy();
    });
  });
});
