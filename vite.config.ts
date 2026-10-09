import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Serve the brand assets folder (icon.png, wordmark*.png) from the site root.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  publicDir: 'assets',
})