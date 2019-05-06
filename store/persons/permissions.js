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
  loadingFailure(state, error) {
    state.loading = false
    state.loaded = false
    state.list = []
    state.error = errorHandler(error)
  },
  select(state,roleId) {
    state.error = null
    state.selectedId = roleId
    state.selected = state.list
      .filter(x => x.id == Number.parseInt(roleId))
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
    state.error = errorHandler(error)
  },
  updatingError(state, error) {
    state.loading = false
    state.error = errorHandler(error)
  },
  deletingError(state, error) {
    state.loading = false
    state.error = errorHandler(error)
  },
  clearError(state) {
    state.error = null
  },
  waiting(state) {
    state.loading = true
  },
  changeName(state, newName) {
    state.selected.name = newName
  },
  changeConfigSystem(state, val) {
    state.selected.configSystem = val
  },
  changeCreateDoc(state, val) {
    state.selected.createDocuments = val
  },
  changeDeleteDoc(state, val) {
    state.selected.deleteDocuments = val
  },
}

export const actions = {
  loadData({commit}) {
    commit('loading')
    return this.$axios.get('/api/Role')
      .then(response => commit('loadingSuccess', response.data))
      .catch(e => {commit('loadingFailure', e);})
  },
  create({ commit, state, dispatch }, data) {
    if(!state.loading){
      commit('waiting')
      let role = {
        name: data.name,
        configSystem: data.permissions[0]  ? 1:0,
        createDocuments: data.permissions[1] ? 1:0,
        deleteDocuments: data.permissions[2] ? 1:0,
      }
      return this.$axios.post('/api/Role', role)
        .then(_ => dispatch('loadData'))
        .catch(e => {commit('creatingError', e);throw e;})
    }
  },
  save({ commit, state, dispatch }, data) {
    if(!state.loading){
      commit('waiting')
      return this.$axios.put('/api/Role', data)
        .then(_ => dispatch('loadData'))
        .catch(e => {commit('updatingError', e);throw e;})
    }
  },
  delete({ commit, state, dispatch }) {
    if(!state.loading){
      commit('waiting')
      return this.$axios.delete('/api/Role/' + state.selectedId)
        .then(_ => dispatch('loadData'))
        .catch(e => {commit('deletingError', e);throw e;})
    }
  },

  select({ commit }, roleId) {
    commit('select', roleId)
  },

  clearSelection({ commit }) {
    commit('clearSelection')
  },

  clearError({ commit }) {
    commit('clearError')
  },

  isCreating({ commit }) {
    commit('isCreating')
  },

  changeName({ commit }, newName) {
    commit('changeName', newName)
  },
  changeConfigSystem({ commit }, val) {
    commit('changeConfigSystem', val)
  },
  changeCreateDoc({ commit }, val) {
    commit('changeCreateDoc', val)
  },
  changeDeleteDoc({ commit }, val) {
    commit('changeDeleteDoc', val)
  },
}