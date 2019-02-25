<template>
  <div class="source_id">
    <wl-master-detail-layout>
      <template slot="master">
        <wl-document-annotations class="document-annotations">
          <button
            slot="controls"
            class="icon"
            focusable
            :class="[iconViewDocument]"
            @click="toggleDocument"
          />
        </wl-document-annotations>
      </template>

      <template slot="details">
        <wl-superimpose-layout :open="isDocumentOpen">
          <template slot="normal">
            <div class="content">
              <h1 class="title">
                Sugerencias de Anotaciones
              </h1>
              <wl-annotation-suggestions class="annotation-suggestions" />
            </div>
          </template>
          <template slot="superimposed">
            <wl-pdf-viewer :file-id="1" />
          </template>
        </wl-superimpose-layout>
      </template>
    </wl-master-detail-layout>
  </div>
</template>

<script>
import WlMasterDetailLayout from '~/components/WlMasterDetailLayout.vue'
import WlDocumentAnnotations from '~/components/annotations/WlDocumentAnnotations.vue'
import WlAnnotationSuggestions from '~/components/annotations/WlAnnotationSuggestions.vue'
import WlSuperimposeLayout from '~/components/WlSuperimposeLayout.vue'
import WlPdfViewer from '~/components/WlPdfViewer.vue'

export default {
  components: {
    WlMasterDetailLayout,
    WlDocumentAnnotations,
    WlSuperimposeLayout,
    WlAnnotationSuggestions,
    WlPdfViewer,
  },
  data() {
    return {
      message: 'Source Found',
      isDocumentOpen: false,
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
</style>