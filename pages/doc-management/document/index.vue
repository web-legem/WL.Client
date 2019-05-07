<template>
    <wl-search route-name="doc-management-document-id" />
</template>

<script>
import WlSearch from '~/components/search/WlSearch.vue'
import { mapMutations } from 'vuex'

export default {
  components: {
    WlSearch,
  },
  fetch({store, params, query}) {
    return Promise.all([
      store.dispatch('search/loadFilterData'),
      store.dispatch('search/search',{ ...query })
    ])
  },
  beforeDestroy() {
    this.clear()
  },
  methods: {
    ...mapMutations('search', [
      'clear'
    ])
  }
}
</script>

<style>

</style>
