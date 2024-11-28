import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['xlsx', 'file-saver'],
          react: ['react', 'react-dom', 'react-router-dom'],
        }
      }
    },
    // Atau naikkan batas warning jika tidak ingin split
    chunkSizeWarningLimit: 600,
  }
})
