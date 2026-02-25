import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import MapEmbed from '../lib/components/display/MapEmbed.svelte';

describe('MapEmbed', () => {
  describe('Rendering', () => {
    it('renders the map container', async () => {
      const { container } = render(MapEmbed, {});
      expect(container.querySelector('.mljr-map')).toBeTruthy();
    });

    it('renders the iframe', async () => {
      const { container } = render(MapEmbed, {});
      expect(container.querySelector('iframe')).toBeTruthy();
    });

    it('renders loading indicator before iframe loads', async () => {
      const { container } = render(MapEmbed, {});
      expect(container.querySelector('.mljr-map-loading')).toBeTruthy();
    });

    it('sets custom height via inline style', async () => {
      const { container } = render(MapEmbed, { height: '400px' });
      const map = container.querySelector('.mljr-map') as HTMLElement;
      expect(map?.style.height).toBe('400px');
    });
  });

  describe('OpenStreetMap URL', () => {
    it('includes openstreetmap.org in iframe src for lat/lon', async () => {
      const { container } = render(MapEmbed, { lat: 48.2082, lon: 16.3738, zoom: 13 });
      const iframe = container.querySelector('iframe') as HTMLIFrameElement;
      expect(iframe?.src).toContain('openstreetmap.org');
    });

    it('includes marker parameter when lat/lon provided', async () => {
      const { container } = render(MapEmbed, { lat: 48.2082, lon: 16.3738, zoom: 13 });
      const iframe = container.querySelector('iframe') as HTMLIFrameElement;
      expect(iframe?.src).toContain('marker=');
    });

    it('includes bbox parameter in world overview (no lat/lon)', async () => {
      const { container } = render(MapEmbed, {});
      const iframe = container.querySelector('iframe') as HTMLIFrameElement;
      expect(iframe?.src).toContain('bbox=');
    });
  });

  describe('Rounded variants', () => {
    it('applies rounded-lg class when rounded="lg"', async () => {
      const { container } = render(MapEmbed, { rounded: 'lg' });
      expect(container.querySelector('.mljr-map-rounded')).toBeTruthy();
    });

    it('applies square class when rounded="square"', async () => {
      const { container } = render(MapEmbed, { rounded: 'square' });
      expect(container.querySelector('.mljr-map-square')).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('sets aria-label on iframe', async () => {
      const { container } = render(MapEmbed, { label: 'Vienna City Center' });
      const iframe = container.querySelector('iframe');
      expect(iframe?.getAttribute('aria-label')).toBe('Vienna City Center');
    });

    it('sets title on iframe', async () => {
      const { container } = render(MapEmbed, { label: 'Test Location' });
      const iframe = container.querySelector('iframe');
      expect(iframe?.getAttribute('title')).toBe('Test Location');
    });
  });
});
