<template>
  <div class="superimpose-layout">
    <slot name="normal" />
    <slot name="superimposed" />
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.superimpose-layout {
  height: 100%;
  background: red;
}
</style>
