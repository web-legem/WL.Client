
export const state = () => ({
  highContrast : false
  , fontSize: 100
  , fontSizes: [ 100, 150, 200 ]
})

export const mutations = {
  changeTheme(state) {
    state.highContrast = !state.highContrast
  }
  , changeFontSize(state, fontSize) {
    state.fontSize = fontSize
  }
}

export const actions = {
  changeTheme({commit}) {
    commit('changeTheme')   
  }
  , changeFontSize({commit}, payload) {
    commit('changeFontSize', payload)
  }
}