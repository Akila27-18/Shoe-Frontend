import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  server: {
    proxy: {
      '/api': 'https://shoe-backend-jbhb.onrender.com',
    },
  },
});
// https://vite.dev/config/
export default defineConfig({
 plugins: [react(), tailwindcss()],
})
