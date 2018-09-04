
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
      x.id == Number.parseInt(state.selectedId) )
  , isSelected: (state) => state.selectedId != null
}

export const mutations = {
  loading(state) {
    state.loading = true
    state.loaded = false
    state.list = []
    state.error = null
    state.selectedId = null
  }
  , loadingSuccess(state, list) {
    state.loading = false
    state.loaded = true
    state.list = list
    state.error = null
    state.selectedId = null
  }
  , loadingFailure(state, error) {
    state.loading = false
    state.loaded = false
    state.list = []
    state.error = error
    state.selectedId = null
  }
  , select(state, annotationTypeId) {
    state.selectedId = annotationTypeId
  }
  , clearSelection(state) {
    state.selectedId = null
  }
}

export const actions = {
  loadData({commit}) {
    commit('loading')
    return this.$axios.get('/api/AnnotationType')
      .then(response => commit('loadingSuccess', response.data))
      .catch(e =>{
        return commit('loadingFailure', e)})
  }
  , select({commit}, annotationTypeId) {
    commit('select', annotationTypeId)
  }
  , clearSelection({commit}) {
    commit('clearSelection')
  }
}