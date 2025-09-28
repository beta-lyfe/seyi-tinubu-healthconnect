import '../../src/env'
import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'BetaLyfe',
  description: 'Documentation for BetaLyfe',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'API', link: '/api' }
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Introduction', link: '/guide/introduction' },
        ]
      },
      {
        text: 'API',
        items: [
          { text: 'API Reference', link: '/api' },
        ]
      }
    ]
  },
})
