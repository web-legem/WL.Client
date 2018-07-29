<template>
  <div class="module-layout">
    <nav class="tabs-container">
        <slot name="tabs"></slot>
    </nav>

    <div>
      <slot></slot>
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
  background-color: silver;
  border-top: var(--border-test);
}

.tabs-container {
  background-color: red;
  display: flex;
  overflow-y: unset;
  overflow-x: auto;
}
/*
.tabs {
  display: flex;
  padding: 0;
  background-color: #ddd;
  overflow-y: hidden;
  overflow-x: auto;
  white-space: nowrap;
  word-wrap: unset;
}

.tab-navigation {
  padding: 1px;
  margin: 0;
  background-color: aqua;
  display: block;
} */

</style>
