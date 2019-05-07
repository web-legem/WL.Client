<template>
  <div class="source_id">
    <wl-master-detail-layout>
      <div 
        slot="master" 
        class="overflow"
      >
        <wl-edit-document></wl-edit-document>
      </div>

      <template slot="details">
        <wl-pdf-viewer :file-id="id" />
      </template>
    </wl-master-detail-layout>
  </div>
</template>

<script>
import WlEditDocument from '~/components/WlEditDocument.vue'
import WlMasterDetailLayout from '~/components/WlMasterDetailLayout.vue'
import WlPdfViewer from '~/components/WlPdfViewer.vue'

export default {
  components: {
    WlEditDocument,
    WlPdfViewer,
    WlMasterDetailLayout,
  },
  computed: {
    id() {
      return this.$route.params.id
    }
  }
}
</script>

<style lang="scss" scoped>
.source_id {
  height: 100%;
}

</style>
