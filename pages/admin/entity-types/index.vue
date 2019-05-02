<template>
  <div>
    <wl-crud
      :obj-select="null"
      :disable-buttons="true"
    >
      <template slot="wl-form">
        <wl-input
          :name="'form1.name'"
          :title="$t('admin.entities-type.title-name-enty-type')"
          :placeholder="$t('admin.entities-type.place-enter-name-type-enty')"
          :max="0"
          :disable="true"
        /> 
        <span class="texto_labels sm-space-top">
          {{ $t('admin.entities-type.label-documents-suport') }}
        </span>
        <div class="hoja-container disable">
          <div
            v-for="docType in docTypes"
            :key="docType.id"
          >
            <div class="block disable">
              <input
                :id="docType.id"
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
                    <span class="ico-file-text-o" />                      
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
    return context.app.$axios.get('/api/DocumentType')
      .then(response => ({ docTypes: response.data }))
      .catch(e => console.log('error', e))
  }
}
</script>