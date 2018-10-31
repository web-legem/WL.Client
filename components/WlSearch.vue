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
          <wl-search-bar />
          <wl-order-controls
            class="wl-order-controls"
          />
          <div class="pager-content">
            <wl-page-controls
              :page="page"
              @previous="previous"
              @next="next"
              @go-to-page="loadPage($event)"
            />
            Content
            <wl-page-controls
              :page="page"
              @previous="previous"
              @next="next"
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
      page: 1,
    }
  },
  methods: {
    previous(){
      this.page = this.page > 1 ? this.page - 1 : 1
    },
    next(){
      this.page++
    },
    loadPage(number){
      this.page = number > 0 ? number : 1
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
