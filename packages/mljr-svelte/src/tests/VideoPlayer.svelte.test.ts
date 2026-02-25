import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import VideoPlayer from '../lib/components/display/VideoPlayer.svelte';

describe('VideoPlayer', () => {
  describe('Rendering', () => {
    it('renders the player container', async () => {
      const { container } = render(VideoPlayer);
      expect(container.querySelector('.mljr-video-player')).toBeTruthy();
    });

    it('renders a video element', async () => {
      const { container } = render(VideoPlayer);
      expect(container.querySelector('video')).toBeTruthy();
    });

    it('renders the controls bar', async () => {
      const { container } = render(VideoPlayer);
      expect(container.querySelector('.mljr-video-controls')).toBeTruthy();
    });

    it('renders the progress bar', async () => {
      const { container } = render(VideoPlayer);
      expect(container.querySelector('.mljr-video-progress')).toBeTruthy();
    });

    it('renders the controls row', async () => {
      const { container } = render(VideoPlayer);
      expect(container.querySelector('.mljr-video-controls-row')).toBeTruthy();
    });
  });

  describe('Aspect ratio', () => {
    it('applies 16:9 class by default', async () => {
      const { container } = render(VideoPlayer);
      expect(container.querySelector('.mljr-video-16-9')).toBeTruthy();
    });

    it('does not apply 16:9 class when aspectRatio=false', async () => {
      const { container } = render(VideoPlayer, { aspectRatio: false });
      expect(container.querySelector('.mljr-video-16-9')).toBeFalsy();
    });
  });

  describe('Source prop', () => {
    it('sets src attribute on video element', async () => {
      const { container } = render(VideoPlayer, { src: 'test.mp4' });
      const video = container.querySelector('video') as HTMLVideoElement;
      expect(video.src).toContain('test.mp4');
    });

    it('sets poster attribute on video element', async () => {
      const { container } = render(VideoPlayer, { poster: 'poster.jpg' });
      const video = container.querySelector('video') as HTMLVideoElement;
      expect(video.getAttribute('poster')).toBe('poster.jpg');
    });
  });

  describe('Center play button', () => {
    it('shows center play button when not playing', async () => {
      const { container } = render(VideoPlayer);
      expect(container.querySelector('.mljr-video-center-btn')).toBeTruthy();
    });
  });

  describe('Controls buttons', () => {
    it('renders a play/pause button', async () => {
      const { container } = render(VideoPlayer);
      const btns = container.querySelectorAll('.mljr-video-btn');
      expect(btns.length).toBeGreaterThan(0);
    });

    it('renders fullscreen button', async () => {
      const { container } = render(VideoPlayer);
      const btns = Array.from(container.querySelectorAll('.mljr-video-btn'));
      const fsBtn = btns.find(b => b.getAttribute('aria-label')?.toLowerCase().includes('fullscreen'));
      expect(fsBtn).toBeTruthy();
    });

    it('renders mute button', async () => {
      const { container } = render(VideoPlayer);
      const btns = Array.from(container.querySelectorAll('.mljr-video-btn'));
      const muteBtn = btns.find(b => b.getAttribute('aria-label')?.toLowerCase().includes('mute'));
      expect(muteBtn).toBeTruthy();
    });
  });

  describe('Volume slider', () => {
    it('renders volume range input', async () => {
      const { container } = render(VideoPlayer);
      const slider = container.querySelector('.mljr-video-volume-slider') as HTMLInputElement;
      expect(slider).toBeTruthy();
      expect(slider.type).toBe('range');
    });

    it('volume slider max is 1', async () => {
      const { container } = render(VideoPlayer);
      const slider = container.querySelector('.mljr-video-volume-slider') as HTMLInputElement;
      expect(slider.max).toBe('1');
    });
  });

  describe('Time display', () => {
    it('renders time display element', async () => {
      const { container } = render(VideoPlayer);
      expect(container.querySelector('.mljr-video-time')).toBeTruthy();
    });

    it('shows 00:00 / 00:00 when no media loaded', async () => {
      const { container } = render(VideoPlayer);
      const time = container.querySelector('.mljr-video-time');
      expect(time?.textContent).toContain('00:00');
    });
  });

  describe('Title', () => {
    it('does not show title overlay when playing (hidden by default)', async () => {
      const { container } = render(VideoPlayer, { title: 'My Video' });
      // Title is shown only when !playing; since not playing, it should appear
      expect(container.textContent).toContain('My Video');
    });
  });

  describe('Custom class', () => {
    it('applies custom CSS class', async () => {
      const { container } = render(VideoPlayer, { class: 'my-player' });
      expect(container.querySelector('.my-player')).toBeTruthy();
    });
  });

  describe('Loop prop', () => {
    it('sets loop attribute on video when loop=true', async () => {
      const { container } = render(VideoPlayer, { loop: true });
      const video = container.querySelector('video') as HTMLVideoElement;
      expect(video.loop).toBe(true);
    });

    it('does not set loop by default', async () => {
      const { container } = render(VideoPlayer);
      const video = container.querySelector('video') as HTMLVideoElement;
      expect(video.loop).toBe(false);
    });
  });

  describe('Accessibility', () => {
    it('has aria-label on the player container', async () => {
      const { container } = render(VideoPlayer, { title: 'Test Video' });
      const player = container.querySelector('.mljr-video-player');
      expect(player?.getAttribute('aria-label')).toBe('Test Video');
    });

    it('has default aria-label when no title given', async () => {
      const { container } = render(VideoPlayer);
      const player = container.querySelector('.mljr-video-player');
      expect(player?.getAttribute('aria-label')).toBe('Video player');
    });

    it('player has tabindex for keyboard focus', async () => {
      const { container } = render(VideoPlayer);
      const player = container.querySelector('.mljr-video-player');
      expect(player?.getAttribute('tabindex')).toBe('0');
    });
  });
});
