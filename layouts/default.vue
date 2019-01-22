<template>
  <div :class="{'high-contrast': $store.state.highContrast }">
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
  }
}
</script>

<style>
.nuxt {
  height: 100vh;
}
</style>
