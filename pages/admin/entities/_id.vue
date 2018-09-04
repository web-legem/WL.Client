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
      this.select(this.$route.params.id)
    }
  }
  , mounted() {
    this.select(this.$route.params.id)
  }
  , beforeDestroy() {
    this.clearSelection()
  }
  , methods: {
    ...mapActions('admin/entities', [
      'select',
      'clearSelection'
    ])
  }
}
</script>

<style>

</style>
