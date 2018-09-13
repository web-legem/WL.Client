<template>
  <wl-master-detail-layout :has-detail="isSelected || isCreating">
    <wl-filtered-list
      slot="master"
      @add="create"
    >
      <wl-list-item
        v-for="annotationType in annotationTypes" 
        :key="annotationType.id"
        :to="localePath({ name: 'admin-annotation-types-id', 
                          params: { id: annotationType.id} })"
        @click.native="activateRoute(annotationType.id)"
      >
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
  , nuxtI18n: {
    paths: {
      es: 'tipos-anotacion'
      , en: 'annotation-types'
    }
  }
  , components: {
    WlMasterDetailLayout
    , WlListItem
    , WlFilteredList
  }
  , computed: {
    ...mapGetters('admin/annotation-types', {
      annotationTypes: 'list'
      , isCreating: 'isCreating'
      , isSelected: 'isSelected'
      , selected: 'selected'
    })
  }
  , methods: {
    create() {
      this.$router.push( this.localePath({name: 'admin-annotation-types-new'}))
    }
    , activateRoute(actualIdSelected) {
      if(this.isSelected && actualIdSelected == this.selected.id) {
        this.$router.push(this.localePath({name: 'admin-annotation-types'}))
      }
    }
  }
  , fetch({ store, params }) {
    return store.dispatch('admin/annotation-types/loadData')
  }
}
</script>
