<template>
  <wl-master-detail-layout :has-detail="false">
    <li 
      v-for="annotationType in annotationTypes" 
      :key="annotationType.id">
      <wl-list-item
        :to="localePath({ name: 'admin-annotation-types-id', 
                          params: { id: annotationType.id} })">
        {{ annotationType.name }}
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
      title: this.$t('admin.annotation-types.module-name')
    }
  }
  , components: {
    WlMasterDetailLayout
    , WlListItem
  }
  , data() {
    return {
      annotationTypes: [
        { id: 1, name: 'Deroga', root: 'der' }
        , { id: 2, name: 'Modifica', root: 'mod' }
        , { id: 3, name: 'Reglamenta', root: 'reglamen' }
      ]
    }
  }
  , computed: {
    ...mapGetters('admin/annotation-types', {
      annotationTypes: 'annotationTypes'
    })
  }
  // , fetch({store, params}) {
  //   return store.dispatch('admin/annotation-types/loadData')
  // }
}
</script>
