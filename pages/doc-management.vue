<template>
  <wl-module-layout>
    <template slot="tabs">
      <wl-tab
        :to="localePath({ name: 'doc-management-upload-document' })"
        icon="ico-files-o"
      >
        Carga de Documentos
      </wl-tab>
      <wl-tab
        :to="localePath({ name: 'doc-management-classify-document' })"
        icon="ico-files-o"
      >
        Clasificar Documento
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
