import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuración de Vite - https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
})
