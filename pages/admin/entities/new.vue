<template>
  <div>
    <wl-crud 
      :is-new="true" 
      :error="error"
      :is-loading="loading"
      @wlcancel="cancel" 
      @wlcreate="submit"
      @wlclearerror="clearError"
    >
      <template slot="wl-form">
        <wl-input
          v-model="name"
          :name="'form1.name'"
          :title="$t('admin.entitie-tab.title-name-entity')"
          :max="100"
          :placeholder="$t('admin.entitie-tab.place-enter-name-entity')"
          :validate="{required:true}"
          :is-submit="isSubmit"
        />

        <wl-input
          v-model="email"
          :name="'form1.email'"
          :type="'email'"
          class="sm-space-top"
          :title="$t('admin.entitie-tab.title-email')"
          :max="100"
          :placeholder="$t('admin.entitie-tab.place-enter-email')" 
          :validate="{required:true}"
          :is-submit="isSubmit"
        />
        <wl-select
          v-model="entityTypeId"
          :name="'form1.select'"
          class="sm-space-top"
          :list="entityTypes"
          :title="$t('admin.entitie-tab.title-select-entity-type')"
          value-prop-name="id"
          label-prop-name="name"
          :validate="{required:true}"
          :is-submit="isSubmit"
        />
      </template>
    </wl-crud>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex"
import WlCrud from "~/components/WlCrud.vue";
import WlInput from "~/components/WlInput.vue"
import WlSelect from "~/components/WlSelect.vue"

export default {
  components: {
    WlCrud,
    WlInput,
    WlSelect,
  },
  nuxtI18n: {
    paths: {
      es: "nuevo",
      en: "new",
    }
  },
  data() {
    return {
      entityTypeId: null,
      name: "",
      email: "",
      isSubmit: false,
    }
  },
  computed: {
    ...mapGetters("admin/entities", {
      error: "error",
      loading: "loading",
    })
  },
  asyncData(context) {
    return context.app.$axios
      .get("/api/EntityType")
      .then(response => ({ entityTypes: response.data }))
      .catch(e => console.log(e));
  },
  created() {
    this.isCreating();
  },
  beforeDestroy() {
    this.clearSelection();
  },

  methods: {
    cancel() {
      this.$router.push(this.localePath({ name: "admin-entities" }));
    },
    submit() {
      this.$validator.validate('form1.*').then(valid => {
        this.isSubmit = true;
        if (valid) {
          this.create({
            name: this.name,
            email: this.email,
            entityTypeId: this.entityTypeId
          }).then(x => {
            this.cancel();
          });
        }
      });
    },
    ...mapActions("admin/entities", {
      create: "create",
      isCreating: "isCreating",
      clearSelection: "clearSelection",
      clearError: "clearError",
    })
  }
};
</script>