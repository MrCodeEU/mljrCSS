import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import AudioVisualizer from '../lib/components/display/AudioVisualizer.svelte';

describe('AudioVisualizer', () => {
  describe('Rendering', () => {
    it('renders the container', async () => {
      const { container } = render(AudioVisualizer);
      expect(container.querySelector('.mljr-audio-viz')).toBeTruthy();
    });

    it('renders the canvas wrapper', async () => {
      const { container } = render(AudioVisualizer);
      expect(container.querySelector('.mljr-audio-viz-canvas-wrap')).toBeTruthy();
    });

    it('renders a canvas element', async () => {
      const { container } = render(AudioVisualizer);
      expect(container.querySelector('canvas')).toBeTruthy();
    });

    it('renders the controls row', async () => {
      const { container } = render(AudioVisualizer);
      expect(container.querySelector('.mljr-audio-viz-controls')).toBeTruthy();
    });

    it('renders the type selector', async () => {
      const { container } = render(AudioVisualizer);
      expect(container.querySelector('.mljr-audio-viz-types')).toBeTruthy();
    });
  });

  describe('Idle state', () => {
    it('shows idle overlay when not playing', async () => {
      const { container } = render(AudioVisualizer, { playing: false });
      expect(container.querySelector('.mljr-audio-viz-idle')).toBeTruthy();
    });

    it('hides idle overlay when playing=true', async () => {
      const { container } = render(AudioVisualizer, { playing: true });
      // Give animation a moment to start
      await new Promise(r => setTimeout(r, 50));
      expect(container.querySelector('.mljr-audio-viz-idle')).toBeFalsy();
    });
  });

  describe('Type selector buttons', () => {
    it('renders 3 type buttons (bars, waveform, circular)', async () => {
      const { container } = render(AudioVisualizer);
      const btns = container.querySelectorAll('.mljr-audio-viz-type-btn');
      expect(btns.length).toBe(3);
    });

    it('highlights bars button as active by default', async () => {
      const { container } = render(AudioVisualizer, { type: 'bars' });
      const active = container.querySelector('.mljr-audio-viz-type-btn-active');
      expect(active?.textContent?.trim()).toBe('bars');
    });

    it('highlights waveform button when type=waveform', async () => {
      const { container } = render(AudioVisualizer, { type: 'waveform' });
      const active = container.querySelector('.mljr-audio-viz-type-btn-active');
      expect(active?.textContent?.trim()).toBe('waveform');
    });

    it('highlights circular button when type=circular', async () => {
      const { container } = render(AudioVisualizer, { type: 'circular' });
      const active = container.querySelector('.mljr-audio-viz-type-btn-active');
      expect(active?.textContent?.trim()).toBe('circular');
    });
  });

  describe('Microphone mode', () => {
    it('shows Start Mic button when microphone=true', async () => {
      const { container } = render(AudioVisualizer, { microphone: true });
      expect(container.textContent).toContain('Start Mic');
    });

    it('does not show Start Mic button when microphone=false', async () => {
      const { container } = render(AudioVisualizer, { microphone: false });
      expect(container.textContent).not.toContain('Start Mic');
    });
  });

  describe('Canvas height', () => {
    it('applies custom height to canvas', async () => {
      const { container } = render(AudioVisualizer, { height: 250 });
      const canvas = container.querySelector('canvas') as HTMLCanvasElement;
      expect(canvas.height).toBe(250);
    });
  });

  describe('Custom class', () => {
    it('applies custom CSS class', async () => {
      const { container } = render(AudioVisualizer, { class: 'my-viz' });
      expect(container.querySelector('.my-viz')).toBeTruthy();
    });
  });
});
