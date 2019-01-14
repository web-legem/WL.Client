<template>
  <div>
    <wl-crud :obj-select="obj">
      <div slot="wl-form">
        <wl-input 
          :title="'Nombre del Tipo Documento'"
          :max="10" 
          :placeholder="'Escriba el nombre del tipo documento'" 
          :error-msg="'Este es un error'" 
          :error="true"
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
  , data() {
    return {
      obj: null
    }
  }
  , methods: {
    selectObj() {
      this.obj = {
        id: 10,
        name: "CARTA"
      }
    }
    , unselectObj() {
      this.obj = null;
    }
  }
}
</script>

<style>
</style>
