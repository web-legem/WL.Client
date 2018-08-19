<template>
  <wl-master-detail-layout>
    <li 
      v-for="user in users" 
      :key="user.id">
      <wl-list-item :to="localePath({ name: 'persons-users-id', params: { id: user.id} })">
        {{ user.name }}
      </wl-list-item>
    </li>

    <div slot="details">
      <nuxt-child />
    </div>
  </wl-master-detail-layout>
</template>

<script>
import WlMasterDetailLayout from '~/components/WlMasterDetailLayout.vue'
import WlListItem from '~/components/WlListItem.vue'
import {
  mapGetters
  , mapActions
} from 'vuex'

export default {
  head() {
    return {
      title: this.$t('persons.users.module-name')
    }
  }
  , components: {
    WlMasterDetailLayout
    , WlListItem
  }
  , data() {
    return {
      users: [ 
        {id: 1, name: 'Mario Flórez'}
        , {id: 2, name: 'Felipe Delgado'}
        , {id: 3, name: 'Homero Simpson'}
        , {id: 4, name: 'Bart Simpson'}
      ]
    }
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
  // , fetch({
  //   store
  //   , params
  // }) {
  //   return store.dispatch('persons/users/loadData')
  // }
}
</script>
