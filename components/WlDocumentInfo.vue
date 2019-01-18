<template>
  <div class="wl-document-info">
    <wl-document-controls />
    <div class="annotation-list">
      <h2 class="component-title">
        Anotaciones del documento
      </h2>
      <wl-annotation-list />
    </div>
  </div>
</template>

<script>
import WlDocumentControls from '~/components/WlDocumentControls.vue'
import WlAnnotationList from '~/components/WlAnnotationList.vue'

export default {
  components: {
    WlDocumentControls,
    WlAnnotationList,
  },
}
</script>

<style scoped>
.wl-document-info {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

.component-title {
  padding: 16px;
  border-bottom: 1px solid grey;
}

.annotation-list {
  display: flex;
  flex-direction: column;
  overflow-y: auto;

}
</style>
