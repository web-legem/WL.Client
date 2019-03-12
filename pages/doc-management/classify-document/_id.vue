<template>
  <div class="classify-document-id">
    <wl-master-detail-layout>
      <template 
        slot="master"
      >
        <wl-classification-form
          :entities="entities"
          :document-types="documentTypes"
        />
      </template>

      <template slot="details">
        <wl-pdf-viewer :file-id="id" />
      </template>
    </wl-master-detail-layout>

    <!-- <h1>
      {{ $t('doc-management.classify-doc.h-classify-doc') }}
    </h1>
    <p v-if="isAlreadyClassified">
      {{ $t('doc-management.classify-doc.p-ya-classify-doc') }}      
    </p>
    <p v-if="!isAlreadyClassified">
      {{ $t('doc-management.classify-doc.p-no-classify-doc') }}      
    </p>
    -->
  </div>
</template>

<script>
import WlMasterDetailLayout from '~/components/WlMasterDetailLayout.vue'
import WlPdfViewer from '~/components/WlPdfViewer.vue'
import WlClassificationForm from '~/components/doc-management/WlClassificationForm.vue'

export default {
  components: {
    WlMasterDetailLayout,
    WlPdfViewer,
    WlClassificationForm,
  },
  computed: {
    id() {
      return this.$route.params.id
    },
  },
  asyncData(context) {
    return Promise.all([
      context.app.$axios.get('/api/Entity')
      , context.app.$axios.get('/api/DocumentType')
    ]).then(results => ({
      entities: results[0].data
      , documentTypes: results[1].data
    }))
  },
}
</script>

<style lang="scss" scoped>
.classify-document-id {
  height: 100%;
}

.master {
  margin: 0;
  padding: 0;
}
</style>
