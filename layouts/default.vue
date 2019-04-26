<template>
  <div :class="{'high-contrast': highContrast }">
    <wl-menu />

    <div class="nuxt">
      <nuxt />
    </div>
  </div>
</template>

<script>
import WlMenu from '@/components/WlMenu.vue'

export default {
  components: {
    WlMenu
  }, 
  computed: {
    highContrast() {
      if(typeof(document) != 'undefined'){
        document.getElementsByTagName('body')[0].className =
          this.$store.state.highContrast
            ? "high-contrast"
            : ""
      }
      return this.$store.state.highContrast
    }
  }
}
</script>

<style>
.nuxt {
  height: 100vh;
}
</style>
