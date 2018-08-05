<template>
  <div>
    <h1>{{ $t("admin.doc-types.module-name") }}</h1>
    <div>
      <nuxt-link :to="localePath({ name: 'admin-doc-types-new' })">New</nuxt-link> &nbsp;
    </div>

    <master-detail-layout>
      <li
        v-for="documentType in documentTypes" 
        :key="documentType.id">
        <nuxt-link :to="localePath({name: 'admin-doc-types-id', params: {id: documentType.id }})">
          <div class="algo">
            {{ documentType.name }}
          </div>
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
  mapActions
  , mapGetters
} from 'vuex'

export default {
  head() {
    return {
      title: this.$t('admin.doc-types.module-name')
    }
  }
  , components: {
    MasterDetailLayout
  }
  , computed: {
    ...mapGetters('admin/document-types', {
      documentTypes: 'docTypes'
    })
  }
  , methods: {
    ...mapActions('admin/document-types', [
      'loadData'
    ])
  }
  // , fetch({
  //   store
  //   , params
  // }) {
  //   return store.dispatch('admin/document-types/loadData')
  // }
}
</script>

<style>
.algo {
  font-family: Arial, Helvetica, sans-serif;
}
</style>
