import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Footer from '../lib/components/layout/Footer.svelte';

describe('Footer', () => {
  describe('Rendering', () => {
    it('renders footer element', async () => {
      const { container } = render(Footer);
      expect(container.querySelector('footer.mljr-footer')).toBeTruthy();
    });

    it('renders copyright text', async () => {
      const { container } = render(Footer, { copyright: '© 2026 Test Inc.' });
      expect(container.textContent).toContain('© 2026 Test Inc.');
    });

    it('renders default sections when none provided', async () => {
      const { container } = render(Footer);
      expect(container.querySelectorAll('.mljr-footer-section').length).toBeGreaterThan(0);
    });

    it('renders custom sections', async () => {
      const sections = [
        { title: 'About', links: [{ label: 'Team', href: '/team' }] },
      ];
      const { container } = render(Footer, { sections });
      expect(container.textContent).toContain('About');
      expect(container.textContent).toContain('Team');
    });

    it('renders description text', async () => {
      const { container } = render(Footer, { description: 'My custom description' });
      expect(container.textContent).toContain('My custom description');
    });
  });

  describe('Variants', () => {
    it('applies compact variant class', async () => {
      const { container } = render(Footer, { variant: 'compact' });
      expect(container.querySelector('.mljr-footer-compact')).toBeTruthy();
    });

    it('applies centered variant class', async () => {
      const { container } = render(Footer, { variant: 'centered' });
      expect(container.querySelector('.mljr-footer-centered')).toBeTruthy();
    });

    it('compact variant only shows copyright', async () => {
      const { container } = render(Footer, { variant: 'compact', copyright: '© 2026' });
      expect(container.textContent).toContain('© 2026');
      expect(container.querySelector('.mljr-footer-section')).toBeFalsy();
    });
  });

  describe('Legal links', () => {
    it('renders legal links', async () => {
      const legalLinks = [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
      ];
      const { container } = render(Footer, { legalLinks });
      expect(container.textContent).toContain('Privacy Policy');
      expect(container.textContent).toContain('Terms of Service');
    });
  });
});
