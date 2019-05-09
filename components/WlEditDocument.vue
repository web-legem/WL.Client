<template>
  <div class="wl-edit-document">
    <wl-document-controls 
      :document-title="'Titulo del documento'"
      class="document-controls"
    >
      <button
        slot="controls"
        class="ico-pencil icon" 
        :title="$t('doc-management.document.edit')"
        :to="localePath({name: 'search-id-notify'})" 
      />
      <button
        slot="controls"
        class="ico-trash icon" 
        :title="$t('doc-management.document.delete')"
        :to="localePath({name: 'search-id-notify'})" 
      />
      <button
        slot="controls"
        class="ico-upload icon" 
        :title="$t('doc-management.document.upload')"
        :to="localePath({name: 'search-id-notify'})" 
        @click="toggleFile"
      />
      <a 
        v-if="$mq == 'sm' || $mq == 'md'"
        :href="$axios.defaults.baseURL + 'api/Search/file/download/' + id"
        :title="$t('search.search-result.title-down')"
        download
        slot="controls"
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

.icon {
  font-size: 1.4rem;
  background-color: transparent;
  color: var(--wl_primary);
  margin: 10px;
  padding: 5px;
  padding-bottom: 5px;
  cursor: pointer;
  margin-left: 5px;
  border-radius: 50%;
  background-position: center;
  transition: background 0.8s;
  text-decoration: none;
}

.icon:hover {
  background: #eee radial-gradient(circle, transparent 1%, #eee 1%) center/15000%;
  color: var(--wl_primary);
}

.icon:active {
  background-color: #999;
  color: var(--wl_primary);
  background-size: 100%;
  transition: background 0s;
}

.hiden {
  display: none;
}
</style>
