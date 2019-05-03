<template>
  <wl-master-detail-layout :has-detail="false">
    <div
      slot="master"
      class="overflowed-area"
    >
      <wl-classification-form
        :entities="entities" 
        :document-types="documentTypes"
        @fileurl="showPdf($event)"
      />
    </div>

    <div
      slot="details"
      class="pdf-viewer"
    >
      <wl-neutral-pdf-viewer
        class="pdf-viewer"
        :url="fileUrl"
      >
        <wl-error-message 
          icon="ico-file-pdf-o"
        >
          No has seleccionado ningun archivo.
        </wl-error-message>
      </wl-neutral-pdf-viewer>
    </div>
  </wl-master-detail-layout>
</template>

<script>
import WlMasterDetailLayout from '~/components/WlMasterDetailLayout.vue'
import WlNeutralPdfViewer from '~/components/WlNeutralPdfViewer.vue'
import WlClassificationForm from '~/components/doc-management/WlClassificationForm.vue'
import WlErrorMessage from '~/components/WlErrorMessage.vue'

export default {
  components: {
    WlMasterDetailLayout,
    WlNeutralPdfViewer,
    WlClassificationForm,
    WlErrorMessage,
  },
  nuxtI18n: {
    paths: {
      es: 'cargar-documento'
      , en: 'upload-document'
    }
  },
  data() {
    return {
      fileUrl: '',
      fileUploaded: true,
    }
  },
  asyncData(context) {
    return Promise.all([
      context.app.$axios.get('/api/Document/entities')
      , context.app.$axios.get('/api/Document/documentTypes')
    ]).then(results => ({
      entities: results[0].data
      , documentTypes: results[1].data
    }))
  },
  methods: {
    showPdf(fileUrl) {
      this.fileUrl = fileUrl
    },
  },
}
</script>

<style scoped lang="scss">
.pdf-viewer {
  height: 100%;
}

.overflowed-area {
  overflow-y: auto;
}
</style>
