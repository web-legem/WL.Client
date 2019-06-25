import errorHandler from '~/helpers/errorHandler'

export const state = () => ({
  loading: false,
  loaded: false,
  error: null,
  classifiedFile: null,
  loading: false,
})

export const getters = {
  isAlreadyClassified: (state) => state.classifiedFile != null,
  error: (state) => state.error,
  loading: (state) => state.loading,
}

export const mutations = {
  loading(state) {
    state.loading = true
    state.loaded = false
    state.classifiedFile = null
    state.error = null
  },
  loadingSuccess(state, classifiedFile) {
    state.loading = false
    state.loaded = true
    state.classifiedFile = classifiedFile
  },
  loadingFailure(state, error) {
    state.loading = false
    state.loaded = false
    state.error = error
  },
  creatingError(state, payload) {
    state.loading = false
    if(payload != null && payload != undefined){
      payload.extra = 'newDocument';
    }
    state.error = errorHandler(payload)
  },
  deletingError(state, payload) {
    state.loading = false
    state.error = errorHandler(payload)
  },
  clearError(state) {
    state.error = null
  },
}

export const actions = {
  loadData({commit, state}, fileId){
    if(!state.loading){
      commit('loading')
      return this.$axios.get('/api/ClassifiedFile/' + fileId)
        .then(response => commit('loadingSuccess', response.data))
        .catch(e => {
          delete e.response.config
          delete e.response.request
          return commit('loadingFailure', e.response)
        })
    }
  },
  clearError({commit}) {
    commit('clearError')
  },

  throwError({commit}, error){
    return commit('creatingError',error)
  }

}