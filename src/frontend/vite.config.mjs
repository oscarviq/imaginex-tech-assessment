import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  root: 'src/frontend',
  build: {
    outDir: '../../dist/frontend',
    emptyOutDir: true
  },
  plugins: [
    tsconfigPaths({
      projects: ['./tsconfig.json']
    }),
    react(),
    tailwindcss()
  ]
});
