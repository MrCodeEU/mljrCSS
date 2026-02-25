import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import ChatBubble from '../lib/components/display/ChatBubble.svelte';

describe('ChatBubble', () => {
  describe('Rendering', () => {
    it('renders chat bubble container', async () => {
      const { container } = render(ChatBubble, { message: 'Hello!' });
      expect(container.querySelector('.mljr-chat-bubble-container')).toBeTruthy();
    });

    it('renders message text', async () => {
      const { container } = render(ChatBubble, { message: 'Hello world' });
      expect(container.textContent).toContain('Hello world');
    });

    it('applies user variant class', async () => {
      const { container } = render(ChatBubble, { message: 'Hi', variant: 'user' });
      expect(container.querySelector('.mljr-chat-bubble-user')).toBeTruthy();
    });

    it('applies bot variant class', async () => {
      const { container } = render(ChatBubble, { message: 'Hello', variant: 'bot' });
      expect(container.querySelector('.mljr-chat-bubble-bot')).toBeTruthy();
    });

    it('applies system variant class', async () => {
      const { container } = render(ChatBubble, { message: 'System message', variant: 'system' });
      expect(container.querySelector('.mljr-chat-bubble-system')).toBeTruthy();
    });
  });

  describe('Positioning', () => {
    it('user variant aligns right by default', async () => {
      const { container } = render(ChatBubble, { message: 'Hi', variant: 'user' });
      expect(container.querySelector('.mljr-chat-bubble-right')).toBeTruthy();
    });

    it('bot variant aligns left by default', async () => {
      const { container } = render(ChatBubble, { message: 'Hi', variant: 'bot' });
      expect(container.querySelector('.mljr-chat-bubble-left')).toBeTruthy();
    });

    it('explicit position overrides variant default', async () => {
      const { container } = render(ChatBubble, { message: 'Hi', variant: 'user', position: 'left' });
      expect(container.querySelector('.mljr-chat-bubble-left')).toBeTruthy();
    });
  });

  describe('Metadata', () => {
    it('shows username when provided', async () => {
      const { container } = render(ChatBubble, { message: 'Hi', username: 'Alice' });
      expect(container.querySelector('.mljr-chat-username')?.textContent).toContain('Alice');
    });

    it('shows timestamp when provided', async () => {
      const { container } = render(ChatBubble, { message: 'Hi', timestamp: '12:34' });
      expect(container.querySelector('.mljr-chat-timestamp')?.textContent).toContain('12:34');
    });

    it('shows typing indicator when status is typing', async () => {
      const { container } = render(ChatBubble, { variant: 'bot', status: 'typing' });
      expect(container.querySelector('.mljr-chat-typing')).toBeTruthy();
    });
  });
});
