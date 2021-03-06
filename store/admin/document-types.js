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
    state.error = errorHandler(payload)    
  },
  select(state, docTypeId) {
    state.error = null
    state.selectedId = docTypeId
    state.selected = state.list
      .filter(x => x.id == Number.parseInt(docTypeId))
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
  deletingError(state, payload) {
    state.loading = false
    state.error = errorHandler(payload)
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
    return this.$axios.get('/api/DocumentType')
      .then(response => commit('loadingSuccess', response.data))
      .catch(e => {commit('loadingFailure', e);})      
  },
  select({commit}, docTypeId) {
    commit('select', docTypeId)
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
  create({commit, state, dispatch}, newDocName) {
    if(!state.loading){
      commit('waiting')
        return this.$axios.post('/api/DocumentType', { name: newDocName })
          .then(_ => dispatch('loadData'))
          .catch(e => {commit('creatingError', e);throw e;})
    }    
  },
  save({commit, state, dispatch}, modifiedDocType) {
    if(!state.loading){
      commit('waiting')
      return this.$axios.put('/api/DocumentType', modifiedDocType)
        .then(_ => dispatch('loadData'))
        .catch(e => {commit('updatingError', e);throw e;})
    }
  },
  delete({commit, state, dispatch}) {
    if(!state.loading){
      commit('waiting')
      return this.$axios.delete('/api/DocumentType/' + state.selectedId )
        .then(_ => dispatch('loadData'))
        .catch(e => {commit('deletingError', e);throw e;})
    }
  },
  changeName({commit}, newName) {
    commit('changeName', newName)
  },
}