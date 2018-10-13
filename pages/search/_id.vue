<template>
  <div class="div">
    <wl-pdf-viewer 
      :file-id="id"
    />
  </div>
</template>

<script>
import WlPdfViewer from '~/components/WlPdfViewer.vue'

export default {
  components: {
    WlPdfViewer
  }
  , data() {
    return {
      id: this.$route.params.id
    }
  }
}
</script>

<style>
.div {
  padding-top: calc(25px + 4.5vh);
  width: 100%;
  height: 100%;
}
</style>
