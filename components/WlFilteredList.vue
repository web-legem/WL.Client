<template>
  <nav class="filtered-list">
    <div>buscador</div>
    <ul>
      <slot />
    </ul>
  </nav>
</template>

<script>
export default {

}
</script>

<style>
.filtered-list {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.filtered-list ul {
  list-style-type: none;
  padding: 0 0;
  flex-grow: 1;
  overflow-y: auto;
}
</style>
