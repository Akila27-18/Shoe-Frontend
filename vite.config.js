import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Proxy all requests starting with /api to your backend
      '/api': {
        target: 'https://shoe-backend-jbhb.onrender.com',
        changeOrigin: true,
        secure: false, // Set to false if using self-signed certs
      },
    },
  },
});
