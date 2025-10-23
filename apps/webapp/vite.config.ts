import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import tsconfigPaths from 'vite-tsconfig-paths'
// import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    TanStackRouterVite(),
    react(),
    // VitePWA({
    //   workbox: {
    //     globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
    //     navigateFallbackDenylist: [/^\/api/]
    //   },
    //   // strategies: 'injectManifest',
    //   devOptions: {
    //     enabled: true
    //   },
    //   manifest: {
    //     name: 'BetaLyfe',
    //     short_name: 'BetaLyfe',
    //     description: 'BetaLyfe mobile app',
    //     theme_color: '#f382ec',
    //     start_url: '/dashboard',
    //     related_applications: [
    //       {
    //         platform: 'webapp',
    //         url: `${process.env.BASE_URL}/manifest.webmanifest`
    //       }
    //     ],
    //     icons: [
    //       {
    //         src: '/images/logo-192x192.png',
    //         sizes: '192x192',
    //         type: 'image/png'
    //       },
    //       {
    //         src: '/images/logo-512x512.png',
    //         sizes: '512x512',
    //         type: 'image/png'
    //       }
    //     ]
    //   }
    // }),
    tsconfigPaths()
  ]
})
