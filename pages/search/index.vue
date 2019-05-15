<template>
  <div class="search">
    <wl-search />
  </div>
</template>

<script>
import WlSearch from '~/components/search/WlSearch.vue'

export default {
  components: {
    WlSearch
  },
  fetch({store, params, query}) {
    return store.dispatch('search/loadFilterData')
  }
}
</script>

<style>
.search {
  width: 100%;
  padding-top: calc(25px + 4.5vh);
  height: 100%;
  position: relative;
}
</style>
