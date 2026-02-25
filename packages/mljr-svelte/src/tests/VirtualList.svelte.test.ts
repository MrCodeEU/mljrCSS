import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import VirtualList from '../lib/components/display/VirtualList.svelte';

describe('VirtualList', () => {
  const items = Array.from({ length: 100 }, (_, i) => ({ id: i, label: `Item ${i}` }));

  describe('Rendering', () => {
    it('renders the virtual list container', async () => {
      const { container } = render(VirtualList, { items });
      expect(container.querySelector('.mljr-virtual-list')).toBeTruthy();
    });

    it('renders only a subset of items (not all 100)', async () => {
      const { container } = render(VirtualList, {
        items,
        itemHeight: 40,
        containerHeight: 400,
      });
      const listItems = container.querySelectorAll('[role="listitem"]');
      // Should render visible + overscan items, not all 100
      expect(listItems.length).toBeLessThan(items.length);
    });

    it('has role="list"', async () => {
      const { container } = render(VirtualList, { items });
      expect(container.querySelector('[role="list"]')).toBeTruthy();
    });

    it('applies containerHeight as inline style', async () => {
      const { container } = render(VirtualList, { items, containerHeight: 300 });
      const list = container.querySelector('.mljr-virtual-list') as HTMLElement;
      expect(list?.style.height).toBe('300px');
    });

    it('renders empty list with no items', async () => {
      const { container } = render(VirtualList, { items: [] });
      const listItems = container.querySelectorAll('[role="listitem"]');
      expect(listItems.length).toBe(0);
    });

    it('renders all items when they all fit in the container', async () => {
      // 5 items × 40px = 200px total, container is 400px — all should render
      const fewItems = Array.from({ length: 5 }, (_, i) => i);
      const { container } = render(VirtualList, {
        items: fewItems,
        itemHeight: 40,
        containerHeight: 400,
      });
      const listItems = container.querySelectorAll('[role="listitem"]');
      expect(listItems.length).toBe(5);
    });

    it('renders single item without error', async () => {
      const { container } = render(VirtualList, {
        items: ['only'],
        itemHeight: 40,
        containerHeight: 400,
      });
      const listItems = container.querySelectorAll('[role="listitem"]');
      expect(listItems.length).toBe(1);
    });

    it('spacer div has correct total height', async () => {
      // 100 items × 40px = 4000px spacer
      const { container } = render(VirtualList, {
        items,
        itemHeight: 40,
        containerHeight: 400,
      });
      // The spacer is the first child of the scroll container
      const list = container.querySelector('.mljr-virtual-list') as HTMLElement;
      const spacer = list?.firstElementChild as HTMLElement;
      expect(spacer?.style.height).toBe('4000px');
    });
  });
});
