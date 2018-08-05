<template>
  <div>
    <h1>{{ $t("admin.annotation-types.module-name") }}</h1>
    <div>
      <nuxt-link :to="localePath({ name: 'admin-annotation-types-new' })">
        New
      </nuxt-link>
    </div>

    <master-detail-layout>
      <li 
        v-for="annotationType in annotationTypes" 
        :key="annotationType.id">
        <nuxt-link 
          :to="localePath({ name: 'admin-annotation-types-id', 
                            params: { id: annotationType.id} })">
          <div>{{ annotationType.name }}</div>
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
import {
  mapGetters
  , mapActions
} from 'vuex'

export default {
  head() {
    return {
      title: this.$t("admin.annotation-types.module-name")
    }
  }
  , components: {
    MasterDetailLayout
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
