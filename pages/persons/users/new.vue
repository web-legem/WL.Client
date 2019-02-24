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
              :title="'Nombre'"
              :max="100"
              :placeholder="'Ingrese Nombre'"
              :error-msg="'Este es un error'"
              :error="true"
            />
            <wl-input
              v-model="lastName"
              :title="'Apellidos'"
              :max="100"
              :placeholder="'Ingrese Apellidos'"
              :error-msg="'Este es un error'"
              :error="true"
            />
            <wl-input
              v-model="nickName"
              :title="'Nombre de Usuario'"
              :max="50"
              :placeholder="'Ingrese Nombre de Usuario'"
              :error-msg="'Este es un error'"
              :error="true"
            />
          </div>
        </div>
        <div class="box_duo_input">          
          <div>
            <wl-input
              v-model="password"
              :title="'Contraseña'"
              :max="256"
              :placeholder="'Ingrese Contraseña'"
              :error-msg="'Este es un error'"
              :error="true"
            />
          </div>
          <div>
            <wl-input
              v-model="document"
              :title="'Identificacion'"
              :max="50"
              :placeholder="'Ingrese Identificacion'"
              :error-msg="'Este es un error'"
              :error="true"
            />
          </div>
        </div>        
        <div class="box_duo_input">            
          <div>
            <wl-input
              v-model="email"
              :title="'Correo Electronico'"
              :max="100"
              :placeholder="'Ingrese Correo Electronico'"
              :error-msg="'Este es un error'"
              :error="true"
            />
          </div>
          <div>
            <wl-input
              v-model="rol"
              :title="'Rol de Usuario'"
              :max="100"
              :placeholder="'Ingrese Rol de Usuario'"
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
              :title="'Estado Usuario'"
              :label="'Activo'"
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
      file: null,
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