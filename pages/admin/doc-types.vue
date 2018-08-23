<template>
  <wl-master-detail-layout :has-detail="isADocTypeSelected">
    <wl-filtered-list slot="master">
      <wl-list-item
        v-for="documentType in documentTypes" 
        :key="documentType.id"
        :to="localePath({name: 'admin-doc-types-id', params: {id: documentType.id }})">
        {{ documentType.name }}
      </wl-list-item>
    </wl-filtered-list>

    <template slot="details">
      <nuxt-child />
    </template>
  </wl-master-detail-layout>
</template>

<script>
import WlMasterDetailLayout from '~/components/WlMasterDetailLayout.vue'
import WlListItem from '~/components/WlListItem.vue'
import WlFilteredList from '~/components/WlFilteredList.vue'
import {
  mapActions
  , mapGetters
} from 'vuex'

export default {
  head() {
    return {
      title: this.$t('admin.doc-types.module-name')
    }
  }
  , components: {
    WlMasterDetailLayout
    , WlListItem
    , WlFilteredList
  }
  , computed: {
    ...mapGetters('admin/document-types', {
      documentTypes: 'docTypes'
      , isADocTypeSelected: 'isADocTypeSelected'
    })
  }
  , methods: {
    ...mapActions('admin/document-types', [
      'loadData'
    ])
  }
  , fetch({
    store
    , params
  }) {
    return store.dispatch('admin/document-types/loadData')
  }
}
</script>

<style>
</style>
