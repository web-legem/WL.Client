
export const state = () => ({
  list: [],
  loading: false,
  loaded: false
})

export const getters = {
  docTypes: (state) => state.list
}

export const mutations = {
  loading(state){
    state.loading = true;
    state.loaded = false;
    state.list = []
  },
  loadingSuccess(state, payload) {
    state.loading = false
    state.loaded = true;
    state.list = payload
  },
  loadingFailure(state, payload) {
    state.loading = false
    state.loaded = false
    state.list = []
  }
}

export const actions = {
  loadData({commit}) {
    commit('loading')
    return this.$axios.get('/api/DocumentType')
      .then(response => commit('loadingSuccess', response.data))
      .catch(e => commit('loadingFailure', e))
  }
}