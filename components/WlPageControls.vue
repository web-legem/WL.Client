<template>
  <div class="wl-page-controls">
    <button @click="previous">Previous</button>
    <label
      for="page"
      class="page-label">
      Page: 
      <input 
        v-if="editable"
        id="page"
        v-model="pageNumber"
        type="number" 
        name="page"
      >
      <span v-if="textual">
        {{ pageNumber }}
      </span>
    </label>
    <button @click="next">Next</button>
  </div>
</template>

<script>
export default {
  props: {
    page: {
      type: Number,
      default: 1,
    },
    editable: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    textual() {
      return !this.editable;
    },
    pageNumber: {
      get() {
        return this.page
      },
      set(value) {
        this.$emit('go-to-page', value)
      },
    },
  },
  methods: {
    previous() {
      this.$emit('previous')
    },
    next() {
      this.$emit('next')
    },
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
