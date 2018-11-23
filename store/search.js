
export const state = () => ({
  entities: [],
  documentTypes: [],
  loading: false,
  loaded: false,
  error: null,
  searchResults: [],
  searchError: null,
  loadingTotalCount: false,
  totalCount: 0,
  totalCountError: null,
})

export const getters = {
  entities: (state) => state.entities,
  documentTypes: (state) => state.documentTypes,
  searchResults: (state) => state.searchResults,
  searchError: (state) => state.error,
  totalCount: (state) => state.totalCount,
  loadingTotalCount: (state) => state.loadingTotalCount
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
    state.loading = false
    state.loaded = false
    state.error = error
  },
  loadSearch(state) {
    state.loading = true
    state.loaded = false
    state.searchError = false
    state.searchResults = []
  },
  searchSuccessful(state, results) {
    state.loading = false
    state.loaded = true
    state.searchResults = results
  },
  searchFailure(state, error) {
    state.loading = true
    state.loaded = false
    state.searchError = error
  },
  loadTotalCount(state) {
    state.totalCountError = null
    state.loadingTotalCount = true
    state.totalCount = 0
  },
  totalCountSuccessful(state, count) {
    state.totalCount = count
    state.loadingTotalCount = false
  },
  totalCountFailure(state, error) {
    state.totalCountError = error
    state.loadingTotalCount = false
  }
}

export const actions = {
  loadFilterData({commit}) {
    commit('loading')
    return Promise.all([
      this.$axios.get('/api/Entity'),
      this.$axios.get('/api/DocumentType')
    ]).then(results => {
      commit('loadingSuccess', { 
        entities: results[0].data,
        documentTypes: results[1].data })
    }).catch(e => commit('loadingFailure', e))
  },
  search({commit}, query) {
    commit('loadSearch')
    commit('loadTotalCount')
    return Promise.all([
      this.$axios.get('/api/ClassifiedFile', {
        params: {
          ...query,
          pageSize: 2, // TODO - ajustar el tamaño de pagina a 20 o un numero adecuado, o analizar si debe ser configurable
        },
      })
      .then(response => commit('searchSuccessful', response.data))
      .catch(e => commit('searchFailure', e)),
      this.$axios.get('/api/ClassifiedFile/count', {
        params: { ...query }
      }).then(result => commit('totalCountSuccessful', result.data))
      .catch(e => commit('totalCountFailure', e))
    ])
  },
}