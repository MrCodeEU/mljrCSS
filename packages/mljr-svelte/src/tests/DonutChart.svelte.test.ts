import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import DonutChart from '../lib/components/display/DonutChart.svelte';

const segments = [
  { label: 'Direct', value: 3200 },
  { label: 'Social', value: 2100 },
  { label: 'Organic', value: 1800 },
  { label: 'Referral', value: 900 },
];

describe('DonutChart', () => {
  describe('Rendering', () => {
    it('renders chart container', async () => {
      const { container } = render(DonutChart, { segments });
      expect(container.querySelector('.mljr-chart')).toBeTruthy();
    });

    it('renders SVG donut element', async () => {
      const { container } = render(DonutChart, { segments });
      expect(container.querySelector('svg')).toBeTruthy();
    });

    it('renders arc paths for each segment', async () => {
      const { container } = render(DonutChart, { segments });
      const paths = container.querySelectorAll('.mljr-chart-donut-segment');
      expect(paths.length).toBe(segments.length);
    });
  });

  describe('Title', () => {
    it('shows title when provided', async () => {
      const { container } = render(DonutChart, { segments, title: 'Traffic Sources' });
      expect(container.textContent).toContain('Traffic Sources');
    });

    it('does not show title element when not provided', async () => {
      const { container } = render(DonutChart, { segments });
      expect(container.querySelector('.mljr-chart-title')).toBeFalsy();
    });
  });

  describe('Center labels', () => {
    it('shows center label when provided', async () => {
      const { container } = render(DonutChart, { segments, centerLabel: '8K' });
      expect(container.textContent).toContain('8K');
    });

    it('shows center sub-label when provided', async () => {
      const { container } = render(DonutChart, { segments, centerSubLabel: 'Visits' });
      expect(container.textContent).toContain('Visits');
    });
  });

  describe('Legend', () => {
    it('shows legend by default', async () => {
      const { container } = render(DonutChart, { segments });
      expect(container.querySelector('.mljr-chart-legend')).toBeTruthy();
    });

    it('shows segment labels in legend', async () => {
      const { container } = render(DonutChart, { segments });
      expect(container.textContent).toContain('Direct');
      expect(container.textContent).toContain('Social');
    });

    it('hides legend when showLegend=false', async () => {
      const { container } = render(DonutChart, { segments, showLegend: false });
      expect(container.querySelector('.mljr-chart-legend')).toBeFalsy();
    });
  });

  describe('Custom segment colors', () => {
    it('accepts segments with custom colors', async () => {
      const { container } = render(DonutChart, {
        segments: [
          { label: 'Done', value: 68, color: '#14b8a6' },
          { label: 'Pending', value: 32, color: '#e2e8f0' },
        ],
      });
      expect(container.querySelectorAll('.mljr-chart-donut-segment').length).toBe(2);
    });
  });

  describe('Custom size', () => {
    it('accepts custom size prop', async () => {
      const { container } = render(DonutChart, { segments, size: 160 });
      const svg = container.querySelector('svg') as SVGElement;
      expect(svg).toBeTruthy();
      expect(svg.getAttribute('viewBox')).toContain('160');
    });
  });
});
