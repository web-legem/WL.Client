<template>
  <div class="search">
    <wl-search />
  </div>
</template>

<script>
import WlSearch from '~/components/WlSearch.vue'

export default {
  components: {
    WlSearch
  },
  fetch({store, params, query}) {
    return Promise.all([
      store.dispatch('search/loadFilterData'),
      store.dispatch('search/search',{ ...query })
    ])
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
