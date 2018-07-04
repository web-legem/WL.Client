<template>
  <div>
    <div>Menu</div>        
    <nuxt-link to="/">Home</nuxt-link> &nbsp;
    <nuxt-link :to="{name: 'admin'}">{{ $t("admin.module-name") }}</nuxt-link>
    <div>
        <p @click="changeLanguage('es')">Español</p>
        <p @click="changeLanguage('en')">English</p>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    changeLanguage (lang) {
      // this.$i18n.locale = lang
      this.$store.dispatch('changeLanguage', lang)
    }
  }
}
</script>