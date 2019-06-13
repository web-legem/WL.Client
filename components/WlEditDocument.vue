<template>
  <div class="wl-edit-document">
    <wl-document-controls 
      :document-title="documentTitle"
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
        @click="showConfirmDialog"
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

      <wl-modal
        v-if="showDialog"
        slot="controls"
        :title="$t('components.crud.title-confirm')"
        @wlclose="closeModal"
      >
        <template slot="wl-content">
          <div class="generic-box-vertical content-modal">
            <div>{{ $t('components.crud.div-sure-delete') }} "{{ documentTitle }}"?</div>
          </div>
          <div class="modal-confirmacion confirm-dialog content-modal-buttons">
            <wl-button 
              class="green"
              ico="ico-trash"             
              @click.native="confirmRemoval"            
            >
              {{ $t('components.crud.butt-delete') }}
            </wl-button>          
            <wl-button 
              ico="ico-times"
              @click.native="closeModal"
            >
              {{ $t('components.crud.butt-cancel') }}
            </wl-button>
          </div>
        </template>
      </wl-modal>

      <wl-modal
        v-if="showSuccessDialog"
        slot="controls"
        :title="$t('components.crud.title-info')"
        @wlclose="finish"
      >
        <template slot="wl-content">
          <div class="generic-box-vertical content-modal">
            <div>{{ documentTitle + ' ha sido eliminado.' }}</div>
          </div>
          <div class="modal-confirmacion confirm-dialog content-modal-buttons">
            <wl-button 
              class="green"
              ico="ico-trash"             
              @click="finish"            
            >
              {{ $t('components.crud.butt-accept') }}
            </wl-button>          
          </div>
        </template>
      </wl-modal>
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
import WlModal from '~/components/WlModal.vue'
import WlButton from '~/components/WlButton.vue'

export default {
  components: {
    WlDocumentControls,
    WlUpdateFileForm,
    WlEditDocumentForm,
    WlModal,
    WlButton,
  },
  data() {
    return {
      showFileControls: false,
      showDialog: false,
      showSuccessDialog: false,
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    },
    documentTitle() {
      return 'Titulo del documento'
    },
  },
  methods: {
    toggleFile() {
      this.showFileControls = !this.showFileControls
    },
    showConfirmDialog(){
      this.showDialog = true
    },
    closeModal(){
      this.showDialog = false
    },
    showSuccessMessage() {
      this.showSuccessDialog = true
    },
    hideSuccessMessage() {
      this.showSuccessDialog = false
    },
    confirmRemoval(){
      this.showDialog = false
      this.$axios.delete(`/api/Document/${this.id}`)
      .then(() => this.showSuccessMessage())
      .catch(e => console.log(e))
    },
    finish(){
      this.hideSuccessMessage();
      this.$router.push(this.localePath({
        name: 'doc-management-document'
      }))
    }
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

.content-modal{  
  width: 100%;
  padding: 10px;  
  margin-bottom: -10px;
  background: transparent;
  color: var(--wl_text);
}

.content-modal-buttons{
  padding: 10px;  
  margin-top: 10px;
}
</style>
