
export const state = () => ({
  counter: 0,
  'high-contrast': false
})

export const mutations = {
  increment(state) {
    state.counter++
  },
  changeTheme(state) {
    state['high-contrast'] = !state['high-contrast']
  }
}

export const actions = {
  changeTheme({commit}) {
    commit('changeTheme')   
  }
}