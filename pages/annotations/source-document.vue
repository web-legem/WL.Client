<template>
  <div class="source-document">
    <nuxt-child />
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  nuxtI18n: {
    paths: {
      es: 'documento-fuente',
      en: 'source-document',
    }
  },
  beforeDestroy() {
    this.clear()
  },
  methods: {
    ...mapMutations('search', [
      'clear'
    ])
  }
}
</script>

<style scoped>
.source-document {
  height: 100%;
}
</style>
