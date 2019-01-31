<template>
  <wl-master-detail-layout :has-detail="isSelected || isCreating">
    <wl-filtered-list 
      slot="master"
      @add="create"
    >
      <wl-list-item 
        v-for="user in users" 
        :key="user.id"
        route="persons-users-id"
        active-route="persons-users"
        :item-id="user.id"
        class="list-link"
      >
        {{ user.name }}
      </wl-list-item>
    </wl-filtered-list>

    <div 
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
    paths: {
      es: 'usuarios',
      en: 'users',
    }
  },
  components: {
    WlMasterDetailLayout,
    WlListItem,
    WlFilteredList,
  },
  data() {
    return {
    //   users: [ 
    //     {id: 1, name: 'Mario Flórez'},
    //     {id: 2, name: 'Felipe Delgado'},
    //     {id: 3, name: 'Homero Simpson'},
    //     {id: 4, name: 'Bart Simpson'},
    //   ]
    }
  },
  computed: {
    // TODO - reemplazar los usuarios por los usuarios traidos de la base de 
    // datos usando el metodo del store
    ...mapGetters('persons/users', {
      // users2: 'list',
      users: 'list',
      isCreating: 'isCreating',
      isSelected: 'isSelected',
      selected: 'selected',
    })
  },
  methods: {
    create() {
      this.$router.push( this.localePath({name: 'persons-users-new'}))
    },    
  },
  fetch({ store, params }) {
      return store.dispatch('persons/users/loadData')
  },
}
</script>

<style lang="scss" scoped>
.details {
  padding: calc(1em + .5vw);
}
</style>
