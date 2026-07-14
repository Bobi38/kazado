import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: '0.0.0.0',
    proxy: {
        '/api': {
            target: 'http://gateway:9100',
            changeOrigin: true,
        },
        "/socket.io": {
          target: "http://gateway:9100",
          changeOrigin: true,
          ws: true,
        },
    }
  }
});