<template>
  <div class="pdf-viewer">
    <embed 
      v-if="isValidUrl"
      :src="url" 
      type="application/pdf"
      class="pdf"
    >
    <slot
      v-else
    />
  </div>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: true
    }
  },
  computed: {
    isValidUrl(){
      console.log(this.url)
      const retval = this.url != null && this.url.length > 4
      console.log(retval)
      return retval
    }
  }
}
</script>

<style scoped lang="scss">
.pdf-viewer {
  width: 100%;
  height: 100%;
}

.pdf {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
