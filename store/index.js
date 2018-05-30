import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      locales: ['en', 'es'],
      locale: 'es'
    },
    mutations: {
      SET_LANG(state, locale) {        
        if (state.locales.indexOf(locale) !== -1) {          
          state.locale = locale
        }
      }
    },
    actions: {
      changeLanguage (context, lang) {        
        context.commit('SET_LANG', lang )
      }
    }
  })
}

export default createStore