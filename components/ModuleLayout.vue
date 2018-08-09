<template>
  <div class="module-layout">
    <nav class="tabs-container">
      <slot name="tabs" />
      <div class="space" />
    </nav>

    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
.module-layout {
  margin: calc(20px + 1vmin);
  border: 1px solid #ccc;
  // box-shadow: 0 0 0 1px rgba($color: #000000, $alpha: 0.05), 0 1px 2px rgba($color: #000000, $alpha: 0.3);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.space {
  border-bottom: 1px solid #ccc;
  flex-grow: 1;
}

.tabs-container {
  display: flex;
  overflow-y: unset;
  overflow-x: auto;
  background-color: #eee;
}

.content {
  flex-grow: 1;
  height: 100%;
  position: relative;
}
</style>