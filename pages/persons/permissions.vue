<template>
  <div>
    <h1>{{ $t( "persons.permissions.module-name" ) }}</h1>
    <div>
      <nuxt-link :to="localePath({ name: 'persons-permissions-new' })">New</nuxt-link>
    </div>

    <master-detail-layout>
      <li
        v-for="user in users"
        :key="user.id">
        <nuxt-link :to="localePath({ name: 'persons-permissions-id', params: { id: user.id} })">
          <div>{{ user.name }}</div>
        </nuxt-link>
      </li>
      
      <div slot="details">
        <nuxt-child />
      </div>
    </master-detail-layout>
  </div>
</template>

<script>
import MasterDetailLayout from '~/components/MasterDetailLayout.vue'
import {mapGetters, mapActions} from 'vuex'

export default {
  head() {
    return {
      title: this.$t('persons.permissions.module-name')
    }
  }
  , components: {
    MasterDetailLayout
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
  , fetch({store, params}) {
    return store.dispatch('persons/permissions/loadData')
  }
}
</script>
