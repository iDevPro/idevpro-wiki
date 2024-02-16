import { defineConfig } from 'vitepress'
import { normalize } from './utils'
import { rewrites } from './paths'

import VitepressMarkdownTimeline from "vitepress-markdown-timeline";
import markdownItKbd from 'markdown-it-kbd'
import markdownItTaskLists from 'markdown-it-task-lists'
import markdownItImplicitFigures from 'markdown-it-implicit-figures'
import markdownItEmbed from 'markdown-it-html5-embed'
import markdownItConditionalRender from 'markdown-it-conditional-render'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  vite: {
    ssr: {
      noExternal: [
        '@nolebase/vitepress-plugin-enhanced-readabilities',
        '@nolebase/vitepress-plugin-page-properties',
      ],
    },
  },
  title: "iDev.pro wiki",
  description: "A small blog like wiki",
  lang: 'ru-RU',
  srcDir: './docs',
  base: '/idevpro-wiki',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' },
      { text: 'About', link: '/about-me' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],

    lastUpdated: {
      text: 'Последнее обновление',
      formatOptions: {
        dateStyle: 'medium',
        timeStyle: 'medium'
      }
    },

    returnToTopLabel: 'Наверх',
    sidebarMenuLabel: 'Меню',
    
    docFooter: {
      prev: 'Предыдущая страница',
      next: 'Следующая страница'
    },
    
    darkModeSwitchLabel: 'Тема',
    outlineTitle: 'Оглавление',
    outline: {
      level: [2, 3],
    },
    notFound: {
      title: 'Страница не найдена',
      quote: 'Похоже, что вы перешли по неверной или устаревшей ссылке. Вы можете воспользоваться поиском.',
      linkText: 'Вернуться на главную'
    }
  },
  rewrites: rewrites,
  markdown: {
    container: {
      tipLabel: 'Подсказка',
      warningLabel: 'Внимание',
      dangerLabel: 'Осторожно',
      infoLabel: 'Информация',
      detailsLabel: 'Подробнее',
    },
    config: (md) => {
      md.use(markdownItKbd);
      md.use(markdownItTaskLists);
      md.use(VitepressMarkdownTimeline);
      md.use(markdownItImplicitFigures, {
        figcaption: 'title',
        copyAttrs: '^class$'
      });
      md.use(markdownItEmbed, {
        html5embed: {
          useImageSyntax: true, // Enables video/audio embed with ![]() syntax (default)
        }
      });
      md.use(markdownItConditionalRender);
    }
  }
})
