<template>
  <nuxt-child />
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

<style>

</style>
