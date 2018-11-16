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
  computed: {
    orderBy() {
      return this.$route.query.orderBy || 'DEFAULT'
    },
    descend() {
      return this.$route.query.descend == "true"
    }
  },
  mounted() {
    if( ['DEFAULT', 'NUMERO', 'ENTIDAD', 'TIPO_DOCUMENTO', 'ANIO_PUBLICACION'].indexOf(this.orderBy) !== -1){
      this.clearOrdering()
    }
  },
  methods: {
    setOrdering(orderBy) {
      let descend = orderBy == this.orderBy ? !this.descend : false
      let query = {
        ...this.$route.query,
        page: 1,
        orderBy,
        descend,
      }
      this.navigateWith(query)
    },
    clearOrdering() {
      let query = { ...this.$route.query, page: 1 }
      delete query.orderBy
      delete query.descend
      this.navigateWith(query)
    },
    navigateWith(query) {
      this.$emit('order', { orderBy: query.orderBy, descend: query.descend })
      this.$router.push(this.localePath({
        name: 'search',
        query
      }))
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
