<template>
  <div>
    <h1>Entity Type to Edit</h1>
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
    ...mapGetters('admin/entity-types', {
      selected: 'selected'
    })
  }
  , watch: {
    '$route'(){
      this.selectEntityType(this.$route.params.id)
    }
  }
  , mounted() {
    this.selectEntityType(this.$route.params.id)
  }
  , beforeDestroy() {
    this.clearSelection()
  }
  , methods: {
    ...mapActions('admin/entity-types', [
      'selectEntityType'
      , 'clearSelection'
    ])
  }
}
</script>

<style>

</style>
