<template>
  <div class="pdf-viewer">
    <embed 
      :src="url"
      type="application/pdf" 
      class="pdf"
    >
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
      return this.$axios.defaults.baseURL +  'api/Document/download/' + this.fileId
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
  background-color: rgba(0, 0, 0, .75);
}

.pdf {
  width: 100%;
  height: 100%;
  display: block;
  background-color: rgba(0, 0, 0, 0);
}
</style>
