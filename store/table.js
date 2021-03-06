
export const state = () => ({
  entities: [],
  documentTypes: [],
  loading: false,
  loaded: false,
  error: null,
  loadingResults: false,
  searchResults: null,
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
  loadingTotalCount: (state) => state.loadingTotalCount,
  searching: (state) => state.loadingTotalCount || state.loadingResults,
  hasResults: (state) => state.searchResults ? state.searchResults.length > 0 : false,
  showNoResultsPage: (state, getters) => !getters.hasResults && (!state.searchError || !state.totalCountError),
  hasAnyResult: (state) => state.totalCount ? state.totalCount > 0 : false,
  hasSearchError: (state) => state.totalCountError != null || state.searchError != null,
  showInitial: (state) => state.searchResults == null
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
    state.loadingResults = true
    state.searchError = null
    state.searchResults = []
  },
  searchSuccessful(state, results) {
    state.loadingResults = false
    state.searchResults = results
  },
  searchFailure(state, error) {
    state.loadingResults = false
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
  },
  clear(currState) {
    Object.assign(currState, state())
  }
}

export const actions = {
  loadFilterData({commit}) {
    commit('loading')
    return Promise.all([
      this.$axios.get('/api/Search/entities'),
      this.$axios.get('/api/Search/documentTypes')
    ]).then(results => {
      commit('loadingSuccess', { 
        entities: results[0].data,
        documentTypes: results[1].data })
    }).catch(e => commit('loadingFailure', e))
  },
  search({commit}, query) {
    commit('loadSearch')
    commit('loadTotalCount')
    return this.$axios.get('/api/Document/no-file', {
      params: {
        ...query,
        pageSize: 5, // TODO - ajustar el tamaño de pagina a 20 o un numero adecuado, o analizar si debe ser configurable
      },
    })
    .then( response => {
      commit('searchSuccessful', response.data.page)
      commit('totalCountSuccessful', response.data.count)
    }).catch(e => {
      commit('searchFailure', e)
      commit('totalCountFailure', e)
    });
  },
}