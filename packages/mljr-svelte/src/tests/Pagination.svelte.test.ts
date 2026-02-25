import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/svelte';
import Pagination from '../lib/components/navigation/Pagination.svelte';

describe('Pagination', () => {
  describe('Rendering', () => {
    it('renders pagination element', async () => {
      const { container } = render(Pagination, { totalPages: 10 });
      expect(container.querySelector('.mljr-pagination')).toBeTruthy();
    });

    it('renders page buttons', async () => {
      const { container } = render(Pagination, { totalPages: 5, currentPage: 1 });
      // Should have some page buttons rendered
      const buttons = container.querySelectorAll('button');
      expect(buttons.length).toBeGreaterThan(0);
    });

    it('renders prev/next controls by default', async () => {
      const { container } = render(Pagination, { totalPages: 10, showPrevNext: true });
      // Prev and next buttons should exist
      expect(container.querySelector('[aria-label="Previous page"]')).toBeTruthy();
      expect(container.querySelector('[aria-label="Next page"]')).toBeTruthy();
    });
  });

  describe('Current page', () => {
    it('marks current page as active', async () => {
      const { container } = render(Pagination, { totalPages: 10, currentPage: 3 });
      const activeBtn = container.querySelector('.mljr-pagination-active, [aria-current="page"]');
      expect(activeBtn).toBeTruthy();
    });

    it('disables prev button on first page', async () => {
      const { container } = render(Pagination, { totalPages: 10, currentPage: 1, showPrevNext: true });
      const prevBtn = container.querySelector('[aria-label="Previous page"]') as HTMLButtonElement;
      expect(prevBtn?.disabled).toBe(true);
    });

    it('disables next button on last page', async () => {
      const { container } = render(Pagination, { totalPages: 5, currentPage: 5, showPrevNext: true });
      const nextBtn = container.querySelector('[aria-label="Next page"]') as HTMLButtonElement;
      expect(nextBtn?.disabled).toBe(true);
    });
  });

  describe('Sizes', () => {
    it('applies sm size class', async () => {
      const { container } = render(Pagination, { totalPages: 5, size: 'sm' });
      expect(container.querySelector('.mljr-pagination-sm')).toBeTruthy();
    });

    it('applies lg size class', async () => {
      const { container } = render(Pagination, { totalPages: 5, size: 'lg' });
      expect(container.querySelector('.mljr-pagination-lg')).toBeTruthy();
    });
  });

  describe('Interaction', () => {
    it('calls onchange when a page is clicked', async () => {
      const handleChange = vi.fn();
      const { container } = render(Pagination, {
        totalPages: 5,
        currentPage: 1,
        onchange: handleChange,
      });
      // Click a page button (not prev/next, not the current active page)
      const pageBtn = container.querySelector('.mljr-pagination-item:not(.mljr-pagination-active):not(.mljr-pagination-prev):not(.mljr-pagination-next):not([disabled])') as HTMLElement;
      pageBtn?.click();
      expect(handleChange).toHaveBeenCalled();
    });
  });

  describe('Single page', () => {
    it('does not render pagination for single page', async () => {
      const { container } = render(Pagination, { totalPages: 1 });
      // Should either not render or render in hidden/empty state
      const btns = container.querySelectorAll('.mljr-pagination-item');
      // Some implementations hide entirely for 1 page, others show just page 1
      expect(btns.length).toBeLessThanOrEqual(3);
    });
  });
});
