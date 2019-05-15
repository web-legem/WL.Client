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
}
</script>