import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // 启用代码分割
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          charts: ['echarts', 'echarts-for-react'],
          ui: ['@radix-ui/react-tabs', '@radix-ui/react-progress', '@radix-ui/react-select'],
        },
      },
    },
    // 启用压缩
    minify: 'terser',
    // 生成sourcemap用于调试
    sourcemap: false,
    // 构建输出目录
    outDir: 'dist',
    // 构建资产目录
    assetsDir: 'assets',
  },
  server: {
    // 开发服务器端口
    port: 3000,
    // 自动打开浏览器
    open: true,
    // 启用热更新
    hmr: true,
  },
  // 启用缓存
  cacheDir: '.vite/cache',
});
