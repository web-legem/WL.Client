// import mock from '~/mock'

export const state = () => ({
  highContrast : false
  , showA11yPanel: false
  , fontSize: 100
  , fontSizes: [ 100, 125, 150 ]
})

export const mutations = {
  switchTheme(state) {
    state.highContrast = !state.highContrast
  }
  , showA11yPanel(state) {
    state.showA11yPanel = true
  }
  , hideA11yPanel(state) {
    state.showA11yPanel = false
  }
  , changeFontSize(state, fontSize) {
    state.fontSize = fontSize
  }
}

export const actions = {
  switchTheme({commit}) {
    commit('switchTheme')   
  }
  , changeTheme({commit, state}, theme) {
    console.log(theme, state.highContrast)
    if(
      (theme == 'light' && state.highContrast)
      || (theme == 'dark' && !state.highContrast)
    )
      commit('switchTheme')
  }
  , changeFontSize({commit}, payload) {
    commit('changeFontSize', payload)
  }
  , showA11yPanel({commit}) {
    commit('showA11yPanel')
  }
  , hideA11yPanel({commit}) {
    commit('hideA11yPanel')
  }
  , toggleA11yPanel({commit, state}) {
    if(state.showA11yPanel)
      commit('hideA11yPanel')
    else
      commit('showA11yPanel')
  }
}