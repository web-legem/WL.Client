<template>
  <div>
    <h1>
      {{ $t('doc-management.classify-doc.h-classify-doc') }}      
    </h1>
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

<style>

</style>
