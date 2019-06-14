<template>
  <div class="source-document-index">
    <wl-search route-name="annotations-document-id" />
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
    store.commit('search/clear')
    store.commit('search/changeUrl', '/api/Annotation/search')
    return Promise.all([
      store.dispatch('search/loadFilterData'),
    ])
  },
  beforeRouteLeave (to, from, next) {
    this.clear()
    next()
  },
  methods: {
    ...mapMutations('search', {
      clear: 'clear'
    }),
  }
}
</script>

<style>
.source-document-index {
  height: 100%;
}
</style>
