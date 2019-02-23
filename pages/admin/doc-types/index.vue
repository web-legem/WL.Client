<template>
  <div>
    <wl-crud 
      :obj-select="null"
      :disable-buttons="true"
    >
      <div slot="wl-form">
        <wl-input 
          :title="'Nombre del Tipo Documento'"
          :placeholder="'Escriba el nombre del tipo documento'" 
          :max="0"
          :disable="true"
        />
      </div>
    </wl-crud>
  </div>
</template>

<script>
import WlCrud from "~/components/WlCrud.vue"
import WlInput from "~/components/WlInput.vue"

export default {
  components: {
    WlCrud,
    WlInput,
  }
}
</script>

<style>
</style>
