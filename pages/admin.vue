<template>
<module-layout>
  <template slot="tabs">
    <wl-tab :to="localePath( {name: 'admin-doc-types'})">
      {{ $t("admin.doc-types.module-name") }}
    </wl-tab> &nbsp;
    <wl-tab :to="localePath({name: 'admin-annotation-types'})">
      {{ $t("admin.annotation-types.module-name") }}
    </wl-tab> &nbsp;
    <wl-tab :to="localePath({name:'admin-entity-types'})">
      {{ $t('admin.entity-types.module-name') }}
    </wl-tab> &nbsp;
    <wl-tab :to="localePath({name: 'admin-entities'})">
      {{ $t("admin.entities.module-name") }}
    </wl-tab>
  </template>
  <nuxt-child></nuxt-child>
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
