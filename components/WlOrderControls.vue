<template>
  <div class="order-controls">
    <button class="ordering">Entidad</button>
    <button class="ordering">Tipo documento</button>
    <button class="ordering">Número</button>
    <button class="ordering">Año de publicación</button>
    <button class="ordering">Relevancia</button>
    <button class="ordering">Mostrar busqueda avanzada</button>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.order-controls {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  overflow-x: auto;
}

.ordering {
  padding: 8px;
  background: white;
  border-bottom: 2px solid green;
}
</style>
