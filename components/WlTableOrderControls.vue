<template>
  <tr>
    <th 
      v-for="(filter, index) in filters"
      :key="index"
      :class="[getStateClass(filter.filter)]"
      class="td" 
      @click="setOrdering(filter.filter)"
    >
      <button class="column-title selected">
        <span>{{ filter.label }}</span>
        <span 
          v-if="showIcon(filter.filter)"
          class="ico" 
          :class="getIconClass()" 
        />
      </button>
    </th>
    <th class="td">
      <div class="column-title cell">
        <span>{{ 'Cargar' }}</span>
      </div>
    </th>
  </tr>
</template>

<script>
import { mapGetters } from 'vuex'
import {removeLangExtension} from '~/helpers/routeManipulation'

const buttonState = [ 'DISABLED', 'ENABLED', 'REVERSE' ]

export default {
  data() {
    return {
      filters: [
        { label:this.$t('search.order-control.label-type-doc'), filter: 'TIPO_DOCUMENTO'},
        { label:this.$t('search.order-control.label-entitie'), filter: 'ENTIDAD' },
        { label:this.$t('search.order-control.label-number'), filter: 'NUMERO' },
        { label:this.$t('search.order-control.label-date'),  filter: 'ANIO_PUBLICACION' },
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
      console.log('clearing order')
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
      console.log('orderControls')
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

</style>
