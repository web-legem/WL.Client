<template>
  <div class="wl-page-controls">
    <button @click="previous">Previous</button>
    <label
      for="page"
      class="page-label">
      Page: 
      <input 
        v-if="false"
        id="page"
        :value="page"
        type="number" 
        name="page"
      >
      <span v-if="true">
        {{ page }}
      </span>
      / {{ numberOfPages }}
    </label>
    <button @click="next">Next</button>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  computed: {
    textual() {
      return !this.editable;
    },
    page() {
      return Number.parseInt(this.$route.query.page) || 1
    },
    ...mapGetters('search', {
      totalCount: 'totalCount',
      loadingTotalCount: 'loadingTotalCount'
    }),
    numberOfPages() {
      return Math.ceil(this.totalCount / (this.$route.query.pageSize || 2)) // TODO - update default page size
    }
  },
  methods: {
    previous() {
      const previousPage = this.page > 1 ? this.page - 1 : 1
      this.navigateTo(previousPage)
    },
    next() {
      if(this.page == this.numberOfPages || this.loadingTotalCount)
        return
      const nextPage = this.page + 1
      this.navigateTo(nextPage)
    },
    navigateTo(page) {
      this.$emit('go-to-page', page)
      this.$router.push(this.localePath({
        name: 'search',
        query: {
          ...this.$route.query,
          page
        }
      }))
    }
  },
}
</script>

<style lang="scss" scoped>
.wl-page-controls {
  overflow-y: auto;
  display: flex;
  justify-content: center;
  padding: 0 16px;
}

.page-label {
  margin: 0 16px;
}
</style>
