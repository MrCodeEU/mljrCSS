import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import NavigationRail from '../lib/components/navigation/NavigationRail.svelte';

const sampleItems = [
  { id: 'home', label: 'Home', icon: 'mdi:home', active: true },
  { id: 'explore', label: 'Explore', icon: 'mdi:compass', badge: 3 },
  { id: 'settings', label: 'Settings', icon: 'mdi:cog' },
];

describe('NavigationRail', () => {
  describe('Rendering', () => {
    it('renders nav element', async () => {
      const { container } = render(NavigationRail, { items: sampleItems });
      expect(container.querySelector('.mljr-nav-rail')).toBeTruthy();
    });

    it('renders all provided items', async () => {
      const { container } = render(NavigationRail, { items: sampleItems });
      const items = container.querySelectorAll('.mljr-nav-rail-item');
      // toggle button + 3 nav items
      expect(items.length).toBeGreaterThanOrEqual(3);
    });

    it('renders item labels when showLabels is true', async () => {
      const { container } = render(NavigationRail, { items: sampleItems, showLabels: true });
      const labels = container.querySelectorAll('.mljr-nav-rail-label');
      expect(labels.length).toBeGreaterThan(0);
    });

    it('renders badge for item with badge', async () => {
      const { container } = render(NavigationRail, { items: sampleItems });
      const badge = container.querySelector('.mljr-nav-rail-item-badge');
      expect(badge).toBeTruthy();
      expect(badge?.textContent).toBe('3');
    });
  });

  describe('Active State', () => {
    it('marks active item with active class', async () => {
      const { container } = render(NavigationRail, { items: sampleItems });
      const activeItems = container.querySelectorAll('.mljr-nav-rail-item-active');
      expect(activeItems.length).toBe(1);
    });
  });

  describe('Footer Items', () => {
    it('renders footer items', async () => {
      const footerItems = [{ id: 'profile', label: 'Profile', icon: 'mdi:account' }];
      const { container } = render(NavigationRail, { items: sampleItems, footerItems });
      expect(container.querySelector('.mljr-nav-rail-footer')).toBeTruthy();
    });
  });

  describe('Expand/Collapse', () => {
    it('applies expanded class when expanded', async () => {
      const { container } = render(NavigationRail, { items: sampleItems, expanded: true });
      expect(container.querySelector('.mljr-nav-rail-expanded')).toBeTruthy();
    });

    it('calls onToggle when toggle button clicked', async () => {
      const handleToggle = vi.fn();
      const { container } = render(NavigationRail, { items: sampleItems, onToggle: handleToggle });
      const toggleBtn = container.querySelector('.mljr-nav-rail-toggle') as HTMLElement;
      toggleBtn?.click();
      expect(handleToggle).toHaveBeenCalledWith(true);
    });
  });

  describe('Item Click', () => {
    it('calls onItemClick with clicked item', async () => {
      const handleClick = vi.fn();
      const { container } = render(NavigationRail, { items: sampleItems, onItemClick: handleClick });
      const navItems = container.querySelectorAll('.mljr-nav-rail-item:not(.mljr-nav-rail-toggle)');
      (navItems[0] as HTMLElement)?.click();
      expect(handleClick).toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('has navigation role', async () => {
      const { container } = render(NavigationRail, { items: sampleItems });
      const nav = container.querySelector('nav');
      expect(nav).toBeTruthy();
      expect(nav?.getAttribute('aria-label')).toBeTruthy();
    });

    it('marks active item with aria-current', async () => {
      const { container } = render(NavigationRail, { items: sampleItems });
      const activeLink = container.querySelector('[aria-current="page"]');
      expect(activeLink).toBeTruthy();
    });
  });
});
