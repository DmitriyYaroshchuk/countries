import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command, isPreview }) => ({
  plugins: [react()],
  // GitHub Pages serves the app from https://<user>.github.io/countries/; dev server stays on /
  base: command === 'build' || isPreview ? '/countries/' : '/',
}))
