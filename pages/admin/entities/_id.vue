<template>
  <div>
    <h1>Entity to Update</h1>
    {{ selected && selected.id }}
    {{ selected && selected.name }}
  </div>
</template>

<script>
import {
  mapGetters
  , mapActions
} from 'vuex';

export default {
  computed: {
    ...mapGetters('admin/entities', [ 
      'selected'
    ])
  }
  , watch: {
    '$route'() {
      this.selectEntity(this.$route.params.id)
    }
  }
  , mounted() {
    this.selectEntity(this.$route.params.id)
  }
  , beforeDestroy() {
    this.clearSelection()
  }
  , methods: {
    ...mapActions('admin/entities', [
      'selectEntity',
      'clearSelection'
    ])
  }
}
</script>

<style>

</style>
