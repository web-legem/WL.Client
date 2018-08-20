<template>
  <wl-master-detail-layout>
    <wl-filtered-list slot="master">
      <li
        v-for="permission in permissions"
        :key="permission.id">
        <wl-list-item :to="localePath({ name: 'persons-permissions-id', params: { id: permission.id} })">
          {{ permission.name }}
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
import {mapGetters, mapActions} from 'vuex'

export default {
  head() {
    return {
      title: this.$t('persons.permissions.module-name')
    }
  }
  , components: {
    WlMasterDetailLayout
    , WlListItem
    , WlFilteredList
  }
  , data() {
    return {
      permissions: [
        {id: 1, name: 'Administración'}
        , {id: 2, name: 'Gestión Documental'}
        , {id: 3, name: 'Anotaciones'}
        , {id: 4, name: 'Super Usuario'}
      ]
    }
  }
  , computed: {
    ...mapGetters('persons/permissions', {
      users: 'permissions'
    })
  }
  , methods: {
    ...mapActions('persons/permissions', {
      loadData: 'loadData'
    })
  }
  // , fetch({store, params}) {
  //   return store.dispatch('persons/permissions/loadData')
  // }
}
</script>
