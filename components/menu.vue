<template>
  <div>
    <div>Menu</div>        
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

    <button v-for="(size, index) in $store.state.fontSizes" 
      :key="index"
      @click="setFontSize(size)">{{size}}%</button>
    <div>
        <nuxt-link :to="switchLocalePath('en')">English</nuxt-link>
        <nuxt-link :to="switchLocalePath('es')">Español</nuxt-link>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  methods: {
    changeLanguage (lang) {
      this.$store.dispatch('changeLanguage', lang)
    }
    , ...mapActions([ 
      'changeTheme',
      'changeFontSize'
    ])
    , setFontSize(fontSize) {
      document.documentElement.style.fontSize = fontSize + "%"
      this.changeFontSize(fontSize)
    }
  }
  , mounted(){
    this.setFontSize(100)
  }
}
</script>