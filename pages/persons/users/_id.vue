<template>
  <div>
    <wl-crud
      :obj-select="objSelected"
      :is-new="false"
      :error="error"
      @wlcancel="cancel"
      @wlupdate="update"
      @wldelete="drop"
      @wlclearerror="clearError"
      @wlstartedit="startEdit"
    >
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
              :title="'Nombre'"
              :max="100"
              :placeholder="'Ingrese Nombre'"
              :error-msg="'Este es un error'"
              :error="true"
            />
            <wl-input
              v-if="objSelected"
              v-model="lastName"
              :disable="!isEdit"
              :title="'Apellidos'"
              :max="100"
              :placeholder="'Ingrese Apellidos'"
              :error-msg="'Este es un error'"
              :error="true"
            />
            <wl-input
              v-if="objSelected"
              v-model="nickname"
              :disable="!isEdit"
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
              v-if="objSelected"
              v-model="password"
              :disable="!isEdit"
              :title="'Contraseña'"
              :max="100"
              :placeholder="'Ingrese Contraseña'"
              :error-msg="'Este es un error'"
              :error="true"
            />
          </div>
          <div>
            <wl-input
              v-if="objSelected"
              v-model="document"
              :disable="!isEdit"
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
              v-if="objSelected"
              v-model="email"
              :disable="!isEdit"
              :title="'Correo Electronico'"
              :max="100"
              :placeholder="'Ingrese Correo Electronico'"
              :error-msg="'Este es un error'"
              :error="true"
            />
          </div>
          <div>
            <wl-input
              v-if="objSelected"
              v-model="rol"
              :disable="!isEdit"
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
              v-if="objSelected"
              :id="'rad1'"
              v-model="state"
              :disable="!isEdit"
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
  components: {
    WlCrud,
    WlInput,
    WlWebCam,
    WlSwitchButton,
  },
  validate({ params }) {
    return /^\d+$/.test(params.id)
  },
  data() {
    return {
      img: null,
      camera: null,
      isEdit : false
    };
  },
  computed: {
    ...mapGetters("persons/users", {
      objSelected: "selected",
      error: "error"
    }),
    firstName: {
      get() {return this.objSelected.firstName},
      set(value){this.changeFirstName(value)},
    },
    lastName: {
      get() {return this.objSelected.lastName},
      set(value){this.changeLastName(value)},
    },
    nickname: {
      get() {return this.objSelected.nickname},
      set(value){this.changeNickname(value)},
    },
    document: {
      get() {return this.objSelected.document},
      set(value){this.changeDocument(value)},
    },
    password: {
      get() {return this.objSelected.password},
      set(value){this.changePassword(value)},
    },
    email: {
      get() {return this.objSelected.email},
      set(value){this.changeEmail(value)},
    },
    state: {
      get() {return this.objSelected.status == 'active'},
      set(value){this.changeState(value)},
    },
    photo: {
      get() {return this.objSelected.photo},
      set(value){this.changePhoto(value)},
    },
    rol: {
      get() {return this.objSelected.rol},
      set(value){this.changeRol(value)},
    }
  },
  watch: {
    $route() {
      this.select(this.$route.params.id);
    }
  },
  methods: {    
    cancel() {
      this.$router.push(this.localePath({ name: "persons-users" }));
    },
    drop() {
      this.delete().then(this.cancel);
    },
    update() {
      this.save(this.objSelected).then(this.cancel);
    },
    startEdit(){
      this.isEdit = true;
    },
    ...mapActions("persons/users", [
      "save",
      "delete",
      "clearError",
      "select",
      "clearSelection",      
      "changeFirstName",
      "changeLastName",
      "changeNickname",
      "changeDocument",
      "changeEmail",
      "changePassword",
      "changeState",
      "changePhoto",
      "changeRol",
    ])
  },
}
</script>