<template>
  <div>
    <wl-crud
      :obj-select="selected"
      :is-new="false"
      :error="error"
      @wlcancel="cancel"
      @wlupdate="update"
      @wldelete="drop"
      @wlclearerror="clearError"
      @wlstartedit="startEdit"
    >    
      <template slot="wl-form">
        <wl-input
          v-if="selected"
          :value="selected.name"
          :disable="!isEdit"
          :title="$t('admin.entitie-tab.title-name-entity')"
          :max="100"
          :placeholder="$t('admin.entitie-tab.place-enter-name-entity')"
          :error-msg="'Este es un error'"
          :error="true"
          @input="changeName"
        />
        <wl-input
          v-if="selected"
          :value="selected.email"
          class="sm-space-top"
          :disable="!isEdit"
          :title="$t('admin.entitie-tab.title-email')"
          :max="100"
          :placeholder="$t('admin.entitie-tab.place-enter-email')"
          :error-msg="'Este es un error'"
          :error="true"
          @input="changeEmail"
        />
        <wl-select
          :id="'select'"
          v-model="entityTypeId"
          class="sm-space-top"
          :disable="!isEdit"
          :name="'select'"
          :title="$t('admin.entitie-tab.title-select-doc-type')"
          :error-msg="'Este es un error'"
          :error="true"
          :list="entityTypes"
          :value-prop-name="'id'"
          :label-prop-name="'name'"
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
      isEdit : false
    }
  },
  validate({ params }) {
    return /^\d+$/.test(params.id);
  },
  computed: {
    ...mapGetters("admin/entities", {
      selected: "selected",
      error: "error"
    }),
    entityTypeId: {
      get() {
        return this.selected
          ? this.selected.entityType
          : 0;
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

  mounted() {
    this.select(this.$route.params.id);
  },
  beforeDestroy() {
    this.clearSelection();
  },

  methods: {
    cancel() {
      this.$router.push(this.localePath({ name: "admin-entities" }));
    },
    drop() {
      this.delete().then(this.cancel);
    },
    update() {
      this.save(this.selected).then(this.cancel);
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
  asyncData(context) {
    return context.app.$axios
      .get("/api/EntityType")
      .then(response => ({ entityTypes: response.data }))
      .catch(e => console.log(e));
  }
};
</script>