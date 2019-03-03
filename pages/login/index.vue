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
          >        
            <!----------------------------------------------------->
            <wl-input
              :name="'user'"
              required
              :input-ico="'ico-user'"
              :title="'usuario'"
              :placeholder="'usuario'"
              :max="100"
              :error-msg="'Este es un error'"
              :error="true"
            />        
            <wl-input
              :name="'password'"
              required
              :input-ico="'ico-lock'"
              :type="'password'"
              :title="'password'"
              :max="100"
              :placeholder="'usuario'"
              :error-msg="'Este es un error'"
              :error="true"
            />
            <!----------------------------------------------------->
            <div>
              <div
                class="msj-error"
                style="padding-bottom:10px"
                ng-show="vm.error_login"
              >
                contraseña invalida
              </div>
            </div>

            <div class="flex-container col center">          
              <div>
                <wl-button                 
                  :ico="'ico-sign-in'"                 
                  :type="'submit'"
                  @click.native="remove()"
                >
                  Ingresar
                </wl-button>
              </div>
            </div>

            <a
              title="olvide la contraseña"
              class="olvide_contraseña"
              href="https://www.w3schools.com/html/"
            >
              Olvide mi contraseña
            </a>
          </form>
        </div>
      </div>
    </wl-landing-page>
  </div>
</template>

<script>
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
      es: '/ingreso',
      en: '/login',
    }
  },
  data() {
    return {
      img: imagesContext('./entrada.jpg')
    }
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

</style>
