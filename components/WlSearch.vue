<template>
  <div class="wl-search">
    <wl-master-detail-layout
      :has-detail="true"
    >
      <wl-search-filters
        slot="master"
        class="wl-search-filters"
      />

      <template slot="details">
        <div class="layout">
          <wl-search-bar />
          <wl-order-controls
            class="wl-order-controls"
          />
          <div class="pager-content">
            <wl-page-controls />
            <div>
              <div 
                v-for="document in results"
                :key="document.file.id"
              >
                {{ document.file.issue }}
              </div>
            </div>
            <wl-page-controls />
          </div>
        </div>
      </template>
    </wl-master-detail-layout>
  </div>
</template>

<script>
import WlMasterDetailLayout from '~/components/WlMasterDetailLayout.vue'
import WlSearchBar from '~/components/WlSearchBar.vue'
import WlSearchFilters from '~/components/WlSearchFilters.vue'
import WlOrderControls from '~/components/WlOrderControls.vue'
import WlPageControls from '~/components/WlPageControls.vue'

export default {
  components: {
    WlMasterDetailLayout,
    WlSearchBar,
    WlSearchFilters,
    WlOrderControls,
    WlPageControls,
  },
  data() {
    return {
      results: [],
      descend: false
    }
  },
  watch: {
    '$route'() {
      this.search()
    },
  },
  mounted() {
    this.search()
  },
  methods: {
    loadPage(number){
      this.page = number > 0 ? number : 1
    },
    search() {
      let query = { ...this.$route.query }
      this.$axios.get('/api/ClassifiedFile', {
        params: {
          ...query,
          pageSize: 2, // TODO - ajustar el tamaño de pagina a 20 o un numero adecuado, o analizar si debe ser configurable
        },
      })
      .then(response => this.results = response.data)
      .catch(console.log)
    },
  },
}
</script>

<style lang="scss" scoped>
.wl-order-controls {
  margin-top: 8px;
}

.layout {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.pager-content {
  background: gray;
  flex-grow: 1;
  margin-top: 8px;
}
</style>
