<template>
  <form
    action="" 
    class="wl-search-bar">
    <input
      type="search" 
      class="a_input">
    <wl-button 
      :only-icon="true"
      title="Search"
      ico="ico-search" />
  </form>
</template>

<script>
import WlButton from '~/components/WlButton.vue'

export default {
  components: {
    WlButton
  }
}
</script>

<style lang="scss" scoped>
.wl-search-bar {
  display: flex;
  flex-direction: row;
}
</style>
