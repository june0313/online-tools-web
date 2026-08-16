import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  root: resolve(__dirname, 'src'),
  base: './',
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'src/index.html'),
        privacy: resolve(__dirname, 'src/privacy.html'),
        json_formatter: resolve(__dirname, 'src/tools/json-formatter/index.html')
      }
    }
  },
  server: {
    port: 5173
  }
});
