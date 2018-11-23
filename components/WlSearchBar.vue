<template>
  <form
    action="" 
    class="wl-search-bar"
    @submit.prevent
  >
    <input
      ref="input"
      :value="wordsToSearch"
      type="search" 
      class="a_input"
      @search="searchWords($refs.input.value)"
    >
    <wl-button 
      :only-icon="true"
      title="Search"
      ico="ico-search" 
      @click.native="searchWords($refs.input.value)"
    />
  </form>
</template>

<script>
import WlButton from '~/components/WlButton.vue'

export default {
  components: {
    WlButton,
  },
  computed: {
    wordsToSearch() {
      return this.$route.query.wordsToSearch || ''
    },
  },
  methods: {
    searchWords(wordsToSearch) {
      this.navigateWith(this.addOrRemoveWordsToQuery(wordsToSearch))
    },
    addOrRemoveWordsToQuery(wordsToSearch) {
      let query = this.getModifiableQueryParams()

      if(wordsToSearch.length > 0)
        query.wordsToSearch = wordsToSearch
      else 
        delete query.wordsToSearch

      return query
    },
    navigateWith(query) {
      this.$router.push(this.localePath({
        name: 'search',
        query
      }))
    },
    getModifiableQueryParams() {
      return { ...this.$route.query, page: 1 }
    },
  }
}
</script>

<style lang="scss" scoped>
.wl-search-bar {
  display: flex;
  flex-direction: row;
}
</style>
