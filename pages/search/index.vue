<template>
  <div class="search">
    <wl-search />
  </div>
</template>

<script>
import WlSearch from '~/components/WlSearch.vue'

export default {
  components: {
    WlSearch
  }
}
</script>

<style>
.search {
  width: 100%;
  padding-top: calc(25px + 4.5vh);
  height: calc(95.5vh - 25px);
  position: relative;
}
</style>
