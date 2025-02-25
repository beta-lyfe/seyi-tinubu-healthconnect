// vite.config.ts
import { defineConfig } from "file:///C:/Users/hp/Documents/projects/beta-lyfe/packages/node_modules/.pnpm/vite@5.4.14_@types+node@20.17.14_terser@5.37.0/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/hp/Documents/projects/beta-lyfe/packages/node_modules/.pnpm/@vitejs+plugin-react-swc@3.7.2_@swc+helpers@0.5.15_vite@5.4.14_@types+node@20.17.14_terser@5.37.0_/node_modules/@vitejs/plugin-react-swc/index.mjs";
import { TanStackRouterVite } from "file:///C:/Users/hp/Documents/projects/beta-lyfe/packages/node_modules/.pnpm/@tanstack+router-plugin@1.97.3_@tanstack+react-router@1.97.3_react-dom@18.3.1_react@18.3.1__r_ugck7c4x3xq5d7spzzbxc563wa/node_modules/@tanstack/router-plugin/dist/esm/vite.js";
import tsconfigPaths from "file:///C:/Users/hp/Documents/projects/beta-lyfe/packages/node_modules/.pnpm/vite-tsconfig-paths@4.3.2_typescript@5.6.3_vite@5.4.14_@types+node@20.17.14_terser@5.37.0_/node_modules/vite-tsconfig-paths/dist/index.mjs";
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxocFxcXFxEb2N1bWVudHNcXFxccHJvamVjdHNcXFxcYmV0YS1seWZlXFxcXHBhY2thZ2VzXFxcXEBiZXRhLWx5ZmVcXFxcd2ViYXBwXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxocFxcXFxEb2N1bWVudHNcXFxccHJvamVjdHNcXFxcYmV0YS1seWZlXFxcXHBhY2thZ2VzXFxcXEBiZXRhLWx5ZmVcXFxcd2ViYXBwXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9ocC9Eb2N1bWVudHMvcHJvamVjdHMvYmV0YS1seWZlL3BhY2thZ2VzL0BiZXRhLWx5ZmUvd2ViYXBwL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0LXN3YydcclxuaW1wb3J0IHsgVGFuU3RhY2tSb3V0ZXJWaXRlIH0gZnJvbSAnQHRhbnN0YWNrL3JvdXRlci1wbHVnaW4vdml0ZSdcclxuaW1wb3J0IHRzY29uZmlnUGF0aHMgZnJvbSAndml0ZS10c2NvbmZpZy1wYXRocydcclxuaW1wb3J0IHsgVml0ZVBXQSB9IGZyb20gJ3ZpdGUtcGx1Z2luLXB3YSdcclxuaW1wb3J0IHsgZW52IH0gZnJvbSAnLi9zcmMvZW52J1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBwbHVnaW5zOiBbXHJcbiAgICBUYW5TdGFja1JvdXRlclZpdGUoKSxcclxuICAgIHJlYWN0KCksXHJcbiAgICAvLyBWaXRlUFdBKHtcclxuICAgIC8vICAgd29ya2JveDoge1xyXG4gICAgLy8gICAgIGdsb2JQYXR0ZXJuczogWycqKi8qLntqcyxjc3MsaHRtbCxpY28scG5nLHN2Z30nXSxcclxuICAgIC8vICAgICBuYXZpZ2F0ZUZhbGxiYWNrRGVueWxpc3Q6IFsvXlxcL2FwaS9dXHJcbiAgICAvLyAgIH0sXHJcbiAgICAvLyAgIC8vIHN0cmF0ZWdpZXM6ICdpbmplY3RNYW5pZmVzdCcsXHJcbiAgICAvLyAgIGRldk9wdGlvbnM6IHtcclxuICAgIC8vICAgICBlbmFibGVkOiB0cnVlXHJcbiAgICAvLyAgIH0sXHJcbiAgICAvLyAgIG1hbmlmZXN0OiB7XHJcbiAgICAvLyAgICAgbmFtZTogJ0JldGFMeWZlJyxcclxuICAgIC8vICAgICBzaG9ydF9uYW1lOiAnQmV0YUx5ZmUnLFxyXG4gICAgLy8gICAgIGRlc2NyaXB0aW9uOiAnQmV0YUx5ZmUgbW9iaWxlIGFwcCcsXHJcbiAgICAvLyAgICAgdGhlbWVfY29sb3I6ICcjZjM4MmVjJyxcclxuICAgIC8vICAgICBzdGFydF91cmw6ICcvZGFzaGJvYXJkJyxcclxuICAgIC8vICAgICByZWxhdGVkX2FwcGxpY2F0aW9uczogW1xyXG4gICAgLy8gICAgICAge1xyXG4gICAgLy8gICAgICAgICBwbGF0Zm9ybTogJ3dlYmFwcCcsXHJcbiAgICAvLyAgICAgICAgIHVybDogYCR7cHJvY2Vzcy5lbnYuQkFTRV9VUkx9L21hbmlmZXN0LndlYm1hbmlmZXN0YFxyXG4gICAgLy8gICAgICAgfVxyXG4gICAgLy8gICAgIF0sXHJcbiAgICAvLyAgICAgaWNvbnM6IFtcclxuICAgIC8vICAgICAgIHtcclxuICAgIC8vICAgICAgICAgc3JjOiAnL2ltYWdlcy9sb2dvLTE5MngxOTIucG5nJyxcclxuICAgIC8vICAgICAgICAgc2l6ZXM6ICcxOTJ4MTkyJyxcclxuICAgIC8vICAgICAgICAgdHlwZTogJ2ltYWdlL3BuZydcclxuICAgIC8vICAgICAgIH0sXHJcbiAgICAvLyAgICAgICB7XHJcbiAgICAvLyAgICAgICAgIHNyYzogJy9pbWFnZXMvbG9nby01MTJ4NTEyLnBuZycsXHJcbiAgICAvLyAgICAgICAgIHNpemVzOiAnNTEyeDUxMicsXHJcbiAgICAvLyAgICAgICAgIHR5cGU6ICdpbWFnZS9wbmcnXHJcbiAgICAvLyAgICAgICB9XHJcbiAgICAvLyAgICAgXVxyXG4gICAgLy8gICB9XHJcbiAgICAvLyB9KSxcclxuICAgIHRzY29uZmlnUGF0aHMoKVxyXG4gIF1cclxufSlcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE2WSxTQUFTLG9CQUFvQjtBQUMxYSxPQUFPLFdBQVc7QUFDbEIsU0FBUywwQkFBMEI7QUFDbkMsT0FBTyxtQkFBbUI7QUFJMUIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsbUJBQW1CO0FBQUEsSUFDbkIsTUFBTTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQW9DTixjQUFjO0FBQUEsRUFDaEI7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
