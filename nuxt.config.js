const pkg = require('./package')

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  mode: 'universal',

  env: {
    API_URL: isProd ? 'http://bookist.cc/api' : 'http://localhost:3001/api',
    API_URL_SSR: 'http://bookist.cc/api',
    IMAGE_URL: 'http://pic.bookist.cc' //'https://img.bookist.cc'
  },

  head: {
    title: '优质电子书分享',
    titleTemplate: '%s - 书大师',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'keywords',
        name: 'keywords',
        content: '电子书, 书籍, 图书, 下载, E-book, pdf, azw3, epub, mobi'
      },
      {
        hid: 'description',
        name: 'description',
        content:
          '这是一个电子书资源分享与交流的小站，通过社区的力量，把网络能搜集到的电子书资源（包含PDF、AZW3、EPUB、MOBI格式）进行共享和管理，方便大家查找和免费下载。'
      }
    ],
    link: [
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png'
      },
      { rel: 'manifest', href: '/site.webmanifest' },
      { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#5bbad5' }
      // {
      //   rel: 'stylesheet',
      //   href:
      //     'https://cdnjs.cloudflare.com/ajax/libs/github-fork-ribbon-css/0.2.2/gh-fork-ribbon.min.css'
      // }
    ]
  },

  loading: { color: '#e76e92' },

  css: [
    { lang: 'scss', src: '~/assets/css/index.scss' },
    { lang: 'css', src: 'buefy/dist/buefy.css' }
  ],

  plugins: [
    '~/plugins/extensions',
    '~/plugins/svg-icon',
    '~/plugins/imports',
    { src: '~/plugins/route-hook.js', ssr: false }
  ],

  modules: [
    ['@nuxtjs/google-analytics', { id: 'UA-81493244-3' }],
    [
      'nuxt-sass-resources-loader',
      ['assets/css/_variables.scss', 'assets/css/_mixins.scss']
    ]
  ],

  build: {
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }

      // Remove svg extension from url-loader
      // console.log(config.module.rules)
      const urlLoader = config.module.rules.find(
        x => x.test && x.test.toString().indexOf('svg') > 0
      )
      urlLoader.test = /\.(png|jpe?g|gif|webp)$/
      config.module.rules.push({
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-inline-loader',
            options: {
              // classPrefix: 'svg-',
              // removingTagAttrs: ['fill']
            }
          }
        ]
      })
    }
  },

  router: {
    linkActiveClass: 'is-active',
    scrollBehavior: function(to, from, savedPosition) {
      return { x: 0, y: 0 }
    },
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'page',
        path: '/page/:page',
        component: resolve(__dirname, 'pages/index.vue')
      })
      routes.push({
        name: 'tag',
        path: '/tag/:tag',
        component: resolve(__dirname, 'pages/index.vue')
      })
      routes.push({
        name: 'search',
        path: '/search',
        component: resolve(__dirname, 'pages/index.vue')
      })
    }
  }
}
