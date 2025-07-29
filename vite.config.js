// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // This server proxy is ESSENTIAL for your local development to bypass network issues.
  server: {
    proxy: {
      // Any local request to '/api' will be forwarded to TMDb's server.
      '/api': {
        target: 'https://api.themoviedb.org/3',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Remove '/api' from the request path
      },
    },
  },
});