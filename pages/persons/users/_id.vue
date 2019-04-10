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
        <form 
          class="form-user" 
          name="form-user"
          data-vv-scope="form1"
          @submit.prevent
        >  
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
              <wl-input
                v-if="objSelected"
                v-model="rol"
                :name="'form1.rol'"
                :disable="!isEdit"
                :title="$t('persons.users-s.title-role-user')"
                :max="100"
                :placeholder="$t('persons.users-s.place-enter-role-user')"                
              />
            </div>
            <div>
              <wl-switch-button 
                v-if="objSelected"               
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
        </form>
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
      "changeRol",
    ])
  },
}
</script>