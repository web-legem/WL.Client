<template>
  <div class="document">
    <nuxt-child />
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  nuxtI18n: {
    paths: {
      es: 'documento',
      en: 'document',
    }
  },
}
</script>

<style scoped>
.document {
  height: 100%;
  padding-top: calc(25px + 4.5vh);
}
</style>
