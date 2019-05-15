<template>
  <div class="search">
    <wl-search />
  </div>
</template>

<script>
import WlSearch from '~/components/search/WlSearch.vue'
import {mapMutations} from 'vuex'

export default {
  components: {
    WlSearch
  },
  fetch({store, params, query}) {
    return store.dispatch('search/loadFilterData')
  },
  beforeRouteLeave (to, from, next) {
    this.clear()
    next()
  },
  methods: {
    ...mapMutations('search', [
      'clear'
    ])
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
