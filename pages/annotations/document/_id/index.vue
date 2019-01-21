<template>
  <div class="source_id">
    <wl-master-detail-layout>
      <template slot="master">
        <wl-document-annotations />
      </template>

      <template slot="details">
        <wl-superimpose-layout>
          <template slot="normal">
            <div>Details</div>
          </template>
          <template slot="superimposed">
            <div>Superimposed</div>
          </template>
        </wl-superimpose-layout>
      </template>
    </wl-master-detail-layout>
  </div>
</template>

<script>
import WlMasterDetailLayout from '~/components/WlMasterDetailLayout.vue'
import WlDocumentAnnotations from '~/components/annotations/WlDocumentAnnotations.vue'
import WlSuperimposeLayout from '~/components/WlSuperimposeLayout.vue'

export default {
  components: {
    WlMasterDetailLayout,
    WlDocumentAnnotations,
    WlSuperimposeLayout,
  },
  data() {
    return {
      message: 'Source Found',
    }
  },
}
</script>

<style lang="scss" scoped>
.source_id {
  height: 100%;
}
</style>