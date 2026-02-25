import { vi } from 'vitest';
import '@testing-library/jest-dom/vitest';

// Mock IntersectionObserver: immediately reports all observed elements as visible.
// Simulates the test-env assumption that elements are in the viewport.
const mockIntersectionObserver = vi.fn().mockImplementation((callback: IntersectionObserverCallback) => ({
  observe: vi.fn((element: Element) => {
    callback([{ isIntersecting: true, target: element } as IntersectionObserverEntry], {} as IntersectionObserver);
  }),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));
global.IntersectionObserver = mockIntersectionObserver as unknown as typeof IntersectionObserver;

// Mock Web Animations API (not supported in happy-dom).
HTMLElement.prototype.animate = vi.fn().mockReturnValue({
  finished: Promise.resolve(undefined),
  cancel: vi.fn(),
  pause: vi.fn(),
  play: vi.fn(),
  reverse: vi.fn(),
  finish: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  onfinish: null,
  oncancel: null,
});
