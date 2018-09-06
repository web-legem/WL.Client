<template>
  <div class="search">
    <wl-master-detail-layout>
      <template 
        slot="master"
      >
        Controles Busqueda Avanzada
      </template>

      <template
        slot="details"
      >
        Resultado Busqueda
      </template>
    </wl-master-detail-layout>
  </div>
</template>

<script>
import WlMasterDetailLayout from '~/components/WlMasterDetailLayout.vue'

export default {
  components: {
    WlMasterDetailLayout
  }
  , nuxtI18n: {
    paths: {
      es: '/busqueda'
      , en: '/search'
    }
  }
}
</script>

<style>
.search {
  width: 100%;
  padding-top: calc(25px + 4.5vh);
  height: calc(95.5vh - 25px);
  position: relative;
}
</style>
