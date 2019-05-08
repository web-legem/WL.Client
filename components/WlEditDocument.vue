<template>
  <div class="wl-edit-document">
    <wl-document-controls 
      :document-title="'Titulo del documento'"
      class="document-controls"
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
        @click="toggleFile"
      />
    </wl-document-controls>

    <div class="forms">
      <div
        v-if="!showFileControls" 
        class="overflow"
      >
        <wl-edit-document-form />
      </div>
      <div v-else>
        <wl-update-file-form />
      </div>
    </div>
  </div>
</template>

<script>
import WlDocumentControls from '~/components/search/WlDocumentControls.vue'
import WlUpdateFileForm from '~/components/doc-management/WlUpdateFileForm.vue'
import WlEditDocumentForm from '~/components/doc-management/WlEditDocumentForm.vue'

export default {
  components: {
    WlDocumentControls,
    WlUpdateFileForm,
    WlEditDocumentForm,
  },
  data() {
    return {
      showFileControls: false
    }
  },
  methods: {
    toggleFile() {
      this.showFileControls = !this.showFileControls
    },
  },
}
</script>

<style lang="scss" scoped>
.wl-edit-document {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.forms {
  overflow: auto;
}
</style>
