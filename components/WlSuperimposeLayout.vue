<template>
  <div class="superimpose-layout">
    <div class="normal">
      <slot name="normal" />
    </div>
    <transition
      name="superimposed-layout"
      appear
    >
      <div
        v-if="open"
        class="superimposed"
      >
        <slot name="superimposed" />
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    open: {
      type: Boolean,
      default: false
    }
  },
}
</script>

<style lang="scss" scoped>
.superimpose-layout {
  height: 100%;
  overflow: hidden;
}

.normal {
  height: 100%;
}

.superimposed {
  position: relative;
  height: 100%;
  bottom: 100%;
}

.superimposed-layout-enter-active, .superimposed-layout-leave-active {
  transition: margin-left .5s linear, margin-right .5s linear;
}

.superimposed-layout-enter, .superimposed-layout-leave-to {
  margin-left: 100%;
  margin-right: -100%;
}

.superimposed-layout-leave, .superimposed-layout-enter-to {
  margin-left: 0;
  margin-right: 0;
}
</style>