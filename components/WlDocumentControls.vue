<template>
  <div class="document-controls">
    Document Title
    <div class="controls">
      <wl-button 
        :only-icon="true" 
        title="Agregar anotación"
        ico="ico-plus" 
        class="control"
      />
      <wl-button 
        :only-icon="true" 
        title="Editar documento"
        ico="ico-pencil" 
        class="control"
      />
      <wl-button 
        :only-icon="true" 
        title="Eliminar documento"
        ico="ico-trash" 
        class="control"
      />
    </div>
  </div>
</template>

<script>
import WlButton from '~/components/WlButton.vue'

export default {
  components: {
    WlButton,
  },
}
</script>

<style>
.document-controls {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 16px;
  border-bottom: 1px solid grey;
}

.controls {
  display: flex;
  flex-direction: row-reverse;
}

.controls .control:not(:first-child){
  margin-right: 16px;
}

</style>
