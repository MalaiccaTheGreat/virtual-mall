import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      cache: false, // Disable cache to prevent errors
      jpg: {
        quality: 80,
        mozjpeg: true,
      },
      png: {
        quality: 80,
        compressionLevel: 9,
      },
      webp: {
        quality: 80,
        lossless: false,
      },
      includePublic: true
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    assetsInlineLimit: 4096,
  }
});