import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const config = {
    cors: false,
    plugins: [react()],
    base: command === 'serve' ? '/' : '/EPFL-News-Reader/', // Adjust base path for production
    server: {
      proxy: {
        '/api': {
          target: 'https://actu.epfl.ch', // The actual API endpoint
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/api/, '/api/v1')
        }
      }
    }
  }

  return config
})
