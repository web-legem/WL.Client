import errorHandler from '~/helpers/errorHandler'

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
  loading: (state) => state.loading,
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
    state.error = errorHandler(payload)
  },
  select(state, entityTypeId) {
    state.selectedId = entityTypeId
    state.selected = state.list
      .filter(x => x.id == Number.parseInt(entityTypeId))
      .map(x => JSON.parse(JSON.stringify(x)))
      .pop()
  },
  clearSelection(state) {
    state.selectedId = null
    state.selected = null
    state.isCreating = false
  },
  creatingError(state, payload) {
    state.loading = false
    state.error = errorHandler(payload)
  },
  updatingError(state, payload) {
    state.loading = false
    state.error = errorHandler(payload)
  },
  changeName(state, newName) {
    state.selected.name = newName
  },
  changeSupportedDocumentTypes(state, newValue) {
    state.selected.supportedDocumentTypesIds = newValue
  },
  deletingError(state, payload) {
    state.loading = false
    state.error = errorHandler(payload)
  },
  clearError(state) {
    state.error = null
  },
  waiting(state) {
    state.loading = true
  },
  isCreating(state) {
    state.isCreating = true
  }
}

export const actions = {
  loadData({ commit }) {
    commit('loading')
    return this.$axios.get('/api/EntityType')
      .then(response => commit('loadingSuccess', response.data))
      .catch(e => {commit('loadingFailure', e);})    
  },

  select({ commit }, entityTypeId) {
    commit('select', entityTypeId)
  },

  clearSelection({ commit }) {
    commit('clearSelection')
  },

  clearError({commit}) {
    commit('clearError')
  },

  create({ commit, state ,dispatch }, newEntityType) {
    if(!state.loading){
      commit('waiting')
      return this.$axios.post('/api/EntityType', newEntityType)
        .then(_ => dispatch('loadData'))
        .catch(e => {commit('creatingError', e);throw e;})
    }
  },

  save({ commit, state, dispatch }, modifiedEntityType) {
    if(!state.loading){
      commit('waiting')
      return this.$axios.put('/api/EntityType', modifiedEntityType)
        .then(_ => dispatch('loadData'))
        .catch(e => {commit('updatingError', e);throw e;})
    }
  },
  delete({ commit, state, dispatch }) {
    if(!state.loading){
      commit('waiting')
      return this.$axios.delete('/api/EntityType/' + state.selectedId)
        .then(_ => dispatch('loadData'))
        .catch(e => {commit('deletingError', e);throw e;})
    }
  },
  changeName({ commit }, newName) {
    commit('changeName', newName)
  },
  changeSupportedDocumenttypes({ commit }, newValue) {
    commit('changeSupportedDocumentTypes', newValue)
  },
  isCreating({ commit }) {
    commit('isCreating')
  }
}