import { defineConfig } from 'vite'
import * as path from 'path'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': {},
  },
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@/src': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    open: true,
    port: 5000,
  },
})
