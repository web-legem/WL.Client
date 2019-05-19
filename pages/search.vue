<template>
  <div class="main">
    <nuxt-child />
  </div>
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

<style lang="scss" scoped>
.main {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>