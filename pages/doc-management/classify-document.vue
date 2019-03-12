<template>
  <div class="classify-document">
    <nuxt-child />
  </div>
</template>

<script>
export default {
  nuxtI18n: {
    paths: {
      es: 'clasificar'
      , en: 'classify'
    }
  }
}
</script>

<style lang="scss" scoped>
.classify-document {
  height: 100%;
}
</style>
