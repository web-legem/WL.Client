<template>
<div class="menu">
  <nuxt-link :to="localePath({name: 'index'})">Home</nuxt-link>
  &nbsp;
  <nuxt-link :to="localePath({name: 'admin'})">
    {{ $t('admin.module-name') }}
  </nuxt-link>
  &nbsp;
  <nuxt-link :to="localePath({name: 'persons'})">
    {{ $t('persons.module-name') }}
  </nuxt-link>

  <button @click="changeTheme()">{{ $t("changeTheme") }}</button>

  <button v-for="(size, index) in $store.state.fontSizes" :key="index" @click="setFontSize(size)">{{size}}%</button>
  <div>
    <nuxt-link :to="switchLocalePath('en')">English</nuxt-link>
    <nuxt-link :to="switchLocalePath('es')">Español</nuxt-link>
  </div>
</div>
</template>

<script>
import {
  mapActions
} from 'vuex'

export default {
  methods: {
    changeLanguage(lang) {
      this.$store.dispatch('changeLanguage', lang)
    }
    , ...mapActions([
      'changeTheme'
      , 'changeFontSize'
    ])
    , setFontSize(fontSize) {
      document.documentElement.style.fontSize = fontSize + "%"
      this.changeFontSize(fontSize)
    }
  }
  , mounted() {
    this.setFontSize(100)
  }
}
</script>

<style>
.menu {
  width: 100%;
  /* height: 5px; */
  height: calc(25px + 4.5vh);
  min-height: 45px;
  position: relative;
  background: rgba( 0, 0, 0, .75);
  border-bottom: 1px solid #6c767d;
  -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.50);
  -moz-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.50);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.50);
  z-index: 2;
  position: fixed;
}
</style>
