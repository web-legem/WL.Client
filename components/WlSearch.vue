<template>
  <div class="wl-search">
    <wl-master-detail-layout
      :has-detail="true"
    >
      <wl-search-filters
        slot="master"
        class="wl-search-filters"/>

      <template slot="details">
        <div class="layout">
          <wl-search-bar
            v-model="wordsToSearch"
          />
          <wl-order-controls
            class="wl-order-controls"
          />
          <div class="pager-content">
            <wl-page-controls
              :page="page"
              @go-to-page="loadPage($event)"
            />
            <div>
              <div 
                v-for="document in results"
                :key="document.file.id"
              >
                {{ document.file.issue }}
              </div>
            </div>
            <wl-page-controls
              :page="page"
              @go-to-page="loadPage($event)"
            />
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
    }
  },
  computed: {
    wordsToSearch: {
      get() {
        return decodeURI(this.$route.query.wordsToSearch || '')
      },
      set(wordsToSearch) {
        this.changeParams(this.getQuery(wordsToSearch, 1))
      }
    },
    page: {
      get() {
        return Number.parseInt(this.$route.query.page > 0 ? this.$route.query.page : 1)
      },
      set(value) {
        this.changeParams(this.getQuery(this.wordsToSearch, value))
      }
    }
  },
  watch: {
    '$route'() {
      this.search(this.getQuery(this.wordsToSearch, this.page))
    },
  },
  mounted() {
    this.search(this.getQuery(this.wordsToSearch, this.page))
  },
  methods: {
    loadPage(number){
      this.page = number > 0 ? number : 1
    },
    search(params) {
      this.$axios.get('/api/ClassifiedFile', {
        params: {
          ...params,
          pageSize: 1,
        },
      })
      .then(response => this.results = response.data)
      .catch(console.log)
    },
    changeParams(query) {
      this.$router.push(this.localePath({ 
        name: 'search',
        query: query,
      }))
    },
    getQuery(wordsToSearch, pageNumber) { // TODO - create query using multiple params filters
      var query = { 
        wordsToSearch: encodeURI(wordsToSearch),
        page: pageNumber,
      }
      if(query.wordsToSearch.length == 0){
        delete query.wordsToSearch
      }
      return query;
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
