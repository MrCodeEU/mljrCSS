import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Accordion from '../lib/components/Accordion.svelte';

const items = [
  { id: 'item-1', title: 'First Item', content: 'Content 1' },
  { id: 'item-2', title: 'Second Item', content: 'Content 2' },
  { id: 'item-3', title: 'Third Item', content: 'Content 3' },
];

describe('Accordion', () => {
  describe('Rendering', () => {
    it('renders accordion element', async () => {
      const { container } = render(Accordion, { items });
      expect(container.querySelector('.mljr-accordion')).toBeTruthy();
    });

    it('renders correct number of items', async () => {
      const { container } = render(Accordion, { items });
      expect(container.querySelectorAll('.mljr-accordion-item').length).toBe(3);
    });

    it('renders item titles', async () => {
      const { container } = render(Accordion, { items });
      expect(container.textContent).toContain('First Item');
      expect(container.textContent).toContain('Second Item');
    });
  });

  describe('Variants', () => {
    it('applies flush variant class', async () => {
      const { container } = render(Accordion, { items, variant: 'flush' });
      expect(container.querySelector('.mljr-accordion-flush')).toBeTruthy();
    });

    it('applies separated variant class', async () => {
      const { container } = render(Accordion, { items, variant: 'separated' });
      expect(container.querySelector('.mljr-accordion-separated')).toBeTruthy();
    });

    it('applies primary class when primary=true', async () => {
      const { container } = render(Accordion, { items, primary: true });
      expect(container.querySelector('.mljr-accordion-primary')).toBeTruthy();
    });
  });

  describe('Interaction', () => {
    it('opens item on header click', async () => {
      const { container } = render(Accordion, { items });
      const firstHeader = container.querySelector('.mljr-accordion-trigger') as HTMLElement;
      firstHeader?.click();
      await Promise.resolve();
      expect(container.querySelector('.mljr-accordion-item-open')).toBeTruthy();
    });

    it('calls onchange when item is toggled', async () => {
      const handleChange = vi.fn();
      const { container } = render(Accordion, { items, onchange: handleChange });
      const firstHeader = container.querySelector('.mljr-accordion-trigger') as HTMLElement;
      firstHeader?.click();
      await Promise.resolve();
      expect(handleChange).toHaveBeenCalled();
    });

    it('starts with defaultOpen items expanded', async () => {
      const { container } = render(Accordion, { items, defaultOpen: ['item-1'] });
      expect(container.querySelector('.mljr-accordion-item-open')).toBeTruthy();
    });
  });

  describe('Multiple mode', () => {
    it('allows multiple open when multiple=true', async () => {
      const { container } = render(Accordion, { items, multiple: true, defaultOpen: ['item-1'] });
      const secondHeader = container.querySelectorAll('.mljr-accordion-trigger')[1] as HTMLElement;
      secondHeader?.click();
      await Promise.resolve();
      const openItems = container.querySelectorAll('.mljr-accordion-item-open');
      expect(openItems.length).toBe(2);
    });
  });
});
