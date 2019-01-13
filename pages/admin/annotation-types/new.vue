<template>
  <div>
    <wl-crud 
      :obj-select="obj" 
      :is-new="true" 
      @wlcancel="cancel" 
      @wlcreate="submit"
    >
      <template slot="wl-form">
        <wl-input
          v-model="name"
          :title="'Nombre del Tipo Anotación'"
          :max="16"
          :placeholder="'Escriba el nombre del tipo anotación'" 
          :error-msg="'Este es un error'"
          :error="true"
        />
        <wl-input
          v-model="root"
          :title="'Raiz de la Anotación'"
          :max="16"
          :placeholder="'Escriba la raiz de la anotación'"
          :error-msg="'Este es un error'"
          :error="true"
        />
        <p>Error: {{ error }}</p>
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
    })
  }
};
</script>