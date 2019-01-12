<template>
  <div class="annotations">
    <nuxt-link :to="localePath({ name: 'annotations-source-document-id', params: { id: 1 } })">Source Id 1</nuxt-link>
    <nuxt-link :to="localePath({ name: 'annotations-source-document' })">Source without id</nuxt-link>
  </div>
</template>

<script>
export default {
}
</script>

<style>
.annotations {
  padding-top: calc(25px + 4.5vh);
}
</style>