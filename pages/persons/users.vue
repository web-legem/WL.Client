<template>
  <wl-master-detail-layout :has-detail="isSelected || isCreating">
    <wl-filtered-list 
      slot="master"
      :list="users"
      :filter-condition="filter"
      @add="create"
    >
      <template
        slot="list"
        slot-scope="{ filteredList }"
      >
        <wl-list-item 
          v-for="user in filteredList" 
          :key="user.id"
          route="persons-users-id"
          active-route="persons-users"
          :item-id="user.id"
        >
          {{ user.firstName }} {{ user.lastName }}
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
import { mapGetters, mapActions } from 'vuex'

export default {
  head() {
    return {
      title: this.$t('persons.users.module-name')
    }
  },
  nuxtI18n: {
    paths: {es: 'usuarios',en: 'users' }
  },
  components: {
    WlMasterDetailLayout,
     WlListItem,
    WlFilteredList,
  },
  computed: {
    ...mapGetters('persons/users', {
      users: 'list',
      isCreating: 'isCreating',
      isSelected: 'isSelected',
      selected: 'selected',
    }),
    filter() {
      return (filter) => (user) => 
          filter == null || filter.length < 0
          || user.firstName.toLowerCase().search(filter.toLowerCase()) >= 0 
          || user.lastName.toLowerCase().search(filter.toLowerCase()) >= 0
    }
  },
  fetch({ store, params }) {
    return store.dispatch("persons/users/loadData")
  },
  methods: {
    create() {
      this.$router.push( this.localePath({name: "persons-users-new"}))
    },    
  },
}
</script>

<style lang="scss" scoped>
.details {
  padding: calc(1em + .5vw);
}
</style>
