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
          :title="'Crear Anotación'"
          :to="localePath({name: 'annotations-document-id-new'})" 
        >
          <span class="ico-plus " />
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
    <wl-annotations
      class="document-annotations"
      :document-id="document.id"
      :annotations="formatedAnnotations"
    />
  </div>
</template>

<script>
import WlDocumentControls from '~/components/search/WlDocumentControls.vue'
import WlAnnotations from '~/components/annotations/WlAnnotations.vue'

export default {
  components: {
    WlDocumentControls,
    WlAnnotations,
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

<style lang="scss" scoped>
.wl-document-info {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.document-annotations {
  flex-grow: 1;
}
</style>