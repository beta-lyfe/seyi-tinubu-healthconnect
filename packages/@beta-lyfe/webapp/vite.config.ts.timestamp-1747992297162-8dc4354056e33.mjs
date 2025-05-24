// src/env.ts
import { createEnv } from "file:///workspaces/beta-lyfe/packages/node_modules/.pnpm/@t3-oss+env-core@0.9.2_typescript@5.6.3_zod@3.24.2/node_modules/@t3-oss/env-core/dist/index.js";
import { z } from "file:///workspaces/beta-lyfe/packages/node_modules/.pnpm/zod@3.24.2/node_modules/zod/lib/index.mjs";
var ENV = import.meta.env ?? process.env;
var env = createEnv({
  clientPrefix: "VITE_",
  client: {
    VITE_NODE_ENV: z.enum(["production", "development", "test"]).default("development"),
    VITE_BACKEND_URL: z.string().url(),
    VITE_JITSI_APP_ID: z.string()
  },
  server: {},
  runtimeEnv: {
    NODE_ENV: ENV.NODE_ENV,
    VITE_BACKEND_URL: ENV.VITE_BACKEND_URL,
    VITE_JITSI_APP_ID: ENV.VITE_JITSI_APP_ID
  }
});

// vite.config.ts
import { defineConfig } from "file:///workspaces/beta-lyfe/packages/node_modules/.pnpm/vite@5.4.14_@types+node@20.17.24_terser@5.39.0/node_modules/vite/dist/node/index.js";
import react from "file:///workspaces/beta-lyfe/packages/node_modules/.pnpm/@vitejs+plugin-react-swc@3.8.0_@swc+helpers@0.5.15_vite@5.4.14_@types+node@20.17.24_terser@5.39.0_/node_modules/@vitejs/plugin-react-swc/index.mjs";
import { TanStackRouterVite } from "file:///workspaces/beta-lyfe/packages/node_modules/.pnpm/@tanstack+router-plugin@1.114.22_@tanstack+react-router@1.114.22_react-dom@18.3.1_react_5a6ee68866dcf7a2bcf96d556379bc54/node_modules/@tanstack/router-plugin/dist/esm/vite.js";
import tsconfigPaths from "file:///workspaces/beta-lyfe/packages/node_modules/.pnpm/vite-tsconfig-paths@4.3.2_typescript@5.6.3_vite@5.4.14_@types+node@20.17.24_terser@5.39.0_/node_modules/vite-tsconfig-paths/dist/index.mjs";
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
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjL2Vudi50cyIsICJ2aXRlLmNvbmZpZy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi93b3Jrc3BhY2VzL2JldGEtbHlmZS9wYWNrYWdlcy9AYmV0YS1seWZlL3dlYmFwcC9zcmNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi93b3Jrc3BhY2VzL2JldGEtbHlmZS9wYWNrYWdlcy9AYmV0YS1seWZlL3dlYmFwcC9zcmMvZW52LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy93b3Jrc3BhY2VzL2JldGEtbHlmZS9wYWNrYWdlcy9AYmV0YS1seWZlL3dlYmFwcC9zcmMvZW52LnRzXCI7aW1wb3J0IHsgY3JlYXRlRW52IH0gZnJvbSAnQHQzLW9zcy9lbnYtY29yZSdcbmltcG9ydCB7IHogfSBmcm9tICd6b2QnXG5cbmNvbnN0IEVOViA9IChpbXBvcnQubWV0YSBhcyBhbnkpLmVudiA/PyBwcm9jZXNzLmVudlxuXG5leHBvcnQgY29uc3QgZW52ID0gY3JlYXRlRW52KHtcbiAgY2xpZW50UHJlZml4OiAnVklURV8nLFxuICBjbGllbnQ6IHtcbiAgICBWSVRFX05PREVfRU5WOiB6XG4gICAgICAuZW51bShbJ3Byb2R1Y3Rpb24nLCAnZGV2ZWxvcG1lbnQnLCAndGVzdCddKVxuICAgICAgLmRlZmF1bHQoJ2RldmVsb3BtZW50JyksXG4gICAgICBcbiAgICBWSVRFX0JBQ0tFTkRfVVJMOiB6LnN0cmluZygpLnVybCgpLFxuICAgIFZJVEVfSklUU0lfQVBQX0lEOnouc3RyaW5nKClcbiAgfSxcbiAgc2VydmVyOiB7fSxcbiAgcnVudGltZUVudjoge1xuICAgIE5PREVfRU5WOiBFTlYuTk9ERV9FTlYsXG4gICAgVklURV9CQUNLRU5EX1VSTDogRU5WLlZJVEVfQkFDS0VORF9VUkwsXG4gICAgVklURV9KSVRTSV9BUFBfSUQ6RU5WLlZJVEVfSklUU0lfQVBQX0lEXG4gIH1cbn0pXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi93b3Jrc3BhY2VzL2JldGEtbHlmZS9wYWNrYWdlcy9AYmV0YS1seWZlL3dlYmFwcFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL3dvcmtzcGFjZXMvYmV0YS1seWZlL3BhY2thZ2VzL0BiZXRhLWx5ZmUvd2ViYXBwL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy93b3Jrc3BhY2VzL2JldGEtbHlmZS9wYWNrYWdlcy9AYmV0YS1seWZlL3dlYmFwcC92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCAnLi9zcmMvZW52J1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2MnXG5pbXBvcnQgeyBUYW5TdGFja1JvdXRlclZpdGUgfSBmcm9tICdAdGFuc3RhY2svcm91dGVyLXBsdWdpbi92aXRlJ1xuaW1wb3J0IHRzY29uZmlnUGF0aHMgZnJvbSAndml0ZS10c2NvbmZpZy1wYXRocydcbi8vIGltcG9ydCB7IFZpdGVQV0EgfSBmcm9tICd2aXRlLXBsdWdpbi1wd2EnXG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICBUYW5TdGFja1JvdXRlclZpdGUoKSxcbiAgICByZWFjdCgpLFxuICAgIC8vIFZpdGVQV0Eoe1xuICAgIC8vICAgd29ya2JveDoge1xuICAgIC8vICAgICBnbG9iUGF0dGVybnM6IFsnKiovKi57anMsY3NzLGh0bWwsaWNvLHBuZyxzdmd9J10sXG4gICAgLy8gICAgIG5hdmlnYXRlRmFsbGJhY2tEZW55bGlzdDogWy9eXFwvYXBpL11cbiAgICAvLyAgIH0sXG4gICAgLy8gICAvLyBzdHJhdGVnaWVzOiAnaW5qZWN0TWFuaWZlc3QnLFxuICAgIC8vICAgZGV2T3B0aW9uczoge1xuICAgIC8vICAgICBlbmFibGVkOiB0cnVlXG4gICAgLy8gICB9LFxuICAgIC8vICAgbWFuaWZlc3Q6IHtcbiAgICAvLyAgICAgbmFtZTogJ0JldGFMeWZlJyxcbiAgICAvLyAgICAgc2hvcnRfbmFtZTogJ0JldGFMeWZlJyxcbiAgICAvLyAgICAgZGVzY3JpcHRpb246ICdCZXRhTHlmZSBtb2JpbGUgYXBwJyxcbiAgICAvLyAgICAgdGhlbWVfY29sb3I6ICcjZjM4MmVjJyxcbiAgICAvLyAgICAgc3RhcnRfdXJsOiAnL2Rhc2hib2FyZCcsXG4gICAgLy8gICAgIHJlbGF0ZWRfYXBwbGljYXRpb25zOiBbXG4gICAgLy8gICAgICAge1xuICAgIC8vICAgICAgICAgcGxhdGZvcm06ICd3ZWJhcHAnLFxuICAgIC8vICAgICAgICAgdXJsOiBgJHtwcm9jZXNzLmVudi5CQVNFX1VSTH0vbWFuaWZlc3Qud2VibWFuaWZlc3RgXG4gICAgLy8gICAgICAgfVxuICAgIC8vICAgICBdLFxuICAgIC8vICAgICBpY29uczogW1xuICAgIC8vICAgICAgIHtcbiAgICAvLyAgICAgICAgIHNyYzogJy9pbWFnZXMvbG9nby0xOTJ4MTkyLnBuZycsXG4gICAgLy8gICAgICAgICBzaXplczogJzE5MngxOTInLFxuICAgIC8vICAgICAgICAgdHlwZTogJ2ltYWdlL3BuZydcbiAgICAvLyAgICAgICB9LFxuICAgIC8vICAgICAgIHtcbiAgICAvLyAgICAgICAgIHNyYzogJy9pbWFnZXMvbG9nby01MTJ4NTEyLnBuZycsXG4gICAgLy8gICAgICAgICBzaXplczogJzUxMng1MTInLFxuICAgIC8vICAgICAgICAgdHlwZTogJ2ltYWdlL3BuZydcbiAgICAvLyAgICAgICB9XG4gICAgLy8gICAgIF1cbiAgICAvLyAgIH1cbiAgICAvLyB9KSxcbiAgICB0c2NvbmZpZ1BhdGhzKClcbiAgXVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBOFQsU0FBUyxpQkFBaUI7QUFDeFYsU0FBUyxTQUFTO0FBRWxCLElBQU0sTUFBTyxZQUFvQixPQUFPLFFBQVE7QUFFekMsSUFBTSxNQUFNLFVBQVU7QUFBQSxFQUMzQixjQUFjO0FBQUEsRUFDZCxRQUFRO0FBQUEsSUFDTixlQUFlLEVBQ1osS0FBSyxDQUFDLGNBQWMsZUFBZSxNQUFNLENBQUMsRUFDMUMsUUFBUSxhQUFhO0FBQUEsSUFFeEIsa0JBQWtCLEVBQUUsT0FBTyxFQUFFLElBQUk7QUFBQSxJQUNqQyxtQkFBa0IsRUFBRSxPQUFPO0FBQUEsRUFDN0I7QUFBQSxFQUNBLFFBQVEsQ0FBQztBQUFBLEVBQ1QsWUFBWTtBQUFBLElBQ1YsVUFBVSxJQUFJO0FBQUEsSUFDZCxrQkFBa0IsSUFBSTtBQUFBLElBQ3RCLG1CQUFrQixJQUFJO0FBQUEsRUFDeEI7QUFDRixDQUFDOzs7QUNwQkQsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsMEJBQTBCO0FBQ25DLE9BQU8sbUJBQW1CO0FBRzFCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLG1CQUFtQjtBQUFBLElBQ25CLE1BQU07QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFvQ04sY0FBYztBQUFBLEVBQ2hCO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
