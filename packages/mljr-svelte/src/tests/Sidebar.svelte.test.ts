import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Sidebar from '../lib/components/navigation/Sidebar.svelte';

const categories = [
  {
    id: 'main',
    name: 'Main',
    items: [
      { id: 'dashboard', label: 'Dashboard', href: '/dashboard' },
      { id: 'profile', label: 'Profile', href: '/profile' },
    ],
  },
];

describe('Sidebar', () => {
  describe('Rendering', () => {
    it('renders sidebar element', async () => {
      const { container } = render(Sidebar, { categories });
      expect(container.querySelector('.mljr-sidebar')).toBeTruthy();
    });

    it('renders category names', async () => {
      const { container } = render(Sidebar, { categories });
      expect(container.textContent).toContain('Main');
    });

    it('renders nav items', async () => {
      const { container } = render(Sidebar, { categories });
      expect(container.textContent).toContain('Dashboard');
      expect(container.textContent).toContain('Profile');
    });
  });

  describe('Open/closed state', () => {
    it('is open by default', async () => {
      const { container } = render(Sidebar, { categories });
      const aside = container.querySelector('.mljr-sidebar');
      expect(aside?.getAttribute('data-collapsed')).toBe('false');
    });

    it('is collapsed when open=false', async () => {
      const { container } = render(Sidebar, { categories, open: false });
      const aside = container.querySelector('.mljr-sidebar');
      expect(aside?.getAttribute('data-collapsed')).toBe('true');
    });
  });
});
