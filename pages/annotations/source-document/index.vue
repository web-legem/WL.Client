<template>
  <div class="source-document-index">
    <wl-search>
      <nuxt-link
        slot-scope="docProps"
        :to="localePath({name: 'annotations-source-document-id', params: { id: docProps.document.file.id}})"
        title="Ver Anotaciones"
      >
        <span class="ico-download" />{{ 'Seleccionar fuente de anotaciones' }}
      </nuxt-link>
    </wl-search> 
  </div>
</template>

<script>
import WlSearch from '~/components/WlSearch.vue'

export default {
  components: {
    WlSearch
  },
}
</script>