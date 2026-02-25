import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import Calendar from '../lib/components/display/Calendar.svelte';

describe('Calendar', () => {
  describe('Rendering', () => {
    it('renders calendar container', async () => {
      const { container } = render(Calendar);
      expect(container.querySelector('.mljr-calendar')).toBeTruthy();
    });

    it('renders calendar header', async () => {
      const { container } = render(Calendar);
      expect(container.querySelector('.mljr-calendar-header')).toBeTruthy();
    });

    it('renders calendar title', async () => {
      const { container } = render(Calendar, { month: 0, year: 2026 });
      const title = container.querySelector('.mljr-calendar-title');
      expect(title?.textContent).toContain('January 2026');
    });

    it('renders navigation buttons', async () => {
      const { container } = render(Calendar);
      const navBtns = container.querySelectorAll('.mljr-calendar-nav-btn');
      expect(navBtns.length).toBe(2);
    });

    it('renders 7 weekday headers', async () => {
      const { container } = render(Calendar);
      const weekdays = container.querySelectorAll('.mljr-calendar-weekday');
      expect(weekdays.length).toBe(7);
    });

    it('renders day cells for the month', async () => {
      const { container } = render(Calendar, { month: 0, year: 2026 }); // January has 31 days
      const days = container.querySelectorAll('.mljr-calendar-day:not(.mljr-calendar-day-empty)');
      expect(days.length).toBe(31);
    });
  });

  describe('Month navigation', () => {
    it('shows correct month name and year', async () => {
      const { container } = render(Calendar, { month: 5, year: 2025 });
      const title = container.querySelector('.mljr-calendar-title');
      expect(title?.textContent).toContain('June 2025');
    });

    it('navigates to next month on next button click', async () => {
      const { container } = render(Calendar, { month: 0, year: 2026 });
      const [, nextBtn] = container.querySelectorAll('.mljr-calendar-nav-btn');
      (nextBtn as HTMLButtonElement).click();
      await Promise.resolve();
      const title = container.querySelector('.mljr-calendar-title');
      expect(title?.textContent).toContain('February 2026');
    });

    it('navigates to previous month on prev button click', async () => {
      const { container } = render(Calendar, { month: 1, year: 2026 });
      const [prevBtn] = container.querySelectorAll('.mljr-calendar-nav-btn');
      (prevBtn as HTMLButtonElement).click();
      await Promise.resolve();
      const title = container.querySelector('.mljr-calendar-title');
      expect(title?.textContent).toContain('January 2026');
    });
  });

  describe('Today highlight', () => {
    it('marks today with the today class', async () => {
      const now = new Date();
      const { container } = render(Calendar, { month: now.getMonth(), year: now.getFullYear() });
      const todayCell = container.querySelector('.mljr-calendar-day-today');
      expect(todayCell).toBeTruthy();
    });
  });

  describe('Selection', () => {
    it('marks selected date with selected class', async () => {
      const { container } = render(Calendar, { value: '2026-01-15', month: 0, year: 2026 });
      const selected = container.querySelector('.mljr-calendar-day-selected');
      expect(selected).toBeTruthy();
    });
  });

  describe('Disabled dates', () => {
    it('disables days before min date', async () => {
      const { container } = render(Calendar, { min: '2026-01-15', month: 0, year: 2026 });
      // Day 14 should be disabled (before min)
      const disabledDays = container.querySelectorAll('.mljr-calendar-day-disabled');
      expect(disabledDays.length).toBeGreaterThan(0);
    });
  });

  describe('Events', () => {
    it('renders event dots for dates with events', async () => {
      const events = [{ date: '2026-01-10', label: 'Team meeting' }];
      // `events` is a reserved key in the Svelte 5 mount API (event handlers);
      // must be passed under `props` to avoid being interpreted as listeners.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { container } = render(Calendar, { props: { events, month: 0, year: 2026 } } as any);
      const dots = container.querySelectorAll('.mljr-calendar-event-dot');
      expect(dots.length).toBeGreaterThan(0);
    });
  });

  describe('Custom class', () => {
    it('applies custom class', async () => {
      const { container } = render(Calendar, { class: 'my-calendar' });
      expect(container.querySelector('.mljr-calendar.my-calendar')).toBeTruthy();
    });
  });
});
