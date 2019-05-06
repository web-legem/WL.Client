<template>
  <div>
    <wl-landing-page
      :src="vipriImg"
    >
      <div class="basic-form">
        <div class="basic-form-box">
          <div class="box-title">
            {{ $t("login.title-restore") }}
          </div> 
          <form 
            class="form-basic-container" 
            name="set-password"
            data-vv-scope="form1"
            @submit.prevent="sendRestorePassword()"
          >    
            <div class="wl_msg md info">
              <strong>
                {{ $t("login.msg-send-link") }}            
              </strong>
            </div>                               
            <!----------------------------------------------------->
            <wl-input
              v-model="email"
              :mode="'noSpace'"
              :title="$t('login.email')"
              :name="'form1.email'" 
              :max="100"
              :placeholder="$t('login.enter-email')"
              :type="'email'"
              :validate="{required:true}"
              :is-submit="isSubmit"
            />
            <!----------------------------------------------------->            
            <div>
              <div
                v-show="error"
                class="msj-error"
              >
                <strong>
                  {{ error }}
                </strong>                
              </div>
            </div>
            <!----------------------------------------------------->            
            <div class="flex-container col center btn-submit">          
              <div>
                <wl-button                 
                  :ico="'ico-long-arrow-right'"                 
                  :type="'submit'"
                >
                  {{ $t("login.btn-send") }}
                </wl-button>
              </div>
              <div 
                v-if="loading" 
                class="progress-line" 
              />
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

export default {  
  components: {
    WlLandingPage,
    WlButton,
    WlInput,
  },
  nuxtI18n: {
    paths: {
      es: '/ingreso/restaurar-contrasena',
      en: '/login/restore-password',
    }
  },
  data() {
    return {
      email:"",
      isSubmit: false,
    }
  },
  computed:{    
    isPathAllow(){
      return this.credential == undefined || this.credential == null
    },
    ...mapGetters("login/login", {      
      credential: "credential",
      loogedIn: "loogedIn",
      error: "error",
      loading: "loading",
    }),
    vipriImg() {
      if(!this.$store.state.highContrast)
        return '/img/vipri-light.jpg'
      return '/img/vipri-dark.jpg'
    },
  },
  //---------- override ----------
  created() {
    if(!this.isPathAllow){    
      this.$router.push(this.localePath({ name: 'index' }))      
    }    
  },
  //------------------------------
  methods: {
    sendRestorePassword(){          
      this.$validator.validate('form1.*').then(valid => {
        this.isSubmit = true;
        if (valid) {
          this.requestRestore(this.email)
            .then(_ =>this.$router.push(this.localePath({ name: 'login' })));             
        }      
      });
    },
    ...mapActions("login/login", [
      "requestRestore",     
    ])
  }
}
</script>
