import '../../src/env'
import { defineConfig } from 'vitepress'
import d2 from 'vitepress-plugin-d2'
import { Layout, Theme, FileType } from 'vitepress-plugin-d2/dist/config'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Igbo Voice Assistant',
  description: 'Documentation for the Igbo Voice Assistant',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' }
      // { text: "Examples", link: "/markdown-examples" },
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Introduction', link: '/guide/introduction' },
        ]
      },
      {
        text: 'System Architecture',
        items: [
          { text: 'Frontend', link: '/guide/frontend' },
          { text: 'Backend', link: '/guide/backend' },
          {
            text: 'Backend Components',
            items: [
              { text: 'Speech-to-Text', link: '/guide/speech-to-text' },
              { text: 'Translation', link: '/guide/translation' },
              { text: 'LLM Integration', link: '/guide/llm-integration' },
              { text: 'Text-to-Speech', link: '/guide/text-to-speech' },
            ]
          }
        ]
      }
    ]
  },
  markdown: {
    config: (md) => {
      // Use D2 diagram plugin with optional configuration
      md.use(d2, {
        forceAppendix: false,
        layout: Layout.ELK,
        theme: Theme.VANILLA_NITRO_COLA,
        darkTheme: Theme.DARK_MUAVE,
        padding: 100,
        animatedInterval: 0,
        timeout: 120,
        sketch: true,
        center: false,
        scale: -1,
        target: '*',
        fontItalic: null,
        fontBold: null,
        fontSemiBold: null,
        fileType: FileType.SVG,
        directory: 'd2-diagrams'
      })
    }
  }
})
