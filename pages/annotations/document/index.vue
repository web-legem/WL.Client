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
    // let prom = store
    // .dispatch('search/changeUrl', '/api/Annotation/search')
    // .then(() => {
    //   store.dispatch('search/loadFilterData')
    // });
    
    // return Promise.all([
    //   prom
    // ])
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
