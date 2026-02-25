import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import AvatarGroup from '../lib/components/display/AvatarGroup.svelte';

const avatars = [
  { initials: 'AB' },
  { initials: 'CD' },
  { initials: 'EF' },
];

describe('AvatarGroup', () => {
  describe('Rendering', () => {
    it('renders avatar group container', async () => {
      const { container } = render(AvatarGroup, { avatars });
      expect(container.querySelector('.mljr-avatar-group')).toBeTruthy();
    });

    it('renders all avatars when under max', async () => {
      const { container } = render(AvatarGroup, { avatars, max: 5 });
      const avatarEls = container.querySelectorAll('.mljr-avatar');
      expect(avatarEls.length).toBe(3);
    });

    it('shows overflow count when avatars exceed max', async () => {
      const { container } = render(AvatarGroup, { avatars, max: 2 });
      expect(container.querySelector('.mljr-avatar-count')).toBeTruthy();
      expect(container.querySelector('.mljr-avatar-count')?.textContent).toContain('+1');
    });

    it('does not show overflow when avatars do not exceed max', async () => {
      const { container } = render(AvatarGroup, { avatars, max: 5 });
      expect(container.querySelector('.mljr-avatar-count')).toBeFalsy();
    });
  });

  describe('Sizes', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;
    sizes.forEach((size) => {
      it(`applies ${size} size class`, async () => {
        const { container } = render(AvatarGroup, { avatars, size });
        expect(container.querySelector(`.mljr-avatar-group-${size}`)).toBeTruthy();
      });
    });
  });
});
