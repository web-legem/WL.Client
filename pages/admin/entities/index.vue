<template>
  <div>
    <wl-crud
      :obj-select="null"
      :disable-buttons="true"
    >
      <template slot="wl-form">
        <wl-input
          :title="'Nombre de la Entidad'"
          :placeholder="'Escriba el nombre de la entidad'"
          :max="0"
          :disable="true"
        />
        <wl-input
          :title="'Email'"
          :placeholder="'Escriba Email'"
          :max="0"
          :disable="true"
        />
        <wl-select
          :id="'select'"
          :disable="true"
          :name="'select'"
          :title="'Seleccione del Tipo Documento'"
          :list="entityTypes"
          :value-prop-name="'id'"
          :label-prop-name="'name'"
        />
      </template>
    </wl-crud>
  </div>
</template>

<script>
import WlCrud from "~/components/WlCrud.vue";
import WlInput from "~/components/WlInput.vue";
import WlSelect from "~/components/WlSelect.vue";
export default {
  components: {
    WlCrud,
    WlInput,
    WlSelect
  },
}
</script>

<style>

</style>
