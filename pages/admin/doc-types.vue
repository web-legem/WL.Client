<template>
  <wl-master-detail-layout :has-detail="false">
    <wl-filtered-list slot="master">
      <li
        v-for="documentType in documentTypes" 
        :key="documentType.id">
        <wl-list-item
          :to="localePath({name: 'admin-doc-types-id', params: {id: documentType.id }})">
          {{ documentType.name }}
        </wl-list-item>
      </li>
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
  , data() {
    return {
      documentTypes: [
        { id: 1, name: 'Carta' }
        , { id: 2, name: 'Circular'}
        , { id: 3, name: 'Estatuto'}
        , { id: 4, name: 'Resolución'}
        , { id: 5, name: 'Circular'}
        , { id: 6, name: 'Circular'}
        , { id: 7, name: 'Circular'}
        , { id: 8, name: 'Circular'}
        , { id: 9, name: 'Circular'}
        , { id: 10, name: 'Circular'}
        , { id: 11, name: 'Circular'}
        , { id: 12, name: 'Circular'}
        , { id: 13, name: 'Circular'}
        , { id: 14, name: 'Circular'}
        , { id: 15, name: 'Circular'}
        , { id: 16, name: 'Estatuto'}
        , { id: 17, name: 'Resolución'}
        , { id: 18, name: 'Estatuto'}
        , { id: 19, name: 'Resolución'}
        , { id: 21, name: 'Estatuto'}
        , { id: 22, name: 'Resolución'}
        , { id: 23, name: 'Estatuto'}
        , { id: 24, name: 'Resolución'}
        , { id: 25, name: 'Estatuto'}
        , { id: 26, name: 'Resolución'}
        , { id: 27, name: 'Estatuto'}
        , { id: 28, name: 'Resolución'}
        , { id: 29, name: 'Estatuto'}
      ]
    }
  }
  , computed: {
    ...mapGetters('admin/document-types', {
      documentTypes: 'docTypes'
    })
  }
  , methods: {
    ...mapActions('admin/document-types', [
      'loadData'
    ])
  }
  // , fetch({
  //   store
  //   , params
  // }) {
  //   return store.dispatch('admin/document-types/loadData')
  // }
}
</script>

<style>
</style>
