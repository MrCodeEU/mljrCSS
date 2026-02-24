import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Dock from '../lib/components/navigation/Dock.svelte';

const sampleItems = [
  { id: 'home', label: 'Home', icon: 'mdi:home', active: true },
  { id: 'search', label: 'Search', icon: 'mdi:magnify' },
  { id: 'profile', label: 'Profile', icon: 'mdi:account', badge: 5 },
];

describe('Dock', () => {
  describe('Rendering', () => {
    it('renders dock navigation', async () => {
      const { container } = render(Dock, { items: sampleItems });
      expect(container.querySelector('.mljr-dock')).toBeTruthy();
    });

    it('renders all items', async () => {
      const { container } = render(Dock, { items: sampleItems });
      const items = container.querySelectorAll('.mljr-dock-item');
      expect(items.length).toBe(3);
    });

    it('renders item labels by default', async () => {
      const { container } = render(Dock, { items: sampleItems });
      const labels = container.querySelectorAll('.mljr-dock-label');
      expect(labels.length).toBe(3);
    });

    it('hides labels when showLabels is false', async () => {
      const { container } = render(Dock, { items: sampleItems, showLabels: false });
      expect(container.querySelector('.mljr-dock-no-labels')).toBeTruthy();
    });

    it('renders badge for item with badge', async () => {
      const { container } = render(Dock, { items: sampleItems });
      const badge = container.querySelector('.mljr-dock-badge');
      expect(badge).toBeTruthy();
      expect(badge?.textContent).toBe('5');
    });
  });

  describe('Active State', () => {
    it('marks active item with active class', async () => {
      const { container } = render(Dock, { items: sampleItems });
      const activeItems = container.querySelectorAll('.mljr-dock-item-active');
      expect(activeItems.length).toBe(1);
    });
  });

  describe('Variants', () => {
    it('applies frosted variant class', async () => {
      const { container } = render(Dock, { items: sampleItems, variant: 'frosted' });
      expect(container.querySelector('.mljr-dock-frosted')).toBeTruthy();
    });

    it('applies full variant class', async () => {
      const { container } = render(Dock, { items: sampleItems, variant: 'full' });
      expect(container.querySelector('.mljr-dock-full')).toBeTruthy();
    });
  });

  describe('Sizes', () => {
    it('applies sm size class', async () => {
      const { container } = render(Dock, { items: sampleItems, size: 'sm' });
      expect(container.querySelector('.mljr-dock-sm')).toBeTruthy();
    });

    it('applies lg size class', async () => {
      const { container } = render(Dock, { items: sampleItems, size: 'lg' });
      expect(container.querySelector('.mljr-dock-lg')).toBeTruthy();
    });
  });

  describe('Fixed Position', () => {
    it('applies fixed class when fixed is true', async () => {
      const { container } = render(Dock, { items: sampleItems, fixed: true });
      expect(container.querySelector('.mljr-dock-fixed')).toBeTruthy();
    });
  });

  describe('Zoom Effect', () => {
    it('applies zoom class when zoom is true', async () => {
      const { container } = render(Dock, { items: sampleItems, zoom: true });
      expect(container.querySelector('.mljr-dock-zoom')).toBeTruthy();
    });
  });

  describe('Dividers', () => {
    it('renders divider when dividerBefore is set', async () => {
      const itemsWithDivider = [
        ...sampleItems.slice(0, 2),
        { id: 'divider-item', label: 'Other', icon: 'mdi:cog', dividerBefore: true },
      ];
      const { container } = render(Dock, { items: itemsWithDivider });
      expect(container.querySelector('.mljr-dock-divider')).toBeTruthy();
    });
  });

  describe('Item Click', () => {
    it('calls onItemClick when item is clicked', async () => {
      const handleClick = vi.fn();
      const { container } = render(Dock, { items: sampleItems, onItemClick: handleClick });
      const dockItems = container.querySelectorAll('.mljr-dock-item');
      (dockItems[0] as HTMLElement)?.click();
      expect(handleClick).toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('renders as nav element', async () => {
      const { container } = render(Dock, { items: sampleItems });
      const nav = container.querySelector('nav');
      expect(nav).toBeTruthy();
      expect(nav?.getAttribute('aria-label')).toBeTruthy();
    });

    it('marks active item with aria-current', async () => {
      const { container } = render(Dock, { items: sampleItems });
      expect(container.querySelector('[aria-current="page"]')).toBeTruthy();
    });
  });
});
