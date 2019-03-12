export const state = () => ({
  loogedIn: null,
  credential: null,
  passwordChanged: false,
  error: null,
  redirectTo: null,
})

export const getters = {
  loogedIn: (state) => state.loogedIn,
  credential: (state) => state.credential,
  passwordChanged: (state) => state.passwordChanged,
  error: (state) => state.error,
  redirectTo: (state) => state.redirectTo,
}

export const mutations = {
  loginSuccess(state, response) {
    state.credential = response.data;
    if (state.credential.newPasswordRequired) {
      state.error = null
      state.redirectTo = 'login-set-password'
      return    
    }
    state.loogedIn = true
    state.passwordChanged = false  
    state.redirectTo = 'index'
    state.error = null

    if (state.credential.token) {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('user', JSON.stringify(state.credential));
    }

  },
  setPasswordSuccess(state) {
    state.passwordChanged = true
    state.credential.newPasswordRequired = false
    state.redirectTo = null
    state.error = null
  },
  setPasswordFailure(state, ex) {
    console.log(ex);
    state.error = ex.response.data.message;
  },
  loginFailure(state, ex) {
    console.log(ex);  
    state.loogedIn = false
    state.error = (ex.response.data.message == "ERROR_CREDENTIAL") ?
      "Hubo un problema al iniciar sesion, vuelva a intentar" :
      "Nombre de usuario y/o contraseña incorrectos"
  },
  logout(state) {
    state.loogedIn = false
    state.user = null
    state.error = null
  },
}

export const actions = {
  login({ commit }, data) {
    return this.$axios.post('/api/User/Login/', data)
      .then(response => commit('loginSuccess', response))
      .catch(e => {commit('loginFailure', e); throw e})
  },

  setPassword({ commit }, data) {
    return this.$axios.put('/api/User/UpdatePassword/', data)
      .then(_ => commit('setPasswordSuccess'))
      .catch(e => commit('setPasswordFailure', e))
  },

}

