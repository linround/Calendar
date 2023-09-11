import { defineConfig } from 'vite'
import * as path from 'path'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

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
    host: '0.0.0.0',
    open: true,
    port: 5000,
    proxy: {
      '/api/': {
        target: 'http://121.199.1.247:8888/', // 远程服务
        // target: 'http://127.0.0.1:8888/', // 本地服务
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },

    },
  },
})
