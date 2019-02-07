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
        <label class="texto_labels sm-space-top">
          Documentos Soportados:
        </label>
        <div class="cards">
          <div
            v-for="docType in docTypes"
            :key="docType.id"
          >
            <div class="block">
              <input
                :id="docType.id"
                v-model="checked"
                disabled="!isEdit"
                :name="docType.id"
                :value="docType.id"
                type="checkbox"
              >
              <label
                :for="docType.id"
                class="note checked"
              >
                <div>
                  <div class="ico-container">
                    <span class="ico-file-text-o ico-note" />
                  </div>
                  <div class="name-container">
                    <p class="note-name">
                      {{ docType.name }}
                    </p>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>
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
  asyncData(context) {
    console.log(context)
    return context.app.$axios.get('/api/DocumentType')
      .then(response => ({ docTypes: response.data }))
      .catch(e => console.log('error', e))
  }
}
</script>

<style>

</style>
