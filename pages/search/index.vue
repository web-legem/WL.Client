<template>
  <div class="search">
    <wl-search />
  </div>
</template>

<script>
import WlSearch from '~/components/search/WlSearch.vue'
import {mapMutations} from 'vuex'

export default {
  components: {
    WlSearch
  },
  fetch({store, params, query}) {
    var filterData = store.dispatch('search/loadFilterData')
    var search = () => store.dispatch('search/search', {...query })
    var promises = [filterData]
    const isSearchQuery = Object.keys(query).some(x => x == 'page' 
      || x == 'pageSize' 
      || x == 'descend'
      || x == 'wordsToSearch'
      || x == 'orderBy'
      || x == 'entityId'  
      || x == 'documentTypeId'
      || x == 'number'
      || x == 'publicationDate'
    )
    
    if(isSearchQuery) {
      promises.push(search())
    }
    return Promise.all(promises)
  },
  beforeRouteLeave (to, from, next) {
    this.clear()
    next()
  },
  methods: {
    ...mapMutations('search', [
      'clear'
    ])
  }
}
</script>

<style>
.search {
  width: 100%;
  height: 100%;
  padding-top: calc(25px + 4.5vh);
  flex-grow: 1;
  position: relative;
}
</style>
