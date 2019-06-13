<template>
  <div 
    class="container-form-left"
    :class="isLoading ? 'loading' : '' "
  >
    <h1 class="left-form-title">
      {{ $t('doc-management.upload-doc.form-title') }}
    </h1>
    <form
      name="classification-form"
      class="form-left"
      data-vv-scope="form1"
      @submit.prevent
    >                 
      <div class="file-container">
        <label
          class="upload-document"
          for="file"
          :class="{ 'format-error': fileFormatError, 'format-correct': fileFormatCorrect }"
          @drop.prevent.stop="handleDropFile($event)"
          @dragover.prevent.stop
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
        <input
          id="file"
          ref="file"
          name="file"
          type="file"
          accept="application/pdf"
          @change="handleFileToUpload($event)"
        >
      </div>
      <wl-input
        v-model="number"
        mode="onlyNumber"
        name="form1.number"
        :placeholder="$t('doc-management.upload-doc.number-placeholder')"
        :validate="{required: true}"
        :title="$t('doc-management.classify-doc.number')"
        :is-submit="true"
        :disable="isLoading"
      />
      <wl-input 
        v-model="date"
        type="date" 
        name="date" 
        placeholer="p.e.: 07/30/2018"
        :title="$t('doc-management.classify-doc.publication-date')"
        :validate="{required: true}"
        :is-submit="true"
      />
      <wl-select 
        v-model="entityId"
        name="form1.entity" 
        value-prop-name="id"
        label-prop-name="name"
        class="select"
        :title="$t('doc-management.classify-doc.entity')"
        :list="entities"
        :validate="{required: true}"
        :is-submit="true"
        :disable="isLoading"
      />
      <wl-select 
        v-model="documentTypeId"
        name="form1.documentType" 
        value-prop-name="id"
        label-prop-name="name"
        class="select"
        :title="$t('doc-management.classify-doc.document-type')"
        :list="documentTypes"
        :validate="{required: true}"
        :is-submit="true"
        :disable="isLoading"
      />
      <!-- :empty-msg="$t('doc-management.classify-doc.please-select-one')" -->
      <!-- <wl-chips v-model="tags" /> -->
      <span class="fix-flex" />
      <div
        class="action-container"
      >
        <wl-button
          type="submit"
          class="action"
          ico="ico-check"
          :title="$t('doc-management.classify-doc.butt-accept')"
          :disable="isLoading"
          @click="classify"
        >
          {{ $t('doc-management.classify-doc.butt-accept') }}        
        </wl-button>
        <wl-button
          type="button"
          class="action"
          ico="ico-times"
          :title="'cancelar'"
          :disable="isLoading"
          @click="clear"
        >
          {{ $t('doc-management.classify-doc.butt-cancel') }}
        </wl-button>
      </div>
      <wl-left-loading 
        v-if="isLoading" 
        label="Procesando el documento..."
      />           
    </form>

    <wl-modal
      v-if="showDialog"
      :title="$t('components.crud.title-confirm')"
      @wlclose="closeDialog"
    >
      <template slot="wl-content">
        <div class="generic-box-vertical content-modal">
          <div>{{ $t('documentUploadSuccess') }}</div>
        </div>
        <div class="modal-confirmacion confirm-dialog content-modal-buttons">
          <wl-button 
            ico="ico-file-text-o"
            @click.native="viewDocument"
          >
            {{ $t('viewDocument') }}
          </wl-button>
          <wl-button 
            ico="ico-upload"
            @click.native="closeDialog"
          >
            {{ $t('uploadNewDocument') }}
          </wl-button>
        </div>
      </template>
    </wl-modal>
  </div>
</template>

<script>
import moment from 'moment';
import {mapGetters, mapActions} from 'vuex'
import WlInput from '~/components/WlInput.vue'
import WlSelect from '~/components/WlSelect.vue'
import WlButton from '~/components/WlButton.vue'
import WlLeftLoading from '~/components/WlLeftLoading.vue'
import WlModal from '~/components/WlModal.vue'
// import WlChips from '~/components/WlChips.vue'

export default {
  components: {
    WlInput,
    WlSelect,
    WlButton,
    WlButton,
    WlLeftLoading,
    WlModal,
    // WlChips,
  },
  validate({ params }) {
    return /^\d+$/.test(params.id)
  },
  props: {
    entities: { type: Array, required: true },
    documentTypes: { type: Array, required: true},
  },
  data() {
    return {
      number: '',
      entityId: null,
      documentTypeId: null,
      date: moment(Date.now())
        .locale(this.$store.state.i18n.locale)
        .format('YYYY-MM-DD'),
      file: null,
      uploadPercentage: 0,
      error: null,
      tags: ['test'],
      isLoading: false,
      showDialog: false,
    }
  },
  computed: {
    ...mapGetters('doc-management/classify-document', {
      isAlreadyClassified: 'isAlreadyClassified'
    }),
    fileFormatError() {
      return this.file ? !this.file.name.endsWith('.pdf') : false
    },
    fileFormatCorrect() {
      return this.file ? this.file.name.endsWith('pdf') : false
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
  }
  , watch: {
    '$route.params.id'(){
      this.loadData(this.$route.params.id)
    },
  },
  fetch({ store, params }) {
    return store.dispatch('doc-management/classify-document/loadData', params.id)
  },
  methods: {
    ...mapActions('doc-management/classify-document', [
      'loadData'
    ]),
    classify() {
      this.$validator.validate('form1.*').then(valid => {
        this.isSubmit = true
        if(valid){

          if(!this.isLoading){
          this.isLoading = true;          


          let formData = new FormData()
          formData.append('files', this.file)
          const form = JSON.stringify({
            documentTypeId: this.documentTypeId,
            entityId: this.entityId,
            number: this.number,
            publicationDate: this.date
          });

          formData.append('value', form );

          this.$axios.post(
            '/api/Document',
            formData,
            {
              headers: { 'Content-Type': 'multipart/form-data'},
              onUploadProgress: (progressEvent) => {
                this.uploadPercentage = Number.parseInt(
                  Math.round(progressEvent.loaded * 100) / progressEvent.total)
              }
            })
          .then(x=>{
             console.log(x)
             this.isLoading = false
             this.showDialog = true
             this.createdDocumentId = x.data.id
          })
          .catch(x=>{console.log(x); this.isLoading = false;this.clear()})
          }
        }
      })

    },
    clear(){
      location.reload()
    },
    closeDialog() {
      this.clear()
    },
    viewDocument(){
      this.$router.push(this.localePath({
        name: 'search-id', 
        params: { id: this.createdDocumentId }
      }))
    },
    handleFileToUpload(e){
      let fileInput = this.$refs.file
      let hasFile = file => fileInput.files.length > 0

      this.file = hasFile(fileInput)
        ? fileInput.files[0]
        : null

      const url = hasFile(fileInput)
        ? URL.createObjectURL(this.file)
        : ''

      this.$emit('fileurl', url)
    },
    handleDropFile(e) {
      this.file = e.dataTransfer.files[0]
      const url = URL.createObjectURL(this.file)
      this.$emit('fileurl', url)
    },
  },
}
</script>

<style lang="scss" scoped>
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

.file-container{
  padding: 6px;
  margin-bottom: 4px;
}

.upload-document {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: var(--wl_tab_color);
  color: var(--wl_text);
  outline: 2px dashed var(--wl_gray);
  outline-offset: 4px;
  padding: 1rem 0;
  // margin: 4px;
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

.content-modal{  
  padding: 10px;  
  margin-bottom: -10px;
}

.content-modal-buttons{
  padding: 10px;  
  margin-top: 10px;
}
</style>
