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
                <wl-search-result
                  :document="document"
                />
              </div>
            </div>
            <wl-page-controls class="bottom-pager" />
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
import WlSearchResult from '~/components/WlSearchResult.vue'

import {mapActions, mapGetters} from 'vuex'

export default {
  components: {
    WlMasterDetailLayout,
    WlSearchBar,
    WlSearchFilters,
    WlOrderControls,
    WlPageControls,
    WlSearchResult,
  },
  computed: {
    ...mapGetters('search', {
      results: 'searchResults'
    })
  },
  watch: {
    '$route'() {
      this.search({...this.$route.query})
    },
  },
  methods: {
    ...mapActions('search', {
      search: 'search',
    })
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
