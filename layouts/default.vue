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
  padding-top: calc(25px + 4.5vh);
  height: calc(100vh - 25px - 4.5vh);
}
</style>
