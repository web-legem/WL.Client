<template>
  <div class="form">
    <form
      name="update-file-form"
      data-vv-scope="form1"
      @submit.prevent
    >
      <h3>
        {{ $t('doc-management.upload-doc.form-title') }}
      </h3>
      <label
        for="file"
        class="upload-document"
        :class="{ 'format-error': fileFormatError, 'format-correct': fileFormatCorrect }"
        @drop.prevent.stop="handleDropFile($event)"
        @dragover.prevent.stop
      >
        <input
          id="file"
          ref="file"
          name="file"
          type="file"
          accept="application/pdf"
          :disabled="isLoading"
          @change="handleFileToUpload"
        >
        <span
          class="ico"
          :class="classIcon"
          @drop.prevent.stop="handleDropFile($event)"
          @drop.prevent="handleDropFile($event)"
        />
        <p 
          @drop.prevent.stop="handleDropFile($event)"
          @drop.prevent="handleDropFile($event)"
        >
          <strong v-if="file">{{ file.name }}</strong>
          <span v-else>
            <strong>{{ $t('doc-management.upload-doc.p-choose-file') }} </strong>{{ $t('doc-management.upload-doc.p-drag-here') }} 
          </span>
          <span 
            v-if="fileFormatError" 
            class="file-error"
          >
            <strong>{{ $t('doc-management.classify-doc.file-format-error') }} </strong>
          </span>
        </p> 
      </label>
      
      <div
        class="action-container"
      >
        <wl-button
          type="submit"
          class="action"
          ico="ico-check"
          :title="$t('doc-management.classify-doc.butt-accept')"
          :disable="isLoading"
          @click="showConfirmationDialog"
        >
          {{ $t('doc-management.classify-doc.butt-accept') }}        
        </wl-button>
        <wl-button
          type="button"
          class="action"
          ico="ico-times"
          :title="$t('doc-management.classify-doc.butt-cancel')"
          :disable="isLoading"
          @click="finish"
        >
          {{ $t('doc-management.classify-doc.butt-cancel') }}
        </wl-button>
      </div>
      <div 
        v-if="isLoading" 
        class="progress-line" 
      />
    </form>

    <wl-modal
        slot="controls"
        v-if="showConfirm"
        :title="$t('components.crud.title-confirm')"
        @wlclose="closeConfirmationDialog"
      >
        <template slot="wl-content">
          <div class="generic-box-vertical content-modal">
            <div>{{ 'Estas seguro de que quieres cambiar el archivo del documento: ' }} "{{ id }}"?</div>
          </div>
          <div class="modal-confirmacion confirm-dialog content-modal-buttons">
            <wl-button 
              class="green"
              ico="ico-trash"             
              @click.native="confirmReplacement"            
            >
              {{ $t('components.crud.butt-accept') }}
            </wl-button>          
            <wl-button 
              ico="ico-times"
              @click.native="closeConfirmationDialog"
            >
              {{ $t('components.crud.butt-cancel') }}
            </wl-button>
          </div>
        </template>
      </wl-modal>

      <wl-modal
        v-if="showSuccess"
        slot="controls"
        :title="$t('components.crud.title-info')"
        @wlclose="finish"
      >
        <template slot="wl-content">
          <div class="generic-box-vertical content-modal">
            <div>{{ 'Se ha actualizado el archivo exitosamente!' }}</div>
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
  </div>
</template>

<script>
import WlButton from '~/components/WlButton.vue'
import WlModal from '~/components/WlModal.vue'

export default {
  components: {
    WlButton,
    WlModal,
  },
  data() {
    return {
      file: null,
      isLoading: false,
      showConfirm: false,
      uploadPercentage: 0,
      showSuccess: false,
    }
  },
  computed: {
    fileFormatError() {
      return this.file ? !this.file.name.endsWith('.pdf') : false
    },
    fileFormatCorrect() {
      return this.file ? this.file.name.endsWith('pdf') : false
    },
    id() {
      return this.$route.params.id
    },
    icon() {
      return this.fileFormatError
        ? 'ico-times-circle'
        : (this.fileFormatCorrect
          ? 'ico-check-circle-o'
          : 'ico-upload')
    },
    classIcon() {
     return [this.icon, this.fileFormatError ? 'format-error': ''] 
    },
  },
  methods: {
    handleFileToUpload(){
      this.file = this.$refs.file.files[0]
      const url = URL.createObjectURL(this.file)
    },
    handleDropFile(e) {
      this.file = e.dataTransfer.files[0]
      const url = URL.createObjectURL(this.file)
    },
    showConfirmationDialog(){
      this.showConfirm = true
    },
    closeConfirmationDialog() {
      this.showConfirm = false
    },
    confirmReplacement(){
      this.showConfirm = false
      this.file = this.$refs.file.files[0]
      let formData = new FormData()
      formData.append('files', this.file)
      this.$axios.post(`/api/Document/file/${this.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
          , onUploadProgress: progressEvent => {
            this.uploadPercentage = Number.parseInt(
              Math.round(progressEvent.loaded * 100) / progressEvent.total)
          }
        })
        .then(_ => {
          this.showSuccessDialog()
        }) 
        .catch(e => console.log('Error', e))
    },
    showSuccessDialog(){
      this.showSuccess = true
    },
    hideSuccessDialog() {
      this.showSuccess = false
    },
    finish(){
      this.showConfirm = false
      this.showSuccess = false
      location.reload()
    },
  },
}
</script>

<style lang="scss" scoped>

.form {
  display: flex;
  padding: 16px;
  flex-direction: column;
  border: 1px solid var(--wl_gray);
  margin: calc(1em + .5vw);
}

h3 {
  background: transparent;
  color: var(--wl_primary);
  padding-bottom: 5px;
  border-bottom: 1px solid  var(--wl_primary);
  margin-bottom: 8px;
}

.action-container {
  padding-top: 16px;
  display: flex;
  justify-content: flex-end;
}

.action-container div:last-child {
  margin-top: 20px;
}

.action {
  margin-left: 16px;
}

.select {
  margin-bottom: 10px;
}

.content {
  height: 100%;
}

.upload-document {
  max-width: 650px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  background: var(--wl_tab_color);
  color: var(--wl_text);
  max-width: 650px;
  width: 90%;
  display: flex;
  flex-direction: column;
  text-align: center;
  outline: 2px dashed var(--wl_gray);
  outline-offset: 4px;
  padding: 1rem 0;
  margin: 16px;
  cursor: grab;
  :active {
    cursor: grabbing;
  }
}

.upload-document.format-error {
  outline: 2px dashed var(--wl_text_error)
}

.upload-document.format-correct {
  outline: 2px dashed var(--wl_primary)
}

input[type="file"] {
  display: none;
}

.ico {
  display: block;
  font-size: 3rem;
  background: transparent;  
  color:var(--wl_gray);
}

.ico-times-circle {
  background: transparent;
  color: var(--wl_text_error)
}

.ico-check-circle-o {
  background: transparent;
  color: var(--wl_primary);
}

.next {
  align-self: flex-end;
}

.format-error {
  background: var(--wl_bg_error);
  color: var(--wl_text_error);
}

.format-correct {
  background: var(--wl_subtle);
  color: var(--wl_primary);
}

.file-error {
  display: block;
}
</style>
