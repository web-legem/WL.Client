// import mock from '~/mock'

export const state = () => ({
  highContrast : false
  , showA11yPanel: false
  , fontSize: { size: 100, label: 'smallFont'}
  , fontSizes: [ 
    { size: 100, label: 'smallFont'},
    { size: 125, label: 'normalFont'}, 
    { size: 150, label: 'bigFont'} 
  ]
  , mouseDownA11yPanel: false
  , showBorder: false
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
    state.fontSize = state.fontSizes.find(x => x.size == fontSize);
  }
  , setMouseDownA11yPanel(state, isDown) {
    state.mouseDownA11yPanel = isDown
  },
  showBorder(state) {
    state.showBorder = true
  },
  hideBorder(state) {
    state.showBorder = false
  },
}

export const actions = {
  switchTheme({commit}) {
    commit('switchTheme')   
  }
  , changeTheme({commit, state}, theme) {
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
  , setMouseDownA11yPanel({commit}, isDown) {
    commit('setMouseDownA11yPanel', isDown)
  },
  showBorder({commit}) {
    commit('showBorder')
  },
  hideBorder({commit}){
    commit('hideBorder')
  }
}