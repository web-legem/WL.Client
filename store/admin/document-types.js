import mock from '~/mock/document-types'

export const state = () => ({
  list: []
  , selectedId: null
  , loading: false
  , loaded: false
  , error: null
})

export const getters = {
  docTypes: (state) => state.list
  , selectedDocType: (state) => state.list.find( (x) => x.id == Number.parseInt(state.selectedId) )
  , isADocTypeSelected: (state) => state.selectedId != null
}

export const mutations = {
  loading(state){
    state.loading = true
    state.loaded = false
    state.list = []
    state.error = null
    state.selectedId = null
  }
  , loadingSuccess(state, payload) {
    state.loading = false
    state.loaded = true
    state.list = payload
    state.error = null
    state.selectedId = null
  }
  , loadingFailure(state, payload) {
    state.loading = false
    state.loaded = false
    state.list = []
    state.error = payload
    state.selectedId = null
  }
  , selectDocType(state, docTypeId) {
    state.selectedId = docTypeId
  }
}

export const actions = {
  loadData({commit}) {
    commit('loading')
    return this.$axios.get('/api/DocumentType')
      .then(response => commit('loadingSuccess', response.data))
      .catch(e => commit('loadingFailure', 'Error'))
  }
  , selectDocType({commit}, docTypeId) {
    commit('selectDocType', docTypeId)
  }
}