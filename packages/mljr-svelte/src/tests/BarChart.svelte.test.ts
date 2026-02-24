import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import BarChart from '../lib/components/display/BarChart.svelte';

const labels = ['Jan', 'Feb', 'Mar', 'Apr'];
const datasets = [
  { label: 'Revenue', data: [42, 58, 51, 67] },
  { label: 'Costs', data: [31, 35, 33, 40] },
];

describe('BarChart', () => {
  describe('Rendering', () => {
    it('renders chart container', async () => {
      const { container } = render(BarChart, { labels, datasets });
      expect(container.querySelector('.mljr-chart')).toBeTruthy();
    });

    it('renders SVG element', async () => {
      const { container } = render(BarChart, { labels, datasets });
      expect(container.querySelector('svg')).toBeTruthy();
    });

    it('renders x-axis labels', async () => {
      const { container } = render(BarChart, { labels, datasets });
      expect(container.textContent).toContain('Jan');
      expect(container.textContent).toContain('Feb');
    });
  });

  describe('Title', () => {
    it('shows title when provided', async () => {
      const { container } = render(BarChart, { labels, datasets, title: 'Monthly Revenue' });
      expect(container.textContent).toContain('Monthly Revenue');
    });

    it('does not show title when not provided', async () => {
      const { container } = render(BarChart, { labels, datasets });
      expect(container.querySelector('.mljr-chart-title')).toBeFalsy();
    });
  });

  describe('Legend', () => {
    it('shows legend by default', async () => {
      const { container } = render(BarChart, { labels, datasets });
      expect(container.querySelector('.mljr-chart-legend')).toBeTruthy();
    });

    it('shows dataset labels in legend', async () => {
      const { container } = render(BarChart, { labels, datasets });
      expect(container.textContent).toContain('Revenue');
      expect(container.textContent).toContain('Costs');
    });

    it('hides legend when showLegend=false', async () => {
      const { container } = render(BarChart, { labels, datasets, showLegend: false });
      expect(container.querySelector('.mljr-chart-legend')).toBeFalsy();
    });
  });

  describe('Single dataset', () => {
    it('renders with a single dataset', async () => {
      const { container } = render(BarChart, {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        datasets: [{ label: 'Sales', data: [45, 72, 63, 91] }],
      });
      expect(container.querySelector('svg')).toBeTruthy();
      expect(container.textContent).toContain('Q1');
    });
  });

  describe('Custom color', () => {
    it('accepts dataset with custom color', async () => {
      const { container } = render(BarChart, {
        labels,
        datasets: [{ label: 'Data', data: [10, 20, 30, 40], color: '#ff0000' }],
      });
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
