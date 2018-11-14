<template>
  <div class="order-controls">
    <button 
      class="ordering"
      @click="setOrdering('ENTIDAD')"
    >Entidad</button>
    <button
      class="ordering"
      @click="setOrdering('TIPO_DOCUMENTO')"
    >Tipo documento</button>
    <button
      class="ordering"
      @click="setOrdering('NUMERO')" 
    >Número</button>
    <button
      class="ordering"
      @click="setOrdering('ANIO_PUBLICACION')"  
    >Año de publicación</button>
    <button
      class="ordering"
      @click="setOrdering('DEFAULT')" 
    >Relevancia</button>
    <button
      class="ordering"
    >Mostrar busqueda avanzada</button>
  </div>
</template>

<script>
export default {
  props: {
    orderBy: {
      type: String,
      default: 'DEFAULT',
      validator: function(value) {
        return ['DEFAULT', 'NUMERO', 'ENTIDAD', 'TIPO_DOCUMENTO', 'ANIO_PUBLICACION'].indexOf(value) !== -1
      },
    },
    descend: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    setOrdering(orderBy) {
      let descend = orderBy == this.orderBy ? !this.descend : false
      this.$emit('order', { orderBy, descend })
    }
  }
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
