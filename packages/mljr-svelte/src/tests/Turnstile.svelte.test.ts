import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import Turnstile from '../lib/components/forms/Turnstile.svelte';

describe('Turnstile', () => {
  describe('Rendering', () => {
    it('renders the container', async () => {
      const { container } = render(Turnstile, {});
      expect(container.querySelector('.mljr-turnstile')).toBeTruthy();
    });

    it('renders demo widget when no siteKey is provided', async () => {
      const { container } = render(Turnstile, {});
      expect(container.querySelector('.mljr-turnstile-demo')).toBeTruthy();
    });

    it('renders demo checkbox', async () => {
      const { container } = render(Turnstile, {});
      expect(container.querySelector('.mljr-turnstile-demo-checkbox')).toBeTruthy();
    });

    it('renders "I am human" label in demo mode', async () => {
      const { container } = render(Turnstile, {});
      expect(container.textContent).toContain('I am human');
    });

    it('renders Cloudflare brand in demo mode', async () => {
      const { container } = render(Turnstile, {});
      expect(container.textContent).toContain('Cloudflare');
    });
  });

  describe('Real widget mode', () => {
    it('renders real widget container when siteKey is provided', async () => {
      const { container } = render(Turnstile, { siteKey: 'test-site-key-123' });
      expect(container.querySelector('.mljr-turnstile-widget')).toBeTruthy();
    });

    it('does not render demo widget when siteKey is provided', async () => {
      const { container } = render(Turnstile, { siteKey: 'test-site-key-123' });
      expect(container.querySelector('.mljr-turnstile-demo')).toBeNull();
    });
  });

  describe('Status message', () => {
    it('does not show status by default (idle state)', async () => {
      const { container } = render(Turnstile, {});
      expect(container.querySelector('.mljr-turnstile-status')).toBeNull();
    });

    it('hides status when showStatus=false', async () => {
      const { container } = render(Turnstile, { showStatus: false });
      expect(container.querySelector('.mljr-turnstile-status')).toBeNull();
    });
  });

  describe('Custom class', () => {
    it('applies additional CSS class', async () => {
      const { container } = render(Turnstile, { class: 'my-custom-class' });
      expect(container.querySelector('.mljr-turnstile')?.className).toContain('my-custom-class');
    });
  });
});
