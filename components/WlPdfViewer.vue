<template>
  <embed 
    :src="url"
    type="application/pdf" 
    class="pdf"
  >
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
      return this.$axios.defaults.baseURL +  'api/File/' + this.fileId
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

<style>
.pdf {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
