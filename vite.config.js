import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory in ESM
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  base: './',
  plugins: [
    react(),
    ViteImageOptimizer({
      cache: false,
      jpg: { quality: 80, mozjpeg: true },
      png: { quality: 80, compressionLevel: 9 },
      webp: { quality: 80, lossless: false },
      includePublic: true,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'components': path.resolve(__dirname, './src/components'),
    },
    extensions: ['.js', '.jsx', '.json'], // Add '.jsx' for explicit resolution
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    sourcemap: true, // Enable for debugging
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
  },
  server: {
    historyApiFallback: true,
    watch: {
      usePolling: true,
      interval: 1000,
    },
    open: true, // Auto-open browser
  },
  optimizeDeps: {
    include: ['react', 'react-router-dom', 'framer-motion'], // Pre-bundle critical deps
  },
});