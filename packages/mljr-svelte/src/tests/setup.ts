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

// Stub requestAnimationFrame as a no-op to prevent any animation callbacks from
// firing after happy-dom tears down the window between tests.
// A no-op (never invokes the callback) is safer than synchronous rAF, which fires
// during mount and disrupts Svelte's reactive update cycle.
let _rafId = 0;
global.requestAnimationFrame = (_cb: FrameRequestCallback) => ++_rafId;
global.cancelAnimationFrame = vi.fn();

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
