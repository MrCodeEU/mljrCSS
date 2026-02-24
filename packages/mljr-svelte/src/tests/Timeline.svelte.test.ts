import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Timeline from '../lib/components/display/Timeline.svelte';

describe('Timeline', () => {
  const defaultItems = [
    { title: 'Project Started', description: 'Initial commit', date: '2024-01-01' },
    { title: 'Beta Release', description: 'First public beta', date: '2024-03-15' },
    { title: 'v1.0 Launch', description: 'Official launch', date: '2024-06-01' },
  ];

  describe('Rendering', () => {
    it('renders timeline element', async () => {
      const { container } = render(Timeline, { items: defaultItems });
      expect(container.querySelector('.mljr-timeline')).toBeTruthy();
    });

    it('renders all timeline items', async () => {
      const { container } = render(Timeline, { items: defaultItems });
      const items = container.querySelectorAll('.mljr-timeline-item');
      expect(items.length).toBe(3);
    });

    it('renders item titles', async () => {
      const { container } = render(Timeline, { items: defaultItems });
      expect(container.textContent).toContain('Project Started');
      expect(container.textContent).toContain('Beta Release');
      expect(container.textContent).toContain('v1.0 Launch');
    });

    it('renders item descriptions', async () => {
      const { container } = render(Timeline, { items: defaultItems });
      expect(container.textContent).toContain('Initial commit');
      expect(container.textContent).toContain('Official launch');
    });

    it('renders dates', async () => {
      const { container } = render(Timeline, { items: defaultItems });
      expect(container.textContent).toContain('2024-01-01');
    });
  });

  describe('Markers', () => {
    it('renders timeline markers', async () => {
      const { container } = render(Timeline, { items: defaultItems });
      const markers = container.querySelectorAll('.mljr-timeline-marker');
      expect(markers.length).toBe(3);
    });
  });

  describe('Custom class', () => {
    it('applies custom class', async () => {
      const { container } = render(Timeline, { items: defaultItems, class: 'my-timeline' });
      expect(container.querySelector('.my-timeline')).toBeTruthy();
    });
  });
});
