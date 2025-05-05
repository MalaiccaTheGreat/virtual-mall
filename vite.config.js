import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    historyApiFallback: true,
    port: 3000,
    strictPort: true,
    open: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '~assets': path.resolve(__dirname, './public/assets')
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]'
      }
    }
  }
});