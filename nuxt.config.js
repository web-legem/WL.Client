module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'wl.client',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Sistema de Documentación Legal de la Universidad de Nariño' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
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
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
  },  
  plugins: [
    '~/plugins/vee-validate.js'
  ],
  modules: [
    [ 'nuxt-i18n', {  
      locales: [ 
        { code: 'en', iso: 'en-US', file: 'en.js'},
        { code: 'es', iso: 'es-CO', file: 'es.js'}
      ],
      defaultLocale: 'es',
      lazy: true,
      langDir: 'locales/'
    }],
    '@nuxtjs/axios'
  ],
  axios: {
    // proxyHeaders: false,
    host: 'localhost',
    port: '54037',
    retry: {  retries: 2 }
  },
}
