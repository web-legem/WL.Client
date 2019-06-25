<template>
  <div 
    class="container-form-left"
    :class="isLoading ? 'loading' : '' "
  >
    <h1 class="left-form-title">
      {{ $t('annotations.create-annotation') }}
    </h1>
    <form
      name="form-new-annotation"
      class="form-left"
      data-vv-scope="form1"
      @submit.prevent
    >    
      <wl-select 
        v-model="annotationTypeId"
        name="form1.annotationType" 
        :title="$t('annotations.new.annotation-type')"
        value-prop-name="id"
        label-prop-name="name"
        class="select"
        :list="annotationTypes"
        :validate="{ required: true }"
        :is-submit="isSubmit"
        :disable="isLoading"
      />

      <wl-text-area
        v-model="description"
        mode=""
        name="form1.description"
        :placeholder="$t('annotations.new.description-placeholder')"
        :title="$t('annotations.new.description')"
        :is-submit="isSubmit"
        :disable="isLoading"
      />

      <fieldset class="fieldset">
        <legend>
          {{ $t('annotations.new.to-doc') }}
        </legend>
        <wl-input
          v-model="number"
          mode="onlyNumber"
          name="form1.number"
          :placeholder="$t('annotations.new.number-placeholder')"
          :validate="{ required: true }"
          :title="$t('annotations.new.number')"
          :is-submit="isSubmit"
          :disable="isLoading"
        />

        <wl-input 
          v-model="date"
          :title="$t('annotations.new.pub-date')"
          type="date" 
          name="form1.date" 
          :placeholer="$t('annotations.new.pub-date-placeholder')"
          :validate="{ required: true }"
          :is-submit="isSubmit"
          :disable="isLoading"
        />

        <wl-select 
          v-model="entityId"
          name="form1.entity" 
          value-prop-name="id"
          label-prop-name="name"
          class="select"
          :title="$t('annotations.new.entity')"
          :list="entities"
          :validate="{ required: true }"
          :is-submit="isSubmit"
          :disable="isLoading"
        />

        <wl-select 
          v-model="documentTypeId"
          name="form1.documentType" 
          :title="$t('annotations.new.doc-type')"
          value-prop-name="id"
          label-prop-name="name"
          class="select"
          :list="documentTypes"          
          :validate="{ required: true }"
          :is-submit="isSubmit"
          :disable="isLoading"
        />
      </fieldset>
      <span class="fix-flex" />
      <div
        class="action-container"
      >
        <wl-button
          type="submit"
          class="action"
          ico="ico-check"
          :title="$t('doc-management.classify-doc.butt-accept')"
          :disable="isLoading"
          @click="create"
        >
          {{ $t('doc-management.classify-doc.butt-accept') }}        
        </wl-button>
        <wl-button
          type="button"
          class="action"
          ico="ico-times"
          :title="$t('doc-management.classify-doc.butt-cancel')"
          :disable="isLoading"
          @click="returnToAnnotations"
        >
          {{ $t('doc-management.classify-doc.butt-cancel') }}
        </wl-button>
      </div>
      <wl-left-loading 
        v-if="isLoading" 
        label="Procesando..."
      />
    </form>

    <wl-modal
      v-if="error != null"
      :title="$t('components.crud.title-info')"
      @wlclose="closeDialog"
    >
      <template slot="wl-content">
        <div class="generic-box-vertical content-modal">
          <div>{{ error.message }}</div>
        </div>
        <div class="modal-confirmacion confirm-dialog content-modal-buttons">
          <wl-button 
            ico="ico-check"            
            @click.native="closeDialog"
          >
            {{ $t('components.crud.butt-accept') }}
          </wl-button>
        </div>
      </template>
    </wl-modal>
  </div>
</template>

<script>
import moment from 'moment';
import {mapGetters, mapActions} from 'vuex'
import WlInput from '~/components/WlInput.vue'
import WlSelect from '~/components/WlSelect.vue'
import WlButton from '~/components/WlButton.vue'
import WlTextArea from '~/components/WlTextArea.vue'
import WlLeftLoading from '~/components/WlLeftLoading.vue'
import errorHandler from '~/helpers/errorHandler'
import WlModal from '~/components/WlModal.vue'

export default {
  components: {
    WlInput,
    WlSelect,
    WlButton,
    WlTextArea,
    WlLeftLoading,
    WlModal,
  },
  nuxtI18n: {
    paths: { es: 'nuevo', en: 'new' }
  },
  data() {
    return {
      date: moment(Date.now())
        .locale(this.$store.state.i18n.locale)
        .format('YYYY-MM-DD'),
      number: "",
      description: "",
      entityId: null,
      documentTypeId: null,
      annotationTypeId: null,
      isSubmit: false,
      isLoading: false,
      error: null,
    }
  },
  asyncData(context) {
    var entitiesPromise = context.app.$axios.get("/api/Annotation/entities")
    var documentTypesPromise = context.app.$axios.get("/api/Annotation/documentTypes")
    var annoattionTypesPromise = context.app.$axios.get("/api/Annotation/annotationTypes")
    return Promise.all([
        entitiesPromise,
        documentTypesPromise,
        annoattionTypesPromise,
      ])
      .then(results => ({
        entities: results[0].data,
        documentTypes: results[1].data,
        annotationTypes: results[2].data,
      }))
  },
  methods: {
    returnToAnnotations() {
      console.log('return to annotations')
      this.$router.replace(this.localePath(({ name: 'annotations-document-id' })))
    },
    create(){
      this.$validator.validate('form1.*').then( valid => {
        this.isSubmit = true
        if(valid){
          this.isLoading = true
          this.$axios.post('/api/Annotation', {
            fromDocumentId: this.$route.params.id,
            toDocumentTypeId: this.documentTypeId,
            toEntityId: this.entityId,
            toPublicationYear: moment(this.date, "YYYY-MM-DD").format("YYYY"),
            toPublicationDate: this.date,
            toNumber: this.number,
            annotationTypeId: this.annotationTypeId,
            description: this.description
          }).then(result => {
            this.$router.replace(this.localePath({ name: 'annotations-document-id'}))
            this.isLoading = false
          }).catch(e => {
            this.error = errorHandler(e);            
            this.isLoading = false
          });
        }
      })
    },
    closeDialog() {
      this.error = null;
    },
  }
}
</script>

<style lang="scss" scoped>

.action-container {
  padding-top: 16px;
  display: flex;
  justify-content: flex-end;
}

.action {
  margin-left: 16px;
}

.select {
  margin-bottom: 10px;
}

.content {
  height: 100%;
}

.fieldset {
  border: 1px solid var(--wl_gray);
  padding: 16px;
}

.content-modal{  
  width: 100%;
  padding: 10px;  
  margin-bottom: -10px;
  background: transparent;
  color: var(--wl_text);
}

.content-modal-buttons{
  padding: 10px;  
  margin-top: 10px;
}
</style>
