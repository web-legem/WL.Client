<template>
  <div>
    <wl-crud
      :obj-select="objSelected"
      :error="error"
      @wlcancel="cancel"
      @wlupdate="update"
      @wldelete="drop"
      @wlclearerror="clearError"
      @wlstartedit="startEdit"
    >
      <template slot="wl-form">
        <form 
          name="form-permission"
          data-vv-scope="form1"
          @submit.prevent
        >
          <wl-input
            v-if="objSelected"
            v-model="name"
            :mode="'titleCase'"
            :name="'form1.name'"
            :disable="!isEdit"
            :title="$t('persons.permission.title-name')"
            :max="100"
            :placeholder="$t('persons.permission.place-enter-name')"
            :validate="{required:true}"
            :is-submit="isSubmit"
          />

          <wl-switch-button 
            v-if="objSelected"               
            v-model="configSystem"       
            :name="'form1.configSystem'"       
            :type="'checkbox'" 
            :disable="!isEdit"
            :title=" $t('persons.permission.title-config-system')"
            :label=" $t('persons.permission.label-allow')"
          />
          <wl-switch-button 
            v-if="objSelected"               
            v-model="createDoc"       
            :name="'form1.createDoc'"       
            :type="'checkbox'" 
            :disable="!isEdit"
            :title=" $t('persons.permission.title-create-doc')"
            :label=" $t('persons.permission.label-allow')"
          />
          <wl-switch-button 
            v-if="objSelected"               
            v-model="deleteDoc"       
            :name="'form1.deleteDoc'"       
            :type="'checkbox'" 
            :disable="!isEdit"
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
  validate({ params }) {
    return /^\d+$/.test(params.id)
  }, 
  data() {
    return {
      isEdit : false,
      isSubmit: false,
    }
  },
  computed: {
    ...mapGetters("persons/permissions", {
      objSelected: "selected",
      error: "error"
    }),
    name: {
      get() {return this.objSelected.name},
      set(value){this.changeName(value)},
    },
    configSystem: {
      get() {return this.objSelected.configSystem == 1},
      set(value){this.changeConfigSystem(value ?1:0)},
    },
    createDoc: {
      get() {return this.objSelected.createDocuments == 1},
      set(value){this.changeCreateDoc(value ?1:0)},
    },
    deleteDoc: {
      get() {return this.objSelected.deleteDocuments == 1},
      set(value){this.changeDeleteDoc(value ?1:0)},
    },
  },
  watch: {
    $route() {
      this.select(this.$route.params.id)
    }
  },
  mounted() {
    this.select(this.$route.params.id)
  },
  beforeDestroy() {
    this.clearSelection();
  },
  methods: {
    cancel() {
      this.$router.push(this.localePath({ name: "persons-permissions" }));
    },
    drop() {
      this.delete().then(this.cancel);
    },
    update() {
      this.$validator.validate('form1.*').then(valid => {
        this.isSubmit = true;
        if (valid) {
          this.save(this.objSelected).then(this.cancel);      
        }
      });
    },
    startEdit(){
      this.isEdit = true;
    },
    ...mapActions("persons/permissions", [
      "save",
      "delete",
      "clearError",
      "select",
      "clearSelection",      
      "changeName",
      "changeConfigSystem",
      "changeCreateDoc",
      "changeDeleteDoc",
    ])
  },
}
</script>

<style>

</style>
