
export const state = () => ({
  list: []
  , selectedId: null
  , loading: false
  , loaded: false
  , error: null
})

export const getters = {
  list: (state) => state.list
  , selected: (state) => state.list.find( (x) =>
    x.id == Number.parseInt(state.selectedId))
  , isSelected: (state) => state.selectedId != null
}

export const mutations = {
  loading(state){
    state.loading = true
    state.loaded = false
    state.list = []
    state.error = null
    state.selectedId = null
  }
  , loadingSuccess(state,payload) {
    console.log('loadData', payload)
    state.loading = false
    state.loaded = true
    state.list = payload
    state.error = null
    state.selectedId = null
  }
  , loadingFailure(state, payload) {
    console.log('loading Error')
    state.loading = false
    state.loaded = false
    state.list = []
    state.error = payload
    state.selectedId = null
  }
  , select(state, entityId) {
    state.selectedId = entityId
  }
  , clearSelection(state) {
    state.selectedId = null
  }
}

export const actions = {
  loadData({commit}) {
    commit('loading')
    return this.$axios.get('/api/Entity')
      .then(response => commit('loadingSuccess', response.data))
      .catch(e => commit('loadingFailure', 'Error'))
  }
  , select({commit}, entityId) {
    commit('select', entityId)
  }
  , clearSelection({commit}) {
    commit('clearSelection')
  }
}