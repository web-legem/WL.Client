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
        <form 
          class="form-user" 
          name="form-user"
          data-vv-scope="form1"
          @submit.prevent
        >           
          <div class="box_duo_input">          
            <div>
              <wl-web-cam 
                :disable="false"
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
                v-model="firstName"
                :mode="'titleCase'"
                :name="'form1.firstname'"
                :title=" $t('persons.users-s.title-name')"
                :max="100"
                :placeholder=" $t('persons.users-s.place-enter-name')"
                :validate="{required:true}"
                :is-submit="isSubmit"
              />
              <wl-input
                v-model="lastName"
                :mode="'titleCase'"
                :name="'form1.lastname'"
                :title=" $t('persons.users-s.title-lastname')"
                :max="100"
                :placeholder=" $t('persons.users-s.place-enter-lastname')"
                :validate="{required:true}"
                :is-submit="isSubmit"
              />
              <wl-input
                v-model="nickName"
                :mode="'noSpace'"
                :name="'form1.nickname'"
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
                v-model="document"
                :mode="'onlyNumber'"
                :name="'form1.document'"
                :title=" $t('persons.users-s.title-id')"
                :max="50"
                :placeholder=" $t('persons.users-s.place-enter-id')"
                :validate="{required:true}"
                :is-submit="isSubmit"
              />
            </div>
            <div>
              <wl-input
                v-model="email"
                :mode="'noSpace'"
                :type="'email'"
                :name="'form1.email'"
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
                v-model="rol"
                :title="$t('persons.users-s.title-role-user')"
                :max="100"
                :placeholder="$t('persons.users-s.place-enter-role-user')"                
              />
            </div>
            <div>
              <wl-switch-button                
                v-model="state"              
                :type="'checkbox'" 
                :title=" $t('persons.users-s.title-state-user')"
                :label=" $t('persons.users-s.label-active')"
              />
            </div>
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
      firstName : "",
      lastName : "",
      nickName : "",
      document : "",
      email: "",
      state: true,
      rol: "",
      file: null,
      loadingPhoto: true,  
      photoUrl: '', 
      fileWasChange: false,
      isLoading: false,
      loadingSuccess: false,
      showTrash: false,
      isSubmit: false,
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
    submit() {
      let newUser = {         
          firstName : this.firstName,
          lastName : this.lastName,
          nickName : this.nickName,
          document : this.document,
          email: this.email,
          state: this.state ? 'active' : 'inactive',
          //rol: "",
        };
      
      this.$validator.validate('form1.*').then(valid => {
        this.isSubmit = true;
        if (valid) {
          this.create({newUser,file: this.file})
            .then(_ =>this.$router.push(this.localePath({ name: "persons-users" })));
        }
      });       
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
    ...mapActions("persons/users", {
      isCreating: "isCreating",
      clearSelection: "clearSelection",
      create: "create",
      clearError: "clearError"
    })
  }
};
</script>