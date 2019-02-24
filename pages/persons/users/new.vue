<template>
  <div>
    <wl-crud
      :is-new="true"
      :error="error"
      @wlcancel="cancel" 
      @wlcreate="submit"
      @wlclearerror="clearError"
    >
      <template slot="wl-form">
        <input
          id="file"
          ref="file"
          name="file"
          type="file"
          @change="handleFileToUpload"
        >
        <div class="box_duo_input">          
          <div>
            <wl-web-cam 
              :photo-input="file"
              :disable="false"
            />
          </div>
          <div>
            <wl-input
              v-model="firstName"
              :title=" $t('persons.users-s.title-name')"
              :max="100"
              :placeholder=" $t('persons.users-s.place-enter-name')"
              :error-msg="'Este es un error'"
              :error="true"
            />
            <wl-input
              v-model="lastName"
              :title=" $t('persons.users-s.title-lasltname')"
              :max="100"
              :placeholder=" $t('persons.users-s.place-enter-lastname')"
              :error-msg="'Este es un error'"
              :error="true"
            />
            <wl-input
              v-model="nickName"
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
              v-model="password"
              :title=" $t('persons.users-s.title-password')"
              :max="256"
              :placeholder="$t('persons.users-s.place-enter-passord')"
              :error-msg="'Este es un error'"
              :error="true"
            />
          </div>
          <div>
            <wl-input
              v-model="document"
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
              v-model="email"
              :title="$t('persons.users-s.title-email')"
              :max="100"
              :placeholder=" $t('persons.users-s.place-enter-email')"
              :error-msg="'Este es un error'"
              :error="true"
            />
          </div>
          <div>
            <wl-input
              v-model="rol"
              :title="$t('persons.users-s.title-role-user')"
              :max="100"
              :placeholder="$t('persons.users-s.place-enter-role-user')"
              :error-msg="'Este es un error'"
              :error="true"
            />
          </div>
        </div>

        <div class="box_duo_input">            
          <div>
            <wl-switch-button
              :id="'rad1'"
              :type="'checkbox'" 
              :title=" $t('persons.users-s.title-state-user')"
              :label=" $t('persons.users-s.label-active')"
              :error-msg="'Este es un error'"
              :error="true"
            />
          </div>
          <div />
        </div>
      </template>
    </wl-crud> 
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import WlCrud from "~/components/WlCrud.vue";
import WlInput from "~/components/WlInput.vue";
import WlSwitchButton from "~/components/WlSwitchButton.vue";
import WlWebCam from "~/components/WlWebCam.vue";

export default {
  nuxtI18n: {
    paths: { es: "nuevo", en: "new" }
  },
  components: {
    WlCrud,
    WlInput,
    WlWebCam,
    WlSwitchButton,
  },
  data() {
    return {
      img: null,
      camera: null,
      firstName : "",
      lastName : "",
      nickName : "",
      document : "",
      password :"",
      email: "",
      state: "active",
      rol: "",
      file: '',
    };
  },
  computed: {
    ...mapGetters("persons/users", {
      error: "error"
    })
  },
  created() {
    this.isCreating();
  },
  beforeDestroy() {
    this.clearSelection();
  },
  methods: {
    cancel() {
      this.$router.push(this.localePath({ name: "persons-users" }));
    },
    handleFileToUpload(){      
      this.file = this.$refs.file.files[0]
    },
    submit() {
      let newUser = {         
          firstName : this.firstName,
          lastName : this.lastName,
          nickName : this.nickName,
          document : this.document,
          password : this.password,
          email: this.email,
          state: this.state,
          //rol: "",
        };
      this.create({newUser,file: this.file}).then
      (_ =>this.$router.push(this.localePath({ name: "persons-users" })));
    },
    ...mapActions("persons/users", {
      isCreating: "isCreating",
      clearSelection: "clearSelection",
      create: "create",
      clearError: "clearError"
    })
  }
};
</script>