// src/env.ts
import { createEnv } from 'file:///C:/Users/hp/Documents/projects/beta-lyfe/packages/node_modules/.pnpm/@t3-oss+env-core@0.9.2_typescript@5.6.3_zod@3.24.2/node_modules/@t3-oss/env-core/dist/index.js'
import { z } from 'file:///C:/Users/hp/Documents/projects/beta-lyfe/packages/node_modules/.pnpm/zod@3.24.2/node_modules/zod/lib/index.mjs'
var ENV = import.meta.env ?? process.env
var env = createEnv({
  clientPrefix: 'VITE_',
  client: {
    VITE_NODE_ENV: z
      .enum(['production', 'development', 'test'])
      .default('development'),
    VITE_HUDDLE01_PROJECT_ID: z.string(),
    VITE_BACKEND_URL: z.string().url()
  },
  server: {},
  runtimeEnv: {
    NODE_ENV: ENV.NODE_ENV,
    VITE_HUDDLE01_PROJECT_ID: ENV.VITE_HUDDLE01_PROJECT_ID,
    VITE_BACKEND_URL: ENV.VITE_BACKEND_URL
  }
})

// vite.config.ts
import { defineConfig } from 'file:///C:/Users/hp/Documents/projects/beta-lyfe/packages/node_modules/.pnpm/vite@5.4.14_@types+node@20.17.24_terser@5.39.0/node_modules/vite/dist/node/index.js'
import react from 'file:///C:/Users/hp/Documents/projects/beta-lyfe/packages/node_modules/.pnpm/@vitejs+plugin-react-swc@3.8.0_@swc+helpers@0.5.15_vite@5.4.14_@types+node@20.17.24_terser@5.39.0_/node_modules/@vitejs/plugin-react-swc/index.mjs'
import { TanStackRouterVite } from 'file:///C:/Users/hp/Documents/projects/beta-lyfe/packages/node_modules/.pnpm/@tanstack+router-plugin@1.114.22_@tanstack+react-router@1.114.22_react-dom@18.3.1_react@18.3._qcbpp2mgr7poqioja526pz6r74/node_modules/@tanstack/router-plugin/dist/esm/vite.js'
import tsconfigPaths from 'file:///C:/Users/hp/Documents/projects/beta-lyfe/packages/node_modules/.pnpm/vite-tsconfig-paths@4.3.2_typescript@5.6.3_vite@5.4.14_@types+node@20.17.24_terser@5.39.0_/node_modules/vite-tsconfig-paths/dist/index.mjs'
var vite_config_default = defineConfig({
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
export { vite_config_default as default }
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjL2Vudi50cyIsICJ2aXRlLmNvbmZpZy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGhwXFxcXERvY3VtZW50c1xcXFxwcm9qZWN0c1xcXFxiZXRhLWx5ZmVcXFxccGFja2FnZXNcXFxcQGJldGEtbHlmZVxcXFx3ZWJhcHBcXFxcc3JjXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxocFxcXFxEb2N1bWVudHNcXFxccHJvamVjdHNcXFxcYmV0YS1seWZlXFxcXHBhY2thZ2VzXFxcXEBiZXRhLWx5ZmVcXFxcd2ViYXBwXFxcXHNyY1xcXFxlbnYudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2hwL0RvY3VtZW50cy9wcm9qZWN0cy9iZXRhLWx5ZmUvcGFja2FnZXMvQGJldGEtbHlmZS93ZWJhcHAvc3JjL2Vudi50c1wiO2ltcG9ydCB7IGNyZWF0ZUVudiB9IGZyb20gJ0B0My1vc3MvZW52LWNvcmUnXHJcbmltcG9ydCB7IHogfSBmcm9tICd6b2QnXHJcblxyXG5jb25zdCBFTlYgPSAoaW1wb3J0Lm1ldGEgYXMgYW55KS5lbnYgPz8gcHJvY2Vzcy5lbnZcclxuXHJcbmV4cG9ydCBjb25zdCBlbnYgPSBjcmVhdGVFbnYoe1xyXG4gIGNsaWVudFByZWZpeDogJ1ZJVEVfJyxcclxuICBjbGllbnQ6IHtcclxuICAgIFZJVEVfTk9ERV9FTlY6IHpcclxuICAgICAgLmVudW0oWydwcm9kdWN0aW9uJywgJ2RldmVsb3BtZW50JywgJ3Rlc3QnXSlcclxuICAgICAgLmRlZmF1bHQoJ2RldmVsb3BtZW50JyksXHJcbiAgICBWSVRFX0hVRERMRTAxX1BST0pFQ1RfSUQ6IHouc3RyaW5nKCksXHJcbiAgICBWSVRFX0JBQ0tFTkRfVVJMOiB6LnN0cmluZygpLnVybCgpXHJcbiAgfSxcclxuICBzZXJ2ZXI6IHsgfSxcclxuICBydW50aW1lRW52OiB7XHJcbiAgICBOT0RFX0VOVjogRU5WLk5PREVfRU5WLFxyXG4gICAgVklURV9IVURETEUwMV9QUk9KRUNUX0lEOiBFTlYuVklURV9IVURETEUwMV9QUk9KRUNUX0lELFxyXG4gICAgVklURV9CQUNLRU5EX1VSTDogRU5WLlZJVEVfQkFDS0VORF9VUkwsXHJcbiAgfVxyXG59KVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGhwXFxcXERvY3VtZW50c1xcXFxwcm9qZWN0c1xcXFxiZXRhLWx5ZmVcXFxccGFja2FnZXNcXFxcQGJldGEtbHlmZVxcXFx3ZWJhcHBcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGhwXFxcXERvY3VtZW50c1xcXFxwcm9qZWN0c1xcXFxiZXRhLWx5ZmVcXFxccGFja2FnZXNcXFxcQGJldGEtbHlmZVxcXFx3ZWJhcHBcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2hwL0RvY3VtZW50cy9wcm9qZWN0cy9iZXRhLWx5ZmUvcGFja2FnZXMvQGJldGEtbHlmZS93ZWJhcHAvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgJy4vc3JjL2VudidcclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0LXN3YydcclxuaW1wb3J0IHsgVGFuU3RhY2tSb3V0ZXJWaXRlIH0gZnJvbSAnQHRhbnN0YWNrL3JvdXRlci1wbHVnaW4vdml0ZSdcclxuaW1wb3J0IHRzY29uZmlnUGF0aHMgZnJvbSAndml0ZS10c2NvbmZpZy1wYXRocydcclxuLy8gaW1wb3J0IHsgVml0ZVBXQSB9IGZyb20gJ3ZpdGUtcGx1Z2luLXB3YSdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcGx1Z2luczogW1xyXG4gICAgVGFuU3RhY2tSb3V0ZXJWaXRlKCksXHJcbiAgICByZWFjdCgpLFxyXG4gICAgLy8gVml0ZVBXQSh7XHJcbiAgICAvLyAgIHdvcmtib3g6IHtcclxuICAgIC8vICAgICBnbG9iUGF0dGVybnM6IFsnKiovKi57anMsY3NzLGh0bWwsaWNvLHBuZyxzdmd9J10sXHJcbiAgICAvLyAgICAgbmF2aWdhdGVGYWxsYmFja0RlbnlsaXN0OiBbL15cXC9hcGkvXVxyXG4gICAgLy8gICB9LFxyXG4gICAgLy8gICAvLyBzdHJhdGVnaWVzOiAnaW5qZWN0TWFuaWZlc3QnLFxyXG4gICAgLy8gICBkZXZPcHRpb25zOiB7XHJcbiAgICAvLyAgICAgZW5hYmxlZDogdHJ1ZVxyXG4gICAgLy8gICB9LFxyXG4gICAgLy8gICBtYW5pZmVzdDoge1xyXG4gICAgLy8gICAgIG5hbWU6ICdCZXRhTHlmZScsXHJcbiAgICAvLyAgICAgc2hvcnRfbmFtZTogJ0JldGFMeWZlJyxcclxuICAgIC8vICAgICBkZXNjcmlwdGlvbjogJ0JldGFMeWZlIG1vYmlsZSBhcHAnLFxyXG4gICAgLy8gICAgIHRoZW1lX2NvbG9yOiAnI2YzODJlYycsXHJcbiAgICAvLyAgICAgc3RhcnRfdXJsOiAnL2Rhc2hib2FyZCcsXHJcbiAgICAvLyAgICAgcmVsYXRlZF9hcHBsaWNhdGlvbnM6IFtcclxuICAgIC8vICAgICAgIHtcclxuICAgIC8vICAgICAgICAgcGxhdGZvcm06ICd3ZWJhcHAnLFxyXG4gICAgLy8gICAgICAgICB1cmw6IGAke3Byb2Nlc3MuZW52LkJBU0VfVVJMfS9tYW5pZmVzdC53ZWJtYW5pZmVzdGBcclxuICAgIC8vICAgICAgIH1cclxuICAgIC8vICAgICBdLFxyXG4gICAgLy8gICAgIGljb25zOiBbXHJcbiAgICAvLyAgICAgICB7XHJcbiAgICAvLyAgICAgICAgIHNyYzogJy9pbWFnZXMvbG9nby0xOTJ4MTkyLnBuZycsXHJcbiAgICAvLyAgICAgICAgIHNpemVzOiAnMTkyeDE5MicsXHJcbiAgICAvLyAgICAgICAgIHR5cGU6ICdpbWFnZS9wbmcnXHJcbiAgICAvLyAgICAgICB9LFxyXG4gICAgLy8gICAgICAge1xyXG4gICAgLy8gICAgICAgICBzcmM6ICcvaW1hZ2VzL2xvZ28tNTEyeDUxMi5wbmcnLFxyXG4gICAgLy8gICAgICAgICBzaXplczogJzUxMng1MTInLFxyXG4gICAgLy8gICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJ1xyXG4gICAgLy8gICAgICAgfVxyXG4gICAgLy8gICAgIF1cclxuICAgIC8vICAgfVxyXG4gICAgLy8gfSksXHJcbiAgICB0c2NvbmZpZ1BhdGhzKClcclxuICBdXHJcbn0pXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBMlksU0FBUyxpQkFBaUI7QUFDcmEsU0FBUyxTQUFTO0FBRWxCLElBQU0sTUFBTyxZQUFvQixPQUFPLFFBQVE7QUFFekMsSUFBTSxNQUFNLFVBQVU7QUFBQSxFQUMzQixjQUFjO0FBQUEsRUFDZCxRQUFRO0FBQUEsSUFDTixlQUFlLEVBQ1osS0FBSyxDQUFDLGNBQWMsZUFBZSxNQUFNLENBQUMsRUFDMUMsUUFBUSxhQUFhO0FBQUEsSUFDeEIsMEJBQTBCLEVBQUUsT0FBTztBQUFBLElBQ25DLGtCQUFrQixFQUFFLE9BQU8sRUFBRSxJQUFJO0FBQUEsRUFDbkM7QUFBQSxFQUNBLFFBQVEsQ0FBRTtBQUFBLEVBQ1YsWUFBWTtBQUFBLElBQ1YsVUFBVSxJQUFJO0FBQUEsSUFDZCwwQkFBMEIsSUFBSTtBQUFBLElBQzlCLGtCQUFrQixJQUFJO0FBQUEsRUFDeEI7QUFDRixDQUFDOzs7QUNuQkQsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsMEJBQTBCO0FBQ25DLE9BQU8sbUJBQW1CO0FBRzFCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLG1CQUFtQjtBQUFBLElBQ25CLE1BQU07QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFvQ04sY0FBYztBQUFBLEVBQ2hCO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
