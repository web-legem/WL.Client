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
          :title="'Nombre del Tipo Entidad'"
          :max="10" 
          :placeholder="'Escriba el nombre del tipo entidad'" 
          :error-msg="'Este es un error'"                     
          :error="true"
          v-model="name"
        />    
        <div class="cards">
          <div
            v-for="docType in docTypes"
            :key="docType.id"            
          >
            <div class="block">              
              <input
                v-if="objSelected"
                :name="docType.id"
                :id="docType.id"
                :value="docType.id"
                v-model="checked"
                type="checkbox"
              >
              <label 
                :for="docType.id"
                class="note checked"
              >
                <div>
                  <div class="ico-container">
                    <span class="ico-file-text-o ico-note"/>
                  </div>
                  <div class="name-container">                  
                    <p class="note-name">{{ docType.name }}</p>                  
                  </div>
                </div>
              </label>
            </div>                  
          </div>
        </div>        

        <p>Selected: {{ checked }}</p>
      </template>
    </wl-crud>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import WlCrud from "~/components/WlCrud.vue";
import WlButton from "~/components/WlButton.vue";
import WlInput from "~/components/WlInput.vue";

export default {
  components: {
    WlCrud,
    WlButton,
    WlInput
  },
  computed: {
    checked: {
      get() {
        return this.$store.state.admin["entity-types"].selected
          ? this.$store.state.admin["entity-types"].selected
              .supportedDocumentTypesIds
          : [];
      },
      set(value) {
        this.$store.commit(
          "admin/entity-types/changeSupportedDocumentTypes",
          value
        );
      }
    },
    ...mapGetters("admin/entity-types", {
      objSelected: "selected"
    }),
    name: {
      get() {
        return this.objSelected.name;
      },
      set(value) {
        this.changeName(value);
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
      this.$router.push(this.localePath({ name: "admin-entity-types" }));
    },
    drop() {
      this.delete().then(this.cancel);
    },
    update() {
      this.save(this.objSelected).then(this.cancel);
    },
    ...mapActions("admin/entity-types", [
      "select",
      "clearSelection",
      "changeSupportedDocumentTypes",
      "changeName",
      "save",
      "delete"
    ])
  },
  asyncData(context) {
    return context.app.$axios
      .get("/api/DocumentType")
      .then(response => ({ docTypes: response.data }))
      .catch(e => console.log(e));
  }
};
</script>

<style>

</style>
