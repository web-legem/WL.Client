<template>
  <div class="busqueda_id">
    <wl-master-detail-layout
      :has-detail="true"
    >
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

      <template slot="details">
        <wl-pdf-viewer :file-id="id" />
      </template>
    </wl-master-detail-layout>
  </div>
</template>

<script>
import WlPdfViewer from '~/components/WlPdfViewer.vue'
import WlMasterDetailLayout from '~/components/WlMasterDetailLayout.vue'
import WlDocumentInfo from '~/components/search/WlDocumentInfo.vue'

export default {
  validate({ params }) {
    return /^\d+$/.test(params.id)
  },
  components: {
    WlMasterDetailLayout,
    WlPdfViewer,
    WlDocumentInfo,
  }
  , data() {
    return {
      id: this.$route.params.id, // TODO - cambiar el id del archivo por el id del documento,
                                // con el id del documento, traer el del archivo para pasarselo a WlPdfViewer
                                // y con el id del documento, traer anotaciones y sugerencias si tiene los permisos
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
.busqueda_id {
  width: 100%;
  padding-top: calc(25px + 4.5vh);
  padding-right: 0;
  height: 100%;
  position: relative;
}

.master {
  margin: 0;
  padding: 0;
}
</style>
