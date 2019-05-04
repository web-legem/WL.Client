<template>
  <wl-master-detail-layout :has-detail="isSelected || isCreating">
    <wl-filtered-list 
      slot="master"
      :list="roles"
      :filter-condition="filter"
      @add="create"
    >
      <template
        slot="list"
        slot-scope="{ filteredList }"
      >
        <wl-list-item 
          v-for="rol in filteredList" 
          :key="rol.id"
          route="persons-permissions-id"
          active-route="persons-permissions"
          :item-id="rol.id"
        >
          {{ rol.name }}
        </wl-list-item>   
      </template>
    </wl-filtered-list>
    <div 
      id="details"
      slot="details"
      class="details"
    >
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
  },
  components: {
    WlMasterDetailLayout,
    WlListItem,
    WlFilteredList,
  },
  nuxtI18n: {
    paths: {es: 'permisos', en: 'permissions'}
  },
  computed: {
    ...mapGetters('persons/permissions', {
      roles: 'list',
      isCreating: 'isCreating',
      isSelected: 'isSelected',
      selected: 'selected',
    }),
    filter() {
      return (filter) => (rol) => 
          filter == null || filter.length < 0
          || rol.name.toLowerCase().search(filter.toLowerCase()) >= 0 
    }
  },
  fetch({ store, params }) {
    return store.dispatch("persons/permissions/loadData")
  },
  methods: {
    create() {
      this.$router.push( this.localePath({name: "persons-permissions-new"}))
    },    
  },
}
</script>

<style lang="scss" scoped>
.details {
  padding: calc(1em + .5vw);
}
</style>