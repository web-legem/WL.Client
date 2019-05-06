<template>
  <div class="source_id">
    <wl-master-detail-layout>
      <div 
        slot="master" 
        class="overflow"
      >
        <nuxt-child />
      </div>

      <template slot="details">
        <wl-pdf-viewer :file-id="id" />
      </template>
    </wl-master-detail-layout>
  </div>
</template>

<script>
import WlMasterDetailLayout from '~/components/WlMasterDetailLayout.vue'
import WlPdfViewer from '~/components/WlPdfViewer.vue'

export default {
  components: {
    WlMasterDetailLayout,
    WlPdfViewer,
  },
  data() {
    return {
      message: 'Source Found',
      isDocumentOpen: false,
      id: this.$route.params.id
    }
  },
  computed: {
    iconViewDocument() {
      return this.isDocumentOpen
        ? 'ico2-eye-blocked'
        : 'ico2-eye'
    },
  },
  methods: {
    toggleDocument() {
      this.isDocumentOpen = !this.isDocumentOpen
    }
  }
}
</script>

<style lang="scss" scoped>
.source_id {
  height: 100%;
}

.content {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.title {
  font-size: 1.4rem;
  color: #00796b;
  padding: .5em;
  box-shadow: 0 0 8px 2px grey;
  z-index: 1;
}

.annotation-suggestions {
  flex-grow: 1;
}

.overflow {
  overflow-y: auto;
}
</style>