<template>
  <div>
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
