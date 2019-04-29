<template>
  <wl-document-annotations class="document-annotations">
    <!-- <button
      slot="controls"
      class="icon"
      focusable
      :class="[iconViewDocument]"
      @click="toggleDocument"
    /> -->
  </wl-document-annotations> 
</template>

<script>
import WlDocumentAnnotations from '~/components/annotations/WlDocumentAnnotations.vue'

export default {
  components: {
    WlDocumentAnnotations
  },
}
</script>

<style>

</style>