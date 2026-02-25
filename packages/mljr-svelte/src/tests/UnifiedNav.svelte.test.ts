import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import { flushSync } from 'svelte';
import UnifiedNav from '../lib/components/navigation/UnifiedNav.svelte';

const categories = [
  {
    id: 'cat1',
    name: 'Components',
    items: [
      { id: 'item1', label: 'Button', href: '/button' },
      { id: 'item2', label: 'Card', href: '/card', active: true },
    ],
  },
  {
    id: 'cat2',
    name: 'Layout',
    items: [{ id: 'item3', label: 'Grid', href: '/grid' }],
  },
];

describe('UnifiedNav', () => {
  describe('Rendering', () => {
    it('renders unified nav element', async () => {
      const { container } = render(UnifiedNav, { categories });
      expect(container.querySelector('.unified-nav')).toBeTruthy();
    });

    it('renders top bar', async () => {
      const { container } = render(UnifiedNav, { categories });
      expect(container.querySelector('.nav-topbar')).toBeTruthy();
    });

    it('renders hamburger menu button', async () => {
      const { container } = render(UnifiedNav, { categories });
      expect(container.querySelector('.nav-menu-btn')).toBeTruthy();
    });

    it('sidebar is visible by default (open=true)', async () => {
      const { container } = render(UnifiedNav, { categories });
      expect(container.querySelector('.nav-sidebar')).toBeTruthy();
    });

    it('sidebar is hidden when open=false', async () => {
      const { container } = render(UnifiedNav, { categories, open: false });
      expect(container.querySelector('.nav-sidebar')).toBeFalsy();
    });

    it('renders category headers', async () => {
      const { container } = render(UnifiedNav, { categories });
      const headers = container.querySelectorAll('.nav-category-header');
      expect(headers.length).toBe(2);
    });

    it('renders category names', async () => {
      const { container } = render(UnifiedNav, { categories });
      expect(container.textContent).toContain('Components');
      expect(container.textContent).toContain('Layout');
    });
  });

  describe('Position', () => {
    it('applies position-right class when position=right', async () => {
      const { container } = render(UnifiedNav, { categories, position: 'right' });
      expect(container.querySelector('.unified-nav.position-right')).toBeTruthy();
    });

    it('no position-right class by default', async () => {
      const { container } = render(UnifiedNav, { categories });
      expect(container.querySelector('.unified-nav.position-right')).toBeFalsy();
    });
  });

  describe('Top links', () => {
    it('renders quick nav when topLinks provided', async () => {
      const topLinks = [{ label: 'Docs', href: '/docs' }, { label: 'Blog', href: '/blog' }];
      const { container } = render(UnifiedNav, { categories, topLinks });
      expect(container.querySelector('.nav-quick-nav')).toBeTruthy();
    });

    it('renders each top link', async () => {
      const topLinks = [{ label: 'Docs', href: '/docs' }];
      const { container } = render(UnifiedNav, { categories, topLinks });
      expect(container.textContent).toContain('Docs');
    });

    it('does not render quick nav when topLinks is empty', async () => {
      const { container } = render(UnifiedNav, { categories, topLinks: [] });
      expect(container.querySelector('.nav-quick-nav')).toBeFalsy();
    });
  });

  describe('Category toggling', () => {
    it('nav items not visible before clicking category header', async () => {
      const { container } = render(UnifiedNav, { categories });
      expect(container.querySelector('.nav-items')).toBeFalsy();
    });

    it('clicking category header reveals nav items', async () => {
      const { container } = render(UnifiedNav, { categories });
      const header = container.querySelector('.nav-category-header') as HTMLElement;
      header?.click();
      await Promise.resolve();
      expect(container.querySelector('.nav-items')).toBeTruthy();
    });

    it('clicking category header sets aria-expanded to true', async () => {
      const { container } = render(UnifiedNav, { categories });
      const header = container.querySelector('.nav-category-header') as HTMLElement;
      header?.click();
      await Promise.resolve();
      expect(header?.getAttribute('aria-expanded')).toBe('true');
    });

    it('nav link text is rendered when category is open', async () => {
      const { container } = render(UnifiedNav, { categories });
      const header = container.querySelector('.nav-category-header') as HTMLElement;
      header?.click();
      await Promise.resolve();
      expect(container.textContent).toContain('Button');
      expect(container.textContent).toContain('Card');
    });

    it('active nav link has active class', async () => {
      const { container } = render(UnifiedNav, { categories });
      const header = container.querySelector('.nav-category-header') as HTMLElement;
      header?.click();
      await Promise.resolve();
      expect(container.querySelector('.nav-link.active')).toBeTruthy();
    });
  });

  describe('Toggle sidebar', () => {
    it('menu button aria-expanded is true when open', async () => {
      const { container } = render(UnifiedNav, { categories });
      const menuBtn = container.querySelector('.nav-menu-btn') as HTMLElement;
      expect(menuBtn?.getAttribute('aria-expanded')).toBe('true');
    });

    it('clicking menu button changes aria-expanded to false', async () => {
      const { container } = render(UnifiedNav, { categories });
      const menuBtn = container.querySelector('.nav-menu-btn') as HTMLElement;
      flushSync(() => menuBtn?.click());
      expect(menuBtn?.getAttribute('aria-expanded')).toBe('false');
    });
  });
});
