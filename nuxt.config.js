module.exports = {
  head: {
    title: 'Legem',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { id: 'description', name: 'description', content: 'Sistema de Documentación Legal de la Universidad de Nariño' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/faviconv2.ico' }
    ]
  },
  css: [
    '@/assets/base.css'
    , '@/assets/iconos-legem1/styles.css' 
    , '@/assets/iconos-legem2/style.css'
    , '@/assets/escudos-legem/style.css'    
    , '@/assets/basic-form.css'
  ],
  loading: '~/components/loading.vue',
  build: {
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      if(isDev) config.devtool = isClient ? 'source-map' : 'inline-source-map'
    },
  },
  plugins: [
    '~/plugins/filters.js',
    '~/plugins/vee-validate.js',
    '~/plugins/axios.js',
  ],
  modules: [
    'nuxt-vuex-router-sync',
    ['nuxt-i18n', {
      locales: [
        { code: 'es', name: 'Español', iso: 'es-CO', file: 'es.js' }
        , { code: 'en', name: 'English', iso: 'en-US', file: 'en.js' }
      ],
      defaultLocale: 'es',
      lazy: true,
      langDir: 'locales/',
    }]
    , '@nuxtjs/axios'
    , ['nuxt-mq', {
      breakpoints: {
        xs: 300
        , sm: 500
        , md: 800
        , mid: 992
        , lg: 1200
        , xl: Infinity
      },
      defaultBreakpoint: 'lg',
    }],
    ['cookie-universal-nuxt', { alias: 'cookies' }],
  ],
  messages: {
    loading: 'Carganado...',
    error_404: 'Lo sentimos, no encontró la pagina solicitada',
    server_error: 'Server error',
    nuxtjs: 'Nuxt.js',
    back_to_home: 'Ir al inicio',
    server_error_details:
      'An error occurred in the application and your page could not be served. If you are the application owner, check your logs for details.',
    client_error: 'Error',
    client_error_details:
      'An error occurred while rendering the page. Check developer tools console for details.'
  },
  axios: {
    retry: {  retries: 0 },
    proxy: true
  },
  proxy: {
    '/api/': 'http://localhost:5000/'
    // '/api/': 'http://192.168.0.6:54037/'
  }
}
