import fs from 'fs';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
  const isPages = mode === 'pages';
  const base = isPages ? '/System-Design-Frontend/' : '/';
  const hasCerts = !isPages && fs.existsSync('./certs/key.pem') && fs.existsSync('./certs/cert.pem');

  return {
    base,
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['default_cover.jpg', 'default_video.mp4', 'pwa-192x192.png', 'pwa-512x512.png'],
        manifest: {
          name: 'PostTrace — Каталог каналов',
          short_name: 'PostTrace',
          description: 'Лента и каталог Telegram-каналов',
          theme_color: '#2563eb',
          background_color: '#ffffff',
          display: 'standalone',
          start_url: base,
          scope: base,
          icons: [
            { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
            { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          ],
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,jpg,svg,mp4}'],
          maximumFileSizeToCacheInBytes: 20 * 1024 * 1024,
          navigateFallbackDenylist: [/^\/api/, /^\/media/],
        },
      }),
    ],
    server: {
      host: true,
      port: 5173,
      ...(hasCerts
        ? {
            https: {
              key: fs.readFileSync('./certs/key.pem'),
              cert: fs.readFileSync('./certs/cert.pem'),
            },
          }
        : {}),
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
        },
        '/media': {
          target: 'http://localhost:9000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/media/, '/posttrace'),
        },
      },
    },
  };
});