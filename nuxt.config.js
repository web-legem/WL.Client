module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'wl.client',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { id: 'description', name: 'description', content: 'Sistema de Documentación Legal de la Universidad de Nariño' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: [
    '@/assets/base.css'
    , '@/assets/iconos-legem1/styles.css' 
    , '@/assets/iconos-legem2/style.css'
    , '@/assets/escudos-legem/style.css'
    , '@/assets/inputs.css'
    , '@/assets/basic-form.css'    
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      // if(isDev) config.devtool = "#sourcemap"
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
    }]
  ],
  axios: {
    // proxyHeaders: false,
    host: 'localhost'
    , port: '5000'
    , retry: {  retries: 0 }
  },
  // axios: {
  //   host: '192.168.0.4'
  //   , port: '54037'
  // axios: {
  //   host: '192.168.0.6',
  //   port: '54037',
  //   retry: { retries: 0 },
  // }
}
