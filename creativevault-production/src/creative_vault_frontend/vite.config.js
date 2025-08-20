import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: 'src/creative_vault_frontend',
  build: {
    outDir: '../../dist/creative_vault_frontend',
    emptyOutDir: true,
  },
  server: {
    port: 3000,
  },
  define: {
    global: 'globalThis',
  },
});
