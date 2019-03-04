s<template>
  <div>
    <wl-landing-page
      :src="img"    
      background-color="#CCCCCD"
    >
      <div class="login_form">
        <div class="form-box">
          <div class="box-title">
            Configuracion
          </div>
          <div class="form-login">
            <wl-crud>
              <template slot="wl-form">     
                <div class="box_duo_input">          
                  <div>
                    <wl-web-cam />            
                  </div>
                  <div>
                    <wl-input
                      v-if="objSelected"
                      v-model="firstName"
                      :disable="!isEdit"
                      :title=" $t('persons.users-s.title-name')"
                      :max="100"
                      :placeholder=" $t('persons.users-s.place-enter-name')"
                      :error-msg="'Este es un error'"
                      :error="true"
                    />
                    <wl-input
                      v-if="objSelected"
                      v-model="lastName"
                      :disable="!isEdit"
                      :title=" $t('persons.users-s.title-lastname')"
                      :max="100"
                      :placeholder=" $t('persons.users-s.place-enter-lastname')"
                      :error-msg="'Este es un error'"
                      :error="true"
                    />
                    <wl-input
                      v-if="objSelected"
                      v-model="nickname"
                      :disable="!isEdit"
                      :title=" $t('persons.users-s.title-name-user')"
                      :max="50"
                      :placeholder=" $t('persons.users-s.place-enter-name-user')"
                      :error-msg="'Este es un error'"
                      :error="true"
                    />
                  </div>
                </div>
                <div class="box_duo_input">          
                  <div>
                    <wl-input
                      v-if="objSelected"
                      v-model="password"
                      :disable="!isEdit"
                      :title=" $t('persons.users-s.title-password')"
                      :max="100"
                      :placeholder="$t('persons.users-s.place-enter-passord')"
                      :error-msg="'Este es un error'"
                      :error="true"
                    />
                  </div>
                  <div>
                    <wl-input
                      v-if="objSelected"
                      v-model="document"
                      :disable="!isEdit"
                      :title=" $t('persons.users-s.title-id')"
                      :max="50"
                      :placeholder=" $t('persons.users-s.place-enter-id')"
                      :error-msg="'Este es un error'"
                      :error="true"
                    />
                  </div>
                </div>        
                <div class="box_duo_input">            
                  <div>
                    <wl-input
                      v-if="objSelected"
                      v-model="email"
                      :disable="!isEdit"
                      :title="$t('persons.users-s.title-email')"
                      :max="100"
                      :placeholder=" $t('persons.users-s.place-enter-email')"
                      :error-msg="'Este es un error'"
                      :error="true"
                    />
                  </div>
                  <div>
                    <wl-input
                      v-if="objSelected"
                      v-model="rol"
                      :disable="!isEdit"
                      :title="$t('persons.users-s.title-role-user')"
                      :max="100"
                      :placeholder="$t('persons.users-s.place-enter-role-user')"
                      :error-msg="'Este es un error'"
                      :error="true"
                    />
                  </div>
                </div>
              </template>
            </wl-crud>    
          </div>
        </div>
      </div>    
    </wl-landing-page>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import WlLandingPage from '~/components/WlLandingPage.vue'
import WlCrud from "~/components/WlCrud.vue";
import WlInput from "~/components/WlInput.vue";
import WlWebCam from "~/components/WlWebCam.vue";

export default {
  nuxtI18n: {
    paths: {es: '/personas/configuracion',en: '/persons/settings' }
  },
  components: {
    WlLandingPage,
    WlCrud,
    WlInput,
    WlWebCam,
  },  
  
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
  width: 60%;
  max-width: 420px;
  min-width: 420px;
  background: white;
  margin: 0 auto;
}
.form-login {
  background: white;
  padding: 20px;
}
</style>
