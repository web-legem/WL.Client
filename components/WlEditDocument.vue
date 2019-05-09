<template>
  <div class="wl-edit-document">
    <wl-document-controls 
      :document-title="'Titulo del documento'"
    >      
      <button
        slot="controls"    
        class="ico-pencil ico_cl "     
        :title="$t('doc-management.document.edit')"
        :to="localePath({name: 'search-id-notify'})" 
      />
      <button
        slot="controls"
        class="ico-trash ico_cl" 
        :title="$t('doc-management.document.delete')"
        :to="localePath({name: 'search-id-notify'})" 
      />
      <button
        slot="controls"
        class="ico-upload ico_cl"
        :title="$t('doc-management.document.upload')"
        :to="localePath({name: 'search-id-notify'})" 
        @click="toggleFile"
      />
      <a 
        v-if="$mq == 'sm' || $mq == 'md'"
        slot="controls"
        :href="$axios.defaults.baseURL + 'api/Search/file/download/' + id"
        :title="$t('search.search-result.title-down')"
        download
        class="ico-download icon"
      >
        <span class="hiden">
          {{ $t('search.search-result.download') }}
        </span>
      </a>
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
  computed: {
    id() {
      return this.$route.params.id
    },
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

.hiden {
  display: none;
}
</style>
