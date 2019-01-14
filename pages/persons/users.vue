<template>
  <wl-master-detail-layout>
    <wl-filtered-list slot="master">
      <wl-list-item 
        v-for="user in users" 
        :key="user.id"
        route="persons-users-id"
        active-route="persons-users"
        :item-id="user.id"
      >
        {{ user.name }}
      </wl-list-item>
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
  , nuxtI18n: {
    paths: {
      es: 'usuarios'
      , en: 'users'
    }
  }
  , components: {
    WlMasterDetailLayout
    , WlListItem
    , WlFilteredList
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
    // TODO - reemplazar los usuarios por los usuarios traidos de la base de 
    // datos usando el metodo del store
    // ...mapGetters('persons/users', {
    //   users: 'users'
    // })
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
