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
          :title="'Nombre de la Entidad'"
          :max="10"
          :placeholder="'Escriba el nombre de la entidad'"
          :error-msg="'Este es un error'"
          :error="true"
        />

        <wl-input
          v-model="email"
          class="sm-space-top"
          :title="'Email'"
          :max="10"
          :placeholder="'Escriba Email'"
          :error-msg="'Este es un error'"
          :error="true"
        />
        <wl-select
          id="select"
          v-model="entityTypeId"
          class="sm-space-top"
          :error="true"
          :list="entityTypes"
          title="Seleccione del Tipo Documento"
          error-msg="Este es un error"
          value-prop-name="id"
          label-prop-name="name"
          name="select" 
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
    }
  },
  asyncData(context) {
    return context.app.$axios
      .get("/api/EntityType")
      .then(response => ({ entityTypes: response.data }))
      .catch(e => console.log(e));
  },
  computed: {
    ...mapGetters("admin/entities", {
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
      this.$router.push(this.localePath({ name: "admin-entities" }));
    },
    submit() {
      this.create({
        name: this.name,
        email: this.email,
        entityTypeId: this.entityTypeId
      }).then(x => {
        this.cancel();
      });
      // .catch(e => {console.log(e)})
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