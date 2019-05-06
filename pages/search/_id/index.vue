<template>
  <wl-document-info
    v-if="document && annotations && entities && documentTypes && annotationTypes"
    slot="master"
    class="master"
    :document="document"
    :annotations="annotations"
    :annotation-types="annotationTypes"
    :entities="entities"
    :document-types="documentTypes"
  />
</template>

<script>
import WlDocumentInfo from '~/components/search/WlDocumentInfo.vue'

export default {
  components: {
    WlDocumentInfo,    
  },
  data() {
    return {
      id: this.$route.params.id,
    }
  },
  asyncData(context) {
    const documentPromise = context.app.$axios.get(`/api/Document/${context.route.params.id}`)
    const annotationsPromise = context.app.$axios.get(`/api/Annotation/document/${context.route.params.id}`)
    const entitiesPromise = context.app.$axios.get(`/api/Annotation/entities`)
    const documentTypesPromise = context.app.$axios.get(`/api/Annotation/documentTypes`)
    const annotationTypesPromise = context.app.$axios.get(`/api/Annotation/annotationTypes`)
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
.master {
  width: 100%;
}
</style>
