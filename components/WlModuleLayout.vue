<template>
  <div class="module-layout">
    <div class="module-layout-container">
      <nav class="tabs-container">
        <slot name="tabs" />
      </nav>

      <div class="content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.module-layout {
  height: 100%;
  padding-top: calc(25px + 4.5vh);
  background: #e1e3e9;
}

.module-layout-container {
  background: blue;
  border: 1px solid #ccc;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.tabs-container {
  display: flex;
  overflow-y: unset;
  overflow-x: auto;
  background-color: #eee;
  padding-top: 10px;
  box-shadow: inset 0 -5px 10px -5px #AAAAAA;
}

.content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  background: white;
}
</style>