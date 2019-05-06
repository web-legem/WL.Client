
export const state = () => ({
  loading: false,
  loaded: false,
  error: null,
  classifiedFile: null,
  loading: false,
})

export const getters = {
  isAlreadyClassified: (state) => state.classifiedFile != null
}

export const mutations = {
  loading(state) {
    state.loading = true
    state.loaded = false
    state.classifiedFile = null
    state.error = null
  }
  , loadingSuccess(state, classifiedFile) {
    state.loading = false
    state.loaded = true
    state.classifiedFile = classifiedFile
  }
  , loadingFailure(state, error) {
    state.loading = false
    state.loaded = false
    state.error = error
  }
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
  }
}