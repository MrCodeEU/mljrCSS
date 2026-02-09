import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Navbar from '../lib/components/Navbar.svelte';

describe('Navbar', () => {
  const defaultItems = [
    { label: 'Home', href: '/', icon: 'ph:house' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  describe('Rendering', () => {
    it('renders navbar element', async () => {
      const { container } = render(Navbar, {
        items: defaultItems,
      });
      
      expect(container.querySelector('.mljr-navbar')).toBeTruthy();
    });

    it('renders all navigation items', async () => {
      const { container } = render(Navbar, {
        items: defaultItems,
      });
      
      const navLinks = container.querySelectorAll('.mljr-navbar-link');
      expect(navLinks.length).toBe(3);
    });

    it('displays correct labels', async () => {
      const { container } = render(Navbar, {
        items: defaultItems,
      });
      
      expect(container.textContent).toContain('Home');
      expect(container.textContent).toContain('About');
      expect(container.textContent).toContain('Contact');
    });

    it('applies active class to active item', async () => {
      const items = [
        { label: 'Home', href: '/', active: false },
        { label: 'About', href: '/about', active: true },
      ];
      
      const { container } = render(Navbar, { items });
      
      const activeLink = container.querySelector('.mljr-navbar-link-active');
      expect(activeLink?.textContent).toContain('About');
    });
  });

  describe('Variants', () => {
    it('applies transparent variant', async () => {
      const { container } = render(Navbar, {
        items: defaultItems,
        variant: 'transparent',
      });
      
      expect(container.querySelector('.mljr-navbar-transparent')).toBeTruthy();
    });

    it('applies sticky variant', async () => {
      const { container } = render(Navbar, {
        items: defaultItems,
        variant: 'sticky',
      });
      
      expect(container.querySelector('.mljr-navbar-sticky')).toBeTruthy();
    });

    it('applies fixed variant', async () => {
      const { container } = render(Navbar, {
        items: defaultItems,
        fixed: true,
      });
      
      expect(container.querySelector('.mljr-navbar-fixed')).toBeTruthy();
    });
  });

  describe('Mobile Menu', () => {
    it('renders mobile toggle button', async () => {
      const { container } = render(Navbar, {
        items: defaultItems,
        showMenuToggle: true,
      });
      
      expect(container.querySelector('.mljr-navbar-toggle')).toBeTruthy();
    });

    it('toggle button has correct aria attributes', async () => {
      const { container } = render(Navbar, {
        items: defaultItems,
        showMenuToggle: true,
      });
      
      const toggle = container.querySelector('.mljr-navbar-toggle');
      expect(toggle?.getAttribute('aria-label')).toBe('Toggle menu');
      expect(toggle?.getAttribute('aria-expanded')).toBe('false');
    });
  });

  describe('Dropdown Menu', () => {
    it('renders items with children', async () => {
      const itemsWithChildren = [
        {
          label: 'Products',
          href: '/products',
          children: [
            { label: 'Product 1', href: '/products/1' },
            { label: 'Product 2', href: '/products/2' },
          ],
        },
      ];
      
      const { container } = render(Navbar, { items: itemsWithChildren });
      
      expect(container.querySelector('.mljr-navbar-dropdown')).toBeTruthy();
    });

    it('renders correct number of dropdown items', async () => {
      const itemsWithChildren = [
        {
          label: 'Products',
          href: '/products',
          children: [
            { label: 'Product 1', href: '/products/1' },
            { label: 'Product 2', href: '/products/2' },
          ],
        },
      ];
      
      const { container } = render(Navbar, { items: itemsWithChildren });
      
      const dropdownLinks = container.querySelectorAll('.mljr-navbar-dropdown-link');
      expect(dropdownLinks.length).toBe(2);
    });
  });

  describe('Accessibility', () => {
    it('has proper landmark role', async () => {
      const { container } = render(Navbar, {
        items: defaultItems,
      });
      
      expect(container.querySelector('header')).toBeTruthy();
    });

    it('has navigation landmark', async () => {
      const { container } = render(Navbar, {
        items: defaultItems,
      });
      
      expect(container.querySelector('nav')).toBeTruthy();
    });

    it('links have href attributes', async () => {
      const { container } = render(Navbar, {
        items: defaultItems,
      });
      
      const firstLink = container.querySelector('.mljr-navbar-link');
      expect(firstLink?.getAttribute('href')).toBe('/');
    });
  });

  describe('External Links', () => {
    it('adds target and rel for external links', async () => {
      const items = [
        { label: 'GitHub', href: 'https://github.com', external: true },
      ];
      
      const { container } = render(Navbar, { items });
      
      const link = container.querySelector('.mljr-navbar-link');
      expect(link?.getAttribute('target')).toBe('_blank');
      expect(link?.getAttribute('rel')).toBe('noopener noreferrer');
    });
  });
});
