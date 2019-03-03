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
        <!-- <input
          id="file"
          ref="file"
          name="file"
          type="file"
          @change="handleFileToUpload"
        > -->        
        <wl-load2 />
        <div class="box_duo_input">          
          <div>
            <wl-web-cam
              :photo-file="photoUrl"
              :disable="!isEdit"
            />            
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

        <div class="box_duo_input">            
          <div>
            <wl-switch-button
              v-if="objSelected"
              :id="'rad1'"
              v-model="state"
              :disable="!isEdit"
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
import WlLoad2 from "~/components/WlLoad2.vue";

export default {
  components: {
    WlCrud,
    WlInput,
    WlWebCam,
    WlSwitchButton,
    WlLoad2,
  },
  validate({ params }) {
    return /^\d+$/.test(params.id)
  },
  data() {
    return {
      img: null,
      camera: null,
      isEdit : false,
      file: '',
      loadingPhoto: true,  
      photoUrl: '',    
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
      get() {return this.objSelected.state == 'active'},
      set(value){this.changeState(value ? 'active' : 'inactive')},
    },
    rol: {
      get() {return this.objSelected.rol},
      set(value){this.changeRol(value)},
    },
  },
  watch: {
    $route() {
      this.select(this.$route.params.id).then(this.getPhoto)
    }
  },
  mounted() {
    this.select(this.$route.params.id).then(this.getPhoto);
  },
  beforeDestroy() {
    this.clearSelection();
  },
  methods: {    
    handleFileToUpload(){      
      this.file = this.$refs.file.files[0]
    },
    cancel() {
      this.$router.push(this.localePath({ name: "persons-users" }));
    },
    drop() {
      this.delete().then(this.cancel);
    },
    update() {
      this.save({modifiedUser: this.objSelected,file: this.file}).then(this.cancel);
    },
    startEdit(){
      this.isEdit = true;
    },
    getPhoto(){
      this.$axios.get('/api/User/Photo/'+ this.$route.params.id, {responseType: 'blob'})
      .then(response => this.loadPhoto(response.data))
      .catch(e => console.log("photo cant be loaded",e))
    },
    loadPhoto(response){      
      const url = window.URL.createObjectURL(new Blob([response]));      
      this.photoUrl = url;
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
      "changeRol",
    ])
  },
}
</script>