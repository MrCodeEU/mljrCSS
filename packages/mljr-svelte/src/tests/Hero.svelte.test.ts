import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Hero from '../lib/components/layout/Hero.svelte';

describe('Hero', () => {
  describe('Rendering', () => {
    it('renders hero element', async () => {
      const { container } = render(Hero);
      expect(container.querySelector('.mljr-hero')).toBeTruthy();
    });

    it('renders title when provided', async () => {
      const { container } = render(Hero, { title: 'Welcome to MLJR' });
      expect(container.querySelector('.mljr-hero-title')?.textContent).toContain('Welcome to MLJR');
    });

    it('renders subtitle when provided', async () => {
      const { container } = render(Hero, { subtitle: 'Beautiful UI components' });
      expect(container.querySelector('.mljr-hero-subtitle')?.textContent).toContain('Beautiful UI components');
    });
  });

  describe('Variants', () => {
    it('applies centered variant class', async () => {
      const { container } = render(Hero, { variant: 'centered' });
      expect(container.querySelector('.mljr-hero-centered')).toBeTruthy();
    });

    it('applies split variant class', async () => {
      const { container } = render(Hero, { variant: 'split' });
      expect(container.querySelector('.mljr-hero-split')).toBeTruthy();
    });

    it('applies minimal variant class', async () => {
      const { container } = render(Hero, { variant: 'minimal' });
      expect(container.querySelector('.mljr-hero-minimal')).toBeTruthy();
    });
  });

  describe('Gradient', () => {
    it('applies gradient style when gradient=true', async () => {
      const { container } = render(Hero, { gradient: true });
      const hero = container.querySelector('.mljr-hero') as HTMLElement;
      expect(hero?.style.background).toBeTruthy();
    });
  });
});
