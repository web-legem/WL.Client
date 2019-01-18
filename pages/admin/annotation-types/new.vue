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
        <wl-input
          v-model="name"
          :title="'Nombre del Tipo Anotación'"
          :max="100"
          :placeholder="'Escriba el nombre del tipo anotación'"
          :error-msg="'Este es un error'"
          :error="true"
        />
        <wl-input
          v-model="root"
          class="sm-space-top"
          :title="'Raiz de la Anotación'"
          :max="50"
          :placeholder="'Escriba la raiz de la anotación'"
          :error-msg="'Este es un error'"
          :error="true"
        />
      </template>
    </wl-crud>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex"
import WlCrud from "~/components/WlCrud.vue"
import WlInput from "~/components/WlInput.vue"

export default {
  components: {
    WlCrud,
    WlInput,
  },
  nuxtI18n: {
    paths: {
      es: "nuevo",
      en: "new",
    }
  },
  data() {
    return {
      name: "",
      root: "",
    };
  },
  computed: {
    ...mapGetters("admin/annotation-types", {
      error: "error",
    })
  },

  created() {this.isCreating();},
  beforeDestroy() {this.clearSelection();},  

  methods: {
    cancel() {
      this.$router.push(this.localePath({ name: "admin-annotation-types" }));
    },
    submit() {
      this.create({ name: this.name, root: this.root }).then(_ =>
        this.$router.push(this.localePath({ name: "admin-annotation-types" }))
      );
    },
    ...mapActions("admin/annotation-types", {
      isCreating: "isCreating",
      clearSelection: "clearSelection",
      create: "create",
      clearError: "clearError",
    })
  }
};
</script>