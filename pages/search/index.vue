<template>
  <div class="search">
    <wl-search
      :entities="entities"
      :document-types="documentTypes"
    />
  </div>
</template>

<script>
import WlSearch from '~/components/WlSearch.vue'

export default {
  components: {
    WlSearch
  },
  asyncData({app}){
    return Promise.all([
      app.$axios.get('/api/Entity'),
      app.$axios.get('/api/DocumentType')
    ]).then(result => ({
      entities: result[0].data,
      documentTypes: result[1].data
    }))
  }
}
</script>

<style>
.search {
  width: 100%;
  padding-top: calc(25px + 4.5vh);
  height: calc(95.5vh - 25px);
  position: relative;
}
</style>
