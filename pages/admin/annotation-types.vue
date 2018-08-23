<template>
  <wl-master-detail-layout :has-detail="isSelected">
    <wl-filtered-list slot="master">
      <wl-list-item
        v-for="annotationType in annotationTypes" 
        :key="annotationType.id"
        :to="localePath({ name: 'admin-annotation-types-id', 
                          params: { id: annotationType.id} })">
        {{ annotationType.name }}
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
      title: this.$t('admin.annotation-types.module-name')
    }
  }
  , components: {
    WlMasterDetailLayout
    , WlListItem
    , WlFilteredList
  }
  , computed: {
    ...mapGetters('admin/annotation-types', {
      annotationTypes: 'annotationTypes'
      , isSelected: 'isSelected'
    })
  }
  , methods: {
    ...mapActions('admin/annotation-types', [
      'loadData'
    ])
  }
  , fetch({ store, params }) {
    return store.dispatch('admin/annotation-types/loadData')
  }
}
</script>
