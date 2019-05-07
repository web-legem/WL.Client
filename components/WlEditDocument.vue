<template>
  <div class="wl-document-info">
    <wl-document-controls 
      :document-title="'Titulo del documento'"
    >
      <button
        slot="controls"
        class="ico-pencil icon" 
        :to="localePath({name: 'search-id-notify'})" 
      />
      <button
        slot="controls"
        class="ico-trash icon" 
        :to="localePath({name: 'search-id-notify'})" 
      />
      <button
        slot="controls"
        class="ico-upload icon" 
        :to="localePath({name: 'search-id-notify'})" 
      />
    </wl-document-controls>
  </div>
</template>

<script>
import WlDocumentControls from '~/components/search/WlDocumentControls.vue'

export default {
  components: {
    WlDocumentControls,
  },
}
</script>

<style>

</style>
