<template>
  <div>
    <wl-crud
      :obj-select="null"
      :disable-buttons="true"
    >
      <template slot="wl-form">
        <wl-input
          :title="'Nombre del Tipo Entidad'"
          :placeholder="'Escriba el nombre del tipo entidad'"
          :max="0"
          :disable="true"
        />
        <label class="texto_labels small_space">
          Documentos Soportados:
        </label>
        <div class="cards" />
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
