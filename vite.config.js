import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  // BAGIAN INI UNTUK MENYELESAIKAN ERROR IMPORT '@'
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // BAGIAN INI UNTUK MENYELESAIKAN ERROR API '404 NOT FOUND'
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000', // Pastikan ini alamat server Laravel Anda
        changeOrigin: true,
      }
    }
  }
})
