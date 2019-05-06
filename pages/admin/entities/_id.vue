<template>
  <div>
    <wl-crud
      :obj-select="selected"
      :error="error"
      :is-loading="loading"
      @wlcancel="cancel"
      @wlupdate="update"
      @wldelete="drop"
      @wlclearerror="clearError"
      @wlstartedit="startEdit"
    >
      <template slot="wl-form">        
        <wl-input
          v-if="selected"
          v-model="name"
          :name="'form1.name'"
          :mode="'titleCase'"
          :disable="!isEdit"
          :title="$t('admin.entitie-tab.title-name-entity')"
          :max="100"
          :placeholder="$t('admin.entitie-tab.place-enter-name-entity')"
          :validate="{required:true}"
          :is-submit="isSubmit"
        />
        <wl-input
          v-if="selected"
          v-model="email"
          :type="'email'"
          :name="'form1.email'"
          :mode="'noSpace'"
          class="sm-space-top"
          :disable="!isEdit"
          :title="$t('admin.entitie-tab.title-email')"
          :max="100"
          :placeholder="$t('admin.entitie-tab.place-enter-email')"
          :validate="{required:true}"
          :is-submit="isSubmit"
        />
        <wl-select
          v-if="selected"
          :id="'select'"
          v-model="entityTypeId"
          :name="'form1.select'"
          class="sm-space-top"
          :disable="!isEdit"
          :title="$t('admin.entitie-tab.title-select-entity-type')"            
          :list="entityTypes"
          :value-prop-name="'id'"
          :label-prop-name="'name'"
          :validate="{required:true}"
          :is-submit="isSubmit"
        />
      </template>
    </wl-crud>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import WlCrud from "~/components/WlCrud.vue";
import WlInput from "~/components/WlInput.vue";
import WlSelect from "~/components/WlSelect.vue";

export default {
  components: {
    WlCrud,
    WlInput,
    WlSelect
  },
  data() {
    return {
      isEdit : false,
      isSubmit: false,
    }
  },
  validate({ params }) {
    return /^\d+$/.test(params.id);
  },
  computed: {
    ...mapGetters("admin/entities", {
      selected: "selected",
      error: "error",
      loading: "loading",
    }),
    name: {
      get() {
        return this.selected.name;
      },
      set(value) {
        this.changeName(value);
      }
    },
    email: {
      get() {
        return this.selected.email;
      },
      set(value) {
        this.changeEmail(value);
      }
    },
    entityTypeId: {
      get() {
        if(this.selected){
          return this.selected.entityType
            ? this.selected.entityType.toString()
            : "";
        }
        return ""
        
      },
      set(value) {
        this.changeEntityTypeId(value)
      }
    }
  },

  watch: {
    $route() {
      this.select(this.$route.params.id);
    }
  },
  asyncData(context) {
    return context.app.$axios
      .get("/api/EntityType")
      .then(response => ({ entityTypes: response.data }))
      .catch(e => console.log(e));
  },
  mounted() {
    this.select(this.$route.params.id);
  },
  beforeDestroy() {
    this.clearSelection();
  },
  methods: {
    cancel() {
      this.$router.push(this.localePath({ name: "admin-entities" }));
      this.clearError();
    },
    drop() {
      this.delete().then(this.cancel);
    },
    update() {
      this.$validator.validate('form1.*').then(valid => {
        this.isSubmit = true;
        if (valid) {
          this.save(this.selected).then(this.cancel);
        }
      });      
    },
    startEdit(){
      this.isEdit = true;
    },
    ...mapActions("admin/entities", [
      "select",
      "clearSelection",
      "changeName",
      "changeEmail",
      "changeEntityTypeId",
      "save",
      "delete",
      "clearError",
    ])
  },
};
</script>