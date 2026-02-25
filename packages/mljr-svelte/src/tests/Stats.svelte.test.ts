import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import Stats from '../lib/components/display/Stats.svelte';

describe('Stats', () => {
  describe('Rendering', () => {
    it('renders stats element', async () => {
      const { container } = render(Stats, { label: 'Total Users', value: 1234 });
      expect(container.querySelector('.mljr-stats')).toBeTruthy();
    });

    it('renders value', async () => {
      const { container } = render(Stats, { label: 'Revenue', value: '$9,800' });
      expect(container.textContent).toContain('$9,800');
    });

    it('renders label', async () => {
      const { container } = render(Stats, { label: 'Active Sessions', value: 42 });
      expect(container.textContent).toContain('Active Sessions');
    });

    it('renders description when provided', async () => {
      const { container } = render(Stats, {
        label: 'Orders',
        value: 120,
        description: 'Last 30 days',
      });
      expect(container.textContent).toContain('Last 30 days');
    });
  });

  describe('Trends', () => {
    it('renders trend up indicator', async () => {
      const { container } = render(Stats, {
        label: 'Sales',
        value: 500,
        trend: 'up',
        trendValue: '+12%',
      });
      expect(container.textContent).toContain('+12%');
    });

    it('renders trend down indicator', async () => {
      const { container } = render(Stats, {
        label: 'Bounce Rate',
        value: '45%',
        trend: 'down',
        trendValue: '-3%',
      });
      expect(container.textContent).toContain('-3%');
    });
  });

  describe('Variants', () => {
    const variants = ['primary', 'secondary', 'success', 'warning', 'error'] as const;

    variants.forEach((variant) => {
      it(`applies ${variant} variant`, async () => {
        const { container } = render(Stats, { label: 'Test', value: 0, variant });
        expect(container.querySelector(`.mljr-stats-${variant}`)).toBeTruthy();
      });
    });
  });
});
