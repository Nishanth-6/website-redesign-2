import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Matches your repo name exactly
const REPO_NAME = '/website-redesign-2/' 

export default defineConfig({
  base: REPO_NAME, 
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true
  }
})