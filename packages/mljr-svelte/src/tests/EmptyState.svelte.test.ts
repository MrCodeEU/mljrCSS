import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import EmptyState from '../lib/components/feedback/EmptyState.svelte';

describe('EmptyState', () => {
  describe('Rendering', () => {
    it('renders empty state element', async () => {
      const { container } = render(EmptyState);
      expect(container.querySelector('.mljr-empty-state')).toBeTruthy();
    });

    it('renders title when provided', async () => {
      const { container } = render(EmptyState, { title: 'No results found' });
      expect(container.querySelector('.mljr-empty-state-title')?.textContent).toContain('No results found');
    });

    it('renders description when provided', async () => {
      const { container } = render(EmptyState, { description: 'Try a different search' });
      expect(container.querySelector('.mljr-empty-state-description')?.textContent).toContain('Try a different search');
    });

    it('renders icon element', async () => {
      const { container } = render(EmptyState, { icon: '🔍' });
      expect(container.querySelector('.mljr-empty-state-icon')).toBeTruthy();
    });
  });

  describe('Variants', () => {
    const variants = ['primary', 'secondary', 'accent', 'success', 'warning', 'error'] as const;
    variants.forEach((variant) => {
      it(`applies ${variant} variant class`, async () => {
        const { container } = render(EmptyState, { variant });
        expect(container.querySelector(`.mljr-empty-state-${variant}`)).toBeTruthy();
      });
    });
  });

  describe('Options', () => {
    it('applies compact class when compact=true', async () => {
      const { container } = render(EmptyState, { compact: true });
      expect(container.querySelector('.mljr-empty-state-compact')).toBeTruthy();
    });

    it('applies bordered class when bordered=true', async () => {
      const { container } = render(EmptyState, { bordered: true });
      expect(container.querySelector('.mljr-empty-state-bordered')).toBeTruthy();
    });

    it('applies card class when card=true', async () => {
      const { container } = render(EmptyState, { card: true });
      expect(container.querySelector('.mljr-empty-state-card')).toBeTruthy();
    });

    it('applies sm size class', async () => {
      const { container } = render(EmptyState, { size: 'sm' });
      expect(container.querySelector('.mljr-empty-state-sm')).toBeTruthy();
    });

    it('applies lg size class', async () => {
      const { container } = render(EmptyState, { size: 'lg' });
      expect(container.querySelector('.mljr-empty-state-lg')).toBeTruthy();
    });
  });
});
