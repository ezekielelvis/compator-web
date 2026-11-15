import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// Set VITE_BASE=/compator-web/ for GitHub Pages (the site then lives under that path). Locally it is served from /.
export default defineConfig({
  base: process.env.VITE_BASE || '/',
  plugins: [tailwindcss()],
})
