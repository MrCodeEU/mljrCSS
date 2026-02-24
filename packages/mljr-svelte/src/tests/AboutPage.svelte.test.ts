import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import AboutPage from '../lib/components/layout/AboutPage.svelte';
import type { AboutStat, AboutValue, AboutTeamMember } from '../lib/components/layout/AboutPage.svelte';

const stats: AboutStat[] = [
  { value: '10+', label: 'Years Experience' },
  { value: '100+', label: 'Projects' },
];

const values: AboutValue[] = [
  { icon: '🎨', name: 'Design', description: 'We care about design.' },
  { icon: '⚡', name: 'Speed', description: 'We build fast products.' },
];

const team: AboutTeamMember[] = [
  { name: 'Alice Smith', role: 'CEO', initials: 'AS' },
  { name: 'Bob Jones', role: 'CTO', initials: 'BJ' },
];

describe('AboutPage', () => {
  describe('Rendering', () => {
    it('renders the about container', async () => {
      const { container } = render(AboutPage, { companyName: 'Test Corp' });
      expect(container.querySelector('.mljr-about')).toBeTruthy();
    });

    it('renders the company name', async () => {
      const { container } = render(AboutPage, { companyName: 'My Company' });
      expect(container.textContent).toContain('My Company');
    });

    it('renders tagline when provided', async () => {
      const { container } = render(AboutPage, { companyName: 'My Co', tagline: 'Making the world better' });
      expect(container.textContent).toContain('Making the world better');
    });

    it('renders description when provided', async () => {
      const { container } = render(AboutPage, { companyName: 'My Co', description: 'We are a great company.' });
      expect(container.textContent).toContain('We are a great company.');
    });

    it('renders founded year when provided', async () => {
      const { container } = render(AboutPage, { companyName: 'My Co', founded: 2010 });
      expect(container.textContent).toContain('2010');
    });
  });

  describe('Stats section', () => {
    it('renders stats section when stats are provided', async () => {
      const { container } = render(AboutPage, { companyName: 'My Co', stats });
      expect(container.querySelector('.mljr-about__stats')).toBeTruthy();
    });

    it('renders stat values', async () => {
      const { container } = render(AboutPage, { companyName: 'My Co', stats });
      expect(container.textContent).toContain('10+');
      expect(container.textContent).toContain('100+');
    });

    it('does not render stats section when stats array is empty', async () => {
      const { container } = render(AboutPage, { companyName: 'My Co', stats: [] });
      expect(container.querySelector('.mljr-about__stats')).toBeNull();
    });
  });

  describe('Values section', () => {
    it('renders values section when values are provided', async () => {
      const { container } = render(AboutPage, { companyName: 'My Co', values });
      expect(container.querySelector('.mljr-about__values')).toBeTruthy();
    });

    it('renders value names', async () => {
      const { container } = render(AboutPage, { companyName: 'My Co', values });
      expect(container.textContent).toContain('Design');
      expect(container.textContent).toContain('Speed');
    });

    it('renders value icons', async () => {
      const { container } = render(AboutPage, { companyName: 'My Co', values });
      expect(container.textContent).toContain('🎨');
      expect(container.textContent).toContain('⚡');
    });

    it('does not render values section when values array is empty', async () => {
      const { container } = render(AboutPage, { companyName: 'My Co', values: [] });
      expect(container.querySelector('.mljr-about__values')).toBeNull();
    });
  });

  describe('Team section', () => {
    it('renders team section when team is provided', async () => {
      const { container } = render(AboutPage, { companyName: 'My Co', team });
      expect(container.querySelector('.mljr-about__team')).toBeTruthy();
    });

    it('renders team member names', async () => {
      const { container } = render(AboutPage, { companyName: 'My Co', team });
      expect(container.textContent).toContain('Alice Smith');
      expect(container.textContent).toContain('Bob Jones');
    });

    it('renders initials for members without avatar', async () => {
      const { container } = render(AboutPage, { companyName: 'My Co', team });
      expect(container.textContent).toContain('AS');
      expect(container.textContent).toContain('BJ');
    });

    it('does not render team section when team array is empty', async () => {
      const { container } = render(AboutPage, { companyName: 'My Co', team: [] });
      expect(container.querySelector('.mljr-about__team')).toBeNull();
    });
  });

  describe('Mission section', () => {
    it('renders mission section when mission is provided', async () => {
      const { container } = render(AboutPage, { companyName: 'My Co', mission: 'To help everyone.' });
      expect(container.querySelector('.mljr-about__mission')).toBeTruthy();
    });

    it('does not render mission section when mission is not provided', async () => {
      const { container } = render(AboutPage, { companyName: 'My Co' });
      expect(container.querySelector('.mljr-about__mission')).toBeNull();
    });
  });

  describe('Localized strings', () => {
    it('renders English tagline from localized object', async () => {
      const { container } = render(AboutPage, {
        companyName: 'My Co',
        tagline: { en: 'English tagline', de: 'Deutscher Slogan' },
      });
      // Default locale is 'en', so English text should appear
      expect(container.textContent).toContain('English tagline');
    });
  });
});
