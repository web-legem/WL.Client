import errorHandler from '~/helpers/errorHandler'

export const state = () => ({
  loogedIn: false,
  credential: null,
  passwordChanged: null,
  error: null,
  redirectTo: null,  
  loading: false,
})

export const getters = {
  loogedIn: (state) => state.loogedIn,
  credential: (state) => state.credential,
  passwordChanged: (state) => state.passwordChanged,
  error: (state) => state.error,
  redirectTo: (state) => state.redirectTo,
  loading: (state) => state.loading,
}

export const mutations = {
  loading(state) {
    state.loading = true
    state.error = null
  },
  loginSuccess(state, response) {
    state.loading = false
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
      this.$cookies.set('credential', state.credential)   
      // localStorage.setItem('credential', JSON.stringify(state.credential));   
      // let credential = JSON.parse(localStorage.getItem('credential'));
      // this.$axios.setToken(credential.token)
    }
  },
  setPasswordSuccess(state) {
    state.loading = false
    state.passwordChanged = true
    if(state.credential){
      state.credential.newPasswordRequired = false
    }
    state.redirectTo = null
    state.error = null
  },
  setPasswordFailure(state, ex) {
    state.loading = false
    state.error = errorHandler(ex)    
  },
  loginFailure(state, ex) {
    state.loading = false
    state.loogedIn = false
    // state.error = errorHandler(ex)    
    state.error = (ex.response.data.message == "ERROR_CREDENTIAL") ?
      "Hubo un problema al iniciar sesion, vuelva a intentar" :
      "Nombre de usuario y/o contraseña incorrectos"
  },
  logoutSuccess(state) {
    state.loogedIn = false
    state.credential = null
    state.user = null
    state.error = null
    state.loading = false
    this.$cookies.remove('credential')
    this.$axios.setToken(false)
  },
  initCredential(state){
    if(this.$cookies.get('credential')){
      state.credential = this.$cookies.get('credential')
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
    state.loading = false
    state.error = null;
  },
  setRestoreFailure(state,ex){
    state.loading = false
    if(ex.response && ex.response.data){
      if(ex.response.data.errorType == "ORA1403"){            
        state.error = "Este correo no esta registrado en el sistema";
        return
      }
    }
    state.error = "Se presento un error, por favor recarge la pagina."+
                  "\nSi el problema persiste contacte con el administrador";
  },  
  verifyTokenSuccess(state, response){ 
      state.loading = false       
      state.error = null;    
  },
  verifyTokenFailure(state,ex){
    state.loading = false
    state.error = "Operación no valida"
  }, 
  waiting(state) {
    state.loading = true
  }
}

export const actions = {
  login({ commit, state }, data) {
    console.log("ssssssssssssssssssss");
    if(!state.loading){
      console.log("jjjjjjjjjjjjjjjjjjjjjj");
      commit('waiting')
      return this.$axios.post('/api/User/Login/', data)
        .then(response => commit('loginSuccess', response))
        .catch(e => {commit('loginFailure', e); throw e})
    }
  },

  logout({ commit, state }, id) {
    if(!state.loading){
      commit('waiting')
      return this.$axios.delete('/api/User/Logout/'+ id)
        .then(_ => commit('logoutSuccess'))
        .catch(_ => commit('logoutSuccess'))
    }
  },

  setPassword({ commit, state }, data) {
    if(!state.loading){
      commit('waiting')
       return this.$axios.put('/api/User/UpdatePassword/', data)
        .then(_ => commit('setPasswordSuccess'))
        .catch(e => {commit('setPasswordFailure', e);throw e})
    }
  },
  
  requestRestore({ commit, state }, email){
    if(!state.loading){
      commit('waiting')
      return this.$axios.get('/api/User/RestoreRequest?email='+ email)
        .then(_ => commit('setRestoreSuccess'))
        .catch(e => {commit('setRestoreFailure', e);throw e})
    }
  },
  verifyToken({ commit, state }, data){
    if(!state.loading){
      commit('waiting')
      return this.$axios.get('/api/User/VerifyToken?id='+ data.id +'&token='+data.token )
        .then(response => {commit('verifyTokenSuccess', response); return response.data})
        .catch(e => {commit('verifyTokenFailure', e);throw e})
    }
  },

  clearError({ commit }) {
    commit('clearError')
  },

  clearPasswordChanged({ commit }){
    commit('clearPasswordChanged')
  }

}

