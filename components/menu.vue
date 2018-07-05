<template>
  <div>
    <div>Menu</div>        
    <nuxt-link :to="localePath({name: 'index'})">Home</nuxt-link> &nbsp;
    <nuxt-link :to="localePath({name:'admin'})">{{ $t("admin.module-name") }}</nuxt-link>
    <div>
        <nuxt-link :to="switchLocalePath('en')">English</nuxt-link>
        <nuxt-link :to="switchLocalePath('es')">Español</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    changeLanguage (lang) {
      this.$store.dispatch('changeLanguage', lang)
    }
  }
}
</script>