import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Tabs from '../lib/components/navigation/Tabs.svelte';

describe('Tabs', () => {
  const defaultTabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'reports', label: 'Reports' },
  ];

  describe('Rendering', () => {
    it('renders tabs element', async () => {
      const { container } = render(Tabs, { tabs: defaultTabs });
      expect(container.querySelector('.mljr-tabs')).toBeTruthy();
    });

    it('renders all tab buttons', async () => {
      const { container } = render(Tabs, { tabs: defaultTabs });
      const tabBtns = container.querySelectorAll('[role="tab"]');
      expect(tabBtns.length).toBe(3);
    });

    it('renders tab labels', async () => {
      const { container } = render(Tabs, { tabs: defaultTabs });
      expect(container.textContent).toContain('Overview');
      expect(container.textContent).toContain('Analytics');
      expect(container.textContent).toContain('Reports');
    });
  });

  describe('Active tab', () => {
    it('marks the active tab', async () => {
      const { container } = render(Tabs, { tabs: defaultTabs, activeTab: 'analytics' });
      const activeTab = container.querySelector('[aria-selected="true"]');
      expect(activeTab?.textContent).toContain('Analytics');
    });

    it('activates first tab by default when no activeTab given', async () => {
      const { container } = render(Tabs, { tabs: defaultTabs });
      const activeTabs = container.querySelectorAll('[aria-selected="true"]');
      expect(activeTabs.length).toBe(1);
    });
  });

  describe('Variants', () => {
    it('applies pills variant', async () => {
      const { container } = render(Tabs, { tabs: defaultTabs, variant: 'pills' });
      expect(container.querySelector('.mljr-tabs-pills')).toBeTruthy();
    });

    it('applies bordered variant', async () => {
      const { container } = render(Tabs, { tabs: defaultTabs, variant: 'bordered' });
      expect(container.querySelector('.mljr-tabs-bordered')).toBeTruthy();
    });

    it('applies secondary modifier', async () => {
      const { container } = render(Tabs, { tabs: defaultTabs, secondary: true });
      expect(container.querySelector('.mljr-tabs-secondary')).toBeTruthy();
    });
  });

  describe('Interaction', () => {
    it('calls onchange when tab is clicked', async () => {
      const handleChange = vi.fn();
      const { container } = render(Tabs, { tabs: defaultTabs, onchange: handleChange });
      const secondTab = container.querySelectorAll('[role="tab"]')[1] as HTMLElement;
      secondTab?.click();
      expect(handleChange).toHaveBeenCalledWith('analytics');
    });
  });

  describe('Disabled tabs', () => {
    it('does not call onchange for disabled tab', async () => {
      const handleChange = vi.fn();
      const tabs = [
        { id: 'tab1', label: 'Tab 1' },
        { id: 'tab2', label: 'Tab 2', disabled: true },
      ];
      const { container } = render(Tabs, { tabs, onchange: handleChange });
      const disabledTab = container.querySelectorAll('[role="tab"]')[1] as HTMLElement;
      disabledTab?.click();
      expect(handleChange).not.toHaveBeenCalledWith('tab2');
    });
  });

  describe('Accessibility', () => {
    it('has role="tablist"', async () => {
      const { container } = render(Tabs, { tabs: defaultTabs });
      expect(container.querySelector('[role="tablist"]')).toBeTruthy();
    });

    it('tab buttons have role="tab"', async () => {
      const { container } = render(Tabs, { tabs: defaultTabs });
      expect(container.querySelector('[role="tab"]')).toBeTruthy();
    });
  });
});
