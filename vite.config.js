import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    tailwindcss()
  ],
  resolve: { // for absolute imports
    alias: [{ find: '~', replacement: '/src' }]
  },
  // cho phép vite sử dụng process.env(nếu không thì phải dùng import.meta.env)
  define: {
    'process.env': process.env
  },
  base: '/'
})
