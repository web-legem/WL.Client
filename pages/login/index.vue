<template>
  <div>
    <wl-landing-page
      :src="img"
      background-color="#8f956f"
    >
      <div class="login_form">
        <div class="form-box">
          <div class="box-title">
            Ingresar al Sistema
          </div>
          
          <form 
            class="form-login" 
            name="form-login"
            data-vv-scope="form1"            
            @submit.prevent="signIn()"
          >
            <div>
              <div
                v-show="error || passwordChanged"
                class="msj-error md"
              >
                {{ getMsgInfo }}
              </div>
            </div>        
            <!----------------------------------------------------->
            <wl-input
              v-model="nickname"
              :name="'form1.user'"
              :input-ico="'ico-user'"
              :title="'Usuario'"
              :placeholder="'usuario'"
              :max="100"
              :validate="{required:true}"
              :is-submit="true"
            />        
            <wl-input
              v-model="password"
              :name="'form1.password'"
              :input-ico="'ico-lock'"
              :type="'password'"
              :title="'Password'"
              :placeholder="'contraseña'"
              :max="100"
              :validate="{required:true}"
              :is-submit="true"
            />
            <!----------------------------------------------------->            

            <div class="flex-container col center btn-submit">          
              <div>
                <wl-button                 
                  :ico="'ico-sign-in'"        
                  :type="'input'"         
                >
                  Ingresar
                </wl-button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </wl-landing-page>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { imagesContext } from '~/helpers/imagesContext'
import WlLandingPage from '~/components/WlLandingPage.vue'
import WlInput from "~/components/WlInput.vue";
import WlButton from "~/components/WlButton.vue";
import md5 from "js-md5"; 

export default {
  components: {
    WlLandingPage,
    WlButton,
    WlInput,
  },
  nuxtI18n: {
    paths: {
      es: '/ingreso',
      en: '/login',
    }
  },
  data() {
    return {
      img: imagesContext('./entrada.jpg'),
      nickname:"",
      password:"",
    }
  },
  computed: {
    getMsgInfo() {
      if(this.passwordChanged){
        return "Inicie sesion con su nueva contraseña"
      }else{
        return this.error
      }
    },
    ...mapGetters("login/login", {      
      error: "error",
      redirectTo: "redirectTo",
      passwordChanged: "passwordChanged",
    }),    
  },
  methods: {    
    signIn(){    
      var data = {
        nickname : this.nickname,
        password : md5(this.password),
      }
      this.$validator.validate('form1.*').then(valid => {
        if (valid) {
          this.login(data)          
            .then(_ =>this.$router.push(this.localePath({ name: this.redirectTo })));          
        }
      });      
    },
    ...mapActions("login/login", [
      "login",     
    ])
  }
}
</script>

<style lang="scss" scoped>
.login_form {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.25), 0 1px 2px rgba(0, 0, 0, 0.3);
}

.form-box {
  display: flex;
  flex-direction: column;
  width: 40%;
  max-width: 420px;
  min-width: 420px;
  background: white;
  margin: 0 auto;
}

.form-login {
  background: white;
  padding: 20px;
}

.contenedor_login{
    max-width:420px;
    box-shadow:0 0 0 1px rgba(0, 0, 0, 0.05),0 1px 2px rgba(0, 0, 0, 0.3);   
    min-width:0;
}

.olvide_contraseña{
    margin-top:20px;
    display:inline-block;
    font-family: 'Lato';
    font-size:small;
}

.btn-submit{
  margin-top: 20px;
}

</style>
