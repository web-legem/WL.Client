<template>
   <div>
       <h1>{{ $t('admin.entity-types.module-name') }}</h1>
       <div>
         <nuxt-link :to="localePath({ name: 'admin-entity-types-new' })">New</nuxt-link>
       </div>

       <master-detail-layout>
         <li v-for="entityType in entityTypes" :key="entityType.id">
           <nuxt-link :to="localePath({ name: 'admin-entity-types-id', params: {id: entityType.id} })">
             <div>{{ entityType.name }}</div>
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
import {mapActions, mapGetters} from 'vuex'

export default {
  head() {
    return {
      title: this.$t('admin.entity-types.module-name')
    }
  }
  , components: {
    MasterDetailLayout
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
  , fetch({store, params}) {
    return store.dispatch('admin/entity-types/loadData')
  }
}
</script>
