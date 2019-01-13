<template>
  <div>
    <h1>Elige un archivo no clasificado para clasificarlo</h1>
    <nuxt-link :to="localePath({ name: 'doc-management-classify-document-id', params: { id: 2 } })">
      Primer Documento
    </nuxt-link>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
