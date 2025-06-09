import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'https://chat-appln-jzc5.onrender.com',
        changeOrigin: true,
        secure: false, // Set to true if backend has valid SSL cert (can test with false during development)
        rewrite: (path) => path.replace(/^\/api/, '/api'), // keeps path as is
      },
    },
  },
})
