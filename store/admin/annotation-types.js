
export const state = () => ({
  list: []
  , loading: false
  , loaded: false
  , error: null
})

export const getters = {
  annotationTypes: (state) => state.list
}

export const mutations = {
  loading(state) {
    state.loading = true
    state.loaded = false
    state.list = []
    state.error = null
  }
  , loadingSuccess(state, payload) {
    state.loading = false
    state.loaded = true
    state.list = payload
    state.error = null
  }
  , loadingFailure(state, payload) {
    state.loading = false
    state.loaded = false
    state.list = []
    state.error = payload
  }
}

export const actions = {
  loadData({commit}) {
    commit('loading')
    return this.$axios.get('/api/AnnotationType')
      .then(response => commit('loadingSuccess', response.data))
      .catch(e => commit('loadingFailure', 'Error'))
  }
}