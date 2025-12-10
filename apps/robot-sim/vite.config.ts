import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@cognitolab/robotics': '/../../packages/robotics/src',
    },
  },
});

