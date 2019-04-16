export const state = () => ({
  loogedIn: false,
  credential: null,
  passwordChanged: null,
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
    state.passwordChanged = false,
    state.redirectTo = 'index'
    state.error = null

    if (state.credential.token) {
      localStorage.setItem('credential', JSON.stringify(state.credential));
      //this.$axios.setHeader('Authorization', JSON.stringify(state.credential));
      let credential = JSON.parse(localStorage.getItem('credential'));
      this.$axios.setToken(credential.token)
    }
  },
  setPasswordSuccess(state) {
    state.passwordChanged = true
    if(state.credential){
      state.credential.newPasswordRequired = false
    }
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
  logoutSuccess(state) {
    state.loogedIn = false
    state.credential = null
    state.user = null
    state.error = null    
    localStorage.removeItem('credential')
    this.$axios.setToken(false)
  },
  initCredential(state){
    if(localStorage.getItem('credential')){
      state.credential = JSON.parse(localStorage.getItem('credential'))
      state.loogedIn = true
    }
  },
  clearError(state) {
    state.error = null
  },
  clearPasswordChanged(state){
    state.clearPasswordChanged = null
  },
  setRestoreSuccess(state, response){
  },
  setRestoreFailure(state,ex){
  },  
  verifyTokenSuccess(state, response){    
      state.error = null;    
  },
  verifyTokenFailure(state,ex){
    state.error = "Operación no valida"
  }, 
}

export const actions = {
  login({ commit }, data) {
    return this.$axios.post('/api/User/Login/', data)
      .then(response => commit('loginSuccess', response))
      .catch(e => {commit('loginFailure', e); throw e})
  },

  logout({ commit }, id) {
      return this.$axios.delete('/api/User/Logout/'+ id)
      .then(_ => commit('logoutSuccess'))
      .catch(_ => commit('logoutSuccess'))
  },

  setPassword({ commit }, data) {
    return this.$axios.put('/api/User/UpdatePassword/', data)
      .then(_ => commit('setPasswordSuccess'))
      .catch(e => {commit('setPasswordFailure', e);throw e})
  },
  
  requestRestore({ commit }, email){
    return this.$axios.get('/api/User/RestoreRequest?email='+ email)
      .then(_ => commit('setRestoreSuccess'))
      .catch(e => {commit('setRestoreFailure', e);throw e})
  },
  verifyToken({ commit }, data){
    return this.$axios.get('/api/User/VerifyToken?id='+ data.id +'&token='+data.token )
      .then(response => {commit('verifyTokenSuccess', response); return response.data})
      .catch(e => {commit('verifyTokenFailure', e);throw e})
  },

  clearError({ commit }) {
    commit('clearError')
  },

  clearPasswordChanged({ commit }){
    commit('clearPasswordChanged')
  }

}

