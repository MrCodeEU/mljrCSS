import plugin from 'tailwindcss/plugin';
import type { Config } from 'tailwindcss';

export interface MljrPluginOptions {
  /** Prefix for custom CSS classes (default: 'mljr') */
  prefix?: string;
  /** Enable dark mode support (default: true) */
  darkMode?: boolean;
}

const defaultColors = {
  primary: {
    50: '#e6f3ff',
    100: '#cce7ff',
    200: '#99cfff',
    300: '#66b7ff',
    400: '#339eff',
    500: '#0080ff',
    600: '#0066cc',
    700: '#004d99',
    800: '#003366',
    900: '#001a33',
    950: '#000d1a',
  },
  secondary: {
    50: '#fff4e6',
    100: '#ffe8cc',
    200: '#ffd199',
    300: '#ffba66',
    400: '#ffa333',
    500: '#ff8c00',
    600: '#cc7000',
    700: '#995400',
    800: '#663800',
    900: '#331c00',
    950: '#1a0e00',
  },
  accent: {
    50: '#f5e6ff',
    100: '#ebccff',
    200: '#d699ff',
    300: '#c266ff',
    400: '#ad33ff',
    500: '#9900ff',
    600: '#7a00cc',
    700: '#5c0099',
    800: '#3d0066',
    900: '#1f0033',
    950: '#0f001a',
  },
};

/**
 * MLJR CSS Tailwind Plugin
 *
 * A TailwindCSS plugin that provides the MLJR color scheme
 * and design system utilities.
 *
 * @example
 * ```js
 * // tailwind.config.js
 * import mljrPlugin from 'mljr-css';
 *
 * export default {
 *   plugins: [mljrPlugin()],
 * }
 * ```
 */
export const mljrPlugin = (options: MljrPluginOptions = {}) => {
  const { darkMode = true } = options;

  return plugin(
    function ({ addUtilities }) {
      // Add focus ring utility
      addUtilities({
        '.mljr-focus-ring': {
          '&:focus-visible': {
            outline: '2px solid var(--mljr-ring)',
            'outline-offset': '2px',
          },
        },
      });
    },
    {
      // Extend Tailwind theme
      theme: {
        extend: {
          colors: {
            primary: defaultColors.primary,
            secondary: defaultColors.secondary,
            accent: defaultColors.accent,
          },
          fontFamily: {
            sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
            display: ['Inter', 'system-ui', 'sans-serif'],
            mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
          },
          borderRadius: {
            DEFAULT: '0.375rem',
          },
        },
      },
    }
  );
};

// Export preset configuration for use with Tailwind
export const mljrPreset: Partial<Config> = {
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        primary: defaultColors.primary,
        secondary: defaultColors.secondary,
        accent: defaultColors.accent,
      },
      fontFamily: {
        display: ['Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
    },
  },
};

// Default export
export default mljrPlugin;

// Named exports
export { defaultColors };
