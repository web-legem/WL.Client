<template>
  <wl-module-layout>
    <template slot="tabs">
      <wl-tab
        :to="localePath({ name: 'doc-management-upload-document' })"
        icon="ico-files-o"
      >
        {{ $t('doc-management.upload-doc.wl-upload-doc') }}
      </wl-tab>
      <wl-tab
        :to="localePath({ name: 'doc-management-classify-document' })"
        icon="ico-files-o"
      >
        {{ $t('doc-management.classify-doc.h-classify-doc') }}
      </wl-tab>
    </template>

    <nuxt-child />
  </wl-module-layout>
</template>

<script>
import WlModuleLayout from '~/components/WlModuleLayout.vue'
import WlTab from '~/components/WlTab.vue'

export default {
  components: {
    WlModuleLayout
    , WlTab
  }
  , nuxtI18n: {
    paths: {
      es: '/gestion-documental'
      , en: '/document-management'
    }
  }
}
</script>
