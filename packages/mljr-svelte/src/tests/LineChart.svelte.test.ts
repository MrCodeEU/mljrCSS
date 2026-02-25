import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import LineChart from '../lib/components/display/LineChart.svelte';

const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
const datasets = [
  { label: 'Users', data: [1200, 1800, 1400, 2200, 2600, 3100], filled: true },
  { label: 'Sessions', data: [1800, 2600, 2100, 3100, 3800, 4600], filled: false },
];

describe('LineChart', () => {
  describe('Rendering', () => {
    it('renders chart container', async () => {
      const { container } = render(LineChart, { labels, datasets });
      expect(container.querySelector('.mljr-chart')).toBeTruthy();
    });

    it('renders SVG element', async () => {
      const { container } = render(LineChart, { labels, datasets });
      expect(container.querySelector('svg')).toBeTruthy();
    });

    it('renders x-axis labels', async () => {
      const { container } = render(LineChart, { labels, datasets });
      expect(container.textContent).toContain('Jan');
      expect(container.textContent).toContain('Jun');
    });
  });

  describe('Title', () => {
    it('shows title when provided', async () => {
      const { container } = render(LineChart, { labels, datasets, title: 'Traffic Overview' });
      expect(container.textContent).toContain('Traffic Overview');
    });

    it('does not show title element when not provided', async () => {
      const { container } = render(LineChart, { labels, datasets });
      expect(container.querySelector('.mljr-chart-title')).toBeFalsy();
    });
  });

  describe('Legend', () => {
    it('shows legend by default', async () => {
      const { container } = render(LineChart, { labels, datasets });
      expect(container.querySelector('.mljr-chart-legend')).toBeTruthy();
    });

    it('shows dataset names in legend', async () => {
      const { container } = render(LineChart, { labels, datasets });
      expect(container.textContent).toContain('Users');
      expect(container.textContent).toContain('Sessions');
    });

    it('hides legend when showLegend=false', async () => {
      const { container } = render(LineChart, { labels, datasets, showLegend: false });
      expect(container.querySelector('.mljr-chart-legend')).toBeFalsy();
    });
  });

  describe('Single dataset', () => {
    it('renders with a single filled dataset', async () => {
      const { container } = render(LineChart, {
        labels,
        datasets: [{ label: 'MAU', data: [820, 1140, 980, 1560, 1890, 2340], filled: true }],
      });
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });

  describe('Custom height', () => {
    it('accepts custom height prop', async () => {
      const { container } = render(LineChart, { labels, datasets, height: 400 });
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
