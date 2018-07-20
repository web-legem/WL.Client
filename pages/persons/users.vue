<template>
  <div>
    <h1>{{ $t( "persons.users.module-name" ) }}</h1>
    <div>
      <nuxt-link :to="localePath({ name: 'persons-users-new' })">New</nuxt-link>
    </div>

    <master-detail-layout>
      <li v-for="user in users" :key="user.id">
        <nuxt-link :to="localePath({ name: 'persons-users-id', params: { id: user.id} })">
          <div>{{ user.name }}</div>
        </nuxt-link>
      </li>
      
      <div slot="details">
        <nuxt-child></nuxt-child>
      </div>
    </master-detail-layout>
  </div>
</template>

<script>
import MasterDetailLayout from '~/components/master-detail-layout.vue'
import {mapGetters, mapActions} from 'vuex'

export default {
  head() {
    return {
      title: this.$t('persons.users.module-name')
    }
  }
  , components: {
    MasterDetailLayout
  }
  , computed: {
    ...mapGetters('persons/users', {
      users: 'users'
    })
  }
  , methods: {
    ...mapActions('persons/users', {
      loadData: 'loadData'
    })
  }
  , fetch({store, params}) {
    return store.dispatch('persons/users/loadData')
  }
}
</script>
