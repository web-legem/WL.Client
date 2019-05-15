<template>
  <wl-master-detail-layout :has-detail="true">
    <template slot="master">
      <wl-table-filters
        slot="master"
        class="wl-search-filters"
      />
    </template>
    <div 
      id="details"
      slot="details" 
      class="details"
    >
      <wl-documents-table />
    </div>
  </wl-master-detail-layout>
</template>

<script>
import WlMasterDetailLayout from '~/components/WlMasterDetailLayout.vue'
import WlTableFilters from '~/components/WlTableFilters.vue'
import WlDocumentsTable from '~/components/doc-management/WlDocumentsTable.vue'
import { mapGetters, mapActions, mapState, mapMutations} from 'vuex'

export default {
  components: {
    WlMasterDetailLayout,
    WlTableFilters,
    WlDocumentsTable,
  },
  nuxtI18n: {
    paths: {
      es: 'documentos-pendientes',
      en: 'pending-documents',
    }
  },
  computed: {
    ...mapGetters('table', {
      results: 'searchResults',
      searching: 'searching',
      showNoResultsPage: 'showNoResultsPage',
      hasResults: 'hasResults',
      hasAnyResults: 'hasAnyResult',
      hasSearchError: 'hasSearchError',
      showInitial: 'showInitial'
    }),
    ...mapState('table', {
      loadingResults: 'loadingResults',
      loadingTotalCount: 'loadingTotalCount',
      error: 'error',
      totalCountError: 'totalCountError',
      searchError: 'searchError',
    })
  },
  watch: {
    '$route'() {
      console.log('watched')
      this.search({...this.$route.query})
    },
  },
  mounted() {
    if(this.hasAnyResults && !this.hasResults) {
      this.navigateTo({...this.$route.query, page: 1})
    }
  },
  methods: {
    ...mapActions('table', {
      search: 'search',
    }),
    ...mapMutations('table', {
      clear: 'clear'
    }),
    navigateTo(query) {
      console.log('navigateTo')
      this.$router.push(this.localePath({ 
        name: removeLangExtension(this.$route.name),
        query
      }))
    }
  },
  fetch({store, params, query}) {
    return Promise.all([
      store.dispatch('table/loadFilterData'),
      store.dispatch('table/search', { ...query })
    ])
  }
}
</script>

<style lang="scss" scoped>
.wl-search-filters {
  margin: calc(1em + .5vw);
}
</style>
