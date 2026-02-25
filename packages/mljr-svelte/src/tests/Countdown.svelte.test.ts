import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import Countdown from '../lib/components/display/Countdown.svelte';

describe('Countdown', () => {
  describe('Rendering', () => {
    it('renders countdown element', async () => {
      const future = new Date(Date.now() + 1000 * 60 * 60 * 24);
      const { container } = render(Countdown, { targetDate: future });
      expect(container.querySelector('.mljr-countdown')).toBeTruthy();
    });

    it('shows time units', async () => {
      const future = new Date(Date.now() + 1000 * 60 * 60 * 24);
      const { container } = render(Countdown, { targetDate: future });
      expect(container.querySelectorAll('.mljr-countdown-unit').length).toBeGreaterThan(0);
    });

    it('shows labels by default', async () => {
      const future = new Date(Date.now() + 1000 * 60 * 60 * 24);
      const { container } = render(Countdown, { targetDate: future, showLabels: true });
      expect(container.querySelector('.mljr-countdown-label')).toBeTruthy();
    });

    it('hides labels when showLabels is false', async () => {
      const future = new Date(Date.now() + 1000 * 60 * 60 * 24);
      const { container } = render(Countdown, { targetDate: future, showLabels: false });
      expect(container.querySelector('.mljr-countdown-label')).toBeFalsy();
    });

    it('shows complete message when time has passed', async () => {
      const past = new Date(Date.now() - 1000);
      const { container } = render(Countdown, {
        targetDate: past,
        completeMessage: 'Time is up!',
      });
      expect(container.textContent).toContain('Time is up!');
    });
  });

  describe('Variants', () => {
    it('applies compact variant class', async () => {
      const future = new Date(Date.now() + 1000 * 60 * 60);
      const { container } = render(Countdown, { targetDate: future, variant: 'compact' });
      expect(container.querySelector('.mljr-countdown-compact')).toBeTruthy();
    });

    it('applies card variant class', async () => {
      const future = new Date(Date.now() + 1000 * 60 * 60);
      const { container } = render(Countdown, { targetDate: future, variant: 'card' });
      expect(container.querySelector('.mljr-countdown-card')).toBeTruthy();
    });

    it('applies minimal variant class', async () => {
      const future = new Date(Date.now() + 1000 * 60 * 60);
      const { container } = render(Countdown, { targetDate: future, variant: 'minimal' });
      expect(container.querySelector('.mljr-countdown-minimal')).toBeTruthy();
    });
  });

  describe('Unit visibility', () => {
    it('hides days when showDays is false', async () => {
      const future = new Date(Date.now() + 1000 * 60 * 60);
      const { container } = render(Countdown, {
        targetDate: future,
        showDays: false,
        showLabels: true,
      });
      expect(container.textContent).not.toContain('Days');
    });
  });
});
