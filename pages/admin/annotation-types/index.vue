<template>
  <div>
    <wl-crud
      :obj-select="null"
      :disable-buttons="true"
    >
      <template slot="wl-form">
        <wl-input
          :title="'Nombre del Tipo Anotación'"
          :placeholder="'Escriba el nombre del tipo anotación'"
          :max="0"
          :disable="true"
        />
        <wl-input
          :title="'Raiz de la Anotación'"
          :placeholder="'Escriba la raiz de la anotación'"
          :max="0"
          :disable="true"
        />
      </template>
    </wl-crud>
  </div>
</template>

<script>
import WlCrud from "~/components/WlCrud.vue";
import WlInput from "~/components/WlInput.vue";
export default {
  components: {
    WlCrud,
    WlInput
  },
}
</script>

<style>

</style>
