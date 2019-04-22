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
          name="form-permission"
          data-vv-scope="form1"
          @submit.prevent
        >
          <wl-input
            v-model="name"
            :mode="'titleCase'"
            :name="'form1.name'"
            :title="$t('persons.permission.title-name')"
            :max="100"
            :placeholder="$t('persons.permission.place-enter-name')"
            :validate="{required:true}"
            :is-submit="isSubmit"
          />

          <wl-switch-button 
            :id="'chk1'"  
            v-model="configSystem"  
            :name="'form1.configSystem'"       
            :type="'checkbox'" 
            :title=" $t('persons.permission.title-config-system')"
            :label=" $t('persons.permission.label-allow')"
          />
          <wl-switch-button 
            :id="'chk2'"     
            v-model="createDocuments"       
            :name="'form1.createDocuments'"       
            :type="'checkbox'" 
            :title=" $t('persons.permission.title-create-doc')"
            :label=" $t('persons.permission.label-allow')"
          />
          <wl-switch-button 
            :id="'chk3'"
            v-model="deleteDocuments"       
            :name="'form1.deleteDocuments'"       
            :type="'checkbox'" 
            :title=" $t('persons.permission.title-delete-doc')"
            :label=" $t('persons.permission.label-allow')"
          />
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

export default {
  components: {
    WlCrud,
    WlInput,
    WlSwitchButton,
  },
  nuxtI18n: {
    paths: {es: 'nuevo', en: 'new'}
  },
  data() {
    return {
      name: "",
      configSystem: false,
      createDocuments: false,
      deleteDocuments: false,
      isSubmit: false,
    };
  },
  computed: {
    ...mapGetters("persons/permissions", {
      error: "error",
    })
  },

  created() {this.isCreating();},
  beforeDestroy() {this.clearSelection();},  
   
  methods: {
    cancel() {
      this.$router.push(this.localePath({ name: "persons-permissions" }));
    },
    submit() {
      this.$validator.validate('form1.*').then(valid => {
        this.isSubmit = true;
        if (valid) {
          let values = [this.configSystem,this.createDocuments,this.deleteDocuments];
          this.create({ name: this.name, permissions: values }).then(_ =>
            this.$router.push(this.localePath({ name: "persons-permissions" }))
          );      
        }
      }); 
    },
    ...mapActions("persons/permissions", {
      isCreating: "isCreating",
      clearSelection: "clearSelection",
      create: "create",
      clearError: "clearError",
    })
  }
}
</script>