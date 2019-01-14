
export const state = () => ({
  list: [],
  selectedId: null,
  isCreating: false,
  selected: {},
  loading: false,
  loaded: false,
  error: null,
})

export const getters = {
  list: (state) => state.list,
  selected: (state) => state.selected,
  isSelected: (state) => state.selectedId != null,
  isCreating: (state) => state.isCreating,
  error: (state) => state.error,
}

export const mutations = {
  loading(state) {
    state.loading = true
    state.loaded = false
    state.list = []
    state.error = null
  },
  loadingSuccess(state, payload) {
    state.loading = false
    state.loaded = true
    state.list = payload
  },
  loadingFailure(state, payload) {
    state.loading = false
    state.loaded = false
    state.error = payload
  },
  select(state, annotationTypeId) {
    state.error = null
    state.selectedId = annotationTypeId
    state.selected = state.list
      .filter(x => x.id == Number.parseInt(annotationTypeId))
      .map(x => JSON.parse(JSON.stringify(x)))
      .pop()
  },
  clearSelection(state) {
    state.selectedId = null
    state.selected = null
    state.isCreating = false
  },
  isCreating(state) {
    state.isCreating = true
  },
  creatingError(state, error) {
    state.loading = false
    state.error = error
  },
  updatingError(state, error) {
    state.loading = false
    state.error = error
  },
  changeName(state, newName) {
    state.selected.name = newName
  },
  changeRoot(state, newRoot) {
    state.selected.root = newRoot
  },
  deletingError(state, error) {
    state.loading = false
    state.error = error
  },
  clearError(state) {
    state.error = null
  },
  waiting(state) {
    state.loading = true
  }
}

export const actions = {
  loadData({commit}) {
    commit('loading')
    return this.$axios.get('/api/AnnotationType')
      .then(response => commit('loadingSuccess', response.data))
      .catch(e => commit('loadingFailure', 'Error'))
  },
  
  select({commit}, annotationTypeId) {
    commit('select', annotationTypeId)
  },

  clearSelection({commit}) {
    commit('clearSelection')
  },
  
  clearError({commit}) {
    commit('clearError')
  },

  isCreating({commit}) {
    commit('isCreating')
  },
  
  create({ commit, dispatch }, newAnnotationType) {
    commit('waiting')
    return this.$axios.post('/api/AnnotationType', newAnnotationType)
      .then(_ => dispatch('loadData'))
      .catch(e => {
        commit('creatingError', e.response.data.message)
        throw e;
      }
      )
  },
  save({commit, dispatch}, modifiedAnnotationType) {
    commit('waiting')
    return this.$axios.put('/api/AnnotationType', modifiedAnnotationType)
      .then(_ => dispatch('loadData'))
      .catch(e => {
        commit('updatingError', e.response.data.message)
        throw e;
      }
      )
  },
  delete({commit, state, dispatch}) {
    commit('waiting')
    return this.$axios.delete('/api/AnnotationType/' + state.selectedId)
      .then(_ => dispatch('loadData'))
      .catch(e => {
        commit('deletingError', e.response.data.message)
        throw e;
      }
      )
  },
  changeName({commit}, newName) {
    commit('changeName', newName)
  },
  changeRoot({commit}, newRoot) {
    commit('changeRoot', newRoot)
  }
}