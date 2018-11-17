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
    </label>
    <button @click="next">Next</button>
  </div>
</template>

<script>
export default {
  computed: {
    textual() {
      return !this.editable;
    },
    page() {
      return Number.parseInt(this.$route.query.page) || 1
    }
  },
  methods: {
    previous() {
      const previousPage = this.page > 1 ? this.page - 1 : 1
      this.navigateTo(previousPage)
    },
    next() {
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
