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
          :mode="'titleCase'"
          :name="'form1.name'"
          :title="$t('admin.entities-type.title-name-enty-type')"
          :max="100" 
          :placeholder="$t('admin.entities-type.place-enter-name-type-enty')"
          :validate="{required:true}"
          :is-submit="isSubmit"
        />
        <label class="texto_labels sm-space-top">
          {{ $t('admin.entities-type.label-documents-suport') }}
        </label>
        <div class="hoja-container">
          <div
            v-for="docType in docTypes"
            :key="docType.id"            
          >
            <div class="block">              
              <input
                :id="docType.id"
                v-model="checked"
                v-validate="{required:true}" 
                :data-vv-as="$t('admin.entities-type.label-documents-suport')"
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
import { mapActions, mapGetters } from "vuex"
import WlCrud from "~/components/WlCrud.vue";
import WlInput from "~/components/WlInput.vue";

export default {
  components: {
    WlCrud,
    WlInput
  },
  nuxtI18n: {
    paths: {
      es: 'nuevo',
      en: 'new',
    }
  },
  data() {
    return {
      name: '',
      docTypes: [],
      checked: [],
      isSubmit: false,
    }
  },
  computed: {
    ...mapGetters("admin/entity-types", {
      error: "error"
    })
  },
  asyncData(context) {
    return context.app.$axios.get('/api/DocumentType')
      .then(response => ({ docTypes: response.data }))
      .catch(e => console.log('error', e))
  },
  created() {this.isCreating()},
  beforeDestroy() {this.clearSelection()},
  methods: {
    cancel() {
      this.$router.push(this.localePath({name: 'admin-entity-types'}))
    },
    submit() {
      this.$validator.validate('form1.*').then(valid => {
        this.isSubmit = true;
        if (valid) {
          this.create({ name: this.name, supportedDocumentTypesIds: this.checked })
            .then(_ => this.$router.push(this.localePath({name: 'admin-entity-types'})))          
        }
      });
    },
    ...mapActions('admin/entity-types', {
      create: 'create',
      isCreating: 'isCreating',
      clearSelection: 'clearSelection',
      clearError: "clearError",
    }),
  },
}
</script>