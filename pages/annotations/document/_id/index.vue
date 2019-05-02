<template>
  <wl-document-annotations 
    v-if="document && annotations && entities && documentTypes && annotationTypes"
    class="document-annotations"
    :document="document"
    :annotations="annotations"
    :annotation-types="annotationTypes"
    :entities="entities"
    :document-types="documentTypes"
  >
    <!-- <button
      slot="controls"
      class="icon"
      focusable
      :class="[iconViewDocument]"
      @click="toggleDocument"
    /> -->
  </wl-document-annotations> 
</template>

<script>
import WlDocumentAnnotations from '~/components/annotations/WlDocumentAnnotations.vue'

export default {
  components: {
    WlDocumentAnnotations
  },
  asyncData(context) {
    const documentPromise = context.app.$axios.get(`/api/Document/${context.route.params.id}`)
    const annotationsPromise = context.app.$axios.get(`/api/Annotation/document/${context.route.params.id}`)
    const entitiesPromise = context.app.$axios.get(`/api/Entity`)
    const documentTypesPromise = context.app.$axios.get(`/api/DocumentType`)
    const annotationTypesPromise = context.app.$axios.get(`/api/AnnotationType`)
    return Promise.all([
        documentPromise,
        annotationsPromise,
        entitiesPromise,
        documentTypesPromise,
        annotationTypesPromise,
      ])
      .then(response => ({ 
        document: response[0].data,
        annotations: response[1].data,
        entities: response[2].data,
        documentTypes: response[3].data,
        annotationTypes: response[4].data,
      }))
  }
}
</script>

<style>

</style>