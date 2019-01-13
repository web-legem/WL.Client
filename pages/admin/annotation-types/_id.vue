<template>
  <div>
    <wl-crud
      :obj-select="objSelected"
      :is-new="false"
      @wlcancel="cancel"
      @wlupdate="update"
      @wldelete="drop"
    >
      <template slot="wl-form">
        <wl-input
          v-if="objSelected"
          v-model="name"
          :title="'Nombre del Tipo Anotación'"
          :max="10"
          :placeholder="'Escriba el nombre del tipo anotación'"
          :error-msg="'Este es un error'"
          :error="true"
        />
        <wl-input
          v-if="objSelected"
          v-model="root"
          :title="'Raiz de la Anotación'"
          :max="10"
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
import { mapGetters, mapActions } from "vuex";
import WlCrud from "~/components/WlCrud.vue";
import WlInput from "~/components/WlInput.vue";

export default {
  validate({ params }) {
    return /^\d+$/.test(params.id);
  },
  components: {
    WlCrud,
    WlInput
  },
  computed: {
    ...mapGetters("admin/annotation-types", {
      objSelected: "selected",
      error: "error",
    }),
    name: {
      get() {return this.objSelected.name},
      set(value){this.changeName(value)},
    },
    root: {
      get() {return this.objSelected.root},
      set(value){this.changeRoot(value)},
    },
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
      this.$router.push(this.localePath({ name: "admin-annotation-types" }));
    },
    drop() {
      this.delete().then(this.cancel());
    },
    update() {
      this.save(this.objSelected).then(this.cancel());
    },
    ...mapActions("admin/annotation-types", [
      "select",
      "clearSelection",
      "changeName",
      "changeRoot",
      "save",
      "delete",
    ])
  }
};
</script>
