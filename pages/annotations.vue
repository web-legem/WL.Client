<template>
  <div class="annotations">
    <nuxt-child />
  </div>
</template>

<script>
export default {
  nuxtI18n: {
    paths: {
      es: '/anotaciones',
      en: '/annotations',
    }
  },
  fetch({store, params, query}) {
    return Promise.all([
      store.dispatch('search/loadFilterData'),
      store.dispatch('search/search',{ ...query })
    ])
  },
}
</script>

<style lang="scss" scoped>
.annotations {
  width: 100%;
  padding-top: calc(25px + 4.5vh);
  height: 100%;
}
</style>
