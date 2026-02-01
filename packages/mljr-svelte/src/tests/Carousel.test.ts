import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import Carousel from '../lib/components/Carousel.svelte';

describe('Carousel', () => {
  const mockItems = [
    { id: '1', content: () => 'Slide 1' },
    { id: '2', content: () => 'Slide 2' },
    { id: '3', content: () => 'Slide 3' },
  ];

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Rendering', () => {
    it('renders all slides', () => {
      const { container } = render(Carousel, {
        props: { items: mockItems },
      });
      const slides = container.querySelectorAll('.mljr-carousel-item');
      expect(slides).toHaveLength(3);
    });

    it('renders navigation buttons by default', () => {
      const { container } = render(Carousel, {
        props: { items: mockItems },
      });
      const prevBtn = container.querySelector('.mljr-carousel-btn-prev');
      const nextBtn = container.querySelector('.mljr-carousel-btn-next');
      expect(prevBtn).toBeInTheDocument();
      expect(nextBtn).toBeInTheDocument();
    });

    it('hides navigation buttons when showControls is false', () => {
      const { container } = render(Carousel, {
        props: { items: mockItems, showControls: false },
      });
      const prevBtn = container.querySelector('.mljr-carousel-btn-prev');
      const nextBtn = container.querySelector('.mljr-carousel-btn-next');
      expect(prevBtn).not.toBeInTheDocument();
      expect(nextBtn).not.toBeInTheDocument();
    });

    it('renders indicators by default', () => {
      const { container } = render(Carousel, {
        props: { items: mockItems },
      });
      const indicators = container.querySelectorAll('.mljr-carousel-indicator');
      expect(indicators).toHaveLength(3);
    });

    it('hides indicators when showIndicators is false', () => {
      const { container } = render(Carousel, {
        props: { items: mockItems, showIndicators: false },
      });
      const indicators = container.querySelectorAll('.mljr-carousel-indicator');
      expect(indicators).toHaveLength(0);
    });

    it('applies variant classes', () => {
      const { container } = render(Carousel, {
        props: { items: mockItems, variant: 'fade' },
      });
      const carousel = container.querySelector('.mljr-carousel');
      expect(carousel).toHaveClass('mljr-carousel-fade');
    });
  });

  describe('Navigation', () => {
    it('moves to next slide on next button click', async () => {
      const user = userEvent.setup({ delay: null });
      const { container } = render(Carousel, {
        props: { items: mockItems },
      });
      const nextBtn = container.querySelector('.mljr-carousel-btn-next')!;
      const indicators = container.querySelectorAll('.mljr-carousel-indicator');

      expect(indicators[0]).toHaveClass('active');
      await user.click(nextBtn);
      expect(indicators[1]).toHaveClass('active');
    });

    it('moves to previous slide on prev button click', async () => {
      const user = userEvent.setup({ delay: null });
      const { container } = render(Carousel, {
        props: { items: mockItems },
      });
      const nextBtn = container.querySelector('.mljr-carousel-btn-next')!;
      const prevBtn = container.querySelector('.mljr-carousel-btn-prev')!;
      const indicators = container.querySelectorAll('.mljr-carousel-indicator');

      await user.click(nextBtn);
      expect(indicators[1]).toHaveClass('active');
      await user.click(prevBtn);
      expect(indicators[0]).toHaveClass('active');
    });

    it('navigates to specific slide via indicator', async () => {
      const user = userEvent.setup({ delay: null });
      const { container } = render(Carousel, {
        props: { items: mockItems },
      });
      const indicators = container.querySelectorAll('.mljr-carousel-indicator');

      await user.click(indicators[2]);
      expect(indicators[2]).toHaveClass('active');
    });

    it('loops to first slide when at end and loop is true', async () => {
      const user = userEvent.setup({ delay: null });
      const { container } = render(Carousel, {
        props: { items: mockItems, loop: true },
      });
      const nextBtn = container.querySelector('.mljr-carousel-btn-next')!;
      const indicators = container.querySelectorAll('.mljr-carousel-indicator');

      await user.click(nextBtn);
      await user.click(nextBtn);
      expect(indicators[2]).toHaveClass('active');
      await user.click(nextBtn);
      expect(indicators[0]).toHaveClass('active');
    });

    it('does not loop when loop is false', async () => {
      const user = userEvent.setup({ delay: null });
      const { container } = render(Carousel, {
        props: { items: mockItems, loop: false },
      });
      const nextBtn = container.querySelector('.mljr-carousel-btn-next')!;
      const indicators = container.querySelectorAll('.mljr-carousel-indicator');

      await user.click(nextBtn);
      await user.click(nextBtn);
      expect(indicators[2]).toHaveClass('active');
      await user.click(nextBtn);
      expect(indicators[2]).toHaveClass('active');
    });
  });

  describe('Keyboard Navigation', () => {
    it('navigates with arrow keys', async () => {
      const user = userEvent.setup({ delay: null });
      const { container } = render(Carousel, {
        props: { items: mockItems },
      });
      const carousel = container.querySelector('.mljr-carousel')!;
      const indicators = container.querySelectorAll('.mljr-carousel-indicator');

      carousel.focus();
      await user.keyboard('{ArrowRight}');
      expect(indicators[1]).toHaveClass('active');

      await user.keyboard('{ArrowLeft}');
      expect(indicators[0]).toHaveClass('active');
    });
  });

  describe('Autoplay', () => {
    it('auto advances slides when autoplay is enabled', () => {
      const { container } = render(Carousel, {
        props: { items: mockItems, autoplay: true, interval: 1000 },
      });
      const indicators = container.querySelectorAll('.mljr-carousel-indicator');

      expect(indicators[0]).toHaveClass('active');
      vi.advanceTimersByTime(1000);
      expect(indicators[1]).toHaveClass('active');
    });

    it('resets autoplay timer on manual navigation', async () => {
      const user = userEvent.setup({ delay: null });
      const { container } = render(Carousel, {
        props: { items: mockItems, autoplay: true, interval: 1000 },
      });
      const nextBtn = container.querySelector('.mljr-carousel-btn-next')!;

      vi.advanceTimersByTime(500);
      await user.click(nextBtn);
      vi.advanceTimersByTime(500);
      // Should not have advanced yet since timer was reset
      const indicators = container.querySelectorAll('.mljr-carousel-indicator');
      expect(indicators[1]).toHaveClass('active');
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA labels', () => {
      const { container } = render(Carousel, {
        props: { items: mockItems },
      });
      const carousel = container.querySelector('.mljr-carousel');
      expect(carousel).toHaveAttribute('role', 'region');
      expect(carousel).toHaveAttribute('aria-label', 'Carousel');
    });

    it('has focusable container for keyboard navigation', () => {
      const { container } = render(Carousel, {
        props: { items: mockItems },
      });
      const carousel = container.querySelector('.mljr-carousel');
      expect(carousel).toHaveAttribute('tabindex', '0');
    });

    it('marks non-active slides as hidden', () => {
      const { container } = render(Carousel, {
        props: { items: mockItems },
      });
      const slides = container.querySelectorAll('.mljr-carousel-item');
      expect(slides[0]).toHaveAttribute('aria-hidden', 'false');
      expect(slides[1]).toHaveAttribute('aria-hidden', 'true');
      expect(slides[2]).toHaveAttribute('aria-hidden', 'true');
    });
  });
});
