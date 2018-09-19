<template>
  <wl-module-layout>
    <template slot="tabs">
      <wl-tab
        :to="localePath({ name: 'doc-management' })"
        icon="ico-files-o"
      >
        Gestión Documental
      </wl-tab>
    </template>

    <div class="content">
      <h1>Subir documento</h1>
      <form
        class="upload-document"
        action=""
        @submit.prevent
      >
        <div class="drop-area">
          <label for="file">
            <input
              id="file"
              ref="file"
              name="file"
              type="file"
              @change="handleFileToUpload"
            >
            <span class="ico ico-upload" />
            <p><strong>Escoja un archivo</strong> ó arrastrelo aquí</p>
          </label>
        </div>
  
        <hr>
        <button
          class="next"
          @click="uploadFile"
        >Subir Archivo</button>
      </form>
    </div>
  </wl-module-layout>
</template>

<script>
import WlModuleLayout from '~/components/WlModuleLayout.vue'
import WlTab from '~/components/WlTab.vue'

export default {
  components: {
    WlModuleLayout
    , WlTab
  }
  , data() {
    return {
      file: ''
    }
  }
  , methods: {
    handleFileToUpload(){
      console.log('handleFileToUpload')
      this.file = this.$refs.file.files[0]
    }
    , uploadFile(){
      console.log('uploadFile')
      let formData = new FormData()
      formData.append('files', this.file)

      this.$axios.post('/api/File', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(_ => console.log('Success'))
      .catch(e => console.log('Error', e))
    }
  }
}
</script>

<style lang="scss" scoped>

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
