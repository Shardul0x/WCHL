import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '..', '');

  return {
    plugins: [react()],
    root: 'src/creative_vault_frontend',
    build: {
      outDir: '../../dist/creative_vault_frontend',
      emptyOutDir: true,
    },
    server: {
      port: 3000,
      host: true,
      // The proxy configuration
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:4944',
          changeOrigin: true,
        },
      },
    },
    define: {
      global: 'globalThis',
      'process.env.CANISTER_ID_IDEA_VAULT': JSON.stringify(env.CANISTER_ID_IDEA_VAULT),
      'process.env.CANISTER_ID_INTERNET_IDENTITY': JSON.stringify(env.CANISTER_ID_INTERNET_IDENTITY),
      'process.env.DFX_NETWORK': JSON.stringify(env.DFX_NETWORK || 'local'),
    },
  };
});