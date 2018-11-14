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
            :order-by="orderBy"
            :descend="descend"
            class="wl-order-controls"
            @order="orderBy = $event"
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
      descend: false
    }
  },
  computed: {
    wordsToSearch: {
      get() {
        return decodeURI(this.$route.query.wordsToSearch || '')
      },
      set(wordsToSearch) {
        this.changeParams(this.getQuery(wordsToSearch, 1, this.orderBy, this.descend))
      }
    },
    page: {
      get() {
        return Number.parseInt(this.$route.query.page > 0 ? this.$route.query.page : 1)
      },
      set(value) {
        this.changeParams(this.getQuery(this.wordsToSearch, value, this.orderBy, this.descend))
      }
    },
    orderBy: {
      get() {
        return this.$route.query.orderBy || 'DEFAULT'
      },
      set(value) {
        this.descend = value.descend
        this.changeParams(this.getQuery(this.wordsToSearch, 1, value.orderBy, value.descend))
      }
    }
  },
  watch: {
    '$route'() {
      this.search(this.getQuery(this.wordsToSearch, this.page, this.orderBy, this.descend))
    },
  },
  mounted() {
    this.search(this.getQuery(this.wordsToSearch, this.page, this.orderBy, this.descend))
  },
  methods: {
    loadPage(number){
      this.page = number > 0 ? number : 1
    },
    search(params) {
      this.$axios.get('/api/ClassifiedFile', {
        params: {
          ...params,
          pageSize: 1, // TODO - ajustar el tamaño de pagina a 20 o un numero adecuado, o analizar si debe ser configurable
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
    getQuery(wordsToSearch, pageNumber, orderBy, descend) { // TODO - create query using multiple params filters
      var query = { 
        wordsToSearch: encodeURI(wordsToSearch),
        page: pageNumber,
        orderBy: orderBy,
        descend: descend,
      }
      if(query.wordsToSearch.length == 0){
        delete query.wordsToSearch
      }
      if(query.orderBy === 'DEFAULT') {
        delete query.orderBy
        delete query.descend
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
