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
        <wl-input
          v-if="objSelected"
          v-model="name"
          :mode="'titleCase'"
          :name="'form1.name'"
          :disable="!isEdit"
          :title="$t('admin.entities-type.title-name-enty-type')"
          :max="100"
          :placeholder="$t('admin.entities-type.place-enter-name-type-enty')"
          :validate="{required:true}"
          :is-submit="isSubmit"
        />
        <label class="texto_labels sm-space-top">
          {{ $t('admin.entities-type.label-documents-suport') }}
        </label>
        <div 
          class="hoja-container"
          :class="{'disable':!isEdit}"
        >
          <div
            v-for="docType in docTypes"
            :key="docType.id"
          >
            <div 
              class="block"
              :class="{'disable':!isEdit}"
            >
              <input
                v-if="objSelected"
                :id="docType.id"
                v-model="checked"
                v-validate="{required:true}" 
                :data-vv-as="$t('admin.entities-type.label-documents-suport')"
                :disabled="!isEdit"
                :name="'form1.cards'"
                :value="docType.id"
                type="checkbox"
              >
              <label
                :for="docType.id"
                class="note checked"
              >
                <div>
                  <div class="ico-container">
                    <span class="ico-file-text-o" />                      
                  </div>
                  <div class="name-container">
                    <p class="note-name">
                      {{ docType.name }}
                    </p>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>
        <div 
          v-show="errors.has('form1.cards') && isSubmit"
          class="msj-error"
        >
          <strong>{{ errors.first('form1.cards') }}</strong>
        </div>
      </template>
    </wl-crud>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import WlCrud from "~/components/WlCrud.vue";
import WlInput from "~/components/WlInput.vue";

export default {
  components: {
    WlCrud,
    WlInput
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
      objSelected: "selected",
      error: "error",
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
  asyncData(context) {
    return context.app.$axios
      .get("/api/DocumentType")
      .then(response => ({ docTypes: response.data }))
      .catch(e => console.log(e));
  },
  mounted() {this.select(this.$route.params.id);},
  beforeDestroy() {this.clearSelection();},
  methods: {
    cancel() {
      this.$router.push(this.localePath({ name: "admin-entity-types" }));
      this.clearError();
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
    ...mapActions("admin/entity-types", [
      "select",
      "clearSelection",
      "changeSupportedDocumentTypes",
      "changeName",
      "save",
      "delete",
      "clearError",
    ])
  },
};
</script>

<style>

</style>
