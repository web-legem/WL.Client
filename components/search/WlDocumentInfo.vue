<template>
  <div class="wl-document-info">
    <wl-document-controls 
      :document-title="getDocumentTitle(document)"
    >
      <div 
        slot="controls"
        class="controls"
      >
        <nuxt-link
          class="ico_cl" 
          :title="$t('search.search-result.notify')"
          :to="localePath({name: 'search-id-notify'})" 
        >
          <span class=" ico-paper-plane" />
        </nuxt-link>
        <a 
          v-if="$mq == 'sm' || $mq == 'md'"
          :href="$axios.defaults.baseURL + 'api/Search/file/download/' + document.id"
          :title="$t('search.search-result.title-down')"
          download       
          class="ico_cl"   
        >
          <span class="ico-download" />
        </a>
      </div>
    </wl-document-controls>
    <div class="annotation-list">
      <wl-annotation-list 
        v-if="formatedAnnotations.length > 0"
        :document-id="document.id"
        :annotations="formatedAnnotations"
      />
      <wl-error-message
        v-if="formatedAnnotations.length == 0"
        icon="escudo-udenar"
        class="error"
      >
        <div 
          class="instructions"
        >
          {{ $t('documentHasNoAnotations') }}
        </div>
      </wl-error-message>
    </div>
  </div>
</template>

<script>
import WlDocumentControls from '~/components/search/WlDocumentControls.vue'
import WlAnnotationList from '~/components/search/WlAnnotationList.vue'
import WlErrorMessage from '~/components/WlErrorMessage.vue'

export default {
  components: {
    WlDocumentControls,
    WlAnnotationList,
    WlErrorMessage,
  },
  props: {
    document: {
      required: true,
      type: Object
    },
    annotationTypes: {
      required: true,
      type: Array
    },
    entities: {
      required: true,
      type: Array
    },
    documentTypes: {
      required: true,
      type: Array
    },
    annotations: {
      required: true,
      type: Array
    },
  },
  computed: {
    formatedAnnotations() {
      return this.annotations.map(x => ({ 
        id: x.id,
        direction: this.determineDirection(x),
        annotationType: this.getAnnotationType(x.annotationTypeId),
        document: this.getDocumentTitleFromAnnotation(x),
        description: x.description,
        documentId: this.getDocumentId(x)
      }))
    }
  },
  methods: {
    getDocumentTypeName(document) {
      return this.documentTypes
      .find(x => x.id == document.documentTypeId)
      .name
    },
    determineDirection(annotation){
      return this.currentDocumeentIsDestinyIn(annotation)
        ? 'IN'
        : 'OUT' 
    },
    getAnnotationType(annotationTypeId){
      console.log(annotationTypeId)
      return this.annotationTypes.find(x => x.id == annotationTypeId)
    },
    getDocumentTitle(document) {
      return `${ this.getDocumentTypeName(document) } ${ document.number } ${ this.$t('annotations.list.of') } ${ document.publicationDate.substring(0,4) }`
    },
    getDocumentTitleFromAnnotation(annotation){
      return this.currentDocumeentIsDestinyIn(annotation)
        ? this.getDocumentTitle(annotation.from)
        : this.getDocumentTitle(annotation.to)
    },
    getDocumentId(annotation){
      return this.currentDocumeentIsDestinyIn(annotation)
      ? annotation.from.id
      : annotation.to.id
    },
    currentDocumeentIsDestinyIn(annotation){
      return annotation.to.id == this.document.id
    }
  },
}
</script>

<style scoped>
.wl-document-info {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

.annotation-list {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.instructions {
  margin-top: .4em;
  padding: .4em .1em;
  max-width: 400px;
  text-align: center;
}

.error {
  margin-top: 32px;
  height: 400px;
}
</style>
