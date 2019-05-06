<template>
  <div>
    <wl-crud
      :obj-select="objSelected"
      :is-new="false"
      :error="error"
      :is-loading="loading"
      :element-name="'lastName'"
      @wlcancel="cancel"
      @wlupdate="update"
      @wldelete="drop"
      @wlclearerror="clearError"
      @wlstartedit="startEdit"
    >
      <template slot="wl-form">           
        <div class="box_duo_input">          
          <div>
            <wl-web-cam
              :disable="!isEdit"
              :photo-file="photoUrl"
              :is-loading="isLoading"
              :loading-success="loadingSuccess"
              :trash="showTrash"
              @new-file="newFile($event)"
              @was-change="setPhotoState($event)"   
              @loading-success="setLoadingSuccess($event)"   
              @show-trash="setShowTrash($event)" 
            />            
          </div>
          <div>
            <wl-input
              v-if="objSelected"
              v-model="firstName"
              :mode="'titleCase'"
              :name="'form1.firstname'"
              :disable="!isEdit"
              :title=" $t('persons.users-s.title-name')"
              :max="100"
              :placeholder=" $t('persons.users-s.place-enter-name')"
              :validate="{required:true}"
              :is-submit="isSubmit"
            />
            <wl-input
              v-if="objSelected"
              v-model="lastName"
              :mode="'titleCase'"
              :name="'form1.lastname'"
              :disable="!isEdit"                
              :title=" $t('persons.users-s.title-lastname')"
              :max="100"
              :placeholder=" $t('persons.users-s.place-enter-lastname')"
              :validate="{required:true}"
              :is-submit="isSubmit"
            />
            <wl-input
              v-if="objSelected"
              v-model="nickname"
              :mode="'noSpace'"
              :name="'form1.nickname'"
              :disable="!isEdit"
              :title=" $t('persons.users-s.title-name-user')"
              :max="50"
              :placeholder=" $t('persons.users-s.place-enter-name-user')"
              :validate="{required:true}"
              :is-submit="isSubmit"
            />
          </div>
        </div>
        <div class="box_duo_input">          
          <div>
            <wl-input
              v-if="objSelected"
              v-model="document"
              :mode="'onlyNumber'"
              :name="'form1.document'"
              :disable="!isEdit"
              :title=" $t('persons.users-s.title-id')"
              :max="50"
              :placeholder=" $t('persons.users-s.place-enter-id')"
              :validate="{required:true}"
              :is-submit="isSubmit"
            />
          </div>
          <div>
            <wl-input
              v-if="objSelected"
              v-model="email"
              :mode="'noSpace'"
              :type="'email'"
              :name="'form1.email'"
              :disable="!isEdit"
              :title="$t('persons.users-s.title-email')"
              :max="100"
              :placeholder=" $t('persons.users-s.place-enter-email')"
              :validate="{required:true}"
              :is-submit="isSubmit"
            />
          </div>
        </div>        
        <div class="box_duo_input">                        
          <div>
            <wl-select
              v-if="objSelected"
              :id="'select'"
              v-model="roleId"
              :name="'form1.select'"
              :disable="!isEdit"
              :list="roles"
              :title="$t('persons.users-s.title-role-user')"
              value-prop-name="id"
              label-prop-name="name"
              :validate="{required:true}"
              :is-submit="isSubmit"
            />
          </div>
          <div>
            <wl-switch-button 
              v-if="objSelected"    
              :id="'chk1'"           
              v-model="state"       
              :name="'form1.state'"       
              :type="'checkbox'" 
              :disable="!isEdit"
              :title=" $t('persons.users-s.title-state-user')"
              :label=" $t('persons.users-s.label-active')"
            />
          </div>
        </div>
        <div class="box_duo_input">            
          <div>
            <wl-switch-button 
              v-if="objSelected"         
              :id="'chk2'"      
              v-model="restorePass"  
              :name="'form1.restore'"            
              :type="'checkbox'" 
              :disable="!isEdit"
              :title=" $t('persons.users-s.label-restore-password')"
              :label=" $t('persons.users-s.label-restore-password')"
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
import WlSelect from "~/components/WlSelect.vue";

export default {
  components: {
    WlCrud,
    WlInput,
    WlWebCam,
    WlSwitchButton,
    WlSelect,
  },
  validate({ params }) {
    return /^\d+$/.test(params.id)
  },
  data() {
    return {
      isEdit : false,
      file: null,
      loadingPhoto: true,  
      photoUrl: '', 
      fileWasChange: false,
      isLoading: false,
      loadingSuccess: false,
      showTrash: false,
      isSubmit: false,
      restorePass: false,
    }
  },
  computed: {
    ...mapGetters("persons/users", {
      objSelected: "selected",
      error: "error",
      loading: "loading",
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
    roleId: {
      get() {
        if(this.objSelected){
          return this.objSelected.roleId ? this.objSelected.roleId.toString() : ""
        }
        return ""
      },
      set(value) {this.changeRoleId(value)}
    },
  },
  watch: {
    $route() {
      this.select(this.$route.params.id).then(this.getPhoto)
    },
  },
  asyncData(context) {
    return context.app.$axios
      .get("/api/Role")
      .then(response => ({ roles: response.data }))
      .catch(e => console.log(e));
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
      this.clearError();
    },
    drop() {
      this.delete().then(this.cancel);
    },
    update() {
      this.$validator.validate('form1.*').then(valid => {
        this.isSubmit = true;
        if (valid) {
          this.save({
                modifiedUser: this.objSelected,
                file: this.file, 
                fileWasChange: this.fileWasChange,
                restorePass: this.restorePass
              }).then(this.cancel);        
        }
      });
    },
    startEdit(){
      this.isEdit = true;
    },
    getPhoto(){
      this.isLoading = true;
      this.$axios.get('/api/User/Photo?id='+ this.$route.params.id, {responseType: 'blob'})
      .then(response => this.loadPhoto(response.data))
      .catch(e => this.cantLoadPhoto(e))
    },
    cantLoadPhoto(e){        
      console.log("photo cant be loaded",e);    
      this.isLoading = false;
      this.loadingSuccess = false;
    },
    loadPhoto(response){            
      const url = window.URL.createObjectURL(new Blob([response]));            
      this.photoUrl = url;
      this.isLoading = false;
      this.loadingSuccess = true;
    },    
    newFile(file) {
      this.file = file;
    },
    setShowTrash(show) {
      this.showTrash = show;
    },
    setPhotoState(){
      this.fileWasChange = true;
    },
    setLoadingSuccess(){
      this.loadingSuccess = true;
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
      "changeRoleId",
    ])
  },
}
</script>