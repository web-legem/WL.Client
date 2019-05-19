<template>
  <div 
    v-if="hasResults"
    class="order-controls"
  >
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
        {{ $t('search.order-control.butt-show-search-adva') }}
      </button>
    </no-ssr>
    <no-ssr>
      <wl-modal
        v-if="showModal && $mq != 'lg' && $mq != 'xl'"
        :title="$t('search.order-control.title-filterl')"
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

export default { 
  components: { 
    WlModal,
    WlSearchFilters,
  },
  data() {
    return {
      showModal: false,
      filters: [
        { label:this.$t('search.order-control.label-entitie'), filter: 'ENTIDAD' },
        { label:this.$t('search.order-control.label-type-doc'), filter: 'TIPO_DOCUMENTO'},
        { label:this.$t('search.order-control.label-number'), filter: 'NUMERO' },
        { label:this.$t('search.order-control.label-date'),  filter: 'ANIO_PUBLICACION' },
        { label:this.$t('search.order-control.label-relevance'), filter: 'DEFAULT' }, // TODO - cambiar label por cadena en ingles o español
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
      loadingTotalCount: 'loadingTotalCount',
      hasResults: 'hasResults'
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
      console.log('orderControls')
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
  min-height: 30px;
  max-height: 30px;
  border-bottom: 1px solid var(--wl_gray);
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
  font-size: .9rem;
  background: transparent;
  color: var(--wl_text);
  pointer-events: auto;
}

.ordering:hover{
  cursor: pointer;
  background: var(--wl_gray_light);
  color: var(--wl_text);
}

.ordering:focus {
  outline: 1px dotted var(--wl_primary);
  outline-offset: -1px;
}

.ordering.reverse,
.ordering.enabled {
  border-bottom: 2px solid var(--wl_primary);
}

.order-icon {
  background: transparent;
  color: var(--wl_primary);
  padding: 0;
}
</style>
