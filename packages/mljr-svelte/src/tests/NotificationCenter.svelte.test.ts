import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import NotificationCenter from '../lib/components/overlay/NotificationCenter.svelte';
import type { Notification } from '../lib/components/overlay/NotificationCenter.svelte';

const sampleNotifications: Notification[] = [
  { id: '1', title: 'New message', message: 'You have a new message', read: false, type: 'info', time: '2m ago' },
  { id: '2', title: 'Task completed', message: 'Your export is ready', read: true, type: 'success', time: '5m ago' },
  { id: '3', title: 'Warning', message: 'Storage is almost full', read: false, type: 'warning', time: '10m ago' },
];

describe('NotificationCenter', () => {
  describe('Rendering', () => {
    it('renders notification center container', async () => {
      const { container } = render(NotificationCenter);
      expect(container.querySelector('.mljr-notification-center')).toBeTruthy();
    });

    it('renders bell button', async () => {
      const { container } = render(NotificationCenter);
      expect(container.querySelector('.mljr-notification-bell')).toBeTruthy();
    });

    it('panel is hidden by default', async () => {
      const { container } = render(NotificationCenter);
      expect(container.querySelector('.mljr-notification-panel')).toBeNull();
    });
  });

  describe('Unread badge', () => {
    it('shows unread badge when there are unread notifications', async () => {
      const { container } = render(NotificationCenter, { notifications: sampleNotifications });
      expect(container.querySelector('.mljr-notification-badge')).toBeTruthy();
    });

    it('shows correct unread count (2 unread)', async () => {
      const { container } = render(NotificationCenter, { notifications: sampleNotifications });
      const badge = container.querySelector('.mljr-notification-badge');
      expect(badge?.textContent?.trim()).toBe('2');
    });

    it('does not show badge when all notifications are read', async () => {
      const readNotifs: Notification[] = sampleNotifications.map(n => ({ ...n, read: true }));
      const { container } = render(NotificationCenter, { notifications: readNotifs });
      expect(container.querySelector('.mljr-notification-badge')).toBeNull();
    });

    it('does not show badge with empty notifications', async () => {
      const { container } = render(NotificationCenter, { notifications: [] });
      expect(container.querySelector('.mljr-notification-badge')).toBeNull();
    });
  });

  describe('Panel toggle', () => {
    it('opens panel on bell click', async () => {
      const { container } = render(NotificationCenter, { notifications: sampleNotifications });
      const bell = container.querySelector('.mljr-notification-bell') as HTMLButtonElement;
      bell.click();
      await Promise.resolve();
      expect(container.querySelector('.mljr-notification-panel')).toBeTruthy();
    });

    it('shows notification items when panel is open', async () => {
      const { container } = render(NotificationCenter, { notifications: sampleNotifications });
      const bell = container.querySelector('.mljr-notification-bell') as HTMLButtonElement;
      bell.click();
      await Promise.resolve();
      const items = container.querySelectorAll('.mljr-notification-item');
      expect(items.length).toBe(sampleNotifications.length);
    });
  });

  describe('Notification types', () => {
    it('renders info type notification', async () => {
      const notifs: Notification[] = [{ id: '1', title: 'Info', type: 'info', read: false }];
      const { container } = render(NotificationCenter, { notifications: notifs });
      const bell = container.querySelector('.mljr-notification-bell') as HTMLButtonElement;
      bell.click();
      await Promise.resolve();
      expect(container.querySelector('.mljr-notification-type-info')).toBeTruthy();
    });

    it('renders success type notification', async () => {
      const notifs: Notification[] = [{ id: '1', title: 'Success', type: 'success', read: false }];
      const { container } = render(NotificationCenter, { notifications: notifs });
      const bell = container.querySelector('.mljr-notification-bell') as HTMLButtonElement;
      bell.click();
      await Promise.resolve();
      expect(container.querySelector('.mljr-notification-type-success')).toBeTruthy();
    });
  });

  describe('Custom class', () => {
    it('applies custom class', async () => {
      const { container } = render(NotificationCenter, { class: 'my-notif' });
      expect(container.querySelector('.mljr-notification-center.my-notif')).toBeTruthy();
    });
  });
});
