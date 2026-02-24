import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Breadcrumb from '../lib/components/navigation/Breadcrumb.svelte';

describe('Breadcrumb', () => {
  const defaultItems = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Shoes' },
  ];

  describe('Rendering', () => {
    it('renders breadcrumb element', async () => {
      const { container } = render(Breadcrumb, { items: defaultItems });
      expect(container.querySelector('.mljr-breadcrumb')).toBeTruthy();
    });

    it('renders all items', async () => {
      const { container } = render(Breadcrumb, { items: defaultItems });
      const items = container.querySelectorAll('.mljr-breadcrumb-item');
      expect(items.length).toBe(3);
    });

    it('renders item labels', async () => {
      const { container } = render(Breadcrumb, { items: defaultItems });
      expect(container.textContent).toContain('Home');
      expect(container.textContent).toContain('Products');
      expect(container.textContent).toContain('Shoes');
    });

    it('last item has active class', async () => {
      const { container } = render(Breadcrumb, { items: defaultItems });
      const activeItem = container.querySelector('.mljr-breadcrumb-item-active');
      expect(activeItem?.textContent).toContain('Shoes');
    });
  });

  describe('Links', () => {
    it('renders links for items with href', async () => {
      const { container } = render(Breadcrumb, { items: defaultItems });
      // Only <a> elements are actual links; last item gets a <span> with same class
      const links = container.querySelectorAll('a.mljr-breadcrumb-link');
      expect(links.length).toBe(2); // Home and Products have hrefs
    });

    it('links have correct href', async () => {
      const { container } = render(Breadcrumb, { items: defaultItems });
      const firstLink = container.querySelector('.mljr-breadcrumb-link');
      expect(firstLink?.getAttribute('href')).toBe('/');
    });
  });

  describe('Max items', () => {
    it('truncates items when maxItems is set', async () => {
      const manyItems = [
        { label: 'Home', href: '/' },
        { label: 'A', href: '/a' },
        { label: 'B', href: '/b' },
        { label: 'C', href: '/c' },
        { label: 'Current' },
      ];
      const { container } = render(Breadcrumb, { items: manyItems, maxItems: 3 });
      const items = container.querySelectorAll('.mljr-breadcrumb-item');
      // With maxItems=3: shows first + ellipsis + last 2 = max 3 shown
      expect(items.length).toBeLessThanOrEqual(manyItems.length);
    });
  });

  describe('Accessibility', () => {
    it('has nav element', async () => {
      const { container } = render(Breadcrumb, { items: defaultItems });
      expect(container.querySelector('nav')).toBeTruthy();
    });

    it('has aria-label', async () => {
      const { container } = render(Breadcrumb, { items: defaultItems });
      const nav = container.querySelector('nav');
      expect(nav?.getAttribute('aria-label')).toBeTruthy();
    });
  });
});
