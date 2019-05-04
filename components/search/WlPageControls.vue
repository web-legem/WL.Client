<template>
  <div class="wl-page-controls">
    <wl-button
      :only-icon="true"
      :disable="!hasPrevious"
      :title="$t('search.page-controls.title-previ')"
      data-icon="G"
      ico="ico-arrow-left"
      @click.native="previous()"
    />
    <span
      for="page"
      class="page-label"
    >
      {{ $t('search.page-controls.page') }}     
      <span
        v-if="true"
      >
        {{ page }}
        / {{ numberOfPages }}
      </span>
    </span>
    <wl-button
      :only-icon="true"
      :disable="!hasNext"
      :title="$t('search.page-controls.title-next')"
      data-icon="H"
      ico="ico-arrow-right"
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
  display: flex;
  justify-content: center;
  padding: 0 16px;
}

.page-label {
  margin: 0 16px;
  display: block;
  margin: auto 16px;
  background: transparent;
  color: var(--wl_text);
}

</style>
