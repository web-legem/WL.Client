<template>
  <div>
    Buscar documento destino de la anotación (anotado)
    <nuxt-link
      :to="localePath({ 
        name: 'annotations-source-document-id-destination-document-new',
        params: { id: $route.params.id }})"
    >
      Crear documento destino de la anotación (anotado).
    </nuxt-link>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
