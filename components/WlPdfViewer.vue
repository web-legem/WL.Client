<template>
  <div class="pdf-viewer">
    <object 
      :data="url" 
      type="application/pdf"
      class="pdf" 
      typemustmatch
    >
      <p>
        {{ $t('components.pdf.no-tienes-plugin') }}        
        <a :href="url">{{ $t('components.pdf.descargar-pdf') }}</a>
      </p>
    </object>
  </div>
</template>

<script>
export default {
  props: {
    fileId: {
      type: [String, Number],
      required: true,
    }
  }
  , data() {
    return {
      // pdf: null
      // , test: 'http://localhost:54037/api/File/' + this.$route.params.id
    }
  }
  , computed: {
    url() {
      return this.$axios.defaults.baseURL +  'api/Search/file/download/' + this.fileId
    }
  }
  , mounted() {
    // this.downloadFile(this.$route.params.id)
  }
  , methods: {
    // downloadFile(id) {
    //   this.$axios.get('/api/File/' + id, {
    //     responseType: 'blob'
    //   })
    //   .then(res => {
    //     const file = new Blob(
    //       [res.data], 
    //       {type: 'application/pdf'});
    //     const fileURL = URL.createObjectURL(file);
    //     this.pdf = fileURL
    //   })
    //   .catch(console.log)
    // }
  }
}
</script>

<style scoped lang="scss">
.pdf-viewer {
  width: 100%;
  height: 100%;
  background-color: var(--wl_form_bg);
  color:var(--wl_form_primary);
}

.pdf {
  width: 100%;
  height: 100%;
  display: block;
  background-color: var(--wl_form_bg);
  color:var(--wl_form_primary);
}
</style>
