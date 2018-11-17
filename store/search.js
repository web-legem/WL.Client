
export const state = () => ({
  entities: [],
  documentTypes: [],
  loading: false,
  loaded: false,
  error: false
})

export const getters = {
  entities: (state) => state.entities,
  documentTypes: (state) => state.documentTypes
}

export const mutations = {
  loading(state) {
    state.loading = true
    state.loaded = false
    state.entities = []
    state.documentTypes = []
    state.error = null
  },
  loadingSuccess(state, {entities, documentTypes}) {
    state.loading = false
    state.loaded = true
    state.entities = entities
    state.documentTypes = documentTypes
    state.error = null
  },
  loadingFailure(state, error) {
    console.log(error)
    state.loading = false
    state.loaded = false
    state.error = error
  }
}

export const actions = {
  loadData({commit}) {
    commit('loading')
    return Promise.all([
      this.$axios.get('/api/Entity'),
      this.$axios.get('/api/DocumentType')
    ]).then(results => {
      commit('loadingSuccess', { 
        entities: results[0].data,
        documentTypes: results[1].data })
    }).catch(e => commit('loadingFailure', e))
  }
}