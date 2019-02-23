<template>
  <div class="busqueda_id">
    <wl-master-detail-layout
      :has-detail="true"
    >
      <wl-document-info
        slot="master"
        class="master"
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
