<template>
  <module-layout>
    <template slot="tabs">
      <wl-tab
        :to="localePath( {name: 'admin-doc-types'})"
        icon="ico-files-o">
        {{ $t("admin.doc-types.module-name") }}
      </wl-tab> 

      <wl-tab
        :to="localePath({name:'admin-entity-types'})"
        icon="ico-folder-open-o">
        {{ $t('admin.entity-types.module-name') }}
      </wl-tab>

      <wl-tab
        :to="localePath({name: 'admin-entities'})"
        icon="ico2-drawer">
        {{ $t("admin.entities.module-name") }}
      </wl-tab>
      
      <wl-tab
        :to="localePath({name: 'admin-annotation-types'})"
        icon="ico2-bookmark">
        {{ $t("admin.annotation-types.module-name") }}
      </wl-tab> 
    </template>

    <nuxt-child />
    
  </module-layout>
</template>

<script>
import ModuleLayout from '~/components/ModuleLayout.vue'
import WlTab from '~/components/WlTab.vue'

export default {
components: {
  ModuleLayout
  , WlTab
}
}
</script>
