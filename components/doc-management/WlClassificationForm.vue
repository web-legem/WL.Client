<template>
  <div
    class="form"
  >
    <form
      action=""
    >
      <h3>
        {{ $t('doc-management.upload-doc.form-title') }}
      </h3>
      <label
        for="file"
        class="upload-document"
        @drop.prevent.stop="handleDropFile($event)"
        @dragover.prevent.stop
      >
        <input
          id="file"
          ref="file"
          name="file"
          type="file"
          accept="application/pdf"
          @change="handleFileToUpload"
        >
        <span
          class="ico ico-upload"
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
        </p>
        <progress
          id="progress"
          :value.prop="uploadPercentage" 
          max="100" 
        />
      </label>
      <wl-input
        id="number"
        v-model="number"
        type="text"
        name="number"
        placeholder="por ejemplo: 029"
        :title="$t('doc-management.classify-doc.number')"
      />
      <wl-input 
        id="date" 
        v-model="date"
        type="date" 
        name="date" 
        placeholer="p.e.: 07/30/2018"
        :title="$t('doc-management.classify-doc.publication-date')"
      />
      <wl-select 
        id="entityId"
        v-model="entityId"
        :title="$t('doc-management.classify-doc.entity')"
        value-prop-name="id"
        label-prop-name="name"
        name="entityId" 
        class="select"
        :list="entities"
      />
      <wl-select 
        id="documentTypeId"
        v-model="documentTypeId"
        value-prop-name="id"
        label-prop-name="name"
        name="documentTypeId" 
        class="select"
        :title="$t('doc-management.classify-doc.document-type')"
        :list="documentTypes"
        :empty-msg="$t('doc-management.classify-doc.please-select-one')"
      />
      <wl-chips v-model="tags" />
      <div
        class="action-container"
      >
        <wl-button
          type="button"
          class="action"
          ico="ico-check"
          @click="classify"
        >
          {{ $t('doc-management.classify-doc.butt-accept') }}        
        </wl-button>
        <wl-button
          type="button"
          class="action"
          ico="ico-times"
          @click="clear"
        >
          {{ $t('doc-management.classify-doc.butt-cancel') }}
        </wl-button>
      </div>
    </form>
  </div>
</template>

<script>
import moment from 'moment';
import {mapGetters, mapActions} from 'vuex'
import WlInput from '~/components/WlInput.vue'
import WlSelect from '~/components/WlSelect.vue'
import WlButton from '~/components/WlButton.vue'
import WlChips from '~/components/WlChips.vue'

export default {
  components: {
    WlInput,
    WlSelect,
    WlButton,
    WlButton,
    WlChips,
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
    }
  },
  computed: {
    ...mapGetters('doc-management/classify-document', {
      isAlreadyClassified: 'isAlreadyClassified'
    }),
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
      let formData = new FormData()
      formData.append('files', this.file)
      const form = JSON.stringify({
        documentTypeId: this.documentTypeId,
        entityId: this.entityId,
        number: this.number,
        publicationDate: this.date
      })
      formData.append('value', form )


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
      .then(console.log)
      .catch(console.log)
    },
    clear(){
      this.date = moment(Date.now())
        .locale(this.$store.state.i18n.locale)
        .format('YYYY-MM-DD')
      this.number = ''
      this.documentTypeId = null
      this.entityId = null
      this.file = null
    },
    handleFileToUpload(){
      this.file = this.$refs.file.files[0]
      const url = URL.createObjectURL(this.file)
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
.form {
  display: flex;
  padding: 16px;
  flex-direction: column;
  border: 1px solid gray;
  margin: calc(1em + .5vw);
}

h3 {
  color: #00696b;
  padding-bottom: 5px;
  border-bottom: 1px solid #00696b;
  margin-bottom: 8px;
}

.action-container {
  padding-top: 16px;
  display: flex;
  justify-content: flex-end;
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
  background: #ddd;
  color: gray;
  max-width: 650px;
  width: 90%;
  display: flex;
  flex-direction: column;
  text-align: center;
  outline: 2px dashed #ccc;
  outline-offset: 4px;
  padding: 1rem 0;
  margin: 16px;
}

input[type="file"] {
  display: none;
}

.drop-area {
  background: #ddd;
  color: gray;
  max-width: 650px;
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  outline: 2px dashed #ccc;
  outline-offset: 4px;
  padding: 2rem 0;
  margin: 10px 0;
}

.ico-upload {
  display: block;
  font-size: 3rem;
  color: gray;
}

.next {
  align-self: flex-end;
}
</style>
