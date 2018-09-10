<template>
  <wl-master-detail-layout :has-detail="isSelected || isCreating">
    <wl-filtered-list
      slot="master"
      @add="create"
    >
      <wl-list-item
        v-for="documentType in documentTypes" 
        :key="documentType.id"
        :to="localePath({ name: 'admin-doc-types-id',
                          params: { id: documentType.id }})"
        @click.native="activateRoute(documentType.id)"
      >
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
  , nuxtI18n: {
    paths: {
      es: 'tipos-documento'
      , en: 'document-types'
    }
  }
  , components: {
    WlMasterDetailLayout
    , WlListItem
    , WlFilteredList
  }
  , computed: {
    ...mapGetters('admin/document-types', {
      documentTypes: 'list'
      , selected: 'selected'
      , isSelected: 'isSelected'
      , isCreating: 'isCreating'
    })
  }
  , methods: {
    activateRoute(actualIdSelected) {
      if(this.isSelected && actualIdSelected == this.selected.id) {
        this.$router.push( this.localePath({ name: 'admin-doc-types' }))
      }
    }
    , create() {
      this.$router.push( this.localePath({ name: 'admin-doc-types-new' }) )
    }
  }
  , fetch({ store, params }) {
    return store.dispatch('admin/document-types/loadData')
  }
}
</script>