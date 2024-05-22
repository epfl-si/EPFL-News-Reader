import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const config = {
    plugins: [react()],
    base: '/',
  }
  console.log(command)
  if (command !== 'serve') {
    config.base = '/EPFL-News-Reader/'
  }

  return config
})
