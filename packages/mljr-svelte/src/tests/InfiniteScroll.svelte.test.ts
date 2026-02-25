import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/svelte';
import InfiniteScroll from '../lib/components/display/InfiniteScroll.svelte';

describe('InfiniteScroll', () => {
  describe('Rendering', () => {
    it('renders the container', async () => {
      const { container } = render(InfiniteScroll, { onLoadMore: vi.fn() } as any);
      expect(container.querySelector('.mljr-infinite-scroll')).toBeTruthy();
    });

    it('renders the sentinel div when hasMore=true (default)', async () => {
      const { container } = render(InfiniteScroll, { onLoadMore: vi.fn(), hasMore: true } as any);
      expect(container.querySelector('.mljr-infinite-scroll-sentinel')).toBeTruthy();
    });

    it('does not render sentinel when hasMore=false', async () => {
      const { container } = render(InfiniteScroll, { onLoadMore: vi.fn(), hasMore: false } as any);
      expect(container.querySelector('.mljr-infinite-scroll-sentinel')).toBeFalsy();
    });
  });

  describe('End message', () => {
    it('shows default end message when hasMore=false', async () => {
      const { container } = render(InfiniteScroll, { onLoadMore: vi.fn(), hasMore: false } as any);
      expect(container.textContent).toContain('No more items');
    });

    it('shows custom end message', async () => {
      const { container } = render(InfiniteScroll, {
        onLoadMore: vi.fn(),
        hasMore: false,
        endMessage: "You've seen it all!",
      } as any);
      expect(container.textContent).toContain("You've seen it all!");
    });

    it('shows end element with correct class', async () => {
      const { container } = render(InfiniteScroll, { onLoadMore: vi.fn(), hasMore: false } as any);
      expect(container.querySelector('.mljr-infinite-scroll-end')).toBeTruthy();
    });
  });

  describe('Loading state', () => {
    it('shows default loading indicator when loading=true and hasMore=true', async () => {
      const { container } = render(InfiniteScroll, {
        onLoadMore: vi.fn(),
        loading: true,
        hasMore: true,
      } as any);
      expect(container.querySelector('.mljr-infinite-scroll-loading')).toBeTruthy();
    });

    it('hides loading indicator when loading=false', async () => {
      const { container } = render(InfiniteScroll, {
        onLoadMore: vi.fn(),
        loading: false,
        hasMore: true,
      } as any);
      expect(container.querySelector('.mljr-infinite-scroll-loading')).toBeFalsy();
    });

    it('loading indicator contains spinner', async () => {
      const { container } = render(InfiniteScroll, {
        onLoadMore: vi.fn(),
        loading: true,
        hasMore: true,
      } as any);
      expect(container.querySelector('.mljr-spinner')).toBeTruthy();
    });
  });

  describe('Custom class', () => {
    it('applies custom CSS class', async () => {
      const { container } = render(InfiniteScroll, {
        onLoadMore: vi.fn(),
        class: 'my-scroll',
      } as any);
      expect(container.querySelector('.my-scroll')).toBeTruthy();
    });
  });
});
