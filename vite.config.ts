import { defineConfig } from 'vite'
import * as path from 'path'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  worker: {},
  // 依赖项优化
  optimizeDeps: {},
  build: {

    // 小于此阈值的资源将内联为base64编码，以避免额外的 http 请求。
    // assetsInlineLimit: 4096,

    // 启用 css代码拆分。在异步 chunk 中导入的css 将内联到异步chunk 本身，并在被加载时一并获取。
    // cssCodeSplit: true,

    // 应该只在针对 非主流浏览器时使用。最直观的是兼容安卓微信中的webview时，它支持大多数现代的javascript 功能，
    // 但并不支持 css 中的 #rgba 十六进制颜色符号。
    // 需要将 值设置为 chrome61，以防止 vite 将 rgba() 颜色转换为 #RGBA 十六进制符号的形式。
    // cssTarget: 'chrome61',





  },
  css: {


  },
  define: {
    'process.env': {},
  },
  plugins: [react(), svgr()],
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
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
