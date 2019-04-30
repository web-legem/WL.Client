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
  select(state, entityId) {
    state.selectedId = entityId
    state.selected = state.list
      .filter(x => x.id == Number.parseInt(entityId))
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
  changeEmail(state, newEmail) {
    state.selected.email = newEmail
  },
  changeEntityTypeId(state, newId) {
    state.selected.entityType = newId
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
    return this.$axios.get('/api/Entity')
      .then(response => commit('loadingSuccess', response.data))
      .catch(e => {commit('loadingFailure', e);throw errorHandler(e);})    
  },

  select({ commit }, entityId) {
    commit('select', entityId)
  },
  
  clearSelection({ commit }) {
    commit('clearSelection')
  },

  clearError({commit}) {
    commit('clearError')
  },

  isCreating({ commit }) {
    commit('isCreating')
  },

  create({ commit, dispatch }, newEntity) {
    commit('waiting')
    return this.$axios.post('/api/Entity', newEntity)
      .then(_ => dispatch('loadData'))
      .catch(e => {commit('creatingError', e);throw e;})
  },
  save({ commit, dispatch }, modifiedEntity) {
    commit('waiting')
    return this.$axios.put('/api/Entity', modifiedEntity)
      .then(_ => dispatch('loadData'))
      .catch(e => {commit('updatingError', e);throw e;})
  },
  delete({ commit, state, dispatch }) {
    commit('waiting')
    return this.$axios.delete('/api/Entity/' + state.selectedId)
      .then(_ => dispatch('loadData'))
      .catch(e => {commit('deletingError', e);throw e;})
  },

  changeName({ commit }, newName) {
    commit('changeName', newName)
  },
  changeEmail({ commit }, newEmail) {
    commit('changeEmail', newEmail)
  },
  changeEntityTypeId({ commit }, newId) {
    commit('changeEntityTypeId', newId)
  },
}