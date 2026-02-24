import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Rating from '../lib/components/forms/Rating.svelte';

describe('Rating', () => {
  describe('Rendering', () => {
    it('renders rating element', async () => {
      const { container } = render(Rating);
      expect(container.querySelector('.mljr-rating')).toBeTruthy();
    });

    it('renders correct number of stars (default max=5)', async () => {
      const { container } = render(Rating);
      const stars = container.querySelectorAll('.mljr-rating-star');
      expect(stars.length).toBe(5);
    });

    it('renders correct number of stars with custom max', async () => {
      const { container } = render(Rating, { max: 10 });
      const stars = container.querySelectorAll('.mljr-rating-star');
      expect(stars.length).toBe(10);
    });

    it('applies readonly class when readonly=true', async () => {
      const { container } = render(Rating, { readonly: true });
      expect(container.querySelector('.mljr-rating-readonly')).toBeTruthy();
    });
  });

  describe('Sizes', () => {
    it('applies sm size class', async () => {
      const { container } = render(Rating, { size: 'sm' });
      expect(container.querySelector('.mljr-rating-sm')).toBeTruthy();
    });

    it('applies lg size class', async () => {
      const { container } = render(Rating, { size: 'lg' });
      expect(container.querySelector('.mljr-rating-lg')).toBeTruthy();
    });
  });

  describe('Value display', () => {
    it('shows value when showValue=true', async () => {
      const { container } = render(Rating, { value: 3, showValue: true });
      expect(container.textContent).toContain('3');
    });
  });

  describe('Active stars', () => {
    it('marks correct stars as active based on value', async () => {
      const { container } = render(Rating, { value: 3 });
      const activeStars = container.querySelectorAll('.mljr-rating-star.active');
      expect(activeStars.length).toBe(3);
    });
  });

  describe('Interaction', () => {
    it('calls onchange when star is clicked', async () => {
      const handleChange = vi.fn();
      const { container } = render(Rating, { onchange: handleChange });
      const stars = container.querySelectorAll('.mljr-rating-star');
      (stars[2] as HTMLElement)?.click();
      expect(handleChange).toHaveBeenCalledWith(3);
    });

    it('does not call onchange when readonly', async () => {
      const handleChange = vi.fn();
      const { container } = render(Rating, { readonly: true, onchange: handleChange });
      const stars = container.querySelectorAll('.mljr-rating-star');
      (stars[2] as HTMLElement)?.click();
      expect(handleChange).not.toHaveBeenCalled();
    });
  });
});
