<template>
  <div>
    Crear un documento sin archivo que sea el destino de la anotación (anotante).
    <nuxt-link
      :to="localePath({ 
        name: 'annotations-source-document-id-destination-document-dest',
        params: { id: $route.params.id, dest: 1 }})"
    >
      Crear documento y continuar con la anotación.
    </nuxt-link>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
