<template>
  <div class="order-controls">
    <button 
      v-for="(filter, index) in filters"
      :key="index"
      :class="[getStateClass(filter.filter) ]"
      class="ordering"
      @click="setOrdering(filter.filter)"
    > 
      {{ filter.label }}
      <span
        v-if="showIcon(filter.filter)"
        :class="[ getIconClass() ]"
        class="order-icon"
      />
    </button>
    <no-ssr>
      <button
        v-if="$mq != 'lg' && $mq != 'xl'"
        class="ordering"
        @click="showFilters"
      >
        {{ $t('components.order-control.butt-show-search-adva') }}
      </button>
    </no-ssr>
    <no-ssr>
      <wl-modal
        v-if="showModal && $mq != 'lg' && $mq != 'xl'"
        :title="$t('components.order-control.title-filterl')"
        @wlclose="hideFilters"
      >
        <wl-search-filters slot="wl-content" />
      </wl-modal>
    </no-ssr>
  </div>
</template>

<script>
import WlModal from '~/components/WlModal.vue'
import WlSearchFilters from '~/components/search/WlSearchFilters.vue'
import { mapGetters } from 'vuex'
import {removeLangExtension} from '~/helpers/routeManipulation'

const buttonState = [ 'DISABLED', 'ENABLED', 'REVERSE' ]

export default { components: { WlModal,
       WlSearchFilters,
  },
  data() {
    return {
      showModal: false,
      filters: [
        { label: 'Entidad', filter: 'ENTIDAD' },
        { label: 'Tipo documento', filter: 'TIPO_DOCUMENTO'},
        { label: 'Número', filter: 'NUMERO' },
        { label: 'Año publicación', filter: 'ANIO_PUBLICACION' },
        { label: 'Relevancia', filter: 'DEFAULT' }, // TODO - cambiar label por cadena en ingles o español
      ],
    }
  },
  computed: {
    orderBy() {
      return this.$route.query.orderBy || 'DEFAULT'
    },
    descend() {
      return this.$route.query.descend == "true"
    },
    ...mapGetters('search', {
      loadingTotalCount: 'loadingTotalCount'
    })
  },
  mounted() {
    if(this.filters.map(x => x.filter).indexOf(this.orderBy) == -1){
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
        name: removeLangExtension(this.$route.name),
        query
      }))
    },
    showFilters() {
      this.showModal = true
    },
    hideFilters() {
      this.showModal = false
    },
    getStateClass(filter) {
      if(this.orderBy == filter) {
        if(this.descend) {
          return 'reverse'
        } else {
          return 'enabled'
        }
      }
      return 'disabled'
    },
    showIcon(filter) {
      if(this.orderBy == filter && filter != 'DEFAULT')
        return true
      else false
    },
    getIconClass() {
      if(this.descend)
        return 'ico-sort-alpha-desc'
      return 'ico-sort-alpha-asc'
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
  margin: 16px 0 0 0;
}

@media screen and (min-width: 992px) {
  .order-controls {
    justify-content: flex-start;
  }
  .ordering {
    margin: 0 0 0 16px;
  }
}

@media screen and (max-width: 500px) {
  .order-controls {
    min-height: 75px;
  }
}

.ordering {
  padding: 0 4px 4px ;
  background: white;
  font-size: .9rem;
}

.ordering.reverse,
.ordering.enabled {
  border-bottom: 2px solid #00696b;
}

.order-icon {
  color: #00696b;
  padding: 0;
}
</style>
