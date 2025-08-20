import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  root: 'src/creative_vault_frontend',
  build: {
    outDir: '../../dist/creative_vault_frontend',
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          icons: ['lucide-react'],
          router: ['react-router-dom'],
          forms: ['react-hook-form'],
          toast: ['react-hot-toast'],
          state: ['zustand']
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/creative_vault_frontend/src'),
    },
  },
  server: {
    port: 3000,
    host: true,
  },
  define: {
    global: 'globalThis',
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react'],
  },
});
