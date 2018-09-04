<template>
  <div>
    <h1>Annotation Type to Edit</h1>
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
    ...mapGetters('admin/annotation-types', {
      selected: 'selected'
    })
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
    ...mapActions('admin/annotation-types', [
      'select'
      , 'clearSelection'
    ])
  }
}
</script>

<style>

</style>
