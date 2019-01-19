<template>
  <div class="source-document-index">
    <wl-search route-name="annotations-source-document-id" />
  </div>
</template>

<script>
import WlSearch from '~/components/search/WlSearch.vue'

export default {
  components: {
    WlSearch
  },
}
</script>

<style>
.source-document-index {
  height: 100%;
}
</style>
