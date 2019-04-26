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
  loadingSuccessSingle(state, payload) {
    state.loading = false
    state.loaded = true
    state.list = payload
    state.error = null  
    state.selectedId = state.list[0].id    
    //este metodo se uso para la ventana da cfg que se quito
  },
  loadingFailure(state, payload) {
    state.loading = false
    state.loaded = false
    state.error = errorHandler(payload)
  },
  select(state, userId) {
    state.error = null
    state.selectedId = userId
    state.selected = state.list
      .filter(x => x.id == Number.parseInt(userId))
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

  changeFirstName(state, newVal) {
    state.selected.firstName = newVal
  },
  changeLastName(state, newVal) {
    state.selected.lastName = newVal
  },
  changeNickname(state, newVal) {
    state.selected.nickname = newVal
  },
  changeDocument(state, newVal) {
    state.selected.document = newVal
  },
  changePassword(state, newVal) {
    state.selected.password = newVal
  },
  changeEmail(state, newVal) {
    state.selected.email = newVal
  },
  changeState(state, newVal) {
    state.selected.state = newVal
  },
  changeRoleId(state, newVal) {
    state.selected.roleId = newVal
  },
}

export const actions = {
  loadData({ commit }) {
    commit('loading')
    return this.$axios.get('/api/User')
      .then(response => commit('loadingSuccess', response.data))
      .catch(e => {commit('loadingFailure', e);throw e;})
  },
  getUser({ commit },{userId}) {
    commit('loading')
    return this.$axios.get('/api/User/'+userId)
      .then(response => commit('loadingSuccessSingle', response.data))
      .catch(e => {commit('loadingFailure', e);throw e;})
      //este metodo se uso para la ventana da cfg que se quito    
  },  
  create({ commit, dispatch }, {newUser, file}) {    
    let formData = new FormData();
    formData.append('value',JSON.stringify(newUser))
    formData.append('files', file);
    commit('waiting')
    return this.$axios.post(
      '/api/User',
      formData,
      { headers: {'Content-Type': 'multipart/form-data' }})
      .then(_ => dispatch('loadData'))
      .catch(e => {commit('creatingError', e);throw e;})
  },
  save({ commit, dispatch }, {modifiedUser, file, fileWasChange, restorePass}) {    
    let formData = new FormData();
    formData.append('value',JSON.stringify(modifiedUser))
    formData.append('files', file);
    formData.append('fileWasChange', fileWasChange);
    formData.append('restorePass', restorePass);
    commit('waiting')
    return this.$axios.put('/api/User', formData, {headers: {'Content-Type': 'multipart/form-data'}})
      .then(_ => dispatch('loadData'))
      .catch(e => {commit('updatingError', e);throw e;})
  },
  delete({ commit, state, dispatch }) {
    commit('waiting')
    return this.$axios.delete('/api/User/' + state.selectedId)
      .then(_ => dispatch('loadData'))
      .catch(e => {commit('deletingError', e);throw e;})
  },
  select({ commit }, userId) {
    commit('select', userId)
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
  changeFirstName({ commit }, newVal) {
    commit('changeFirstName', newVal)
  },
  changeLastName({ commit }, newVal) {
    commit('changeLastName', newVal)
  },
  changeNickname({ commit }, newVal) {
    commit('changeNickname', newVal)
  },
  changeDocument({ commit }, newVal) {
    commit('changeDocument', newVal)
  },
  changePassword({ commit }, newVal) {
    commit('changePassword', newVal)
  },
  changeEmail({ commit }, newVal) {
    commit('changeEmail', newVal)
  },
  changeState({ commit }, newVal) {
    commit('changeState', newVal)
  },
  changeRoleId({ commit }, newVal) {
    commit('changeRoleId', newVal)
  },
}