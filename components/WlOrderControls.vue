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
      v-if="$mq != 'lg' && $mq != 'xl'"
      class="ordering"
      @click="showFilters"
    >Mostrar busqueda avanzada</button>
    <wl-modal
      v-if="showModal && $mq != 'lg' && $mq != 'xl'"
      title="Filtros"
      @wlclose="hideFilters"
    >
      <wl-search-filters slot="wl-content" />
    </wl-modal>
  </div>
</template>

<script>
import WlModal from '~/components/WlModal.vue'
import WlSearchFilters from '~/components/WlSearchFilters.vue'

export default {
  components: {
    WlModal,
    WlSearchFilters,
  },
  data() {
    return {
      showModal: false,
    }
  },
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
    },
    showFilters() {
      this.showModal = true
    },
    hideFilters() {
      this.showModal = false
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

@media screen and (min-width: 992px) {
  .order-controls {
    justify-content: flex-start;
  }
  .ordering {
    margin: 0 16px;
  }
}

@media screen and (max-width: 500px) {
  .order-controls {
    min-height: 75px;
  }
}

.ordering {
  padding: 8px;
  background: white;
  border-bottom: 2px solid green;
}

.mq-layout {
  background: white;
}
</style>
