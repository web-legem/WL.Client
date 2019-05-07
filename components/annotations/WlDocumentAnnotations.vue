<template>
  <div class="document-annotations">
    <div class="first-line">
      <h1 class="document-header">
        {{ getDocumentTitle(document) }} 
      </h1>
      <nuxt-link 
        class="ico2-plus icon" 
        :to="localePath({name: 'annotations-document-id-new'})" 
      />
      <slot name="controls" />
    </div>
    <wl-annotations
      :document-id="document.id"
      :annotations="formatedAnnotations"
    />
  </div>
</template>

<script>
import WlAnnotations from '~/components/annotations/WlAnnotations.vue'

export default {
  components: {
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
        ? 'OUT' 
        : 'IN'
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
.document-control {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.first-line {
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid grey;
  box-shadow: 0 8px 10px -8px grey;
  z-index: 1;
}

.document-header {
  flex-grow: 1;
  font-size: 1.4rem;
  background: var(--wl_form_bg);
  color: var(--wl_primary);
  padding: 10px;
}

.icon {
  font-size: 1.4rem;
  background-color: transparent;
  color: var(--wl_primary);
  margin: 10px;
  padding: 5px;
  padding-bottom: 5px;
  cursor: pointer;
  margin-left: 5px;
  border-radius: 50%;
  background-position: center;
  transition: background 0.8s;
  text-decoration: none;
}

.icon:hover {
  background: #eee radial-gradient(circle, transparent 1%, #eee 1%) center/15000%;
  color: var(--wl_primary);
}

.icon:active {
  background-color: #999;
  color: var(--wl_primary);
  background-size: 100%;
  transition: background 0s;
}
</style>