module.exports = {
  env: {
    API_URL: 'https://bookist.cc/api',
    IMAGE_URL: 'https://img.bookist.cc',
  },
  modules: [
    [
      '@nuxtjs/google-analytics',
      {
        id: 'UA-81493244-3',
      },
    ],
  ],
  // Headers of the page
  head: {
    title: '优质电子书分享',
    titleTemplate: '%s - 书大师',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'keywords',
        name: 'keywords',
        content:
          '电子书, 书籍, 下载, E-book, pdf, azw3, epub, mobi, 图书, 免费',
      },
      {
        hid: 'description',
        name: 'description',
        content:
          '这是一个电子书资源分享与交流的小站，通过社区的力量，把网络能搜集到的免费电子书资源（包含PDF、AZW3、EPUB、MOBI格式）进行共享和管理，方便大家查找和免费下载。快来找找有没有自己喜欢的电子书吧！',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://cdnjs.cloudflare.com/ajax/libs/github-fork-ribbon-css/0.2.2/gh-fork-ribbon.min.css',
      },
    ],
  },

  // Customize the progress bar color
  loading: { color: '#e76e92' },

  // Build configuration
  build: {
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        })
      }
      // Global import for sass
      // Ref: https://github.com/nuxt/nuxt.js/issues/1092
      config.module.rules.forEach(rule => {
        const scssImports =
          '@import "./assets/css/_variables.scss";' +
          '@import "./assets/css/_mixins.scss";'
        if (rule.test.toString() === '/\\.vue$/') {
          rule.options.loaders.scss[2].options.data = scssImports
        }
        if (['/\\.scss$/'].indexOf(rule.test.toString()) !== -1) {
          let loader = rule.use.find(x => x.loader === 'sass-loader')
          loader.options.data = scssImports
        }
      })

      // Remove svg extension from url-loader
      const urlLoader = config.module.rules.find(x => x.loader === 'url-loader')
      urlLoader.test = /\.(png|jpe?g|gif)$/
      config.module.rules.push({
        test: /\.svg$/,
        loader: 'svg-inline-loader',
        options: {
          // classPrefix: 'svg-',
          // removingTagAttrs: ['fill']
        },
      })
    },
    vendor: ['axios'],
  },
  plugins: [
    '~plugins/extensions',
    '~plugins/svg-icon',
    // { src: '~plugins/ga.js', ssr: false }
  ],
  css: [{ lang: 'scss', src: '~assets/css/index.scss' }],
  router: {
    scrollBehavior: function(to, from, savedPosition) {
      return { x: 0, y: 0 }
    },
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'page',
        path: '/page/:page',
        component: resolve(__dirname, 'pages/index.vue'),
      })
      routes.push({
        name: 'tag',
        path: '/tag/:tag',
        component: resolve(__dirname, 'pages/index.vue'),
      })
    },
  },
}
