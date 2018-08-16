<template>
  <module-layout>
    <template slot="tabs">
      <wl-tab
        :to="localePath({ name: 'persons-users' })"
        icon="ico-files-o">
        {{ $t( 'persons.users.module-name' ) }}
      </wl-tab>

      <wl-tab
        :to="localePath({ name: 'persons-permissions' })"
        icon="ico-folder-open-o">
        {{ $t('persons.permissions.module-name') }}
      </wl-tab>
    </template>

    <nuxt-child />
    
  </module-layout>
</template>

<script>
import ModuleLayout from "~/components/ModuleLayout.vue";
import WlTab from "~/components/WlTab.vue";

export default {
  components: {
    ModuleLayout,
    WlTab
  }
};
</script>
