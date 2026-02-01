import mljrPlugin from 'mljr-css';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: ['class', '[data-theme="dark"]'],
  plugins: [mljrPlugin()],
};
