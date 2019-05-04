<template>
  <div
    class="form"
  >
    <form
      name="form-new-annotation"
      data-vv-scope="form1"
      @submit.prevent
    >
      <h3>
        {{ $t('annotations.create-annotation') }}
      </h3>

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
      />

      <wl-text-area
        v-model="description"
        mode=""
        name="form1.description"
        :placeholder="$t('annotations.new.description-placeholder')"
        :title="$t('annotations.new.description')"
        :is-submit="isSubmit"
      />

      <fieldset class="fieldset">
        <legend class="texto_labels">
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
        />

        <wl-input 
          v-model="date"
          :title="$t('annotations.new.pub-date')"
          type="date" 
          name="form1.date" 
          :placeholer="$t('annotations.new.pub-date-placeholder')"
          :validate="{ required: true }"
          :is-submit="isSubmit"
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
        />
      </fieldset>

      <div
        class="action-container"
      >
        <wl-button
          type="button"
          class="action"
          ico="ico-check"
          @click="create"
        >
          {{ $t('doc-management.classify-doc.butt-accept') }}        
        </wl-button>
        <wl-button
          type="button"
          class="action"
          ico="ico-times"
          @click.native="returnToAnnotations"
        >
          {{ $t('doc-management.classify-doc.butt-cancel') }}
        </wl-button>
      </div>
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

export default {
  components: {
    WlInput,
    WlSelect,
    WlButton,
    WlTextArea,
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
          });
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  padding: 16px;
  flex-direction: column;
  border: 1px solid gray;
  margin: calc(1em + .5vw);
}

h3 {
  color: #00696b;
  padding-bottom: 5px;
  border-bottom: 1px solid #00696b;
  margin-bottom: 8px;
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

.ico-upload {
  display: block;
  font-size: 3rem;
  color: gray;
}

.next {
  align-self: flex-end;
}

.fieldset {
  border: 1px solid var(--wl_gray);
  padding: 16px;
}
</style>
