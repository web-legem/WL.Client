<template>
    <div>
        <h1>{{ $t("admin.doc-types.module-name") }}</h1>
        <div>
            <nuxt-link :to="{ name: 'admin-doc-types-new' }">New</nuxt-link> &nbsp;
            <nuxt-link :to="{ name: 'admin-doc-types-id', params: { id: 1 } }">Edit</nuxt-link>
        </div>

        <master-detail-layout>
            <li><h2>This is the doc-type</h2></li>
            <div slot="details">
                <nuxt-child></nuxt-child>
            </div>
        </master-detail-layout>
    </div>
</template>

<script>
import MasterDetailLayout from '~/components/master-detail-layout.vue'

export default {
  head() {
      return {
          title: this.$t('admin.doc-types.module-name')
      }
  },
  components: {
      MasterDetailLayout
  }
}
</script>