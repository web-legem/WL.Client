<template>
  <wl-master-detail-layout :has-detail="true">
    <template slot="master">
      <wl-search-filters
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
import WlSearchFilters from '~/components/search/WlSearchFilters.vue'
import WlDocumentsTable from '~/components/doc-management/WlDocumentsTable.vue'

export default {
  components: {
    WlMasterDetailLayout,
    WlSearchFilters,
    WlDocumentsTable,
  },
  nuxtI18n: {
    paths: {
      es: 'documentos-pendientes',
      en: 'pending-documents',
    }
  },
}
</script>

<style lang="scss" scoped>
.wl-search-filters {
  margin: calc(1em + .5vw);
}
</style>
