<template>
  <div :class=" { 'high-contrast': $store.state['high-contrast'] }">
    <menu-component></menu-component>
    <nuxt/>
  </div>
</template>

<script>
import MenuComponent from '@/components/menu'

export default {
  components: {
    MenuComponent
  }
}
</script>
