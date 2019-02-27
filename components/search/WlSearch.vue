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
          <div
            v-if="hasResults"
            class="pager-content"
          >
            <wl-page-controls />
            <div>
              <div 
                v-for="document in results"
                :key="document.file.id"
              >
                <wl-search-result
                  :document="document"
                  :route-name="routeName"
                >
                  <slot :document="document" />
                </wl-search-result>
              </div>
            </div>
            <wl-page-controls class="bottom-pager" />
          </div>
          <div
            v-if="searching"
            class="errors"
          >
            {{ $t('components.co-search.search') }}
          </div>
          <div
            v-if="showNoResultsPage && !hasSearchError"
          >
            {{ $t('components.co-search.not-found') }}
          </div>
          <div
            v-if="showNoResultsPage && hasSearchError"
          >
            {{ $t('components.co-search.network-error') }}
          </div>
        </div>
      </template>
    </wl-master-detail-layout>
  </div>
</template>

<script>
import WlMasterDetailLayout from '~/components/WlMasterDetailLayout.vue'
import WlSearchBar from '~/components/search/WlSearchBar.vue'
import WlSearchFilters from '~/components/search/WlSearchFilters.vue'
import WlOrderControls from '~/components/search/WlOrderControls.vue'
import WlPageControls from '~/components/search/WlPageControls.vue'
import WlSearchResult from '~/components/search/WlSearchResult.vue'
import {removeLangExtension} from '~/helpers/routeManipulation'

import {mapActions, mapGetters, mapState} from 'vuex'

export default {
  components: {
    WlMasterDetailLayout,
    WlSearchBar,
    WlSearchFilters,
    WlOrderControls,
    WlPageControls,
    WlSearchResult,
  },
  props: {
    routeName: {
      type: String,
      default: 'search-id'
    },
  },
  computed: {
    ...mapGetters('search', {
      results: 'searchResults',
      searching: 'searching',
      showNoResultsPage: 'showNoResultsPage',
      hasResults: 'hasResults',
      hasAnyResults: 'hasAnyResult',
      hasSearchError: 'hasSearchError',
    }),
    ...mapState('search', {
      loadingResults: 'loadingResults',
      loadingTotalCount: 'loadingTotalCount',
      error: 'error',
      totalCountError: 'totalCountError',
      searchError: 'searchError',
    })
  },
  watch: {
    '$route'() {
      this.search({...this.$route.query})
    },
  },
  mounted() {
    if(this.hasAnyResults && !this.hasResults) {
      this.navigateTo({...this.$route.query, page: 1})
    }
  },
  methods: {
    ...mapActions('search', {
      search: 'search',
    }),
    navigateTo(query) {
      this.$router.push(this.localePath({ 
        name: removeLangExtension(this.$oute.name),
        query
      }))
    }
  },
}
</script>

<style lang="scss" scoped>
.wl-search {
  height: 100%;
}

.wl-order-controls {
  margin-top: 8px;
}

.wl-search-filters {
  margin: calc(1em + .5vw);
}

.layout {
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: calc(1em + .5vw);
}

.pager-content {
  flex-grow: 1;
  margin-top: 4px;
  border-top: 1px solid grey;
  padding-top: 16px;
}

.bottom-pager {
  margin-top: 8px;
  margin-bottom: 16px;
}
</style>
