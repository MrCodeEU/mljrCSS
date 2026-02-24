import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Drawer from '../lib/components/navigation/Drawer.svelte';

describe('Drawer', () => {
  describe('Rendering when open', () => {
    it('renders drawer when open=true', async () => {
      const { container } = render(Drawer, { open: true, title: 'Navigation' });
      expect(container.querySelector('.mljr-drawer')).toBeTruthy();
    });

    it('renders title when provided', async () => {
      const { container } = render(Drawer, { open: true, title: 'My Drawer' });
      expect(container.textContent).toContain('My Drawer');
    });

    it('shows close button by default', async () => {
      const { container } = render(Drawer, { open: true });
      expect(container.querySelector('.mljr-drawer-close')).toBeTruthy();
    });

    it('hides close button when showClose=false', async () => {
      const { container } = render(Drawer, { open: true, showClose: false });
      expect(container.querySelector('.mljr-drawer-close')).toBeFalsy();
    });
  });

  describe('Rendering when closed', () => {
    it('does not render drawer content when open=false', async () => {
      const { container } = render(Drawer, { open: false });
      expect(container.querySelector('.mljr-drawer')).toBeFalsy();
    });
  });

  describe('Positions', () => {
    const positions = ['left', 'right', 'top', 'bottom'] as const;
    positions.forEach((position) => {
      it(`applies ${position} position class`, async () => {
        const { container } = render(Drawer, { open: true, position });
        expect(container.querySelector(`.mljr-drawer-${position}`)).toBeTruthy();
      });
    });
  });

  describe('Sizes', () => {
    const sizes = ['sm', 'lg', 'xl', 'full'] as const;
    sizes.forEach((size) => {
      it(`applies ${size} size class`, async () => {
        const { container } = render(Drawer, { open: true, size });
        expect(container.querySelector(`.mljr-drawer-${size}`)).toBeTruthy();
      });
    });
  });
});
