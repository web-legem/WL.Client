<template>
  <div 
    class="container-form-left"
    :class="isLoading ? 'loading' : '' "
  >
    <h1 class="left-form-title">    
      {{ $t('doc-management.document.edit-document') }}
    </h1>
    <form
      name="form-new-annotation"
      class="form-left"
      data-vv-scope="form1"
      @submit.prevent
    >
      <wl-text-area
        v-model="description"
        mode=""
        name="form1.description"
        :placeholder="$t('doc-management.document.issue-placeholder')"
        :title="$t('doc-management.document.document-issue')"
        :is-submit="isSubmit"
        :disable="isLoading"
        lang="es-Co"
      />

      <fieldset class="fieldset">
        <legend>
          {{ $t('doc-management.document.doc-legend') }}
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
          :empty-msg="$t('doc-management.classify-doc.please-select-one')"
          :validate="{ required: true }"
          :is-submit="isSubmit"
          :disable="isLoading"
        />
      </fieldset>

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
          @click.native="returnToAnnotations"
        >
          {{ $t('doc-management.classify-doc.butt-cancel') }}
        </wl-button>
      </div>
      <wl-left-loading 
        v-if="isLoading" 
        label="Procesando el documento..."
      />
    </form>
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

export default {
  components: {
    WlInput,
    WlSelect,
    WlButton,
    WlTextArea,
    WlLeftLoading,
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
            toNumber: this.number,
            annotationTypeId: this.annotationTypeId,
            description: this.description
          }).then(result => {
            this.$router.replace(this.localePath({ name: 'annotations-document-id'}))
            this.isLoading = false
          }).catch(e => {
            console.log(e)
            this.isLoading = false
          });
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container-form-left{
  display: flex;
  flex-grow: 1;
  height: 100%;
  flex-direction: column;
  margin: calc(1em + .5vw);
}

.form {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--wl_gray);
  padding: 16px;
  flex:1;
}

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
</style>
