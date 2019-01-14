<template>
  <div class="source_id">
    {{ message }}
    <nuxt-link
      :to="localePath({
        name: 'annotations-source-document-id-destination-document',
        params: { id: $route.params.id }})"
    >
      buscar anotado
    </nuxt-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: 'Source Found',
    }
  },
}
</script>

<style>
.source_id {
}
</style>