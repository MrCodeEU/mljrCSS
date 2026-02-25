import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import Gauge from '../lib/components/display/Gauge.svelte';

describe('Gauge', () => {
  describe('Rendering', () => {
    it('renders gauge container', async () => {
      const { container } = render(Gauge);
      expect(container.querySelector('.mljr-gauge')).toBeTruthy();
    });

    it('renders SVG element', async () => {
      const { container } = render(Gauge);
      expect(container.querySelector('.mljr-gauge-svg')).toBeTruthy();
    });

    it('renders track circle', async () => {
      const { container } = render(Gauge);
      expect(container.querySelector('.mljr-gauge-track')).toBeTruthy();
    });

    it('renders fill circle', async () => {
      const { container } = render(Gauge);
      expect(container.querySelector('.mljr-gauge-fill')).toBeTruthy();
    });
  });

  describe('Value display', () => {
    it('shows value in SVG text by default', async () => {
      const { container } = render(Gauge, { value: 75, max: 100 });
      expect(container.textContent).toContain('75');
    });

    it('shows unit alongside value', async () => {
      const { container } = render(Gauge, { value: 60, unit: '%' });
      expect(container.textContent).toContain('60%');
    });

    it('hides value when showValue is false', async () => {
      const { container } = render(Gauge, { value: 42, showValue: false });
      expect(container.querySelector('text')).toBeNull();
    });
  });

  describe('Label', () => {
    it('shows label when provided', async () => {
      const { container } = render(Gauge, { label: 'Speed' });
      const labelEl = container.querySelector('.mljr-gauge-label');
      expect(labelEl).toBeTruthy();
      expect(labelEl?.textContent).toBe('Speed');
    });

    it('does not render label element when not provided', async () => {
      const { container } = render(Gauge);
      expect(container.querySelector('.mljr-gauge-label')).toBeNull();
    });
  });

  describe('Arc variants', () => {
    it('renders half arc by default', async () => {
      const { container } = render(Gauge, { arc: 'half', size: 200 });
      const svg = container.querySelector('.mljr-gauge-svg');
      expect(svg).toBeTruthy();
    });

    it('renders full arc variant', async () => {
      const { container } = render(Gauge, { arc: 'full', size: 200 });
      const svg = container.querySelector('.mljr-gauge-svg');
      expect(svg).toBeTruthy();
    });
  });

  describe('Custom class', () => {
    it('applies custom class to container', async () => {
      const { container } = render(Gauge, { class: 'my-gauge' });
      expect(container.querySelector('.mljr-gauge.my-gauge')).toBeTruthy();
    });
  });

  describe('Size', () => {
    it('uses size prop for SVG width', async () => {
      const { container } = render(Gauge, { size: 150 });
      const svg = container.querySelector('.mljr-gauge-svg') as SVGSVGElement;
      expect(svg?.getAttribute('width')).toBe('150');
    });
  });
});
