<template>
  <form
    action="" 
    class="wl-search-bar"
    @submit.prevent
  >
    <input
      ref="input"
      :value="value"
      type="search" 
      class="a_input"
    >
    <wl-button 
      :only-icon="true"
      title="Search"
      ico="ico-search" 
      @click.native="$emit('input', $refs.input.value )"
    />
  </form>
</template>

<script>
import WlButton from '~/components/WlButton.vue'

export default {
  components: {
    WlButton,
  },
  props: {
    value: {
      type: String,
      required: true,
    },
  }
}
</script>

<style lang="scss" scoped>
.wl-search-bar {
  display: flex;
  flex-direction: row;
}
</style>
