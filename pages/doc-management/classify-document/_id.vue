<template>
  <h1>Clasificar documento</h1>
</template>

<script>
export default {
  watch: {
    '$route.params.id'(){
      console.log(this.$route.params.id)
    }
  }
  , mounted() {
    console.log(this.$route.params.id)
  }
}
</script>