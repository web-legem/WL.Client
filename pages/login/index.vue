<template>
  <div>
    <wl-landing-page
      :src="vipriImg"
      background-color="#fff"
    >
      <div class="basic-form">
        <div class="basic-form-box">
          <h1 class="box-title">
            {{ $t("login.title-login") }}            
          </h1>

          <form 
            class="form-basic-container" 
            name="form-login"
            data-vv-scope="form1"            
            @submit.prevent="signIn()"
          >              
            <div
              v-show="msgReturn"
              class="wl_msg ok md"
            >          
              <strong>
                {{ msgReturn }}
              </strong>
            </div>
            <div
              v-show="error"
              class="wl_msg error md"
            >
              <strong>                
                {{ getMsgInfo }}
              </strong>                
            </div>    
            <!----------------------------------------------------->
            <wl-input
              v-model="nickname"
              :name="'form1.user'"
              :input-ico="'ico-user'"
              :title="$t('login.user')"
              :placeholder="$t('login.enter-user')"
              :max="100"
              :autocomplete="true"
              :validate="{required:true}"
              :is-submit="true"
            />        
            <wl-input
              v-model="password"
              :name="'form1.password'"
              :input-ico="'ico-lock'"
              :type="'password'"
              :title="$t('login.password')"
              :placeholder="$t('login.enter-password')"
              :max="100"
              :validate="{required:true}"
              :is-submit="true"
            />
            <!----------------------------------------------------->            

            <div class="flex-container col center btn-submit">          
              <div class="forget-pass">
                <nuxt-link 
                  :to="localePath({ name: 'login-restore-password' })"
                  class="link-restore"
                >
                  {{ $t("login.forgotten-password") }}
                </nuxt-link>
              </div>
              <div>                
                <wl-button                 
                  :ico="'ico-sign-in'"        
                  :type="'submit'"     
                >
                  {{ $t("login.btn-enter") }}
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
      nickname:"",
      password:"",
      msgUpdate:"",
    }
  },
  computed: {
    getMsgInfo() {      
      return this.error      
    },
    msgReturn(){
      return this.msgUpdate
    },
    ...mapGetters("login/login", {      
      error: "error",
      redirectTo: "redirectTo",
      loogedIn: "loogedIn",
      passwordChanged: "passwordChanged",
    }),
    vipriImg() {
      if(!this.$store.state.highContrast)
        return '/img/vipri-light.jpg'
      return '/img/vipri-dark.jpg'
    },    
  },
  watch: {
    '$route'() {
      this._clearError()
    }
  },
  beforeMount(){
    if(this.loogedIn){
      this.$router.push(this.localePath({ name: 'index' }))
    }    
  },
  mounted(){
    if(this.passwordChanged){
      this.msgUpdate =  "Inicie sesion con su nueva contraseña"
      this.clearPasswordChanged()
    }else{
      this.msgUpdate =  ""
    }
  },
  beforeDestroy(){
    this.clearError();
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
      "clearError",
      "clearPasswordChanged"
    ])
  }
}
</script>

<style lang="scss" scoped>

.olvide_contraseña{
    margin-top:20px;
    display:inline-block;
    font-family: 'Lato';
    font-size:small;
}

.btn-submit > div:first-child{
  color: var(--wl_link);
  font-size: .8rem;
  align-self: flex-start;
}

.link-restore:visited{
  color: var(--wl_link);
}


.btn-submit > div:last-child{
  margin-top: 20px;
}

</style>
