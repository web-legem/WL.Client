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
      if(wordsToSearch.length > 0){
        this.$router.push(
          this.localePath({
            name: 'search',
            query: { ...this.$route.query, wordsToSearch}
          }))
      } else {
        let query = {...this.$route.query}
        delete query.wordsToSearch
        this.$router.push(
          this.localePath({name: 'search', query}))
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.wl-search-bar {
  display: flex;
  flex-direction: row;
}
</style>
