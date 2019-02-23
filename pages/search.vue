<template>
  <nuxt-child />
</template>


<script>
import { mapMutations } from 'vuex';

export default {
  nuxtI18n: {
    paths: {
      es: '/busqueda'
      , en: '/search'
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