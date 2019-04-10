<template>
  <div>
    <wl-landing-page
      :src="img"
      background-color="#8f956f"
    >
      <div class="basic-form">
        <div class="basic-form-box">
          <div class="box-title">
            Restaurar Contraseña 
          </div>          
          <p class="msg-pass">
            Enviaremos un link a su correo para restaurar su contraseña.
          </p>
          <div />
          <form 
            class="form-basic-container" 
            name="set-password"
            data-vv-scope="form1"
            @submit.prevent="sendRestorePassword()"
          >                  
            <div>
              <div
                v-show="error"
                class="msj-error md"
              >
                {{ error }}
              </div>
            </div>     
            <!----------------------------------------------------->
            <wl-input
              v-model="email"
              :title="'Correo electronico'"
              :max="100"
              :placeholder="$t('persons.users-s.place-enter-passord')"
              :name="'form1.confirm_password'" 
              :type="'email'"
              :validate="{required:true}"
              :is-submit="isSubmit"
            />
            <!----------------------------------------------------->            
            <div class="flex-container col center btn-submit">          
              <div>
                <wl-button                 
                  :ico="'ico-long-arrow-right'"                 
                  :type="'submit'"
                >
                  Enviar
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
      img: imagesContext('./entrada.jpg'),
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
    }),
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
