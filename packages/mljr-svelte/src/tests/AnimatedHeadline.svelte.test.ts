import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import AnimatedHeadline from '../lib/components/display/AnimatedHeadline.svelte';

const words = ['hello', 'world', 'svelte'];

describe('AnimatedHeadline', () => {
  describe('Rendering', () => {
    it('renders the animated headline span', async () => {
      const { container } = render(AnimatedHeadline, { words });
      expect(container.querySelector('.mljr-animated-headline')).toBeTruthy();
    });

    it('renders the word wrapper', async () => {
      const { container } = render(AnimatedHeadline, { words });
      expect(container.querySelector('.mljr-animated-word-wrapper')).toBeTruthy();
    });

    it('renders prefix text', async () => {
      const { container } = render(AnimatedHeadline, { words, prefix: 'Hello' });
      expect(container.textContent).toContain('Hello');
    });

    it('renders suffix text', async () => {
      const { container } = render(AnimatedHeadline, { words, suffix: 'world' });
      expect(container.textContent).toContain('world');
    });
  });

  describe('Animation Types', () => {
    it('renders typing cursor for typing animation', async () => {
      const { container } = render(AnimatedHeadline, { words, animation: 'typing' });
      expect(container.querySelector('.mljr-animated-cursor')).toBeTruthy();
    });

    it('does not render cursor for fade animation', async () => {
      const { container } = render(AnimatedHeadline, { words, animation: 'fade' });
      expect(container.querySelector('.mljr-animated-cursor')).toBeNull();
    });

    it('does not render cursor for slide animation', async () => {
      const { container } = render(AnimatedHeadline, { words, animation: 'slide' });
      expect(container.querySelector('.mljr-animated-cursor')).toBeNull();
    });
  });

  describe('Highlight', () => {
    it('applies highlight class when highlight=true', async () => {
      const { container } = render(AnimatedHeadline, {
        words,
        highlight: true,
        animation: 'fade',
      });
      // For non-typing animations, highlight is applied immediately
      // Wait for first word to render
      await new Promise(r => setTimeout(r, 50));
      expect(container.querySelector('.mljr-animated-highlight')).toBeTruthy();
    });

    it('does not apply highlight class when highlight=false', async () => {
      const { container } = render(AnimatedHeadline, { words, highlight: false, animation: 'fade' });
      await new Promise(r => setTimeout(r, 50));
      expect(container.querySelector('.mljr-animated-highlight')).toBeNull();
    });
  });

  describe('Empty Words', () => {
    it('renders without crashing when words is empty', async () => {
      const { container } = render(AnimatedHeadline, { words: [] });
      expect(container.querySelector('.mljr-animated-headline')).toBeTruthy();
    });
  });
});
