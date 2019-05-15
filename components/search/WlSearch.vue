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

    
          <wl-error-message
            v-if="showInitial"
            icon="escudo-udenar"
          >
            <div 
              class="instructions"
            >
              {{ $t('search.co-search.instructions') }}
            </div>
          </wl-error-message>
          <div
            v-else-if="hasResults"
            class="pager-content"
          >
            <div>
              <div 
                v-for="(document, index) in results"
                :key="document.documentId"
              >
                <wl-search-result
                  :document="document"
                  :route-name="routeName"
                  :index="index"
                >
                  <slot :document="document" />
                </wl-search-result>
              </div>
            </div>
            <wl-page-controls class="bottom-pager" />
          </div>

          <wl-error-message
            v-else-if="searching"
            icon="ico-cloud"
          >
            {{ $t('search.co-search.search') }}
          </wl-error-message>
          <wl-error-message 
            v-else-if="showNoResultsPage"
            icon="ico-frown-o"
          >
            {{ $t('search.co-search.not-found') }}
          </wl-error-message>
          <wl-error-message 
            v-else
            icon="ico-cloud"
          >
            {{ $t('search.co-search.network-error') }}
          </wl-error-message>
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
import WlErrorMessage from '~/components/WlErrorMessage.vue'
import {removeLangExtension} from '~/helpers/routeManipulation'

import {mapActions, mapGetters, mapState, mapMutations} from 'vuex'

export default {
  components: {
    WlMasterDetailLayout,
    WlSearchBar,
    WlSearchFilters,
    WlOrderControls,
    WlPageControls,
    WlSearchResult,
    WlErrorMessage,
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
      showInitial: 'showInitial'
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
      console.log('watched')
      this.search({...this.$route.query})
    },
  },
  mounted() {
    if(this.hasAnyResults && !this.hasResults) {
      console.log('search init')
      this.navigateTo({...this.$route.query, page: 1})
    }
  },
  methods: {
    ...mapActions('search', {
      search: 'search',
    }),
    navigateTo(query) {
      console.log('navigateTo')
      this.$router.push(this.localePath({ 
        name: removeLangExtension(this.$route.name),
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
  display: flex;
  flex-direction: column;
  margin: calc(1em + .5vw);
  flex-grow: 1;
  overflow-y: auto;
}

.pager-content {
  flex-grow: 1;
  margin-top: 4px;
  padding-top: 16px;
  overflow-y: auto;
}

.bottom-pager {
  margin-top: 8px;
  margin-bottom: 16px;
}

.container {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
}

.error-message {
  background: transparent;
  color: grey;
  border: 2px dashed grey;
  width: 70%;
  height: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.ico {
  display: block;
  font-size: 8rem;
  margin-bottom: -16px;
}

.content {
  font-size: 1.5rem;
}

.instructions {
  margin-top: .4em;
  padding: .4em .1em;
  max-width: 400px;
  text-align: center;
}
</style>
