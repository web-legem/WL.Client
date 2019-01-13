<template>
  <div class="wl-page-controls">
    <wl-button
      :only-icon="true"
      :disable="!hasPrevious"
      title="Previous"
      class="icon"
      data-icon="G"
      @click.native="previous()"
    />
    <label
      for="page"
      class="page-label"
    >
      Page: 
      <input 
        v-if="false"
        id="page"
        :value="page"
        type="number" 
        name="page"
      >
      <span
        v-if="true"
      >
        {{ page }}
        / {{ numberOfPages }}
      </span>
    </label>
    <wl-button
      :only-icon="true"
      :disable="!hasNext"
      title="Next"
      class="icon"
      data-icon="H"
      @click.native="next"
    />
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import WlButton from '~/components/WlButton.vue'
import { removeLangExtension} from '~/helpers/routeManipulation'

export default {
  components: {
    WlButton,
  },
  computed: {
    textual() {
      return !this.editable;
    },
    page() {
      return Number.parseInt(this.$route.query.page) || 1
    },
    hasNext() {
      return (this.page < this.numberOfPages)
    },
    hasPrevious() {
      return (this.page > 1 && this.page <= this.numberOfPages)
    },
    ...mapGetters('search', {
      totalCount: 'totalCount',
      loadingTotalCount: 'loadingTotalCount'
    }),
    numberOfPages() {
      return Math.ceil(this.totalCount / (this.$route.query.pageSize || 1)) // TODO - update default page size
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
        name: removeLangExtension(this.$route.name),
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
  display: block;
  margin: auto 16px;
}

.icon {
  color: white;
}

</style>
