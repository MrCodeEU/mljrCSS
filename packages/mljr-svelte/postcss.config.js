import purgecss from '@fullhuman/postcss-purgecss';

const production = process.env.NODE_ENV === 'production';

export default {
  plugins: {
    'postcss-import': {},
    tailwindcss: {},
    autoprefixer: {},
    ...(production && {
      '@fullhuman/postcss-purgecss': {
        // Scan all Svelte/TS source files. Component files contain all
        // class name strings even for dynamic variants (e.g. variantClasses
        // record maps), so static scanning is sufficient.
        content: ['./src/**/*.{svelte,html,ts,js}'],
        // Extract hyphenated class names, Tailwind modifiers, and slash values.
        defaultExtractor: (content) => content.match(/[\w-/:]+/g) || [],
        safelist: {
          // Base element selectors and dark-mode class used by themeStore.
          standard: ['html', 'body', 'dark'],
          // Keep attribute selectors like [data-theme="dark"] used in CSS.
          deep: [/^\[data-theme/],
        },
      },
    }),
  },
};
