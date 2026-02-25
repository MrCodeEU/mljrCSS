import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/svelte';
import Menu from '../lib/components/navigation/Menu.svelte';

const items = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Profile', href: '/profile', active: true },
  { label: 'Settings', href: '/settings' },
  { label: 'Admin', href: '/admin', disabled: true },
];

describe('Menu', () => {
  describe('Rendering', () => {
    it('renders menu element', async () => {
      const { container } = render(Menu, { items });
      expect(container.querySelector('.mljr-menu')).toBeTruthy();
    });

    it('renders all menu items', async () => {
      const { container } = render(Menu, { items });
      expect(container.querySelectorAll('.mljr-menu-item').length).toBe(4);
    });

    it('renders item labels', async () => {
      const { container } = render(Menu, { items });
      expect(container.textContent).toContain('Dashboard');
      expect(container.textContent).toContain('Profile');
    });

    it('marks active item', async () => {
      const { container } = render(Menu, { items });
      expect(container.querySelector('.mljr-menu-link-active')).toBeTruthy();
    });

    it('marks disabled item', async () => {
      const { container } = render(Menu, { items });
      expect(container.querySelector('.mljr-menu-item-disabled')).toBeTruthy();
    });
  });

  describe('Orientations', () => {
    it('applies horizontal orientation class', async () => {
      const { container } = render(Menu, { items, orientation: 'horizontal' });
      expect(container.querySelector('.mljr-menu-horizontal')).toBeTruthy();
    });
  });

  describe('Sizes', () => {
    it('applies sm size class', async () => {
      const { container } = render(Menu, { items, size: 'sm' });
      expect(container.querySelector('.mljr-menu-sm')).toBeTruthy();
    });

    it('applies lg size class', async () => {
      const { container } = render(Menu, { items, size: 'lg' });
      expect(container.querySelector('.mljr-menu-lg')).toBeTruthy();
    });
  });

  describe('Submenus', () => {
    it('renders submenu toggle for items with children', async () => {
      const itemsWithSubmenu = [
        {
          label: 'Products',
          submenu: [
            { label: 'Product A', href: '/a' },
            { label: 'Product B', href: '/b' },
          ],
        },
      ];
      const { container } = render(Menu, { items: itemsWithSubmenu });
      expect(container.querySelector('.mljr-menu-submenu-trigger')).toBeTruthy();
    });
  });
});
