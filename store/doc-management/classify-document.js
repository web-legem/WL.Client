
export const state = () => ({
  loading: false
  , loaded: false
  , error: null
  , classifiedFile: null
})

export const getters = {
  isAlreadyClassified: (state) => state.classifiedFile != null
}

export const mutations = {
  loading(state) {
    state.loading = true
    state.loaded = false
    state.classifiedFile = null
    state.error = null
  }
  , loadingSuccess(state, classifiedFile) {
    state.loading = false
    state.loaded = true
    state.classifiedFile = classifiedFile
  }
  , loadingFailure(state, error) {
    state.loading = false
    state.loaded = false
    state.error = error
  }
}

export const actions = {
  loadData({commit}, fileId){
    commit('loading')
    return this.$axios.get('/api/ClassifiedFile/' + fileId)
      .then(response => commit('loadingSuccess', response.data))
      .catch(e => commit('loadingFailure', e))
  }
}