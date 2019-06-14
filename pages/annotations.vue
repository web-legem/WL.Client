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
    store.dispatch('search/changeUrl', '/api/Annotation/search')
    return Promise.all([
      store.dispatch('search/loadFilterData'),
      store.dispatch('search/search', { ...query })
    ])
  },
}
</script>

<style lang="scss" scoped>
.annotations {
  width: 100%;
  height: 100%;
}
</style>
