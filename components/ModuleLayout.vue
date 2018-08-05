<template>
  <div class="module-layout">
    <nav class="tabs-container">
      <slot name="tabs" />
    </nav>

    <div>
      <slot />
    </div>
  </div>
</template>

<script>
export default {

}


</script>

<style>
.module-layout {
  margin: calc(20px + 1vmin);
  border-top: var(--border-test);
}

.tabs-container {
  display: flex;
  overflow-y: unset;
  overflow-x: auto;
  background-color: #eee;
}
</style>
