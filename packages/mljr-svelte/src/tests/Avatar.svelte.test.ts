import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import Avatar from '../lib/components/display/Avatar.svelte';

describe('Avatar', () => {
  describe('Rendering', () => {
    it('renders avatar element', async () => {
      const { container } = render(Avatar);
      expect(container.querySelector('.mljr-avatar')).toBeTruthy();
    });

    it('renders initials', async () => {
      const { container } = render(Avatar, { initials: 'JD' });
      expect(container.textContent).toContain('JD');
    });

    it('renders img when src provided', async () => {
      // Use data URL to avoid network request / server 404
      const { container } = render(Avatar, { src: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==', alt: 'User' });
      expect(container.querySelector('img')).toBeTruthy();
    });

    it('img has correct alt', async () => {
      const { container } = render(Avatar, { src: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==', alt: 'Test User' });
      const img = container.querySelector('img');
      expect(img?.getAttribute('alt')).toBe('Test User');
    });
  });

  describe('Sizes', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;

    sizes.forEach((size) => {
      it(`applies ${size} size class`, async () => {
        const { container } = render(Avatar, { size });
        const avatar = container.querySelector('.mljr-avatar');
        expect(avatar?.classList.contains(`mljr-avatar-${size}`)).toBe(true);
      });
    });
  });

  describe('Shapes', () => {
    it('applies circle shape class', async () => {
      const { container } = render(Avatar, { shape: 'circle' });
      expect(container.querySelector('.mljr-avatar-circle')).toBeTruthy();
    });

    it('has square shape by default (no circle class)', async () => {
      const { container } = render(Avatar);
      expect(container.querySelector('.mljr-avatar-circle')).toBeFalsy();
    });
  });

  describe('Variants', () => {
    it('applies secondary variant', async () => {
      const { container } = render(Avatar, { variant: 'secondary' });
      expect(container.querySelector('.mljr-avatar-secondary')).toBeTruthy();
    });

    it('applies accent variant', async () => {
      const { container } = render(Avatar, { variant: 'accent' });
      expect(container.querySelector('.mljr-avatar-accent')).toBeTruthy();
    });
  });

  describe('Status', () => {
    const statuses = ['online', 'offline', 'busy', 'away'] as const;

    statuses.forEach((status) => {
      it(`renders ${status} status indicator`, async () => {
        const { container } = render(Avatar, { status });
        expect(container.querySelector(`.mljr-avatar-status-${status}`)).toBeTruthy();
      });
    });
  });

  describe('Ring', () => {
    it('applies ring class when ring=true', async () => {
      const { container } = render(Avatar, { ring: true });
      expect(container.querySelector('.mljr-avatar-ring')).toBeTruthy();
    });

    it('applies ring-secondary class', async () => {
      const { container } = render(Avatar, { ring: 'secondary' });
      expect(container.querySelector('.mljr-avatar-ring-secondary')).toBeTruthy();
    });
  });
});
