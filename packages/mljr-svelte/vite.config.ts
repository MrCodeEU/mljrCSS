import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    // Watch for changes in the mljr-css package
    watch: {
      // Include the mljr-css package in the watch list
      ignored: ['!**/node_modules/mljr-css/**', '!**/packages/mljr-css/**'],
    },
  },
  // Ensure linked packages are not pre-bundled so changes are picked up
  optimizeDeps: {
    exclude: ['mljr-css'],
  },
});
