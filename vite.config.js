import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // 用户主页仓库 kupuyu.github.io 部署在域名根目录，资源路径保持以 / 开头。
  base: '/',
  plugins: [react()],
  server: {
    host: '127.0.0.1',
    port: 5173,
  },
  preview: {
    host: '127.0.0.1',
    port: 5173,
  },
});
