<template>
  <wl-master-detail-layout :has-detail="false">
    <wl-filtered-list slot="master">
      <li
        v-for="entityType in entityTypes"
        :key="entityType.id">
        <wl-list-item :to="localePath({ name: 'admin-entity-types-id', params: {id: entityType.id} })">
          {{ entityType.name }}
        </wl-list-item>
      </li>
    </wl-filtered-list>
    
    <div slot="details">
      <nuxt-child />
    </div>
  </wl-master-detail-layout>
</template>

<script>
import WlMasterDetailLayout from '~/components/WlMasterDetailLayout.vue'
import WlListItem from '~/components/WlListItem.vue'
import WlFilteredList from '~/components/WlFilteredList.vue'
import {mapActions, mapGetters} from 'vuex'

export default {
  head() {
    return {
      title: this.$t('admin.entity-types.module-name')
    }
  }
  , components: {
    WlMasterDetailLayout
    , WlListItem
    , WlFilteredList
  }
  , data() {
    return {
      entityTypes: [
        { id: 1, name: 'Rectoría'}
        , { id: 2, name: 'Facultad'}
        , { id: 3, name: 'Departmanto'}
        , { id: 4, name: 'Programa'}
      ]
    }
  }
  , computed: {
    ...mapGetters('admin/entity-types', {
      entityTypes: 'entityTypes'
    })
  }
  , methods: {
    ...mapActions('admin/entity-types', {
      loadData: 'loadData'
    })
  }
  // , fetch({store, params}) {
  //   return store.dispatch('admin/entity-types/loadData')
  // }
}
</script>
