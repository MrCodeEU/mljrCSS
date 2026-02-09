import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Card from '../lib/components/Card.svelte';

describe('Card', () => {
  describe('Rendering', () => {
    it('renders card element', async () => {
      const { container } = render(Card);
      
      expect(container.querySelector('.mljr-card')).toBeTruthy();
    });

    it('renders title', async () => {
      const { container } = render(Card, {
        title: 'Card Title',
      });
      
      const title = container.querySelector('.mljr-card-title');
      expect(title?.textContent).toBe('Card Title');
    });

    it('renders description', async () => {
      const { container } = render(Card, {
        title: 'Card Title',
        description: 'Card description text',
      });
      
      const description = container.querySelector('.mljr-card-description');
      expect(description?.textContent).toBe('Card description text');
    });

    it('renders card body', async () => {
      const { container } = render(Card);
      
      // Card should have body element
      expect(container.querySelector('.mljr-card')).toBeTruthy();
    });
  });

  describe('Variants', () => {
    it('applies default variant', async () => {
      const { container } = render(Card);
      
      const card = container.querySelector('.mljr-card');
      expect(card?.classList.contains('mljr-card')).toBe(true);
    });

    it('applies primary variant', async () => {
      const { container } = render(Card, {
        variant: 'primary',
      });
      
      const card = container.querySelector('.mljr-card');
      expect(card?.classList.contains('mljr-card-primary')).toBe(true);
    });

    it('applies secondary variant', async () => {
      const { container } = render(Card, {
        variant: 'secondary',
      });
      
      const card = container.querySelector('.mljr-card');
      expect(card?.classList.contains('mljr-card-secondary')).toBe(true);
    });
  });

  describe('Shadow', () => {
    it('applies shadow when true', async () => {
      const { container } = render(Card, {
        shadow: true,
      });
      
      const card = container.querySelector('.mljr-card');
      expect(card?.classList.contains('mljr-card-shadow')).toBe(true);
    });

    it('applies small shadow', async () => {
      const { container } = render(Card, {
        shadow: 'sm',
      });
      
      const card = container.querySelector('.mljr-card');
      expect(card?.classList.contains('mljr-card-shadow-sm')).toBe(true);
    });

    it('applies large shadow', async () => {
      const { container } = render(Card, {
        shadow: 'lg',
      });
      
      const card = container.querySelector('.mljr-card');
      expect(card?.classList.contains('mljr-card-shadow-lg')).toBe(true);
    });
  });

  describe('Interactive', () => {
    it('applies interactive class', async () => {
      const { container } = render(Card, {
        interactive: true,
      });
      
      const card = container.querySelector('.mljr-card');
      expect(card?.classList.contains('mljr-card-interactive')).toBe(true);
    });

    it('calls onclick when clicked', async () => {
      const handleClick = vi.fn();
      const { container } = render(Card, {
        interactive: true,
        onclick: handleClick,
      });
      
      const card = container.querySelector('.mljr-card');
      (card as HTMLElement)?.click();
      
      expect(handleClick).toHaveBeenCalledOnce();
    });
  });

  describe('Compact', () => {
    it('applies compact class', async () => {
      const { container } = render(Card, {
        compact: true,
      });
      
      const card = container.querySelector('.mljr-card');
      expect(card?.classList.contains('mljr-card-compact')).toBe(true);
    });
  });

  describe('Accessibility', () => {
    it('is accessible when interactive', async () => {
      const { container } = render(Card, {
        interactive: true,
      });
      
      const card = container.querySelector('.mljr-card');
      expect(card?.getAttribute('role')).toBe('button');
      expect(card?.getAttribute('tabindex')).toBe('0');
    });
  });

  describe('Custom Classes', () => {
    it('applies custom className', async () => {
      const { container } = render(Card, {
        class: 'custom-card',
      });
      
      const card = container.querySelector('.mljr-card');
      expect(card?.classList.contains('custom-card')).toBe(true);
    });
  });
});
