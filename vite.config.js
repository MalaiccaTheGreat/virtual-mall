import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises'; // Use ESM import instead of require

// Get current directory in ESM
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Windows-safe path resolver without require
const resolvePath = async (p) => {
  const resolved = path.resolve(__dirname, p).replace(/\\/g, '/');
  try {
    await fs.access(resolved);
    return resolved;
  } catch (err) {
    console.error(`Path not found: ${resolved}`);
    process.exit(1);
  }
};

export default defineConfig({
  base: './',
  plugins: [
    react(),
    ViteImageOptimizer({
      cache: false,
      jpg: { quality: 80, mozjpeg: true },
      png: { quality: 80, compressionLevel: 9 },
      webp: { quality: 80, lossless: false },
      includePublic: true
    }),
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: await resolvePath('./src')
      },
      {
        find: 'components',
        replacement: await resolvePath('./src/components')
      }
    ]
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        entryFileNames: 'assets/[name]-[hash].js'
      }
    }
  },
  server: {
    historyApiFallback: true,
    watch: {
      usePolling: true,
      interval: 1000
    }
  }
});